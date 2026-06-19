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
                <code ref={codeRef} className="language-bash">{(code || '').trim()}</code>
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
    "Getting started with Git": "Git ile Başlarken",
    "Browsing the history": "Geçmişi İncelemek (git log)",
    "Working with Remotes": "Uzak Depolarla (Remotes) Çalışmak",
    "Staging": "Staging Area (Geçici Kabul Alanı)",
    "Ignoring Files and Folders": "Dosya ve Klasörleri Yok Saymak (.gitignore)",
    "Git Di": "Git Farkları (git diff)",
    "Undoing": "Değişiklikleri Geri Almak (Undo)",
    "Merging": "Dalları Birleştirmek (Merging)",
    "Submodules": "Alt Modüller (Submodules)",
    "Committing": "Commit İşlemleri",
    "Aliases": "Git Kısayolları (Aliases)",
    "Rebasing": "Rebase İşlemi",
    "Configuration": "Git Yapılandırması (Configuration)",
    "Branching": "Dallanma (Branching)",
    "Rev-List": "Rev-List Aracı",
    "Squashing": "Commitleri Birleştirmek (Squashing)",
    "Cherry Picking": "Cherry-Picking (Seçici Alım)",
    "Recovering": "Kurtarma İşlemleri (Recovering)",
    "Git Clean": "Untracked Dosyaları Temizlemek (git clean)",
    "Using a .gitattributes file": ".gitattributes Dosyası Kullanımı",
    ".mailmap file: Associating contributor and email aliases": ".mailmap Dosyası ve Katkıcı Eşlemeleri",
    "Analyzing types of workflows": "Git Çalışma Modelleri (Workflows)",
    "Pulling": "Güncellemeleri Çekmek (Pulling)",
    "Hooks": "Git Tetikleyicileri (Hooks)",
    "Cloning Repositories": "Depoları Klonlamak (Cloning)",
    "Stashing": "Değişiklikleri Zula Etmek (Stashing)",
    "Subtrees": "Alt Ağaçlar (Subtrees)",
    "Renaming": "Yeniden Adlandırma (Renaming)",
    "Pushing": "Değişiklikleri Göndermek (Pushing)",
    "Internals": "Git Dahili Yapısı (Internals)",
    "git-tfs": "Git TFS Entegrasyonu",
    "Empty directories in Git": "Git'te Boş Klasörler",
    "git-svn": "Git SVN Entegrasyonu",
    "Archive": "Arşiv Oluşturmak (git archive)",
    "Rewriting history with filter-branch": "Geçmişi Yeniden Yazmak (filter-branch)",
    "Migrating to Git": "Git'e Göç Etmek (Migration)",
    "Show": "Commit Detaylarını Görmek (git show)",
    "Resolving merge conflicts": "Çakışmaları (Merge Conflicts) Çözmek",
    "Bundles": "Paketler (git bundle)",
    "Display commit history graphically with Gitk": "Görsel Geçmiş İnceleme (Gitk)",
    "Bisecting/Finding faulty commits": "Hatalı Commiti Bulmak (git bisect)",
    "Blaming": "Satır Satır Yazar İncelemesi (git blame)",
    "Git revisions syntax": "Git Revizyon Sözdizimi",
    "Worktrees": "Çalışma Ağaçları (Worktrees)",
    "Git Remote": "Uzak Depo Yönetimi (Git Remote)",
    "Git Large File Storage (LFS)": "Git LFS (Büyük Dosya Depolama)",
    "Git Patch": "Git Yamaları (Patch)",
    "Git statistics": "Git İstatistikleri (Statistics)",
    "git send-email": "E-posta ile Yama Gönderme (git send-email)",
    "Git GUI Clients": "Görsel Git Arayüzleri (GUI)",
    "Reflog - Restoring commits not shown in git log": "Reflog ve Kayıp Commitleri Kurtarma",
    "TortoiseGit": "TortoiseGit Kullanımı",
    "External merge and ditools": "Harici Merge ve Diff Araçları",
    "Update Object Name in Reference": "Referans Nesnesi Güncelleme",
    "Git Branch Name on Bash Ubuntu": "Bash Terminalinde Git Dal Adı Gösterme",
    "Git Client-Side Hooks": "İstemci Tarafı Tetikleyicileri (Client Hooks)",
    "Git rerere": "Git rerere Özelliği",
    "Change git repository name": "Git Depo Adını Değiştirmek",
    "Git Tagging": "Git Etiketleme (Tagging)",
    "Tidying up your local and remote repository": "Lokal ve Uzak Depoları Temizlemek",
    "di-tree": "Git Diff Tree Özelliği"
};

// Get bilingual chapter label
function getChapterLabel(title, lang) {
    if (lang === 'tr') {
        const trTitle = CHAPTER_TRANSLATIONS[title];
        return trTitle ? `${trTitle} (${title})` : title;
    }
    return title;
}

// --- TOC Title Lookup ---
// The PDF->Markdown export hard-wraps long Chapter/Section titles onto a
// second physical line in the body, but the Table of Contents (dot-leader
// lines like "Chapter 21: ... ............... 91") always has the full,
// unwrapped title. Build id -> full title maps from the TOC so body
// headers can be corrected and their wrapped continuation line skipped.
function buildTocTitleMaps(lines) {
    const chapterTitles = new Map();
    const sectionTitles = new Map();
    const chapterRe = /^\s*Chapter\s+(\d+)\s*:\s*(.*)$/i;
    const sectionRe = /^\s*Section\s+(\d+\.\d+)\s*:\s*(.*)$/i;

    for (const line of lines) {
        if (!line.includes('...')) continue;
        const cleanTitle = (raw) => raw.replace(/\s*\.{2,}.*$/, '').trim();

        const chapterMatch = chapterRe.exec(line);
        if (chapterMatch) {
            const title = cleanTitle(chapterMatch[2]);
            if (title) chapterTitles.set(chapterMatch[1], title);
            continue;
        }
        const sectionMatch = sectionRe.exec(line);
        if (sectionMatch) {
            const title = cleanTitle(sectionMatch[2]);
            if (title) sectionTitles.set(sectionMatch[1], title);
        }
    }
    return { chapterTitles, sectionTitles };
}

// If `title` is a truncated prefix of `tocTitle` (because the body header
// wrapped onto the next physical line), return the resolved full title and
// how many continuation lines to skip. Otherwise return the title as-is.
function resolveWrappedTitle(title, tocTitle, lines, afterIndex) {
    if (!tocTitle || tocTitle.length <= title.length) {
        return { title, skip: 0 };
    }
    const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '');
    let combined = title;
    let skip = 0;
    while (skip < 2 && normalize(combined) !== normalize(tocTitle) && afterIndex + skip + 1 < lines.length) {
        const nextLine = lines[afterIndex + skip + 1].trim();
        if (!nextLine) break;
        const candidate = `${combined} ${nextLine}`.trim();
        if (!normalize(tocTitle).startsWith(normalize(candidate))) break;
        combined = candidate;
        skip += 1;
    }
    return normalize(combined) === normalize(tocTitle) ? { title: tocTitle, skip } : { title, skip: 0 };
}

// --- Document Logic Parser ---
function parseMarkdownDocument(text) {
    const lines = text.split('\n');
    const { chapterTitles, sectionTitles } = buildTocTitleMaps(lines);
    const parsedChapters = [];
    let currentChapter = null;
    let currentSection = null;

    const shouldCleanLine = (line) => {
        const trimmed = line.trim();
        return trimmed.includes('GoalKicker.com') ||
               trimmed.includes('Notes for Professionals') ||
               trimmed.includes('feedback and corrections');
    };

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (shouldCleanLine(line)) continue;

        // Match Chapter Header (e.g. **Chapter 1: Getting started**)
        const chapterMatch = line.match(/^\s*(?:\*\*|)?Chapter\s+(\d+)\s*:\s*(.*?)(?:\*\*|)?\s*$/i);
        if (chapterMatch && !line.includes('...')) {
            const num = parseInt(chapterMatch[1], 10);
            let title = chapterMatch[2].replace(/[\*\s]+$/, '').trim();
            const resolved = resolveWrappedTitle(title, chapterTitles.get(chapterMatch[1]), lines, i);
            title = resolved.title;
            i += resolved.skip;
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
            let title = sectionMatch[2].replace(/[\*\s]+$/, '').trim();
            const resolved = resolveWrappedTitle(title, sectionTitles.get(numStr), lines, i);
            title = resolved.title;
            i += resolved.skip;
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

        // Command line indicator or common Git commands
        if (trimmed.startsWith('git ') || trimmed.startsWith('$ git ') || trimmed.startsWith('ssh ') ||
            trimmed.startsWith('mkdir ') || trimmed.startsWith('cd ') || trimmed.startsWith('echo ') ||
            trimmed.startsWith('cat ') || trimmed.startsWith('ssh-keygen ') || trimmed.startsWith('brew ') ||
            trimmed.startsWith('sudo apt ') || trimmed.startsWith('sudo dnf ')) {
            return true;
        }

        // Configuration blocks (ini-like config syntax)
        if ((trimmed.startsWith('[') && trimmed.endsWith(']')) || 
            (trimmed.includes('=') && (trimmed.includes('user') || trimmed.includes('email') || trimmed.includes('helper')))) {
            return true;
        }

        // Diff markers
        if (trimmed.startsWith('<<<') || trimmed.startsWith('===') || trimmed.startsWith('>>>') ||
            trimmed.startsWith('diff --git') || trimmed.startsWith('--- a/') || trimmed.startsWith('+++ b/')) {
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

export default function GitDocPage() {
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode')
        const isDark = saved !== null ? JSON.parse(saved) : true
        if (isDark) {
            document.documentElement.classList.add('dark-mode')
            document.documentElement.classList.remove('light-mode-forced')
        } else {
            document.documentElement.classList.remove('dark-mode')
            document.documentElement.classList.add('light-mode-forced')
        }
        return isDark
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

    // Merge logic: use English chapters as main index.
    // If Turkish mode, fallback to English for untranslated chapters, translating titles.
    const chapters = useMemo(() => {
        if (enChapters.length === 0) return [];
        if (language === 'en') return enChapters;

        return enChapters.map(enChap => {
            const trChap = trChapters.find(c => c.id === enChap.id);
            if (trChap) return trChap;

            // Fallback for chapters not translated in TR file
            const trTitle = CHAPTER_TRANSLATIONS[enChap.title];
            return {
                ...enChap,
                title: trTitle ? trTitle : enChap.title,
                isFallback: true
            };
        });
    }, [trChapters, enChapters, language]);

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode))
        if (darkMode) {
            document.documentElement.classList.add('dark-mode')
            document.documentElement.classList.remove('light-mode-forced')
        } else {
            document.documentElement.classList.remove('dark-mode')
            document.documentElement.classList.add('light-mode-forced')
        }
    }, [darkMode])

    // Load both files on mount
    useEffect(() => {
        setLoading(true);
        const clean = text => text.replace(/\\(!|\[|\]|=|\+|>|<|-|&|'|")/g, '$1');
        Promise.all([
            fetch('/documents/GitNotesForProfessionals_tr.md').then(r => r.text()),
            fetch('/documents/GitNotesForProfessionals.md').then(r => r.text())
        ]).then(([trText, enText]) => {
            setTrChapters(parseMarkdownDocument(clean(trText)));
            setEnChapters(parseMarkdownDocument(clean(enText)));
            setLoading(false);
        }).catch(err => {
            console.error('Error loading Git documents', err);
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
            return groupLinesIntoBlocks(activeChapter.content);
        } else {
            const activeSection = activeChapter.sections[activeSectionIndex];
            return activeSection ? groupLinesIntoBlocks(activeSection.content) : [];
        }
    }, [chapters, activeChapterIndex, activeSectionIndex])

    const activeChapter = useMemo(() => {
        if (chapters.length === 0) return null;
        return chapters[activeChapterIndex] || null;
    }, [chapters, activeChapterIndex])

    const activeTitle = useMemo(() => {
        if (chapters.length === 0) return '';
        const chap = chapters[activeChapterIndex];
        if (!chap) return '';
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
                            onClick={() => navigate('/git-github')}
                            className={`flex items-center gap-2 px-3 py-2 rounded-xl font-bold text-xs md:text-sm transition-all duration-300 hover:scale-105 ${darkMode
                                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                                : 'bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200'
                            }`}
                        >
                            ← {language === 'tr' ? 'Git Rehberine Dön' : 'Back to Git Page'}
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

            <div className={`w-full border-b px-4 py-2.5 text-center ${darkMode ? 'bg-amber-500/15 border-amber-400/30' : 'bg-amber-100 border-amber-300'}`}>
                <span className="animate-pulse inline-flex items-center gap-2 text-xs md:text-sm font-bold text-amber-500">
                    🚧 {language === 'tr'
                        ? 'Bu sayfa geliştirme aşamasındadır — içerik ve çeviriler güncelleniyor.'
                        : 'This page is under development — content and translations are being updated.'}
                </span>
            </div>

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
                                    <div className="text-xs text-gray-500 p-2 italic">{language === 'tr' ? 'Sonuç bulunamadı' : 'No results found'}</div>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-1">
                                {chapters.map((chap, cIdx) => {
                                    const isExpanded = !!expandedChapters[cIdx]
                                    const isActiveChap = activeChapterIndex === cIdx
                                    return (
                                        <div key={chap.id} className="mb-1">
                                            <button
                                                onClick={() => selectChapter(cIdx)}
                                                className={`w-full text-left flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-all duration-200 border cursor-pointer ${
                                                    isActiveChap 
                                                        ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white border-transparent shadow shadow-orange-500/20' 
                                                        : darkMode 
                                                            ? 'bg-transparent border-transparent text-gray-300 hover:bg-gray-700/60' 
                                                            : 'bg-transparent border-transparent text-gray-700 hover:bg-orange-50/60'
                                                }`}
                                            >
                                                <span className="flex-1 pr-2 truncate">
                                                    {chap.id}. {getChapterLabel(chap.title, language)}
                                                </span>
                                                {chap.sections.length > 0 && (
                                                    <span 
                                                        onClick={(e) => toggleChapterExpand(cIdx, e)}
                                                        className={`p-1 rounded hover:bg-white/10 text-[10px] transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                                                    >
                                                        ▼
                                                    </span>
                                                )}
                                            </button>
                                            
                                            {isExpanded && chap.sections.length > 0 && (
                                                <div className="pl-4 mt-1 space-y-0.5 border-l border-orange-500/20 ml-3">
                                                    {chap.sections.map((sec, sIdx) => {
                                                        const isActiveSec = isActiveChap && activeSectionIndex === sIdx
                                                        return (
                                                            <button
                                                                key={sec.id}
                                                                onClick={() => selectSection(cIdx, sIdx)}
                                                                className={`w-full text-left p-1.5 rounded-lg text-[11px] transition-all duration-200 cursor-pointer ${
                                                                    isActiveSec
                                                                        ? 'text-orange-500 font-bold bg-orange-500/10'
                                                                        : darkMode
                                                                            ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                                                                            : 'text-gray-600 hover:text-orange-700 hover:bg-orange-50/50'
                                                                }`}
                                                            >
                                                                {sec.id} {sec.title}
                                                            </button>
                                                        )
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </aside>

                    {/* Main Content Area */}
                    <main className="flex-grow min-w-0">
                        {loading ? (
                            <div className={`p-8 rounded-2xl shadow-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-orange-200/50'}`}>
                                <SkeletonLoader darkMode={darkMode} />
                            </div>
                        ) : (
                            <div className={`p-6 md:p-8 rounded-2xl shadow-xl border transition-all duration-300 ${
                                darkMode 
                                    ? 'bg-gray-800/80 border-gray-700' 
                                    : 'bg-white border-orange-200/50'
                            }`}>
                                {/* Fallback Banner */}
                                {language === 'tr' && activeChapter?.isFallback && (
                                    <div className="mb-6 p-4 rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-300 text-xs flex items-center gap-2">
                                        <span>💡</span>
                                        <span>Bu bölüm henüz Türkçe'ye çevrilmemiştir. Orijinal İngilizce içerik gösterilmektedir.</span>
                                    </div>
                                )}

                                <h1 className="text-xl md:text-3xl font-extrabold mb-6 pb-4 border-b border-gray-700 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                                    {activeTitle}
                                </h1>

                                <div className="space-y-6">
                                    {activeContentBlocks.map((block, idx) => {
                                        if (block.type === 'header') {
                                            return (
                                                <h3 key={idx} className="text-sm md:text-base font-bold text-orange-500 mt-6 mb-2 tracking-wide uppercase">
                                                    {block.text}
                                                </h3>
                                            );
                                        } else if (block.type === 'code') {
                                            return (
                                                <CodeBlock 
                                                    key={idx} 
                                                    code={block.lines.join('\n')} 
                                                    darkMode={darkMode} 
                                                />
                                            );
                                        } else {
                                            const formattedHtml = block.lines
                                                .map(line => parseFormatting(line, darkMode, searchQuery))
                                                .join('<br />');
                                            return (
                                                <p 
                                                    key={idx} 
                                                    className="text-xs md:text-sm leading-relaxed opacity-95" 
                                                    dangerouslySetInnerHTML={{ __html: formattedHtml }}
                                                />
                                            );
                                        }
                                    })}
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    )
}
