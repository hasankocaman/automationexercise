// TypeScript Learning Platform Data
// Fully bilingual structure (no applyTr shifts)
// Satisfies W3Schools structure & 2-2-2-2 pedagogical standards

export const typescriptData = {
  "en": {
    "hero": {
      "title": "🔷 TypeScript",
      "subtitle": "TypeScript for Playwright & Test Automation",
      "intro": "Learn TypeScript for modern test automation. From type basics to advanced Playwright patterns — write safer, more maintainable tests with full IDE support, autocomplete, and compile-time error catching."
    },
    "tabs": [
      "🎯 Intro & Why",
      "📦 Installation",
      "🔷 Simple & Special Types",
      "📚 Arrays & Tuples",
      "📦 Object Types & Enums",
      "🤝 Interface & Type Aliases",
      "⚙️ Functions & Casting",
      "🏛️ Classes & Decorators",
      "🧩 Generics",
      "🛠️ Utility Types & Keyof",
      "📝 Template Literals & Null",
      "🐛 Error Handling & Advanced Types",
      "🧪 QA Use Cases",
      "☕ Java → TS",
      "🏃 Test Runners",
      "💼 Interview Q&A",
      "📝 Practice & Reference"
    ],
    "sections": [
      {
        "title": {
          "en": "Intro & Why TypeScript",
          "tr": "TypeScript Nedir & Neden Kullanmalı?"
        },
        "blocks": [
          {
            "type": "heading",
            "content": {
              "en": "TypeScript vs JavaScript",
              "tr": "TypeScript vs JavaScript"
            }
          },
          {
            "type": "text",
            "content": {
              "en": "TypeScript is a statically typed superset of JavaScript developed by Microsoft. Every valid JavaScript file is also valid TypeScript — you adopt it incrementally without rewriting your entire codebase. TypeScript adds a compile step that catches type errors, undefined property accesses, and wrong argument types before your code ever runs, turning runtime surprises into development-time feedback.",
              "tr": "TypeScript, Microsoft tarafından geliştirilen, statik olarak tiplenmiş bir JavaScript üst kümesidir. Her geçerli JavaScript dosyası aynı zamanda geçerli bir TypeScript dosyasıdır — tüm kod tabanınızı yeniden yazmadan kademeli olarak benimseyebilirsiniz. TypeScript, tür hatalarını, tanımsız özellik erişimlerini ve yanlış argüman tiplerini kodunuz çalışmadan önce yakalayan bir derleme adımı ekler."
            }
          },
          {
            "type": "heading",
            "content": {
              "en": "Why TypeScript for Test Automation?",
              "tr": "Test Otomasyonu için Neden TypeScript?"
            },
            "difficulty": "🟢 Beginner"
          },
          {
            "type": "grid",
            "cols": 3,
            "items": [
              {
                "icon": {
                  "en": "🐛",
                  "tr": "🐛"
                },
                "label": {
                  "en": "Catch Errors Early",
                  "tr": "Hataları Erken Yakala"
                },
                "desc": {
                  "en": "Type errors surface at compile time in your IDE — not at 2 AM when a test suite fails in CI.",
                  "tr": "Tür hataları IDE'nizde derleme zamanında ortaya çıkar — CI'da gece 2'de test paketi başarısız olduğunda değil."
                }
              },
              {
                "icon": {
                  "en": "💡",
                  "tr": "💡"
                },
                "label": {
                  "en": "IDE Autocomplete",
                  "tr": "IDE Otomatik Tamamlama"
                },
                "desc": {
                  "en": "Full IntelliSense for Playwright's Page, Locator, Browser, and your own Page Objects — no more guessing method names.",
                  "tr": "Playwright'ın Page, Locator, Browser ve kendi Page Object'leriniz için tam IntelliSense — metod adlarını artık tahmin etmek yok."
                }
              },
              {
                "icon": {
                  "en": "🔧",
                  "tr": "🔧"
                },
                "label": {
                  "en": "Safe Refactoring",
                  "tr": "Güvenli Yeniden Düzenleme"
                },
                "desc": {
                  "en": "Rename a method or change a selector type and TypeScript instantly highlights every affected call site.",
                  "tr": "Bir metod adını veya seçici tipini değiştirin; TypeScript etkilenen tüm çağrı noktalarını anında gösterir."
                }
              },
              {
                "icon": {
                  "en": "📖",
                  "tr": "📖"
                },
                "label": {
                  "en": "Self-Documenting Code",
                  "tr": "Kendini Belgeleyen Kod"
                },
                "desc": {
                  "en": "Type signatures act as inline documentation. A function typed `(user: User): Promise<void>` explains itself without comments.",
                  "tr": "Tip imzaları satır içi dokümantasyon görevi görür. `(user: User): Promise<void>` olarak tiplenmiş bir fonksiyon kendini açıklar."
                }
              },
              {
                "icon": {
                  "en": "👥",
                  "tr": "👥"
                },
                "label": {
                  "en": "Team Scale",
                  "tr": "Takım Ölçeği"
                },
                "desc": {
                  "en": "Large QA teams benefit most — typed interfaces enforce contracts between page objects, fixtures, and test data factories.",
                  "tr": "Büyük QA takımları en çok yararlanır — tipli interface'ler page object'ler, fixture'lar ve test data factory'leri arasındaki sözleşmeleri zorunlu kılar."
                }
              },
              {
                "icon": {
                  "en": "🎭",
                  "tr": "🎭"
                },
                "label": {
                  "en": "Playwright Native",
                  "tr": "Playwright Native"
                },
                "desc": {
                  "en": "Playwright is written in TypeScript and ships first-class .d.ts definitions. TypeScript is the officially recommended language for Playwright.",
                  "tr": "Playwright TypeScript ile yazılmıştır ve birinci sınıf .d.ts tanımları içerir. TypeScript, Playwright için resmi olarak önerilen dildir."
                }
              }
            ]
          },
          {
            "type": "heading",
            "content": {
              "en": "TypeScript vs JavaScript: Feature Comparison",
              "tr": "TypeScript vs JavaScript: Özellik Karşılaştırması"
            }
          },
          {
            "type": "table",
            "headers": [
              {
                "en": "Feature",
                "tr": "Özellik"
              },
              {
                "en": "JavaScript",
                "tr": "JavaScript"
              },
              {
                "en": "TypeScript",
                "tr": "TypeScript"
              }
            ],
            "rows": [
              [
                {
                  "en": "Type safety",
                  "tr": "Tür güvenliği"
                },
                {
                  "en": "None (dynamic)",
                  "tr": "Yok (dinamik)"
                },
                {
                  "en": "Static, optional",
                  "tr": "Statik, isteğe bağlı"
                }
              ],
              [
                {
                  "en": "IDE support",
                  "tr": "IDE desteği"
                },
                {
                  "en": "Basic",
                  "tr": "Temel"
                },
                {
                  "en": "Full IntelliSense + autocomplete",
                  "tr": "Tam IntelliSense + otomatik tamamlama"
                }
              ],
              [
                {
                  "en": "Compile step",
                  "tr": "Derleme adımı"
                },
                {
                  "en": "None — runs directly",
                  "tr": "Yok — doğrudan çalışır"
                },
                {
                  "en": "tsc compiles to .js",
                  "tr": "tsc ile .js'e derlenir"
                }
              ],
              [
                {
                  "en": "Learning curve",
                  "tr": "Öğrenme eğrisi"
                },
                {
                  "en": "Low",
                  "tr": "Düşük"
                },
                {
                  "en": "Low→Medium (types add concepts)",
                  "tr": "Düşük→Orta (tipler kavram ekler)"
                }
              ],
              [
                {
                  "en": "Playwright support",
                  "tr": "Playwright desteği"
                },
                {
                  "en": "Supported",
                  "tr": "Destekleniyor"
                },
                {
                  "en": "First-class, recommended",
                  "tr": "Birinci sınıf, önerilen"
                }
              ],
              [
                {
                  "en": "Error detection time",
                  "tr": "Hata algılama zamanı"
                },
                {
                  "en": "Runtime (tests fail)",
                  "tr": "Çalışma zamanı (testler başarısız)"
                },
                {
                  "en": "Compile time (before running)",
                  "tr": "Derleme zamanı (çalıştırmadan önce)"
                }
              ]
            ]
          },
          {
            "type": "heading",
            "content": {
              "en": "TypeScript in the Testing Ecosystem",
              "tr": "Test Ekosisteminde TypeScript"
            }
          },
          {
            "type": "table",
            "headers": [
              {
                "en": "Tool",
                "tr": "Araç"
              },
              {
                "en": "TS Support",
                "tr": "TS Desteği"
              },
              {
                "en": "Notes",
                "tr": "Notlar"
              }
            ],
            "rows": [
              [
                {
                  "en": "Playwright",
                  "tr": "Playwright"
                },
                {
                  "en": "First-class",
                  "tr": "Birinci sınıf"
                },
                {
                  "en": "Written in TS; all types ship in the package",
                  "tr": "TS ile yazılmış; tüm tipler pakette mevcut"
                }
              ],
              [
                {
                  "en": "Jest",
                  "tr": "Jest"
                },
                {
                  "en": "Excellent (via ts-jest)",
                  "tr": "Mükemmel (ts-jest ile)"
                },
                {
                  "en": "Install ts-jest + @types/jest",
                  "tr": "ts-jest + @types/jest kur"
                }
              ],
              [
                {
                  "en": "Cypress",
                  "tr": "Cypress"
                },
                {
                  "en": "Good",
                  "tr": "İyi"
                },
                {
                  "en": "Include tsconfig; some any-heavy internals",
                  "tr": "tsconfig ekle; bazı any-ağırlıklı iç kısımlar"
                }
              ],
              [
                {
                  "en": "Vitest",
                  "tr": "Vitest"
                },
                {
                  "en": "Native",
                  "tr": "Native"
                },
                {
                  "en": "Built on Vite; zero-config TypeScript",
                  "tr": "Vite üzerine kurulu; sıfır konfigürasyon TypeScript"
                }
              ]
            ]
          },
          {
            "type": "tip",
            "content": {
              "en": "If you're starting a new Playwright project today, choose TypeScript from the first `npm init playwright@latest` prompt. Retrofitting types into a large JS test suite is far harder than starting typed.",
              "tr": "Bugün yeni bir Playwright projesi başlatıyorsanız, ilk `npm init playwright@latest` komutundan TypeScript'i seçin. Büyük bir JS test paketine sonradan tip eklemek, baştan tipli başlamaktan çok daha zordur."
            }
          },
          {
            "type": "simple-box",
            "emoji": "🛡️",
            "content": {
              "tr": "TypeScript, emniyet kemeri takılmış bir araba gibidir. JavaScript ise kemersiz hız yapmaktır — kaza anında (hata durumunda) emniyet kemeri hayat kurtarır ve sizi korur.",
              "en": "TypeScript is like a car with a seatbelt fastened. JavaScript is speeding without a belt — the seatbelt saves your life and protects you during an accident (error)."
            }
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "Neden Derleme Zamanı Kontrolü? JavaScript dinamik bir dildir; hatalar ancak kod çalışırken (runtime) ortaya çıkar. TypeScript ise kod çalışmadan önce türleri kontrol ederek olası çökmeleri önler.",
              "en": "Why Compile-Time Checks? JavaScript is dynamic; errors only surface during execution (runtime). TypeScript prevents crashes by checking types before execution."
            }
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "Geliştirici Verimliliği: Kod yazarken IDE'nin size otomatik tamamlama (IntelliSense) sunması, metod isimlerini ezberleme ihtiyacını ortadan kaldırır ve yazım hatalarını sıfıra indirir.",
              "en": "Developer Productivity: Having the IDE suggest autocomplete options (IntelliSense) eliminates the need to memorize method names and reduces typos to zero."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: Her LEGO parçasının üzerindeki çıkıntıların boyutu ve şekli bellidir. Yanlış boyuttaki iki parçayı (yanlış türdeki iki veriyi) birleştirmeye çalışırsanız birbirine oturmazlar.",
              "en": "LEGO analogy: Each LEGO piece has a fixed stud size and shape. If you try to join two pieces of the wrong size (two data types of different shapes), they won't fit."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: TypeScript, LEGO setinin içinden çıkan yapım kılavuzu gibidir. Hangi parçanın nereye takılması gerektiğini size adım adım gösterir ve yanlış parça kullanımını engeller.",
              "en": "LEGO analogy: TypeScript is like the instruction manual in a LEGO set. It shows you step-by-step where each piece goes and prevents you from using the wrong brick."
            }
          },
          {
            "type": "quiz",
            "question": {
              "tr": "TypeScript kodunun doğrudan tarayıcıda çalışmamasının nedeni nedir?",
              "en": "Why can't TypeScript code run directly in the browser?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "tr": "Tarayıcılar sadece JavaScript motorlarına sahiptir, derleme adımı (.ts -> .js) zorunludur",
                  "en": "Browsers only have JavaScript engines, so compilation (.ts -> .js) is required"
                }
              },
              {
                "id": "b",
                "text": {
                  "tr": "TypeScript çok yavaştır",
                  "en": "TypeScript is too slow"
                }
              },
              {
                "id": "c",
                "text": {
                  "tr": "TypeScript sadece sunucuda çalışabilir",
                  "en": "TypeScript can only run on servers"
                }
              },
              {
                "id": "d",
                "text": {
                  "tr": "Tarayıcıların TypeScript motoru paralıdır",
                  "en": "Browsers charge a fee for TypeScript engines"
                }
              }
            ],
            "correct": "a",
            "explanation": {
              "tr": "Tarayıcılar (Chrome, Firefox vb.) yalnızca JavaScript kodunu anlar. Bu yüzden TypeScript derleyicisi (tsc) kodu standart JavaScript'e (.js) dönüştürmelidir.",
              "en": "Browsers (Chrome, Firefox, etc.) only understand JavaScript code. Therefore, the TypeScript compiler (tsc) must transform TS into standard JavaScript (.js)."
            },
            "retryQuestion": {
              "question": {
                "tr": "tsc komutu çalıştırıldığında ne üretilir?",
                "en": "What is generated when the tsc command is executed?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "tr": "Bir yürütülebilir .exe dosyası",
                    "en": "An executable .exe file"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "tr": "Düz bir .js (JavaScript) dosyası",
                    "en": "A plain .js (JavaScript) file"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "tr": "Bir PDF raporu",
                    "en": "A PDF report"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "tr": "Bir HTML sayfası",
                    "en": "An HTML page"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "tr": "tsc (TypeScript Compiler), .ts uzantılı kaynak kod dosyalarını tarayıcıda veya Node.js'te çalışabilecek düz .js dosyalarına derler.",
                "en": "tsc (TypeScript Compiler) compiles .ts source files into plain .js files that can execute in the browser or Node.js."
              }
            }
          },
          {
            "type": "quiz",
            "question": {
              "en": "What is TypeScript's core value proposition in test automation?",
              "tr": "TypeScript'in test otomasyonundaki temel değer önerisi nedir?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "Makes tests run faster",
                  "tr": "Testleri daha hızlı çalıştırır"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "Catches type errors at compile time, before tests even run in CI",
                  "tr": "Tür hatalarını derleme zamanında yakalar, testler CI'da çalışmadan önce"
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "Tarayıcı ihtiyacını ortadan kaldırır",
                  "tr": "Tarayıcı ihtiyacını ortadan kaldırır"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "Automatically runs tests in parallel",
                  "tr": "Testleri otomatik olarak paralel çalıştırır"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "en": "TypeScript adds a compile step: type errors, undefined property access, and wrong argument types become visible in the IDE before the code ever runs. This shifts the feedback loop from a test suite silently failing in CI at 2am to seeing the problem the moment you write it — it has nothing to do with speed or parallelism.",
              "tr": "TypeScript bir derleme adımı ekler: tür hataları, tanımsız özellik erişimleri ve yanlış argüman tipleri kodun hiç çalışmadan önce IDE'de görünür hale gelir. Bu, gece 2'de CI'da sessizce başarısız olan bir test paketinden, sorunu yazarken anında gösteren bir geri bildirim döngüsüne geçiştir — hız veya paralellikle ilgisi yoktur."
            },
            "retryQuestion": {
              "question": {
                "en": "What happens if a developer writes `let count: number = \"5\"`?",
                "tr": "Bir geliştirici `let count: number = \"5\"` yazarsa ne olur?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "The code runs fine, count holds the string \"5\"",
                    "tr": "Kod çalışır, count değişkeni \"5\" string'ini tutar"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "The TypeScript compiler reports a type error before the code ever runs",
                    "tr": "TypeScript derleyicisi kodu çalıştırmadan önce bir tip hatası verir"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "The JavaScript runtime throws an exception",
                    "tr": "JavaScript runtime'ı bir exception fırlatır"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "TypeScript automatically converts the string to a number",
                    "tr": "TypeScript string'i otomatik olarak sayıya çevirir"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "en": "This is compile-time type safety in action: `\"5\"` is a string literal, not assignable to `number`, and the compiler flags it with a red squiggly in the IDE before the code ever runs. Runtime never even gets involved — the error is visible the moment it is written.",
                "tr": "Bu, derleme zamanı tip güvenliğinin somut bir örneğidir: `\"5\"` bir string literal'dir, `number` tipine atanamaz, ve derleyici bunu kod hiç çalışmadan IDE'de kırmızı çizgiyle işaretler. Çalışma zamanı hiç devreye girmez — hata yazarken anında görünür."
              }
            }
          },
          {
            "type": "ts-mini-hero",
            "promptTr": "Sana bir şey soracağım: TypeScript ile JavaScript arasındaki en büyük fark nedir? Teknik terim kullanmadan, sanki 5 yaşındaki birine anlatır gibi açıkla!",
            "promptEn": "I have a question: what's the biggest difference between TypeScript and JavaScript? No jargon — explain it like I'm 5!",
            "keywords": [
              [
                "derleme",
                "compile",
                "yazarken",
                "yazmadan"
              ],
              "hata",
              [
                "güvenli",
                "safe",
                "güvenlik"
              ],
              [
                "tip",
                "type"
              ],
              [
                "kontrol",
                "check"
              ]
            ],
            "modelAnswerTr": "TypeScript, JavaScript'e 'tip etiketleri' ekler. Bir kutu 'sadece sayı' diye etiketlenir — yanlış bir şey koymaya çalışırsan anında uyarı alırsın, kod çalışmadan önce!",
            "modelAnswerEn": "TypeScript adds 'type labels' to JavaScript. A box is labeled 'numbers only' — try to put the wrong thing in and you get a warning immediately, before the code even runs!"
          }
        ]
      },
      {
        "title": {
          "en": "Installation & Setup",
          "tr": "Kurulum & Yapılandırma"
        },
        "blocks": [
          {
            "type": "heading",
            "content": {
              "en": "Step 1 — Install Node.js LTS",
              "tr": "Adım 1 — Node.js LTS Kurulumu"
            },
            "difficulty": "🟢 Beginner"
          },
          {
            "type": "text",
            "content": {
              "en": "TypeScript runs on Node.js. Always install the LTS (Long-Term Support) release — it is the most stable version and is what CI/CD environments use. Download from https://nodejs.org and choose the 'LTS' button.",
              "tr": "TypeScript, Node.js üzerinde çalışır. Her zaman LTS (Uzun Vadeli Destek) sürümünü kurun — bu en kararlı versiyondur ve CI/CD ortamlarının kullandığı sürümdür. https://nodejs.org adresinden indirin ve 'LTS' düğmesini seçin."
            }
          },
          {
            "type": "steps",
            "items": [
              {
                "en": "Windows: download the .msi installer from nodejs.org, run it, leave all defaults, tick 'Add to PATH'",
                "tr": "Windows: nodejs.org'dan .msi yükleyicisini indirin, çalıştırın, tüm varsayılanları bırakın, 'Add to PATH' kutusunu işaretleyin"
              },
              {
                "en": "macOS: use Homebrew — `brew install node` — or download the .pkg from nodejs.org",
                "tr": "macOS: Homebrew kullanın — `brew install node` — veya nodejs.org'dan .pkg indirin"
              },
              {
                "en": "Linux (Ubuntu/Debian): `curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - && sudo apt-get install -y nodejs`",
                "tr": "Linux (Ubuntu/Debian): `curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - && sudo apt-get install -y nodejs`"
              },
              {
                "en": "Verify both tools are installed by running the commands below",
                "tr": "Aşağıdaki komutları çalıştırarak her iki aracın da kurulu olduğunu doğrulayın"
              }
            ]
          },
          {
            "type": "code",
            "language": "bash",
            "label": {
              "en": "Verify Node.js and npm",
              "tr": "Verify Node.js and npm"
            },
            "content": {
              "en": "# Check Node.js version (should be 18.x or 20.x LTS)\nnode --version\n# Expected: v20.11.0\n\n# Check npm (Node Package Manager) version\nnpm --version\n# Expected: 10.2.4",
              "tr": "# Check Node.js version (should be 18.x or 20.x LTS)\nnode --version\n# Expected: v20.11.0\n\n# Check npm (Node Package Manager) version\nnpm --version\n# Expected: 10.2.4"
            },
            "expected": "v20.11.0\n10.2.4"
          },
          {
            "type": "heading",
            "content": {
              "en": "Step 2 — Install TypeScript Globally",
              "tr": "Adım 2 — TypeScript'i Global Kurma"
            }
          },
          {
            "type": "code",
            "language": "bash",
            "label": {
              "en": "Global TypeScript install",
              "tr": "Global TypeScript install"
            },
            "content": {
              "en": "# Install TypeScript compiler globally (available everywhere on your machine)\nnpm install -g typescript\n\n# Verify the TypeScript compiler is installed\ntsc --version\n# Expected: Version 5.4.5",
              "tr": "# Install TypeScript compiler globally (available everywhere on your machine)\nnpm install -g typescript\n\n# Verify the TypeScript compiler is installed\ntsc --version\n# Expected: Version 5.4.5"
            },
            "expected": "Version 5.4.5"
          },
          {
            "type": "heading",
            "content": {
              "en": "Step 3 — Create tsconfig.json",
              "tr": "Adım 3 — tsconfig.json Oluşturma"
            }
          },
          {
            "type": "text",
            "content": {
              "en": "tsconfig.json tells the TypeScript compiler how to compile your project. Every TypeScript project needs one. You can generate a starter with `tsc --init`, or use the annotated template below which is optimised for Playwright.",
              "tr": "tsconfig.json, TypeScript derleyicisine projenizi nasıl derleyeceğini söyler. Her TypeScript projesi bir tane gerektirir. `tsc --init` ile bir başlangıç şablonu oluşturabilir veya Playwright için optimize edilmiş aşağıdaki açıklamalı şablonu kullanabilirsiniz."
            }
          },
          {
            "type": "code",
            "language": "json",
            "label": {
              "en": "tsconfig.json — fully annotated",
              "tr": "tsconfig.json — fully annotated"
            },
            "content": {
              "en": "{\n  \"compilerOptions\": {\n    // ── Output ──────────────────────────────────\n    \"target\": \"ES2022\",          // Compile to modern JS (Node 18+ understands this)\n    \"module\": \"commonjs\",        // Use require() style modules (Node default)\n    \"outDir\": \"./dist\",          // Compiled .js files go into the dist/ folder\n    \"rootDir\": \"./src\",          // Where your .ts source files live\n\n    // ── Type Checking ────────────────────────────\n    \"strict\": true,              // Enable ALL strict type checks (recommended)\n    \"noImplicitAny\": true,       // Error on variables that implicitly get type 'any'\n    \"strictNullChecks\": true,    // null and undefined are not assignable to other types\n    \"noUnusedLocals\": true,      // Error on variables declared but never used\n    \"noUnusedParameters\": true,  // Error on function parameters never used\n\n    // ── Module Resolution ────────────────────────\n    \"moduleResolution\": \"node\",  // Use Node.js module resolution algorithm\n    \"esModuleInterop\": true,     // Allow default imports from CommonJS modules\n    \"resolveJsonModule\": true,   // Allow import of .json files with type safety\n    \"baseUrl\": \".\",              // Base path for non-relative imports\n\n    // ── Source Maps ──────────────────────────────\n    \"sourceMap\": true,           // Generate .js.map files for debugging\n\n    // ── Miscellaneous ────────────────────────────\n    \"lib\": [\"ES2022\"],           // Include built-in type definitions for ES2022\n    \"skipLibCheck\": true,        // Skip type checking of .d.ts files in node_modules\n    \"forceConsistentCasingInFileNames\": true  // Prevent cross-OS import case bugs\n  },\n  \"include\": [\"src/**/*\", \"tests/**/*\"],   // Which files to compile\n  \"exclude\": [\"node_modules\", \"dist\"]       // Which files to skip\n}",
              "tr": "{\n  \"compilerOptions\": {\n    // ── Output ──────────────────────────────────\n    \"target\": \"ES2022\",          // Compile to modern JS (Node 18+ understands this)\n    \"module\": \"commonjs\",        // Use require() style modules (Node default)\n    \"outDir\": \"./dist\",          // Compiled .js files go into the dist/ folder\n    \"rootDir\": \"./src\",          // Where your .ts source files live\n\n    // ── Type Checking ────────────────────────────\n    \"strict\": true,              // Enable ALL strict type checks (recommended)\n    \"noImplicitAny\": true,       // Error on variables that implicitly get type 'any'\n    \"strictNullChecks\": true,    // null and undefined are not assignable to other types\n    \"noUnusedLocals\": true,      // Error on variables declared but never used\n    \"noUnusedParameters\": true,  // Error on function parameters never used\n\n    // ── Module Resolution ────────────────────────\n    \"moduleResolution\": \"node\",  // Use Node.js module resolution algorithm\n    \"esModuleInterop\": true,     // Allow default imports from CommonJS modules\n    \"resolveJsonModule\": true,   // Allow import of .json files with type safety\n    \"baseUrl\": \".\",              // Base path for non-relative imports\n\n    // ── Source Maps ──────────────────────────────\n    \"sourceMap\": true,           // Generate .js.map files for debugging\n\n    // ── Miscellaneous ────────────────────────────\n    \"lib\": [\"ES2022\"],           // Include built-in type definitions for ES2022\n    \"skipLibCheck\": true,        // Skip type checking of .d.ts files in node_modules\n    \"forceConsistentCasingInFileNames\": true  // Prevent cross-OS import case bugs\n  },\n  \"include\": [\"src/**/*\", \"tests/**/*\"],   // Which files to compile\n  \"exclude\": [\"node_modules\", \"dist\"]       // Which files to skip\n}"
            }
          },
          {
            "type": "heading",
            "content": {
              "en": "Step 4 — VS Code Extensions",
              "tr": "Adım 4 — VS Code Uzantıları"
            }
          },
          {
            "type": "list",
            "items": [
              {
                "label": {
                  "en": "TypeScript Language Features",
                  "tr": "TypeScript Language Features"
                },
                "desc": {
                  "en": "Extension ID: vscode.typescript-language-features — built in to VS Code, provides IntelliSense, go-to-definition, and refactoring.",
                  "tr": "Uzantı ID: vscode.typescript-language-features — VS Code'da yerleşik, IntelliSense, tanıma gitme ve yeniden düzenleme sağlar."
                }
              },
              {
                "label": {
                  "en": "ESLint",
                  "tr": "ESLint"
                },
                "desc": {
                  "en": "Extension ID: dbaeumer.vscode-eslint — lint TypeScript for code quality issues beyond type errors.",
                  "tr": "Uzantı ID: dbaeumer.vscode-eslint — tür hatalarının ötesinde kod kalitesi sorunları için TypeScript'i lint eder."
                }
              },
              {
                "label": {
                  "en": "Prettier",
                  "tr": "Prettier"
                },
                "desc": {
                  "en": "Extension ID: esbenp.prettier-vscode — auto-format TypeScript on save.",
                  "tr": "Uzantı ID: esbenp.prettier-vscode — kayıt sırasında TypeScript'i otomatik biçimlendirir."
                }
              },
              {
                "label": {
                  "en": "Playwright Test for VS Code",
                  "tr": "Playwright Test for VS Code"
                },
                "desc": {
                  "en": "Extension ID: ms-playwright.playwright — run and debug Playwright tests with a GUI directly inside VS Code.",
                  "tr": "Uzantı ID: ms-playwright.playwright — VS Code içinde doğrudan GUI ile Playwright testlerini çalıştırın ve hata ayıklayın."
                }
              }
            ]
          },
          {
            "type": "heading",
            "content": {
              "en": "Step 5 — Hello World in TypeScript",
              "tr": "Adım 5 — TypeScript'te Merhaba Dünya"
            }
          },
          {
            "type": "code",
            "language": "typescript",
            "label": {
              "en": "index.ts — your first typed program",
              "tr": "index.ts — your first typed program"
            },
            "content": {
              "en": "// index.ts\n// Typed 'Hello World' — note the explicit type annotations\n\n// A function that takes a name (must be a string) and returns a string\nfunction greet(name: string): string {\n  return `Hello, ${name}! Welcome to TypeScript.`;\n}\n\n// TypeScript catches this before you run it:\n// greet(42);  // Error: Argument of type 'number' is not assignable to 'string'\n\nconst message: string = greet(\"QA Engineer\");\nconsole.log(message);",
              "tr": "// index.ts\n// Typed 'Hello World' — note the explicit type annotations\n\n// A function that takes a name (must be a string) and returns a string\nfunction greet(name: string): string {\n  return `Hello, ${name}! Welcome to TypeScript.`;\n}\n\n// TypeScript catches this before you run it:\n// greet(42);  // Error: Argument of type 'number' is not assignable to 'string'\n\nconst message: string = greet(\"QA Engineer\");\nconsole.log(message);"
            },
            "expected": "Hello, QA Engineer! Welcome to TypeScript."
          },
          {
            "type": "code",
            "language": "bash",
            "label": {
              "en": "Compile and run",
              "tr": "Compile and run"
            },
            "content": {
              "en": "# Step 1: Compile TypeScript to JavaScript\ntsc index.ts\n# This creates index.js in the same folder\n\n# Step 2: Run the compiled JavaScript\nnode index.js\n# Expected: Hello, QA Engineer! Welcome to TypeScript.",
              "tr": "# Step 1: Compile TypeScript to JavaScript\ntsc index.ts\n# This creates index.js in the same folder\n\n# Step 2: Run the compiled JavaScript\nnode index.js\n# Expected: Hello, QA Engineer! Welcome to TypeScript."
            },
            "expected": "Hello, QA Engineer! Welcome to TypeScript."
          },
          {
            "type": "heading",
            "content": {
              "en": "Step 6 — ts-node: Skip the Compile Step",
              "tr": "Adım 6 — ts-node: Derleme Adımını Atla"
            }
          },
          {
            "type": "code",
            "language": "bash",
            "label": {
              "en": "Run TypeScript directly with ts-node",
              "tr": "Run TypeScript directly with ts-node"
            },
            "content": {
              "en": "# ts-node compiles and runs in one command — great for scripts and debugging\nnpx ts-node index.ts\n# Expected: Hello, QA Engineer! Welcome to TypeScript.\n\n# Install ts-node globally to avoid npx each time\nnpm install -g ts-node",
              "tr": "# ts-node compiles and runs in one command — great for scripts and debugging\nnpx ts-node index.ts\n# Expected: Hello, QA Engineer! Welcome to TypeScript.\n\n# Install ts-node globally to avoid npx each time\nnpm install -g ts-node"
            },
            "expected": "Hello, QA Engineer! Welcome to TypeScript."
          },
          {
            "type": "heading",
            "content": {
              "en": "Step 7 — Create a Playwright TypeScript Project",
              "tr": "Adım 7 — Playwright TypeScript Projesi Oluştur"
            }
          },
          {
            "type": "steps",
            "items": [
              {
                "en": "Create a new folder: `mkdir my-playwright-project && cd my-playwright-project`",
                "tr": "Yeni klasör oluştur: `mkdir my-playwright-project && cd my-playwright-project`"
              },
              {
                "en": "Run the Playwright installer: `npm init playwright@latest`",
                "tr": "Playwright yükleyicisini çalıştır: `npm init playwright@latest`"
              },
              {
                "en": "Prompt: 'Do you want to use TypeScript or JavaScript?' → Choose: TypeScript",
                "tr": "Soru: 'TypeScript mi JavaScript mi kullanmak istersiniz?' → TypeScript seçin"
              },
              {
                "en": "Prompt: 'Where to put your end-to-end tests?' → Accept default: tests",
                "tr": "Soru: 'End-to-end testlerinizi nereye koymak istersiniz?' → Varsayılanı kabul edin: tests"
              },
              {
                "en": "Prompt: 'Add a GitHub Actions workflow?' → Choose: true (recommended)",
                "tr": "Soru: 'GitHub Actions workflow eklensin mi?' → true seçin (önerilir)"
              },
              {
                "en": "Prompt: 'Install Playwright browsers?' → Choose: true",
                "tr": "Soru: 'Playwright tarayıcıları kurulsun mu?' → true seçin"
              },
              {
                "en": "Wait for install — Playwright downloads Chromium, Firefox, and WebKit",
                "tr": "Kurulum için bekleyin — Playwright Chromium, Firefox ve WebKit'i indirir"
              },
              {
                "en": "Run the example test: `npx playwright test`",
                "tr": "Örnek testi çalıştırın: `npx playwright test`"
              },
              {
                "en": "Open the HTML report: `npx playwright show-report`",
                "tr": "HTML raporu açın: `npx playwright show-report`"
              }
            ]
          },
          {
            "type": "code",
            "language": "bash",
            "label": {
              "en": "Full Playwright TypeScript setup from scratch",
              "tr": "Full Playwright TypeScript setup from scratch"
            },
            "content": {
              "en": "# 1. Create project folder\nmkdir my-playwright-project\ncd my-playwright-project\n\n# 2. Initialize Playwright (follow prompts: TypeScript, tests/, yes, yes)\nnpm init playwright@latest\n\n# 3. Verify project structure was created\nls\n# node_modules/   package.json   playwright.config.ts   tests/\n\n# 4. Run the bundled example tests\nnpx playwright test\n\n# 5. Open the rich HTML report in your browser\nnpx playwright show-report",
              "tr": "# 1. Create project folder\nmkdir my-playwright-project\ncd my-playwright-project\n\n# 2. Initialize Playwright (follow prompts: TypeScript, tests/, yes, yes)\nnpm init playwright@latest\n\n# 3. Verify project structure was created\nls\n# node_modules/   package.json   playwright.config.ts   tests/\n\n# 4. Run the bundled example tests\nnpx playwright test\n\n# 5. Open the rich HTML report in your browser\nnpx playwright show-report"
            }
          },
          {
            "type": "tip",
            "content": {
              "en": "After `npm init playwright@latest`, open `playwright.config.ts` — it is already fully typed. Your tests in `tests/` will be `.spec.ts` files. You get full autocomplete for `page`, `expect`, `browser`, and every Playwright API immediately.",
              "tr": "`npm init playwright@latest` sonrasında `playwright.config.ts` dosyasını açın — zaten tam olarak tiplenmiş. `tests/` klasöründeki testleriniz `.spec.ts` dosyaları olacak. `page`, `expect`, `browser` ve tüm Playwright API'si için anında otomatik tamamlama kullanabilirsiniz."
            }
          },
          {
            "type": "simple-box",
            "emoji": "🛠️",
            "content": {
              "tr": "Node.js kurmak, mutfağa su ve gaz tesisatı çekmek gibidir. TypeScript ise bu mutfağa aldığınız akıllı kahve makinesi gibidir — çalışması için altyapıya ihtiyaç duyar.",
              "en": "Installing Node.js is like laying down water and gas pipes in a kitchen. TypeScript is like the smart espresso machine you buy — it needs that infrastructure to run."
            }
          },
          {
            "type": "simple-box",
            "emoji": "⚙️",
            "content": {
              "tr": "tsconfig.json dosyası, bir akıllı cihazın Türkçe/İngilizce kullanım kılavuzu ve ayar menüsü gibidir. Cihazın hangi kurallarla çalışacağını buradan seçersiniz.",
              "en": "The tsconfig.json file is like the user manual and settings menu of a smart device. You configure the compilation rules and strictness options there."
            }
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "Neden ts-node Kullanırız? Kod yazarken sürekli tsc ile derleyip sonra node ile çalıştırmak zaman kaybıdır. ts-node bu iki adımı birleştirerek geliştirme hızını artırır.",
              "en": "Why Use ts-node? Having to compile with tsc and then run with node constantly wastes time. ts-node combines both steps to accelerate development."
            }
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "Neden strict: true Ayarı Önemlidir? TypeScript'in en güçlü koruma mekanizmalarını aktif eder. Bu ayar kapalıysa, TypeScript birçok tip hatasını gözden kaçırabilir.",
              "en": "Why is strict:true Important? It enables TypeScript's strongest safety checks. If disabled, TypeScript may overlook many potential type errors."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: tsconfig.json, LEGO fabrikasındaki kalite kontrol makinesi gibidir. Hangi boyuttaki tuğlalara izin verileceğini ve hangilerinin eleneceğini belirler.",
              "en": "LEGO analogy: tsconfig.json is like the quality control scanner at the LEGO factory. It determines which brick tolerances are allowed and which are rejected."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: Node.js, LEGO setlerini üzerine kurduğunuz zemin matı (baseplate) gibidir. TypeScript ise bu zemin üzerine inşa ettiğiniz karmaşık yapıların kendisüdür.",
              "en": "LEGO analogy: Node.js is like the green baseplate you build your LEGO sets on. TypeScript is the complex building you construct on top of that baseplate."
            }
          },
          {
            "type": "quiz",
            "question": {
              "tr": "tsconfig.json dosyasındaki 'strict: true' ayarı ne işe yarar?",
              "en": "What does the 'strict: true' configuration do in tsconfig.json?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "tr": "Derleyiciyi hızlandırır",
                  "en": "Speeds up the compiler"
                }
              },
              {
                "id": "b",
                "text": {
                  "tr": "Tüm katı tip kontrollerini ve güvenlik mekanizmalarını aktif hale getirir",
                  "en": "Enables all strict type checking and safety mechanisms"
                }
              },
              {
                "id": "c",
                "text": {
                  "tr": "JavaScript kodunu otomatik olarak optimize eder",
                  "en": "Automatically optimizes JavaScript code"
                }
              },
              {
                "id": "d",
                "text": {
                  "tr": "Kodun sadece macOS'ta çalışmasını sağlar",
                  "en": "Restricts the code to run only on macOS"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "tr": "strict: true ayarı, implicit any, strict null checks ve diğer katı tip denetim kurallarını tek bir bayrakla aktif eder. QA projelerinde açılması zorunludur.",
              "en": "The strict: true configuration enables implicit any checks, strict null checks, and other safety rules under a single flag. Mandatory for QA projects."
            },
            "retryQuestion": {
              "question": {
                "tr": "TypeScript projelerinde ts-node paketinin temel faydası nedir?",
                "en": "What is the primary benefit of the ts-node package in TypeScript projects?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "tr": "Test raporlarını güzelleştirir",
                    "en": "Beautifies test reports"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "tr": "Ayrı bir derleme (.js üretme) adımı olmadan TS dosyalarını doğrudan bellek üzerinde derleyip çalıştırır",
                    "en": "Compiles and executes TS files directly in memory without generating output files"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "tr": "Playwright testlerini paralel koşturur",
                    "en": "Runs Playwright tests in parallel"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "tr": "Tarayıcıları arka planda (headless) başlatır",
                    "en": "Launches browsers in headless mode"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "tr": "ts-node, geliştirme aşamasında tsc + node adımlarını tek komutta birleştirerek diske dosya yazmadan kod denemeyi sağlar.",
                "en": "ts-node combines tsc and node into a single command during development, letting you run TS code directly without writing files to disk."
              }
            }
          },
          {
            "type": "quiz",
            "question": {
              "en": "What is the main reason to prefer Node.js's LTS (Long Term Support) version when installing TypeScript?",
              "tr": "TypeScript kurulumunda Node.js'in LTS (Long Term Support) sürümünün tercih edilmesinin temel nedeni nedir?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "The LTS version always has the newest language features",
                  "tr": "LTS sürümü her zaman en yeni dil özelliklerine sahiptir"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "It is the most stable version and matches what CI/CD environments run",
                  "tr": "En kararlı sürümdür ve CI/CD ortamlarının kullandığı sürümle eşleşir"
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "Only the LTS version supports TypeScript",
                  "tr": "Sadece LTS sürümü TypeScript'i destekler"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "The LTS version requires no installation",
                  "tr": "LTS sürümü kurulum gerektirmez"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "en": "LTS versions get long-term security patches and a stability guarantee, which is why CI/CD pipelines, Docker images, and production servers typically run LTS. Using a different, newer version on your dev machine risks writing code that only works locally but fails in CI — the same reasoning behind picking a Java LTS JDK version (8/11/17/21).",
              "tr": "LTS sürümleri uzun süreli güvenlik yamaları ve kararlılık garantisi alır; bu yüzden CI/CD pipeline'ları, Docker imajları ve production sunucuları genellikle LTS kullanır. Geliştirme makinende farklı, daha yeni bir sürüm kullanırsan, sadece kendi makinende çalışan ama CI'da başarısız olan bir kod yazma riski oluşur — Java'da JDK LTS sürümü (8/11/17/21) seçmekle aynı mantık."
            },
            "retryQuestion": {
              "question": {
                "en": "A developer uses Node 22 (a non-LTS Current release) locally, while CI runs Node 20 LTS. What kind of risk does this mismatch create?",
                "tr": "Bir geliştirici local makinesinde Node 22 (henüz LTS olmayan, Current sürüm) kullanıyor, CI ise Node 20 LTS kullanıyor. Bu fark ne tür bir riske yol açar?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "No risk at all, Node versions are always backward compatible",
                    "tr": "Hiçbir risk yok, Node sürümleri her zaman geriye uyumludur"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "Code that works on the developer's machine may rely on an API not present in Node 20, and fail in CI",
                    "tr": "Geliştiricinin makinesinde çalışan kod, Node 20'de mevcut olmayan bir API'ye dayanıyorsa CI'da başarısız olabilir"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "The TypeScript compiler cannot run on different Node versions",
                    "tr": "TypeScript derleyicisi farklı Node sürümlerinde çalışmaz"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "Tests are automatically upgraded to Node 22 in CI",
                    "tr": "Testler her zaman CI'da otomatik olarak Node 22'ye yükseltilir"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "en": "Using an API or behavior available in a newer Node version but missing from the older LTS one causes code to work locally and then fail in CI with something like \"function is not defined.\" This is exactly why dev and CI environments should align on the same LTS version — version mismatch is a silent source of failures even when the code itself is correct.",
                "tr": "Yeni bir Node sürümünde mevcut olan ama eski LTS sürümünde olmayan bir API veya davranış kullanmak, kodun lokalde çalışıp CI'da \"fonksiyon tanımlı değil\" gibi bir hatayla başarısız olmasına yol açar. Bu yüzden geliştirme ve CI ortamlarının aynı LTS sürümünde hizalanması gerekir — versiyon uyuşmazlığı sessiz bir kaynaktır, kodun kendisi doğru olsa bile."
              }
            }
          },
          {
            "type": "ts-mini-hero",
            "promptTr": "Anlat bakalım: bir .ts dosyası yazıyoruz, sonuçta tarayıcı bunu nasıl çalıştırıyor? Aradaki adımları sırayla anlat.",
            "promptEn": "Explain this: we write a .ts file — how does the browser eventually run it? Walk me through the steps in order.",
            "keywords": [
              [
                "derleme",
                "compile",
                "tsc",
                "derleyici"
              ],
              [
                "js",
                "javascript",
                "dönüştür",
                "convert"
              ],
              [
                "tarayıcı",
                "browser",
                "node"
              ],
              [
                "adım",
                "step"
              ]
            ],
            "modelAnswerTr": ".ts dosyası → tsc derleyicisi JavaScript'e çevirir → .js dosyası → tarayıcı veya Node.js çalıştırır. Tarayıcı TypeScript'i doğrudan anlamaz.",
            "modelAnswerEn": ".ts file → tsc compiler converts to JavaScript → .js file → browser or Node.js runs it. The browser cannot run TypeScript directly."
          }
        ]
      },
      {
        "title": {
          "en": "Simple & Special Types",
          "tr": "Basit & Özel Tipler"
        },
        "blocks": [
          {
            "type": "heading",
            "text": {
              "en": "Simple Types",
              "tr": "Simple Types"
            },
            "difficulty": "🟢 Beginner"
          },
          {
            "type": "simple-box",
            "emoji": "🔷",
            "content": {
              "tr": "TypeScript, JavaScript'in üzerine etiket takılmış hali. 'Bu kutu sadece sayı içerir' etiketi gibi — yanlış bir şey koymaya çalışırsan hemen uyarı alırsın. Java'da zaten böyleydi; TypeScript bunu JavaScript'e getiriyor.",
              "en": "TypeScript is JavaScript with labels attached. Like a box labeled 'numbers only' — if you try to put the wrong thing in, you get an immediate warning. Java already had this; TypeScript brings it to JavaScript."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "Java'da her değişkenin tipi açıkça belirtilir: int x = 5; String name = 'Ali'. TypeScript'te aynı şey: let x: number = 5; let name: string = 'Ali'. Fark: TypeScript genellikle tipi otomatik çıkarabilir (type inference) — her yere yazmak zorunda değilsin.",
              "en": "Java requires explicit types: int x = 5; String name = 'Ali'. TypeScript is the same: let x: number = 5; let name: string = 'Ali'. Difference: TypeScript can usually infer the type automatically — you don't have to write it everywhere."
            }
          },
          {
            "type": "code",
            "language": "typescript",
            "code": "// TypeScript Simple Types — Java Comparison\n// Java:    int age = 25;\n// TypeScript: let age: number = 25;  (or just: let age = 25)\n\nlet age: number = 25;          // number (int, float, double all combined)\nlet name: string = \"Alice\";    // string\nlet isActive: boolean = true;  // boolean\nlet score: number = 98.5;      // TypeScript number = Java double\n\n// Type inference — TypeScript deduces type from value\nlet city = \"Istanbul\";         // TypeScript knows this is string\n// city = 42;                  // ERROR: Type 'number' not assignable to type 'string'\n\n// Type annotation vs inference\nlet explicitNum: number = 10;  // explicit annotation\nlet inferredNum = 10;          // inferred as number (same result)\n\n// any — disables type checking (avoid in production!)\nlet anything: any = \"hello\";\nanything = 42;                 // no error — but you lose type safety\nanything = true;\n\n// Function with typed params and return type\nfunction greet(name: string, times: number): string {\n  return (name + \" \").repeat(times).trim();\n}\nconsole.log(greet(\"Hi\", 3));   // Hi Hi Hi\n// greet(42, \"three\");          // ERROR: wrong types"
          },
          {
            "type": "editor",
            "lang": "typescript",
            "defaultCode": "// TypeScript catches errors at compile time\nfunction calculateTax(price: number, taxRate: number): number {\n  return price * (1 + taxRate);\n}\n\nconst total = calculateTax(100, 0.18);\nconsole.log(\"Total with tax:\", total);\n\n// Try: change 100 to \"100\" — TypeScript will show an error\n// const wrongTotal = calculateTax(\"100\", 0.18);"
          },
          {
            "type": "comparison",
            "title": {
              "tr": "Java ile Karşılaştırma",
              "en": "Java vs TypeScript — Basic Types"
            },
            "columns": [
              "Java",
              "TypeScript"
            ],
            "rows": [
              {
                "concept": {
                  "en": "Integer",
                  "tr": "Integer"
                },
                "java": "int x = 5;",
                "typescript": "let x: number = 5;"
              },
              {
                "concept": {
                  "en": "Float",
                  "tr": "Float"
                },
                "java": "double d = 3.14;",
                "typescript": "let d: number = 3.14;"
              },
              {
                "concept": {
                  "en": "String",
                  "tr": "String"
                },
                "java": "String s = \"hi\";",
                "typescript": "let s: string = \"hi\";"
              },
              {
                "concept": {
                  "en": "Boolean",
                  "tr": "Boolean"
                },
                "java": "boolean b = true;",
                "typescript": "let b: boolean = true;"
              },
              {
                "concept": {
                  "en": "No type",
                  "tr": "No type"
                },
                "java": "Object o = anything;",
                "typescript": "let o: any = anything;"
              }
            ]
          },
          {
            "type": "quiz",
            "question": {
              "en": "Which TypeScript type is used for both integers and floats?",
              "tr": "TypeScript'te hem integer hem float için hangi tip kullanılır?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "int",
                  "tr": "int"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "float",
                  "tr": "float"
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "number",
                  "tr": "number"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "numeric",
                  "tr": "numeric"
                }
              }
            ],
            "correct": "c",
            "explanation": {
              "en": "TypeScript's 'number' type covers Java's int, long, double, and float. There is only one numeric type. This distinction was important in Java — not in TypeScript.",
              "tr": "TypeScript'te 'number' tipi Java'daki int, long, double, float'un hepsini kapsar. Tek bir sayısal tip var. Java'da bu ayrım önemliydi — TypeScript'te yok."
            },
            "retryQuestion": {
              "question": {
                "en": "Which data type is preferred to store decimal numbers in TypeScript?",
                "tr": "TypeScript'te ondalıklı sayıları (decimal) saklamak için hangi veri tipi tercih edilir?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "decimal",
                    "tr": "decimal"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "float",
                    "tr": "float"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "number",
                    "tr": "number"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "double",
                    "tr": "double"
                  }
                }
              ],
              "correct": "c",
              "explanation": {
                "en": "TypeScript uses only the 'number' type for all numeric values, including both integers and floating-point numbers. There is no need to define distinct numeric types.",
                "tr": "TypeScript, tüm sayısal değerler (tam sayılar ve ondalıklı sayılar dahil) için sadece 'number' tipini kullanır. Farklı sayı tipleri tanımlamaya gerek yoktur."
              }
            }
          },
          {
            "type": "ts-mini-hero",
            "promptTr": "Bana şunu açıkla: Java'da int, float, double vardı. TypeScript'te neden hepsi sadece 'number'? Kısaca anlat.",
            "promptEn": "Explain this: Java had int, float, double. Why does TypeScript only have 'number' for all of them? Keep it short.",
            "keywords": [
              [
                "javascript",
                "js",
                "altta",
                "under",
                "temelde",
                "underneath"
              ],
              [
                "tek",
                "one",
                "single",
                "sadece"
              ],
              [
                "sayı",
                "number",
                "float"
              ],
              [
                "java",
                "fark",
                "difference"
              ]
            ],
            "modelAnswerTr": "JavaScript altında yalnızca tek tip sayı var (64-bit kayan nokta). TypeScript JavaScript üzerine kurulduğu için aynı kuralı kullanır. int/double ayrımı Java'nın JVM optimizasyonu için.",
            "modelAnswerEn": "Under the hood, JavaScript has only one number type (64-bit float). TypeScript builds on JavaScript so follows the same rule. The int/double split exists in Java for JVM performance optimization."
          },
          {
            "type": "heading",
            "text": {
              "en": "Special Types",
              "tr": "Special Types"
            },
            "difficulty": "🟢 Beginner"
          },
          {
            "type": "simple-box",
            "emoji": "⚠️",
            "content": {
              "0": "T",
              "1": "u",
              "2": "p",
              "3": "l",
              "4": "e",
              "5": "'",
              "6": "l",
              "7": "a",
              "8": "r",
              "tr": "Özel tipler, beklenmedik durumlar için. 'any' = her şey olabilir (kötü pratik), 'unknown' = bilinmiyor ama önce kontrol et, 'never' = bu kod asla çalışmaz, 'void' = fonksiyon bir şey döndürmez.",
              "en": "Special types for unexpected situations. 'any' = can be anything (bad practice), 'unknown' = unknown but check first, 'never' = this code never runs, 'void' = function returns nothing."
            }
          },
          {
            "type": "code",
            "language": "typescript",
            "code": "// TypeScript Special Types\n\n// void — function returns nothing (like Java void)\nfunction logMessage(msg: string): void {\n  console.log(\"[LOG]\", msg);\n  // no return value\n}\n\n// null and undefined\nlet nullVal: null = null;\nlet undVal: undefined = undefined;\n\n// any — escapes type checking (use sparingly)\nlet userInput: any = document.getElementById(\"input\");  // from DOM\nuserInput = 42;         // no error\n\n// unknown — safer than any: must type-check before use\nfunction processInput(input: unknown): string {\n  if (typeof input === \"string\") {\n    return input.toUpperCase();    // safe: we checked the type\n  }\n  if (typeof input === \"number\") {\n    return input.toFixed(2);       // safe: we checked the type\n  }\n  return String(input);            // fallback\n}\nconsole.log(processInput(\"hello\"));  // HELLO\nconsole.log(processInput(42.5));     // 42.50\n\n// never — function that never returns (throws or infinite loop)\nfunction throwError(message: string): never {\n  throw new Error(message);         // never returns normally\n}\n\n// Type guard pattern (common in QA code)\nfunction assertDefined<T>(val: T | null | undefined, name: string): T {\n  if (val == null) throwError(`${name} is required but was ${val}`);\n  return val;\n}"
          },
          {
            "type": "editor",
            "lang": "typescript",
            "defaultCode": "// Practice unknown vs any\nfunction parseAge(input: unknown): number {\n  if (typeof input === \"number\") return input;\n  if (typeof input === \"string\") {\n    const parsed = parseInt(input);\n    if (isNaN(parsed)) throw new Error(\"Invalid age: \" + input);\n    return parsed;\n  }\n  throw new Error(\"Cannot parse age from: \" + typeof input);\n}\n\nconsole.log(parseAge(25));       // 25\nconsole.log(parseAge(\"30\"));    // 30\n// console.log(parseAge(true)); // Error"
          },
          {
            "type": "quiz",
            "question": {
              "en": "What is the key difference between 'unknown' and 'any' in TypeScript?",
              "tr": "TypeScript'te 'unknown' ve 'any' arasındaki temel fark nedir?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "No difference",
                  "tr": "Hiçbir fark yok"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "unknown requires a type check before use, any does not",
                  "tr": "unknown kullanmadan önce tip kontrolü zorunlu, any'de değil"
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "unknown is only for strings, any is for everything",
                  "tr": "unknown sadece string için, any hepsi için"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "any is safer",
                  "tr": "any daha güvenli"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "en": "'unknown' cannot be used without a type check (typeof, instanceof). 'any' completely disables type safety. In production code, prefer unknown over any.",
              "tr": "'unknown' tip kontrolü (typeof, instanceof) yapılmadan kullanılamaz. 'any' tip güvenliğini tamamen devre dışı bırakır. Production kodunda any yerine unknown tercih edilir."
            },
            "retryQuestion": {
              "question": {
                "en": "What is the alternative to 'any' that forces type safety and prevents arbitrary method calls on a variable?",
                "tr": "Bir değişkene herhangi bir metodun uygulanmasını engelleyip tip güvenliğini zorunlu kılan 'any' alternatifi nedir?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "never",
                    "tr": "never"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "unknown",
                    "tr": "unknown"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "object",
                    "tr": "object"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "void",
                    "tr": "void"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "en": "The 'unknown' type allows you to write safe code by forcing you to perform type narrowing before interacting with the variable, whereas 'any' bypasses all type checks.",
                "tr": "'unknown' tipi, bir değişkenin üzerinde işlem yapmadan önce tip koruması (type narrowing) yapmanızı zorunlu kılarak güvenli bir kod yazmanıza olanak tanır. 'any' ise tüm tip kontrollerini atlar."
              }
            }
          },
          {
            "type": "ts-mini-hero",
            "promptTr": "Test et: 'any' ile 'unknown' arasındaki farkı kısa bir benzetmeyle anlat. Neden unknown daha güvenli?",
            "promptEn": "Test yourself: explain the difference between 'any' and 'unknown' with a quick analogy. Why is unknown safer?",
            "keywords": [
              [
                "kontrol",
                "check",
                "doğrula",
                "verify",
                "typeof"
              ],
              [
                "güvenli",
                "safe",
                "safer"
              ],
              [
                "tip",
                "type",
                "narrow"
              ],
              [
                "önce",
                "before",
                "first"
              ]
            ],
            "modelAnswerTr": "'any' = kasayı körü körüne kullan. 'unknown' = kasayı aç ama içini görmeden dokunma — önce typeof ile kontrol et. unknown daha güvenli çünkü yanlış operasyonu engeller.",
            "modelAnswerEn": "'any' = use the box blindly. 'unknown' = open it but don't touch until you check with typeof. unknown is safer because it prevents wrong operations on the value."
          },
          {
            "type": "simple-box",
            "emoji": "🏷️",
            "content": {
              "tr": "number, string ve boolean tipleri, oyuncak kutularının üzerindeki etiketler gibidir. 'Sadece Oyuncak Ayı' etiketli kutuya araba koyamazsınız.",
              "en": "The number, string, and boolean types are like stickers on toy boxes. You can't put a toy car in a box labeled 'Teddy Bears Only'."
            }
          },
          {
            "type": "simple-box",
            "emoji": "🕵️",
            "content": {
              "tr": "unknown tipi, hediye paketi sarılmış gizemli bir kutu gibidir. Ne olduğunu bilmediğin için açıp kontrol etmeden (narrowing) doğrudan içindekini çalıştıramazsın.",
              "en": "The unknown type is like a wrapped mystery gift box. Since you don't know what is inside, you cannot interact with it until you check its contents (narrowing)."
            }
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "Neden any Yerine unknown Tercih Edilmeli? any tipi tip denetimini tamamen kapatır ve çalışma zamanında çökmelere yol açar. unknown ise kontrol etmeye zorlayarak güvenliği korur.",
              "en": "Why Prefer unknown Over any? The any type disables safety checks entirely, risking runtime crashes. The unknown type preserves safety by forcing verification."
            }
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "Neden never Tipi Var? Bir fonksiyonun hata fırlattığını veya sonsuz döngüye girdiğini, yani kodun o noktadan ileriye asla gitmeyeceğini derleyiciye anlatmak için kullanılır.",
              "en": "Why is there a never Type? It informs the compiler that a function throws an exception or loops infinitely, meaning execution never proceeds past that point."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: number tipi kırmızı LEGO, string mavi LEGO'dur. Kırmızı yuvaya mavi parçayı takamazsınız.",
              "en": "LEGO analogy: The number type is a red brick, and string is a blue brick. You cannot plug a blue brick into a red slot."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: unknown tipi, rengini bilmediğiniz ve üzeri kapalı bir LEGO tuğlasıdır. Rengini açıp doğrulamadan (typeof check) onu diğer setlere uyduramazsınız.",
              "en": "LEGO analogy: The unknown type is a covered LEGO brick of unknown color. You cannot fit it into other assemblies until you inspect it first."
            }
          },
          {
            "type": "quiz",
            "question": {
              "tr": "TypeScript'te bir fonksiyonun asla bir değer döndürmeyeceğini (hata fırlatacağını veya sonsuz döngüye gireceğini) hangi tip belirtir?",
              "en": "Which type indicates that a function will never return a value (e.g. throws an error or loops infinitely)?"
            },
            "options": [
              {
                "id": "a",
                "text": "void"
              },
              {
                "id": "b",
                "text": "never"
              },
              {
                "id": "c",
                "text": "unknown"
              },
              {
                "id": "d",
                "text": "any"
              }
            ],
            "correct": "b",
            "explanation": {
              "tr": "never tipi, kodun o satırdan sonra asla normal bir şekilde ilerlemeyeceğini ifade eder. void ise fonksiyonun başarıyla tamamlandığını ama değer dönmediğini belirtir.",
              "en": "The never type represents values that will never occur (like functions that throw or loop infinitely). void indicates a function runs to completion but returns no value."
            },
            "retryQuestion": {
              "question": {
                "tr": "void ile never arasındaki temel fark nedir?",
                "en": "What is the key difference between void and never?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "tr": "Hiçbir fark yoktur",
                    "en": "There is no difference"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "tr": "void başarıyla biter ama değer dönmez; never ise hiçbir zaman başarıyla bitip geri dönmez",
                    "en": "void returns normally with no value; never never returns or finishes normally"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "tr": "never sadece sayılar içindir",
                    "en": "never is only for numbers"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "tr": "void sadece sınıflarda kullanılır",
                    "en": "void is only used in classes"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "tr": "void geri döner (undefined olarak), ama never fonksiyonun sonuna asla ulaşılamayacağını ve çağrıldığı yere geri dönmeyeceğini garanti eder.",
                "en": "void returns (as undefined), but never guarantees that the function's end is unreachable and it will never return to the caller."
              }
            }
          }
        ]
      },
      {
        "title": {
          "en": "Arrays & Tuples",
          "tr": "Diziler & Tuple'lar"
        },
        "blocks": [
          {
            "type": "heading",
            "text": {
              "en": "Arrays",
              "tr": "Arrays"
            },
            "difficulty": "🟢 Beginner"
          },
          {
            "type": "simple-box",
            "emoji": "📚",
            "content": {
              "0": "T",
              "1": "y",
              "2": "p",
              "3": "e",
              "4": " ",
              "5": "A",
              "6": "l",
              "7": "i",
              "8": "a",
              "9": "s",
              "10": " ",
              "11": "v",
              "12": "s",
              "13": " ",
              "14": "I",
              "15": "n",
              "16": "t",
              "17": "e",
              "18": "r",
              "19": "f",
              "20": "a",
              "21": "c",
              "22": "e",
              "tr": "TypeScript array'i Java'nın typed ArrayList'i gibi. Java'da List<String> yazınca sadece String girebilirdin. TypeScript'te string[] yazarsan sadece string girebilirsin.",
              "en": "TypeScript arrays are like Java's typed ArrayList. In Java, List<String> only accepts Strings. In TypeScript, string[] only accepts strings."
            }
          },
          {
            "type": "code",
            "language": "typescript",
            "code": "// TypeScript Arrays — two syntax options (both work)\n// Java: List<String> names = new ArrayList<>();\n// TypeScript:\nlet names: string[] = [\"Alice\", \"Bob\", \"Carol\"];    // preferred syntax\nlet scores: Array<number> = [95, 87, 72, 98];       // generic syntax\n\n// Typed array operations\nnames.push(\"Dave\");           // OK: string\n// names.push(42);            // ERROR: number not assignable to string\n\n// Array of objects (common in QA test data)\ninterface TestCase {\n  id: number;\n  name: string;\n  passed: boolean;\n}\n\nconst testCases: TestCase[] = [\n  { id: 1, name: \"login_test\", passed: true },\n  { id: 2, name: \"checkout_test\", passed: false },\n  { id: 3, name: \"profile_test\", passed: true },\n];\n\n// Filter, map, reduce — same as Java Stream API\nconst failedTests = testCases.filter(t => !t.passed);\nconst testNames = testCases.map(t => t.name);\nconst passCount = testCases.reduce((acc, t) => acc + (t.passed ? 1 : 0), 0);\n\nconsole.log(\"Failed:\", failedTests.length);    // 1\nconsole.log(\"Names:\", testNames);\nconsole.log(\"Pass count:\", passCount);          // 2\n\n// readonly array — like Java unmodifiableList\nconst fixedList: readonly string[] = [\"a\", \"b\", \"c\"];\n// fixedList.push(\"d\");        // ERROR: readonly"
          },
          {
            "type": "editor",
            "lang": "typescript",
            "defaultCode": "interface ApiEndpoint {\n  path: string;\n  method: \"GET\" | \"POST\" | \"PUT\" | \"DELETE\";\n  requiresAuth: boolean;\n}\n\nconst endpoints: ApiEndpoint[] = [\n  { path: \"/api/login\", method: \"POST\", requiresAuth: false },\n  { path: \"/api/users\", method: \"GET\", requiresAuth: true },\n  { path: \"/api/users/1\", method: \"DELETE\", requiresAuth: true },\n];\n\nconst publicEndpoints = endpoints.filter(e => !e.requiresAuth);\nconst paths = endpoints.map(e => `${e.method} ${e.path}`);\n\nconsole.log(\"Public endpoints:\", publicEndpoints.length);\npaths.forEach(p => console.log(p));"
          },
          {
            "type": "quiz",
            "question": {
              "en": "How do you declare a string array in TypeScript?",
              "tr": "TypeScript'te string array nasıl tanımlanır?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "let arr: Array<String>",
                  "tr": "let arr: Array<String>"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "let arr: string[]",
                  "tr": "let arr: string[]"
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "let arr = String[]",
                  "tr": "let arr = String[]"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "let arr: [string]",
                  "tr": "let arr: [string]"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "en": "string[] is the preferred syntax. Array<string> also works. [string] is tuple syntax — it defines a single-element string tuple.",
              "tr": "string[] tercih edilen syntax'tır. Array<string> da çalışır. [string] ise tuple sözdizimi — tek elemanlı string tuple'ı tanımlar."
            },
            "retryQuestion": {
              "question": {
                "en": "What is the most common way to declare an array of numbers in TypeScript?",
                "tr": "TypeScript'te birden fazla sayı içeren bir diziyi tanımlamanın en yaygın yolu nedir?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "let list: number[]",
                    "tr": "let list: number[]"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "let list: Array<number>",
                    "tr": "let list: Array<number>"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "let list = [number]",
                    "tr": "let list = [number]"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "let list: List<number>",
                    "tr": "let list: List<number>"
                  }
                }
              ],
              "correct": "a",
              "explanation": {
                "en": "The number[] syntax is the cleanest and most common way to define an array in TypeScript. Array<number> is also valid, but the shorter syntax is generally preferred.",
                "tr": "number[] syntax'ı TypeScript'te dizi tanımlamak için kullanılan en temiz ve yaygın yöntemdir. Array<number> da geçerlidir ancak genellikle kısa syntax tercih edilir."
              }
            }
          },
          {
            "type": "ts-lego-visual",
            "variant": "arrays-visual"
          },
          {
            "type": "heading",
            "text": {
              "en": "Tuples",
              "tr": "Tuples"
            },
            "difficulty": "🟢 Beginner"
          },
          {
            "type": "simple-box",
            "emoji": "🎁",
            "content": {
              "tr": "Tuple, sabit boyutlu ve her pozisyonun tipi bilinen bir dizi. 'İlk eleman her zaman isim (string), ikincisi yaş (number)' gibi. Java'da tam karşılığı yok — ama Python'da tuple var ve aynı mantık.",
              "en": "A tuple is a fixed-size array where each position has a known type. 'First element is always name (string), second is age (number).' Java has no direct equivalent — but Python has tuples with the same idea."
            }
          },
          {
            "type": "code",
            "language": "typescript",
            "code": "// TypeScript Tuples — fixed-length, typed by position\n// Java has no direct equivalent (use a simple class instead)\n// Python: (name, age) = (\"Alice\", 25)\n\n// Basic tuple\nlet person: [string, number] = [\"Alice\", 25];\nlet [name, age] = person;               // destructuring\nconsole.log(name, age);                 // Alice 25\n\n// Tuple types prevent index errors\n// person[0] = 42;                      // ERROR: number not assignable to string\n// person[2] = \"extra\";                 // ERROR: index 2 out of bounds\n\n// Named tuple elements (TypeScript 4.0+)\ntype TestResult = [testName: string, passed: boolean, durationMs: number];\n\nconst result: TestResult = [\"login_test\", true, 342];\nconsole.log(result[0], result[1], result[2]);  // login_test true 342\n\n// Tuple array — array of fixed-structure pairs\ntype KeyValue = [string, string];\nconst headers: KeyValue[] = [\n  [\"Content-Type\", \"application/json\"],\n  [\"Authorization\", \"Bearer token123\"],\n  [\"Accept\", \"application/json\"],\n];\n\nheaders.forEach(([key, value]) => {\n  console.log(`${key}: ${value}`);\n});\n\n// Optional tuple element\ntype Point3D = [x: number, y: number, z?: number];\nconst p2d: Point3D = [10, 20];          // z is optional\nconst p3d: Point3D = [10, 20, 30];"
          },
          {
            "type": "editor",
            "lang": "typescript",
            "defaultCode": "// Use tuples to represent test step results\ntype StepResult = [stepName: string, passed: boolean, ms: number];\n\nfunction runStep(name: string, shouldPass: boolean): StepResult {\n  const ms = Math.floor(Math.random() * 500) + 50;\n  return [name, shouldPass, ms];\n}\n\nconst steps: StepResult[] = [\n  runStep(\"Navigate to login\", true),\n  runStep(\"Enter credentials\", true),\n  runStep(\"Click submit\", true),\n  runStep(\"Assert dashboard\", false),  // simulated failure\n];\n\nconst failed = steps.filter(([, passed]) => !passed);\nconsole.log(\"Total steps:\", steps.length);\nconsole.log(\"Failed steps:\", failed.length);\nsteps.forEach(([name, passed, ms]) => {\n  console.log(`  ${passed ? \"✓\" : \"✗\"} ${name} (${ms}ms)`);\n});"
          },
          {
            "type": "quiz",
            "question": {
              "en": "Why does let t: [string, number] = [42, 'hello'] cause an error?",
              "tr": "let t: [string, number] = [42, 'hello'] neden hata verir?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "Tuple must be empty",
                  "tr": "Tuple boş olmalı"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "Wrong number of elements",
                  "tr": "Eleman sayısı hatalı"
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "Type order is wrong: first must be string, second must be number",
                  "tr": "Tip sıralaması yanlış: ilk eleman string, ikinci number olmalı"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "Tuple must be readonly",
                  "tr": "Tuple readonly olmalı"
                }
              }
            ],
            "correct": "c",
            "explanation": {
              "en": "In [string, number] tuple, position 0 must be string, position 1 must be number. 42 is a number, not a string. TypeScript checks the type of each position.",
              "tr": "[string, number] tuple'ında 0. pozisyon string, 1. pozisyon number olmalı. 42 number'dır, string değil. TypeScript her pozisyonun tipini kontrol eder."
            },
            "retryQuestion": {
              "question": {
                "en": "Why does let user: [number, string] = ['John', 25] cause a compilation error?",
                "tr": "let user: [number, string] = ['John', 25] ataması neden derleme hatası verir?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "The tuple length is too long",
                    "tr": "Tuple uzunluğu çok fazla"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "Tuple elements are immutable",
                    "tr": "Tuple elemanları değiştirilemez"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "Type mismatch: first must be number, second must be string",
                    "tr": "Tip uyumsuzluğu: ilk eleman number, ikinci string olmalı"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "Tuples cannot contain different types",
                    "tr": "Tuple içerisinde farklı tipler bulunamaz"
                  }
                }
              ],
              "correct": "c",
              "explanation": {
                "en": "In the defined [number, string] structure, index 0 must be a number and index 1 must be a string. Since 'John' is a string, TypeScript throws a type error.",
                "tr": "Tanımlanan [number, string] yapısında, indeks 0 mutlaka bir sayı (number), indeks 1 ise metin (string) olmalıdır. 'John' bir string olduğundan TypeScript tip hatası fırlatır."
              }
            }
          },
          {
            "type": "ts-mini-hero",
            "promptTr": "Tuple ile normal array arasındaki farkı anlat. Ne zaman tuple tercih edersin? Kısa bir örnek ver.",
            "promptEn": "Explain the difference between a tuple and a regular array. When would you prefer a tuple? Give a short example.",
            "keywords": [
              [
                "sabit",
                "fixed",
                "belirli",
                "specific"
              ],
              [
                "pozisyon",
                "position",
                "index",
                "sıra",
                "order"
              ],
              [
                "tip",
                "type"
              ],
              [
                "uzunluk",
                "length",
                "boyut",
                "size"
              ]
            ],
            "modelAnswerTr": "Array: değişken uzunluk, aynı tip. Tuple: sabit uzunluk, her pozisyonun tipi farklı olabilir. Örnek: [testAdı: string, süre: number, başarı: boolean].",
            "modelAnswerEn": "Array: variable length, same type throughout. Tuple: fixed length with each position having its own type. Example: [testName: string, duration: number, passed: boolean]."
          },
          {
            "type": "simple-box",
            "emoji": "🎒",
            "content": {
              "tr": "Dizi, bir sınıftaki aynı boydaki sıralı öğrenciler gibidir. Herkes sırayla dizilmiştir ve listeye yeni öğrenciler ekleyebilirsiniz.",
              "en": "An array is like a line of students of similar height. Everyone is ordered, and you can append new students to the end of the line."
            }
          },
          {
            "type": "simple-box",
            "emoji": "💳",
            "content": {
              "tr": "Tuple, bir kimlik kartındaki ad soyad ve TC kimlik numarası gibidir. Boyutu sabittir ve ilk sıradaki verinin string, ikinci sıradakinin number olacağı kesindir.",
              "en": "A tuple is like an ID card with a Name and an ID number. The length is fixed, and the first element is always a string, while the second is always a number."
            }
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "Neden Tuple Kullanırız? Bir fonksiyondan hem durum kodu (number) hem de hata mesajı (string) gibi çiftli verileri tek bir pakette güvenle dönmek için idealdir.",
              "en": "Why Use Tuples? They are ideal for returning pairs of data (like status code as number and error message as string) in a type-safe structure from a function."
            }
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "Neden readonly Tuple? Tuple'ların boyutunun ve eleman tiplerinin sonradan `push()` veya `pop()` metotlarıyla bozulmasını önlemek için readonly tanımlanması önerilir.",
              "en": "Why Use readonly Tuples? Defining tuples as readonly prevents their length and structure from being altered by methods like `push()` or `pop()` later."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: Dizi, yan yana dizilmiş aynı renkteki LEGO tuğlaları dizisi gibidir. Sonuna istediğiniz kadar aynı renkte tuğla ekleyebilirsiniz.",
              "en": "LEGO analogy: An array is like a row of LEGO bricks of the same color side-by-side. You can snap as many bricks of the same color as you want to the end."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: Tuple, önceden dökülmüş özel bir LEGO kalıbı gibidir. 1. sırada yuvarlak delik, 2. sırada kare delik vardır; başka türlü parça takamazsınız.",
              "en": "LEGO analogy: A tuple is like a custom molded LEGO plate with exactly one round socket at index 0 and a square socket at index 1. You cannot swap them."
            }
          },
          {
            "type": "quiz",
            "question": {
              "tr": "TypeScript'te `const t: readonly [string, number] = ['status', 200]` ifadesine `t.push(300)` uygulamak istediğinizde ne olur?",
              "en": "What happens when you try to run `t.push(300)` on `const t: readonly [string, number] = ['status', 200]` in TypeScript?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "tr": "Sorunsuz çalışır ve dizi boyutu 3 olur",
                  "en": "It runs fine and the array length becomes 3"
                }
              },
              {
                "id": "b",
                "text": {
                  "tr": "Derleme zamanında tip hatası verir (readonly özellikte push metodu yoktur)",
                  "en": "It throws a compile-time type error (push does not exist on readonly types)"
                }
              },
              {
                "id": "c",
                "text": {
                  "tr": "Çalışma zamanında sessizce göz ardı edilir",
                  "en": "It is silently ignored at runtime"
                }
              },
              {
                "id": "d",
                "text": {
                  "tr": "Diziyi otomatik olarak string array'e dönüştürür",
                  "en": "It automatically converts the tuple to a string array"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "tr": "readonly olarak işaretlenmiş diziler ve tuple'lar üzerinde ekleme, silme veya değiştirme metotları (push, pop, splice vb.) kullanılamaz; derleyici kırmızı çizer.",
              "en": "Arrays and tuples marked as readonly do not expose mutating methods like push, pop, or splice; the compiler flags these actions as errors."
            },
            "retryQuestion": {
              "question": {
                "tr": "Düz bir dizi (array) ile tuple arasındaki fark nedir?",
                "en": "What is the difference between a plain array and a tuple?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "tr": "Tuple sadece sayıları kabul eder",
                    "en": "Tuples only accept numbers"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "tr": "Array sınırsız boyutta aynı tip veriyi tutarken, tuple sabit boyutta ve her indeksinde farklı belirtilmiş tipleri tutar",
                    "en": "An array holds dynamic lengths of a single type, whereas a tuple holds fixed lengths of specific types per index"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "tr": "Array derleme zamanında kontrol edilmez",
                    "en": "Arrays are not verified at compile time"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "tr": "Tuple sadece tek elemanlıdır",
                    "en": "Tuples can only hold one element"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "tr": "Array esnektir; tuple ise indeks bazlı katı sözleşmelere sahiptir (örneğin 0. indeks her zaman string, 1. indeks her zaman boolean).",
                "en": "Arrays are dynamic; tuples enforce strict index-based contracts (e.g., index 0 must be string, index 1 must be boolean)."
              }
            }
          }
        ]
      },
      {
        "title": {
          "en": "Object Types & Enums",
          "tr": "Nesne Tipleri & Enum'lar"
        },
        "blocks": [
          {
            "type": "heading",
            "text": {
              "en": "Object Types",
              "tr": "Object Types"
            },
            "difficulty": "🟢 Beginner"
          },
          {
            "type": "simple-box",
            "emoji": "📋",
            "content": {
              "tr": "Object type, bir nesnenin içinde ne olması gerektiğini söyleyen sözleşme. 'Test sonucu için mutlaka ad, durum ve süre lazım' gibi. Java'da interface veya class ile yapılır.",
              "en": "Object type is a contract saying what must be inside an object. 'A test result must have a name, status, and duration.' In Java, this is done with an interface or class."
            }
          },
          {
            "type": "code",
            "language": "typescript",
            "code": "// TypeScript Object Types\n\n// Inline object type annotation\nfunction printTest(test: { name: string; passed: boolean; duration: number }): void {\n  const icon = test.passed ? \"✓\" : \"✗\";\n  console.log(`${icon} ${test.name} (${test.duration}ms)`);\n}\n\nprintTest({ name: \"login_test\", passed: true, duration: 342 });\n\n// Optional properties (Java: nullable fields)\ntype Config = {\n  baseUrl: string;\n  timeout?: number;         // optional — may be undefined\n  retries?: number;\n};\n\nconst cfg: Config = { baseUrl: \"https://api.example.com\" };\nconst cfgWithTimeout: Config = { baseUrl: \"https://api.example.com\", timeout: 5000 };\n\n// Readonly properties\ntype ImmutableUser = {\n  readonly id: number;      // like final in Java\n  readonly email: string;\n  role: string;             // mutable\n};\n\nconst user: ImmutableUser = { id: 1, email: \"alice@example.com\", role: \"admin\" };\nuser.role = \"user\";         // OK: mutable\n// user.id = 2;             // ERROR: Cannot assign to readonly property\n\n// Index signatures — object with dynamic keys\ntype TestSuiteResults = {\n  [testName: string]: \"PASS\" | \"FAIL\" | \"SKIP\";\n};\n\nconst results: TestSuiteResults = {\n  login_test: \"PASS\",\n  checkout_test: \"FAIL\",\n  profile_test: \"SKIP\",\n};\nconsole.log(results[\"login_test\"]);  // PASS"
          },
          {
            "type": "editor",
            "lang": "typescript",
            "defaultCode": "type ApiRequest = {\n  url: string;\n  method: \"GET\" | \"POST\" | \"PUT\" | \"DELETE\";\n  headers?: { [key: string]: string };\n  body?: unknown;\n};\n\nfunction describeRequest(req: ApiRequest): string {\n  const hasBody = req.body !== undefined ? \" with body\" : \"\";\n  const headerCount = req.headers ? Object.keys(req.headers).length : 0;\n  return `${req.method} ${req.url}${hasBody} (${headerCount} headers)`;\n}\n\nconst loginReq: ApiRequest = {\n  url: \"/api/login\",\n  method: \"POST\",\n  headers: { \"Content-Type\": \"application/json\" },\n  body: { email: \"test@example.com\", password: \"secret\" },\n};\n\nconst listReq: ApiRequest = {\n  url: \"/api/users\",\n  method: \"GET\",\n};\n\nconsole.log(describeRequest(loginReq));\nconsole.log(describeRequest(listReq));"
          },
          {
            "type": "quiz",
            "question": {
              "en": "What does a '?' after a property name mean in a TypeScript object type?",
              "tr": "TypeScript object type'ta '?' ile işaretlenmiş property ne anlama gelir?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "readonly",
                  "tr": "readonly"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "Optional — may be undefined",
                  "tr": "Opsiyonel — tanımsız olabilir"
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "Cannot be null",
                  "tr": "Null olamaz"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "Required field",
                  "tr": "Zorunlu alan"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "en": "'?' makes a property optional — the value may not be present (undefined). Similar to Java's @Nullable annotation. timeout?: number means it can be a number or undefined.",
              "tr": "'?' property'yi opsiyonel yapar — değer olmayabilir (undefined). Java'da @Nullable annotation'ına benzer. timeout?: number yazınca timeout veya undefined olabilir."
            },
            "retryQuestion": {
              "question": {
                "en": "What does adding a ':' at the end of a property in an interface imply?",
                "tr": "Bir interface içerisinde bir property'nin sonuna eklenen ':' işaretinin anlamı nedir?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "Specifies that the property is read-only",
                    "tr": "Property'nin sadece okuma modunda olduğunu belirtir"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "Indicates the property is not required and can be undefined",
                    "tr": "Property'nin zorunlu olmadığını, undefined olabileceğini belirtir"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "Ensures the property must always have a value",
                    "tr": "Property'nin mutlaka bir değer alması gerektiğini belirtir"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "Indicates the property can only be used in functions",
                    "tr": "Property'nin sadece fonksiyonlarda kullanılabileceğini belirtir"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "en": "In TypeScript, the '?' symbol indicates an optional field. This means if the field is missing in an object, no compilation error occurs and its value is treated as undefined.",
                "tr": "TypeScript'te '?' işareti bir alanın opsiyonel olduğunu gösterir. Yani o alan nesnede bulunmasa bile derleme hatası oluşmaz ve değeri undefined olarak değerlendirilir."
              }
            }
          },
          {
            "type": "ts-mini-hero",
            "promptTr": "TypeScript object type ile Java interface arasındaki benzerlikleri ve farkları anlat. Java'dan bakış açısıyla kısaca.",
            "promptEn": "Compare TypeScript object types and Java interfaces — key similarities and differences. Use your Java background.",
            "keywords": [
              [
                "interface",
                "sözleşme",
                "contract",
                "şekil",
                "shape"
              ],
              [
                "opsiyonel",
                "optional",
                "zorunlu",
                "required"
              ],
              [
                "readonly",
                "final"
              ],
              [
                "inline",
                "tip",
                "type"
              ]
            ],
            "modelAnswerTr": "İkisi de nesne şeklini tanımlar. Farklar: TS'de ? ile opsiyonel alanlar, readonly ile immutable, ve inline tanım mümkün. Java'da her zaman ayrı bir file/class gerekir.",
            "modelAnswerEn": "Both define the shape of an object. Differences: TS supports ? for optional, readonly for immutability, and inline type definitions — Java always requires a separate file/class."
          },
          {
            "type": "heading",
            "text": {
              "en": "Enums",
              "tr": "Enums"
            },
            "difficulty": "🟢 Beginner"
          },
          {
            "type": "simple-box",
            "emoji": "🎯",
            "content": {
              "tr": "Enum, izin verilen değerlerin sabit listesi. 'Test durumu sadece PASS, FAIL veya SKIP olabilir — başka bir şey yazarsan hata alırsın.' Java'da enum zaten vardı — TypeScript'te de aynı mantık.",
              "en": "An enum is a fixed list of allowed values. 'Test status can only be PASS, FAIL, or SKIP — write anything else and you get an error.' Java already had enums — TypeScript works the same way."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "Java'da enum çok güçlü — method'u, field'ı olabilir. TypeScript'te numeric enum (0,1,2) ve string enum var. QA'de string enum tercih edilir çünkü debug edilmesi kolay: TestStatus.PASS = 'PASS' string değeri taşır.",
              "en": "Java enums are powerful — they can have methods and fields. TypeScript has numeric enums (0,1,2) and string enums. In QA, string enums are preferred because they are easy to debug: TestStatus.PASS carries the string value 'PASS'."
            }
          },
          {
            "type": "code",
            "language": "typescript",
            "code": "// TypeScript Enums — QA Test Status Example\n\n// String enum (preferred in QA — readable in logs)\nenum TestStatus {\n  PASS = \"PASS\",      // value = string literal\n  FAIL = \"FAIL\",\n  SKIP = \"SKIP\",\n  PENDING = \"PENDING\"\n}\n\n// Numeric enum (auto-increments from 0)\nenum Priority {\n  LOW,      // = 0\n  MEDIUM,   // = 1\n  HIGH,     // = 2\n  CRITICAL  // = 3\n}\n\ninterface TestCase {\n  name: string;\n  status: TestStatus;\n  priority: Priority;\n}\n\nconst tc: TestCase = {\n  name: \"login_test\",\n  status: TestStatus.PASS,   // type-safe: only PASS/FAIL/SKIP/PENDING allowed\n  priority: Priority.HIGH,\n};\n\nconsole.log(tc.status);                 // PASS (string enum)\nconsole.log(tc.priority);               // 2   (numeric enum)\nconsole.log(Priority[2]);               // HIGH (reverse lookup works for numeric)\n\n// Use in switch\nfunction getStatusIcon(status: TestStatus): string {\n  switch (status) {\n    case TestStatus.PASS:    return \"✅\";\n    case TestStatus.FAIL:    return \"❌\";\n    case TestStatus.SKIP:    return \"⏭️\";\n    case TestStatus.PENDING: return \"⏳\";\n  }\n}\n\nconsole.log(getStatusIcon(TestStatus.FAIL));  // ❌"
          },
          {
            "type": "editor",
            "lang": "typescript",
            "defaultCode": "enum HttpMethod {\n  GET = \"GET\",\n  POST = \"POST\",\n  PUT = \"PUT\",\n  DELETE = \"DELETE\",\n  PATCH = \"PATCH\",\n}\n\nenum StatusCode {\n  OK = 200,\n  CREATED = 201,\n  BAD_REQUEST = 400,\n  UNAUTHORIZED = 401,\n  NOT_FOUND = 404,\n  SERVER_ERROR = 500,\n}\n\ninterface ApiCall {\n  method: HttpMethod;\n  endpoint: string;\n  expectedStatus: StatusCode;\n}\n\nconst apiTests: ApiCall[] = [\n  { method: HttpMethod.GET, endpoint: \"/api/users\", expectedStatus: StatusCode.OK },\n  { method: HttpMethod.POST, endpoint: \"/api/users\", expectedStatus: StatusCode.CREATED },\n  { method: HttpMethod.DELETE, endpoint: \"/api/users/1\", expectedStatus: StatusCode.OK },\n];\n\napiTests.forEach(t => {\n  console.log(`${t.method} ${t.endpoint} → expected ${t.expectedStatus}`);\n});"
          },
          {
            "type": "comparison",
            "title": {
              "tr": "Java ile Karşılaştırma",
              "en": "Java vs TypeScript — Enums"
            },
            "columns": [
              "Java",
              "TypeScript"
            ],
            "rows": [
              {
                "concept": {
                  "tr": "Temel enum",
                  "en": "Basic enum"
                },
                "java": "enum Status { PASS, FAIL }",
                "typescript": "enum Status { PASS = 'PASS', FAIL = 'FAIL' }"
              },
              {
                "concept": {
                  "tr": "Metod",
                  "en": "Methods"
                },
                "java": "Can have methods/fields",
                "typescript": "No methods (use namespace for that)"
              },
              {
                "concept": {
                  "tr": "Kullanım",
                  "en": "Usage"
                },
                "java": "Status.PASS",
                "typescript": "Status.PASS"
              },
              {
                "concept": {
                  "tr": "Switch",
                  "en": "Switch"
                },
                "java": "switch(s) { case PASS: }",
                "typescript": "switch(s) { case Status.PASS: }"
              }
            ]
          },
          {
            "type": "quiz",
            "question": {
              "en": "Why are string enums preferred over numeric enums in QA tests?",
              "tr": "QA testlerinde string enum neden numeric enum'a tercih edilir?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "They are faster",
                  "tr": "Daha hızlı"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "Values are readable in logs and debug (you see PASS, not 0)",
                  "tr": "Log ve debug'da değer okunabilir (PASS görürsün, 0 değil)"
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "They use less memory",
                  "tr": "Daha az bellek kullanır"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "Required — TypeScript has no numeric enums",
                  "tr": "Zorunlu — TypeScript'te numeric enum yok"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "en": "With string enum, TestStatus.PASS = 'PASS' — you see 'PASS' in logs. With numeric enum, TestStatus.PASS = 0 — you see 0 in logs, hard to understand. Readability matters in QA tools.",
              "tr": "String enum'da TestStatus.PASS = 'PASS' — log dosyasında 'PASS' görürsün. Numeric enum'da TestStatus.PASS = 0 — log'da 0 görürsün, anlamak zor. QA araçlarında okunabilirlik önemli."
            },
            "retryQuestion": {
              "question": {
                "en": "Why is it preferred in QA automation to use a string-based structure instead of 'enum Role { ADMIN, GUEST }'?",
                "tr": "QA otomasyonunda neden tercih edilir: 'const Role = { ADMIN: \"ADMIN\", GUEST: \"GUEST\" }' gibi bir yapı yerine 'enum Role { ADMIN, GUEST }' yerine string tabanlı bir yapı kullanmak?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "String values occupy less memory",
                    "tr": "String değerler bellekte daha az yer kaplar"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "Better readability of values as text during debugging and reporting",
                    "tr": "Hata ayıklama (debug) ve raporlama aşamasında değerlerin metin olarak okunabilir olması"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "String values are faster to compare",
                    "tr": "String değerler daha hızlı karşılaştırılır"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "Numeric enums are not supported by TypeScript",
                    "tr": "Numeric enum'lar TypeScript tarafından desteklenmez"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "en": "String-based structures (or string enums) ensure that when you see 'Role.ADMIN' in logs, you see the text 'ADMIN'. Numeric enums show only numbers, which makes test error reports harder to interpret.",
                "tr": "String tabanlı yapılar (veya string enum'lar), loglarda 'Role.ADMIN' değerini gördüğünüzde direkt 'ADMIN' metnini görmenizi sağlar. Numeric enum'lar ise sadece bir sayı gösterir, bu da test hata raporlarını anlamayı zorlaştırır."
              }
            }
          },
          {
            "type": "ts-lego-visual",
            "variant": "enums-visual"
          },
          {
            "type": "interview-questions",
            "topic": "TypeScript Foundations",
            "questions": [
              {
                "level": "basic",
                "q": {
                  "tr": "TypeScript neden JavaScript'e üstündür? Ne zaman tercih edilir?",
                  "en": "Why is TypeScript better than JavaScript? When should you prefer it?"
                },
                "a": {
                  "tr": "TypeScript compile-time type checking sağlar — hatalar çalıştırmadan önce yakalanır. Büyük ekiplerde, uzun vadeli projelerde, framework geliştirmede tercih edilir. Playwright ve Angular TypeScript ile yazılmıştır. Küçük scriptler için overkill olabilir.",
                  "en": "TypeScript provides compile-time type checking — bugs are caught before running. Preferred for large teams, long-term projects, framework development. Playwright and Angular are written in TypeScript. May be overkill for small scripts."
                }
              },
              {
                "level": "basic",
                "q": {
                  "tr": "TypeScript'te 'any' tipini neden kaçınmalısın?",
                  "en": "Why should you avoid the 'any' type in TypeScript?"
                },
                "a": {
                  "tr": "'any' tipin tüm type checking'i devre dışı bırakır — TypeScript'i JavaScript gibi yapar. 'any' değişkeni her metodu çağırabilir, hiçbiri kontrol edilmez. Bunun yerine 'unknown' kullan: önce typeof kontrolü yapman gerekir. Codebase'de any'nin yayılması tip güvenliğini tamamen mahveder.",
                  "en": "'any' disables all type checking — makes TypeScript behave like JavaScript. An 'any' variable can call any method with no checks. Use 'unknown' instead: it requires a typeof check first. Spreading 'any' through a codebase completely destroys type safety."
                }
              },
              {
                "level": "intermediate",
                "q": {
                  "tr": "TypeScript'te tuple ne zaman kullanılmalı?",
                  "en": "When should you use a tuple in TypeScript?"
                },
                "a": {
                  "tr": "Sabit sayıda eleman ve her pozisyonun tipi farklı olduğunda. Örneğin: [string, number, boolean] — name, age, active gibi. Genellikle fonksiyon dönüş değerleri için kullanılır: function useState<T>(init: T): [T, (v: T) => void]. Nesne daha okunabilirse, tuple yerine obje tercih et.",
                  "en": "When you have a fixed number of elements and each position has a different type. Example: [string, number, boolean] — like name, age, active. Often used for function return values: function useState<T>(init: T): [T, (v: T) => void]. If an object would be more readable, prefer that over a tuple."
                }
              }
            ]
          },
          {
            "type": "simple-box",
            "emoji": "📋",
            "content": {
              "tr": "Nesne tipi, bir form şablonu gibidir. Formda 'Ad', 'Soyad' ve 'E-posta' alanlarının olacağını baştan belirlersiniz; kimse fazladan veya eksik alan dolduramaz.",
              "en": "An object type is like a form template. You declare that 'Name', 'Surname', and 'Email' are required; no one can add random fields or leave out mandatory ones."
            }
          },
          {
            "type": "simple-box",
            "emoji": "🚦",
            "content": {
              "tr": "Enum, bir trafik lambası gibidir. Lambanın renkleri sadece KIRMIZI, SARI ve YEŞİL olabilir; mor veya mavi gibi geçersiz bir renk seçme şansınız yoktur.",
              "en": "An enum is like a traffic light. The lights can only be RED, YELLOW, or GREEN; there is no option to choose invalid colors like purple or cyan."
            }
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "Neden String Enum Tercih Edilir? Numeric enum'lar (0, 1, 2) loglarda ve hata raporlarında anlaşılmaz. String enum'lar ise raporlarda doğrudan 'PASS' veya 'FAIL' yazdırarak okunabilirliği artırır.",
              "en": "Why Prefer String Enums? Numeric enums output numbers (0, 1, 2) which are meaningless in logs. String enums write readable labels like 'PASS' or 'FAIL' directly to reports."
            }
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "tsconfig.json'daki excessPropertyChecks: Nesne literalleri tanımlanırken şablonda olmayan ek özelliklerin geçilmesini engeller, böylece hatalı/fazla parametre gönderilmesini önler.",
              "en": "tsconfig.json's excessPropertyChecks: Prevents passing undeclared properties when defining objects inline, catching typos or extra parameters early."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: Nesne tipi, bir LEGO evinin plan şablonudur. Evde 2 pencere ve 1 kapı yuvası olacağını söyler; bu yuvaya uymayan parçaları takamazsınız.",
              "en": "LEGO analogy: An object type is the blueprint for a LEGO house. It dictates exactly where the doors and windows fit; you cannot plug elements into invalid spots."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: Enum, fabrikadan özel kalıpla dökülmüş 3 renkli LEGO setidir (sadece sarı, yeşil, kırmızı). Başka renk veya boyutta parça üretemezsiniz.",
              "en": "LEGO analogy: An enum is a set of 3 pre-molded colored LEGO bricks (yellow, green, red only). You cannot introduce arbitrary colors outside this predefined palette."
            }
          },
          {
            "type": "quiz",
            "question": {
              "tr": "Aşağıdaki enum tanımlarından hangisi test raporlarında daha okunabilir log çıktıları üretir?",
              "en": "Which enum declaration produces more readable output in test reports and logs?"
            },
            "options": [
              {
                "id": "a",
                "text": "enum Status { PASS, FAIL, SKIP }"
              },
              {
                "id": "b",
                "text": "enum Status { PASS = 'PASS', FAIL = 'FAIL', SKIP = 'SKIP' }"
              },
              {
                "id": "c",
                "text": "type Status = 0 | 1 | 2"
              },
              {
                "id": "d",
                "text": "const Status = { PASS: 0, FAIL: 1 }"
              }
            ],
            "correct": "b",
            "explanation": {
              "tr": "Açıkça string değer atanmış enum'lar (String Enums), loglarda sayısal kodlar (0, 1, 2) yerine doğrudan 'PASS' değerini yazdırarak debug sürecini kolaylaştırır.",
              "en": "String enums with explicit string initializers write readable values like 'PASS' in logs rather than integer codes, making debugging much easier."
            },
            "retryQuestion": {
              "question": {
                "tr": "TypeScript nesne tiplerinde isteğe bağlı (optional) bir özellik nasıl tanımlanır?",
                "en": "How is an optional property declared in TypeScript object types?"
              },
              "options": [
                {
                  "id": "a",
                  "text": "propertyName?: type"
                },
                {
                  "id": "b",
                  "text": "propertyName!: type"
                },
                {
                  "id": "c",
                  "text": "propertyName: type | null"
                },
                {
                  "id": "d",
                  "text": "propertyName: optional type"
                }
              ],
              "correct": "a",
              "explanation": {
                "tr": "Özellik isminden sonra eklenen '?' sembolü, o alanın nesne içinde bulunmasının zorunlu olmadığını (undefined olabileceğini) belirtir.",
                "en": "Adding a '?' after the property name flags it as optional, meaning the object is valid whether the property is defined or undefined."
              }
            }
          },
          {
            "type": "interview-questions",
            "topic": "TypeScript Foundations",
            "questions": [
              {
                "level": "basic",
                "q": {
                  "tr": "TypeScript neden JavaScript'e üstündür? Ne zaman tercih edilir?",
                  "en": "Why is TypeScript better than JavaScript? When should you prefer it?"
                },
                "a": {
                  "tr": "TypeScript compile-time type checking sağlar — hatalar çalıştırmadan önce yakalanır. Büyük ekiplerde, uzun vadeli projelerde, framework geliştirmede tercih edilir. Playwright ve Angular TypeScript ile yazılmıştır. Küçük scriptler için overkill olabilir.",
                  "en": "TypeScript provides compile-time type checking — bugs are caught before running. Preferred for large teams, long-term projects, framework development. Playwright and Angular are written in TypeScript. May be overkill for small scripts."
                }
              },
              {
                "level": "basic",
                "q": {
                  "tr": "TypeScript'te 'any' tipini neden kaçınmalısın?",
                  "en": "Why should you avoid the 'any' type in TypeScript?"
                },
                "a": {
                  "tr": "'any' tipin tüm type checking'i devre dışı bırakır — TypeScript'i JavaScript gibi yapar. 'any' değişkeni her metodu çağırabilir, hiçbiri kontrol edilmez. Bunun yerine 'unknown' kullan: önce typeof kontrolü yapman gerekir. Codebase'de any'nin yayılması tip güvenliğini tamamen mahveder.",
                  "en": "'any' disables all type checking — makes TypeScript behave like JavaScript. An 'any' variable can call any method with no checks. Use 'unknown' instead: it requires a typeof check first. Spreading 'any' through a codebase completely destroys type safety."
                }
              },
              {
                "level": "intermediate",
                "q": {
                  "tr": "TypeScript'te tuple ne zaman kullanılmalı?",
                  "en": "When should you use a tuple in TypeScript?"
                },
                "a": {
                  "tr": "Sabit sayıda eleman ve her pozisyonun tipi farklı olduğunda. Örneğin: [string, number, boolean] — name, age, active gibi. Genellikle fonksiyon dönüş değerleri için kullanılır: function useState<T>(init: T): [T, (v: T) => void]. Nesne daha okunabilirse, tuple yerine obje tercih et.",
                  "en": "When you have a fixed number of elements and each position has a different type. Example: [string, number, boolean] — like name, age, active. Often used for function return values: function useState<T>(init: T): [T, (v: T) => void]. If an object would be more readable, prefer that over a tuple."
                }
              }
            ]
          }
        ]
      },
      {
        "title": {
          "en": "Interface & Union Types",
          "tr": "Interface & Union Tipleri"
        },
        "blocks": [
          {
            "type": "heading",
            "text": {
              "en": "Union Types",
              "tr": "Union Types"
            },
            "difficulty": "🟡 Intermediate"
          },
          {
            "type": "simple-box",
            "emoji": "🔀",
            "content": {
              "tr": "Union type, 'bu ya şu ya bu' demek. ID ya number ya string olabilir. Java'da bunu generic ya da overload ile yapardın — TypeScript daha zarif.",
              "en": "A union type means 'this OR that.' An ID can be either a number or a string. In Java you'd use generics or overloads — TypeScript is more elegant."
            }
          },
          {
            "type": "code",
            "language": "typescript",
            "code": "// Union Types — value can be one of multiple types\ntype TestStatus = \"PASS\" | \"FAIL\" | \"SKIP\";     // literal union\n\nfunction formatId(id: string | number): string {\n  if (typeof id === \"number\") {           // type narrowing\n    return \"TC-\" + id.toString().padStart(4, \"0\");\n  }\n  return id.startsWith(\"TC-\") ? id : \"TC-\" + id;\n}\nconsole.log(formatId(42));          // TC-0042\nconsole.log(formatId(\"LOGIN-001\")); // TC-LOGIN-001\n\n// Discriminated union — best pattern for modeling variants\ntype ApiResponse =\n  | { status: \"success\"; data: unknown; statusCode: 200 }\n  | { status: \"error\"; message: string; statusCode: 400 | 401 | 404 | 500 };\n\nfunction handleResponse(res: ApiResponse): void {\n  if (res.status === \"success\") {\n    console.log(\"Data:\", res.data);\n  } else {\n    console.error(\"Error \" + res.statusCode + \": \" + res.message);\n  }\n}\n\nhandleResponse({ status: \"success\", data: { users: 5 }, statusCode: 200 });\nhandleResponse({ status: \"error\", message: \"Not found\", statusCode: 404 });"
          },
          {
            "type": "editor",
            "lang": "typescript",
            "defaultCode": "// Model test events with discriminated union\ntype TestEvent =\n  | { type: \"start\"; testName: string; timestamp: number }\n  | { type: \"pass\"; testName: string; durationMs: number }\n  | { type: \"fail\"; testName: string; errorMessage: string; durationMs: number }\n  | { type: \"skip\"; testName: string; reason: string };\n\nfunction logEvent(event: TestEvent): void {\n  switch (event.type) {\n    case \"start\":\n      console.log(\"Starting: \" + event.testName);\n      break;\n    case \"pass\":\n      console.log(\"PASS: \" + event.testName + \" (\" + event.durationMs + \"ms)\");\n      break;\n    case \"fail\":\n      console.log(\"FAIL: \" + event.testName + \" — \" + event.errorMessage);\n      break;\n    case \"skip\":\n      console.log(\"SKIP: \" + event.testName + \" — \" + event.reason);\n      break;\n  }\n}\n\nconst events: TestEvent[] = [\n  { type: \"start\", testName: \"login_test\", timestamp: Date.now() },\n  { type: \"pass\", testName: \"login_test\", durationMs: 342 },\n  { type: \"fail\", testName: \"checkout_test\", errorMessage: \"Timeout\", durationMs: 5000 },\n  { type: \"skip\", testName: \"payment_test\", reason: \"Feature not ready\" },\n];\nevents.forEach(logEvent);"
          },
          {
            "type": "quiz",
            "question": {
              "en": "What does 'type narrowing' mean in TypeScript?",
              "tr": "TypeScript'te 'type narrowing' ne anlama gelir?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "Making the type smaller (bad thing)",
                  "tr": "Tipi daraltmak (kötü)"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "TypeScript knowing a more specific type after typeof/instanceof checks",
                  "tr": "typeof/instanceof kontrolleri sonrası TypeScript'in daha spesifik tip bilmesi"
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "Converting to any type",
                  "tr": "Tipi any'ye çevirmek"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "Removing a type from a union",
                  "tr": "Union'dan bir tip kaldırmak"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "en": "Type narrowing: after a typeof check, TypeScript knows the variable's specific type. Inside if (typeof x === 'number'), TypeScript guarantees x is a number.",
              "tr": "Type narrowing: typeof kontrolü sonrası TypeScript değişkenin tipini bilir. if (typeof x === 'number') içinde TypeScript x'in number olduğunu garanti eder."
            },
            "retryQuestion": {
              "question": {
                "en": "What is it called when a union type (string | number) is narrowed down to a specific type in TypeScript?",
                "tr": "TypeScript'te bir union tipinin (string | number) kesin bir tipe indirgenmesine ne ad verilir?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "Type casting",
                    "tr": "Type casting"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "Type narrowing",
                    "tr": "Type narrowing"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "Type annotation",
                    "tr": "Type annotation"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "Type inference",
                    "tr": "Type inference"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "en": "Type narrowing is the process of using control flow analysis (if/else, typeof, instanceof) to allow TypeScript to refine a variable's type to a more specific one.",
                "tr": "Type narrowing, kontrol akışı analizi (if/else, typeof, instanceof) kullanarak TypeScript'in değişkenin tipini daha dar bir kapsamda kesinleştirmesine verilen isimdir."
              }
            }
          },
          {
            "type": "ts-mini-hero",
            "promptTr": "Hey dostum! Şöyle bir kodun var: let id: string | number = getUserId(). O '|' sihirli çubuğu ne yapıyor? Bana teknik terim kullanmadan, sanki 5 yaşındaki bir çocuğa anlatır gibi açıkla!",
            "promptEn": "Hey friend! You have: let id: string | number = getUserId(). What does that '|' magic wand do? Explain it to me without any technical jargon, like I'm 5 years old!",
            "keywords": [
              [
                "ya da",
                "or",
                "veya",
                "either"
              ],
              "union",
              [
                "ikisi",
                "both",
                "birden"
              ],
              "string",
              "number"
            ],
            "modelAnswerTr": "Union type (|) 'ya bu ya da bu' demek. Telefon numarası hem '0532...' (string) hem de 5321234 (number) olabilir. TypeScript her ikisine de izin veren bir tip tanımlar. İki kutunun her ikisinden birine koyabilirsin.",
            "modelAnswerEn": "A union type (|) means 'either this OR that.' A phone number can be '0532...' as a string OR 5321234 as a number. TypeScript defines a type that accepts both — like a box that fits either shape."
          },
          {
            "type": "simple-box",
            "emoji": "🤝",
            "content": {
              "tr": "Interface, iki şirket arasındaki sözleşme gibidir. 'Eğer bu projeyi yapacaksan, şu metotları teslim etmek zorundasın' der. Sınıflar bu sözleşmeye uymak zorundadır.",
              "en": "An interface is like a business contract. It states: 'If you want this project, you must deliver these methods.' Classes implement this contract."
            }
          },
          {
            "type": "simple-box",
            "emoji": "🔌",
            "content": {
              "tr": "Union type, hem USB-C hem de Lightning şarj kablosu kabul eden ikili bir priz gibidir. Giriş ya A tipi ya da B tipi olabilir.",
              "en": "A union type is like a charging block with dual inputs for both USB-C and Lightning. The input can be either type A or type B."
            }
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "Neden Declaration Merging Var? Interface'ler aynı isimle tekrar tanımlandığında birleşirler. Bu özellik, Playwright gibi üçüncü taraf kütüphanelerin tiplerine yeni fixture özellikleri eklemek için çok yararlıdır.",
              "en": "Why is Declaration Merging Useful? Re-declaring an interface merges its properties. This is highly useful for extending third-party library types (like Playwright test fixtures)."
            }
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "Neden Type Alias Tercih Edilir? Type alias'lar, union (`string | number`) veya intersection (`A & B`) gibi interface'lerin yapamayacağı karmaşık bileşik tipleri tanımlayabilir.",
              "en": "Why Prefer Type Aliases? Type aliases can represent union (`string | number`) or intersection (`A & B`) shapes that interfaces cannot declare."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: Interface declaration merging, iki LEGO bloğunu üst üste takarak tek bir parça gibi birleştirmek gibidir. İki parça birleşip tek bir büyük bütün oluşturur.",
              "en": "LEGO analogy: Interface declaration merging is like stacking two LEGO bricks together. They lock into place and form a single, unified structure."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: Union tipi, hem yuvarlak hem kare deliklere uyan esnek bir LEGO bağlantı parçası gibidir. İki farklı yuvaya da uyum sağlayabilir.",
              "en": "LEGO analogy: A union type is like a flexible connector brick that fits either round or square LEGO pegs. It adapts to fit either interface."
            }
          },
          {
            "type": "quiz",
            "question": {
              "tr": "Interface'in desteklediği ama Type Alias'ın desteklemediği özellik hangisidir?",
              "en": "Which feature is supported by interfaces but not by type aliases?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "tr": "Union tipler tanımlama",
                  "en": "Declaring union types"
                }
              },
              {
                "id": "b",
                "text": {
                  "tr": "Declaration Merging (aynı isimli bildirimlerin otomatik birleşmesi)",
                  "en": "Declaration Merging (automatic merging of identical declarations)"
                }
              },
              {
                "id": "c",
                "text": {
                  "tr": "Nesne şekillerini tanımlama",
                  "en": "Describing object shapes"
                }
              },
              {
                "id": "d",
                "text": {
                  "tr": "Sınıflar tarafından implement edilme",
                  "en": "Being implemented by classes"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "tr": "Interface'ler genişletilebilir; aynı isimli iki interface derleyici tarafından otomatik birleştirilir. Type alias ise sonradan tekrar tanımlanamaz (reopened).",
              "en": "Interfaces can be reopened to merge declarations; type aliases cannot be changed once declared."
            },
            "retryQuestion": {
              "question": {
                "tr": "Aşağıdaki tanımlardan hangisi bir Union tipi doğru şekilde tanımlar?",
                "en": "Which of the following correctly defines a Union type?"
              },
              "options": [
                {
                  "id": "a",
                  "text": "type ID = string & number"
                },
                {
                  "id": "b",
                  "text": "type ID = string | number"
                },
                {
                  "id": "c",
                  "text": "interface ID { val: string | number }"
                },
                {
                  "id": "d",
                  "text": "type ID = [string, number]"
                }
              ],
              "correct": "b",
              "explanation": {
                "tr": "Union tipler '|' (pipe) sembolü ile tanımlanır ve değişkenin bu tiplerden herhangi birine sahip olabileceğini ifade eder.",
                "en": "Union types are declared using the '|' (pipe) symbol, indicating that a value can be any of the listed types."
              }
            }
          }
        ]
      },
      {
        "title": {
          "en": "Functions & Casting",
          "tr": "Fonksiyonlar & Tip Dönüştürme"
        },
        "blocks": [
          {
            "type": "heading",
            "text": {
              "en": "Functions",
              "tr": "Functions"
            },
            "difficulty": "🟡 Intermediate"
          },
          {
            "type": "simple-box",
            "emoji": "⚙️",
            "content": {
              "tr": "TypeScript fonksiyonları Java metodlarına çok benzer — ama daha kısa syntax. Parametre tipleri ve dönüş tipi belirtilir.",
              "en": "TypeScript functions are very similar to Java methods — but with shorter syntax. Parameter types and return types are specified."
            }
          },
          {
            "type": "code",
            "language": "typescript",
            "code": "// TypeScript Functions — all key patterns\nfunction add(a: number, b: number): number {\n  return a + b;\n}\n\n// Arrow function\nconst multiply = (a: number, b: number): number => a * b;\n\n// Optional and default parameters\nfunction createTestUser(\n  email: string,\n  role: \"admin\" | \"user\" = \"user\",    // default value\n  active?: boolean                      // optional\n): { email: string; role: string; active: boolean } {\n  return { email, role, active: active ?? true };\n}\n\nconsole.log(JSON.stringify(createTestUser(\"alice@example.com\")));\nconsole.log(JSON.stringify(createTestUser(\"admin@example.com\", \"admin\")));\n\n// Rest parameters (like Java varargs)\nfunction joinLogs(...messages: string[]): string {\n  return messages.join(\" | \");\n}\nconsole.log(joinLogs(\"PASS\", \"login\", \"342ms\"));\n\n// Function type\ntype Validator = (value: string) => boolean;\n\nconst isEmail: Validator = (v) => v.includes(\"@\") && v.includes(\".\");\nconst isPhone: Validator = (v) => /^[0-9]{10,11}$/.test(v);\n\nconsole.log(isEmail(\"test@example.com\"));  // true\nconsole.log(isPhone(\"05551234567\"));       // true"
          },
          {
            "type": "editor",
            "lang": "typescript",
            "defaultCode": "// Generic assertion helper with typed parameters\nfunction assertEqual<T>(actual: T, expected: T, message?: string): void {\n  const passed = JSON.stringify(actual) === JSON.stringify(expected);\n  const label = message ?? \"assertEqual\";\n  const icon = passed ? \"PASS\" : \"FAIL\";\n  console.log(icon + \": \" + label);\n  if (!passed) {\n    console.log(\"  Expected: \" + JSON.stringify(expected));\n    console.log(\"  Actual:   \" + JSON.stringify(actual));\n  }\n}\n\nassertEqual(2 + 2, 4, \"2+2=4\");\nassertEqual(\"hello\".toUpperCase(), \"HELLO\", \"toUpperCase\");\nassertEqual([1, 2, 3].length, 3, \"array length\");\nassertEqual(\"test\".includes(\"es\"), false, \"includes check\"); // fails"
          },
          {
            "type": "comparison",
            "title": {
              "tr": "Java ile Karşılaştırma",
              "en": "Java vs TypeScript — Functions"
            },
            "columns": [
              "Java",
              "TypeScript"
            ],
            "rows": [
              {
                "concept": {
                  "en": "Basic function",
                  "tr": "Basic function"
                },
                "java": "public int add(int a, int b)",
                "typescript": "function add(a: number, b: number): number"
              },
              {
                "concept": {
                  "en": "Arrow/lambda",
                  "tr": "Arrow/lambda"
                },
                "java": "(a, b) -> a + b",
                "typescript": "(a, b) => a + b"
              },
              {
                "concept": {
                  "en": "Default param",
                  "tr": "Default param"
                },
                "java": "Not supported (use overload)",
                "typescript": "function f(x: number = 0)"
              },
              {
                "concept": {
                  "en": "Varargs",
                  "tr": "Varargs"
                },
                "java": "void f(String... msgs)",
                "typescript": "function f(...msgs: string[])"
              }
            ]
          },
          {
            "type": "quiz",
            "question": {
              "en": "What does '?' at the end of a parameter name mean in TypeScript?",
              "tr": "TypeScript'te parametre sonundaki '?' ne anlama gelir?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "Parameter is nullable",
                  "tr": "Parametre nullable"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "Parameter is optional — can be undefined, can be omitted",
                  "tr": "Parametre opsiyonel — undefined olabilir, geçilmeyebilir"
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "Parameter is a string",
                  "tr": "Parametre bir string"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "Return type is optional",
                  "tr": "Return type optional"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "en": "function f(x?: number) means x can be number or undefined, and can be omitted. f() and f(42) are both valid.",
              "tr": "function f(x?: number) yazınca x hem number hem undefined olabilir ve çağırırken geçilmeyebilir. f() ve f(42) ikisi de geçerli."
            },
            "retryQuestion": {
              "question": {
                "en": "What does the '?' symbol represent in a TypeScript function parameter?",
                "tr": "TypeScript fonksiyon parametresinde kullanılan '?' işareti neyi ifade eder?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "The parameter type is unknown",
                    "tr": "Parametrenin tipinin kesinlikle bilinmediği"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "The parameter is optional and can be omitted",
                    "tr": "Parametrenin opsiyonel olduğu ve eksik gönderilebileceği"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "The parameter is mandatory",
                    "tr": "Parametrenin zorunlu olduğu"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "The parameter can only accept null",
                    "tr": "Parametrenin sadece null değer alabileceği"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "en": "The '?' added to a parameter name indicates that the parameter is not required during the function call. If it is omitted, its value will be 'undefined'.",
                "tr": "Parametre isminin sonuna eklenen '?', ilgili parametrenin çağrı sırasında gönderilmesinin zorunlu olmadığını belirtir. Gönderilmediğinde değeri 'undefined' olur."
              }
            }
          },
          {
            "type": "ts-lego-visual",
            "variant": "functions-visual"
          },
          {
            "type": "heading",
            "text": {
              "en": "Casting",
              "tr": "Casting"
            },
            "difficulty": "🟡 Intermediate"
          },
          {
            "type": "simple-box",
            "emoji": "🔄",
            "content": {
              "tr": "Casting, TypeScript'e 'Biliyorum bu any tipinde görünüyor ama aslında string — güven bana' demek. 'as' keyword'ü kullanılır. Java'daki (String) obj gibi.",
              "en": "Casting tells TypeScript 'I know this looks like any but it is actually a string — trust me.' Uses the 'as' keyword. Like (String) obj in Java."
            }
          },
          {
            "type": "code",
            "language": "typescript",
            "code": "// TypeScript Casting (Type Assertions)\n// as keyword — tells TypeScript what type to treat a value as\n// NOTE: no actual runtime conversion — purely compile-time hint\n\ninterface User {\n  id: number;\n  email: string;\n  role: string;\n}\n\n// Casting from unknown (common with API responses)\nfunction toUser(raw: unknown): User | null {\n  if (\n    typeof raw === \"object\" && raw !== null &&\n    \"id\" in raw && \"email\" in raw && \"role\" in raw\n  ) {\n    return raw as User;      // safe: we checked the shape\n  }\n  return null;\n}\n\nconst apiData: unknown = { id: 1, email: \"alice@example.com\", role: \"admin\" };\nconst user = toUser(apiData);\nif (user) {\n  console.log(\"User:\", user.email, user.role);\n}\n\n// DOM casting (when working in browsers)\n// const input = document.getElementById(\"username\") as HTMLInputElement;\n// input.value  — works because TypeScript now knows it's HTMLInputElement\n\n// Danger: double casting bypasses safety (avoid!)\nconst a: string = \"hello\";\nconst b = a as unknown as number;  // compiles, but bad practice\nconsole.log(typeof b);             // \"string\" — cast did NOT convert!"
          },
          {
            "type": "editor",
            "lang": "typescript",
            "defaultCode": "interface Config {\n  baseUrl: string;\n  timeout: number;\n  retries: number;\n}\n\nfunction parseConfig(raw: unknown): Config {\n  if (typeof raw !== \"object\" || raw === null) {\n    throw new Error(\"Config must be an object\");\n  }\n  const obj = raw as Record<string, unknown>;\n  if (typeof obj.baseUrl !== \"string\") throw new Error(\"baseUrl must be string\");\n  if (typeof obj.timeout !== \"number\") throw new Error(\"timeout must be number\");\n  if (typeof obj.retries !== \"number\") throw new Error(\"retries must be number\");\n  return obj as unknown as Config;\n}\n\nconst valid = { baseUrl: \"https://api.example.com\", timeout: 5000, retries: 3 };\nconst parsed = parseConfig(valid);\nconsole.log(\"Config: \" + parsed.baseUrl + \", timeout: \" + parsed.timeout);"
          },
          {
            "type": "quiz",
            "question": {
              "en": "What does the 'as' keyword do in TypeScript?",
              "tr": "TypeScript'te 'as' keyword'ü ne yapar?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "Actually converts the value",
                  "tr": "Değeri gerçekten dönüştürür"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "Tells TypeScript about the type — no effect at runtime",
                  "tr": "TypeScript'e tip hakkında bilgi verir — runtime'da etkisi yok"
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "Performs a null check",
                  "tr": "Null kontrolü yapar"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "Clones the value",
                  "tr": "Değeri clone'lar"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "en": "'as' tells TypeScript the type at compile-time — nothing happens at runtime. Java's (String) obj actually converts. TypeScript 'as' with a wrong type causes wrong behavior at runtime, not an explicit crash.",
              "tr": "'as' compile-time'da TypeScript'e tipi söyler — runtime'da hiçbir şey olmaz. Java'daki (String) obj gerçekten cast eder. TypeScript'te 'as' yanlış tipte kullanılsa bile runtime'da ClassCastException atmaz."
            },
            "retryQuestion": {
              "question": {
                "en": "Which of the following is true regarding the use of 'type assertion' (as) in TypeScript?",
                "tr": "TypeScript'te 'type assertion' (as) kullanımı için aşağıdakilerden hangisi doğrudur?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "It re-formats the value during runtime",
                    "tr": "Runtime sırasında değeri yeniden formatlar"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "It tells the compiler the type, but generates no conversion code in the output",
                    "tr": "Derleyiciye tipi belirtir, ancak çıktı kodunda dönüşüm (cast) kodu üretmez"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "It automatically changes the value type to prevent errors",
                    "tr": "Hata oluşmaması için değerin tipini otomatik olarak değiştirir"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "It only works on objects",
                    "tr": "Sadece nesneler üzerinde çalışır"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "en": "Type assertion (as) only affects TypeScript's compile-time type checking mechanism. It does not perform any actual type casting or transformation in the resulting JavaScript code.",
                "tr": "Type assertion (as), sadece TypeScript'in derleme zamanındaki (compile-time) tip kontrol mekanizmasını etkiler. Çıktı olarak üretilen JavaScript dosyasında herhangi bir tip dönüşümü (type casting) işlemi gerçekleştirilmez."
              }
            }
          },
          {
            "type": "ts-mini-hero",
            "promptTr": "'as' keyword'ünü ne zaman kullanmalısın, ne zaman kaçınmalısın? Java'daki (String) cast ile farkı nedir?",
            "promptEn": "When should you use the 'as' keyword, and when should you avoid it? How does it differ from Java's (String) cast?",
            "keywords": [
              [
                "compile",
                "derleme",
                "tip"
              ],
              [
                "runtime",
                "çalışma",
                "gerçek"
              ],
              [
                "güvensiz",
                "unsafe",
                "dikkat",
                "careful"
              ],
              [
                "dönüşüm",
                "conversion",
                "transform"
              ]
            ],
            "modelAnswerTr": "'as' sadece TypeScript'e tipi söyler — runtime'da hiçbir şey olmaz. Java cast runtime'da ClassCastException verebilir. TypeScript 'as' yanlış kullanılırsa runtime'da sessizce bozuk davranış olur.",
            "modelAnswerEn": "'as' only tells TypeScript the type — nothing happens at runtime. Java cast can throw ClassCastException at runtime. TypeScript 'as' with a wrong type causes silent broken behavior instead."
          },
          {
            "type": "simple-box",
            "emoji": "⚙️",
            "content": {
              "tr": "Fonksiyon, bir meyve sıkacağı gibidir. Girişte 'Portakal' (parametre tipi) bekler ve çıkışta 'Portakal Suyu' (dönüş tipi) vereceğini garanti eder.",
              "en": "A function is like a juicer. It expects 'Oranges' at the input (parameter type) and guarantees 'Orange Juice' at the output (return type)."
            }
          },
          {
            "type": "simple-box",
            "emoji": "🔄",
            "content": {
              "tr": "Casting (Tip dönüştürme), gümrükteki bir pakete 'Güvenlik Kontrolünden Geçti' etiketi yapıştırmak gibidir. İçeriğini değiştirmezsiniz ama görevliye güven telkin edersiniz.",
              "en": "Casting is like slapping a 'Security Inspected' sticker on a package. You don't change the contents, but you assure the handler that it's safe."
            }
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "Neden Opsiyonel Parametreler Var? Her test adımı aynı parametreleri gerektirmez. Örneğin, `clickSubmit(timeout?: number)` fonksiyonu timeout belirtilmediğinde varsayılan süreyi kullanır.",
              "en": "Why Use Optional Parameters? Not every test action requires all arguments. For example, `clickSubmit(timeout?: number)` falls back to defaults when timeout is omitted."
            }
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "Casting'in Tehlikesi: TypeScript'te `as` ile casting yapmak sadece derleme zamanı tip kontrolünü atlatır. Çalışma zamanında (runtime) gerçek bir dönüşüm yapmaz; yanlış yönlendirme çökmelere yol açabilir.",
              "en": "Danger of Casting: Using `as` only overrides the compiler's type checks. It performs no runtime conversion, so incorrect casting can lead to silent crashes."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: Fonksiyon, LEGO parçası üreten bir makine kalıbı gibidir. Kalıba kırmızı plastik (parametre) dökersiniz ve kalıptan kırmızı LEGO tuğlası (dönüş değeri) çıkar.",
              "en": "LEGO analogy: A function is like a LEGO mold. You pour in red plastic raw material (parameters) and it outputs a red LEGO brick (return value)."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: Casting, rengi belirsiz gri bir LEGO parçasının üzerine 'Mavi Parçadır' diye etiket yapıştırmak gibidir. Blok hala gridir ama derleyici artık onu mavi kabul eder.",
              "en": "LEGO analogy: Casting is like sticking a label on an uncolored grey LEGO brick that reads 'This is Blue'. The block is still grey, but the compiler accepts it as blue."
            }
          },
          {
            "type": "quiz",
            "question": {
              "tr": "TypeScript'teki `as` anahtar kelimesi ile yapılan casting işlemi çalışma zamanında (runtime) nasıl bir etki yaratır?",
              "en": "How does casting with the `as` keyword affect the code at runtime?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "tr": "Değeri gerçekten hedef tipe dönüştürür (örneğin string'i number yapar)",
                  "en": "It converts the value to the target type at runtime (e.g. string to number)"
                }
              },
              {
                "id": "b",
                "text": {
                  "tr": "Hiçbir etkisi yoktur; casting sadece derleme zamanındaki kontrol mekanizmasını etkiler",
                  "en": "It has no runtime effect; casting only tells the compiler how to treat the type"
                }
              },
              {
                "id": "c",
                "text": {
                  "tr": "Hatalı casting durumunda ClassCastException fırlatır",
                  "en": "It throws a ClassCastException if the cast is incorrect"
                }
              },
              {
                "id": "d",
                "text": {
                  "tr": "JavaScript kodunu şifreler",
                  "en": "It encrypts the output JavaScript code"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "tr": "Casting, TypeScript derleyicisini ikna etmek için kullanılan bir compile-time özelliğidir. Üretilen JavaScript kodunda `as` ifadesi tamamen silinir.",
              "en": "Casting is a compile-time construct to reassure the compiler. The generated JavaScript drops the `as` cast entirely, leaving runtime types unchanged."
            },
            "retryQuestion": {
              "question": {
                "tr": "Aşağıdakilerden hangisi bir parametrenin opsiyonel olduğunu doğru şekilde belirtir?",
                "en": "Which of the following declares an optional parameter in a function?"
              },
              "options": [
                {
                  "id": "a",
                  "text": "function log(msg: string | null)"
                },
                {
                  "id": "b",
                  "text": "function log(msg?: string)"
                },
                {
                  "id": "c",
                  "text": "function log(msg: string = 'default')"
                },
                {
                  "id": "d",
                  "text": "function log(optional msg: string)"
                }
              ],
              "correct": "b",
              "explanation": {
                "tr": "Parametre isminin sonuna konan '?' karakteri, o parametrenin geçilmesinin isteğe bağlı olduğunu gösterir.",
                "en": "Appending a '?' after the parameter name makes it optional, meaning the function can be called with or without that argument."
              }
            }
          }
        ]
      },
      {
        "title": {
          "en": "Classes & Decorators",
          "tr": "Sınıflar & Decorator'lar"
        },
        "blocks": [
          {
            "type": "heading",
            "text": {
              "en": "Classes",
              "tr": "Classes"
            },
            "difficulty": "🟡 Intermediate"
          },
          {
            "type": "simple-box",
            "emoji": "🏗️",
            "content": {
              "tr": "TypeScript class'ları Java class'larına çok benzer ama daha kısa syntax. Java'da field tanımla, constructor'da this.field = value yaz. TypeScript'te constructor parametresine 'public' yaz — ikisi birden yapılır.",
              "en": "TypeScript classes are very similar to Java classes but with shorter syntax. In Java, declare field, then write this.field = value. In TypeScript, add 'public' to constructor parameters — it does both at once."
            }
          },
          {
            "type": "ts-lego-visual",
            "variant": "constructor-visual"
          },
          {
            "type": "code",
            "language": "typescript",
            "code": "// TypeScript Classes — constructor shorthand\nclass User {\n  constructor(\n    public readonly id: number,       // public + readonly in one line!\n    public email: string,\n    private role: string = \"user\",    // private with default\n  ) {}\n\n  getRole(): string { return this.role; }\n\n  toString(): string {\n    return \"User(\" + this.id + \": \" + this.email + \", \" + this.role + \")\";\n  }\n}\n\n// Inheritance\nclass AdminUser extends User {\n  constructor(id: number, email: string, private permissions: string[]) {\n    super(id, email, \"admin\");\n  }\n\n  hasPermission(perm: string): boolean {\n    return this.permissions.includes(perm);\n  }\n}\n\nconst u = new User(1, \"alice@example.com\");\nconst admin = new AdminUser(2, \"admin@example.com\", [\"delete\", \"manage\"]);\n\nconsole.log(u.toString());\nconsole.log(admin.toString());\nconsole.log(admin.hasPermission(\"delete\"));   // true\n\n// Abstract class\nabstract class BaseTest {\n  abstract run(): void;\n  log(msg: string): void { console.log(\"[TEST] \" + msg); }\n}\n\nclass LoginTest extends BaseTest {\n  run(): void { this.log(\"Running login test\"); }\n}\nnew LoginTest().run();"
          },
          {
            "type": "ts-lego-visual",
            "variant": "inheritance-visual"
          },
          {
            "type": "editor",
            "lang": "typescript",
            "defaultCode": "class TestSuite {\n  private tests: Array<{ name: string; fn: () => boolean }> = [];\n\n  constructor(public readonly name: string) {}\n\n  addTest(name: string, fn: () => boolean): this {\n    this.tests.push({ name, fn });\n    return this;\n  }\n\n  run(): { passed: number; failed: number; total: number } {\n    let passed = 0, failed = 0;\n    for (const test of this.tests) {\n      const ok = test.fn();\n      console.log(\"  \" + (ok ? \"PASS\" : \"FAIL\") + \" \" + test.name);\n      if (ok) passed++; else failed++;\n    }\n    return { passed, failed, total: this.tests.length };\n  }\n}\n\nconst suite = new TestSuite(\"Math Tests\")\n  .addTest(\"2+2=4\", () => 2 + 2 === 4)\n  .addTest(\"5>3\", () => 5 > 3)\n  .addTest(\"string check\", () => typeof \"hello\" === \"string\")\n  .addTest(\"intentional fail\", () => 1 === 2);\n\nconsole.log(\"Suite: \" + suite.name);\nconst res = suite.run();\nconsole.log(\"Result: \" + res.passed + \"/\" + res.total + \" passed\");"
          },
          {
            "type": "ts-lego-visual",
            "variant": "abstract-visual"
          },
          {
            "type": "comparison",
            "title": {
              "tr": "Java ile Karşılaştırma",
              "en": "Java vs TypeScript — Classes"
            },
            "columns": [
              "Java",
              "TypeScript"
            ],
            "rows": [
              {
                "concept": {
                  "en": "Field + constructor",
                  "tr": "Field + constructor"
                },
                "java": "String x; MyClass(String x) { this.x = x; }",
                "typescript": "constructor(public x: string) {} (one line!)"
              },
              {
                "concept": {
                  "en": "Access modifiers",
                  "tr": "Access modifiers"
                },
                "java": "public, protected, private, default",
                "typescript": "public, protected, private"
              },
              {
                "concept": {
                  "en": "Readonly",
                  "tr": "Readonly"
                },
                "java": "final String x;",
                "typescript": "readonly x: string;"
              },
              {
                "concept": {
                  "en": "Abstract",
                  "tr": "Abstract"
                },
                "java": "abstract class A { abstract void run(); }",
                "typescript": "abstract class A { abstract run(): void; }"
              }
            ]
          },
          {
            "type": "quiz",
            "question": {
              "en": "What is the advantage of writing 'public' in a TypeScript constructor parameter?",
              "tr": "TypeScript constructor parametresinde 'public' yazmanın avantajı nedir?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "No advantage",
                  "tr": "Hiç avantajı yok"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "Defines and assigns the field in one line (Java's 2 steps become 1)",
                  "tr": "Field tanımlama ve atamayı tek satırda yapar"
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "Improves performance",
                  "tr": "Performansı artırır"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "Only works for strings",
                  "tr": "Sadece string için çalışır"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "en": "In Java: field declaration + constructor assignment = 2 steps. In TypeScript: 'constructor(public email: string)' = 1 step. Constructor shorthand defines and assigns simultaneously.",
              "tr": "Java'da: 'String email; MyClass(String email) { this.email = email; }' — 2 adım. TypeScript'te: 'constructor(public email: string)' — 1 adım. Constructor shorthand field tanımlamayı ve atamayı aynı anda yapar."
            },
            "retryQuestion": {
              "question": {
                "en": "What is the result of defining 'private name: string' inside a constructor using 'Parameter Properties' in TypeScript?",
                "tr": "TypeScript'te 'Parameter Properties' kullanarak 'private name: string' ifadesini constructor içinde tanımlamanın sonucu nedir?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "It creates a variable scoped only to the method",
                    "tr": "Sadece metodun kapsamı içinde geçerli bir değişken oluşturur"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "It declares a class field and assigns the constructor parameter to that field simultaneously",
                    "tr": "Hem sınıf içinde bir 'field' tanımlar hem de constructor parametresini bu field'a atar"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "It makes the variable readonly",
                    "tr": "Değişkenin değerini salt okunur (readonly) yapar"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "It throws an error because private fields cannot be defined in a constructor",
                    "tr": "Hata verir, çünkü private fieldlar constructor içinde tanımlanamaz"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "en": "TypeScript's 'Parameter Properties' feature allows you to declare and initialize a class member directly in the constructor by adding an access modifier (public, private, protected) to the parameter.",
                "tr": "TypeScript'in sunduğu 'Parameter Properties' özelliği, constructor parametrelerinde erişim belirleyicileri (public, private, protected) kullanarak, ayrı bir field tanımlamadan sınıf üyesinin doğrudan başlatılmasını sağlar."
              }
            }
          },
          {
            "type": "ts-lego-visual",
            "variant": "classes-visual"
          },
          {
            "type": "interview-questions",
            "topic": "TypeScript Intermediate",
            "questions": [
              {
                "level": "basic",
                "q": {
                  "tr": "TypeScript'te interface ve type alias ne zaman kullanılır?",
                  "en": "When do you use interface vs type alias in TypeScript?"
                },
                "a": {
                  "tr": "Interface: obje şekilleri ve class contracts için. Declaration merging gerektiğinde. Type alias: union types, intersection types için. Basit kural: obje yapısı tarif ediyorsan interface, 'bu ya şu' diyorsan type alias.",
                  "en": "Interface: for object shapes and class contracts, especially when you need declaration merging. Type alias: for union types, intersections. Simple rule: if describing an object shape, use interface; if saying 'this OR that,' use type alias."
                }
              },
              {
                "level": "intermediate",
                "q": {
                  "tr": "Discriminated union nedir? QA'de nasıl kullanılır?",
                  "en": "What is a discriminated union? How is it used in QA?"
                },
                "a": {
                  "tr": "Her varyantın ortak bir literal tip discriminant field'ı olan union. Örnek: { status: 'pass', data: T } | { status: 'fail', error: string }. QA'de test olaylarını modellemek için harika — start | pass | fail | skip her biri farklı field'a sahip.",
                  "en": "A union where each variant has a shared literal-type 'discriminant' field. Example: { status: 'pass', data: T } | { status: 'fail', error: string }. Great in QA for modeling test events — start, pass, fail, skip each have different fields."
                }
              },
              {
                "level": "advanced",
                "q": {
                  "tr": "TypeScript 'private' Java 'private'den nasıl farklı?",
                  "en": "How does TypeScript 'private' differ from Java 'private'?"
                },
                "a": {
                  "tr": "TypeScript 'private' sadece compile-time'da enforced — JavaScript'te runtime'da erişilebilir. Java 'private' runtime'da da enforced. Gerçek runtime gizlilik için JS private field syntax kullanılır: #field. TypeScript bu syntax'ı destekler.",
                  "en": "TypeScript 'private' is only compile-time enforced — accessible at runtime in JavaScript. Java 'private' is runtime-enforced. For true runtime privacy, use JS private field syntax: #field. TypeScript supports this syntax."
                }
              }
            ]
          },
          {
            "type": "heading",
            "text": {
              "en": "Decorators (Experimental)",
              "tr": "Decorator'lar (Deneysel)"
            },
            "difficulty": {
              "en": "🔴 Advanced",
              "tr": "🔴 İleri Seviye"
            }
          },
          {
            "type": "simple-box",
            "emoji": "🎗️",
            "content": {
              "tr": "Decorator, hediye paketi sarmak gibidir. Bir sınıfın veya metodun kodunu değiştirmeden dışına yeni bir işlev (örneğin loglama, hata yakalama, yetki kontrolü) sarmalarsınız.",
              "en": "A decorator is like wrapping a gift. Without modifying a class or method's internal code, you wrap it in new behaviors like logging, error handling, or access control."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "Java'daki anotasyonlar (@Test, @BeforeEach) gibi, TypeScript'te de `@` sembolü ile tanımlanan Decorator'lar bulunur. Bunlar, sarmaladıkları metot veya sınıflar çağrılmadan hemen önce çalışarak çalışma zamanını değiştirebilir. Test otomasyonunda, test adımlarını otomatik olarak rapora eklemek (@Step) için yaygın olarak kullanılır.",
              "en": "Similar to Java annotations (@Test, @BeforeEach), TypeScript supports Decorators prefixed with `@`. They execute immediately before the class or method runs, modifying runtime behavior. In test automation, decorators like `@Step` are used to auto-log actions to test reports."
            }
          },
          {
            "type": "code",
            "language": "typescript",
            "label": {
              "en": "TypeScript Decorators Example",
              "tr": "TypeScript Decorator Örneği"
            },
            "content": "// Step decorator: logs method call arguments automatically\nfunction Step(stepName: string) {\n  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {\n    const originalMethod = descriptor.value; // Store the original page action\n\n    // Override the action with custom logging logic\n    descriptor.value = async function (...args: any[]) {\n      console.log(`[REPORT STEP] ${stepName} with args: ${JSON.stringify(args)}`);\n      return await originalMethod.apply(this, args); // Run original method\n    };\n    return descriptor;\n  };\n}\n\nclass LoginPage {\n  @Step(\"Navigate to Login Page\")\n  async navigate() {\n    // Navigate logic\n  }\n\n  @Step(\"Fill credentials and Login\")\n  async login(user: string) {\n    // Fill credentials and click logic\n  }\n}",
            "expected": ""
          },
          {
            "type": "editor",
            "lang": "typescript",
            "defaultCode": "// Run decorator code (Requires experimentalDecorators in tsconfig)\nfunction Log(target: any, key: string, descriptor: PropertyDescriptor) {\n  const original = descriptor.value;\n  descriptor.value = function(...args: any[]) {\n    console.log(`Calling ${key} with:`, args);\n    return original.apply(this, args);\n  }\n}\n\nclass Calculator {\n  @Log\n  add(a: number, b: number) {\n    return a + b;\n  }\n}\n\nconst calc = new Calculator();\ncalc.add(5, 10);"
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "Neden Decorator? Test sınıflarınızın içinde kirli log kodları yazmak yerine, `@Step` gibi temiz sarmalayıcılar kullanarak raporlamayı tek merkezden yönetebilirsiniz.",
              "en": "Why Use Decorators? Instead of polluting your test page object code with logger statements, you can use `@Step` to direct all logs cleanly from a single place."
            }
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "tsconfig.json Ayarı: Decorator'ları TypeScript'te kullanabilmek için `compilerOptions` altında `\"experimentalDecorators\": true` ayarının açılması zorunludur.",
              "en": "tsconfig.json Configuration: To use decorators in TypeScript, you must enable `\"experimentalDecorators\": true` under `compilerOptions`."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: Bir LEGO arabasının üzerine takılan renkli bir tepe lambası gibidir. Arabanın hareket etme şeklini değiştirmez ama üzerine siren çalma (log atma) özelliği ekler.",
              "en": "LEGO analogy: Like snapping a colored siren light onto a LEGO police car. It doesn't change how the car rolls, but it adds the function of flashing/sirening (logging)."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: Standart bir LEGO tuğlasının etrafına koruyucu şeffaf kılıf geçirmek gibidir. Tuğla yine aynı tuğladır ama artık darbelere karşı dayanıklıdır (hata yakalama özelliği eklenmiştir).",
              "en": "LEGO analogy: Fitting a protective rubber sleeve around a LEGO block. The block remains the same, but it now absorbs shocks (error handling wrapped around the method)."
            }
          },
          {
            "type": "quiz",
            "question": {
              "tr": "TypeScript'te decorator'ları kullanabilmek için tsconfig.json dosyasında hangi ayar aktif edilmelidir?",
              "en": "Which configuration must be enabled in tsconfig.json to support decorators in TypeScript?"
            },
            "options": [
              {
                "id": "a",
                "text": "strict: true"
              },
              {
                "id": "b",
                "text": "experimentalDecorators: true"
              },
              {
                "id": "c",
                "text": "target: 'ES6'"
              },
              {
                "id": "d",
                "text": "resolveJsonModule: true"
              }
            ],
            "correct": "b",
            "explanation": {
              "tr": "Decorator'lar henüz standart JS özelliği olmadığı için deneysel destek (`experimentalDecorators`) bayrağı ile açılmalıdır.",
              "en": "Decorators are still an experimental proposal in JavaScript, requiring the `experimentalDecorators` flag to compile without errors."
            },
            "retryQuestion": {
              "question": {
                "tr": "Decorator'ların test otomasyon projelerinde sağladığı en büyük avantaj nedir?",
                "en": "What is the primary benefit of decorators in test automation projects?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "tr": "Testlerin çalışma hızını iki katına çıkarır",
                    "en": "Doubles the test execution speed"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "tr": "Loglama, yetkilendirme ve raporlama gibi ortak kodları test metotlarının içine yazmadan temizce sarmalamayı sağlar",
                    "en": "Allows wrapping shared concerns (logging, reporting, etc.) cleanly around test methods without polluting them"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "tr": "Tarayıcı kurulumunu kolaylaştırır",
                    "en": "Simplifies browser installation"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "tr": "XPath yazma zorunluluğunu kaldırır",
                    "en": "Eliminates the need to write XPath locators"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "tr": "Decorator'lar sayesinde loglama ve hata yönetimi gibi ortak şablon kodları (boilerplate) test metotlarının dışına taşınarak kod okunabilirliği korunur.",
                "en": "Decorators pull boilerplate logic (like logging or error handling) out of test scripts, ensuring clean page objects and tests."
              }
            }
          },
          {
            "type": "interview-questions",
            "topic": "TypeScript Intermediate",
            "questions": [
              {
                "level": "basic",
                "q": {
                  "tr": "TypeScript'te interface ve type alias ne zaman kullanılır?",
                  "en": "When do you use interface vs type alias in TypeScript?"
                },
                "a": {
                  "tr": "Interface: obje şekilleri ve class contracts için. Declaration merging gerektiğinde. Type alias: union types, intersection types için. Basit kural: obje yapısı tarif ediyorsan interface, 'bu ya şu' diyorsan type alias.",
                  "en": "Interface: for object shapes and class contracts, especially when you need declaration merging. Type alias: for union types, intersections. Simple rule: if describing an object shape, use interface; if saying 'this OR that,' use type alias."
                }
              },
              {
                "level": "intermediate",
                "q": {
                  "tr": "Discriminated union nedir? QA'de nasıl kullanılır?",
                  "en": "What is a discriminated union? How is it used in QA?"
                },
                "a": {
                  "tr": "Her varyantın ortak bir literal tip discriminant field'ı olan union. Örnek: { status: 'pass', data: T } | { status: 'fail', error: string }. QA'de test olaylarını modellemek için harika — start | pass | fail | skip her biri farklı field'a sahip.",
                  "en": "A union where each variant has a shared literal-type 'discriminant' field. Example: { status: 'pass', data: T } | { status: 'fail', error: string }. Great in QA for modeling test events — start, pass, fail, skip each have different fields."
                }
              },
              {
                "level": "advanced",
                "q": {
                  "tr": "TypeScript 'private' Java 'private'den nasıl farklı?",
                  "en": "How does TypeScript 'private' differ from Java 'private'?"
                },
                "a": {
                  "tr": "TypeScript 'private' sadece compile-time'da enforced — JavaScript'te runtime'da erişilebilir. Java 'private' runtime'da da enforced. Gerçek runtime gizlilik için JS private field syntax kullanılır: #field. TypeScript bu syntax'ı destekler.",
                  "en": "TypeScript 'private' is only compile-time enforced — accessible at runtime in JavaScript. Java 'private' is runtime-enforced. For true runtime privacy, use JS private field syntax: #field. TypeScript supports this syntax."
                }
              }
            ]
          }
        ]
      },
      {
        "title": {
          "en": "Generics",
          "tr": "Generic'ler"
        },
        "blocks": [
          {
            "type": "heading",
            "text": {
              "en": "Basic Generics",
              "tr": "Temel Generic'ler"
            },
            "difficulty": "🔴 Advanced"
          },
          {
            "type": "simple-box",
            "emoji": "🧩",
            "content": {
              "tr": "Generic, doldurulabilir şablon gibi. 'Liste' diyorsun ama ne listesi? Sayı listesi mi, isim listesi mi? Tip parametresi ile sonradan belirtiyorsun. Java'daki List<T> ile aynı mantık.",
              "en": "A generic is like a fill-in-the-blank template. 'A list' — but a list of what? Numbers? Names? You specify the type later with a type parameter. Same concept as Java's List<T>."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "Java'da generics: ArrayList<String>, Map<String, Integer>. TypeScript'te aynı şey: Array<string>, Map<string, number>. Fonksiyon generic'leri: function identity<T>(x: T): T. Java'dan zaten tanıdık — sözdizimi biraz farklı.",
              "en": "Java generics: ArrayList<String>, Map<String, Integer>. TypeScript is the same: Array<string>, Map<string, number>. Function generics: function identity<T>(x: T): T. Already familiar from Java — just slightly different syntax."
            }
          },
          {
            "type": "code",
            "language": "typescript",
            "code": "// TypeScript Generics — reusable code with type safety\n\n// Generic function — like Java <T> method\nfunction identity<T>(value: T): T {\n  return value;\n}\nconsole.log(identity<string>(\"hello\"));  // hello\nconsole.log(identity<number>(42));       // 42\n// TypeScript infers T automatically: identity(\"hello\")\n\n// Generic container — like Java class Box<T>\nclass Box<T> {\n  constructor(private value: T) {}\n  get(): T { return this.value; }\n  toString(): string { return \"Box(\" + String(this.value) + \")\"; }\n}\n\nconst strBox = new Box<string>(\"TypeScript\");\nconst numBox = new Box<number>(42);\nconsole.log(strBox.toString());    // Box(TypeScript)\nconsole.log(numBox.toString());    // Box(42)\n\n// Generic with constraint — like Java <T extends Comparable<T>>\nfunction findMax<T extends { value: number }>(items: T[]): T {\n  return items.reduce((max, item) => item.value > max.value ? item : max);\n}\n\nconst tests = [\n  { name: \"login\", value: 342 },\n  { name: \"checkout\", value: 891 },\n  { name: \"profile\", value: 215 },\n];\nconst slowest = findMax(tests);\nconsole.log(\"Slowest:\", slowest.name, slowest.value + \"ms\");"
          },
          {
            "type": "editor",
            "lang": "typescript",
            "defaultCode": "// Generic Result type — common QA pattern\ntype Result<T> =\n  | { success: true; data: T }\n  | { success: false; error: string };\n\nfunction parseJSON<T>(raw: string): Result<T> {\n  try {\n    const data = JSON.parse(raw) as T;\n    return { success: true, data };\n  } catch (e) {\n    return { success: false, error: \"Invalid JSON: \" + String(e) };\n  }\n}\n\ninterface User { id: number; email: string; }\n\nconst good = parseJSON<User>('{\"id\": 1, \"email\": \"alice@example.com\"}');\nconst bad = parseJSON<User>(\"not json\");\n\nif (good.success) console.log(\"User:\", good.data.email);\nif (!bad.success) console.log(\"Error:\", bad.error);"
          },
          {
            "type": "comparison",
            "title": {
              "tr": "Java ile Karşılaştırma",
              "en": "Java vs TypeScript — Generics"
            },
            "columns": [
              "Java",
              "TypeScript"
            ],
            "rows": [
              {
                "concept": {
                  "en": "Generic class",
                  "tr": "Generic class"
                },
                "java": "class Box<T> { T get() {...} }",
                "typescript": "class Box<T> { get(): T {...} }"
              },
              {
                "concept": {
                  "en": "Generic method",
                  "tr": "Generic method"
                },
                "java": "<T> T identity(T x)",
                "typescript": "function identity<T>(x: T): T"
              },
              {
                "concept": {
                  "en": "Constraint",
                  "tr": "Constraint"
                },
                "java": "<T extends Comparable<T>>",
                "typescript": "<T extends { compareTo: (a: T) => number }>"
              },
              {
                "concept": {
                  "en": "Multiple params",
                  "tr": "Multiple params"
                },
                "java": "Map<K, V>",
                "typescript": "Map<K, V> / function f<K, V>"
              }
            ]
          },
          {
            "type": "quiz",
            "question": {
              "en": "What does <T extends { length: number }> mean in TypeScript generics?",
              "tr": "TypeScript'te <T extends { length: number }> ne anlama gelir?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "T can only be a number",
                  "tr": "T sadece number olabilir"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "T can be any type that has a 'length' property of type number",
                  "tr": "T, 'length' adında number özelliği olan herhangi bir tip olabilir"
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "T must be an array",
                  "tr": "T bir array olmak zorunda"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "The length of T is being specified",
                  "tr": "T'nin uzunluğu belirtiliyor"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "en": "Generic constraints specify what properties T must have. string, array, or any object with { length: number } can be T. Similar to Java's <T extends Comparable<T>>.",
              "tr": "Generic constraint ile T'nin hangi özelliklere sahip olması gerektiği belirtilir. string, array, hatta { length: number } olan herhangi bir obje T olabilir. Java'daki <T extends Comparable<T>> gibi."
            },
            "retryQuestion": {
              "question": {
                "en": "What does the constraint <T extends { id: string }> guarantee in a generic structure?",
                "tr": "Generic bir yapıda <T extends { id: string }> kısıtlaması neyi garanti eder?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "That T must only be a string named 'id'",
                    "tr": "T'nin sadece 'id' adında bir string olması gerektiğini"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "That T must be a structure that has at least a string property named 'id'",
                    "tr": "T'nin en azından 'id' isminde string tipinde bir özelliği olan bir yapı olduğunu"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "That T is mapped to an ID database",
                    "tr": "T'nin bir ID veritabanı ile eşleştiğini"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "That T must be a class instance",
                    "tr": "T'nin mutlaka bir class instance olduğunu"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "en": "This constraint forces the Generic type (T) to have at least the specified object shape. T can be any type (object, class, etc.) as long as it includes a property named 'id' of type string.",
                "tr": "Bu kısıtlama, Generic tipin (T) en azından belirtilen nesne yapısına (interface veya object shape) sahip olması gerektiğini zorunlu kılar. T bu yapıya sahip olan herhangi bir tip (obje, class vb.) olabilir."
              }
            }
          },
          {
            "type": "ts-lego-visual",
            "variant": "generics-factory"
          },
          {
            "type": "simple-box",
            "emoji": "📦",
            "content": {
              "tr": "Generic, kargo kolisi gibidir. Kolinin yapısı aynıdır ama içine ister 'Kitap' (T = Book) ister 'Giysi' (T = Clothing) koyabilirsiniz. Kutu her tipe uyum sağlar.",
              "en": "A generic is like a shipping box. The box design is fixed, but you can fill it with either 'Books' (T = Book) or 'Clothes' (T = Clothing). It adapts to any type."
            }
          },
          {
            "type": "simple-box",
            "emoji": "🧴",
            "content": {
              "tr": "Generic, boş bir plastik şişe gibidir. Üzerine etiket yapıştırmadan önce içine şampuan, sabun veya kolonya koyabilirsiniz; şişe içine konan sıvının şeklini alır.",
              "en": "A generic is like an empty bottle. You can fill it with shampoo, soap, or water before labelling it; the bottle holds whatever liquid type you put inside."
            }
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "Neden Generic Kullanırız? API yanıtlarını sarmalarken (ApiResponse<T>) her endpoint farklı veri modeli (User, Product) döner. Generic'ler sayesinde her yanıt tipi için ayrı sarmalayıcı sınıf yazmaktan kurtuluruz.",
              "en": "Why Use Generics? When wrapping API responses (ApiResponse<T>), each endpoint returns a different model (User, Product). Generics prevent writing distinct wrapper classes."
            }
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "Generic Kısıtlamaları (Constraints): `<T extends object>` yazarak generic parametrenin rastgele bir tip (örneğin string veya number) değil, sadece nesne olmasını zorunlu kılabilirsiniz.",
              "en": "Generic Constraints: Writing `<T extends object>` limits the generic parameter to objects only, preventing callers from passing simple types like strings or numbers."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: Generic, şeffaf bir LEGO kutusudur. Kutunun dış hatları sabittir ama içine hangi renkte parça koyarsanız (T tipi), dışarıdan o tipin özellikleri görünür.",
              "en": "LEGO analogy: A generic is a transparent LEGO bin. The bin dimensions are fixed, but whatever color brick you place inside (type T) projects its type properties outwards."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: Generic kısıtlaması (T extends Shape), LEGO kutusunun girişine konan bir süzgeç gibidir. Süzgeçten sadece yuvarlak parçalar geçebilir, kare parçalar engellenir.",
              "en": "LEGO analogy: A generic constraint (T extends Shape) is like a sorting filter on top of a LEGO bin. Only pieces matching that profile pass through; others are blocked."
            }
          },
          {
            "type": "quiz",
            "question": {
              "tr": "TypeScript generic'lerinde `<T extends { id: number }>` kısıtlaması neyi garanti eder?",
              "en": "What does the constraint `<T extends { id: number }>` guarantee in TypeScript generics?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "tr": "T tipinin sadece number olabileceğini",
                  "en": "That type T can only be a number"
                }
              },
              {
                "id": "b",
                "text": {
                  "tr": "T tipine geçirilecek nesnenin mutlaka 'id' adında sayısal bir özelliğe sahip olması gerektiğini",
                  "en": "That any object passed as T must have an 'id' property of type number"
                }
              },
              {
                "id": "c",
                "text": {
                  "tr": "Fonksiyonun mutlaka id döneceğini",
                  "en": "That the function must return an id"
                }
              },
              {
                "id": "d",
                "text": {
                  "tr": "Kısıtlamanın derleme sırasında göz ardı edileceğini",
                  "en": "That the constraint is ignored at compile time"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "tr": "extends anahtar kelimesi ile generic tiplere sınır (constraint) konur. Bu sayede fonksiyona gelen nesnenin belirtilen alana sahip olduğu garanti altına alınır.",
              "en": "The extends keyword sets a generic constraint, guaranteeing that whatever object is passed has the specified properties, preventing runtime errors."
            },
            "retryQuestion": {
              "question": {
                "tr": "Generic API sarmalayıcısı `class ApiResponse<T> { data: T }` yapısında `ApiResponse<User>` tanımı ne anlama gelir?",
                "en": "What does `ApiResponse<User>` represent in `class ApiResponse<T> { data: T }`?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "tr": "data alanının sadece string olabileceğini",
                    "en": "That the data field can only be a string"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "tr": "data alanının tipinin User olacağını ve User nesnesinin özelliklerine erişilebileceğini",
                    "en": "That the data field is strictly typed as a User object, enabling full autocomplete"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "tr": "ApiResponse sınıfının silineceğini",
                    "en": "That the ApiResponse class is dropped"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "tr": "data alanının boş (null) olacağını",
                    "en": "That the data field must be null"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "tr": "Generic yapıya `User` tipi verildiğinde, `data` alanı artık dinamik olarak `User` tipi gibi davranır ve tüm IDE otomatik tamamlama özelliklerini sunar.",
                "en": "By passing `User` to the generic structure, the `data` field adopts the User type interface, offering full autocomplete and safety."
              }
            }
          }
        ]
      },
      {
        "title": {
          "en": "Utility Types & Keyof",
          "tr": "Utility Tipleri & Keyof"
        },
        "blocks": [
          {
            "type": "heading",
            "text": {
              "en": "Utility Types",
              "tr": "Utility Types"
            },
            "difficulty": "🔴 Advanced"
          },
          {
            "type": "simple-box",
            "emoji": "🔧",
            "content": {
              "tr": "Utility types, hazır tip dönüştürücüler. Bir tipin tüm alanlarını opsiyonel yap (Partial), sadece belirli alanları al (Pick), bir alanı çıkar (Omit). Java'da bunları manuel yapardın.",
              "en": "Utility types are ready-made type transformers. Make all fields optional (Partial), pick specific fields (Pick), remove a field (Omit). In Java you'd do these manually."
            }
          },
          {
            "type": "code",
            "language": "typescript",
            "code": "// TypeScript Utility Types — powerful type transformations\n\ninterface TestCase {\n  id: number;\n  name: string;\n  status: \"PASS\" | \"FAIL\" | \"SKIP\";\n  duration: number;\n  tags: string[];\n}\n\n// Partial — all fields optional (useful for updates)\ntype PartialTestCase = Partial<TestCase>;\nconst update: PartialTestCase = { status: \"PASS\" };  // only some fields\n\n// Required — all fields required (reverse of Partial)\n// Pick — select specific fields only\ntype TestSummary = Pick<TestCase, \"id\" | \"name\" | \"status\">;\nconst summary: TestSummary = { id: 1, name: \"login\", status: \"PASS\" };\n\n// Omit — remove specific fields\ntype TestWithoutId = Omit<TestCase, \"id\">;\n\n// Readonly — make all fields readonly\ntype ImmutableTest = Readonly<TestCase>;\n\n// Record — create key-value map type\ntype TestResults = Record<string, \"PASS\" | \"FAIL\" | \"SKIP\">;\nconst results: TestResults = {\n  login_test: \"PASS\",\n  checkout_test: \"FAIL\",\n};\n\n// ReturnType — get return type of a function\nfunction createUser() { return { id: 1, email: \"a@b.com\" }; }\ntype UserType = ReturnType<typeof createUser>;  // { id: number; email: string }\n\n// Practical: build update payload type\nfunction updateTest(id: number, changes: Partial<Omit<TestCase, \"id\">>): void {\n  console.log(\"Updating test \" + id + \":\", JSON.stringify(changes));\n}\nupdateTest(1, { status: \"PASS\", duration: 342 });"
          },
          {
            "type": "editor",
            "lang": "typescript",
            "defaultCode": "interface Config {\n  baseUrl: string;\n  timeout: number;\n  retries: number;\n  apiKey: string;\n  debug: boolean;\n}\n\n// Use utility types to create derived types\ntype PublicConfig = Omit<Config, \"apiKey\">;  // hide secret key\ntype PartialUpdate = Partial<Config>;         // all optional for PATCH\ntype RequiredCore = Required<Pick<Config, \"baseUrl\" | \"timeout\">>;  // subset required\n\nconst baseConfig: RequiredCore = { baseUrl: \"https://api.example.com\", timeout: 5000 };\nconst publicView: PublicConfig = { baseUrl: \"https://api.example.com\", timeout: 5000, retries: 3, debug: false };\nconst patchPayload: PartialUpdate = { timeout: 10000 };\n\nconsole.log(\"Base:\", JSON.stringify(baseConfig));\nconsole.log(\"Public:\", JSON.stringify(publicView));\nconsole.log(\"Patch:\", JSON.stringify(patchPayload));"
          },
          {
            "type": "quiz",
            "question": {
              "en": "What does Partial<T> do in TypeScript?",
              "tr": "TypeScript'te Partial<T> ne yapar?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "Removes all fields from T",
                  "tr": "T'nin tüm alanlarını siler"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "Makes all fields of T optional (?)",
                  "tr": "T'nin tüm alanlarını opsiyonel (?) yapar"
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "Selects only some fields of T",
                  "tr": "T'nin sadece kısmi alanlarını seçer"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "Makes T readonly",
                  "tr": "T'yi readonly yapar"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "en": "Partial<T> makes all fields optional. Ideal for PATCH endpoints where you only send changed fields. In Java you'd have to create this type manually.",
              "tr": "Partial<T> tüm alanları opsiyonel yapar. PATCH endpoint'lerinde sadece değişen alanları göndermek için idealdir. Java'da bu tipi manuel olarak oluşturman gerekirdi."
            },
            "retryQuestion": {
              "question": {
                "en": "What does Required<T> do in TypeScript?",
                "tr": "TypeScript'te Required<T> ne yapar?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "Makes all optional fields of T required",
                    "tr": "T'nin tüm opsiyonel alanlarını zorunlu hale getirir"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "Converts T to a string",
                    "tr": "T'yi stringe çevirir"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "Removes all methods from T",
                    "tr": "T içindeki tüm metotları kaldırır"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "Makes T read-only",
                    "tr": "T'yi sadece okunur yapar"
                  }
                }
              ],
              "correct": "a",
              "explanation": {
                "en": "Required<T> is the inverse of Partial<T>; it removes the optional flags (?) from all properties, making them mandatory. It is useful in validation scenarios to ensure all fields are provided.",
                "tr": "Required<T>, Partial<T>'nin tam tersidir; tüm özelliklerin opsiyonel işaretlerini (?) kaldırarak onları zorunlu kılar. Veri doğrulama senaryolarında tüm alanların doldurulmasını garantilemek için kullanılır."
              }
            }
          },
          {
            "type": "ts-lego-visual",
            "variant": "utility-types-visual"
          },
          {
            "type": "heading",
            "text": {
              "en": "Keyof",
              "tr": "Keyof"
            },
            "difficulty": "🔴 Advanced"
          },
          {
            "type": "simple-box",
            "emoji": "🔑",
            "content": {
              "tr": "keyof, bir nesnenin tüm anahtar isimlerini tip olarak alır. 'Bu fonksiyon TestCase'in herhangi bir alanı ile çağrılabilir, ama sadece gerçek alan isimleriyle' — TypeScript bunu garantiler.",
              "en": "keyof gets all the key names of an object as a type. 'This function can be called with any field of TestCase, but only with real field names' — TypeScript guarantees this."
            }
          },
          {
            "type": "code",
            "language": "typescript",
            "code": "// keyof — get all keys of a type as a union\ninterface TestCase {\n  id: number;\n  name: string;\n  status: \"PASS\" | \"FAIL\" | \"SKIP\";\n  duration: number;\n}\n\ntype TestCaseKeys = keyof TestCase;  // \"id\" | \"name\" | \"status\" | \"duration\"\n\n// Practical use: type-safe property accessor\nfunction getField<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}\n\nconst tc: TestCase = { id: 1, name: \"login_test\", status: \"PASS\", duration: 342 };\nconsole.log(getField(tc, \"name\"));      // \"login_test\" — TypeScript knows type is string\nconsole.log(getField(tc, \"duration\"));  // 342 — TypeScript knows type is number\n// getField(tc, \"invalid\");             // ERROR: \"invalid\" not in keyof TestCase\n\n// Sort array by any field — type-safe\nfunction sortBy<T>(items: T[], key: keyof T): T[] {\n  return [...items].sort((a, b) => {\n    if (a[key] < b[key]) return -1;\n    if (a[key] > b[key]) return 1;\n    return 0;\n  });\n}\n\nconst tests: TestCase[] = [\n  { id: 3, name: \"profile\", status: \"PASS\", duration: 215 },\n  { id: 1, name: \"login\", status: \"PASS\", duration: 342 },\n  { id: 2, name: \"checkout\", status: \"FAIL\", duration: 891 },\n];\n\nconst byName = sortBy(tests, \"name\");\nconst byDuration = sortBy(tests, \"duration\");\nconsole.log(byName.map(t => t.name));      // [\"checkout\", \"login\", \"profile\"]\nconsole.log(byDuration.map(t => t.name));  // [\"profile\", \"login\", \"checkout\"]"
          },
          {
            "type": "editor",
            "lang": "typescript",
            "defaultCode": "interface User {\n  id: number;\n  email: string;\n  role: \"admin\" | \"user\";\n  active: boolean;\n}\n\n// Build a type-safe filter function using keyof\nfunction filterBy<T>(\n  items: T[],\n  key: keyof T,\n  value: T[keyof T]\n): T[] {\n  return items.filter(item => item[key] === value);\n}\n\nconst users: User[] = [\n  { id: 1, email: \"alice@example.com\", role: \"admin\", active: true },\n  { id: 2, email: \"bob@example.com\", role: \"user\", active: true },\n  { id: 3, email: \"carol@example.com\", role: \"user\", active: false },\n  { id: 4, email: \"dave@example.com\", role: \"admin\", active: false },\n];\n\nconst admins = filterBy(users, \"role\", \"admin\");\nconst activeUsers = filterBy(users, \"active\", true);\n\nconsole.log(\"Admins:\", admins.map(u => u.email));\nconsole.log(\"Active:\", activeUsers.map(u => u.email));"
          },
          {
            "type": "quiz",
            "question": {
              "en": "What is keyof TestCase if interface TestCase { id: number; name: string; }?",
              "tr": "keyof TestCase nedir? interface TestCase { id: number; name: string; }"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "number | string",
                  "tr": "number | string"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "\"id\" | \"name\"",
                  "tr": "\"id\" | \"name\""
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "{ id: number; name: string }",
                  "tr": "{ id: number; name: string }"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "TestCase",
                  "tr": "TestCase"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "en": "keyof returns the key names as a string literal union. For TestCase, keyof = 'id' | 'name'. Java has no built-in equivalent — similar things are done with reflection.",
              "tr": "keyof, nesnenin anahtar isimlerini string literal union olarak döner. TestCase için keyof = 'id' | 'name'. Java'da böyle bir built-in operatör yok — reflection ile benzer şeyler yapılır."
            },
            "retryQuestion": {
              "question": {
                "en": "What does keyof User return for the interface User { email: string; age: number; }?",
                "tr": "interface User { email: string; age: number; } yapısında keyof User ifadesi ne döndürür?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "string | number",
                    "tr": "string | number"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "\"email\" | \"age\"",
                    "tr": "\"email\" | \"age\""
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "{ email: string; age: number }",
                    "tr": "{ email: string; age: number }"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "User",
                    "tr": "User"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "en": "The keyof operator retrieves all key names of an interface as a union type. In this case, it results in 'email' or 'age'. It is very powerful for dynamic property access in automation scripts.",
                "tr": "keyof operatörü, bir arayüzün tüm anahtar isimlerini union tipi olarak alır. Bu durumda 'email' veya 'age' anahtarları elde edilir. Otomasyon kodlarında dinamik özellik erişimi için çok güçlüdür."
              }
            }
          },
          {
            "type": "ts-mini-hero",
            "promptTr": "'keyof' ne işe yarar? Gerçek bir kullanım senaryosu ver — neden Java reflection'ından daha iyi?",
            "promptEn": "What does 'keyof' do? Give a real use case — why is it better than Java reflection?",
            "keywords": [
              [
                "anahtar",
                "key",
                "alan",
                "field",
                "isim",
                "name"
              ],
              [
                "compile",
                "derleme",
                "tip güvenli",
                "type-safe"
              ],
              [
                "dinamik",
                "dynamic"
              ],
              [
                "union",
                "birleşim"
              ]
            ],
            "modelAnswerTr": "keyof bir interface'in tüm key isimlerini union tip olarak alır. sortBy(items, 'name') — 'invalid' key giremezsin, derleme hatası alırsın. Java reflection runtime'da hata verirdi.",
            "modelAnswerEn": "keyof gets all key names of an interface as a union type. sortBy(items, 'name') — invalid key fails at compile time. Java reflection would fail at runtime instead."
          },
          {
            "type": "simple-box",
            "emoji": "✂️",
            "content": {
              "tr": "Utility type'lar, hazır kurabiye kalıpları gibidir. Mevcut bir kurabiyeyi alır, kenarlarını kesip (Omit) veya sadece ortasını çıkarıp (Pick) yeni şekiller üretir.",
              "en": "Utility types are like cookie cutters. They take an existing cookie shape, trim the edges (Omit), or punch out the center (Pick) to make new shapes."
            }
          },
          {
            "type": "simple-box",
            "emoji": "🔑",
            "content": {
              "tr": "keyof, bir nesnenin kapı anahtarları listesi gibidir. 'Bu evde sadece salon, mutfak ve banyo anahtarları var, başka anahtar getirme' kuralını koyar.",
              "en": "keyof is like the ring of key labels for a house. It dictates: 'We only have keys labeled bedroom, kitchen, and attic. No other keys are accepted.'"
            }
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "Neden Partial<T> Kullanırız? Test veri fabrikalarında (Data Factories) varsayılan bir kullanıcı nesnesi oluşturup, testin ihtiyacına göre sadece şifreyi değiştirmek (override) için mükemmeldir.",
              "en": "Why Use Partial<T>? Perfect for test data factories where you want to instantiate a default object and pass partial overrides (e.g. only modifying the password)."
            }
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "Neden Omit<T, K> Kullanırız? API testlerinde veritabanına veri yazarken, ID ve tarih gibi sistem tarafından atanan alanları çıkarıp temiz DTO nesneleri göndermek için kullanılır.",
              "en": "Why Use Omit<T, K>? Used in API testing to strip auto-generated fields like IDs or creation timestamps from payload shapes, creating clean DTO interfaces."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: Pick, büyük bir LEGO kalesinden sadece 2 kule parçasını söküp almak gibidir. Geri kalan duvarları ve kapıları arkada bırakırsınız.",
              "en": "LEGO analogy: Pick is like detaching exactly two towers from a large LEGO castle, leaving the walls and gates behind to build a smaller outpost."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: keyof, bir LEGO kutusundaki tüm tuğlaların üzerindeki bağlantı noktalarının (çıkıntılarının) isim listesini çıkarmak gibidir.",
              "en": "LEGO analogy: keyof is like generating a list of all studs and connection slots on a LEGO brick, identifying exactly where other pieces can snap."
            }
          },
          {
            "type": "quiz",
            "question": {
              "tr": "TypeScript'te `interface User { id: number; name: string; role: string; }` yapısından `id` ve `role` alanlarını çıkartıp sadece `name` alanına sahip yeni bir tip üretmek için hangisi kullanılır?",
              "en": "Which utility type removes properties from an interface (e.g. creating a name-only shape from User by dropping id and role)?"
            },
            "options": [
              {
                "id": "a",
                "text": "Pick<User, 'name'>"
              },
              {
                "id": "b",
                "text": "Omit<User, 'id' | 'role'>"
              },
              {
                "id": "c",
                "text": "Partial<User>"
              },
              {
                "id": "d",
                "text": "Hem A hem B şıkkı aynı sonucu üretir"
              }
            ],
            "correct": "d",
            "explanation": {
              "tr": "Pick ile istediğimiz alanı seçebiliriz (`Pick<User, 'name'>`), Omit ile istemediğimiz alanları çıkartabiliriz (`Omit<User, 'id'|'role'>`). İkisi de aynı nesne tipini üretir.",
              "en": "Both Pick (choosing the desired keys) and Omit (excluding the undesired keys) yield the same shape (a name-only type) in this scenario."
            },
            "retryQuestion": {
              "question": {
                "tr": "keyof operatörünün temel amacı nedir?",
                "en": "What is the primary purpose of the keyof operator?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "tr": "Nesnelerin çalışma zamanı değerlerini kontrol etmek",
                    "en": "Checking object values at runtime"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "tr": "Bir nesne tipinin tüm anahtar (property) isimlerini alıp bir string literal union tipi oluşturmak",
                    "en": "Extracting all property names of an object type as a string literal union type"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "tr": "Şifreleri hash'lemek",
                    "en": "Hashing passwords"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "tr": "Dizileri sıralamak",
                    "en": "Sorting arrays"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "tr": "keyof, nesne özellik isimlerini birer tip haline getirerek sadece geçerli anahtar adlarının kullanılmasını derleme zamanında garanti altına alır.",
                "en": "keyof turns property names into types, ensuring that only valid keys can be referenced at compile time, eliminating invalid property accesses."
              }
            }
          }
        ]
      },
      {
        "title": {
          "en": "Template Literals & Null",
          "tr": "Template Literaller & Null"
        },
        "blocks": [
          {
            "type": "heading",
            "text": {
              "en": "Null Safety",
              "tr": "Null Safety"
            },
            "difficulty": "🔴 Advanced"
          },
          {
            "type": "simple-box",
            "emoji": "🚫",
            "content": {
              "tr": "TypeScript null hataları derleme sırasında yakalar. Java'da NullPointerException çalışma sırasında patlardı — TypeScript bunu derlerken söyler. strictNullChecks açıksa, null/undefined kontrolü yapmadan değer kullanman engellenir.",
              "en": "TypeScript catches null errors at compile time. Java's NullPointerException would crash at runtime — TypeScript warns you during compilation. With strictNullChecks enabled, you cannot use a value without checking for null/undefined first."
            }
          },
          {
            "type": "code",
            "language": "typescript",
            "code": "// TypeScript Null Safety with strictNullChecks\n// (tsconfig.json: \"strictNullChecks\": true)\n\n// Nullable types — must be explicit\nlet name: string | null = null;   // string OR null\nlet age: number | undefined;      // number or undefined (not initialized)\n\n// Optional chaining — safe navigation (like Java ?. or Kotlin ?.))\ninterface User {\n  id: number;\n  profile?: {           // profile may not exist\n    email: string;\n    phone?: string;     // phone may not exist\n  };\n}\n\nfunction getPhone(user: User): string {\n  return user.profile?.phone ?? \"No phone\";  // ?. + ?? operator\n}\n\nconst u1: User = { id: 1, profile: { email: \"a@b.com\", phone: \"555-1234\" } };\nconst u2: User = { id: 2 };  // no profile\nconsole.log(getPhone(u1));   // 555-1234\nconsole.log(getPhone(u2));   // No phone\n\n// Nullish coalescing ?? vs || difference\nconst zero = 0;\nconsole.log(zero || \"default\");   // \"default\" — 0 is falsy!\nconsole.log(zero ?? \"default\");   // 0 — ?? only checks null/undefined\n\n// Non-null assertion operator ! (use carefully)\nfunction getLength(s: string | null): number {\n  return s!.length;   // tells TypeScript: \"I guarantee s is not null\"\n  // But if s IS null at runtime → crash! Use only when absolutely certain\n}\n\n// Safer approach: type guard\nfunction safeLength(s: string | null | undefined): number {\n  return s?.length ?? 0;\n}"
          },
          {
            "type": "editor",
            "lang": "typescript",
            "defaultCode": "// Practice null-safe API response handling\ninterface ApiUser {\n  id: number;\n  name: string;\n  email?: string;\n  address?: {\n    city: string;\n    country?: string;\n  };\n}\n\nfunction formatUser(user: ApiUser | null): string {\n  if (user === null) return \"No user\";\n  const email = user.email ?? \"No email\";\n  const city = user.address?.city ?? \"Unknown city\";\n  const country = user.address?.country ?? \"Unknown country\";\n  return user.name + \" | \" + email + \" | \" + city + \", \" + country;\n}\n\nconst fullUser: ApiUser = {\n  id: 1, name: \"Alice\", email: \"alice@example.com\",\n  address: { city: \"Istanbul\", country: \"Turkey\" }\n};\nconst partialUser: ApiUser = { id: 2, name: \"Bob\" };\n\nconsole.log(formatUser(fullUser));\nconsole.log(formatUser(partialUser));\nconsole.log(formatUser(null));"
          },
          {
            "type": "quiz",
            "question": {
              "en": "What is the difference between '??' and '||' operators in TypeScript?",
              "tr": "TypeScript'te '??' ve '||' operatörleri arasındaki fark nedir?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "No difference",
                  "tr": "Hiçbir fark yok"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "?? only checks for null/undefined, while || also treats 0, '', false as falsy",
                  "tr": "?? sadece null/undefined'ı kontrol eder, || 0, '', false'ı da falsy sayar"
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "|| is safer",
                  "tr": "|| daha güvenli"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "?? only exists in TypeScript, not JS",
                  "tr": "?? sadece TypeScript'te var, JS'de yok"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "en": "0 || 'default' = 'default' (0 is falsy). 0 ?? 'default' = 0 (0 is not null/undefined). In QA tests checking for zero values, use ?? — || would incorrectly treat 0 as missing.",
              "tr": "0 || 'default' = 'default' (0 falsy). 0 ?? 'default' = 0 (0 null/undefined değil). QA testlerinde sıfır değer kontrol ediyorsanız ?? kullanın — || sıfırı da default'a düşürür."
            },
            "retryQuestion": {
              "question": {
                "en": "What is the output of the following code: const val = false || 'Test'; const result = false ?? 'Test';",
                "tr": "Aşağıdaki kodun çıktısı nedir? const val = false || 'Test'; const result = false ?? 'Test';"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "val = 'Test', result = 'Test'",
                    "tr": "val = 'Test', result = 'Test'"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "val = false, result = false",
                    "tr": "val = false, result = false"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "val = 'Test', result = false",
                    "tr": "val = 'Test', result = false"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "val = false, result = 'Test'",
                    "tr": "val = false, result = 'Test'"
                  }
                }
              ],
              "correct": "c",
              "explanation": {
                "en": "The || operator treats 'false' as falsy and proceeds to the right side. The ?? operator only proceeds to the right side if the value is null or undefined; since false is neither, it is preserved.",
                "tr": "|| operatörü 'false' değerini falsy olarak kabul edip sağ tarafa geçer. ?? operatörü ise sadece null veya undefined durumunda sağ tarafa geçer; false değeri null/undefined olmadığı için korunur."
              }
            }
          },
          {
            "type": "ts-error-animation"
          },
          {
            "type": "heading",
            "text": {
              "en": "Template Literal Types",
              "tr": "Template Literal Tipleri"
            },
            "difficulty": {
              "en": "🔴 Advanced",
              "tr": "🔴 İleri Seviye"
            }
          },
          {
            "type": "simple-box",
            "emoji": "📝",
            "content": {
              "tr": "Template literal type, kelimeleri birleştirip yeni tip kuralları oluşturmaktır. 'staging' veya 'prod' kelimeleri ile '.myapp.com' adresini birleştirip sadece bu iki kalıba uyan URL'leri kabul eden bir kural yazar.",
              "en": "Template literal types let you merge strings to create new type rules. Like combining 'staging' or 'prod' with '.myapp.com' to restrict values to only those two URL strings."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "TypeScript 4.1 ile gelen Template Literal Types, JavaScript'in template literal (`${value}`) sözdizimini tiplere taşır. Bu sayede dinamik olarak oluşturulan string değerlerin doğruluğunu derleme zamanında kontrol edebilirsiniz. Özellikle test ortamlarındaki dynamic URL'ler, dynamic locators veya event isimleri için mükemmel bir koruma sağlar.",
              "en": "Introduced in TypeScript 4.1, Template Literal Types bring JS template literal string interpolation to type definitions. This checks dynamically built strings at compile time, preventing typos in test URLs, dynamic locators, or event names."
            }
          },
          {
            "type": "code",
            "language": "typescript",
            "label": {
              "en": "Template Literal Types Example",
              "tr": "Template Literal Tipleri Örneği"
            },
            "content": "type Environment = \"dev\" | \"staging\" | \"prod\";\n\n// Generate type-safe URL pattern: dev.app.com, staging.app.com, etc.\ntype AppUrl = `https://${Environment}.app.com`;\n\nconst validUrl: AppUrl = \"https://staging.app.com\"; // OK\n// const invalidUrl: AppUrl = \"https://qa.app.com\";    // ERROR: Type not assignable\n\n// Force test IDs to follow standards\ntype TestId = `data-testid=${string}`;\nconst validSelector: TestId = \"data-testid=submit-btn\"; // OK\n// const badSelector: TestId = \"submit-btn\";             // ERROR",
            "expected": ""
          },
          {
            "type": "editor",
            "lang": "typescript",
            "defaultCode": "// Try modifying the environment or prefix to trigger compile errors\ntype Browser = \"chrome\" | \"firefox\";\ntype Action = \"click\" | \"hover\";\n\ntype TestEvent = `${Browser}:${Action}`;\n\nconst myEvent: TestEvent = \"chrome:click\"; // OK\nconsole.log(\"Event registered:\", myEvent);\n\n// const badEvent: TestEvent = \"safari:click\"; // Try uncommenting this"
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "Neden Template Literal? dynamic locator yapılarında `data-testid` ön ekini veya ortam URL formatlarını yanlış yazıp testlerin CI'da patlamasını önler.",
              "en": "Why Use Template Literals? It avoids typos in dynamic locators or environment URL formats, preventing tests from failing in CI due to simple configuration slips."
            }
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "Java Karşılaştırması: Java'da string formatları derleme aşamasında tip olarak denetlenemez (ancak regex ile runtime'da denetlenir). TypeScript bunu derlerken kontrol eder.",
              "en": "Java Comparison: In Java, string structures cannot be validated as types at compile time (only regexed at runtime). TS enforces this at compilation."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: Üzerinde 'dev', 'prod' yazan küçük LEGO tuğlalarını, '.app.com' yazan büyük bloğun solundaki yuvaya takmak gibidir. Kalıba uymayan hiçbir etiket yuvaya girmez.",
              "en": "LEGO analogy: Snapping 'dev' or 'prod' labels into the socket of a larger '.app.com' LEGO block. Unapproved tags simply don't fit the connector pegs."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: 'Ön ek' (data-testid=) şeklindeki dişi LEGO parçası ile herhangi bir erkek LEGO parçasını (string) birleştirip sarsılmaz bir bütün oluşturmak gibidir.",
              "en": "LEGO analogy: Interlocking a female connector block ('data-testid=') with any male extension brick (representing the string), creating a rigid, standard assembly."
            }
          },
          {
            "type": "quiz",
            "question": {
              "tr": "TypeScript'te `type LogLevel = 'info' | 'error'; type LogMessage = `[${LogLevel}]: ${string}`;` tanımına göre hangisi geçerli bir değerdir?",
              "en": "Given the type declarations `type LogLevel = 'info' | 'error'; type LogMessage = `[${LogLevel}]: ${string}`;`, which string is a valid value?"
            },
            "options": [
              {
                "id": "a",
                "text": "[info]: Test passed successfully"
              },
              {
                "id": "b",
                "text": "[debug]: Test passed successfully"
              },
              {
                "id": "c",
                "text": "info: Test passed successfully"
              },
              {
                "id": "d",
                "text": "[error] Test passed successfully"
              }
            ],
            "correct": "a",
            "explanation": {
              "tr": "Tanımlanan pattern köşe parantezleri ve iki nokta üst üste içermektedir (`[LogLevel]: `). LogLevel ise sadece 'info' veya 'error' olabilir.",
              "en": "The pattern expects square brackets enclosing a valid log level followed by a colon and space. Only option A matches this layout exactly."
            },
            "retryQuestion": {
              "question": {
                "tr": "Template Literal Types test otomasyon projelerinde en çok ne için kullanılır?",
                "en": "What is the most common use case for Template Literal Types in QA automation?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "tr": "Test sürelerini ölçmek için",
                    "en": "Measuring test durations"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "tr": "Dinamik API URL'leri ve standarda bağlı seçicileri (locators) tip bazında doğrulamak için",
                    "en": "Validating dynamic API URLs and standard-compliant locators at compile time"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "tr": "Tarayıcıları açıp kapatmak için",
                    "en": "Launching and closing browsers"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "tr": "SQL sorguları yazmak için",
                    "en": "Writing SQL queries"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "tr": "Dinamik olarak birleştirilen test URL'leri ve seçicilerin belirli formatlara uymasını derleyici seviyesinde zorunlu kılmak için kullanılır.",
                "en": "They enforce string patterns (like URL structures or data-testid prefixes) at compile time, eliminating configuration errors before executing tests."
              }
            }
          }
        ]
      },
      {
        "title": {
          "en": "Error Handling & Advanced Types",
          "tr": "Hata Yönetimi & Gelişmiş Tipler"
        },
        "blocks": [
          {
            "type": "heading",
            "text": {
              "en": "Definitely Typed & @types Packages",
              "tr": "Definitely Typed & @types Packages"
            },
            "difficulty": "🟡 Intermediate"
          },
          {
            "type": "simple-box",
            "emoji": "📦",
            "content": {
              "tr": "@types paketi, bir JavaScript kütüphanesinin TypeScript rehber kitabı gibidir. Kütüphane TypeScript ile yazılmamışsa, bu paket TypeScript'e 'bu kütüphanede şu metodlar ve tipler var' der. Rehber olmadan TypeScript kütüphaneyi göremez.",
              "en": "A @types package is TypeScript's manual for a JavaScript library. If the library isn't written in TypeScript, this package tells TypeScript 'this library has these methods and types'. Without the manual, TypeScript can't see the library."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "Bazı kütüphaneler TypeScript ile yazılmış ve kendi .d.ts tip tanım dosyalarını içerir — Playwright ve axios buna örnek. Eski veya saf JavaScript kütüphaneleri için DefinitelyTyped topluluk deposu @types paketleri sağlar.",
              "en": "Some libraries are written in TypeScript and bundle their own .d.ts type definition files — Playwright and axios are examples. For older or plain JavaScript libraries, the DefinitelyTyped community repository provides @types packages."
            }
          },
          {
            "type": "code",
            "language": "typescript",
            "code": "// Installing @types packages\n\n// Library ships its own types — NO @types needed:\nnpm install --save-dev @playwright/test  // includes its own .d.ts\nnpm install axios                        // includes its own .d.ts\n\n// Library is plain JS — @types required:\nnpm install node-fetch\nnpm install --save-dev @types/node-fetch   // provides type definitions\n\n// Essential for Node.js projects:\nnpm install --save-dev @types/node         // Node.js built-ins (fs, path, process)\nnpm install --save-dev @types/jest         // Jest matchers (describe, it, expect)\n\n// Verify if a package bundles its own types:\n// Check package.json for \"types\" or \"typings\" field\n// → \"@playwright/test\": { \"types\": \"index.d.ts\" }    ← bundled!\n// → \"node-fetch\": (no types field)                   ← needs @types/node-fetch\n\nimport path from 'path';              // TypeScript knows: path.join, path.resolve\nimport { readFileSync } from 'fs';    // TypeScript knows the return type\nconst configPath: string = path.join(__dirname, 'playwright.config.ts');\nconsole.log('Config path:', configPath);"
          },
          {
            "type": "code",
            "language": "typescript",
            "code": "// What a .d.ts declaration file looks like\n// TypeScript reads these automatically — you don't write them for @types\n\n// Simplified version of @types/node fs.d.ts:\ndeclare module 'fs' {\n  function readFileSync(path: string, options: { encoding: BufferEncoding }): string;\n  function readFileSync(path: string): Buffer;\n  function writeFileSync(path: string, data: string | Buffer): void;\n  function existsSync(path: string): boolean;\n}\n\n// tsconfig.json — controlling type resolution\n// {\n//   \"compilerOptions\": {\n//     \"typeRoots\": [\"./node_modules/@types\", \"./src/types\"],\n//     // default already includes node_modules/@types — rarely need to change\n//\n//     \"types\": [\"node\", \"jest\"]\n//     // restrict to ONLY these @types packages (optional — omit to include all)\n//   }\n// }\n\n// Writing your own declaration for a legacy JS library\n// File: src/types/legacy-tool.d.ts\ndeclare module 'legacy-tool' {\n  export function runSuite(config: { url: string; timeout?: number }): Promise<void>;\n  export interface SuiteResult { passed: number; failed: number; }\n}"
          },
          {
            "type": "editor",
            "lang": "typescript",
            "defaultCode": "// Practice: Simulate type declarations for a plain JS library\n\n// Declare types for an imaginary legacy JavaScript library:\ndeclare function runBenchmark(\n  name: string,\n  fn: () => void,\n  iterations?: number\n): { name: string; avgMs: number; minMs: number; maxMs: number };\n\n// Now TypeScript understands runBenchmark:\nconst result = runBenchmark(\"sort 1000 items\", () => {\n  [3, 1, 4, 1, 5, 9, 2, 6].sort();\n}, 100);\n\n// TypeScript knows the return type shape:\nconst report: string = result.name + \": avg \" + result.avgMs.toFixed(2) + \"ms\";\nconsole.log(report);\n\n// Try breaking a type to see TypeScript catch it:\n// runBenchmark(42, () => {});   // Error: number not assignable to string\n// result.totalMs;               // Error: property does not exist\nconsole.log(\"Avg:\", result.avgMs, \"ms | Min:\", result.minMs, \"ms\");"
          },
          {
            "type": "java-compare",
            "topic": "Type declarations for external libraries",
            "why": {
              "en": "Java'da Jackson veya Gson kullanırken tipler Maven/Gradle ile gelir ve Java sınıflarının kendisidir. TypeScript'te ise çoğu JavaScript kütüphanesi tip tanımı içermez — @types paketi bu boşluğu doldurur.",
              "tr": "Java'da Jackson veya Gson kullanırken tipler Maven/Gradle ile gelir ve Java sınıflarının kendisidir. TypeScript'te ise çoğu JavaScript kütüphanesi tip tanımı içermez — @types paketi bu boşluğu doldurur."
            },
            "why_en": "In Java, libraries like Jackson or Gson come via Maven/Gradle and their types are the Java classes themselves. In TypeScript, most JavaScript libraries don't bundle type definitions — @types packages fill this gap.",
            "java": "// Java: types come from the library's compiled .class files\n// Add to pom.xml — types come bundled in the .jar:\n// <dependency>\n//   <groupId>com.fasterxml.jackson.core</groupId>\n//   <artifactId>jackson-databind</artifactId>\n//   <version>2.15.0</version>\n// </dependency>\n\n// IDE and compiler see all types automatically:\nObjectMapper mapper = new ObjectMapper();\nMyData obj = mapper.readValue(jsonString, MyData.class);\n// ↑ Full type safety — IDE shows all readValue overloads",
            "typescript": "// TypeScript: runtime code and types are SEPARATE for JS libraries\n\n// Option 1 — library bundles its own types (modern):\nimport { test, expect } from '@playwright/test';  // types included\nimport axios from 'axios';                         // types included\n\n// Option 2 — install @types for legacy JS libraries:\n// npm install node-fetch\n// npm install --save-dev @types/node-fetch\nimport fetch from 'node-fetch';  // now TypeScript understands fetch\n\n// Option 3 — write your own .d.ts declaration file:\n// src/types/legacy-api.d.ts\ndeclare module 'legacy-api' {\n  export function callEndpoint(url: string): Promise<{ status: number }>;\n}\n\n// Without types, TypeScript falls back to 'any' — no type safety",
            "note": {
              "en": "Kütüphane seçerken npm sayfasında 'TypeScript' rozetine veya package.json'da 'types' field'ına bakın. Varsa @types kurmanıza gerek yok. Yoksa @types/paket-adi kurun.",
              "tr": "Kütüphane seçerken npm sayfasında 'TypeScript' rozetine veya package.json'da 'types' field'ına bakın. Varsa @types kurmanıza gerek yok. Yoksa @types/paket-adi kurun."
            },
            "note_en": "When picking a library, check the npm page for a 'TypeScript' badge or 'types' field in package.json. If present, no @types needed. Otherwise install @types/package-name."
          },
          {
            "type": "quiz",
            "question": {
              "en": "When is it REQUIRED to install @types/node?",
              "tr": "@types/node kurulumu ne zaman GEREKLİDİR?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "It installs automatically in every TypeScript project",
                  "tr": "Her TypeScript projesinde otomatik kurulur"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "When using Node.js APIs (fs, path, process) in TypeScript code",
                  "tr": "Node.js API'lerini (fs, path, process) TypeScript kodunda kullanırken"
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "Only required for Playwright projects",
                  "tr": "Yalnızca Playwright projeleri için gereklidir"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "Only in frontend (React, Vue) projects",
                  "tr": "Yalnızca frontend (React, Vue) projelerinde"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "en": "@types/node is required when using Node.js built-in modules (fs, path, process) in TypeScript. The Node.js runtime ships no TypeScript types — @types/node provides them. Most Playwright projects need @types/node since they use Node.js APIs for file I/O, env vars, and path manipulation.",
              "tr": "Node.js runtime'ı JavaScript ile yazılmıştır — TypeScript tipleri içermez. @types/node paketi fs.readFileSync, path.join, process.env gibi built-in modüller için tip tanımları sağlar. Playwright projeleri de Node.js API'lerini kullandığından neredeyse her Playwright+TypeScript projesinde @types/node bulunur."
            },
            "retryQuestion": {
              "question": {
                "en": "Why do we need the @types/node package when using 'import fs from \"fs\"' in TypeScript projects?",
                "tr": "Neden TypeScript projelerinde 'import fs from \"fs\"' satırı için @types/node paketine ihtiyaç duyarız?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "It allows the TypeScript compiler to find the Node.js installation",
                    "tr": "TypeScript derleyicisinin Node.js kurulumunu bulmasını sağlar"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "It provides type definitions so that Node.js modules are understandable by TypeScript",
                    "tr": "Node.js modüllerinin TypeScript tarafından anlaşılabilmesi için tip tanımlarını (typings) sunar"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "It forces the code to run in the browser instead of Node.js",
                    "tr": "Kodun Node.js yerine tarayıcıda çalışmasını zorunlu kılar"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "It is an additional runtime library to speed up the fs module",
                    "tr": "fs modülünü hızlandırmak için ek bir runtime kütüphanesidir"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "en": "Node.js built-in modules (fs, path, http, etc.) are written in JavaScript. To let TypeScript understand the methods and parameter types of these modules, an external type definition package like @types/node is necessary.",
                "tr": "Node.js yerleşik modülleri (fs, path, http vb.) JavaScript ile yazılmıştır. TypeScript'in bu modüllerin metodlarını ve parametre tiplerini anlayabilmesi için harici bir tip tanım paketi olan @types/node gereklidir."
              }
            }
          },
          {
            "type": "ts-mini-hero",
            "promptTr": "@types paketi tam olarak ne işe yarar? Kütüphane kendi tip tanımlarını içeriyorsa @types kurman gerekiyor mu?",
            "promptEn": "What exactly does a @types package do? If a library already bundles its own types, do you still need @types?",
            "keywords": [
              [
                "tip tanım",
                "type definition",
                "d.ts",
                "declaration"
              ],
              [
                "bundle",
                "kendi",
                "own",
                "içeriyor",
                "bundled"
              ],
              [
                "hayır",
                "no",
                "gerekmez",
                "not needed",
                "required"
              ],
              [
                "javascript",
                "js",
                "plain"
              ]
            ],
            "modelAnswerTr": "@types paketi, JavaScript kütüphaneleri için TypeScript tip tanımları sağlar. Playwright gibi TypeScript ile yazılmış kütüphaneler kendi tiplerini içerir — @types kurmana gerek yok.",
            "modelAnswerEn": "@types packages provide TypeScript type definitions for JavaScript libraries. Libraries like Playwright are written in TypeScript and bundle their own types — no @types package needed."
          },
          {
            "type": "heading",
            "text": {
              "en": "Conditional & Mapped Types",
              "tr": "Conditional & Mapped Types"
            },
            "difficulty": "🔴 Advanced"
          },
          {
            "type": "simple-box",
            "emoji": "🗺️",
            "content": {
              "tr": "Conditional type, 'eğer X ise A, değilse B' mantığında çalışan tip. Mapped type, bir nesnenin tüm alanlarını dönüştürür — her alanı opsiyonel yap, her alanı string yap gibi. Partial<T> aslında bir mapped type.",
              "en": "A conditional type works like 'if X then A, else B' for types. A mapped type transforms all fields of an object — make every field optional, make every field a string. Partial<T> is actually a mapped type."
            }
          },
          {
            "type": "code",
            "language": "typescript",
            "code": "// Conditional Types — ternary for types\ntype IsString<T> = T extends string ? \"yes\" : \"no\";\n\ntype A = IsString<string>;   // \"yes\"\ntype B = IsString<number>;   // \"no\"\n\n// NonNullable (built-in utility — implemented as conditional type)\ntype NonNull<T> = T extends null | undefined ? never : T;\n\n// Mapped Types — transform all properties\ninterface User { id: number; name: string; active: boolean; }\n\n// Make all fields optional (same as Partial<T>)\ntype Optional<T> = { [K in keyof T]?: T[K] };\n\n// Make all fields readonly (same as Readonly<T>)\ntype Immutable<T> = { readonly [K in keyof T]: T[K] };\n\n// Make all fields strings (type transformation)\ntype Stringified<T> = { [K in keyof T]: string };\n\ntype StringUser = Stringified<User>;\nconst su: StringUser = { id: \"1\", name: \"Alice\", active: \"true\" };\n\n// Practical: validation schema\ntype ValidationRules<T> = {\n  [K in keyof T]?: (value: T[K]) => string | null;  // null = valid\n};\n\nconst userValidation: ValidationRules<User> = {\n  name: (v) => v.length < 2 ? \"Name too short\" : null,\n  id: (v) => v <= 0 ? \"ID must be positive\" : null,\n};\n\nfunction validate<T>(obj: T, rules: ValidationRules<T>): string[] {\n  const errors: string[] = [];\n  for (const key in rules) {\n    const rule = rules[key];\n    const error = rule ? rule(obj[key]) : null;\n    if (error) errors.push(key + \": \" + error);\n  }\n  return errors;\n}\n\nconst u: User = { id: 1, name: \"A\", active: true };\nconsole.log(validate(u, userValidation));  // [\"name: Name too short\"]"
          },
          {
            "type": "editor",
            "lang": "typescript",
            "defaultCode": "// Build a DeepReadonly mapped type\ntype DeepReadonly<T> = {\n  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];\n};\n\ninterface Config {\n  server: {\n    host: string;\n    port: number;\n    ssl: boolean;\n  };\n  database: {\n    url: string;\n    poolSize: number;\n  };\n}\n\nconst config: DeepReadonly<Config> = {\n  server: { host: \"localhost\", port: 3000, ssl: true },\n  database: { url: \"postgres://localhost/testdb\", poolSize: 5 },\n};\n\nconsole.log(\"Host:\", config.server.host);\nconsole.log(\"Port:\", config.server.port);\n\n// This would be a TypeScript error:\n// config.server.port = 9000;  // Cannot assign to readonly"
          },
          {
            "type": "quiz",
            "question": {
              "en": "What does { [K in keyof T]?: T[K] } do in TypeScript?",
              "tr": "TypeScript'te { [K in keyof T]?: T[K] } ne yapar?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "Removes all fields from T",
                  "tr": "T'nin tüm alanlarını siler"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "Makes all fields of T optional (same as Partial<T>)",
                  "tr": "T'nin tüm alanlarını opsiyonel yapar (Partial<T> ile aynı)"
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "Converts T's fields to strings",
                  "tr": "T'nin alanlarını string'e dönüştürür"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "Converts T to an array",
                  "tr": "T'yi array'e dönüştürür"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "en": "[K in keyof T] iterates over all keys of T. ?: makes each optional. T[K] preserves the original type. This is exactly how Partial<T> is implemented.",
              "tr": "[K in keyof T] ile T'nin tüm keylerini iterate edersin. ?: her birini opsiyonel yapar. T[K] ile orijinal tipi korursun. Bu tam olarak Partial<T>'nin implementation'ı."
            },
            "retryQuestion": {
              "question": {
                "en": "Which of the following is the underlying equivalent of the Readonly<T> utility type in TypeScript?",
                "tr": "TypeScript'te Readonly<T> yardımcı tipinin arka planda çalışan eşdeğeri aşağıdakilerden hangisidir?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "{ readonly [K in keyof T]: T[K] }",
                    "tr": "{ readonly [K in keyof T]: T[K] }"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "{ [K in keyof T]: T[K] | null }",
                    "tr": "{ [K in keyof T]: T[K] | null }"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "{ [K in keyof T]?: T[K] }",
                    "tr": "{ [K in keyof T]?: T[K] }"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "{ [K in keyof T]: T[K] | undefined }",
                    "tr": "{ [K in keyof T]: T[K] | undefined }"
                  }
                }
              ],
              "correct": "a",
              "explanation": {
                "en": "The Readonly<T> utility makes all properties of an object immutable. This is achieved using the mapped type syntax by prepending the readonly modifier to every key via [K in keyof T].",
                "tr": "Readonly<T> yapısı, bir nesnenin tüm özelliklerini değiştirilemez hale getirir. Bu, mapped type sözdizimi kullanılarak [K in keyof T] üzerinden her anahtarın önüne readonly değiştiricisi eklenerek gerçekleştirilir."
              }
            }
          },
          {
            "type": "ts-mini-hero",
            "promptTr": "Conditional type ne zaman kullanılır? T extends string ? 'evet' : 'hayır' — bunu gerçekte ne zaman yazarsın?",
            "promptEn": "When are conditional types actually useful? T extends string ? 'yes' : 'no' — when would you really write this?",
            "keywords": [
              [
                "utility",
                "yardımcı",
                "tip yazmak",
                "writing types",
                "utility type"
              ],
              [
                "conditional",
                "koşullu",
                "eğer",
                "if"
              ],
              [
                "generic",
                "genel",
                "T"
              ],
              [
                "kütüphane",
                "library",
                "framework"
              ]
            ],
            "modelAnswerTr": "Utility type yazmak istediğinde: IsArray<T> = T extends any[] ? 'array' : 'not array'. Çoğunlukla kütüphane/framework geliştiricileri kullanır. Normal uygulama kodunda nadiren gerekir.",
            "modelAnswerEn": "When writing utility types: IsArray<T> = T extends any[] ? 'array' : 'not array'. Mostly used by library and framework authors. In everyday application code, you rarely need them."
          },
          {
            "type": "interleaving-challenge",
            "challenges": [
              {
                "topic": "Union Types",
                "questionTr": "string | number tipinde bir değişkende TypeScript hangi yöntemle spesifik tipi anlar?",
                "questionEn": "With a string | number type, how does TypeScript determine the specific type?",
                "optionsTr": [
                  "Otomatik seçer",
                  "typeof kontrolü ile (type narrowing)",
                  "as ile cast edilir",
                  "Runtime'da anlar"
                ],
                "optionsEn": [
                  "Selects automatically",
                  "Via typeof check (type narrowing)",
                  "Cast with as keyword",
                  "Figures out at runtime"
                ],
                "correct": 1,
                "explanationTr": "typeof kontrolü (type narrowing) TypeScript'in değişkenin gerçek tipini statik olarak bilmesini sağlar — runtime'a gerek yok.",
                "explanationEn": "typeof check (type narrowing) lets TypeScript know the real type statically — no runtime needed."
              },
              {
                "topic": "Generics",
                "questionTr": "function identity<T>(x: T): T çağrılırken T'yi açıkça belirtmek şart mı?",
                "questionEn": "When calling function identity<T>(x: T): T, is it required to explicitly specify T?",
                "optionsTr": [
                  "Evet, her zaman belirtmek gerekir",
                  "Hayır, TypeScript T'yi argümandan çıkarsar",
                  "Sadece string/number için zorunlu",
                  "Hayır, T her zaman any olur"
                ],
                "optionsEn": [
                  "Yes, always required",
                  "No, TypeScript infers T from the argument",
                  "Only required for string/number",
                  "No, T always becomes any"
                ],
                "correct": 1,
                "explanationTr": "TypeScript T'yi argümandan otomatik çıkarsar. identity('hello') → T=string. Java'da da aynı mantık.",
                "explanationEn": "TypeScript infers T from the argument automatically. identity('hello') → T=string. Same logic as Java."
              },
              {
                "topic": "Null Safety",
                "questionTr": "user?.profile?.email ifadesinde profile null ise ne döner?",
                "questionEn": "In user?.profile?.email, what is returned if profile is null?",
                "optionsTr": [
                  "Hata fırlatır",
                  "null döner",
                  "undefined döner",
                  "Boş string döner"
                ],
                "optionsEn": [
                  "Throws an error",
                  "Returns null",
                  "Returns undefined",
                  "Returns empty string"
                ],
                "correct": 2,
                "explanationTr": "?. (optional chaining) null/undefined'da crash olmak yerine undefined döner. ?? ile varsayılan değer eklenebilir.",
                "explanationEn": "?. (optional chaining) returns undefined instead of crashing on null/undefined. Combine with ?? to add a default."
              },
              {
                "topic": "Interface",
                "questionTr": "Aynı isimde iki interface tanımlanırsa TypeScript ne yapar?",
                "questionEn": "If two interfaces share the same name, what does TypeScript do?",
                "optionsTr": [
                  "Hata verir",
                  "Sadece son tanımı kullanır",
                  "İkisini birleştirir (declaration merging)",
                  "İkincisini yok sayar"
                ],
                "optionsEn": [
                  "Throws an error",
                  "Uses only the last definition",
                  "Merges both (declaration merging)",
                  "Ignores the second"
                ],
                "correct": 2,
                "explanationTr": "Declaration merging: aynı isimli iki interface TypeScript tarafından otomatik birleştirilir. type alias bunu desteklemez.",
                "explanationEn": "Declaration merging: TypeScript automatically merges two interfaces with the same name. type alias does not support this."
              },
              {
                "topic": "Utility Types",
                "questionTr": "PATCH endpoint için 'sadece değişen alanları içeren' payload tipi nasıl üretilir?",
                "questionEn": "How do you produce a payload type containing only changed fields for a PATCH endpoint?",
                "optionsTr": [
                  "Required<T>",
                  "Readonly<T>",
                  "Partial<T>",
                  "Pick<T,K>"
                ],
                "optionsEn": [
                  "Required<T>",
                  "Readonly<T>",
                  "Partial<T>",
                  "Pick<T,K>"
                ],
                "correct": 2,
                "explanationTr": "Partial<T> tüm alanları opsiyonel (?) yapar — PATCH sadece değişen alanları gönderir. Required<T> tam tersidir.",
                "explanationEn": "Partial<T> makes all fields optional (?) — PATCH only sends changed fields. Required<T> is the exact opposite."
              }
            ]
          },
          {
            "type": "interview-questions",
            "topic": "TypeScript Advanced",
            "questions": [
              {
                "level": "basic",
                "q": {
                  "tr": "TypeScript Generics neden kullanılır? Java'dan farkı nedir?",
                  "en": "Why are TypeScript Generics used? How do they differ from Java?"
                },
                "a": {
                  "tr": "Generic'ler tip-güvenli, yeniden kullanılabilir kod yazmak için. function identity<T>(x: T): T — her tip için aynı kodu kullanabilirsin. Java generic'leriyle aynı mantık. Fark: TypeScript structural typing kullanır, Java nominal typing. TypeScript'te <T extends { length: number }> ile duck typing yapılabilir.",
                  "en": "Generics write type-safe, reusable code. function identity<T>(x: T): T — same code works for every type. Same concept as Java generics. Difference: TypeScript uses structural typing, Java uses nominal typing. TypeScript allows duck typing: <T extends { length: number }>."
                }
              },
              {
                "level": "intermediate",
                "q": {
                  "tr": "Utility types nedir? En çok kullandığın hangisi ve neden?",
                  "en": "What are utility types? Which do you use most and why?"
                },
                "a": {
                  "tr": "Built-in tip dönüştürücüler: Partial<T>, Required<T>, Pick<T,K>, Omit<T,K>, Record<K,V>, Readonly<T>. En çok: Partial<T> — PUT/PATCH API endpoint'lerinde tüm alanların opsiyonel olduğu update payload'lar için. Ve Omit<T, 'password'|'secret'> — hassas alanları response'dan çıkarmak için.",
                  "en": "Built-in type transformers: Partial<T>, Required<T>, Pick<T,K>, Omit<T,K>, Record<K,V>, Readonly<T>. Most used: Partial<T> — for update payloads in PUT/PATCH endpoints where all fields are optional. And Omit<T, 'password'|'secret'> — removing sensitive fields from API responses."
                }
              },
              {
                "level": "advanced",
                "q": {
                  "tr": "Conditional types ne zaman kullanılmalı?",
                  "en": "When should conditional types be used?"
                },
                "a": {
                  "tr": "Conditional types: T extends U ? X : Y — tipler üzerinde if/else gibi. Kullanım: 1) Utility types yazmak (NonNullable gibi). 2) Discriminated unions üzerinde çalışmak. 3) Function overload signatures yerine. Karmaşık olabilir — önce simpler çözüm dene. QA framework'lerinde genellikle result types için kullanılır.",
                  "en": "Conditional types: T extends U ? X : Y — if/else logic for types. Use cases: 1) Writing utility types (like NonNullable). 2) Working with discriminated unions. 3) Instead of function overload signatures. Can be complex — try simpler solutions first. In QA frameworks, often used for result types."
                }
              }
            ]
          },
          {
            "type": "heading",
            "text": {
              "en": "Type-Safe Error Handling",
              "tr": "Tip Güvenli Hata Yönetimi"
            },
            "difficulty": {
              "en": "🟡 Intermediate",
              "tr": "🟡 Orta Seviye"
            }
          },
          {
            "type": "simple-box",
            "emoji": "🛡️",
            "content": {
              "tr": "Hata yönetimi, bilinmeyen bir kutuyu eldivenle açmak gibidir. Kutunun içinden ne çıkacağını bilmediğin (unknown) için önce kontrol edersin, sonra dokunursun.",
              "en": "Error handling is like opening a mystery package with protective gloves. Since you don't know what is inside (unknown), you inspect it before handling it."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "JavaScript'te `throw` ifadesiyle her şeyi fırlatabilirsiniz (sayı, string veya özel bir nesne). Bu yüzden catch bloğuna düşen hata parametresi modern TypeScript'te varsayılan olarak `unknown` (bilinmeyen) tiptedir. Hatayı kontrol etmeden (instanceof check) onun `message` veya `stack` gibi özelliklerine erişemezsiniz. Bu, testlerin çalışırken tanımsız hatalarla (TypeError) çökmesini önler.",
              "en": "In JavaScript, you can throw anything (strings, numbers, or objects). Therefore, modern TS types catch variables as `unknown` by default. You cannot access properties like `message` without first narrowing the type (e.g., using `instanceof Error`), preventing runtime crashes."
            }
          },
          {
            "type": "code",
            "language": "typescript",
            "label": {
              "en": "Type-Safe Try-Catch in TypeScript",
              "tr": "TypeScript'te Güvenli Try-Catch"
            },
            "content": "async function clickSelector(selector: string) {\n  try {\n    await page.click(selector);\n  } catch (error: unknown) { // error is unknown by default\n    // We cannot do: console.log(error.message); // ERROR: error is unknown\n\n    if (error instanceof Error) {\n      // TypeScript now knows error is an Error object\n      console.error(\"Test failed:\", error.message);\n      console.error(\"Stack trace:\", error.stack);\n    } else {\n      // Fallback for non-standard throws (e.g. throw \"custom error string\")\n      console.error(\"An unexpected error occurred:\", String(error));\n    }\n  }\n}",
            "expected": ""
          },
          {
            "type": "editor",
            "lang": "typescript",
            "defaultCode": "// Try throwing a string vs an Error object\nfunction testAction() {\n  try {\n    // Try switching these:\n    throw new Error(\"Element not clickable!\");\n    // throw \"Something bad happened!\";\n  } catch (err: unknown) {\n    if (err instanceof Error) {\n      console.log(\"Caught standard error:\", err.message);\n    } else {\n      console.log(\"Caught non-standard throw:\", String(err));\n    }\n  }\n}\ntestAction();"
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "Neden instanceof Kontrolü? Testlerde beklenmedik API hataları veya timeout hataları yakalandığında, sadece hata mesajını (error.message) güvenle yazdırmak ve test akışını bozmamak için zorunludur.",
              "en": "Why Use instanceof? Crucial in tests when catching API or timeout failures, ensuring you only access `.message` safely without introducing nested TypeErrors."
            }
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "Java Karşılaştırması: Java'da catch bloğunda tip belirtilir (`catch (IOException e)`). TypeScript'te ise tek bir catch vardır; bu yüzden çalışma zamanı tip daraltması (`instanceof`) Java'nın çoklu catch bloklarının işini yapar.",
              "en": "Java Comparison: Java catch blocks specify types explicitly (`catch (IOException e)`). TS has a single catch, so runtime `instanceof` checks serve the role of Java's multi-catch."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: Yere düşüp dağılan tuğlaları ayırmak gibidir. Eğer parça kırmızı renkteyse (instanceof Error), üzerindeki hata barkodunu (message) okursunuz; yoksa kenara koyarsınız.",
              "en": "LEGO analogy: Sifting through generic fallen parts. If a brick is red (instanceof Error), you read its serial code (message); otherwise, you handle it as an unlabelled component."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: Üzerinde hiçbir etiket olmayan gri bir LEGO kutusunu açmak gibidir. Kutuyu açıp kılavuza (Error prototipine) bakmadan içindekilerle oynamazsınız.",
              "en": "LEGO analogy: Receiving an unlabelled box of bricks. You don't try to build complex assemblies until you open the box and confirm it contains the manual (Error prototype)."
            }
          },
          {
            "type": "quiz",
            "question": {
              "tr": "TypeScript 4+ sürümünde `catch (error)` bloğundaki error değişkeninin varsayılan olarak `unknown` olmasının temel nedeni nedir?",
              "en": "What is the primary reason why catch variables default to `unknown` in modern TypeScript?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "tr": "Bellek tasarrufu sağlamak için",
                  "en": "To save memory at runtime"
                }
              },
              {
                "id": "b",
                "text": {
                  "tr": "JavaScript'te throw ile nesne dışındaki tiplerin (string, number) de fırlatılabilecek olması ve tipin baştan bilinememesi",
                  "en": "Because JS allows throwing any value (strings, numbers, etc.), making the error type unpredictable beforehand"
                }
              },
              {
                "id": "c",
                "text": {
                  "tr": "Hataların otomatik yoksayılması için",
                  "en": "To automatically ignore errors"
                }
              },
              {
                "id": "d",
                "text": {
                  "tr": "Java ile tam uyumluluk yakalamak için",
                  "en": "To achieve identical behavior with Java catch blocks"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "tr": "JavaScript'te `throw 'hata'` veya `throw 500` gibi ifadelere izin verilir. Bu yüzden catch bloğuna neyin düşeceği garanti edilemez. unknown tipi bizi bunu doğrulamaya zorlar.",
              "en": "JavaScript throws are untyped (you can throw numbers or strings). Thus, TypeScript cannot guarantee the caught value is an Error instance, requiring `unknown`."
            },
            "retryQuestion": {
              "question": {
                "tr": "catch bloğuna düşen `error: unknown` değişkeninin `.message` özelliğine erişmek için en güvenli yol nedir?",
                "en": "What is the safest way to access the `.message` property of a caught `error: unknown` variable?"
              },
              "options": [
                {
                  "id": "a",
                  "text": "console.log((error as any).message)"
                },
                {
                  "id": "b",
                  "text": "if (error instanceof Error) { console.log(error.message); }"
                },
                {
                  "id": "c",
                  "text": "console.log(error.message)"
                },
                {
                  "id": "d",
                  "text": "console.log(error!.message)"
                }
              ],
              "correct": "b",
              "explanation": {
                "tr": "`instanceof Error` kontrolü çalışma zamanında nesnenin Error sınıfından türediğini doğrular ve TypeScript'in tipi Error olarak daraltmasını (narrowing) sağlar.",
                "en": "Checking `error instanceof Error` dynamically verifies the prototype chain and narrows the type, allowing safe access to `.message` without compiler errors."
              }
            }
          },
          {
            "type": "interleaving-challenge",
            "challenges": [
              {
                "topic": "Union Types",
                "questionTr": "string | number tipinde bir değişkende TypeScript hangi yöntemle spesifik tipi anlar?",
                "questionEn": "With a string | number type, how does TypeScript determine the specific type?",
                "optionsTr": [
                  "Otomatik seçer",
                  "typeof kontrolü ile (type narrowing)",
                  "as ile cast edilir",
                  "Runtime'da anlar"
                ],
                "optionsEn": [
                  "Selects automatically",
                  "Via typeof check (type narrowing)",
                  "Cast with as keyword",
                  "Figures out at runtime"
                ],
                "correct": 1,
                "explanationTr": "typeof kontrolü (type narrowing) TypeScript'in değişkenin gerçek tipini statik olarak bilmesini sağlar — runtime'a gerek yok.",
                "explanationEn": "typeof check (type narrowing) lets TypeScript know the real type statically — no runtime needed."
              },
              {
                "topic": "Generics",
                "questionTr": "function identity<T>(x: T): T çağrılırken T'yi açıkça belirtmek şart mı?",
                "questionEn": "When calling function identity<T>(x: T): T, is it required to explicitly specify T?",
                "optionsTr": [
                  "Evet, her zaman belirtmek gerekir",
                  "Hayır, TypeScript T'yi argümandan çıkarsar",
                  "Sadece string/number için zorunlu",
                  "Hayır, T her zaman any olur"
                ],
                "optionsEn": [
                  "Yes, always required",
                  "No, TypeScript infers T from the argument",
                  "Only required for string/number",
                  "No, T always becomes any"
                ],
                "correct": 1,
                "explanationTr": "TypeScript T'yi argümandan otomatik çıkarsar. identity('hello') → T=string. Java'da da aynı mantık.",
                "explanationEn": "TypeScript infers T from the argument automatically. identity('hello') → T=string. Same logic as Java."
              },
              {
                "topic": "Null Safety",
                "questionTr": "user?.profile?.email ifadesinde profile null ise ne döner?",
                "questionEn": "In user?.profile?.email, what is returned if profile is null?",
                "optionsTr": [
                  "Hata fırlatır",
                  "null döner",
                  "undefined döner",
                  "Boş string döner"
                ],
                "optionsEn": [
                  "Throws an error",
                  "Returns null",
                  "Returns undefined",
                  "Returns empty string"
                ],
                "correct": 2,
                "explanationTr": "?. (optional chaining) null/undefined'da crash olmak yerine undefined döner. ?? ile varsayılan değer eklenebilir.",
                "explanationEn": "?. (optional chaining) returns undefined instead of crashing on null/undefined. Combine with ?? to add a default."
              },
              {
                "topic": "Interface",
                "questionTr": "Aynı isimde iki interface tanımlanırsa TypeScript ne yapar?",
                "questionEn": "If two interfaces share the same name, what does TypeScript do?",
                "optionsTr": [
                  "Hata verir",
                  "Sadece son tanımı kullanır",
                  "İkisini birleştirir (declaration merging)",
                  "İkincisini yok sayar"
                ],
                "optionsEn": [
                  "Throws an error",
                  "Uses only the last definition",
                  "Merges both (declaration merging)",
                  "Ignores the second"
                ],
                "correct": 2,
                "explanationTr": "Declaration merging: aynı isimli iki interface TypeScript tarafından otomatik birleştirilir. type alias bunu desteklemez.",
                "explanationEn": "Declaration merging: TypeScript automatically merges two interfaces with the same name. type alias does not support this."
              },
              {
                "topic": "Utility Types",
                "questionTr": "PATCH endpoint için 'sadece değişen alanları içeren' payload tipi nasıl üretilir?",
                "questionEn": "How do you produce a payload type containing only changed fields for a PATCH endpoint?",
                "optionsTr": [
                  "Required<T>",
                  "Readonly<T>",
                  "Partial<T>",
                  "Pick<T,K>"
                ],
                "optionsEn": [
                  "Required<T>",
                  "Readonly<T>",
                  "Partial<T>",
                  "Pick<T,K>"
                ],
                "correct": 2,
                "explanationTr": "Partial<T> tüm alanları opsiyonel (?) yapar — PATCH sadece değişen alanları gönderir. Required<T> tam tersidir.",
                "explanationEn": "Partial<T> makes all fields optional (?) — PATCH only sends changed fields. Required<T> is the exact opposite."
              }
            ]
          },
          {
            "type": "interview-questions",
            "topic": "TypeScript Advanced",
            "questions": [
              {
                "level": "basic",
                "q": {
                  "tr": "TypeScript Generics neden kullanılır? Java'dan farkı nedir?",
                  "en": "Why are TypeScript Generics used? How do they differ from Java?"
                },
                "a": {
                  "tr": "Generic'ler tip-güvenli, yeniden kullanılabilir kod yazmak için. function identity<T>(x: T): T — her tip için aynı kodu kullanabilirsin. Java generic'leriyle aynı mantık. Fark: TypeScript structural typing kullanır, Java nominal typing. TypeScript'te <T extends { length: number }> ile duck typing yapılabilir.",
                  "en": "Generics write type-safe, reusable code. function identity<T>(x: T): T — same code works for every type. Same concept as Java generics. Difference: TypeScript uses structural typing, Java uses nominal typing. TypeScript allows duck typing: <T extends { length: number }>."
                }
              },
              {
                "level": "intermediate",
                "q": {
                  "tr": "Utility types nedir? En çok kullandığın hangisi ve neden?",
                  "en": "What are utility types? Which do you use most and why?"
                },
                "a": {
                  "tr": "Built-in tip dönüştürücüler: Partial<T>, Required<T>, Pick<T,K>, Omit<T,K>, Record<K,V>, Readonly<T>. En çok: Partial<T> — PUT/PATCH API endpoint'lerinde tüm alanların opsiyonel olduğu update payload'lar için. Ve Omit<T, 'password'|'secret'> — hassas alanları response'dan çıkarmak için.",
                  "en": "Built-in type transformers: Partial<T>, Required<T>, Pick<T,K>, Omit<T,K>, Record<K,V>, Readonly<T>. Most used: Partial<T> — for update payloads in PUT/PATCH endpoints where all fields are optional. And Omit<T, 'password'|'secret'> — removing sensitive fields from API responses."
                }
              },
              {
                "level": "advanced",
                "q": {
                  "tr": "Conditional types ne zaman kullanılmalı?",
                  "en": "When should conditional types be used?"
                },
                "a": {
                  "tr": "Conditional types: T extends U ? X : Y — tipler üzerinde if/else gibi. Kullanım: 1) Utility types yazmak (NonNullable gibi). 2) Discriminated unions üzerinde çalışmak. 3) Function overload signatures yerine. Karmaşık olabilir — önce simpler çözüm dene. QA framework'lerinde genellikle result types için kullanılır.",
                  "en": "Conditional types: T extends U ? X : Y — if/else logic for types. Use cases: 1) Writing utility types (like NonNullable). 2) Working with discriminated unions. 3) Instead of function overload signatures. Can be complex — try simpler solutions first. In QA frameworks, often used for result types."
                }
              }
            ]
          }
        ]
      },
      {
        "title": {
          "en": "QA Use Cases",
          "tr": "QA Kullanım Örnekleri"
        },
        "blocks": [
          {
            "type": "heading",
            "content": {
              "en": "1. Fully Typed Page Object Model",
              "tr": "1. Tam Tipli Page Object Model"
            },
            "difficulty": "🟡 Intermediate"
          },
          {
            "type": "code",
            "language": "typescript",
            "label": {
              "en": "Production-ready TypeScript POM class",
              "tr": "Production-ready TypeScript POM class"
            },
            "content": {
              "en": "// pages/LoginPage.ts\n// Full TypeScript Page Object Model using Playwright types\n\nimport { type Page, type Locator } from \"@playwright/test\";\n\n// Interface defines the public contract — what callers can do with this page\nexport interface ILoginPage {\n  navigate(): Promise<void>;\n  login(email: string, password: string): Promise<void>;\n  getErrorMessage(): Promise<string>;\n  isLoggedIn(): Promise<boolean>;\n}\n\nexport class LoginPage implements ILoginPage {\n  // private Locators — callers cannot access selectors directly\n  // Using Playwright's 'Locator' type for full IDE support\n  private readonly emailInput: Locator;\n  private readonly passwordInput: Locator;\n  private readonly submitButton: Locator;\n  private readonly errorMessage: Locator;\n  private readonly userMenu: Locator;\n\n  // Page is injected — dependency injection pattern\n  constructor(private readonly page: Page) {\n    // Define all locators in the constructor (fail fast if selectors change)\n    this.emailInput     = page.locator('[data-testid=\"email-input\"]');\n    this.passwordInput  = page.locator('[data-testid=\"password-input\"]');\n    this.submitButton   = page.locator('[data-testid=\"login-submit\"]');\n    this.errorMessage   = page.locator('[data-testid=\"error-message\"]');\n    this.userMenu       = page.locator('[data-testid=\"user-menu\"]');\n  }\n\n  // Typed method — returns Promise<void> (performs action, returns nothing)\n  async navigate(): Promise<void> {\n    await this.page.goto(\"/login\");\n    await this.page.waitForLoadState(\"domcontentloaded\");\n  }\n\n  // Typed params — TypeScript catches if caller passes wrong types\n  async login(email: string, password: string): Promise<void> {\n    await this.emailInput.fill(email);\n    await this.passwordInput.fill(password);\n    await this.submitButton.click();\n  }\n\n  // Returns a string — caller knows they'll always get a string back\n  async getErrorMessage(): Promise<string> {\n    await this.errorMessage.waitFor({ state: \"visible\" });\n    return await this.errorMessage.innerText();\n  }\n\n  // Returns boolean — clean API for assertions\n  async isLoggedIn(): Promise<boolean> {\n    return await this.userMenu.isVisible();\n  }\n}\n\n// Usage in test:\n// test(\"login with valid credentials\", async ({ page }) => {\n//   const loginPage = new LoginPage(page);   // page is typed as Page\n//   await loginPage.navigate();\n//   await loginPage.login(\"user@test.com\", \"pass123\");\n//   expect(await loginPage.isLoggedIn()).toBe(true);\n// });",
              "tr": "// pages/LoginPage.ts\n// Full TypeScript Page Object Model using Playwright types\n\nimport { type Page, type Locator } from \"@playwright/test\";\n\n// Interface defines the public contract — what callers can do with this page\nexport interface ILoginPage {\n  navigate(): Promise<void>;\n  login(email: string, password: string): Promise<void>;\n  getErrorMessage(): Promise<string>;\n  isLoggedIn(): Promise<boolean>;\n}\n\nexport class LoginPage implements ILoginPage {\n  // private Locators — callers cannot access selectors directly\n  // Using Playwright's 'Locator' type for full IDE support\n  private readonly emailInput: Locator;\n  private readonly passwordInput: Locator;\n  private readonly submitButton: Locator;\n  private readonly errorMessage: Locator;\n  private readonly userMenu: Locator;\n\n  // Page is injected — dependency injection pattern\n  constructor(private readonly page: Page) {\n    // Define all locators in the constructor (fail fast if selectors change)\n    this.emailInput     = page.locator('[data-testid=\"email-input\"]');\n    this.passwordInput  = page.locator('[data-testid=\"password-input\"]');\n    this.submitButton   = page.locator('[data-testid=\"login-submit\"]');\n    this.errorMessage   = page.locator('[data-testid=\"error-message\"]');\n    this.userMenu       = page.locator('[data-testid=\"user-menu\"]');\n  }\n\n  // Typed method — returns Promise<void> (performs action, returns nothing)\n  async navigate(): Promise<void> {\n    await this.page.goto(\"/login\");\n    await this.page.waitForLoadState(\"domcontentloaded\");\n  }\n\n  // Typed params — TypeScript catches if caller passes wrong types\n  async login(email: string, password: string): Promise<void> {\n    await this.emailInput.fill(email);\n    await this.passwordInput.fill(password);\n    await this.submitButton.click();\n  }\n\n  // Returns a string — caller knows they'll always get a string back\n  async getErrorMessage(): Promise<string> {\n    await this.errorMessage.waitFor({ state: \"visible\" });\n    return await this.errorMessage.innerText();\n  }\n\n  // Returns boolean — clean API for assertions\n  async isLoggedIn(): Promise<boolean> {\n    return await this.userMenu.isVisible();\n  }\n}\n\n// Usage in test:\n// test(\"login with valid credentials\", async ({ page }) => {\n//   const loginPage = new LoginPage(page);   // page is typed as Page\n//   await loginPage.navigate();\n//   await loginPage.login(\"user@test.com\", \"pass123\");\n//   expect(await loginPage.isLoggedIn()).toBe(true);\n// });"
            }
          },
          {
            "type": "heading",
            "content": {
              "en": "2. Enums for Environments, Browsers, and Test Status",
              "tr": "2. Ortam, Tarayıcı ve Test Durumu için Enum'lar"
            },
            "difficulty": "🟢 Beginner"
          },
          {
            "type": "code",
            "language": "typescript",
            "label": {
              "en": "String enums for type-safe configuration",
              "tr": "String enums for type-safe configuration"
            },
            "content": {
              "en": "// enums/index.ts\n// String enums for every configuration choice — prevents typos and invalid values\n\nexport enum TestStatus {\n  PASS    = \"PASS\",\n  FAIL    = \"FAIL\",\n  SKIP    = \"SKIP\",\n  BLOCKED = \"BLOCKED\",\n  FLAKY   = \"FLAKY\",\n}\n\nexport enum Environment {\n  DEV     = \"development\",\n  STAGING = \"staging\",\n  PROD    = \"production\",\n}\n\nexport enum Browser {\n  CHROMIUM = \"chromium\",\n  FIREFOX  = \"firefox\",\n  WEBKIT   = \"webkit\",\n}\n\nexport enum LogLevel {\n  DEBUG   = \"debug\",\n  INFO    = \"info\",\n  WARN    = \"warn\",\n  ERROR   = \"error\",\n}\n\n// Config interface uses the enums — values are constrained\ninterface RunConfig {\n  environment: Environment;\n  browser: Browser;\n  logLevel: LogLevel;\n  workers: number;\n}\n\nconst config: RunConfig = {\n  environment: Environment.STAGING,   // must be a valid Environment\n  browser: Browser.CHROMIUM,          // must be a valid Browser\n  logLevel: LogLevel.INFO,\n  workers: 4,\n};\n\n// config.browser = \"chrome\";          // Error: 'chrome' is not assignable to type 'Browser'\n// config.environment = \"staging\";     // Error: use Environment.STAGING\n\nconsole.log(`Running ${config.browser} on ${config.environment}`);\n// Running chromium on staging",
              "tr": "// enums/index.ts\n// String enums for every configuration choice — prevents typos and invalid values\n\nexport enum TestStatus {\n  PASS    = \"PASS\",\n  FAIL    = \"FAIL\",\n  SKIP    = \"SKIP\",\n  BLOCKED = \"BLOCKED\",\n  FLAKY   = \"FLAKY\",\n}\n\nexport enum Environment {\n  DEV     = \"development\",\n  STAGING = \"staging\",\n  PROD    = \"production\",\n}\n\nexport enum Browser {\n  CHROMIUM = \"chromium\",\n  FIREFOX  = \"firefox\",\n  WEBKIT   = \"webkit\",\n}\n\nexport enum LogLevel {\n  DEBUG   = \"debug\",\n  INFO    = \"info\",\n  WARN    = \"warn\",\n  ERROR   = \"error\",\n}\n\n// Config interface uses the enums — values are constrained\ninterface RunConfig {\n  environment: Environment;\n  browser: Browser;\n  logLevel: LogLevel;\n  workers: number;\n}\n\nconst config: RunConfig = {\n  environment: Environment.STAGING,   // must be a valid Environment\n  browser: Browser.CHROMIUM,          // must be a valid Browser\n  logLevel: LogLevel.INFO,\n  workers: 4,\n};\n\n// config.browser = \"chrome\";          // Error: 'chrome' is not assignable to type 'Browser'\n// config.environment = \"staging\";     // Error: use Environment.STAGING\n\nconsole.log(`Running ${config.browser} on ${config.environment}`);\n// Running chromium on staging"
            },
            "expected": "Running chromium on staging"
          },
          {
            "type": "heading",
            "content": {
              "en": "3. Interface for API Response Validation",
              "tr": "3. API Yanıtı Doğrulaması için Interface"
            },
            "difficulty": "🟡 Intermediate"
          },
          {
            "type": "code",
            "language": "typescript",
            "label": {
              "en": "Type-safe API response interface with validation function",
              "tr": "Type-safe API response interface with validation function"
            },
            "content": {
              "en": "// types/api.ts\n// Typed interfaces for API testing with runtime validation\n\n// The shape we expect from the API\ninterface UserResponse {\n  id: number;\n  name: string;\n  email: string;\n  role: \"admin\" | \"viewer\" | \"editor\";\n  createdAt: string;\n}\n\n// Generic API wrapper — wraps any response data\ninterface ApiEnvelope<T> {\n  data: T;\n  meta: {\n    total: number;\n    page: number;\n    perPage: number;\n  };\n  errors: string[] | null;\n}\n\n// Runtime type guard — validates that an unknown response matches UserResponse\n// Returns type predicate: 'value is UserResponse'\nfunction isUserResponse(value: unknown): value is UserResponse {\n  if (!value || typeof value !== \"object\") return false;\n  const obj = value as Record<string, unknown>;\n  return (\n    typeof obj.id         === \"number\"   &&\n    typeof obj.name       === \"string\"   &&\n    typeof obj.email      === \"string\"   &&\n    typeof obj.role       === \"string\"   &&\n    [\"admin\", \"viewer\", \"editor\"].includes(obj.role as string) &&\n    typeof obj.createdAt  === \"string\"\n  );\n}\n\n// Usage in a test\nasync function fetchAndValidateUser(userId: number): Promise<UserResponse> {\n  // const response = await fetch(`/api/users/${userId}`);\n  // const json: unknown = await response.json();\n\n  const json: unknown = {            // simulate API response\n    id: userId,\n    name: \"Alice\",\n    email: \"alice@test.com\",\n    role: \"admin\",\n    createdAt: \"2024-01-01\",\n  };\n\n  if (!isUserResponse(json)) {\n    throw new Error(`API response does not match UserResponse shape`);\n  }\n\n  // After the guard, TypeScript knows 'json' is UserResponse\n  return json;\n}\n\nfetchAndValidateUser(1).then((u) => {\n  console.log(`Validated user: ${u.name} (${u.role})`);\n});",
              "tr": "// types/api.ts\n// Typed interfaces for API testing with runtime validation\n\n// The shape we expect from the API\ninterface UserResponse {\n  id: number;\n  name: string;\n  email: string;\n  role: \"admin\" | \"viewer\" | \"editor\";\n  createdAt: string;\n}\n\n// Generic API wrapper — wraps any response data\ninterface ApiEnvelope<T> {\n  data: T;\n  meta: {\n    total: number;\n    page: number;\n    perPage: number;\n  };\n  errors: string[] | null;\n}\n\n// Runtime type guard — validates that an unknown response matches UserResponse\n// Returns type predicate: 'value is UserResponse'\nfunction isUserResponse(value: unknown): value is UserResponse {\n  if (!value || typeof value !== \"object\") return false;\n  const obj = value as Record<string, unknown>;\n  return (\n    typeof obj.id         === \"number\"   &&\n    typeof obj.name       === \"string\"   &&\n    typeof obj.email      === \"string\"   &&\n    typeof obj.role       === \"string\"   &&\n    [\"admin\", \"viewer\", \"editor\"].includes(obj.role as string) &&\n    typeof obj.createdAt  === \"string\"\n  );\n}\n\n// Usage in a test\nasync function fetchAndValidateUser(userId: number): Promise<UserResponse> {\n  // const response = await fetch(`/api/users/${userId}`);\n  // const json: unknown = await response.json();\n\n  const json: unknown = {            // simulate API response\n    id: userId,\n    name: \"Alice\",\n    email: \"alice@test.com\",\n    role: \"admin\",\n    createdAt: \"2024-01-01\",\n  };\n\n  if (!isUserResponse(json)) {\n    throw new Error(`API response does not match UserResponse shape`);\n  }\n\n  // After the guard, TypeScript knows 'json' is UserResponse\n  return json;\n}\n\nfetchAndValidateUser(1).then((u) => {\n  console.log(`Validated user: ${u.name} (${u.role})`);\n});"
            },
            "expected": "Validated user: Alice (admin)"
          },
          {
            "type": "heading",
            "content": {
              "en": "4. Generic Test Data Factory",
              "tr": "4. Generic Test Data Factory"
            },
            "difficulty": "🟡 Intermediate"
          },
          {
            "type": "code",
            "language": "typescript",
            "label": {
              "en": "Generic factory for creating test fixtures with overrides",
              "tr": "Generic factory for creating test fixtures with overrides"
            },
            "content": {
              "en": "// utils/factory.ts\n// A generic factory that creates test data with sensible defaults\n// Supports partial overrides so tests only specify what's relevant\n\ninterface Product {\n  id: number;\n  name: string;\n  price: number;\n  inStock: boolean;\n  category: string;\n  sku: string;\n}\n\ninterface Order {\n  id: number;\n  userId: number;\n  products: Product[];\n  total: number;\n  status: \"pending\" | \"confirmed\" | \"shipped\" | \"delivered\";\n  createdAt: string;\n}\n\n// Generic factory function — T is any object type\nfunction createTestData<T>(defaults: T, overrides?: Partial<T>): T {\n  return { ...defaults, ...overrides };\n}\n\n// Default test product\nconst defaultProduct: Product = {\n  id: 1,\n  name: \"Test Widget\",\n  price: 29.99,\n  inStock: true,\n  category: \"electronics\",\n  sku: \"WIDGET-001\",\n};\n\n// Create variants for specific test scenarios\nconst outOfStockProduct = createTestData(defaultProduct, {\n  inStock: false,\n  name: \"Sold Out Widget\",\n});\n\nconst premiumProduct = createTestData(defaultProduct, {\n  id: 2,\n  price: 299.99,\n  name: \"Premium Widget\",\n  sku: \"WIDGET-PREMIUM\",\n});\n\n// ── Builder pattern variant — chain overrides ─────────────────────\nfunction productFactory(overrides?: Partial<Product>): Product {\n  return createTestData(defaultProduct, overrides);\n}\n\nconst cheapProduct   = productFactory({ price: 1.99, name: \"Budget Widget\" });\nconst electronicItem = productFactory({ category: \"computers\", id: 99 });\n\nconsole.log(`Out of stock: ${outOfStockProduct.name} — ${outOfStockProduct.inStock}`);\nconsole.log(`Premium price: $${premiumProduct.price}`);\nconsole.log(`Budget price: $${cheapProduct.price}`);",
              "tr": "// utils/factory.ts\n// A generic factory that creates test data with sensible defaults\n// Supports partial overrides so tests only specify what's relevant\n\ninterface Product {\n  id: number;\n  name: string;\n  price: number;\n  inStock: boolean;\n  category: string;\n  sku: string;\n}\n\ninterface Order {\n  id: number;\n  userId: number;\n  products: Product[];\n  total: number;\n  status: \"pending\" | \"confirmed\" | \"shipped\" | \"delivered\";\n  createdAt: string;\n}\n\n// Generic factory function — T is any object type\nfunction createTestData<T>(defaults: T, overrides?: Partial<T>): T {\n  return { ...defaults, ...overrides };\n}\n\n// Default test product\nconst defaultProduct: Product = {\n  id: 1,\n  name: \"Test Widget\",\n  price: 29.99,\n  inStock: true,\n  category: \"electronics\",\n  sku: \"WIDGET-001\",\n};\n\n// Create variants for specific test scenarios\nconst outOfStockProduct = createTestData(defaultProduct, {\n  inStock: false,\n  name: \"Sold Out Widget\",\n});\n\nconst premiumProduct = createTestData(defaultProduct, {\n  id: 2,\n  price: 299.99,\n  name: \"Premium Widget\",\n  sku: \"WIDGET-PREMIUM\",\n});\n\n// ── Builder pattern variant — chain overrides ─────────────────────\nfunction productFactory(overrides?: Partial<Product>): Product {\n  return createTestData(defaultProduct, overrides);\n}\n\nconst cheapProduct   = productFactory({ price: 1.99, name: \"Budget Widget\" });\nconst electronicItem = productFactory({ category: \"computers\", id: 99 });\n\nconsole.log(`Out of stock: ${outOfStockProduct.name} — ${outOfStockProduct.inStock}`);\nconsole.log(`Premium price: $${premiumProduct.price}`);\nconsole.log(`Budget price: $${cheapProduct.price}`);"
            },
            "expected": "Out of stock: Sold Out Widget — false\nPremium price: $299.99\nBudget price: $1.99"
          },
          {
            "type": "heading",
            "content": {
              "en": "5. Type-Safe Config with Partial Overrides",
              "tr": "5. Partial Override ile Type-Safe Config"
            },
            "difficulty": "🟡 Intermediate"
          },
          {
            "type": "code",
            "language": "typescript",
            "label": {
              "en": "Environment-specific Playwright config using Partial<Config>",
              "tr": "Environment-specific Playwright config using Partial<Config>"
            },
            "content": {
              "en": "// config/index.ts\n// Type-safe configuration management for multi-environment test suites\n\ninterface TestSuiteConfig {\n  baseUrl: string;\n  apiUrl: string;\n  timeout: number;\n  retries: number;\n  headless: boolean;\n  workers: number;\n  screenshotOnFailure: boolean;\n  videoOnFailure: boolean;\n  reporter: \"html\" | \"json\" | \"junit\" | \"dot\";\n  credentials: {\n    adminEmail: string;\n    adminPassword: string;\n  };\n}\n\n// Base (default) config — used as fallback for everything\nconst baseConfig: TestSuiteConfig = {\n  baseUrl: \"http://localhost:3000\",\n  apiUrl: \"http://localhost:3001/api\",\n  timeout: 30_000,\n  retries: 0,\n  headless: true,\n  workers: 4,\n  screenshotOnFailure: true,\n  videoOnFailure: false,\n  reporter: \"html\",\n  credentials: {\n    adminEmail: \"admin@localhost.com\",\n    adminPassword: \"DevPass123\",\n  },\n};\n\n// Environment-specific partial overrides — only specify what changes\nconst envConfigs: Record<string, Partial<TestSuiteConfig>> = {\n  staging: {\n    baseUrl: \"https://staging.myapp.com\",\n    apiUrl: \"https://api.staging.myapp.com\",\n    retries: 1,\n    credentials: { adminEmail: \"admin@staging.myapp.com\", adminPassword: \"StagingPass456\" },\n  },\n  prod: {\n    baseUrl: \"https://myapp.com\",\n    apiUrl: \"https://api.myapp.com\",\n    retries: 2,\n    headless: true,\n    workers: 8,\n    videoOnFailure: true,\n    credentials: { adminEmail: \"qa@myapp.com\", adminPassword: \"ProdPass789\" },\n  },\n};\n\n// Merge: base config + environment override\nfunction getConfig(env: string): TestSuiteConfig {\n  const override = envConfigs[env] ?? {};\n  return { ...baseConfig, ...override };\n}\n\nconst stagingConfig = getConfig(\"staging\");\nconsole.log(`Staging URL: ${stagingConfig.baseUrl}`);    // https://staging.myapp.com\nconsole.log(`Staging retries: ${stagingConfig.retries}`);  // 1\nconsole.log(`Workers: ${stagingConfig.workers}`);          // 4 (from base — not overridden)",
              "tr": "// config/index.ts\n// Type-safe configuration management for multi-environment test suites\n\ninterface TestSuiteConfig {\n  baseUrl: string;\n  apiUrl: string;\n  timeout: number;\n  retries: number;\n  headless: boolean;\n  workers: number;\n  screenshotOnFailure: boolean;\n  videoOnFailure: boolean;\n  reporter: \"html\" | \"json\" | \"junit\" | \"dot\";\n  credentials: {\n    adminEmail: string;\n    adminPassword: string;\n  };\n}\n\n// Base (default) config — used as fallback for everything\nconst baseConfig: TestSuiteConfig = {\n  baseUrl: \"http://localhost:3000\",\n  apiUrl: \"http://localhost:3001/api\",\n  timeout: 30_000,\n  retries: 0,\n  headless: true,\n  workers: 4,\n  screenshotOnFailure: true,\n  videoOnFailure: false,\n  reporter: \"html\",\n  credentials: {\n    adminEmail: \"admin@localhost.com\",\n    adminPassword: \"DevPass123\",\n  },\n};\n\n// Environment-specific partial overrides — only specify what changes\nconst envConfigs: Record<string, Partial<TestSuiteConfig>> = {\n  staging: {\n    baseUrl: \"https://staging.myapp.com\",\n    apiUrl: \"https://api.staging.myapp.com\",\n    retries: 1,\n    credentials: { adminEmail: \"admin@staging.myapp.com\", adminPassword: \"StagingPass456\" },\n  },\n  prod: {\n    baseUrl: \"https://myapp.com\",\n    apiUrl: \"https://api.myapp.com\",\n    retries: 2,\n    headless: true,\n    workers: 8,\n    videoOnFailure: true,\n    credentials: { adminEmail: \"qa@myapp.com\", adminPassword: \"ProdPass789\" },\n  },\n};\n\n// Merge: base config + environment override\nfunction getConfig(env: string): TestSuiteConfig {\n  const override = envConfigs[env] ?? {};\n  return { ...baseConfig, ...override };\n}\n\nconst stagingConfig = getConfig(\"staging\");\nconsole.log(`Staging URL: ${stagingConfig.baseUrl}`);    // https://staging.myapp.com\nconsole.log(`Staging retries: ${stagingConfig.retries}`);  // 1\nconsole.log(`Workers: ${stagingConfig.workers}`);          // 4 (from base — not overridden)"
            },
            "expected": "Staging URL: https://staging.myapp.com\nStaging retries: 1\nWorkers: 4"
          },
          {
            "type": "heading",
            "content": {
              "en": "6. Typed Playwright Fixtures",
              "tr": "6. Tipli Playwright Fixture'ları"
            },
            "difficulty": "🔴 Advanced"
          },
          {
            "type": "code",
            "language": "typescript",
            "label": {
              "en": "Custom Playwright fixtures with full TypeScript types",
              "tr": "Custom Playwright fixtures with full TypeScript types"
            },
            "content": {
              "en": "// fixtures/index.ts\n// Typed Playwright test fixtures — extend the base 'test' with your own fixtures\n\nimport { test as base, type Page } from \"@playwright/test\";\n\n// Import your page objects\n// import { LoginPage }    from \"../pages/LoginPage\";\n// import { DashboardPage } from \"../pages/DashboardPage\";\n\n// 1. Define the SHAPE of your custom fixtures\ninterface MyFixtures {\n  loginPage:     { navigate: () => Promise<void>; login: (e: string, p: string) => Promise<void> };\n  dashboardPage: { isVisible: () => Promise<boolean> };\n  testUser:      { email: string; password: string; role: string };\n  adminUser:     { email: string; password: string; role: string };\n  apiBaseUrl:    string;\n}\n\n// 2. Extend the base test with your fixture types\nexport const test = base.extend<MyFixtures>({\n\n  // Fixture: loginPage — creates a new LoginPage instance per test\n  loginPage: async ({ page }, use) => {\n    // const lp = new LoginPage(page);   // real: use your POM class\n    const lp = {                         // simplified for demo\n      navigate: async () => { console.log(\"navigating to /login\"); },\n      login: async (e: string, p: string) => { console.log(`login: ${e}`); },\n    };\n    await use(lp);   // pass to the test\n  },\n\n  // Fixture: testUser — provides default test credentials\n  testUser: async ({}, use) => {\n    await use({\n      email: \"user@test.com\",\n      password: \"TestPass123\",\n      role: \"viewer\",\n    });\n  },\n\n  // Fixture: adminUser — provides admin credentials\n  adminUser: async ({}, use) => {\n    await use({\n      email: \"admin@test.com\",\n      password: \"AdminPass456\",\n      role: \"admin\",\n    });\n  },\n\n  // Fixture: apiBaseUrl — environment-aware API URL\n  apiBaseUrl: async ({}, use) => {\n    const env = process.env.TEST_ENV ?? \"staging\";\n    const urls: Record<string, string> = {\n      staging: \"https://api.staging.myapp.com\",\n      prod:    \"https://api.myapp.com\",\n    };\n    await use(urls[env] ?? urls.staging);\n  },\n\n  // dashboardPage omitted for brevity\n  dashboardPage: async ({ page }, use) => {\n    await use({ isVisible: async () => true });\n  },\n});\n\n// 3. Usage in tests — full autocomplete for loginPage, testUser, etc.\n// test(\"login as regular user\", async ({ loginPage, testUser }) => {\n//   await loginPage.navigate();\n//   await loginPage.login(testUser.email, testUser.password);\n//   expect(await loginPage.isLoggedIn()).toBe(true);\n// });\n\nexport { expect } from \"@playwright/test\";",
              "tr": "// fixtures/index.ts\n// Typed Playwright test fixtures — extend the base 'test' with your own fixtures\n\nimport { test as base, type Page } from \"@playwright/test\";\n\n// Import your page objects\n// import { LoginPage }    from \"../pages/LoginPage\";\n// import { DashboardPage } from \"../pages/DashboardPage\";\n\n// 1. Define the SHAPE of your custom fixtures\ninterface MyFixtures {\n  loginPage:     { navigate: () => Promise<void>; login: (e: string, p: string) => Promise<void> };\n  dashboardPage: { isVisible: () => Promise<boolean> };\n  testUser:      { email: string; password: string; role: string };\n  adminUser:     { email: string; password: string; role: string };\n  apiBaseUrl:    string;\n}\n\n// 2. Extend the base test with your fixture types\nexport const test = base.extend<MyFixtures>({\n\n  // Fixture: loginPage — creates a new LoginPage instance per test\n  loginPage: async ({ page }, use) => {\n    // const lp = new LoginPage(page);   // real: use your POM class\n    const lp = {                         // simplified for demo\n      navigate: async () => { console.log(\"navigating to /login\"); },\n      login: async (e: string, p: string) => { console.log(`login: ${e}`); },\n    };\n    await use(lp);   // pass to the test\n  },\n\n  // Fixture: testUser — provides default test credentials\n  testUser: async ({}, use) => {\n    await use({\n      email: \"user@test.com\",\n      password: \"TestPass123\",\n      role: \"viewer\",\n    });\n  },\n\n  // Fixture: adminUser — provides admin credentials\n  adminUser: async ({}, use) => {\n    await use({\n      email: \"admin@test.com\",\n      password: \"AdminPass456\",\n      role: \"admin\",\n    });\n  },\n\n  // Fixture: apiBaseUrl — environment-aware API URL\n  apiBaseUrl: async ({}, use) => {\n    const env = process.env.TEST_ENV ?? \"staging\";\n    const urls: Record<string, string> = {\n      staging: \"https://api.staging.myapp.com\",\n      prod:    \"https://api.myapp.com\",\n    };\n    await use(urls[env] ?? urls.staging);\n  },\n\n  // dashboardPage omitted for brevity\n  dashboardPage: async ({ page }, use) => {\n    await use({ isVisible: async () => true });\n  },\n});\n\n// 3. Usage in tests — full autocomplete for loginPage, testUser, etc.\n// test(\"login as regular user\", async ({ loginPage, testUser }) => {\n//   await loginPage.navigate();\n//   await loginPage.login(testUser.email, testUser.password);\n//   expect(await loginPage.isLoggedIn()).toBe(true);\n// });\n\nexport { expect } from \"@playwright/test\";"
            }
          },
          {
            "type": "heading",
            "content": {
              "en": "7. Utility Types for Partial Override Testing",
              "tr": "7. Partial Override Testi için Utility Type'lar"
            },
            "difficulty": "🔴 Advanced"
          },
          {
            "type": "code",
            "language": "typescript",
            "label": {
              "en": "Making fixture fields optional for flexible test setups",
              "tr": "Making fixture fields optional for flexible test setups"
            },
            "content": {
              "en": "// Using TypeScript utility types to make test fixtures flexible\n\n// Full fixture interface — all fields required\ninterface TestFixtures {\n  email: string;\n  password: string;\n  role: string;\n  permissions: string[];\n  teamId: number;\n  locale: string;\n  timezone: string;\n}\n\n// Partial<T> — ALL fields become optional\n// Use for test helpers that accept partial overrides\ntype PartialFixtures = Partial<TestFixtures>;\n\n// Required<T> — ALL optional become required\ntype StrictFixtures = Required<TestFixtures>;\n\n// Readonly<T> — no one can mutate fixture data (prevents accidental shared state)\ntype ImmutableFixtures = Readonly<TestFixtures>;\n\n// Pick — only the authentication-relevant fields\ntype AuthFixture = Pick<TestFixtures, \"email\" | \"password\" | \"role\">;\n\n// Omit — everything except sensitive credentials\ntype SafeFixture = Omit<TestFixtures, \"password\">;\n\n// ── createFixture: merge defaults + partial overrides ─────────────\nconst defaultFixtures: TestFixtures = {\n  email:       \"default@test.com\",\n  password:    \"DefaultPass123\",\n  role:        \"viewer\",\n  permissions: [\"read\"],\n  teamId:      1,\n  locale:      \"en-US\",\n  timezone:    \"UTC\",\n};\n\nfunction createFixture(overrides: Partial<TestFixtures>): Readonly<TestFixtures> {\n  const merged = { ...defaultFixtures, ...overrides };\n  return Object.freeze(merged);   // freeze = runtime + compile-time immutability\n}\n\nconst adminFixture   = createFixture({ role: \"admin\", permissions: [\"read\", \"write\", \"delete\"] });\nconst euFixture      = createFixture({ locale: \"de-DE\", timezone: \"Europe/Berlin\" });\nconst minimalFixture: AuthFixture = { email: \"qa@test.com\", password: \"pass\", role: \"editor\" };\n\nconsole.log(`Admin: ${adminFixture.role}, perms: ${adminFixture.permissions.join(\", \")}`);\nconsole.log(`EU locale: ${euFixture.locale}, tz: ${euFixture.timezone}`);\nconsole.log(`Auth only: ${minimalFixture.email}`);",
              "tr": "// Using TypeScript utility types to make test fixtures flexible\n\n// Full fixture interface — all fields required\ninterface TestFixtures {\n  email: string;\n  password: string;\n  role: string;\n  permissions: string[];\n  teamId: number;\n  locale: string;\n  timezone: string;\n}\n\n// Partial<T> — ALL fields become optional\n// Use for test helpers that accept partial overrides\ntype PartialFixtures = Partial<TestFixtures>;\n\n// Required<T> — ALL optional become required\ntype StrictFixtures = Required<TestFixtures>;\n\n// Readonly<T> — no one can mutate fixture data (prevents accidental shared state)\ntype ImmutableFixtures = Readonly<TestFixtures>;\n\n// Pick — only the authentication-relevant fields\ntype AuthFixture = Pick<TestFixtures, \"email\" | \"password\" | \"role\">;\n\n// Omit — everything except sensitive credentials\ntype SafeFixture = Omit<TestFixtures, \"password\">;\n\n// ── createFixture: merge defaults + partial overrides ─────────────\nconst defaultFixtures: TestFixtures = {\n  email:       \"default@test.com\",\n  password:    \"DefaultPass123\",\n  role:        \"viewer\",\n  permissions: [\"read\"],\n  teamId:      1,\n  locale:      \"en-US\",\n  timezone:    \"UTC\",\n};\n\nfunction createFixture(overrides: Partial<TestFixtures>): Readonly<TestFixtures> {\n  const merged = { ...defaultFixtures, ...overrides };\n  return Object.freeze(merged);   // freeze = runtime + compile-time immutability\n}\n\nconst adminFixture   = createFixture({ role: \"admin\", permissions: [\"read\", \"write\", \"delete\"] });\nconst euFixture      = createFixture({ locale: \"de-DE\", timezone: \"Europe/Berlin\" });\nconst minimalFixture: AuthFixture = { email: \"qa@test.com\", password: \"pass\", role: \"editor\" };\n\nconsole.log(`Admin: ${adminFixture.role}, perms: ${adminFixture.permissions.join(\", \")}`);\nconsole.log(`EU locale: ${euFixture.locale}, tz: ${euFixture.timezone}`);\nconsole.log(`Auth only: ${minimalFixture.email}`);"
            },
            "expected": "Admin: admin, perms: read, write, delete\nEU locale: de-DE, tz: Europe/Berlin\nAuth only: qa@test.com"
          },
          {
            "type": "heading",
            "content": {
              "en": "🏗️ Playwright POM Architecture — Class Hierarchy",
              "tr": "🏗️ Playwright POM Mimarisi — Sınıf Hiyerarşisi"
            },
            "difficulty": "🟡 Intermediate"
          },
          {
            "type": "visual",
            "variant": "flow",
            "title": {
              "en": "TypeScript POM Class Hierarchy — Layer by Layer",
              "tr": "TypeScript POM Sınıf Hiyerarşisi — Katman Katman"
            },
            "note": {
              "en": "Each layer inherits from the one above. Tests only call public methods — selectors are hidden inside page classes.",
              "tr": "Her katman üsttekinden miras alır. Testler yalnızca public metodları çağırır — selector'lar sayfa sınıflarının içinde gizlidir."
            },
            "steps": [
              {
                "num": "1",
                "label": "IPage Interface",
                "desc": {
                  "en": "navigate(), login(), getError() — the public contract",
                  "tr": "navigate(), login(), getError() — public sözleşme"
                },
                "highlight": true
              },
              {
                "num": "2",
                "label": "PageBase (abstract)",
                "desc": {
                  "en": "Shared helpers: waitForLoad(), expectUrl(), getLocator()",
                  "tr": "Paylaşılan yardımcılar: waitForLoad(), expectUrl(), getLocator()"
                }
              },
              {
                "num": "3",
                "label": "LoginPage extends PageBase",
                "desc": {
                  "en": "Implements IPage — owns all selectors + actions",
                  "tr": "IPage'i uygular — tüm selector ve aksiyonlara sahip"
                }
              },
              {
                "num": "4",
                "label": "test fixture (test.extend)",
                "desc": "loginPage: async({page}, use) => { ... }"
              },
              {
                "num": "5",
                "label": {
                  "en": "Test file",
                  "tr": "Test dosyası"
                },
                "desc": "test('login', async({ loginPage }) => { await loginPage.login(...) })",
                "highlight": true
              }
            ]
          },
          {
            "type": "comparison",
            "left": {
              "label": "❌ Untyped — Runtime Surprises",
              "code": "// JavaScript / untyped Playwright\ntest('login', async ({ page }) => {\n  await page.fill('#emal', 'user@test.com');  // typo: #emal\n  await page.click('#submit-btn');\n\n  // crashes at runtime — no IDE warning\n  const result = await page.locator('.dashbord').textContent();\n  //                                  ^ typo — no error until test runs\n  expect(result).toBe('Welcome!');\n});",
              "note": "Selector typos and wrong method calls discovered at runtime — expensive CI failures"
            },
            "right": {
              "label": "✅ Typed POM — Caught at Compile Time",
              "code": "// TypeScript Playwright POM\nexport class LoginPage {\n  private readonly emailInput: Locator;    // typed field\n  constructor(private readonly page: Page) {\n    this.emailInput = page.locator('[data-testid=\"email\"]');\n  }\n  async login(email: string, password: string): Promise<void> {\n    await this.emailInput.fill(email);   // IDE shows fill() options\n    // loginPage.fill(email)  ← compiler error: method doesn't exist\n  }\n}\n\ntest('login', async ({ loginPage }) => {\n  await loginPage.login('user@test.com', 'pass');\n  // loginPage.navigate(42) ← Error: number not assignable to void\n});",
              "note": "Selector changes cascade safely — compiler shows every broken call site"
            }
          },
          {
            "type": "visual",
            "variant": "boxes",
            "title": {
              "en": "Typed Fixture Pipeline — From Config to Test",
              "tr": "Tipli Fixture Pipeline'ı — Config'den Teste"
            },
            "items": [
              {
                "icon": {
                  "en": "⚙️",
                  "tr": "⚙️"
                },
                "label": {
                  "en": "playwright.config.ts",
                  "tr": "playwright.config.ts"
                },
                "desc": {
                  "en": "baseURL, timeout, retries",
                  "tr": "baseURL, timeout, retries"
                }
              },
              {
                "arrow": {
                  "en": true,
                  "tr": true
                }
              },
              {
                "icon": {
                  "en": "🔧",
                  "tr": "🔧"
                },
                "label": {
                  "en": "test.extend<MyFixtures>",
                  "tr": "test.extend<MyFixtures>"
                },
                "desc": {
                  "en": "loginPage, testUser, apiBaseUrl",
                  "tr": "loginPage, testUser, apiBaseUrl"
                }
              },
              {
                "arrow": {
                  "en": true,
                  "tr": true
                }
              },
              {
                "icon": {
                  "en": "📄",
                  "tr": "📄"
                },
                "label": {
                  "en": "LoginPage class",
                  "tr": "LoginPage sınıfı"
                },
                "desc": {
                  "en": "private Locators, typed methods",
                  "tr": "private Locator'lar, tipli metodlar"
                }
              },
              {
                "arrow": {
                  "en": true,
                  "tr": true
                }
              },
              {
                "icon": {
                  "en": "🧪",
                  "tr": "🧪"
                },
                "label": {
                  "en": "Test function",
                  "tr": "Test fonksiyonu"
                },
                "desc": {
                  "en": "async ({ loginPage, testUser }) => {}",
                  "tr": "async ({ loginPage, testUser }) => {}"
                }
              },
              {
                "arrow": {
                  "en": true,
                  "tr": true
                }
              },
              {
                "icon": {
                  "en": "✅",
                  "tr": "✅"
                },
                "label": {
                  "en": "Type-safe assertions",
                  "tr": "Type-safe assertion'lar"
                },
                "desc": {
                  "en": "expect().toHaveURL(), toHaveText()",
                  "tr": "expect().toHaveURL(), toHaveText()"
                }
              }
            ],
            "note": {
              "en": "Every arrow is a typed boundary — passing wrong types triggers a compile error, not a runtime crash.",
              "tr": "Her ok tipli bir sınırdır — yanlış tip geçilmesi çalışma zamanı hatası değil, derleme hatası tetikler."
            }
          },
          {
            "type": "quiz",
            "question": {
              "en": "What is the core benefit of a fully-typed Page Object Model in Playwright automation?",
              "tr": "Tam tipli bir Page Object Model'in Playwright otomasyonunda sağladığı temel avantaj nedir?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "Makes tests run faster",
                  "tr": "Testleri daha hızlı çalıştırır"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "The IDE autocompletes method/property names and misuse is caught at compile time",
                  "tr": "IDE metod/property isimlerini otomatik tamamlar ve yanlış kullanım derleme zamanında yakalanır"
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "Automatically updates locators",
                  "tr": "Locator'ları otomatik olarak günceller"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "Shares browser sessions",
                  "tr": "Tarayıcı oturumlarını paylaşır"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "en": "When a Page Object class is fully typed, calling a wrong method name or passing the wrong argument type is caught by the compiler before the test even runs — the IDE also autocompletes every method/property, so you never have to guess a method name. Same logic as compiling against an interface in Java.",
              "tr": "Bir Page Object class'ı tam tipli olduğunda, yanlış bir metod adı çağırmak veya yanlış argüman tipini geçirmek testi çalıştırmadan önce derleyici tarafından yakalanır — IDE de her metod/property için otomatik tamamlama gösterir, metod adlarını tahmin etmeye gerek kalmaz. Bu, Java'da bir arayüze (interface) karşı derleme yapmanın IDE/derleyici güvenliğiyle aynı mantıktır."
            },
            "retryQuestion": {
              "question": {
                "en": "In an untyped (plain JS) Page Object, someone writes `loginPage.clickLogin()` but the real method is `clickLoginButton()`. When is this mistake caught?",
                "tr": "Tipsiz (plain JS) bir Page Object'te `loginPage.clickLogin()` yazılır ama gerçek metod adı `clickLoginButton()`dır. Bu hata ne zaman fark edilir?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "Immediately, the IDE flags it with a red squiggly",
                    "tr": "Hemen, IDE kırmızı çizgiyle gösterir"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "Only when the test runs, with a \"clickLogin is not a function\" runtime error",
                    "tr": "Test çalıştırıldığında, \"clickLogin is not a function\" runtime hatasıyla"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "Never — JavaScript automatically creates missing methods",
                    "tr": "Asla — JavaScript var olmayan metodları otomatik oluşturur"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "At compile time, because JavaScript is compiled too",
                    "tr": "Derleme sırasında, çünkü JavaScript de derlenir"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "en": "In plain JavaScript (no type checking), a wrong method name only blows up when that line actually RUNS — there is no compile-time concept at all. This is the exact contrast with TypeScript catching the same mistake instantly in the IDE on a fully-typed Page Object — the difference between \"run the test and see the error in CI\" versus \"see the error while typing.\"",
                "tr": "Plain JavaScript'te (tip kontrolü olmadan) yanlış bir metod adı sadece o satır gerçekten ÇALIŞTIĞINDA patlar — derleme zamanı diye bir kavram yoktur. Bu, TypeScript'in tam tipli bir Page Object'te aynı hatayı yazarken IDE'de anında yakalamasıyla tam karşıtlık oluşturur; bu fark, \"test çalıştırıp hatayı CI'da görmek\" ile \"yazarken hatayı görmek\" arasındaki temel farktır."
              }
            }
          }
        ]
      },
      {
        "title": {
          "en": "☕ Java → TypeScript: Great News — Very Similar!",
          "tr": "☕ Java → TypeScript: Harika Haber — Çok Benzer!"
        },
        "blocks": [
          {
            "type": "text",
            "content": {
              "en": "TypeScript is much easier for Java developers than Python! class, interface, access modifiers, generics, enums — all will feel familiar. There are only a few critical differences. This section explains these differences from a Java perspective.",
              "tr": "TypeScript Java geliştiricileri için Python'dan çok daha kolay! class, interface, access modifiers, generics, enums — hepsi tanıdık gelecek. Sadece birkaç kritik fark var. Bu bölüm bu farkları Java perspektifinden açıklar."
            }
          },
          {
            "type": "heading",
            "text": {
              "en": "1. Basic Types — Very Similar to Java",
              "tr": "1. Temel Tipler — Java'ya Çok Benzer"
            }
          },
          {
            "type": "java-compare",
            "topic": "Basic Types",
            "why": {
              "en": "Java'da int, long, float, double gibi ayrı sayısal tipler vardır. TypeScript'te tüm sayılar için tek tip kullanılır: number. string küçük harf (Java'nın String objesi değil), boolean aynı.",
              "tr": "Java'da int, long, float, double gibi ayrı sayısal tipler vardır. TypeScript'te tüm sayılar için tek tip kullanılır: number. string küçük harf, boolean aynı."
            },
            "java": "// Java: separate numeric types\nint count = 5;          // 32-bit integer\nlong bigNum = 999L;     // 64-bit integer\nfloat rate = 3.14f;     // 32-bit float\ndouble price = 99.99;   // 64-bit double\nString name = \"test\";   // immutable Object\nboolean active = true;",
            "typescript": "// TypeScript: simplified!\nlet count: number = 5;       // ALL numbers: one type\nlet bigNum: number = 999;    // no 'L' suffix\nlet rate: number = 3.14;     // no 'f' suffix\nlet price: number = 99.99;   // same type\nlet name: string = \"test\";   // lowercase! (not String)\nlet active: boolean = true;  // identical!\n\n// Type inference (Java's 'var' equivalent):\nlet count2 = 5;       // inferred: number\nlet name2 = \"Alice\";  // inferred: string",
            "note": {
              "en": "\"number\" = Java'nın int/long/float/double hepsi. \"string\" (küçük harf) ≠ Java String (büyük harf). TypeScript'te ayrıca \"any\" (Object gibi, kaçış kapısı — kaçın!) ve \"unknown\" (daha güvenli any) var.",
              "tr": "\"number\" = Java'nın int/long/float/double hepsi. \"string\" (küçük harf) ≠ Java String (büyük harf). TypeScript'te ayrıca \"any\" (Object gibi — kaçın!) var."
            },
            "why_en": "In Java there are separate numeric types: int, long, float, double. TypeScript uses a single type for all numbers: number. string is lowercase (not Java's String object), and boolean is identical.",
            "note_en": "\"number\" = all of Java's int/long/float/double in one type. \"string\" (lowercase) ≠ Java String (uppercase). TypeScript also has \"any\" (like Object — an escape hatch, avoid it!) and \"unknown\" (safer any)."
          },
          {
            "type": "heading",
            "text": {
              "en": "2. Interface — Structural Typing (The Most Important Difference!)",
              "tr": "2. Interface — Yapısal Tipleme (En Önemli Fark!)"
            }
          },
          {
            "type": "java-compare",
            "topic": "interface (structural typing!)",
            "why": {
              "en": "TypeScript interface Java'dakilere benzer ama kritik bir fark var: TypeScript 'structural typing' (yapısal tipleme) kullanır. Nesnenin 'implements' bildirmesine gerek yoktur — doğru shape'e sahip her nesne interface'i karşılar.",
              "tr": "TypeScript interface Java'dakilere benzer ama kritik fark: TypeScript 'structural typing' kullanır. Nesnenin 'implements' bildirmesine gerek yoktur — doğru shape her nesne interface'i karşılar."
            },
            "java": "// Java: nominal typing\n// Class MUST declare \"implements\"\ninterface Testable {\n    void run();\n    String getName();\n    default int getTimeout() { return 30000; }\n}\n\n// Explicitly declares: \"implements Testable\"\npublic class LoginTest implements Testable {\n    public void run() { /* test logic */ }\n    public String getName() { return \"Login Test\"; }\n}",
            "typescript": "// TypeScript: structural typing!\ninterface Testable {\n    run(): void;\n    getName(): string;\n    timeout?: number;  // optional (no 'default' — use ?: instead)\n}\n\n// No \"implements\" needed if shape matches:\nconst loginTest = {\n    run: () => { /* test logic */ },\n    getName: () => \"Login Test\"\n};\n// ✅ TypeScript accepts loginTest as Testable!\n\n// But you CAN use implements for clarity:\nclass SignupTest implements Testable {\n    run() { /* test logic */ }\n    getName() { return \"Signup Test\"; }\n}",
            "note": {
              "en": "Java = nominal typing (\"implements\" bildirimi zorunlu). TypeScript = structural typing (\"doğru şekle sahip olman yeterli\"). Bu TypeScript'in en güçlü ve en farklı konsepti.",
              "tr": "Java = nominal typing ('implements' zorunlu). TypeScript = structural typing ('doğru şekil yeterli'). Bu TypeScript'in en güçlü ve en farklı konsepti."
            },
            "why_en": "TypeScript interfaces look like Java's but have one critical difference: TypeScript uses structural typing. An object does NOT need to declare \"implements\" — any object with the right shape satisfies the interface.",
            "note_en": "Java = nominal typing (\"implements\" declaration required). TypeScript = structural typing (\"having the right shape is enough\"). This is TypeScript's most powerful and most distinctive concept."
          },
          {
            "type": "heading",
            "text": {
              "en": "3. Classes — Nearly Identical!",
              "tr": "3. Sınıflar — Neredeyse Aynı!"
            }
          },
          {
            "type": "java-compare",
            "topic": "class (nearly identical!)",
            "why": {
              "en": "TypeScript class sözdizimi Java'ya o kadar benzer ki sadece küçük farklılıklar var: 'constructor' anahtar kelimesi, 'readonly' (final yerine), ve constructor shorthand (tek satırda hem declare hem assign).",
              "tr": "TypeScript class sözdizimi Java'ya çok benzer: 'constructor' anahtar kelimesi, 'readonly' (final yerine), ve constructor shorthand (tek satırda hem declare hem assign)."
            },
            "java": "// Java class\npublic class PageObject {\n    private final WebDriver driver; // final = immutable\n    protected String baseUrl;\n\n    public PageObject(WebDriver driver) {\n        this.driver = driver;\n        this.baseUrl = \"https://example.com\";\n    }\n\n    protected void click(By locator) {\n        driver.findElement(locator).click();\n    }\n\n    public static PageObject create(WebDriver d) {\n        return new PageObject(d);\n    }\n}",
            "typescript": "// TypeScript class — almost identical!\nclass PageObject {\n    private readonly driver: WebDriver; // readonly = final\n    protected baseUrl: string;\n\n    constructor(driver: WebDriver) {    // NOT class name!\n        this.driver = driver;\n        this.baseUrl = \"https://example.com\";\n    }\n\n    protected click(locator: Locator): void {\n        locator.click();\n    }\n\n    static create(d: WebDriver): PageObject {\n        return new PageObject(d);\n    }\n}\n\n// Constructor shorthand (saves boilerplate!):\nclass Test {\n    constructor(\n        private readonly driver: WebDriver, // declare + assign\n        public name: string                 // declare + assign\n    ) {}\n}",
            "note": {
              "en": "\"readonly\" = Java \"final\". Constructor shorthand: \"constructor(private x: T)\" hem field'ı tanımlar hem atar — Java'ya kıyasla büyük boilerplate tasarrufu.",
              "tr": "\"readonly\" = Java \"final\". Constructor shorthand: \"constructor(private x: T)\" hem field'ı tanımlar hem atar — büyük boilerplate tasarrufu."
            },
            "why_en": "TypeScript class syntax is so similar to Java that there are only minor differences: the \"constructor\" keyword, \"readonly\" (instead of final), and constructor shorthand (declare and assign in one line).",
            "note_en": "\"readonly\" = Java \"final\". Constructor shorthand: \"constructor(private x: T)\" both declares the field and assigns it — a big boilerplate saving compared to Java."
          },
          {
            "type": "heading",
            "text": {
              "en": "4. Access Modifiers — Identical!",
              "tr": "4. Erişim Belirleyicileri — Birebir Aynı!"
            }
          },
          {
            "type": "java-compare",
            "topic": "access modifiers (same keywords!)",
            "why": {
              "en": "TypeScript access modifier'ları Java ile birebir aynı keyword'ler: public, private, protected. Java'dan farklı olarak 'package-private' kavramı yoktur. Ve iyi haber: Python'un aksine TypeScript gerçekten derleme zamanında zorlar!",
              "tr": "TypeScript access modifier'ları Java ile birebir aynı: public, private, protected. Python'un aksine TypeScript gerçekten derleme zamanında zorlar!"
            },
            "java": "// Java access modifiers\npublic class BankTest {\n    public String testId;      // anyone\n    protected String env;      // subclasses + package\n    private String apiKey;     // only this class\n\n    public void run() { }\n    protected void setup() { }\n    private void loadKey() { }\n\n    // Package-private (no keyword):\n    String internalName;\n}",
            "typescript": "// TypeScript access modifiers — same keywords!\nclass BankTest {\n    public testId: string;     // anyone (default)\n    protected env: string;     // subclasses only\n    private apiKey: string;    // only this class\n    // No \"package-private\" in TypeScript\n\n    public run(): void { }\n    protected setup(): void { }\n    private loadKey(): void { }\n}\n\n// Constructor shorthand applies here too:\nclass ApiTest {\n    constructor(\n        public name: string,\n        private apiKey: string,\n        protected env: string = \"staging\"\n    ) {}\n}",
            "note": {
              "en": "TypeScript derleme zamanında private/protected'ı zorlar (Java gibi). Python'un aksine bu gerçek bir kısıtlamadır. \"package-private\" yok — modüllerde internal için \"export\" kullanılmaz.",
              "tr": "TypeScript derleme zamanında private/protected'ı zorlar (Java gibi). \"package-private\" yok."
            },
            "why_en": "TypeScript access modifiers use the exact same keywords as Java: public, private, protected. Unlike Java there is no \"package-private\". And good news: unlike Python, TypeScript actually enforces this at compile time!",
            "note_en": "TypeScript enforces private/protected at compile time (like Java). Unlike Python, this is a real constraint. No \"package-private\" — for internal module use, simply don't export."
          },
          {
            "type": "heading",
            "text": {
              "en": "5. Generics — Very Similar to Java Generics",
              "tr": "5. Generics — Java Generics'e Çok Benzer"
            }
          },
          {
            "type": "java-compare",
            "topic": "Generics <T>",
            "why": {
              "en": "TypeScript generic'leri Java generic'leri ile neredeyse aynı sözdizimini kullanır. <T>, kısıtlar (extends), ve tip parametresi tümü tanıdık gelecek.",
              "tr": "TypeScript generic'leri Java generic'leri ile neredeyse aynı sözdizimini kullanır. <T>, kısıtlar (extends) tümü tanıdık."
            },
            "java": "// Java Generics\npublic class ApiResponse<T> {\n    private T data;\n    private boolean success;\n    public T getData() { return data; }\n}\n\n// With bounds:\npublic <T extends Comparable<T>> T max(T a, T b) {\n    return a.compareTo(b) > 0 ? a : b;\n}\n\n// Usage:\nApiResponse<User> resp = service.getUser(1);\nUser user = resp.getData();",
            "typescript": "// TypeScript Generics — very similar!\ninterface ApiResponse<T> {\n    data: T;\n    success: boolean;\n}\n\n// With bounds (extends):\nfunction max<T extends { id: number }>(a: T, b: T): T {\n    return a.id > b.id ? a : b;\n}\n\n// Usage:\nconst resp: ApiResponse<User> = await api.getUser(1);\nconst user = resp.data;  // TypeScript knows: User\n\n// Playwright uses generics everywhere:\nasync function getData<T>(url: string): Promise<T> {\n    const res = await fetch(url);\n    return res.json() as T;\n}",
            "note": {
              "en": "TypeScript generics aynı <T> sözdizimini kullanır. \"T extends X\" = Java \"T extends X\". TypeScript ayrıca union types ve mapped types gibi Java'da olmayan güçlü özellikler ekler.",
              "tr": "TypeScript aynı <T> sözdizimini kullanır. TypeScript ayrıca Java'da olmayan union types ve mapped types gibi güçlü özellikler ekler."
            },
            "why_en": "TypeScript generics use nearly identical syntax to Java generics. <T>, constraints (extends), and type parameters will all feel familiar.",
            "note_en": "TypeScript generics use the same <T> syntax. \"T extends X\" = Java \"T extends X\". TypeScript also adds powerful features Java lacks, like union types and mapped types."
          },
          {
            "type": "heading",
            "text": {
              "en": "6. Enum — Similar to Java But Different Variants",
              "tr": "6. Enum — Java'ya Benzer Ama Farklı Çeşitleri Var"
            }
          },
          {
            "type": "java-compare",
            "topic": "enum",
            "why": {
              "en": "Java enum'ları tam teşekküllü sınıflardır. TypeScript'te numeric enum (Java'ya benzer) ve string enum var. QA'da genellikle string enum tercih edilir çünkü log'larda okunabilir değerler üretir.",
              "tr": "Java enum'ları tam teşekküllü sınıflardır. TypeScript'te numeric ve string enum var. QA'da genellikle string enum tercih edilir çünkü log'larda okunabilir değerler üretir."
            },
            "java": "// Java enum (full-featured class)\npublic enum TestStatus {\n    PASS(\"✅\"), FAIL(\"❌\"), SKIP(\"⏭️\");\n\n    private final String icon;\n    TestStatus(String icon) { this.icon = icon; }\n    public String getIcon() { return icon; }\n}\n\nTestStatus status = TestStatus.PASS;\nstatus.getIcon();  // \"✅\"\nstatus.name();     // \"PASS\"",
            "typescript": "// TypeScript: two enum styles + union type\n\n// 1. String enum (most similar to Java):\nenum TestStatus {\n    PASS = \"PASS\",    // log'da görünür değer\n    FAIL = \"FAIL\",\n    SKIP = \"SKIP\"\n}\nTestStatus.PASS // === \"PASS\"\n\n// 2. Numeric enum (Java numeric enum gibi):\nenum Priority { LOW, MEDIUM, HIGH }  // 0, 1, 2\n\n// 3. Union type (TypeScript idiomu — daha yaygın):\ntype Status = \"PASS\" | \"FAIL\" | \"SKIP\";\n// No enum import needed! Compiler checks all cases.",
            "note": {
              "en": "Java enum = TypeScript string enum. Ama TypeScript'te union type (type Status = \"PASS\" | \"FAIL\") daha kısa ve tree-shakeable. QA'de string enum kullan — log'larda \"PASS\" görünür, 0 değil.",
              "tr": "Java enum = TypeScript string enum. Ama TypeScript'te union type (type Status = \"PASS\" | \"FAIL\") daha kısa ve tree-shakeable. QA'de string enum kullan."
            },
            "why_en": "Java enums are full-featured classes. TypeScript has numeric enums (similar to Java) and string enums. In QA, string enums are preferred because they produce readable values in logs.",
            "note_en": "Java enum = TypeScript string enum. But TypeScript's union type (type Status = \"PASS\" | \"FAIL\") is shorter and tree-shakeable. Use string enums in QA — logs show \"PASS\" not 0."
          },
          {
            "type": "heading",
            "text": {
              "en": "7. Null Safety — Optional → Optional Chaining",
              "tr": "7. Null Safety — Optional → Optional Chaining"
            }
          },
          {
            "type": "java-compare",
            "topic": "null safety & Optional chaining",
            "why": {
              "en": "Java'da null NullPointerException'a yol açar. TypeScript'te de aynı risk var ama optional chaining (?.) ile çok daha kısa ve temiz handle edilir. Java Optional'ın tüm gücü tek bir operatörde.",
              "tr": "Java'da null NullPointerException'a yol açar. TypeScript'te de aynı risk var ama optional chaining (?.) ile çok daha kısa handle edilir."
            },
            "java": "// Java null — NPE risk\nString name = user.getName();  // NPE if user is null!\n\n// Java 8+ Optional (verbose):\nOptional.ofNullable(user)\n    .map(u -> u.getAddress())\n    .map(a -> a.getCity())\n    .orElse(\"Unknown\");\n\n// Or null check (long form):\nif (user != null && user.getAddress() != null) {\n    city = user.getAddress().getCity();\n}",
            "typescript": "// TypeScript: optional chaining ?. (much cleaner!)\nconst name = user?.getName(); // undefined if user is null\nconst city = user?.address?.city ?? \"Unknown\";\n// No NPE! Returns undefined instead of crashing.\n\n// ?? = nullish coalescing (null/undefined → default)\n// Like Java's orElse() built into the language\n\n// TypeScript strict null checks (tsconfig.json):\n// \"strictNullChecks\": true\nfunction greet(user: User | null): string {\n    if (user === null) return \"Guest\"; // must handle null\n    return user.getName(); // TypeScript: definitely not null\n}",
            "note": {
              "en": "\"?.\" = Java Optional.map(). \"??\" = Java .orElse(). tsconfig'da \"strictNullChecks: true\" aç — Java'nın null-safety derleme zamanı kontrolü gibi çalışır.",
              "tr": "\"?.\" = Java Optional.map(). \"??\" = Java .orElse(). tsconfig'da \"strictNullChecks: true\" aç — Java'nın null-safety derleme zamanı kontrolü gibi çalışır."
            },
            "why_en": "In Java, null causes NullPointerException. TypeScript has the same risk but optional chaining (?.) handles it much more concisely. All the power of Java Optional in a single operator.",
            "note_en": "\"?.\" = Java Optional.map(). \"??\" = Java .orElse(). Enable \"strictNullChecks: true\" in tsconfig — it works like Java's compile-time null-safety control."
          },
          {
            "type": "heading",
            "text": {
              "en": "8. Union Types — No Java Equivalent",
              "tr": "8. Union Types — Java'da Karşılığı Yok"
            }
          },
          {
            "type": "java-compare",
            "topic": "union types (no Java equivalent!)",
            "why": {
              "en": "TypeScript'in Java'ya göre en güçlü özelliklerinden biri. Bir değişkenin birden fazla tip tutabilmesini tip güvenli şekilde ifade eder. Java'da bunu Object veya abstract class ile yapmak zorunda kalırsın.",
              "tr": "TypeScript'in Java'ya göre en güçlü özelliklerinden biri. Bir değişkenin birden fazla tip tutabilmesini tip güvenli şekilde ifade eder."
            },
            "java": "// Java: no union types\n// Must use Object (loses type safety):\nvoid handle(Object result) {\n    if (result instanceof String s) {\n        // string logic\n    } else if (result instanceof Integer i) {\n        // int logic\n    }\n    // No compile-time guarantee all cases handled\n}\n\n// Sealed classes (Java 17+) are closest:\nsealed interface Result permits Ok, Err {}\nrecord Ok(String data) implements Result {}\nrecord Err(String msg) implements Result {}",
            "typescript": "// TypeScript union types — elegant!\ntype ApiResult =\n    | { status: \"ok\";    data: string  }\n    | { status: \"error\"; message: string };\n\nfunction handle(result: ApiResult) {\n    if (result.status === \"ok\") {\n        console.log(result.data);    // TS knows: has 'data'\n    } else {\n        console.log(result.message); // TS knows: has 'message'\n    }\n    // TypeScript ensures ALL cases are covered!\n}\n\n// Simple union (very common):\nfunction log(level: \"info\" | \"warn\" | \"error\"): void { ... }\nlet id: string | number = getIdFromApi();",
            "note": {
              "en": "\"Discriminated union\" (status field ile) = Java sealed classes, ama çok daha kısa. TypeScript switch/if ile tüm case'lerin ele alındığını derleme zamanında kontrol eder.",
              "tr": "\"Discriminated union\" = Java sealed classes, ama çok daha kısa. TypeScript tüm case'lerin ele alındığını derleme zamanında kontrol eder."
            },
            "why_en": "One of TypeScript's most powerful features compared to Java. Expresses in a type-safe way that a variable can hold more than one type. In Java you'd have to use Object or an abstract class.",
            "note_en": "\"Discriminated union\" (using a status field) = Java sealed classes, but much shorter. TypeScript verifies at compile time that all cases are handled in switch/if."
          },
          {
            "type": "heading",
            "text": {
              "en": "9. Async/Await — CompletableFuture → Promise",
              "tr": "9. Async/Await — CompletableFuture → Promise"
            }
          },
          {
            "type": "java-compare",
            "topic": "async/await & Promise",
            "why": {
              "en": "TypeScript (ve JavaScript) ağ, dosya işlemleri için async/await kullanır. Java'da CompletableFuture karşılığıdır. TypeScript versiyonu çok daha temizdir. Playwright tamamen async-first'tir — her sayfa işlemi await gerektirir.",
              "tr": "TypeScript ağ/dosya işlemleri için async/await kullanır. Java'da CompletableFuture karşılığıdır. Playwright tamamen async-first'tir — her sayfa işlemi await gerektirir."
            },
            "java": "// Java CompletableFuture (verbose)\nCompletableFuture<Response> future =\n    httpClient.getAsync(url);\n\nfuture.thenApply(response -> processResponse(response))\n      .thenAccept(result -> System.out.println(result))\n      .exceptionally(e -> {\n          System.err.println(\"Error: \" + e);\n          return null;\n      });",
            "typescript": "// TypeScript async/await (clean!)\nasync function fetchTests(url: string): Promise<Test[]> {\n    try {\n        const response = await fetch(url);   // waits\n        const data = await response.json();  // waits\n        return data as Test[];\n    } catch (error) {\n        console.error(\"Error:\", error);\n        throw error;  // re-throw\n    }\n}\n\n// Playwright — all async:\ntest(\"login works\", async ({ page }) => {\n    await page.goto(\"https://example.com/login\");\n    await page.fill(\"#email\", \"user@test.com\");\n    await page.click(\"#submit\");\n    await expect(page).toHaveURL(\"/dashboard\");\n});",
            "note": {
              "en": "\"await\" = .get() on CompletableFuture (blocker until done). \"async function\" = CompletableFuture<T>. Playwright, Axios, fetch API tümü async-first. \"await\" olmadan Promise objesi alırsın, sonuç değil!",
              "tr": "\"await\" = .get() on CompletableFuture. \"async function\" = CompletableFuture<T>. Playwright, fetch API tümü async-first. \"await\" olmadan Promise objesi alırsın!"
            },
            "why_en": "TypeScript (and JavaScript) uses async/await for network and file operations. The Java equivalent is CompletableFuture. The TypeScript version is much cleaner. Playwright is entirely async-first — every page operation requires await.",
            "note_en": "\"await\" = .get() on CompletableFuture (blocks until done). \"async function\" returns Promise<T>. Playwright, Axios, and fetch API are all async-first. Without \"await\" you get a Promise object, not the result!"
          },
          {
            "type": "heading",
            "text": {
              "en": "Quick Comparison Table",
              "tr": "Hızlı Karşılaştırma Tablosu"
            }
          },
          {
            "type": "table",
            "headers": [
              {
                "en": "Concept",
                "tr": "Kavram"
              },
              {
                "en": "Java",
                "tr": "Java"
              },
              {
                "en": "TypeScript",
                "tr": "TypeScript"
              },
              {
                "en": "Similarity",
                "tr": "Benzerlik"
              }
            ],
            "rows": [
              [
                {
                  "en": "Numeric types",
                  "tr": "Sayısal tipler"
                },
                {
                  "en": "int, long, double",
                  "tr": "int, long, double"
                },
                {
                  "en": "number",
                  "tr": "number"
                },
                {
                  "en": "⚠️ all one 'number' type",
                  "tr": "⚠️ hepsi tek 'number'"
                }
              ],
              [
                {
                  "en": "Text type",
                  "tr": "Metin tipi"
                },
                {
                  "en": "String (capital S)",
                  "tr": "String (büyük S)"
                },
                {
                  "en": "string (lowercase s)",
                  "tr": "string (küçük s)"
                },
                {
                  "en": "⚠️ lowercase!",
                  "tr": "⚠️ küçük harf!"
                }
              ],
              [
                {
                  "en": "Boolean",
                  "tr": "Boolean"
                },
                {
                  "en": "boolean",
                  "tr": "boolean"
                },
                {
                  "en": "boolean",
                  "tr": "boolean"
                },
                {
                  "en": "✅ identical",
                  "tr": "✅ aynı"
                }
              ],
              [
                {
                  "en": "Class",
                  "tr": "Class"
                },
                {
                  "en": "class Foo { }",
                  "tr": "class Foo { }"
                },
                {
                  "en": "class Foo { }",
                  "tr": "class Foo { }"
                },
                {
                  "en": "✅ nearly identical",
                  "tr": "✅ neredeyse aynı"
                }
              ],
              [
                {
                  "en": "Constructor",
                  "tr": "Constructor"
                },
                {
                  "en": "public Foo(args)",
                  "tr": "public Foo(args)"
                },
                {
                  "en": "constructor(args)",
                  "tr": "constructor(args)"
                },
                {
                  "en": "⚠️ different keyword",
                  "tr": "⚠️ farklı anahtar kelime"
                }
              ],
              [
                {
                  "en": "Interface",
                  "tr": "Interface"
                },
                {
                  "en": "interface I { }",
                  "tr": "interface I { }"
                },
                {
                  "en": "interface I { }",
                  "tr": "interface I { }"
                },
                {
                  "en": "⚠️ structural vs nominal",
                  "tr": "⚠️ structural vs nominal"
                }
              ],
              [
                {
                  "en": "Implements",
                  "tr": "Implements"
                },
                {
                  "en": "implements I",
                  "tr": "implements I"
                },
                {
                  "en": "implements I",
                  "tr": "implements I"
                },
                {
                  "en": "✅ same keyword",
                  "tr": "✅ aynı keyword"
                }
              ],
              [
                {
                  "en": "Extends",
                  "tr": "Extends"
                },
                {
                  "en": "extends Base",
                  "tr": "extends Base"
                },
                {
                  "en": "extends Base",
                  "tr": "extends Base"
                },
                {
                  "en": "✅ same keyword",
                  "tr": "✅ aynı keyword"
                }
              ],
              [
                {
                  "en": "Access modifier",
                  "tr": "Erişim modifier"
                },
                {
                  "en": "public/private/protected",
                  "tr": "public/private/protected"
                },
                {
                  "en": "public/private/protected",
                  "tr": "public/private/protected"
                },
                {
                  "en": "✅ same!",
                  "tr": "✅ aynı!"
                }
              ],
              [
                {
                  "en": "Final field",
                  "tr": "Final field"
                },
                {
                  "en": "final int x",
                  "tr": "final int x"
                },
                {
                  "en": "readonly x: number",
                  "tr": "readonly x: number"
                },
                {
                  "en": "⚠️ 'readonly' not 'final'",
                  "tr": "⚠️ 'readonly' değil 'final'"
                }
              ],
              [
                {
                  "en": "Static",
                  "tr": "Static"
                },
                {
                  "en": "static void foo()",
                  "tr": "static void foo()"
                },
                {
                  "en": "static foo(): void",
                  "tr": "static foo(): void"
                },
                {
                  "en": "✅ same concept",
                  "tr": "✅ aynı kavram"
                }
              ],
              [
                {
                  "en": "Generics",
                  "tr": "Generics"
                },
                {
                  "en": "class Box<T>",
                  "tr": "class Box<T>"
                },
                {
                  "en": "class Box<T>",
                  "tr": "class Box<T>"
                },
                {
                  "en": "✅ same syntax",
                  "tr": "✅ aynı sözdizim"
                }
              ],
              [
                {
                  "en": "Enum",
                  "tr": "Enum"
                },
                {
                  "en": "enum Status { A, B }",
                  "tr": "enum Status { A, B }"
                },
                {
                  "en": "enum Status { A = 'A' }",
                  "tr": "enum Status { A = 'A' }"
                },
                {
                  "en": "⚠️ string value required",
                  "tr": "⚠️ string değer gerekli"
                }
              ],
              [
                {
                  "en": "Null",
                  "tr": "Null"
                },
                {
                  "en": "null",
                  "tr": "null"
                },
                {
                  "en": "null / undefined",
                  "tr": "null / undefined"
                },
                {
                  "en": "⚠️ TS has both null and undefined",
                  "tr": "⚠️ TS'de hem null hem undefined"
                }
              ],
              [
                {
                  "en": "Optional",
                  "tr": "Optional"
                },
                {
                  "en": "Optional.ofNullable()",
                  "tr": "Optional.ofNullable()"
                },
                {
                  "en": "value?.property",
                  "tr": "value?.property"
                },
                {
                  "en": "✅ much shorter ?.",
                  "tr": "✅ çok daha kısa ?."
                }
              ],
              [
                {
                  "en": "Async",
                  "tr": "Async"
                },
                {
                  "en": "CompletableFuture<T>",
                  "tr": "CompletableFuture<T>"
                },
                {
                  "en": "Promise<T>",
                  "tr": "Promise<T>"
                },
                {
                  "en": "✅ same concept, clean syntax",
                  "tr": "✅ aynı kavram, temiz sözdizim"
                }
              ],
              [
                {
                  "en": "Checked exceptions",
                  "tr": "Checked exceptions"
                },
                {
                  "en": "throws IOException",
                  "tr": "throws IOException"
                },
                {
                  "en": "(none)",
                  "tr": "(yok)"
                },
                {
                  "en": "✅ no checked exceptions in TS",
                  "tr": "✅ TS'de checked exception yok"
                }
              ],
              [
                {
                  "en": "Union type",
                  "tr": "Union type"
                },
                {
                  "en": "(none — Object/sealed)",
                  "tr": "(yok — Object/sealed)"
                },
                {
                  "en": "string | number",
                  "tr": "string | number"
                },
                {
                  "en": "🆕 TypeScript exclusive",
                  "tr": "🆕 TypeScript'e özgü"
                }
              ]
            ]
          },
          {
            "type": "glossary-section",
            "terms": [
              {
                "term": "any",
                "definition": {
                  "tr": "TypeScript tip kontrolunu tamamen devre disi birakan tip. Kullanmaktan kacinin — unknown kullanin.",
                  "en": "A TypeScript type that completely disables type checking. Avoid — use unknown instead."
                }
              },
              {
                "term": "async/await",
                "definition": {
                  "tr": "Promise tabanlı asenkron kodu yazmanin temiz yolu. Playwright de her sayfa islemi await gerektirir.",
                  "en": "The clean way to write Promise-based async code. Every Playwright page operation requires await."
                }
              },
              {
                "term": "enum",
                "definition": {
                  "tr": "Adlandirilmis sabitler kumesi. Test otomasyonunda string enum tercih edilir (loglarda okunabilir deger uretir).",
                  "en": "A named set of constants. In test automation, string enums are preferred (produce readable values in logs)."
                }
              },
              {
                "term": "fixture",
                "definition": {
                  "tr": "Playwright de test.extend ile tanimlanan, testlere injection edilen yeniden kullanilabilir kurulum/yikim birimi.",
                  "en": "A reusable setup/teardown unit defined with test.extend in Playwright and injected into tests."
                }
              },
              {
                "term": "generic",
                "definition": {
                  "tr": "<T> sozdizimi ile yazilan tip parametresi. Herhangi bir tipte calisan ve o tipin bilgisini koruyan yeniden kullanilabilir kod saglar.",
                  "en": "A type parameter written as <T>. Enables reusable code that works with any type while preserving type information."
                }
              },
              {
                "term": "interface",
                "definition": {
                  "tr": "Bir nesnenin sekil sozlesmesini tanimlayan TypeScript yapisali. Java interface den farkli olarak yapisal tipleme kullanir.",
                  "en": "A TypeScript construct that defines the shape contract of an object. Unlike Java interfaces, uses structural typing."
                }
              },
              {
                "term": "Locator",
                "definition": {
                  "tr": "Playwright de bir UI elementini secen nesne. page.locator(\"CSS veya XPath\") ile olusturulur.",
                  "en": "A Playwright object that selects a UI element. Created with page.locator(\"CSS or XPath\")."
                }
              },
              {
                "term": "null / undefined",
                "definition": {
                  "tr": "TypeScript de iki farkli bos deger turu vardir. null = kasitli bos, undefined = hic atanmamis. Java nin null tan farkli olarak ikisi de ayri turlerdir.",
                  "en": "TypeScript has two empty value types. null = intentionally empty, undefined = never assigned. Unlike Java null, both are distinct types."
                }
              },
              {
                "term": "optional chaining (?.)",
                "definition": {
                  "tr": "Zincirdeki her nesnenin null/undefined olup olmadigini kontrol ederek null reference hatalarini onler. Java Optional.map() e esdegerdir.",
                  "en": "Checks each object in a chain for null/undefined, preventing null reference errors. Equivalent to Java Optional.map()."
                }
              },
              {
                "term": "Page Object Model (POM)",
                "definition": {
                  "tr": "Her sayfanin ayri bir TypeScript sinifi olarak temsil edildigi tasarim deseni. Selector lari ve aksiyonlari testlerden ayirir.",
                  "en": "A design pattern where each page is represented as a TypeScript class. Separates selectors and actions from tests."
                }
              },
              {
                "term": "Promise",
                "definition": {
                  "tr": "Gelecekte tamamlanacak asenkron islemleri temsil eden nesne. Java CompletableFuture e esdegerdir.",
                  "en": "An object representing an async operation that will complete in the future. Equivalent to Java CompletableFuture."
                }
              },
              {
                "term": "readonly",
                "definition": {
                  "tr": "Atandiktan sonra degistirilemeyen alan veya degiskeni isaretler. Java final a esdegerdir.",
                  "en": "Marks a field or variable that cannot be changed after assignment. Equivalent to Java final."
                }
              },
              {
                "term": "structural typing",
                "definition": {
                  "tr": "TypeScript tip sisteminin temeli: bir nesnenin tipini adi degil sekli (ozellikleri ve metodlari) belirler. Java nominal tiplemenin karsitidir.",
                  "en": "The foundation of TypeScript's type system: an object's type is determined by its shape (properties and methods), not its name. Opposite of Java's nominal typing."
                }
              },
              {
                "term": "tsconfig.json",
                "definition": {
                  "tr": "TypeScript derleyicisine projeyi nasil derleyecegini soyleyen yapilandirma dosyasi. strict, target, module gibi ayarlari icerir.",
                  "en": "The configuration file that tells the TypeScript compiler how to build the project. Contains settings like strict, target, module."
                }
              },
              {
                "term": "type alias",
                "definition": {
                  "tr": "type keyword u ile tanimlanan tip kisayolu. Union tipler, tuple lar ve primitive tipler icin interface den daha ifadeseldir.",
                  "en": "A type shortcut defined with the type keyword. More expressive than interface for union types, tuples, and primitive types."
                }
              },
              {
                "term": "type guard",
                "definition": {
                  "tr": "Typeof, instanceof veya in operatorleri ile bir union tipin belirli bir kolunu dogrulayan kontrol. TypeScript in o kolda ne oldugunu bilmesini saglar.",
                  "en": "A check using typeof, instanceof, or in operators to verify a specific branch of a union type. Lets TypeScript know what is in that branch."
                }
              },
              {
                "term": "union type (A | B)",
                "definition": {
                  "tr": "Bir degerin birden fazla tipten biri olabilecegini ifade eder. Java sealed classes a benzer ama cok daha kisadir.",
                  "en": "Expresses that a value can be one of multiple types. Similar to Java sealed classes but much more concise."
                }
              },
              {
                "term": "unknown",
                "definition": {
                  "tr": "any nin daha guvenli alternatifi. Kullanmadan once tip daralttirmasi (type narrowing) yapmak zorundasinizdir.",
                  "en": "A safer alternative to any. You must perform type narrowing before using it."
                }
              }
            ]
          },
          {
            "type": "quiz",
            "question": {
              "en": "What is the most important difference between an interface in Java and an interface in TypeScript?",
              "tr": "Java'daki interface ile TypeScript'teki interface arasındaki en önemli fark nedir?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "TypeScript interfaces cannot contain methods",
                  "tr": "TypeScript interface'leri metot içeremez"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "TypeScript uses structural typing — an object can satisfy an interface just by having the right shape, without explicitly declaring 'implements'; Java's nominal typing requires explicit 'implements'",
                  "tr": "TypeScript yapısal tipleme kullanır — bir obje açıkça 'implements' demeden, sadece şekli uyuyorsa o interface'e atanabilir; Java nominal tiplemede açık 'implements' ister"
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "TypeScript interfaces can only be used once",
                  "tr": "TypeScript interface'leri sadece bir kez kullanılabilir"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "Java interfaces support generics, TypeScript does not",
                  "tr": "Java interface'leri generic destekler, TypeScript desteklemez"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "en": "Java relies on nominal typing: a class must explicitly write `implements InterfaceName` to satisfy an interface. TypeScript relies on structural typing: an object can be assigned to an interface type as long as it has all the required properties/methods — the compiler only checks the shape, with no `implements` declaration needed at all. This makes TypeScript more flexible than Java when building mock objects or reconciling types across different libraries.",
              "tr": "Java nominal tiplemeye dayanır: bir sınıfın bir interface'i karşıladığını söylemek için açıkça `implements InterfaceName` yazman gerekir. TypeScript ise yapısal tiplemeye dayanır: bir obje, interface'in beklediği tüm property/metodlara sahipse, hiçbir `implements` bildirimi olmadan o interface tipine atanabilir — derleyici sadece şekle bakar. Bu, TypeScript'i mock obje oluşturmada ve farklı kütüphanelerin tiplerini birbirine uydurmada Java'dan daha esnek yapar."
            },
            "retryQuestion": {
              "question": {
                "en": "In a test, you pass a plain object literal `{ log: (msg) => console.log(msg) }` to a function expecting an `interface Logger { log(msg: string): void }` parameter, with no `implements Logger` anywhere. What does TypeScript do?",
                "tr": "Bir testte `interface Logger { log(msg: string): void }` tipinde bir parametre bekleyen bir fonksiyona, `{ log: (msg) => console.log(msg) }` şeklinde sade bir obje literal'i geçiriyorsun, hiç `implements Logger` yazmadan. TypeScript ne yapar?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "It throws a compile error because no class explicitly said implements Logger",
                    "tr": "Derleme hatası verir, çünkü hiçbir sınıf açıkça implements Logger demedi"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "It accepts it — the object has the shape Logger expects (a log method), so it's valid",
                    "tr": "Kabul eder — obje, Logger'ın beklediği şekle (bir log metodu) sahip olduğu için geçerlidir"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "It runs at runtime but warns at compile time",
                    "tr": "Runtime'da çalışır ama derleme zamanında uyarı verir"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "Only class instances are accepted as interface parameters",
                    "tr": "Sadece class instance'ları interface parametresi olarak kabul edilir"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "en": "This is structural typing in action: the object literal is accepted with no `implements` declaration needed at all, simply because it has the shape Logger requires (a `log(msg: string): void` method). This makes it easy to mock/stub in tests using plain object literals instead of creating a real logger class — Java would always require an actual class (or anonymous class) that implements the interface for this.",
                "tr": "Bu, yapısal tiplemenin (structural typing) tam tanımıdır: obje literal'i Logger interface'inin gerektirdiği şekle (bir `log(msg: string): void` metodu) sahip olduğu için, hiçbir `implements` bildirimine ihtiyaç olmadan kabul edilir. Bu, testlerde gerçek bir logger sınıfı oluşturmadan basit obje literal'leriyle mock/stub yapmayı kolaylaştırır — Java'da bunun için her zaman interface'i implement eden gerçek bir sınıf (veya anonim sınıf) gerekirdi."
              }
            }
          }
        ]
      },
      {
        "title": {
          "en": "Test Runners — Vitest & Unit Testing",
          "tr": "Test Runner'lar — Vitest & Unit Test"
        },
        "blocks": [
          {
            "type": "simple-box",
            "emoji": "🏃",
            "content": {
              "tr": "Vitest, bir öğretmenin tüm öğrenci ödevlerini hızlıca tek tek kontrol edip yanına ✅ veya ❌ yazması gibidir. Her test dosyası bir ödev kağıdıdır; Vitest hepsini saniyeler içinde tarar ve hangisinin doğru hangisinin yanlış olduğunu renkli olarak gösterir.",
              "en": "Vitest is like a teacher quickly checking every student's homework and marking it ✅ or ❌. Each test file is a homework sheet; Vitest scans them all in seconds and shows, in color, which ones are right and which are wrong."
            }
          },
          {
            "type": "heading",
            "content": {
              "en": "Vitest: The Vite-Native Test Runner",
              "tr": "Vitest: Vite-Native Test Runner"
            }
          },
          {
            "type": "text",
            "content": {
              "en": "Playwright Test already ships its own test runner for end-to-end browser tests — you don't need Vitest for that. But the moment you write a plain TypeScript helper function (a price formatter, a data parser, a custom wait utility), you want to unit test that function in isolation, without spinning up a browser. That's where Vitest comes in: a fast, Jest-compatible test runner built on top of Vite, with zero-config TypeScript support. Jest is the older, more established alternative — same API shape (describe, it, expect), slower startup, and requires ts-jest to understand TypeScript out of the box.",
              "tr": "Playwright Test zaten kendi test runner'ı ile geliyor — uçtan uca tarayıcı testleri için Vitest'e ihtiyacın yok. Ama düz bir TypeScript yardımcı fonksiyonu yazdığın an (bir fiyat formatlayıcı, bir veri parser'ı, özel bir wait utility'si), o fonksiyonu tarayıcı açmadan, izole şekilde unit test etmek istersin. İşte burada Vitest devreye girer: Vite üzerine kurulu, hızlı, Jest-uyumlu bir test runner — sıfır konfigürasyonla TypeScript desteği sunar. Jest ise daha eski, daha köklü alternatiftir — aynı API şekli (describe, it, expect), daha yavaş başlangıç, ve TypeScript'i anlaması için ts-jest gerektirir."
            }
          },
          {
            "type": "code",
            "language": "typescript",
            "code": "// utils/formatPrice.ts — a plain helper, no browser needed\nexport function formatPrice(cents: number): string {\n  if (cents < 0) throw new Error('Price cannot be negative');\n  return `$${(cents / 100).toFixed(2)}`;\n}\n\n// utils/formatPrice.test.ts — Vitest unit test\nimport { describe, it, expect } from 'vitest';\nimport { formatPrice } from './formatPrice';\n\ndescribe('formatPrice', () => {\n  it('formats whole dollars', () => {\n    expect(formatPrice(1000)).toBe('$10.00');\n  });\n\n  it('formats cents correctly', () => {\n    expect(formatPrice(99)).toBe('$0.99');\n  });\n\n  it('throws on negative input', () => {\n    expect(() => formatPrice(-50)).toThrow('Price cannot be negative');\n  });\n});\n\n// Run it:\n// npx vitest run"
          },
          {
            "type": "simulation",
            "icon": "🏃",
            "color": "#729b1e",
            "title": {
              "en": "Vitest — Live Unit Test Run",
              "tr": "Vitest — Canlı Unit Test Çalıştırma"
            },
            "scenario": "vitest-runner",
            "description": {
              "en": "Click \"▶ npx vitest run\": watch Vitest collect the test file, execute every \"it()\" block, and report a pass/fail summary plus a coverage report — the same flow your terminal shows in a real project.",
              "tr": "\"▶ npx vitest run\" butonuna bas: Vitest'in test dosyasını topladığını, her \"it()\" bloğunu çalıştırdığını ve bir pass/fail özeti ile coverage raporu verdiğini izle — gerçek bir projede terminalinde gördüğün akışın birebir aynısı."
            },
            "code": "// vitest.config.ts\nimport { defineConfig } from 'vitest/config';\n\nexport default defineConfig({\n  test: {\n    environment: 'node',\n    coverage: { reporter: ['text', 'html'] },\n  },\n});\n\n// package.json\n// \"scripts\": { \"test:unit\": \"vitest run --coverage\" }"
          },
          {
            "type": "java-compare",
            "topic": "Unit Test Runner: JUnit vs Vitest",
            "why": {
              "en": "JUnit is the standard unit test runner in Java, almost always paired with Maven Surefire to produce CI reports. Vitest plays the exact same role for plain TypeScript functions — fast, isolated, no browser needed.",
              "tr": "Java'da JUnit standart unit test runner'ıdır, neredeyse her zaman CI raporları üretmek için Maven Surefire ile birlikte kullanılır. Vitest, düz TypeScript fonksiyonları için tam olarak aynı rolü oynar — hızlı, izole, tarayıcı gerekmez."
            },
            "why_en": "JUnit is the standard unit test runner in Java, almost always paired with Maven Surefire to produce CI reports. Vitest plays the exact same role for plain TypeScript functions — fast, isolated, no browser needed.",
            "java": "// Java — JUnit 5\nimport org.junit.jupiter.api.Test;\nimport static org.junit.jupiter.api.Assertions.*;\n\nclass FormatPriceTest {\n    @Test\n    void formatsWholeDollars() {\n        assertEquals(\"$10.00\", PriceUtil.format(1000));\n    }\n\n    @Test\n    void throwsOnNegativeInput() {\n        assertThrows(IllegalArgumentException.class,\n            () -> PriceUtil.format(-50));\n    }\n}\n\n// mvn test → target/surefire-reports/*.xml",
            "typescript": "// TypeScript — Vitest\nimport { describe, it, expect } from 'vitest';\nimport { formatPrice } from './formatPrice';\n\ndescribe('formatPrice', () => {\n  it('formats whole dollars', () => {\n    expect(formatPrice(1000)).toBe('$10.00');\n  });\n\n  it('throws on negative input', () => {\n    expect(() => formatPrice(-50)).toThrow();\n  });\n});\n\n// npx vitest run --coverage → coverage/index.html",
            "note": {
              "en": "The @Test annotation in Java maps almost 1-to-1 to Vitest's it()/test() — both isolate one behavior per function, both fail loudly with a stack trace, and both plug into CI as a separate step from your end-to-end (Playwright/Selenium) suite.",
              "tr": "Java'daki @Test anotasyonu, Vitest'in it()/test() fonksiyonuna neredeyse birebir karşılık gelir — ikisi de fonksiyon başına tek bir davranışı izole eder, ikisi de stack trace ile gürültülü şekilde başarısız olur, ve ikisi de CI'da uçtan uca (Playwright/Selenium) paketinden ayrı bir adım olarak çalışır."
            },
            "note_en": "The @Test annotation in Java maps almost 1-to-1 to Vitest's it()/test() — both isolate one behavior per function, both fail loudly with a stack trace, and both plug into CI as a separate step from your end-to-end (Playwright/Selenium) suite."
          },
          {
            "type": "quiz",
            "question": {
              "en": "Given that Playwright Test already has its own test runner, when does a QA automation project actually need Vitest?",
              "tr": "Playwright Test zaten kendi test runner'ına sahipken, bir QA otomasyon projesinde Vitest'e ne zaman ihtiyaç duyulur?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "To make Playwright tests run faster",
                  "tr": "Playwright testlerini daha hızlı çalıştırmak için"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "To unit test a plain TypeScript helper function (a formatter, parser, util) in isolation, without opening a browser",
                  "tr": "Tarayıcı açmadan, düz bir TypeScript yardımcı fonksiyonunu (formatter, parser, util) izole şekilde unit test etmek için"
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "To run tests in browsers Playwright does not support at all",
                  "tr": "Playwright'ın hiç desteklemediği tarayıcılarda test çalıştırmak için"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "To eliminate the need for a CI/CD pipeline",
                  "tr": "CI/CD pipeline'ına ihtiyacı ortadan kaldırmak için"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "en": "Playwright Test is already sufficient for end-to-end browser tests — Vitest is not needed there. But the moment you write a plain TypeScript function like a price formatter or data parser, you want to test it fast and in isolation, without spinning up a browser — the same logic as JUnit unit-testing a service class in Java without touching Selenium at all. Vitest fills that role in the TypeScript world.",
              "tr": "Playwright Test, uçtan uca tarayıcı testleri için zaten yeterlidir — Vitest'e gerek yoktur. Ama bir fiyat formatlayıcı veya veri parser'ı gibi düz bir TypeScript fonksiyonu yazdığında, o fonksiyonu tarayıcı açmadan, hızlı ve izole şekilde test etmek istersin — Java'da JUnit'in bir servis sınıfını Selenium'a hiç dokunmadan unit test etmesiyle aynı mantık. Vitest bu rolü TypeScript dünyasında üstlenir."
            },
            "retryQuestion": {
              "question": {
                "en": "What is the core advantage of unit testing a `formatPrice(cents: number): string` function with Vitest, versus only testing it indirectly inside a Playwright E2E test?",
                "tr": "Bir `formatPrice(cents: number): string` fonksiyonunu Vitest ile unit test etmenin, onu sadece bir Playwright E2E testi içinde dolaylı olarak test etmeye göre temel avantajı nedir?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "Vitest tests always produce higher coverage",
                    "tr": "Vitest testleri her zaman daha yüksek coverage verir"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "It runs in seconds with no browser, testing the function in isolation — if an E2E test fails, it's unclear whether the bug is in formatPrice or the UI",
                    "tr": "Tarayıcı açmadan, saniyeler içinde ve fonksiyonu izole ederek çalışır — bir E2E testi başarısız olursa hatanın formatPrice'tan mı yoksa UI'dan mı geldiği belirsiz olur"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "Vitest uses syntax Playwright cannot test",
                    "tr": "Vitest, Playwright'ın test edemediği bir sözdizimi kullanır"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "E2E tests cannot execute unit-testable functions at all",
                    "tr": "E2E testleri unit test edilebilir fonksiyonları çalıştıramaz"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "en": "An E2E test only tests `formatPrice` INDIRECTLY (via the correct price appearing on the page) — if it fails, it is hard to tell whether the bug is in formatPrice itself or in rendering/UI logic, and spinning up a browser for every assertion costs seconds/minutes. Vitest tests the function directly, with no browser, in milliseconds — if it fails, it tells you exactly where the bug is.",
                "tr": "Bir E2E testi `formatPrice`'ı sadece DOLAYLI olarak (sayfada doğru fiyatın görünmesi üzerinden) test eder — başarısız olursa, hatanın formatPrice'ın kendisinde mi yoksa render/UI mantığında mı olduğunu ayırt etmek zordur, ayrıca her assertion için bir tarayıcı başlatmak gerekir (saniyeler/dakikalar). Vitest, fonksiyonu doğrudan, tarayıcısız ve milisaniyeler içinde test eder — hata varsa tam olarak nerede olduğunu hemen gösterir."
              }
            }
          }
        ]
      },
      {
        "title": {
          "en": "Interview Q&A",
          "tr": "Mülakat Soruları & Cevapları"
        },
        "blocks": [
                    {
            type: 'interview-questions',
            topic: 'TypeScript',
            questions: [
              // ── BASIC ──────────────────────────────────────────
              {"level":"basic","q":"1. What is the main difference between TypeScript and JavaScript for test automation?","a":"TypeScript is a statically typed superset of JavaScript that adds a compile step. For test automation, the key advantages are: type errors are caught before tests run (not during CI failure at 3 AM); IDE autocomplete works on all Playwright APIs, page objects, and fixtures; refactoring is safe because the compiler immediately shows every broken call site. JavaScript has no compile step — all type errors become runtime surprises. Playwright itself is written in TypeScript and TypeScript is the officially recommended language for Playwright projects."},
              {"level":"basic","q":"2. What is the difference between interface and type alias in TypeScript?","a":"Both describe object shapes, but they have key differences. interface supports declaration merging — you can reopen an interface and add properties, which is useful for augmenting third-party types (like extending Playwright's TestFixtures). interface is preferred for OOP patterns and class contracts. type supports union types (`string | number`), intersection types (`A & B`), tuple types, and mapped types — it is more expressive when you need computed or composite types. Rule of thumb: use interface for class shapes and public APIs; use type for unions, primitives, and complex computed types.","code":"interface Config { url: string }\ninterface Config { timeout: number }   // merged — now has url AND timeout\n\ntype Status = \"pass\" | \"fail\" | \"skip\";  // union — only possible with type\ntype ID     = string | number;           // union"},
              {"level":"basic","q":"3. What is 'any' and why should you avoid it in test automation?","a":"any is an escape hatch that completely disables TypeScript's type checking for a variable. You can assign anything to it and call any method on it without errors — but those errors surface at runtime instead of compile time. In test automation, using any defeats the entire purpose of TypeScript: you lose autocomplete, lose compile-time safety, and introduce the same class of runtime bugs that TypeScript is designed to prevent. Use unknown instead when you genuinely don't know the type — it forces you to narrow the type with a type guard before using it. Use explicit types, type assertions (as), or generics instead of any.","code":"// WRONG — any disables all safety\nlet data: any = await response.json();\ndata.nonExistentField.toUpperCase(); // No error — crashes at runtime\n\n// RIGHT — unknown forces you to validate first\nlet safe: unknown = await response.json();\nif (typeof safe === \"object\" && safe !== null && \"name\" in safe) {\n  console.log((safe as { name: string }).name);  // safe to use\n}"},
              {"level":"basic","q":"4. What is type inference and when does it work?","a":"Type inference is TypeScript's ability to automatically determine a variable's type from its initial value or context, without requiring an explicit annotation. It works for: variable declarations with an initial value (`let x = 5` → x is number), function return types (inferred from the return statement), generic type parameters (inferred from arguments), and array/object literals. When to annotate explicitly: when the variable is declared without a value, when the inferred type is too broad (e.g., you want `string[]` not `(string | number)[]`), and in function parameters which are never inferred.","code":"let count = 5;            // inferred: number\nlet name  = \"Alice\";       // inferred: string\nlet arr   = [1, 2, 3];     // inferred: number[]\n\nfunction double(n: number) { return n * 2; }  // return: number (inferred)\n\nlet url: string;            // MUST annotate — no initial value\nurl = \"https://example.com\";"},
              {"level":"basic","q":"5. What are enums and give a testing-specific use case?","a":"Enums are named constant sets. String enums (where each member has an explicit string value) are strongly preferred in test automation because they produce readable output in logs and test reports. A number enum with value `0` is meaningless in a test failure message; a string enum with value 'FAIL' is immediately understandable. Common testing use cases: test status (PASS/FAIL/SKIP/BLOCKED), browser target (chromium/firefox/webkit), environment (staging/production), HTTP methods, and log levels. Using enums instead of raw strings means the compiler catches typos like `'pase'` instantly.","code":"enum TestStatus { PASS = \"PASS\", FAIL = \"FAIL\", SKIP = \"SKIP\" }\nenum Browser    { CHROMIUM = \"chromium\", FIREFOX = \"firefox\" }\n\nfunction reportResult(status: TestStatus, browser: Browser) {\n  console.log(`[${browser}] ${status}`);   // [chromium] PASS — readable!\n}\nreportResult(TestStatus.PASS, Browser.CHROMIUM);\n// reportResult(\"pass\", \"chrome\");  // Error — prevents typos"},
              {"level":"basic","q":"6. What is tsconfig.json and what are its most important fields for a Playwright project?","a":"tsconfig.json is the TypeScript compiler configuration file. For Playwright projects, the most important fields are: target: ESNext (what JS version the output targets for modern Node.js); module: NodeNext (for ESM support); strict: true (enables all strict checks — never disable this); types: [\"@playwright/test\"] (pulls in Playwright's type definitions). A minimal Playwright tsconfig.json enables strict, sets target to ESNext, and optionally configures baseUrl and paths for import aliases. Java analogy: tsconfig.json is similar to pom.xml compiler plugin settings — it controls how the source is compiled.","code":"{\n  \"compilerOptions\": {\n    \"target\": \"ESNext\",\n    \"module\": \"NodeNext\",\n    \"moduleResolution\": \"NodeNext\",\n    \"strict\": true,\n    \"types\": [\"@playwright/test\"],\n    \"baseUrl\": \".\",\n    \"paths\": { \"@helpers/*\": [\"./helpers/*\"] }\n  }\n}"},
              {"level":"basic","q":"7. What is the difference between null and undefined in TypeScript, and how does strictNullChecks affect your code?","a":"null means a value has been intentionally set to nothing — explicit empty. undefined means declared but never assigned — the default uninitialized state. Without strictNullChecks, both are assignable to every type so you can write let name: string = null with no error, causing runtime crashes. With strictNullChecks (enabled by strict:true), null and undefined are their own types. A variable typed as string cannot be null unless you explicitly write string | null. In Playwright: page.locator().getAttribute() returns string | null — TypeScript forces you to handle null before calling .toLowerCase(). This prevents \"Cannot read properties of null\" crashes that only surface at CI runtime without this check.","code":"function processUrl(url: string | null): string {\n  if (url === null) return \"no-url\";\n  return url.toLowerCase();\n}\n// Playwright — getAttribute returns string | null\nconst href = await page.locator(\"a\").getAttribute(\"href\");\nif (href) { await page.goto(href); }"},
              {"level":"basic","q":"8. What does the ? on an interface property mean and when should you use optional properties in test automation?","a":"The ? suffix makes a property optional — its type becomes T | undefined. Required properties must always be provided; optional ones can be omitted and the factory applies a default. In test automation: optional properties are most useful for test data factories (createUser({ role?: string }) — only specify what differs from the default), config objects where most fields have defaults (TestRunConfig { retries?: number }), and API response models where some fields are conditional. Avoid overusing optional properties — if a field is always needed for the object to make sense, keep it required and use Partial<T> at the call site instead.","code":"interface CreateUserOptions {\n  name: string;\n  role?: string;\n  verified?: boolean;\n}\nfunction createUser(opts: CreateUserOptions) {\n  return { name: opts.name, role: opts.role ?? \"viewer\", verified: opts.verified ?? false };\n}\ncreateUser({ name: \"Alice\" }); // role and verified are optional"},
              {"level":"basic","q":"9. What is a type assertion (as) and when is it safe to use one in test automation?","a":"A type assertion (value as SomeType) is a compile-time instruction telling TypeScript \"trust me, I know this type\". It does NOT perform runtime conversion or validation — purely a compile-time override. Safe uses: narrowing unknown after parsing JSON when you have already validated the shape with a type guard; working with legacy JS APIs that return any. Unsafe uses: blindly asserting any API response to a specific type without validation — the assertion silences the compiler but the runtime crash still happens. Always prefer type guards over assertions when possible. Java analogy: as is like an unchecked cast (User) someObject — dangerous without instanceof check first.","code":"async function getUser(id: number): Promise<User> {\n  const res  = await fetch(\"/api/user/\" + id);\n  const data = await res.json();\n  if (!data || typeof data.name !== \"string\") throw new Error(\"bad response\");\n  return data as User;  // safe — shape verified above\n}"},
              {"level":"basic","q":"10. What is the difference between string (lowercase) and String (uppercase) in TypeScript?","a":"Lowercase string is the TypeScript primitive type — always use this for annotations. Uppercase String is the JavaScript wrapper object type created with new String(\"hello\"). Two String objects with the same text are NOT === equal; two string primitives with the same text ARE === equal. The same applies to number vs Number and boolean vs Boolean. TypeScript and all linters warn against the uppercase object forms. Java analogy: int (primitive) vs Integer (wrapper class) — use the primitive form in TypeScript just as you prefer int over Integer for simple values in Java.","code":"let a: string = \"hello\";       // use this\nlet b: String = new String(\"hello\"); // avoid\nconsole.log(a === \"hello\");     // true\nconsole.log(b === \"hello\");     // false — different identity"},
              {"level":"basic","q":"11. How do you run TypeScript code? What is the difference between tsc, ts-node, and tsx?","a":"Three main ways: (1) tsc — the TypeScript compiler, produces .js output files then you run node dist/file.js. This is the production path. (2) ts-node — executes TypeScript directly without a build step by compiling each file in memory. Slower startup but no build step needed; common for development scripts. (3) tsx — a modern much faster alternative to ts-node built on esbuild; essentially instant startup. Playwright recommends tsx for running scripts. When Playwright runs .spec.ts files it internally handles its own transform pipeline. Rule: use tsc --noEmit to validate types in CI, use tsx for local script execution, let Playwright handle its own test files.","code":"npx tsc --noEmit                    # type-check only, no output\nnpx tsx scripts/seed-test-data.ts   # run a TS script directly\nnpx playwright test                  # Playwright handles TS internally"},
              {"level":"basic","q":"12. What are declaration files (.d.ts) and why are they important for third-party libraries?","a":"Declaration files (.d.ts) contain only TypeScript type information — no runtime JavaScript code. They tell TypeScript the types of exported functions, classes, and variables in a JavaScript library so you get autocomplete and type checking. When a library ships its own types the .d.ts files are included in the npm package. When a library is pure JS without types the community publishes @types/library-name packages (from DefinitelyTyped) that you install as dev dependencies. For Playwright, @playwright/test ships its own declarations defining Page, Locator, APIRequestContext etc. Without these TypeScript types everything as any and you lose all safety and autocomplete.","code":"npm install --save-dev @types/node\n# Playwright ships its own types — no @types needed:\nnpm install --save-dev @playwright/test\n# Check: node_modules/@playwright/test/index.d.ts"},
              {"level":"basic","q":"13. What is the keyof operator and give a test automation use case?","a":"keyof T produces a union type of all property names of type T as string literals. If T = { email: string; password: string }, then keyof T = \"email\" | \"password\". In test automation: (1) Type-safe form field helper — fillField(field: keyof FormData, value: string) prevents filling a nonexistent field. (2) Type-safe env access — getEnv(key: keyof EnvConfig) ensures only known keys are accessed. (3) Generic overrides — { [K in keyof T]?: T[K] } for partial test data factories. Java analogy: keyof is like reflection field name access but resolved entirely at compile time with zero runtime overhead.","code":"interface LoginForm { email: string; password: string; rememberMe: boolean }\nasync function fillField(page: Page, field: keyof LoginForm, value: string) {\n  await page.locator('[data-testid=\"' + field + '\"]').fill(value);\n}\nawait fillField(page, \"email\", \"user@test.com\");  // OK\nawait fillField(page, \"phone\", \"123\");            // Compile Error!"},
              {"level":"basic","q":"14. What is the difference between a tuple and an array in TypeScript?","a":"An array (T[]) is a collection of same-type elements with no fixed length. A tuple ([T, U, V]) is a fixed-length array where each position has a specific possibly different type — TypeScript checks both the types AND the positions. In test automation tuples appear in helper functions that return multiple values: [boolean, string] for a pass/fail and message pair, or [Page, User] when a fixture sets up both. Java analogy: tuples do not exist natively in Java — you would use a custom class or Map.Entry<K,V>. TypeScript tuples are like a strongly-typed Object[] where each index is compile-time enforced.","code":"type TestResult = [passed: boolean, message: string, durationMs: number];\nfunction runCheck(): TestResult { return [true, \"Login OK\", 342]; }\nconst [passed, msg, ms] = runCheck();\nconsole.log(passed.toFixed()); // Compile Error — boolean has no toFixed"},
              {"level":"basic","q":"15. What are literal types and how do they help model test status and browser selection?","a":"Literal types represent a specific exact value rather than a general type. Instead of type: string you write type: \"GET\" | \"POST\" | \"DELETE\" — TypeScript only accepts those exact strings. For test automation: type TestStatus = \"pass\" | \"fail\" | \"skip\" | \"blocked\" prevents invalid status values; type Browser = \"chromium\" | \"firefox\" | \"webkit\" matches Playwright's allowed browser names. Combined with as const, object property values become literal types automatically. This replaces verbose enums for constant sets and prevents typos that would only surface at test runtime.","code":"type TestStatus = \"pass\" | \"fail\" | \"skip\" | \"blocked\";\ntype Browser    = \"chromium\" | \"firefox\" | \"webkit\";\nfunction reportTest(status: TestStatus, browser: Browser) {}\nreportTest(\"pass\", \"chromium\");    // OK\nreportTest(\"passed\", \"chrome\");    // Compile Error — both values wrong\nconst URLS = { staging: \"https://staging.app.com\" } as const;\ntype EnvKey = keyof typeof URLS;   // \"staging\""},
              // ── INTERMEDIATE ────────────────────────────────────
              {"level":"intermediate","q":"16. What is the difference between union types and intersection types?","a":"A union type (`A | B`) means a value can be one OR the other type — you must handle both cases (usually with a type guard). An intersection type (`A & B`) means a value must satisfy ALL listed types simultaneously — it combines properties from multiple types into one. Union is for 'or' scenarios (a parameter that accepts multiple forms), intersection is for 'and' scenarios (composing multiple interfaces into one complete type). In test automation: union types are common for function parameters that accept multiple formats (string | number); intersection types are common for composed page objects or config types.","code":"type StringOrNumber = string | number;  // can be EITHER\n\ninterface HasId    { id: number }\ninterface HasTitle { title: string }\ntype TestItem = HasId & HasTitle;  // must have BOTH id AND title\n\nconst item: TestItem = { id: 1, title: \"Login test\" };  // OK\n// const bad: TestItem = { id: 1 };  // Error: missing 'title'"},
              {"level":"intermediate","q":"17. What are generics and why are they useful in test automation?","a":"Generics are type parameters (written as `<T>`) that let you write functions, classes, and interfaces that work with any type while preserving that type's information throughout the code. Without generics, you use `any` (and lose all type safety) or duplicate code for each type. In test automation, generics are most useful for: API response wrappers that preserve the data's type (`ApiResponse<User>` vs `ApiResponse<Product>`), test data factories that create typed objects with partial overrides (`createTestData<T>(defaults: T, overrides?: Partial<T>): T`), repository patterns for typed data access, and utility functions that must work across multiple fixture types.","code":"// Generic wrapper preserves type through the chain\ninterface ApiResponse<T> { data: T; status: number; ok: boolean }\n\nfunction createResponse<T>(data: T, status: number): ApiResponse<T> {\n  return { data, status, ok: status < 400 };\n}\n\nconst userResp = createResponse({ id: 1, name: \"Alice\" }, 200);\nconsole.log(userResp.data.name);  // 'name' is correctly typed as string"},
              {"level":"intermediate","q":"18. How do access modifiers (public/private/protected/readonly) help in Page Object Model?","a":"Access modifiers enforce encapsulation in POM classes, which prevents test code from depending on implementation details. private on locator properties means test files cannot access selectors directly — only the page object's methods interact with the DOM, so selector changes don't ripple into every test file. protected allows subclasses to use methods (like `waitForLoad()`) that base classes provide without exposing them to test code. readonly on baseUrl or constructorinjected dependencies prevents accidental mutation between tests. public marks the methods that are the page object's public API — the only things test code should call.","code":"class LoginPage {\n  private readonly emailInput: Locator;   // tests cannot use selectors directly\n  protected readonly page: Page;          // accessible to subclasses\n  public readonly url = \"/login\";         // tests can read url, not change it\n\n  async login(e: string, p: string): Promise<void> {  // public API\n    await this.emailInput.fill(e);   // private — only this class\n  }\n}"},
              {"level":"intermediate","q":"19. What are type guards and when do you use them in test automation?","a":"Type guards are runtime checks that narrow a union type to a specific member inside a code branch. TypeScript recognizes `typeof`, `instanceof`, the `in` operator, and custom type predicate functions (`value is T`) as type guards. In test automation, type guards appear most often when: validating API responses of unknown shape (the response is typed as `unknown` until validated), handling errors that could be multiple error types (NetworkError vs TimeoutError), processing test results that come in multiple formats (UI test vs API test), and working with optional properties that may be undefined.","code":"function handleError(err: NetworkError | TimeoutError): void {\n  if (err instanceof NetworkError) {\n    console.log(`HTTP ${err.statusCode}`);  // statusCode only on NetworkError\n  } else {\n    console.log(`Timed out after ${err.timeoutMs}ms`);\n  }\n}\n\n// Custom type predicate\nfunction isUser(val: unknown): val is { id: number; name: string } {\n  return typeof val === \"object\" && val !== null && \"id\" in val;\n}"},
              {"level":"intermediate","q":"20. What does 'readonly' do and when should you use it in test automation?","a":"readonly prevents a property from being reassigned after initialization. At the type level it is a compile-time guarantee; combined with `Object.freeze()` it also works at runtime. In test automation, readonly is most important for: page object locators (selectors should never change after construction), configuration objects (prevent tests from mutating shared config), environment URLs and credentials passed into fixtures, and test data objects created by factories (tests should receive immutable data to prevent inter-test contamination). `Readonly<T>` is the utility type equivalent — it makes every property of an existing type readonly without rewriting the interface."},
              {"level":"intermediate","q":"21. How do you correctly type a function that accepts either a string or number and returns the same type?","a":"Use function overloads — declare the function signature multiple times with different parameter/return combinations, then provide a single implementation with a wider type. The caller sees only the overload signatures. Without overloads you would return string | number and callers would always need to narrow even when they passed a string and obviously expect a string back. In test automation overloads appear in utility functions like parseId(string):string and parseId(number):number, or helpers accepting both page locators and string selectors.","code":"function parseId(value: string): string;\nfunction parseId(value: number): number;\nfunction parseId(value: string | number): string | number {\n  if (typeof value === \"string\") return value.trim();\n  return Math.floor(value);\n}\nconst s = parseId(\"  abc  \");  // type: string\nconst n = parseId(3.7);        // type: number"},
              {"level":"intermediate","q":"22. What is a discriminated union and how do you use it to model test result states?","a":"A discriminated union is a union type where every member has a shared literal property (the discriminant) that TypeScript uses to narrow the type inside branches. In test automation it perfectly models states with different data depending on outcome — a passed test has a duration, a failed test has error and stacktrace, a skipped test has a reason. Without discriminated unions you would use optional properties (error?: string) which are always present in the type, making it possible to access result.error.message on a passed test. With discriminated unions the compiler prevents this entirely at compile time.","code":"type TestResult =\n  | { status: \"pass\"; durationMs: number }\n  | { status: \"fail\"; error: string; stackTrace: string }\n  | { status: \"skip\"; reason: string };\nfunction report(r: TestResult) {\n  if (r.status === \"pass\") console.log(r.durationMs);\n  else if (r.status === \"fail\") console.log(r.error);\n  else console.log(r.reason);\n}"},
              {"level":"intermediate","q":"23. How do you extend Playwright's TestFixtures interface to add custom fixtures with proper types?","a":"Use test.extend<MyFixtures>() where MyFixtures is an interface you define. Every property in MyFixtures becomes a typed fixture available in test functions with full autocomplete. Export the typed test object from a fixtures file and import it instead of Playwright's built-in test across all test files. The compiler errors if you use a fixture name not in the interface. Changing a fixture's type immediately shows all broken usages across the suite — this is the TypeScript pattern that makes large Playwright suites maintainable.","code":"import { test as base } from \"@playwright/test\";\nimport { LoginPage } from \"../pages/LoginPage\";\ninterface MyFixtures { loginPage: LoginPage }\nexport const test = base.extend<MyFixtures>({\n  loginPage: async ({ page }, use) => { await use(new LoginPage(page)); }\n});\n// In test files: import { test } from \"./fixtures\""},
              {"level":"intermediate","q":"24. You have 500 Playwright tests and tsc type-checking takes 45 seconds in CI. How do you fix this?","a":"Slow type-checking is an architecture problem. Solutions in order of impact: (1) Run tsc --noEmit separately from tests — Playwright has its own transform; type-check and test-run run as parallel CI jobs. (2) Enable incremental: true with tsBuildInfoFile — unchanged files are skipped on next run. (3) Use TypeScript project references for monorepos — each package compiles independently and results are cached. (4) Enable skipLibCheck: true — skips type-checking of declaration files in node_modules. (5) Avoid huge union types and deeply nested generics — they are the most common slow inference cause. Use @typescript/analyze-trace to find the slowest types.","code":"{\n  \"compilerOptions\": {\n    \"incremental\": true,\n    \"tsBuildInfoFile\": \".tsbuildinfo\",\n    \"skipLibCheck\": true\n  }\n}\n# CI: parallel jobs\n# job1: npx tsc --noEmit\n# job2: npx playwright test"},
              {"level":"intermediate","q":"25. What does Partial<T> do and how do you use it in a test data factory?","a":"Partial<T> makes every property of T optional — equivalent to adding ? to every property manually. The main test automation use case is the factory pattern: define a complete default object, accept Partial<User> overrides so callers only specify what differs. Without Partial callers would have to provide every field even when only one is relevant. This is the TypeScript equivalent of Java's builder pattern without the boilerplate. Combined with spread { ...defaults, ...overrides } gives a clean merge. Required<T> is the inverse — removes all optional markers and makes every property required.","code":"const defaultUser: User = { id: 1, email: \"user@test.com\", role: \"viewer\", verified: true };\nfunction createUser(overrides: Partial<User> = {}): User {\n  return { ...defaultUser, ...overrides };\n}\nconst admin = createUser({ role: \"admin\" });\nconst unverified = createUser({ verified: false });"},
              {"level":"intermediate","q":"26. What does the satisfies operator do and how is it different from a type assertion?","a":"The satisfies operator (TS 4.9+) validates that a value conforms to a type WITHOUT widening the inferred type. A type assertion (as) forces the type and loses the specific inferred information. satisfies keeps both benefits: the compiler checks the value matches the type AND the inferred type stays as specific as possible. In test automation satisfies is most useful for config objects — you want compiler validation of the config shape but also preserve literal URL types for downstream autocomplete. Java analogy: as is like an unchecked cast (User)obj; satisfies is like a checked cast that also preserves the original static type.","code":"type EnvConfig = Record<string, string>;\n// With as — type widens, literals lost:\nconst e1 = { staging: \"https://staging.app.com\" } as EnvConfig;\n// e1.staging is: string\n// With satisfies — validated AND literals kept:\nconst e2 = { staging: \"https://staging.app.com\" } satisfies EnvConfig;\n// e2.staging is: \"https://staging.app.com\""},
              {"level":"intermediate","q":"27. What are index signatures and when would you use { [key: string]: string } in a test framework?","a":"An index signature allows a type to have any number of properties with a consistent value type. { [key: string]: string } means any string key maps to a string value — a generic dictionary. In test automation: HTTP headers maps, environment variable collections where keys are not known at compile time, query parameter maps. Limitation: with an index signature ALL properties must match the value type so you cannot mix typed known properties with the catch-all. Use Record<string, string> as a cleaner alternative — it is equivalent and more readable.","code":"interface Headers { [header: string]: string }\nconst h: Headers = { Authorization: \"Bearer xyz\", \"Content-Type\": \"application/json\" };\ntype QueryParams = Record<string, string | number>;\nconst p: QueryParams = { page: 1, search: \"alice\" };"},
              {"level":"intermediate","q":"28. You are mocking a fetch call in Jest with TypeScript. How do you type the mock to avoid any?","a":"Use jest.mocked(fn) (TS 4.7+) or jest.MockedFunction<typeof fn> to get a fully typed mock. jest.Mocked<T> replaces every method with jest.Mock while preserving original method signatures. Without proper typing mockResolvedValue accepts anything and you lose the guarantee that your mock matches the real implementation's type. Always import the real module then wrap with jest.mocked() rather than writing (fetch as any).mockResolvedValue(). The compiler catches if you try to mock a method with the wrong return type.","code":"import { fetchUser } from \"../api/userApi\";\nimport type { User } from \"../types\";\njest.mock(\"../api/userApi\");\nconst mockFetchUser = jest.mocked(fetchUser);\ntest(\"returns user\", async () => {\n  const fakeUser: User = { id: 1, name: \"Alice\", role: \"admin\" };\n  mockFetchUser.mockResolvedValueOnce(fakeUser); // type-checked\n});"},
              {"level":"intermediate","q":"29. What is Exclude<T, U> and when would you use it in test automation?","a":"Exclude<T, U> produces a type by removing from union T all members assignable to U. It is the complement of Extract<T, U>. In test automation: you have a union of all test states but need a variable that can only hold non-passing states — Exclude<TestStatus, \"pass\"> gives \"fail\" | \"skip\" | \"blocked\". Also useful in mapped types to exclude certain keys from an interface when creating test data without audit fields. Java analogy: like filtering a list by type at compile time with no runtime cost.","code":"type TestStatus = \"pass\" | \"fail\" | \"skip\" | \"blocked\";\ntype FailureStatus = Exclude<TestStatus, \"pass\">;\n// \"fail\" | \"skip\" | \"blocked\"\nfunction analyzeFailure(status: FailureStatus): string {\n  return \"Test did not pass: \" + status;\n}\nanalyzeFailure(\"fail\");  // OK\nanalyzeFailure(\"pass\");  // Compile Error"},
              {"level":"intermediate","q":"30. What is as const and how does it help with test configuration and selector constants?","a":"The as const assertion tells TypeScript to infer the most specific narrow type possible: string properties become literal types not string, the object becomes readonly. Without as const, const BROWSERS = [\"chromium\", \"firefox\"] has type string[] — TypeScript widens the values. With as const the type becomes readonly [\"chromium\", \"firefox\"] and you can extract the union with typeof BROWSERS[number]. In test automation, as const is essential for environment URL maps, allowed browser lists, test tag constants, and HTTP method maps. It is the lightweight alternative to full enums for constant sets.","code":"const BROWSERS = [\"chromium\", \"firefox\", \"webkit\"] as const;\ntype Browser = typeof BROWSERS[number]; // \"chromium\" | \"firefox\" | \"webkit\"\nconst URLS = { staging: \"https://staging.app.com\", prod: \"https://app.com\" } as const;\ntype EnvKey = keyof typeof URLS;        // \"staging\" | \"prod\""},
              {"level":"intermediate","q":"31. What are utility types and give concrete automation examples for at least four?","a":"Utility types are built-in generic types that transform existing types. The most useful in test automation: Partial<T> — makes all properties optional, used for config overrides and test data factories so you only specify what changes. Pick<T,K> — selects specific properties, useful for creating auth-only fixture types from a full user interface. Omit<T,K> — removes properties, useful for creating safe fixture types without passwords. Record<K,V> — typed key-value map, used for environment URL maps or browser timeout configs. Readonly<T> — freezes a type for immutable test config and fixture data. ReturnType<F> and Awaited<ReturnType<F>> — extracts the resolved return type of async functions, useful for typing variables that hold fetched data.","code":"type PartialConfig  = Partial<TestConfig>;                          // for overrides\ntype AuthOnly       = Pick<User, \"email\" | \"password\" | \"role\">;    // for login tests\ntype SafeUser       = Omit<User, \"password\">;                       // no credentials\ntype BrowserMap     = Record<Browser, number>;                       // { chromium: 30000, ... }\ntype FetchedUser    = Awaited<ReturnType<typeof fetchUser>>;         // resolved type"},
              {"level":"intermediate","q":"32. How do you correctly type async functions with possible error states in TypeScript?","a":"TypeScript does not have a built-in Result/Either type, but you can model it explicitly. The three main patterns are: (1) Union return type — `Promise<Data | null>` or `Promise<{ data: T } | { error: string }>`, which forces callers to handle both cases. (2) Typed exceptions — declare custom error classes and use them consistently; callers can check with instanceof. (3) Generic Result type — `type Result<T, E = Error> = { ok: true; data: T } | { ok: false; error: E }`, a discriminated union where the `ok` boolean is the type guard. Pattern 3 is the most explicit and is popular in large Playwright frameworks. Always annotate async function return types explicitly as `Promise<T>` rather than relying on inference — it makes the contract clear to all callers.","code":"type Result<T, E extends Error = Error> =\n  | { ok: true;  data:  T }\n  | { ok: false; error: E };\n\nasync function fetchUser(id: number): Promise<Result<User>> {\n  try {\n    const res = await fetch(`/api/users/${id}`);\n    if (!res.ok) return { ok: false, error: new Error(`HTTP ${res.status}`) };\n    return { ok: true, data: await res.json() as User };\n  } catch (e) {\n    return { ok: false, error: e as Error };\n  }\n}"},
              {"level":"intermediate","q":"33. What are mapped types and how would you use them in a test framework?","a":"Mapped types iterate over the keys of an existing type and produce a new type by transforming each property. Syntax: `{ [K in keyof T]: NewType }`. In a test framework, mapped types are useful for: creating form validation error types (`{ [K in keyof Form]: string | null }` — one error slot per field), creating mock/spy wrapper types that replace every method with a Jest spy, generating serialized string versions of a config interface for env-var parsing, and building partial-with-defaults helpers. Mapped types are the foundation of most built-in utility types (Partial, Readonly, Required, Record are all implemented as mapped types in TypeScript's lib).","code":"// Form error type — one validation message per field\ntype FormErrors<T> = { [K in keyof T]: string | null };\ninterface LoginForm { email: string; password: string; rememberMe: boolean }\ntype LoginErrors = FormErrors<LoginForm>;\n// { email: string|null; password: string|null; rememberMe: string|null }\n\n// Serialized env-vars — all values become strings\ntype EnvVarMap<T> = { [K in keyof T]: string };"},
              {"level":"intermediate","q":"34. What does enabling 'strict' mode in tsconfig.json do and why does it matter for test automation?","a":"strict: true enables a group of strictness checks simultaneously: noImplicitAny (parameters cannot silently become any), strictNullChecks (null and undefined are their own types — you must handle them explicitly), strictFunctionTypes, strictBindCallApply, strictPropertyInitialization, and noImplicitThis. For test automation, strictNullChecks is the most impactful — it forces you to handle cases where locators might not find elements, API responses might be null, or optional config values might be undefined. Without strict mode, TypeScript is very permissive and many of the runtime bugs it's supposed to prevent will still occur. Always start new Playwright projects with strict: true. On legacy JS-to-TS migrations, enable strict flags incrementally."},
              {"level":"intermediate","q":"35. How do you structure TypeScript types in a large Playwright framework?","a":"A scalable structure separates types by responsibility: (1) `src/types/` or `types/` directory for shared interfaces and type aliases — split by domain: `user.types.ts`, `api.types.ts`, `config.types.ts`. (2) `src/enums/` for string enums (Browser, Environment, TestStatus). (3) Each page object file exports its own interface alongside the class (ILoginPage + LoginPage). (4) A barrel file (`types/index.ts`) re-exports everything so imports stay clean. (5) `playwright.d.ts` or `fixtures.d.ts` for augmenting Playwright's TestFixtures interface with custom fixture types. (6) Never put types in test files — they belong in the shared layer. (7) Use `import type { ... }` (not `import { ... }`) for type-only imports — they are removed at compile time and don't create circular dependencies.","code":"// types/index.ts — barrel exports\nexport type { User, AdminUser } from \"./user.types\";\nexport type { ApiResponse, ApiError } from \"./api.types\";\nexport { TestStatus, Browser, Environment } from \"../enums\";\n\n// In test file:\nimport type { User } from \"../types\";             // type-only import\nimport { TestStatus, Browser } from \"../types\";   // value import (enum)"},
              // ── ADVANCED ────────────────────────────────────────
              {"level":"advanced","q":"36. What are conditional types and how do you use infer to extract inner types?","a":"Conditional types have the form T extends U ? X : Y — if T is assignable to U the type is X otherwise Y. The infer keyword captures a type variable inside the extends clause letting you extract the type inside a wrapper. Common uses: Awaited<T> (built-in since TS 4.5) extracts the resolved type of Promise<T>; ReturnType<F> extracts function return types. Advanced frameworks use conditional types to infer fixture types from factory function return types making the whole fixture system auto-typed. Java has no equivalent — this is TypeScript-only capability.","code":"type Item<T> = T extends Array<infer I> ? I : never;\ntype Str = Item<string[]>;  // string\ntype ReturnOf<F> = F extends (...args: any[]) => infer R ? R : never;\ntype R = ReturnOf<() => Promise<User>>;  // Promise<User>"},
              {"level":"advanced","q":"37. How do you use template literal types to generate type-safe API endpoint paths?","a":"Template literal types (TS 4.1+) construct new string literal types from other types using template literal syntax. This enables compile-time validated API paths. In test automation: typed API clients where paths are constructed from resource names (/api/ + string), typed event name systems using a module:action convention, and HTTP header name unions. This prevents the common bug of a typo in an API endpoint string that only surfaces at test runtime rather than at compile time.","code":"type Method = \"get\" | \"post\" | \"put\" | \"delete\";\ntype ApiPath = `/api/${string}`;\ntype ResourcePath<T extends string> = `/api/${T}` | `/api/${T}/${number}`;\ntype UserPath = ResourcePath<\"users\">;  // \"/api/users\" | \"/api/users/123\"\ntype AppEvent = `${\"auth\" | \"test\"}:${\"start\" | \"end\" | \"error\"}`;"},
              {"level":"advanced","q":"38. Your 20-person team keeps writing any for API response types. What architectural solution do you implement?","a":"This requires multiple layers: (1) ESLint rule @typescript-eslint/no-explicit-any set to error — fails lint and CI pipeline. (2) Centralized typed API client layer — all API calls go through a generic apiRequest<T>(method, path): Promise<T> function so response types are always provided. (3) Auto-generated types from OpenAPI spec using openapi-typescript — types stay in sync with backend contract automatically. (4) Zod schema validation at API boundaries — validates runtime shape AND infers TypeScript types simultaneously. (5) PR review checklist with no-any gate. Combined these create a system where writing any is both a linting error AND architecturally unnecessary.","code":"async function apiGet<T>(path: string): Promise<T> {\n  const res = await fetch(path);\n  if (!res.ok) throw new Error(\"HTTP \" + res.status);\n  return res.json() as T;  // one assertion in the typed layer\n}\nconst users = await apiGet<User[]>(\"/api/users\");\nconst user  = await apiGet<User>(\"/api/users/1\");"},
              {"level":"advanced","q":"39. What is module augmentation and how do you use it to add types to process.env?","a":"Module augmentation lets you add properties to an existing module's type declarations without modifying its source files. You create a .d.ts file that reopens the module's namespace using declare module \"library-name\" and adds properties. The most important use case in Playwright automation: augmenting process.env — TypeScript types it as { [key: string]: string | undefined } with no knowledge of your specific env vars. With module augmentation you declare BASE_URL, API_KEY, CI_ENVIRONMENT as specific typed properties — accessing an undeclared env var becomes a compile error instead of a silent undefined at runtime.","code":"// env.d.ts\ndeclare namespace NodeJS {\n  interface ProcessEnv {\n    BASE_URL: string;\n    API_KEY: string;\n    CI_ENVIRONMENT?: \"staging\" | \"production\";\n  }\n}\nconst baseUrl = process.env.BASE_URL;        // string\nconst unknown = process.env.UNKNOWN_KEY;     // Compile Error!"},
              {"level":"advanced","q":"40. How do you implement a type-safe builder pattern for test data in TypeScript?","a":"The builder pattern in TypeScript combines method chaining with generics for a fluent API. Each builder method returns this for chaining and build() returns the completed object with defaults applied. In test automation builders replace verbose repetition of creating test data per test with a readable type-safe fluent API. Directly analogous to Java's builder pattern (Lombok @Builder or manual builders) but without the boilerplate. The compiler catches if you set a property that does not exist on User.","code":"class UserBuilder {\n  private data: Partial<User> = {};\n  withEmail(email: string): this { this.data.email = email; return this; }\n  withRole(role: User[\"role\"]): this { this.data.role = role; return this; }\n  build(): User {\n    return { id: 1, email: \"default@test.com\", role: \"viewer\", verified: true, ...this.data };\n  }\n}\nconst admin = new UserBuilder().withEmail(\"a@test.com\").withRole(\"admin\").build();"},
              {"level":"advanced","q":"41. You need to migrate 200 Playwright JS test files to TypeScript over 6 months. What is your strategy?","a":"Phase 1: Set allowJs: true and checkJs: false in tsconfig — TypeScript compiles both .js and .ts files while JS files are not type-checked yet. Rename files from .js to .ts one directory at a time. Add // @ts-nocheck at the top of files not yet migrated. Convert page object files first — they are used by many tests so typing them once benefits all test files. Phase 2: Enable noImplicitAny: false and strict: false initially. Phase 3: Raise strictness quarterly — enable noImplicitAny then strictNullChecks then strict: true. Add tsc --noEmit as a CI gate from day one even with suppressions so regressions are caught immediately.","code":"// Phase 1 tsconfig:\n{ \"allowJs\": true, \"checkJs\": false, \"strict\": false }\n// Phase 3 tsconfig:\n{ \"allowJs\": false, \"strict\": true }\n# CI gate from day 1:\nnpx tsc --noEmit"},
              {"level":"advanced","q":"42. What are TypeScript project references and how do you use them in a Playwright monorepo?","a":"TypeScript project references (TS 3.0+) split a large codebase into independently-typed independently-compiled sub-projects. Each sub-project has composite: true in its tsconfig.json and other projects reference it via the references array. Benefits: incremental builds (only changed packages recompile), parallel type-checking, and proper isolation. In a Playwright monorepo: packages/shared-types (interfaces enums), packages/page-objects (POM classes, references shared-types), packages/e2e-tests (test files, references page-objects). The root tsconfig lists all as references. tsc --build compiles in dependency order.","code":"// packages/page-objects/tsconfig.json:\n{ \"compilerOptions\": { \"composite\": true }, \"references\": [{ \"path\": \"../shared-types\" }] }\n// root tsconfig.json:\n{ \"files\": [], \"references\": [\n  { \"path\": \"packages/shared-types\" },\n  { \"path\": \"packages/page-objects\" },\n  { \"path\": \"packages/e2e-tests\" }\n]}\nnpx tsc --build"},
              {"level":"advanced","q":"43. What are branded types and how do they prevent mixing user IDs with product IDs in test data?","a":"TypeScript uses structural typing — type UserId = number and type ProductId = number are identical so a function expecting UserId silently accepts ProductId. Branded types add a phantom property that exists only at the type level: type UserId = number & { readonly __brand: \"UserId\" }. Now TypeScript treats UserId and ProductId as distinct even though their runtime value is just a number. Creating values requires an explicit constructor function (the brand function). This prevents deleteProduct(userId) from compiling — catching the ID mix-up at development time before it corrupts data.","code":"type UserId    = number & { readonly __brand: \"UserId\" };\ntype ProductId = number & { readonly __brand: \"ProductId\" };\nconst toUserId    = (n: number): UserId    => n as UserId;\nconst toProductId = (n: number): ProductId => n as ProductId;\nasync function deleteProduct(id: ProductId): Promise<void> {}\nconst uid = toUserId(42);\nawait deleteProduct(uid);  // Compile Error — UserId is not ProductId"},
              {"level":"advanced","q":"44. How do you set up TypeScript strict CI gates and what happens when strict is first enabled on a legacy codebase?","a":"CI gate setup: add npx tsc --noEmit as a separate CI step — --noEmit performs full type-checking without writing output files. tsc exits with code 1 on any type error failing the pipeline. For Playwright also run npx playwright test as a separate step since Playwright has its own transform. Enabling strict on legacy code typically surfaces hundreds of errors: noImplicitAny on untyped parameters, strictNullChecks errors where null values were accessed without checks, strictPropertyInitialization in classes. Practical approach: use ts-migrate to auto-add @ts-expect-error suppressions on existing errors then fix iteratively over sprints. Never use any to silence errors — use unknown and type guards instead.","code":"# CI pipeline:\n- name: Type check\n  run: npx tsc --noEmit\n- name: Run tests\n  run: npx playwright test\n\n# Maximum strictness tsconfig:\n{\n  \"compilerOptions\": {\n    \"strict\": true,\n    \"noUncheckedIndexedAccess\": true,\n    \"noImplicitOverride\": true\n  }\n}"},
              {"level":"advanced","q":"45. Explain covariance vs contravariance in TypeScript. How does this affect Page Object method overriding?","a":"Covariance means a subtype can substitute a supertype — return types are covariant (an overriding method can return a more specific type). Contravariance means parameter types must go wider or stay equal — an overriding method should NOT narrow parameter types. TypeScript with strictFunctionTypes (in strict mode) enforces contravariance for function parameters. In a Page Object hierarchy: if BasePage.navigate(url: string) is overridden in LoginPage.navigate(url: \"login\" | \"register\"), TypeScript errors because LoginPage.navigate is more restrictive and does not accept all strings. The fix: keep parameter types equal or wider in subclasses. Java follows the same Liskov Substitution Principle for method overriding.","code":"class BasePage {\n  async navigate(url: string): Promise<void> {}\n}\n// WRONG — narrowing parameter (contravariance violation):\n// class LoginPage extends BasePage {\n//   override async navigate(url: \"login\" | \"register\"): Promise<void> {} // Error!\n// }\n// CORRECT — same parameter type:\nclass AuthPage extends BasePage {\n  override async navigate(url: string): Promise<void> {\n    await super.navigate(url);\n  }\n}"},
              {"level":"advanced","q":"46. How do you implement a plugin/middleware system with proper TypeScript types?","a":"A typed plugin system uses a generic Plugin<T extends object> interface with a name string, optional dependencies string array, and an install method receiving the application context. The application maintains a Map<string, Plugin<App>> registry. TypeScript ensures install() receives the correct context type. For Playwright: test hooks as plugins where each plugin can register beforeAll/afterAll/beforeEach hooks with proper typing. This pattern appears in Playwright's own fixture system and in test framework plugins like testing-library. Java analogy: similar to the Java SPI (ServiceLoader) pattern but resolved at compile time rather than runtime discovery.","code":"interface Plugin<T extends object = object> {\n  name: string;\n  dependencies?: string[];\n  install(context: T): void | Promise<void>;\n}\nclass App {\n  private plugins = new Map<string, Plugin<App>>();\n  use(plugin: Plugin<App>): this {\n    this.plugins.set(plugin.name, plugin);\n    return this;\n  }\n}"},
              {"level":"advanced","q":"47. What is the difference between unknown and never and when does each appear in real test automation code?","a":"unknown is the type-safe alternative to any — it accepts any value but you must narrow it before using it. never represents a value that cannot exist — the empty type, the return type of functions that always throw or loop forever, and the result of narrowing a discriminated union when all cases are covered. In test automation: unknown appears as the type of caught errors in catch blocks (try/catch e is unknown in strict TS), forcing you to check instanceof Error before accessing e.message. never appears in exhaustive switch checks for discriminated unions — the final else branch of a complete status check should receive never, catching missed cases at compile time.","code":"function assertNever(val: never, msg = \"Unhandled value\"): never {\n  throw new Error(msg + \": \" + JSON.stringify(val));\n}\nfunction handleStatus(s: TestStatus) {\n  switch (s) {\n    case \"pass\": return \"green\";\n    case \"fail\": return \"red\";\n    case \"skip\": return \"grey\";\n    default: return assertNever(s); // compile error if status added without handler\n  }\n}"},
              {"level":"advanced","q":"48. How do you share TypeScript types between your Playwright test suite and a backend Express API without duplication?","a":"Three patterns: (1) Shared npm package — extract types to packages/shared-types, publish to a private npm registry or use local workspace packages (npm/yarn/pnpm workspaces). Both test suite and API import from @myorg/shared-types. (2) Git submodule containing only type declarations — simpler than a package but harder to version. (3) OpenAPI spec as the source of truth — generate types automatically for both frontend/tests (openapi-typescript) and backend (openapi-generator) from the same spec file. Pattern 3 is most robust because the spec serves as documentation, contract test basis, and type source simultaneously. Teams that maintain manual type duplication always drift — the automatic generation approach is the only safe solution at scale.","code":"pnpm workspace setup:\n# pnpm-workspace.yaml\npackages: [\"packages/*\", \"tests/*\", \"backend/*\"]\n# packages/shared-types/src/index.ts\nexport interface User { id: number; email: string; role: Role; }\nexport type Role = \"admin\" | \"viewer\" | \"editor\";\n# tests/e2e/fixtures.ts\nimport type { User } from \"@myorg/shared-types\";"},
              {"level":"advanced","q":"49. What performance problems can TypeScript itself introduce into a project and how do you diagnose them?","a":"TypeScript performance problems are compilation time issues — the runtime JS is identical. Root causes: (1) Large union types with many members — TypeScript checks each combination; (2) Deeply nested conditional types or recursive mapped types; (3) Missing incremental: true causing full recompilation each time; (4) Many imports of large declaration files like rxjs without skipLibCheck. Diagnosis: npx tsc --noEmit --diagnostics shows files included, lines processed, memory used; @typescript/analyze-trace generates a trace file readable in Chrome trace viewer that shows exactly which type checks are slow. Top fixes: enable incremental + skipLibCheck, use project references, replace complex recursive types with simpler alternatives, use type aliases to cache expensive computed types.","code":"# Diagnose slow compilation:\nnpx tsc --noEmit --diagnostics 2>&1\nnpx tsc --noEmit --generateTrace ./ts-trace\n# Then open Chrome and load the trace:\n# chrome://tracing → Load → ./ts-trace/trace.json\n\n# Fix: cache expensive types\ntype AllRoutes = GetRoutes<AppRouter>;  // computed once, reused"},
              {"level":"advanced","q":"50. You join a team where Playwright tests have no TypeScript types — only any, untyped fixtures, and no tsconfig. What is your 90-day improvement plan?","a":"Day 1-7: Audit phase — count total test files, measure current CI time, document the biggest sources of runtime failures (undefined property access, wrong API response assumptions). Add tsconfig.json with allowJs:true, noEmit:true, strict:false — just to get visibility. Day 8-30: Infrastructure — add tsconfig, fix the linting pipeline, add tsc --noEmit as a CI gate (failures initially suppressed with ts-ignore). Rename .js to .ts. Type all Page Objects first since they are used in every test. Day 31-60: Systematic typing — enable noImplicitAny, fix errors class by class. Type API response interfaces from OpenAPI spec. Remove any suppressions. Day 61-90: Raise strictness — enable strictNullChecks, fix null handling, enable full strict:true. Add PR gate preventing new any introductions. Celebrate: runtime failures from type errors drop measurably.","code":"Week 1 tsconfig (audit mode):\n{ \"compilerOptions\": { \"allowJs\": true, \"checkJs\": false, \"strict\": false, \"noEmit\": true } }\n\nWeek 8 tsconfig (enforcement mode):\n{ \"compilerOptions\": { \"strict\": true, \"noEmit\": true } }\n\n# CI gate from day 1:\n- run: npx tsc --noEmit || true  # warn only\n# CI gate from week 8:\n- run: npx tsc --noEmit          # fail build on type errors"},
            ],
          },
{
            "type": "heading",
            "content": {
              "en": "☕ If You Know Java: Interview Q Bridge",
              "tr": "☕ Java Biliyorsan: Mülakat Soruları Köprüsü"
            }
          },
          {
            "type": "java-compare",
            "topic": "interface: Structural vs Nominal Typing (Q2 Deep Dive)",
            "why": {
              "en": "Q2 covers interface vs type — but the bigger surprise for Java devs is HOW TypeScript interfaces work. Java uses nominal typing (class must say 'implements'). TypeScript uses structural typing — any object with the right shape satisfies an interface automatically.",
              "tr": "S2 interface vs type'ı kapsar — ama Java geliştiricileri için asıl sürpriz TypeScript interface'lerinin NASIL çalıştığıdır. Java nominal tipleme kullanır (sınıfın 'implements' demesi gerekir). TypeScript yapısal tipleme kullanır — doğru şekle sahip herhangi bir nesne interface'i otomatik olarak karşılar."
            },
            "why_en": "Q2 covers interface vs type — but the bigger surprise for Java devs is HOW TypeScript interfaces work. Java uses nominal typing (class must say 'implements'). TypeScript uses structural typing — any object with the right shape satisfies an interface automatically.",
            "java": "// Java: NOMINAL typing — must explicitly declare\ninterface Clickable {\n    void click();\n}\n\n// MUST say \"implements Clickable\":\nclass Button implements Clickable {\n    public void click() { System.out.println(\"clicked\"); }\n}\n\n// This would NOT satisfy Clickable — no \"implements\":\nclass Link {\n    public void click() { System.out.println(\"link clicked\"); }\n}\n// new Clickable link = new Link(); // Compile error!",
            "typescript": "// TypeScript: STRUCTURAL typing — shape is all that matters\ninterface Clickable {\n  click(): void;\n}\n\n// No \"implements\" needed — has click() → satisfies Clickable!\nclass Button {\n  click() { console.log(\"clicked\"); }\n}\n\nclass Link {\n  click() { console.log(\"link clicked\"); }\n  href = \"/home\";   // extra props are fine\n}\n\n// Both work — structural match is enough:\nfunction doClick(item: Clickable) { item.click(); }\ndoClick(new Button());  // ✅\ndoClick(new Link());    // ✅ — extra href is ignored\n\n// Even plain objects work!\ndoClick({ click: () => console.log(\"inline\") }); // ✅",
            "note": {
              "en": "This is the most important TypeScript concept for Java devs. You rarely write \"implements\" in TS — if the shape matches, it satisfies the interface. Great for mocking in tests: just pass an object with the right methods.",
              "tr": "Bu Java geliştiricileri için en önemli TypeScript kavramıdır. TS'de neredeyse hiç 'implements' yazmıyorsunuz — şekil eşleşirse, interface'i karşılar. Testlerde mock yapmak için harika: sadece doğru metodlara sahip bir nesne iletin."
            },
            "note_en": "This is the most important TypeScript concept for Java devs. You rarely write \"implements\" in TS — if the shape matches, it satisfies the interface. Great for mocking in tests: just pass an object with the right methods."
          },
          {
            "type": "java-compare",
            "topic": "Generics <T>: Java vs TypeScript (Q7 Deep Dive)",
            "why": {
              "en": "Q7 covers generics — the good news: TypeScript generics look almost identical to Java generics. Same <T> syntax, same extends constraints. Key difference: TypeScript adds union types and conditional types that Java doesn't have.",
              "tr": "S7 generic'leri kapsar — iyi haber: TypeScript generic'leri Java generic'lerine neredeyse aynı görünür. Aynı <T> sözdizimi, aynı extends kısıtlamaları. Temel fark: TypeScript Java'nın sahip olmadığı union type'ları ve conditional type'ları ekler."
            },
            "why_en": "Q7 covers generics — the good news: TypeScript generics look almost identical to Java generics. Same <T> syntax, same extends constraints. Key difference: TypeScript adds union types and conditional types that Java doesn't have.",
            "java": "// Java generics — the model TypeScript is based on\ninterface ApiResponse<T> {\n    T getData();\n    int getStatus();\n    boolean isOk();\n}\n\n// Bounded generic (extends):\n<T extends Comparable<T>> T max(T a, T b) {\n    return a.compareTo(b) > 0 ? a : b;\n}\n\n// Generic class:\npublic class Repository<T> {\n    private List<T> items = new ArrayList<>();\n    public void add(T item) { items.add(item); }\n    public List<T> getAll() { return items; }\n}",
            "typescript": "// TypeScript generics — nearly identical syntax!\ninterface ApiResponse<T> {\n  data:   T;       // same as Java getData()\n  status: number;\n  ok:     boolean;\n}\n\n// Bounded generic (extends — same keyword!):\nfunction max<T extends { compareTo(other: T): number }>(\n  a: T, b: T\n): T {\n  return a.compareTo(b) > 0 ? a : b;\n}\n\n// Generic class (same syntax):\nclass Repository<T> {\n  private items: T[] = [];\n  add(item: T): void  { this.items.push(item); }\n  getAll(): T[]       { return this.items; }\n}\n\n// TypeScript bonus — Java doesn't have this:\ntype MaybeNull<T> = T | null;           // union generic\ntype Keys<T> = keyof T;                 // mapped type key\ntype Unwrap<T> = T extends Promise<infer R> ? R : T;  // conditional",
            "note": {
              "en": "If you know Java generics, TypeScript generics will feel instantly familiar. The extra power (union types, infer, conditional types) comes naturally once you are comfortable with the basics.",
              "tr": "Java generic'lerini biliyorsanız TypeScript generic'leri anında tanıdık gelecektir. Ekstra güç (union type'lar, infer, conditional type'lar) temellerle rahat olduğunuzda doğal olarak gelir."
            },
            "note_en": "If you know Java generics, TypeScript generics will feel instantly familiar. The extra power (union types, infer, conditional types) comes naturally once you are comfortable with the basics."
          },
          {
            "type": "java-compare",
            "topic": "readonly vs final — and Readonly<T> utility (Q10 Deep Dive)",
            "why": {
              "en": "Q10 covers readonly — Java developers know 'final' prevents reassignment. TypeScript 'readonly' is the compile-time equivalent. Key additions: Readonly<T> utility type makes every property readonly at once, and 'as const' freezes literal values.",
              "tr": "S10 readonly'i kapsar — Java geliştiricileri 'final'in yeniden atamayı önlediğini bilir. TypeScript 'readonly' derleme zamanı eşdeğeridir. Temel eklemeler: Readonly<T> utility type tüm özellikleri bir anda readonly yapar ve 'as const' literal değerleri dondurur."
            },
            "why_en": "Q10 covers readonly — Java developers know 'final' prevents reassignment. TypeScript 'readonly' is the compile-time equivalent. Key additions: Readonly<T> utility type makes every property readonly at once, and 'as const' freezes literal values.",
            "java": "// Java: final — prevents reassignment\npublic class LoginPage {\n    private final String url;           // must assign in constructor\n    private final Page page;\n\n    public LoginPage(Page page) {\n        this.url  = \"/login\";           // must set here\n        this.page = page;\n    }\n    // this.url = \"/other\"; would be compile error\n\n    // Java has no built-in \"make all fields final\" utility\n    // You manually mark each field final — verbose!\n}",
            "typescript": "// TypeScript: readonly — same guarantee, cleaner syntax\nclass LoginPage {\n  readonly url  = \"/login\";       // like Java final field\n  readonly page: Page;            // must assign in constructor\n\n  constructor(page: Page) {\n    this.page = page;\n    // this.url = \"/other\";  // Compile error!\n  }\n}\n\n// Readonly<T> — make EVERY property readonly at once:\ninterface Config { baseUrl: string; retries: number; }\ntype FrozenConfig = Readonly<Config>;\nconst cfg: FrozenConfig = { baseUrl: \"https://app.com\", retries: 2 };\n// cfg.baseUrl = \"x\";  // Error — no Java equivalent (must mark each field)\n\n// \"as const\" — literal type + readonly (no Java equivalent):\nconst STATUS = [\"PASS\", \"FAIL\", \"SKIP\"] as const;\n// type: readonly [\"PASS\", \"FAIL\", \"SKIP\"]  — values AND type frozen",
            "note": {
              "en": "\"readonly\" = Java \"final\" for fields. \"Readonly<T>\" = automatic final on all fields — no Java equivalent. \"as const\" freezes both the type AND the value — very useful for test status enums.",
              "tr": "\"readonly\" = Java \"final\" alanlar için. \"Readonly<T>\" = tüm alanlarda otomatik final — Java eşdeğeri yok. \"as const\" hem tip hem değeri dondurur — test durumu enum'ları için çok kullanışlı."
            },
            "note_en": "\"readonly\" = Java \"final\" for fields. \"Readonly<T>\" = automatic final on all fields — no Java equivalent. \"as const\" freezes both the type AND the value — very useful for test status enums."
          },
          {
            "type": "error-dictionary",
            "framework": "Playwright TypeScript",
            "errors": [
              {
                "error": "TimeoutError: locator.click: Timeout 30000ms exceeded",
                "fullMessage": "TimeoutError: page.locator('button[type=\"submit\"]').click: Timeout 30000ms exceeded.\nWaiting for selector \"button[type=\\\"submit\\\"]\" to be visible.",
                "cause": {
                  "tr": "Locator hiçbir element bulamadı veya element timeout süresinde tıklanabilir (actionable) olmadı. Nedenler: yanlış selector, element henüz render edilmedi, element başka bir frame içinde.",
                  "en": "The locator matched no element or the element was not actionable within the timeout. Causes: wrong selector, element not yet rendered, element inside a different frame."
                },
                "solution": {
                  "tr": "1) Playwright Inspector ile selectoru doğrula: npx playwright codegen. 2) data-testid attribute ekle ve page.getByTestId() kullan. 3) Timeout'u artır: locator.click({ timeout: 60000 }). 4) Frame içindeyse: page.frameLocator() kullan.",
                  "en": "1) Validate selector with Playwright Inspector: npx playwright codegen. 2) Add data-testid and use page.getByTestId(). 3) Increase timeout: locator.click({ timeout: 60000 }). 4) If inside a frame: use page.frameLocator()."
                },
                "codeWrong": "// YANLIŞ — genel CSS selector, değişime açık\nawait page.locator('button').click();",
                "codeFixed": "// DOĞRU — data-testid ile stabil locator\nawait page.getByTestId('submit-btn').click();\n\n// veya rol + isim ile:\nawait page.getByRole('button', { name: 'Submit' }).click();"
              },
              {
                "error": "Error: strict mode violation: locator resolved to 2 elements",
                "fullMessage": "Error: strict mode violation: locator(\"input\") resolved to 2 elements:\n  1) <input type=\"text\" name=\"username\">\n  2) <input type=\"email\" name=\"email\">",
                "cause": {
                  "tr": "Locator sayfada birden fazla element buldu. Playwright strict modda varsayılan olarak tek bir element bekler.",
                  "en": "The locator matched more than one element. Playwright in strict mode expects exactly one element by default."
                },
                "solution": {
                  "tr": "Daha spesifik selector kullan: getByLabel, getByPlaceholder veya nth(). Ya da all() ile hepsini liste olarak al.",
                  "en": "Use a more specific selector: getByLabel, getByPlaceholder, or nth(). Alternatively use all() to get all matches as a list."
                },
                "codeWrong": "// YANLIŞ — çok genel, birden fazla eşleşiyor\nawait page.locator('input').fill('test@example.com');",
                "codeFixed": "// DOĞRU — etiket ile spesifik element\nawait page.getByLabel('Email address').fill('test@example.com');\n\n// veya nth() ile belirli indeks:\nawait page.locator('input').nth(1).fill('test@example.com');"
              },
              {
                "error": "Error: page has been closed",
                "fullMessage": "Error: page.goto: page has been closed\nCall log:\n  - navigating to \"https://example.com\"",
                "cause": {
                  "tr": "Test bitiminde browser context veya page zaten kapatılmış. Genellikle fixture teardown sırası yanlış veya bir önceki test başarısız olup page'i kapattı.",
                  "en": "The browser context or page was already closed when the action was attempted. Usually caused by incorrect fixture teardown order or a previous test failure closing the page."
                },
                "solution": {
                  "tr": "Playwright fixture'larını doğru kullan — page fixture'ı her test için otomatik oluşturulur ve temizlenir. Worker kapsamlı browser fixture'larında context'in açık olduğundan emin ol.",
                  "en": "Use Playwright fixtures correctly — the page fixture is automatically created and cleaned up per test. For worker-scoped browser fixtures, ensure the context is still open."
                },
                "codeWrong": "// YANLIŞ — page'i manuel kapatıp sonra kullanmaya çalışmak\nawait page.close();\nawait page.goto('/dashboard'); // Error!",
                "codeFixed": "// DOĞRU — fixture'lar sayfa ömrünü yönetir\ntest('dashboard loads', async ({ page }) => {\n  // page otomatik açılır ve test sonunda kapatılır\n  await page.goto('/dashboard');\n  await expect(page).toHaveTitle('Dashboard');\n}); // page burada otomatik kapanır"
              },
              {
                "error": "net::ERR_CONNECTION_REFUSED",
                "fullMessage": "Error: page.goto: net::ERR_CONNECTION_REFUSED at https://localhost:3000\nCall log:\n  - navigating to \"https://localhost:3000\"",
                "cause": {
                  "tr": "Hedef URL'e bağlantı reddedildi. Test çalışmadan önce uygulama başlatılmamış veya port numarası yanlış.",
                  "en": "Connection to the target URL was refused. The application was not started before tests ran, or the port number is wrong."
                },
                "solution": {
                  "tr": "1) Playwright webServer config ile uygulamayı otomatik başlat. 2) baseURL'i playwright.config.ts içinde doğru ayarla. 3) CI'da uygulama başlatma adımının test adımından önce geldiğini kontrol et.",
                  "en": "1) Use Playwright webServer config to auto-start the app. 2) Set baseURL correctly in playwright.config.ts. 3) In CI, verify the app start step runs before the test step."
                },
                "codeWrong": "// YANLIŞ — uygulama başlamadan test çalışıyor\nawait page.goto('http://localhost:3000');",
                "codeFixed": "// DOĞRU — playwright.config.ts\nexport default defineConfig({\n  webServer: {\n    command: 'npm run start',       // uygulamayı başlat\n    url: 'http://localhost:3000',   // hazır olana dek bekle\n    reuseExistingServer: !process.env.CI,\n  },\n  use: { baseURL: 'http://localhost:3000' },\n});"
              },
              {
                "error": "expect(locator).toBeVisible() → Error: Timeout 5000ms exceeded",
                "fullMessage": "Error: expect(received).toBeVisible()\nTimeout 5000ms exceeded.\nExpecting locator(\"[data-testid='success-toast']\") to be visible.",
                "cause": {
                  "tr": "Assertion timeout'u doldu — beklenen element görünür olmadı. Animasyon süresi, API yanıt gecikmesi veya yanlış selector nedeniyle olabilir.",
                  "en": "The assertion timeout expired — the expected element was not visible within the timeout. Possible causes: animation delay, API response latency, or wrong selector."
                },
                "solution": {
                  "tr": "1) expect timeout'unu artır: expect(locator).toBeVisible({ timeout: 10000 }). 2) Önce bir aksiyon bekle (navigation, API yanıtı). 3) waitFor() ile element hazır olana dek bekle.",
                  "en": "1) Increase assertion timeout: expect(locator).toBeVisible({ timeout: 10000 }). 2) Await an earlier action (navigation, API response). 3) Use waitFor() to wait until the element is ready."
                },
                "codeWrong": "// YANLIŞ — aksiyon tamamlanmadan assertion\nawait page.click('#save-btn');\nawait expect(page.getByText('Saved!')).toBeVisible(); // çok hızlı",
                "codeFixed": "// DOĞRU — yeterli timeout ile bekle\nawait page.click('#save-btn');\nawait expect(page.getByText('Saved!')).toBeVisible({ timeout: 10000 });\n\n// veya response bekliyorsan:\nconst [response] = await Promise.all([\n  page.waitForResponse('/api/save'),\n  page.click('#save-btn'),\n]);\nawait expect(page.getByText('Saved!')).toBeVisible();"
              },
              {
                "error": "TS2345: Argument of type 'string' is not assignable to parameter of type 'Browser'",
                "fullMessage": "src/helpers.ts:12:25 - error TS2345: Argument of type 'string' is not assignable to parameter of type 'Browser'.",
                "cause": {
                  "tr": "Fonksiyon enum tipi bekliyor ama string geçirildi. TypeScript string'i enum tipine otomatik olarak dönüştürmez.",
                  "en": "A function expects an enum type but received a plain string. TypeScript does not automatically coerce strings to enum types."
                },
                "solution": {
                  "tr": "Enum değerini kullan (Browser.CHROMIUM) veya string'i enum'a dönüştür. Eğer dışarıdan gelen değeri dönüştürmek gerekiyorsa as ile cast et.",
                  "en": "Use the enum value (Browser.CHROMIUM) or cast the string. If converting external input to enum, use as assertion."
                },
                "codeWrong": "// YANLIŞ — string enum yerine geçirilemiyor\nfunction runTest(browser: Browser) { ... }\nrunTest('chromium'); // TS2345 hatası",
                "codeFixed": "// DOĞRU — enum değeri kullan\nrunTest(Browser.CHROMIUM); // ✅\n\n// veya dışarıdan gelen string'i cast et:\nconst browserStr = process.env.BROWSER ?? 'chromium';\nrunTest(browserStr as Browser); // dikkatli kullan — doğrulama ekle"
              }
            ]
          },
          {
            "type": "quiz",
            "question": {
              "en": "Why should the 'any' type be avoided in test automation, and what is recommended instead?",
              "tr": "Test otomasyonunda 'any' tipi kullanmaktan neden kaçınılır ve onun yerine ne önerilir?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "any runs slower",
                  "tr": "any daha yavaş çalışır"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "any disables all type checking, so errors surface at runtime instead; use unknown when the type is genuinely not known",
                  "tr": "any tür denetimini tamamen kapatır, hatalar runtime'da ortaya çıkar; bilmediğin tipte unknown kullan"
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "any can only be used in test files",
                  "tr": "any sadece test dosyalarında kullanılabilir"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "any is automatically converted to string",
                  "tr": "any otomatik olarak string'e dönüştürülür"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "en": "`any` is an escape hatch — you can assign anything to it and call any method, and the compiler checks nothing. Those errors stay invisible until runtime, defeating TypeScript's whole purpose. `unknown` offers the same flexibility but FORCES you to narrow the type (e.g. a `typeof` check) before using it — which is why an unknown API response should always use `unknown`, never `any`.",
              "tr": "`any` bir kaçış kapısıdır — ona her şeyi atayabilir, herhangi bir metodu çağırabilirsin, derleyici hiçbir şeyi kontrol etmez. Bu hatalar çalışma zamanına kadar görünmez kalır, yani TypeScript'in tüm amacı ortadan kalkar. `unknown` ise aynı esnekliği verir ama kullanmadan önce tip daralması (type narrowing, örn. `typeof` kontrolü) yapmaya ZORLAR — bu yüzden bilinmeyen bir API yanıtı için her zaman `any` değil `unknown` kullanılmalı."
            },
            "retryQuestion": {
              "question": {
                "en": "You write `let data: unknown = await response.json()`. What happens if you try to access `data.name` directly?",
                "tr": "`let data: unknown = await response.json()` yazdın. `data.name` özelliğine doğrudan erişmeye çalışırsan ne olur?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "It works fine, behaving exactly like any",
                    "tr": "Çalışır, `any` ile aynı davranışı gösterir"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "TypeScript gives a compile error — you must narrow the type first (e.g. a typeof/in check)",
                    "tr": "TypeScript derleme hatası verir — önce tip daralması (örn. typeof/in kontrolü) yapman gerekir"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "It silently returns undefined at runtime",
                    "tr": "Runtime'da sessizce undefined döner"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "unknown automatically converts to any",
                    "tr": "unknown otomatik olarak any'e dönüşür"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "en": "Unlike `any`, `unknown` does not allow accessing ANY property/method without validation first — the compiler requires a type narrowing step like `typeof data === \"object\" && data !== null && \"name\" in data\"` before `data.name` is allowed. This restores the safety that `any` throws away: it forces you to actually validate an unknown API response before using it.",
                "tr": "`unknown`, `any`'den farklı olarak HİÇBİR property/metoda doğrulama yapmadan erişime izin vermez — derleyici, `data.name`'e erişmeden önce `typeof data === \"object\" && data !== null && \"name\" in data` gibi bir tip daralması ister. Bu, `any` kullanırken atlanan güvenliği geri getirir: bilinmeyen bir API yanıtını kullanmadan önce gerçekten doğrulamaya zorlar."
              }
            }
          }
        ]
      },
      {
        "title": {
          "en": "Practice & Reference",
          "tr": "Pratik Alıştırmalar & Hızlı Referans"
        },
        "blocks": [
          {
            "type": "heading",
            "content": {
              "en": "Exercise 1 — Define TestCase Interface",
              "tr": "Alıştırma 1 — TestCase Interface Tanımlama"
            },
            "difficulty": "🟢 Beginner"
          },
          {
            "type": "exercise",
            "difficulty": "🟢 Beginner",
            "title": {
              "en": "Build a TestCase Interface with Enum",
              "tr": "Enum ve Interface ile TestCase Oluştur"
            },
            "description": {
              "en": "Define a string enum `Priority` with values LOW, MEDIUM, HIGH, CRITICAL. Define a string enum `TestStatus` with PASS, FAIL, SKIP, BLOCKED. Define an interface `TestCase` with: id (number, readonly), title (string), description (optional string), status (TestStatus), priority (Priority), tags (string array), durationMs (number), and assignee (optional string). Create two TestCase objects: one for a passing login test and one for a failing payment test.",
              "tr": "LOW, MEDIUM, HIGH, CRITICAL değerlerine sahip `Priority` string enum'u ve PASS, FAIL, SKIP, BLOCKED değerlerine sahip `TestStatus` string enum'u tanımlayın. `TestCase` interface'ini tanımlayın: id (number, readonly), title (string), description (isteğe bağlı string), status (TestStatus), priority (Priority), tags (string dizisi), durationMs (number) ve assignee (isteğe bağlı string). İki TestCase nesnesi oluşturun: biri başarılı bir login testi, diğeri başarısız bir ödeme testi için."
            },
            "hint": {
              "en": "Use readonly for id, ? for optional properties, and string enum values like Status.PASS = 'PASS'. Remember both enums must be string enums for readable test output.",
              "tr": "id için readonly, isteğe bağlı özellikler için ? kullanın ve string enum değerlerini Status.PASS = 'PASS' şeklinde yazın. Her iki enum'un da okunabilir test çıktısı için string enum olması gerektiğini unutmayın."
            },
            "solution": "// ── Enums ────────────────────────────────────────────────────────\nenum Priority {\n  LOW      = \"LOW\",\n  MEDIUM   = \"MEDIUM\",\n  HIGH     = \"HIGH\",\n  CRITICAL = \"CRITICAL\",\n}\n\nenum TestStatus {\n  PASS    = \"PASS\",\n  FAIL    = \"FAIL\",\n  SKIP    = \"SKIP\",\n  BLOCKED = \"BLOCKED\",\n}\n\n// ── Interface ─────────────────────────────────────────────────────\ninterface TestCase {\n  readonly id:    number;          // immutable after creation\n  title:          string;          // test case title\n  description?:   string;          // optional detailed description\n  status:         TestStatus;      // must be a valid TestStatus value\n  priority:       Priority;        // must be a valid Priority value\n  tags:           string[];        // array of tag strings\n  durationMs:     number;          // execution time in milliseconds\n  assignee?:      string;          // optional QA engineer name\n}\n\n// ── Create typed test cases ────────────────────────────────────────\nconst loginTest: TestCase = {\n  id:          1,\n  title:       \"Login with valid credentials\",\n  description: \"Verify that a registered user can log in with correct email and password\",\n  status:      TestStatus.PASS,\n  priority:    Priority.CRITICAL,\n  tags:        [\"smoke\", \"auth\", \"regression\"],\n  durationMs:  1240,\n  assignee:    \"Alice\",\n};\n\nconst paymentTest: TestCase = {\n  id:        2,\n  title:     \"Complete checkout with credit card\",\n  status:    TestStatus.FAIL,\n  priority:  Priority.HIGH,\n  tags:      [\"e2e\", \"payment\"],\n  durationMs: 3800,\n  // description and assignee omitted — they are optional\n};\n\n// ── Print summary ─────────────────────────────────────────────────\n[loginTest, paymentTest].forEach((tc) => {\n  console.log(`[${tc.status}] ${tc.priority} — ${tc.title} (${tc.durationMs}ms)`);\n});",
            "explanation": {
              "en": "String enums produce readable values ('PASS', 'CRITICAL') in logs and reports instead of opaque numbers. The readonly modifier on id prevents tests from accidentally changing an identifier. Optional fields (?) let you create minimal test objects without boilerplate, while required fields enforce a complete, valid contract.",
              "tr": "String enum'lar log ve raporlarda anlaşılmaz sayılar yerine okunabilir değerler ('PASS', 'CRITICAL') üretir. id üzerindeki readonly modifier, testlerin tanımlayıcıyı yanlışlıkla değiştirmesini önler. İsteğe bağlı alanlar (?) gereksiz kod yazmadan minimal test nesneleri oluşturmanıza olanak tanır."
            }
          },
          {
            "type": "divider"
          },
          {
            "type": "heading",
            "content": {
              "en": "Exercise 2 — Generic ApiResponse<T> Wrapper",
              "tr": "Alıştırma 2 — Generic ApiResponse<T> Sarmalayıcı"
            },
            "difficulty": "🟡 Intermediate"
          },
          {
            "type": "exercise",
            "difficulty": "🟡 Intermediate",
            "title": {
              "en": "Generic API Response Wrapper with Type Guards",
              "tr": "Type Guard ile Generic API Yanıtı Sarmalayıcısı"
            },
            "description": {
              "en": "Create a generic interface `ApiResponse<T>` with fields: data (T | null), status (number), ok (boolean), error (string | null), requestId (string). Write a generic factory function `createApiResponse<T>` that takes data and status code and returns a correctly filled ApiResponse<T>. Write a type guard function `isSuccessResponse<T>` that returns true if ok is true and data is not null. Write a `parseUserResponse` function that takes `ApiResponse<unknown>` and validates it is a user (has id: number, name: string, email: string). Test with a 200 user response and a 404 error response.",
              "tr": "data (T | null), status (number), ok (boolean), error (string | null), requestId (string) alanlarına sahip generic `ApiResponse<T>` interface'i oluşturun. Veri ve durum kodu alan ve doğru doldurulmuş ApiResponse<T> döndüren generic `createApiResponse<T>` factory fonksiyonu yazın. ok true ve data null değilse true döndüren `isSuccessResponse<T>` type guard fonksiyonu yazın. `ApiResponse<unknown>` alan ve bunun bir user olduğunu doğrulayan `parseUserResponse` fonksiyonu yazın."
            },
            "hint": {
              "en": "The type guard should have the signature `(res: ApiResponse<T>): res is ApiResponse<NonNullable<T>>`. For the user validation function use the 'in' operator and typeof checks to validate the unknown data shape.",
              "tr": "Type guard'ın imzası `(res: ApiResponse<T>): res is ApiResponse<NonNullable<T>>` olmalıdır. User doğrulama fonksiyonu için 'in' operatörü ve typeof kontrollerini kullanın."
            },
            "solution": "// ── Generic response interface ────────────────────────────────────\ninterface ApiResponse<T> {\n  data:      T | null;   // null on error responses\n  status:    number;     // HTTP status code\n  ok:        boolean;    // true for 2xx\n  error:     string | null;\n  requestId: string;\n}\n\n// ── Factory function ─────────────────────────────────────────────\nlet reqCounter = 0;\n\nfunction createApiResponse<T>(data: T | null, status: number): ApiResponse<T> {\n  return {\n    data,\n    status,\n    ok:        status >= 200 && status < 300,\n    error:     status >= 400 ? `HTTP Error ${status}` : null,\n    requestId: `req-${++reqCounter}`,\n  };\n}\n\n// ── Type guard ───────────────────────────────────────────────────\n// Narrows ApiResponse<T> to ApiResponse<NonNullable<T>> — data is guaranteed non-null\nfunction isSuccessResponse<T>(res: ApiResponse<T>): res is ApiResponse<NonNullable<T>> {\n  return res.ok === true && res.data !== null;\n}\n\n// ── Interfaces ───────────────────────────────────────────────────\ninterface ApiUser { id: number; name: string; email: string }\n\n// ── Validation function ───────────────────────────────────────────\nfunction parseUserResponse(res: ApiResponse<unknown>): ApiUser {\n  if (!isSuccessResponse(res)) {\n    throw new Error(`Request failed: ${res.error ?? \"unknown error\"}`);\n  }\n  const d = res.data;                          // narrowed: not null/undefined\n  if (\n    typeof d !== \"object\"           ||\n    d === null                      ||\n    !(\"id\"    in d) || typeof (d as any).id    !== \"number\" ||\n    !(\"name\"  in d) || typeof (d as any).name  !== \"string\" ||\n    !(\"email\" in d) || typeof (d as any).email !== \"string\"\n  ) {\n    throw new Error(\"Response does not match ApiUser shape\");\n  }\n  return d as ApiUser;\n}\n\n// ── Test it ──────────────────────────────────────────────────────\nconst userResp  = createApiResponse({ id: 1, name: \"Alice\", email: \"alice@test.com\" }, 200);\nconst errorResp = createApiResponse<ApiUser>(null, 404);\n\nconsole.log(`OK response: ${userResp.ok}, id: ${userResp.data?.id}`);   // OK response: true, id: 1\nconsole.log(`Error:       ${errorResp.error}`);                          // Error: HTTP Error 404\n\nconst user = parseUserResponse(userResp);\nconsole.log(`Parsed user: ${user.name} <${user.email}>`);               // Parsed user: Alice <alice@test.com>\n\ntry {\n  parseUserResponse(errorResp);\n} catch (e) {\n  console.log(`Caught: ${(e as Error).message}`);                        // Caught: Request failed: HTTP Error 404\n}",
            "explanation": {
              "en": "Generics allow one `ApiResponse<T>` interface to correctly type the data field as User, Product, Order, or any other type. The type guard narrows the type so TypeScript knows data is non-null after the check. The runtime validation function bridges the gap between 'unknown API data' and your typed interface — essential for safe API test assertions.",
              "tr": "Generic'ler tek bir `ApiResponse<T>` interface'inin veri alanını User, Product, Order veya herhangi başka bir tip olarak doğru şekilde tiplemesine izin verir. Type guard, kontrol sonrasında data'nın null olmadığını TypeScript'in bilmesi için tipi daraltır."
            }
          },
          {
            "type": "divider"
          },
          {
            "type": "heading",
            "content": {
              "en": "Exercise 3 — Typed Playwright POM Base Class",
              "tr": "Alıştırma 3 — Tipli Playwright POM Base Class"
            },
            "difficulty": "🔴 Advanced"
          },
          {
            "type": "exercise",
            "difficulty": "🔴 Advanced",
            "title": {
              "en": "Generic Playwright POM Base Class with Fixtures",
              "tr": "Fixture'lı Generic Playwright POM Base Class"
            },
            "description": {
              "en": "Create an abstract class `PageObjectBase` that accepts `Page` from Playwright in its constructor. It should have: a protected abstract `path` property (string), a `navigate()` method that calls `page.goto`, a generic `getElement<T extends Locator>(selector: string): T` method, a protected `waitForSelector(selector: string, state?: 'visible'|'hidden'|'attached'|'detached')` helper, and an `expectUrl(expected: string)` assertion helper. Then create a concrete `LoginPage` that extends it with typed `login(creds: {email:string, password:string})`, `getErrorText()`, and `isLoggedIn()` methods. Finally show a typed fixture extension using `test.extend<{loginPage: LoginPage}>`.",
              "tr": "Constructor'ında Playwright'tan `Page` kabul eden abstract `PageObjectBase` class'ı oluşturun. Şunları içermeli: protected abstract `path` özelliği (string), `page.goto` çağıran `navigate()` metodu, generic `getElement<T extends Locator>(selector: string): T` metodu, protected `waitForSelector` yardımcısı ve `expectUrl` assertion yardımcısı. Ardından `LoginPage` somut class'ını oluşturun. Son olarak `test.extend<{loginPage: LoginPage}>` kullanarak tipli fixture uzantısını gösterin."
            },
            "hint": {
              "en": "Use `import { type Page, type Locator, test as base } from '@playwright/test'`. The abstract path property forces every page to declare its route. The generic getElement method preserves Locator subtype information.",
              "tr": "`import { type Page, type Locator, test as base } from '@playwright/test'` kullanın. Abstract path özelliği her page'in kendi route'unu bildirmesini zorunlu kılar."
            },
            "solution": "// ── Import types from Playwright ─────────────────────────────────\n// import { type Page, type Locator, test as base, expect } from \"@playwright/test\";\n\n// ── Interfaces ───────────────────────────────────────────────────\ninterface LoginCredentials {\n  email:    string;\n  password: string;\n}\n\n// ── Abstract base class ───────────────────────────────────────────\nabstract class PageObjectBase {\n  // Every concrete page must declare its path\n  protected abstract readonly path: string;\n\n  constructor(\n    protected readonly page: any,   // Page — typed as any for demo (use Playwright's Page in real code)\n    protected readonly baseUrl: string = \"https://staging.myapp.com\"\n  ) {}\n\n  // Navigate to this page's path\n  async navigate(): Promise<void> {\n    const fullUrl = `${this.baseUrl}${this.path}`;\n    console.log(`→ goto: ${fullUrl}`);\n    // await this.page.goto(fullUrl);\n    // await this.page.waitForLoadState(\"domcontentloaded\");\n  }\n\n  // Generic element getter — preserves Locator subtype\n  protected getElement<T = any>(selector: string): T {\n    // return this.page.locator(selector) as T;\n    console.log(`→ locator: ${selector}`);\n    return { selector } as T;\n  }\n\n  // Protected helper — only page objects and subclasses can call this\n  protected async waitForSelector(\n    selector: string,\n    state: \"visible\" | \"hidden\" | \"attached\" | \"detached\" = \"visible\"\n  ): Promise<void> {\n    console.log(`→ wait for ${selector} to be ${state}`);\n    // await this.page.locator(selector).waitFor({ state });\n  }\n\n  // Assertion helper — usable in any page object\n  async expectUrl(expected: string): Promise<void> {\n    const current = `${this.baseUrl}${this.path}`;\n    const ok = current.includes(expected);\n    console.log(`→ URL check: ${ok ? \"PASS\" : \"FAIL\"} (expected to include: ${expected})`);\n    // await expect(this.page).toHaveURL(new RegExp(expected));\n  }\n}\n\n// ── Concrete LoginPage ────────────────────────────────────────────\nclass LoginPage extends PageObjectBase {\n  protected readonly path = \"/login\";   // must implement abstract property\n\n  // Private typed locators — selectors are an implementation detail\n  private get emailInput()    { return this.getElement('[data-testid=\"email-input\"]'); }\n  private get passwordInput() { return this.getElement('[data-testid=\"password-input\"]'); }\n  private get submitButton()  { return this.getElement('[data-testid=\"login-submit\"]'); }\n  private get errorMsg()      { return this.getElement('[data-testid=\"error-message\"]'); }\n  private get userMenu()      { return this.getElement('[data-testid=\"user-menu\"]'); }\n\n  // Typed login method — accepts our LoginCredentials interface\n  async login(creds: LoginCredentials): Promise<void> {\n    console.log(`→ fill email: ${creds.email}`);\n    console.log(`→ fill password: ***`);\n    console.log(`→ click submit`);\n    // await this.emailInput.fill(creds.email);\n    // await this.passwordInput.fill(creds.password);\n    // await this.submitButton.click();\n  }\n\n  // Returns string — callers always get a string (no null handling needed)\n  async getErrorText(): Promise<string> {\n    await this.waitForSelector('[data-testid=\"error-message\"]');\n    return \"Invalid email or password\";   // would be: await this.errorMsg.innerText()\n  }\n\n  // Returns boolean — clean assertion-ready API\n  async isLoggedIn(): Promise<boolean> {\n    return true;   // would be: await this.userMenu.isVisible()\n  }\n}\n\n// ── Typed Playwright fixture extension ────────────────────────────\n// const test = base.extend<{ loginPage: LoginPage }>({\n//   loginPage: async ({ page }, use) => {\n//     const lp = new LoginPage(page);\n//     await use(lp);\n//   },\n// });\n//\n// Usage in tests:\n// test(\"login flow\", async ({ loginPage }) => {\n//   await loginPage.navigate();\n//   await loginPage.login({ email: \"qa@test.com\", password: \"Pass123\" });\n//   expect(await loginPage.isLoggedIn()).toBe(true);\n// });\n\n// ── Demo output ───────────────────────────────────────────────────\nconst demoPage = new LoginPage(null);\ndemoPage.navigate().then(async () => {\n  await demoPage.login({ email: \"qa@test.com\", password: \"Pass123\" });\n  const loggedIn = await demoPage.isLoggedIn();\n  console.log(`→ isLoggedIn: ${loggedIn}`);\n  await demoPage.expectUrl(\"/login\");\n});",
            "explanation": {
              "en": "Abstract classes enforce that every page declares its own path, preventing forgetting to set the route. Protected access on helpers and locators keeps the public API clean — test code only sees navigate, login, getErrorText, isLoggedIn. The generic getElement preserves type information from Playwright's Locator hierarchy. The fixture extension pattern makes the typed page object available in every test that needs it without manually constructing it — this is the standard Playwright TypeScript pattern for large projects.",
              "tr": "Abstract class'lar her sayfanın kendi yolunu bildirmesini zorunlu kılar. Yardımcılarda ve locator'larda protected/private erişim, public API'yi temiz tutar — test kodu yalnızca navigate, login, getErrorText ve isLoggedIn gibi public metodları görür. Fixture uzantısı kalıbı, tipli page object'i onu manuel olarak oluşturmadan her testte kullanılabilir kılar."
            }
          },
          {
            "type": "heading",
            "content": {
              "en": "Quick Reference: TypeScript Features",
              "tr": "Hızlı Referans: TypeScript Özellikleri"
            },
            "difficulty": "🟢 Beginner"
          },
          {
            "type": "table",
            "headers": [
              {
                "en": "Feature",
                "tr": "Özellik"
              },
              {
                "en": "Syntax",
                "tr": "Söz Dizimi"
              },
              {
                "en": "When to Use",
                "tr": "Ne Zaman Kullanılır"
              }
            ],
            "rows": [
              [
                {
                  "en": "String enum",
                  "tr": "String enum"
                },
                {
                  "en": "enum E { A = 'A' }",
                  "tr": "enum E { A = 'A' }"
                },
                {
                  "en": "Status, browser, env constants — readable in logs",
                  "tr": "Durum, tarayıcı, ortam sabitleri — loglarda okunabilir"
                }
              ],
              [
                {
                  "en": "Interface",
                  "tr": "Interface"
                },
                {
                  "en": "interface Foo { x: string }",
                  "tr": "interface Foo { x: string }"
                },
                {
                  "en": "Object shapes, class contracts, POM types",
                  "tr": "Nesne şekilleri, class sözleşmeleri, POM tipleri"
                }
              ],
              [
                {
                  "en": "Type alias",
                  "tr": "Type alias"
                },
                {
                  "en": "type ID = string | number",
                  "tr": "type ID = string | number"
                },
                {
                  "en": "Unions, primitives, computed/complex types",
                  "tr": "Union'lar, primitifler, hesaplanmış/karmaşık tipler"
                }
              ],
              [
                {
                  "en": "Optional prop",
                  "tr": "İsteğe bağlı özellik"
                },
                {
                  "en": "{ x?: string }",
                  "tr": "{ x?: string }"
                },
                {
                  "en": "Config overrides, partial test data objects",
                  "tr": "Config override'lar, kısmi test veri nesneleri"
                }
              ],
              [
                {
                  "en": "Readonly prop",
                  "tr": "Readonly özellik"
                },
                {
                  "en": "{ readonly id: number }",
                  "tr": "{ readonly id: number }"
                },
                {
                  "en": "IDs, URLs, tokens that must not change",
                  "tr": "Değişmemesi gereken ID'ler, URL'ler, token'lar"
                }
              ],
              [
                {
                  "en": "Generic function",
                  "tr": "Generic fonksiyon"
                },
                {
                  "en": "function f<T>(x: T): T",
                  "tr": "function f<T>(x: T): T"
                },
                {
                  "en": "Factories, wrappers, utility functions",
                  "tr": "Factory'ler, sarmalayıcılar, utility fonksiyonlar"
                }
              ],
              [
                {
                  "en": "Generic interface",
                  "tr": "Generic interface"
                },
                {
                  "en": "interface R<T> { data: T }",
                  "tr": "interface R<T> { data: T }"
                },
                {
                  "en": "API responses, repositories, collections",
                  "tr": "API yanıtları, repository'ler, koleksiyonlar"
                }
              ],
              [
                {
                  "en": "Partial<T>",
                  "tr": "Partial<T>"
                },
                {
                  "en": "Partial<Config>",
                  "tr": "Partial<Config>"
                },
                {
                  "en": "Config overrides, optional test data factories",
                  "tr": "Config override'lar, isteğe bağlı test data factory'leri"
                }
              ],
              [
                {
                  "en": "Pick<T,K>",
                  "tr": "Pick<T,K>"
                },
                {
                  "en": "Pick<User, 'email'|'role'>",
                  "tr": "Pick<User, 'email'|'role'>"
                },
                {
                  "en": "Auth-only fixtures, slim DTO types",
                  "tr": "Auth-only fixture'lar, ince DTO tipleri"
                }
              ],
              [
                {
                  "en": "Omit<T,K>",
                  "tr": "Omit<T,K>"
                },
                {
                  "en": "Omit<User, 'password'>",
                  "tr": "Omit<User, 'password'>"
                },
                {
                  "en": "Safe fixture types without sensitive fields",
                  "tr": "Hassas alanlar olmadan güvenli fixture tipleri"
                }
              ],
              [
                {
                  "en": "Record<K,V>",
                  "tr": "Record<K,V>"
                },
                {
                  "en": "Record<Browser, number>",
                  "tr": "Record<Browser, number>"
                },
                {
                  "en": "Typed maps: timeout per browser, URL per env",
                  "tr": "Tipli haritalar: tarayıcı başına timeout, ortam başına URL"
                }
              ],
              [
                {
                  "en": "Type guard",
                  "tr": "Type guard"
                },
                {
                  "en": "x is MyType",
                  "tr": "x is MyType"
                },
                {
                  "en": "Validate unknown API responses at runtime",
                  "tr": "Çalışma zamanında bilinmeyen API yanıtlarını doğrula"
                }
              ],
              [
                {
                  "en": "Non-null assert",
                  "tr": "Non-null assert"
                },
                {
                  "en": "value!",
                  "tr": "value!"
                },
                {
                  "en": "Only when you are certain value is not null/undefined",
                  "tr": "Yalnızca değerin kesinlikle null/undefined olmadığından emin olduğunuzda"
                }
              ],
              [
                {
                  "en": "Satisfies",
                  "tr": "Satisfies"
                },
                {
                  "en": "obj satisfies Type",
                  "tr": "obj satisfies Type"
                },
                {
                  "en": "Validate config without losing literal types (TS 4.9+)",
                  "tr": "Literal tipleri kaybetmeden config doğrula (TS 4.9+)"
                }
              ],
              [
                {
                  "en": "Template literal type",
                  "tr": "Template literal type"
                },
                {
                  "en": "`${Env}.myapp.com`",
                  "tr": "`${Env}.myapp.com`"
                },
                {
                  "en": "Type-safe URL patterns, event names, route strings",
                  "tr": "Type-safe URL kalıpları, event adları, route string'leri"
                }
              ]
            ]
          },
          {
            "type": "tip",
            "content": {
              "en": "Bookmark the TypeScript Playground at typescriptlang.org/play — paste any snippet and see the compiled JavaScript, type errors, and hover types instantly. It is the fastest way to experiment with TypeScript concepts without setting up a project.",
              "tr": "typescriptlang.org/play adresindeki TypeScript Playground'u yer imlerine ekleyin — herhangi bir kod parçasını yapıştırın ve derlenmiş JavaScript'i, tür hatalarını ve hover tiplerini anında görün. Proje kurmadan TypeScript kavramlarını denemenin en hızlı yoludur."
            }
          },
          {
            "type": "quiz",
            "question": {
              "en": "What is the purpose of defining a generic `ApiResponse<T>` wrapper type?",
              "tr": "Generic bir `ApiResponse<T>` sarmalayıcı tipi tanımlamanın amacı nedir?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "It makes API calls faster",
                  "tr": "API çağrılarını hızlandırır"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "It lets each endpoint's different data shape reuse a common wrapper structure (e.g. status/data/error) with full type safety",
                  "tr": "Her endpoint'in farklı veri şeklini, ortak bir sarmalayıcı yapıyı (status/data/error gibi) tip güvenliğiyle tekrar kullanmayı sağlar"
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "It only works for string-type responses",
                  "tr": "Sadece string tipindeki yanıtlar için çalışır"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "It automatically retries network errors",
                  "tr": "Network hatalarını otomatik olarak retry eder"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "en": "A generic type like `ApiResponse<T>` defines the common envelope `{ status: number, data: T, error?: string }` ONCE; you substitute `T` with each endpoint's real data type like `User`, `Product`, `OrderResult`. Same logic as a generic `ApiResponse<T>` class in Java — you get type safety per endpoint without duplicating the wrapper.",
              "tr": "`ApiResponse<T>` gibi bir generic tip, `{ status: number, data: T, error?: string }` şeklindeki ortak zarfı BİR kez tanımlar; `T` yerine `User`, `Product`, `OrderResult` gibi her endpoint'in gerçek veri tipini geçirirsin. Java'daki generic bir `ApiResponse<T>` sınıfıyla aynı mantık — kod tekrarı olmadan her endpoint için tip güvenliği kazanırsın."
            },
            "retryQuestion": {
              "question": {
                "en": "Without the generic `ApiResponse<T>` type, if you wrote a SEPARATE response wrapper type for each endpoint (UserResponse, ProductResponse, OrderResponse), what would be the main downside?",
                "tr": "`ApiResponse<T>` generic tipi olmadan, her endpoint için (User, Product, Order) AYRI bir response wrapper tipi (UserResponse, ProductResponse, OrderResponse) yazsaydın, temel dezavantajı ne olurdu?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "The compiler could not type-check any of them",
                    "tr": "Derleyici hiçbirini tip kontrolü yapamaz"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "You'd have to repeat the {status, data, error} envelope shape in every type — changing one field means updating it in N places",
                    "tr": "{status, data, error} zarf şeklini her tipte tekrar yazman gerekirdi — bir alanı değiştirmek N yerde güncelleme ister"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "TypeScript does not support defining multiple interfaces",
                    "tr": "TypeScript birden fazla interface tanımlamayı desteklemez"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "API responses could no longer be parsed as JSON",
                    "tr": "API yanıtları artık JSON olarak parse edilemezdi"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "en": "Without generics, the common envelope shape ({status, data, error}) gets COPIED into every separate response type. If you need to add a field to the envelope (e.g. a `requestId`), you must update UserResponse, ProductResponse, and OrderResponse individually — with a generic `ApiResponse<T>`, that change happens in one place and automatically propagates to every usage.",
                "tr": "Generic olmadan, ortak zarf yapısı ({status, data, error}) her ayrı response tipinde KOPYALANIR. Zarfa yeni bir alan eklemen gerekirse (örn. bir `requestId`), bunu UserResponse, ProductResponse, OrderResponse'un hepsinde tek tek güncellemen gerekir — generic bir `ApiResponse<T>` ile bu değişiklik tek bir yerde yapılır ve her kullanıma otomatik yayılır."
              }
            }
          }
        ]
      }
    ]
  },
  "tr": {
    "hero": {
      "title": "🔷 TypeScript",
      "subtitle": "Playwright ve Test Otomasyonu için TypeScript",
      "intro": "Modern test otomasyonu için TypeScript öğrenin. Tür temellerinden ileri düzey Playwright desenlerine kadar — tam IDE desteği, otomatik tamamlama ve derleme zamanı hata yakalama ile daha güvenli, daha kolay bakım yapılabilir testler yazın."
    },
    "tabs": [
      "🎯 Giriş & Neden",
      "📦 Kurulum",
      "🔷 Basit & Özel Tipler",
      "📚 Diziler & Tuple'lar",
      "📦 Nesne Tipleri & Enum'lar",
      "🤝 Interface & Type Aliases",
      "⚙️ Fonksiyonlar & Tip Dönüştürme",
      "🏛️ Sınıflar & Decorator'lar",
      "🧩 Generic'ler",
      "🛠️ Utility Tipleri & Keyof",
      "📝 Template Literaller & Null",
      "🐛 Hata Yönetimi & Gelişmiş Tipler",
      "🧪 QA Kullanım",
      "☕ Java → TS",
      "🏃 Test Runner'lar",
      "💼 Mülakat",
      "📝 Alıştırmalar & Referans"
    ],
    "sections": [
      {
        "title": {
          "en": "Intro & Why TypeScript",
          "tr": "TypeScript Nedir & Neden Kullanmalı?"
        },
        "blocks": [
          {
            "type": "heading",
            "content": {
              "en": "TypeScript vs JavaScript",
              "tr": "TypeScript vs JavaScript"
            }
          },
          {
            "type": "text",
            "content": {
              "en": "TypeScript is a statically typed superset of JavaScript developed by Microsoft. Every valid JavaScript file is also valid TypeScript — you adopt it incrementally without rewriting your entire codebase. TypeScript adds a compile step that catches type errors, undefined property accesses, and wrong argument types before your code ever runs, turning runtime surprises into development-time feedback.",
              "tr": "TypeScript, Microsoft tarafından geliştirilen, statik olarak tiplenmiş bir JavaScript üst kümesidir. Her geçerli JavaScript dosyası aynı zamanda geçerli bir TypeScript dosyasıdır — tüm kod tabanınızı yeniden yazmadan kademeli olarak benimseyebilirsiniz. TypeScript, tür hatalarını, tanımsız özellik erişimlerini ve yanlış argüman tiplerini kodunuz çalışmadan önce yakalayan bir derleme adımı ekler."
            }
          },
          {
            "type": "heading",
            "content": {
              "en": "Why TypeScript for Test Automation?",
              "tr": "Test Otomasyonu için Neden TypeScript?"
            },
            "difficulty": "🟢 Beginner"
          },
          {
            "type": "grid",
            "cols": 3,
            "items": [
              {
                "icon": {
                  "en": "🐛",
                  "tr": "🐛"
                },
                "label": {
                  "en": "Catch Errors Early",
                  "tr": "Hataları Erken Yakala"
                },
                "desc": {
                  "en": "Type errors surface at compile time in your IDE — not at 2 AM when a test suite fails in CI.",
                  "tr": "Tür hataları IDE'nizde derleme zamanında ortaya çıkar — CI'da gece 2'de test paketi başarısız olduğunda değil."
                }
              },
              {
                "icon": {
                  "en": "💡",
                  "tr": "💡"
                },
                "label": {
                  "en": "IDE Autocomplete",
                  "tr": "IDE Otomatik Tamamlama"
                },
                "desc": {
                  "en": "Full IntelliSense for Playwright's Page, Locator, Browser, and your own Page Objects — no more guessing method names.",
                  "tr": "Playwright'ın Page, Locator, Browser ve kendi Page Object'leriniz için tam IntelliSense — metod adlarını artık tahmin etmek yok."
                }
              },
              {
                "icon": {
                  "en": "🔧",
                  "tr": "🔧"
                },
                "label": {
                  "en": "Safe Refactoring",
                  "tr": "Güvenli Yeniden Düzenleme"
                },
                "desc": {
                  "en": "Rename a method or change a selector type and TypeScript instantly highlights every affected call site.",
                  "tr": "Bir metod adını veya seçici tipini değiştirin; TypeScript etkilenen tüm çağrı noktalarını anında gösterir."
                }
              },
              {
                "icon": {
                  "en": "📖",
                  "tr": "📖"
                },
                "label": {
                  "en": "Self-Documenting Code",
                  "tr": "Kendini Belgeleyen Kod"
                },
                "desc": {
                  "en": "Type signatures act as inline documentation. A function typed `(user: User): Promise<void>` explains itself without comments.",
                  "tr": "Tip imzaları satır içi dokümantasyon görevi görür. `(user: User): Promise<void>` olarak tiplenmiş bir fonksiyon kendini açıklar."
                }
              },
              {
                "icon": {
                  "en": "👥",
                  "tr": "👥"
                },
                "label": {
                  "en": "Team Scale",
                  "tr": "Takım Ölçeği"
                },
                "desc": {
                  "en": "Large QA teams benefit most — typed interfaces enforce contracts between page objects, fixtures, and test data factories.",
                  "tr": "Büyük QA takımları en çok yararlanır — tipli interface'ler page object'ler, fixture'lar ve test data factory'leri arasındaki sözleşmeleri zorunlu kılar."
                }
              },
              {
                "icon": {
                  "en": "🎭",
                  "tr": "🎭"
                },
                "label": {
                  "en": "Playwright Native",
                  "tr": "Playwright Native"
                },
                "desc": {
                  "en": "Playwright is written in TypeScript and ships first-class .d.ts definitions. TypeScript is the officially recommended language for Playwright.",
                  "tr": "Playwright TypeScript ile yazılmıştır ve birinci sınıf .d.ts tanımları içerir. TypeScript, Playwright için resmi olarak önerilen dildir."
                }
              }
            ]
          },
          {
            "type": "heading",
            "content": {
              "en": "TypeScript vs JavaScript: Feature Comparison",
              "tr": "TypeScript vs JavaScript: Özellik Karşılaştırması"
            }
          },
          {
            "type": "table",
            "headers": [
              {
                "en": "Feature",
                "tr": "Özellik"
              },
              {
                "en": "JavaScript",
                "tr": "JavaScript"
              },
              {
                "en": "TypeScript",
                "tr": "TypeScript"
              }
            ],
            "rows": [
              [
                {
                  "en": "Type safety",
                  "tr": "Tür güvenliği"
                },
                {
                  "en": "None (dynamic)",
                  "tr": "Yok (dinamik)"
                },
                {
                  "en": "Static, optional",
                  "tr": "Statik, isteğe bağlı"
                }
              ],
              [
                {
                  "en": "IDE support",
                  "tr": "IDE desteği"
                },
                {
                  "en": "Basic",
                  "tr": "Temel"
                },
                {
                  "en": "Full IntelliSense + autocomplete",
                  "tr": "Tam IntelliSense + otomatik tamamlama"
                }
              ],
              [
                {
                  "en": "Compile step",
                  "tr": "Derleme adımı"
                },
                {
                  "en": "None — runs directly",
                  "tr": "Yok — doğrudan çalışır"
                },
                {
                  "en": "tsc compiles to .js",
                  "tr": "tsc ile .js'e derlenir"
                }
              ],
              [
                {
                  "en": "Learning curve",
                  "tr": "Öğrenme eğrisi"
                },
                {
                  "en": "Low",
                  "tr": "Düşük"
                },
                {
                  "en": "Low→Medium (types add concepts)",
                  "tr": "Düşük→Orta (tipler kavram ekler)"
                }
              ],
              [
                {
                  "en": "Playwright support",
                  "tr": "Playwright desteği"
                },
                {
                  "en": "Supported",
                  "tr": "Destekleniyor"
                },
                {
                  "en": "First-class, recommended",
                  "tr": "Birinci sınıf, önerilen"
                }
              ],
              [
                {
                  "en": "Error detection time",
                  "tr": "Hata algılama zamanı"
                },
                {
                  "en": "Runtime (tests fail)",
                  "tr": "Çalışma zamanı (testler başarısız)"
                },
                {
                  "en": "Compile time (before running)",
                  "tr": "Derleme zamanı (çalıştırmadan önce)"
                }
              ]
            ]
          },
          {
            "type": "heading",
            "content": {
              "en": "TypeScript in the Testing Ecosystem",
              "tr": "Test Ekosisteminde TypeScript"
            }
          },
          {
            "type": "table",
            "headers": [
              {
                "en": "Tool",
                "tr": "Araç"
              },
              {
                "en": "TS Support",
                "tr": "TS Desteği"
              },
              {
                "en": "Notes",
                "tr": "Notlar"
              }
            ],
            "rows": [
              [
                {
                  "en": "Playwright",
                  "tr": "Playwright"
                },
                {
                  "en": "First-class",
                  "tr": "Birinci sınıf"
                },
                {
                  "en": "Written in TS; all types ship in the package",
                  "tr": "TS ile yazılmış; tüm tipler pakette mevcut"
                }
              ],
              [
                {
                  "en": "Jest",
                  "tr": "Jest"
                },
                {
                  "en": "Excellent (via ts-jest)",
                  "tr": "Mükemmel (ts-jest ile)"
                },
                {
                  "en": "Install ts-jest + @types/jest",
                  "tr": "ts-jest + @types/jest kur"
                }
              ],
              [
                {
                  "en": "Cypress",
                  "tr": "Cypress"
                },
                {
                  "en": "Good",
                  "tr": "İyi"
                },
                {
                  "en": "Include tsconfig; some any-heavy internals",
                  "tr": "tsconfig ekle; bazı any-ağırlıklı iç kısımlar"
                }
              ],
              [
                {
                  "en": "Vitest",
                  "tr": "Vitest"
                },
                {
                  "en": "Native",
                  "tr": "Native"
                },
                {
                  "en": "Built on Vite; zero-config TypeScript",
                  "tr": "Vite üzerine kurulu; sıfır konfigürasyon TypeScript"
                }
              ]
            ]
          },
          {
            "type": "tip",
            "content": {
              "en": "If you're starting a new Playwright project today, choose TypeScript from the first `npm init playwright@latest` prompt. Retrofitting types into a large JS test suite is far harder than starting typed.",
              "tr": "Bugün yeni bir Playwright projesi başlatıyorsanız, ilk `npm init playwright@latest` komutundan TypeScript'i seçin. Büyük bir JS test paketine sonradan tip eklemek, baştan tipli başlamaktan çok daha zordur."
            }
          },
          {
            "type": "simple-box",
            "emoji": "🛡️",
            "content": {
              "tr": "TypeScript, emniyet kemeri takılmış bir araba gibidir. JavaScript ise kemersiz hız yapmaktır — kaza anında (hata durumunda) emniyet kemeri hayat kurtarır ve sizi korur.",
              "en": "TypeScript is like a car with a seatbelt fastened. JavaScript is speeding without a belt — the seatbelt saves your life and protects you during an accident (error)."
            }
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "Neden Derleme Zamanı Kontrolü? JavaScript dinamik bir dildir; hatalar ancak kod çalışırken (runtime) ortaya çıkar. TypeScript ise kod çalışmadan önce türleri kontrol ederek olası çökmeleri önler.",
              "en": "Why Compile-Time Checks? JavaScript is dynamic; errors only surface during execution (runtime). TypeScript prevents crashes by checking types before execution."
            }
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "Geliştirici Verimliliği: Kod yazarken IDE'nin size otomatik tamamlama (IntelliSense) sunması, metod isimlerini ezberleme ihtiyacını ortadan kaldırır ve yazım hatalarını sıfıra indirir.",
              "en": "Developer Productivity: Having the IDE suggest autocomplete options (IntelliSense) eliminates the need to memorize method names and reduces typos to zero."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: Her LEGO parçasının üzerindeki çıkıntıların boyutu ve şekli bellidir. Yanlış boyuttaki iki parçayı (yanlış türdeki iki veriyi) birleştirmeye çalışırsanız birbirine oturmazlar.",
              "en": "LEGO analogy: Each LEGO piece has a fixed stud size and shape. If you try to join two pieces of the wrong size (two data types of different shapes), they won't fit."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: TypeScript, LEGO setinin içinden çıkan yapım kılavuzu gibidir. Hangi parçanın nereye takılması gerektiğini size adım adım gösterir ve yanlış parça kullanımını engeller.",
              "en": "LEGO analogy: TypeScript is like the instruction manual in a LEGO set. It shows you step-by-step where each piece goes and prevents you from using the wrong brick."
            }
          },
          {
            "type": "quiz",
            "question": {
              "tr": "TypeScript kodunun doğrudan tarayıcıda çalışmamasının nedeni nedir?",
              "en": "Why can't TypeScript code run directly in the browser?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "tr": "Tarayıcılar sadece JavaScript motorlarına sahiptir, derleme adımı (.ts -> .js) zorunludur",
                  "en": "Browsers only have JavaScript engines, so compilation (.ts -> .js) is required"
                }
              },
              {
                "id": "b",
                "text": {
                  "tr": "TypeScript çok yavaştır",
                  "en": "TypeScript is too slow"
                }
              },
              {
                "id": "c",
                "text": {
                  "tr": "TypeScript sadece sunucuda çalışabilir",
                  "en": "TypeScript can only run on servers"
                }
              },
              {
                "id": "d",
                "text": {
                  "tr": "Tarayıcıların TypeScript motoru paralıdır",
                  "en": "Browsers charge a fee for TypeScript engines"
                }
              }
            ],
            "correct": "a",
            "explanation": {
              "tr": "Tarayıcılar (Chrome, Firefox vb.) yalnızca JavaScript kodunu anlar. Bu yüzden TypeScript derleyicisi (tsc) kodu standart JavaScript'e (.js) dönüştürmelidir.",
              "en": "Browsers (Chrome, Firefox, etc.) only understand JavaScript code. Therefore, the TypeScript compiler (tsc) must transform TS into standard JavaScript (.js)."
            },
            "retryQuestion": {
              "question": {
                "tr": "tsc komutu çalıştırıldığında ne üretilir?",
                "en": "What is generated when the tsc command is executed?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "tr": "Bir yürütülebilir .exe dosyası",
                    "en": "An executable .exe file"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "tr": "Düz bir .js (JavaScript) dosyası",
                    "en": "A plain .js (JavaScript) file"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "tr": "Bir PDF raporu",
                    "en": "A PDF report"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "tr": "Bir HTML sayfası",
                    "en": "An HTML page"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "tr": "tsc (TypeScript Compiler), .ts uzantılı kaynak kod dosyalarını tarayıcıda veya Node.js'te çalışabilecek düz .js dosyalarına derler.",
                "en": "tsc (TypeScript Compiler) compiles .ts source files into plain .js files that can execute in the browser or Node.js."
              }
            }
          },
          {
            "type": "quiz",
            "question": {
              "en": "What is TypeScript's core value proposition in test automation?",
              "tr": "TypeScript'in test otomasyonundaki temel değer önerisi nedir?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "Makes tests run faster",
                  "tr": "Testleri daha hızlı çalıştırır"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "Catches type errors at compile time, before tests even run in CI",
                  "tr": "Tür hatalarını derleme zamanında yakalar, testler CI'da çalışmadan önce"
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "Tarayıcı ihtiyacını ortadan kaldırır",
                  "tr": "Tarayıcı ihtiyacını ortadan kaldırır"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "Automatically runs tests in parallel",
                  "tr": "Testleri otomatik olarak paralel çalıştırır"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "en": "TypeScript adds a compile step: type errors, undefined property access, and wrong argument types become visible in the IDE before the code ever runs. This shifts the feedback loop from a test suite silently failing in CI at 2am to seeing the problem the moment you write it — it has nothing to do with speed or parallelism.",
              "tr": "TypeScript bir derleme adımı ekler: tür hataları, tanımsız özellik erişimleri ve yanlış argüman tipleri kodun hiç çalışmadan önce IDE'de görünür hale gelir. Bu, gece 2'de CI'da sessizce başarısız olan bir test paketinden, sorunu yazarken anında gösteren bir geri bildirim döngüsüne geçiştir — hız veya paralellikle ilgisi yoktur."
            },
            "retryQuestion": {
              "question": {
                "en": "What happens if a developer writes `let count: number = \"5\"`?",
                "tr": "Bir geliştirici `let count: number = \"5\"` yazarsa ne olur?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "The code runs fine, count holds the string \"5\"",
                    "tr": "Kod çalışır, count değişkeni \"5\" string'ini tutar"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "The TypeScript compiler reports a type error before the code ever runs",
                    "tr": "TypeScript derleyicisi kodu çalıştırmadan önce bir tip hatası verir"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "The JavaScript runtime throws an exception",
                    "tr": "JavaScript runtime'ı bir exception fırlatır"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "TypeScript automatically converts the string to a number",
                    "tr": "TypeScript string'i otomatik olarak sayıya çevirir"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "en": "This is compile-time type safety in action: `\"5\"` is a string literal, not assignable to `number`, and the compiler flags it with a red squiggly in the IDE before the code ever runs. Runtime never even gets involved — the error is visible the moment it is written.",
                "tr": "Bu, derleme zamanı tip güvenliğinin somut bir örneğidir: `\"5\"` bir string literal'dir, `number` tipine atanamaz, ve derleyici bunu kod hiç çalışmadan IDE'de kırmızı çizgiyle işaretler. Çalışma zamanı hiç devreye girmez — hata yazarken anında görünür."
              }
            }
          },
          {
            "type": "ts-mini-hero",
            "promptTr": "Sana bir şey soracağım: TypeScript ile JavaScript arasındaki en büyük fark nedir? Teknik terim kullanmadan, sanki 5 yaşındaki birine anlatır gibi açıkla!",
            "promptEn": "I have a question: what's the biggest difference between TypeScript and JavaScript? No jargon — explain it like I'm 5!",
            "keywords": [
              [
                "derleme",
                "compile",
                "yazarken",
                "yazmadan"
              ],
              "hata",
              [
                "güvenli",
                "safe",
                "güvenlik"
              ],
              [
                "tip",
                "type"
              ],
              [
                "kontrol",
                "check"
              ]
            ],
            "modelAnswerTr": "TypeScript, JavaScript'e 'tip etiketleri' ekler. Bir kutu 'sadece sayı' diye etiketlenir — yanlış bir şey koymaya çalışırsan anında uyarı alırsın, kod çalışmadan önce!",
            "modelAnswerEn": "TypeScript adds 'type labels' to JavaScript. A box is labeled 'numbers only' — try to put the wrong thing in and you get a warning immediately, before the code even runs!"
          }
        ]
      },
      {
        "title": {
          "en": "Installation & Setup",
          "tr": "Kurulum & Yapılandırma"
        },
        "blocks": [
          {
            "type": "heading",
            "content": {
              "en": "Step 1 — Install Node.js LTS",
              "tr": "Adım 1 — Node.js LTS Kurulumu"
            },
            "difficulty": "🟢 Beginner"
          },
          {
            "type": "text",
            "content": {
              "en": "TypeScript runs on Node.js. Always install the LTS (Long-Term Support) release — it is the most stable version and is what CI/CD environments use. Download from https://nodejs.org and choose the 'LTS' button.",
              "tr": "TypeScript, Node.js üzerinde çalışır. Her zaman LTS (Uzun Vadeli Destek) sürümünü kurun — bu en kararlı versiyondur ve CI/CD ortamlarının kullandığı sürümdür. https://nodejs.org adresinden indirin ve 'LTS' düğmesini seçin."
            }
          },
          {
            "type": "steps",
            "items": [
              {
                "en": "Windows: download the .msi installer from nodejs.org, run it, leave all defaults, tick 'Add to PATH'",
                "tr": "Windows: nodejs.org'dan .msi yükleyicisini indirin, çalıştırın, tüm varsayılanları bırakın, 'Add to PATH' kutusunu işaretleyin"
              },
              {
                "en": "macOS: use Homebrew — `brew install node` — or download the .pkg from nodejs.org",
                "tr": "macOS: Homebrew kullanın — `brew install node` — veya nodejs.org'dan .pkg indirin"
              },
              {
                "en": "Linux (Ubuntu/Debian): `curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - && sudo apt-get install -y nodejs`",
                "tr": "Linux (Ubuntu/Debian): `curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - && sudo apt-get install -y nodejs`"
              },
              {
                "en": "Verify both tools are installed by running the commands below",
                "tr": "Aşağıdaki komutları çalıştırarak her iki aracın da kurulu olduğunu doğrulayın"
              }
            ]
          },
          {
            "type": "code",
            "language": "bash",
            "label": {
              "en": "Verify Node.js and npm",
              "tr": "Verify Node.js and npm"
            },
            "content": {
              "en": "# Check Node.js version (should be 18.x or 20.x LTS)\nnode --version\n# Expected: v20.11.0\n\n# Check npm (Node Package Manager) version\nnpm --version\n# Expected: 10.2.4",
              "tr": "# Check Node.js version (should be 18.x or 20.x LTS)\nnode --version\n# Expected: v20.11.0\n\n# Check npm (Node Package Manager) version\nnpm --version\n# Expected: 10.2.4"
            },
            "expected": "v20.11.0\n10.2.4"
          },
          {
            "type": "heading",
            "content": {
              "en": "Step 2 — Install TypeScript Globally",
              "tr": "Adım 2 — TypeScript'i Global Kurma"
            }
          },
          {
            "type": "code",
            "language": "bash",
            "label": {
              "en": "Global TypeScript install",
              "tr": "Global TypeScript install"
            },
            "content": {
              "en": "# Install TypeScript compiler globally (available everywhere on your machine)\nnpm install -g typescript\n\n# Verify the TypeScript compiler is installed\ntsc --version\n# Expected: Version 5.4.5",
              "tr": "# Install TypeScript compiler globally (available everywhere on your machine)\nnpm install -g typescript\n\n# Verify the TypeScript compiler is installed\ntsc --version\n# Expected: Version 5.4.5"
            },
            "expected": "Version 5.4.5"
          },
          {
            "type": "heading",
            "content": {
              "en": "Step 3 — Create tsconfig.json",
              "tr": "Adım 3 — tsconfig.json Oluşturma"
            }
          },
          {
            "type": "text",
            "content": {
              "en": "tsconfig.json tells the TypeScript compiler how to compile your project. Every TypeScript project needs one. You can generate a starter with `tsc --init`, or use the annotated template below which is optimised for Playwright.",
              "tr": "tsconfig.json, TypeScript derleyicisine projenizi nasıl derleyeceğini söyler. Her TypeScript projesi bir tane gerektirir. `tsc --init` ile bir başlangıç şablonu oluşturabilir veya Playwright için optimize edilmiş aşağıdaki açıklamalı şablonu kullanabilirsiniz."
            }
          },
          {
            "type": "code",
            "language": "json",
            "label": {
              "en": "tsconfig.json — fully annotated",
              "tr": "tsconfig.json — fully annotated"
            },
            "content": {
              "en": "{\n  \"compilerOptions\": {\n    // ── Output ──────────────────────────────────\n    \"target\": \"ES2022\",          // Compile to modern JS (Node 18+ understands this)\n    \"module\": \"commonjs\",        // Use require() style modules (Node default)\n    \"outDir\": \"./dist\",          // Compiled .js files go into the dist/ folder\n    \"rootDir\": \"./src\",          // Where your .ts source files live\n\n    // ── Type Checking ────────────────────────────\n    \"strict\": true,              // Enable ALL strict type checks (recommended)\n    \"noImplicitAny\": true,       // Error on variables that implicitly get type 'any'\n    \"strictNullChecks\": true,    // null and undefined are not assignable to other types\n    \"noUnusedLocals\": true,      // Error on variables declared but never used\n    \"noUnusedParameters\": true,  // Error on function parameters never used\n\n    // ── Module Resolution ────────────────────────\n    \"moduleResolution\": \"node\",  // Use Node.js module resolution algorithm\n    \"esModuleInterop\": true,     // Allow default imports from CommonJS modules\n    \"resolveJsonModule\": true,   // Allow import of .json files with type safety\n    \"baseUrl\": \".\",              // Base path for non-relative imports\n\n    // ── Source Maps ──────────────────────────────\n    \"sourceMap\": true,           // Generate .js.map files for debugging\n\n    // ── Miscellaneous ────────────────────────────\n    \"lib\": [\"ES2022\"],           // Include built-in type definitions for ES2022\n    \"skipLibCheck\": true,        // Skip type checking of .d.ts files in node_modules\n    \"forceConsistentCasingInFileNames\": true  // Prevent cross-OS import case bugs\n  },\n  \"include\": [\"src/**/*\", \"tests/**/*\"],   // Which files to compile\n  \"exclude\": [\"node_modules\", \"dist\"]       // Which files to skip\n}",
              "tr": "{\n  \"compilerOptions\": {\n    // ── Output ──────────────────────────────────\n    \"target\": \"ES2022\",          // Compile to modern JS (Node 18+ understands this)\n    \"module\": \"commonjs\",        // Use require() style modules (Node default)\n    \"outDir\": \"./dist\",          // Compiled .js files go into the dist/ folder\n    \"rootDir\": \"./src\",          // Where your .ts source files live\n\n    // ── Type Checking ────────────────────────────\n    \"strict\": true,              // Enable ALL strict type checks (recommended)\n    \"noImplicitAny\": true,       // Error on variables that implicitly get type 'any'\n    \"strictNullChecks\": true,    // null and undefined are not assignable to other types\n    \"noUnusedLocals\": true,      // Error on variables declared but never used\n    \"noUnusedParameters\": true,  // Error on function parameters never used\n\n    // ── Module Resolution ────────────────────────\n    \"moduleResolution\": \"node\",  // Use Node.js module resolution algorithm\n    \"esModuleInterop\": true,     // Allow default imports from CommonJS modules\n    \"resolveJsonModule\": true,   // Allow import of .json files with type safety\n    \"baseUrl\": \".\",              // Base path for non-relative imports\n\n    // ── Source Maps ──────────────────────────────\n    \"sourceMap\": true,           // Generate .js.map files for debugging\n\n    // ── Miscellaneous ────────────────────────────\n    \"lib\": [\"ES2022\"],           // Include built-in type definitions for ES2022\n    \"skipLibCheck\": true,        // Skip type checking of .d.ts files in node_modules\n    \"forceConsistentCasingInFileNames\": true  // Prevent cross-OS import case bugs\n  },\n  \"include\": [\"src/**/*\", \"tests/**/*\"],   // Which files to compile\n  \"exclude\": [\"node_modules\", \"dist\"]       // Which files to skip\n}"
            }
          },
          {
            "type": "heading",
            "content": {
              "en": "Step 4 — VS Code Extensions",
              "tr": "Adım 4 — VS Code Uzantıları"
            }
          },
          {
            "type": "list",
            "items": [
              {
                "label": {
                  "en": "TypeScript Language Features",
                  "tr": "TypeScript Language Features"
                },
                "desc": {
                  "en": "Extension ID: vscode.typescript-language-features — built in to VS Code, provides IntelliSense, go-to-definition, and refactoring.",
                  "tr": "Uzantı ID: vscode.typescript-language-features — VS Code'da yerleşik, IntelliSense, tanıma gitme ve yeniden düzenleme sağlar."
                }
              },
              {
                "label": {
                  "en": "ESLint",
                  "tr": "ESLint"
                },
                "desc": {
                  "en": "Extension ID: dbaeumer.vscode-eslint — lint TypeScript for code quality issues beyond type errors.",
                  "tr": "Uzantı ID: dbaeumer.vscode-eslint — tür hatalarının ötesinde kod kalitesi sorunları için TypeScript'i lint eder."
                }
              },
              {
                "label": {
                  "en": "Prettier",
                  "tr": "Prettier"
                },
                "desc": {
                  "en": "Extension ID: esbenp.prettier-vscode — auto-format TypeScript on save.",
                  "tr": "Uzantı ID: esbenp.prettier-vscode — kayıt sırasında TypeScript'i otomatik biçimlendirir."
                }
              },
              {
                "label": {
                  "en": "Playwright Test for VS Code",
                  "tr": "Playwright Test for VS Code"
                },
                "desc": {
                  "en": "Extension ID: ms-playwright.playwright — run and debug Playwright tests with a GUI directly inside VS Code.",
                  "tr": "Uzantı ID: ms-playwright.playwright — VS Code içinde doğrudan GUI ile Playwright testlerini çalıştırın ve hata ayıklayın."
                }
              }
            ]
          },
          {
            "type": "heading",
            "content": {
              "en": "Step 5 — Hello World in TypeScript",
              "tr": "Adım 5 — TypeScript'te Merhaba Dünya"
            }
          },
          {
            "type": "code",
            "language": "typescript",
            "label": {
              "en": "index.ts — your first typed program",
              "tr": "index.ts — your first typed program"
            },
            "content": {
              "en": "// index.ts\n// Typed 'Hello World' — note the explicit type annotations\n\n// A function that takes a name (must be a string) and returns a string\nfunction greet(name: string): string {\n  return `Hello, ${name}! Welcome to TypeScript.`;\n}\n\n// TypeScript catches this before you run it:\n// greet(42);  // Error: Argument of type 'number' is not assignable to 'string'\n\nconst message: string = greet(\"QA Engineer\");\nconsole.log(message);",
              "tr": "// index.ts\n// Typed 'Hello World' — note the explicit type annotations\n\n// A function that takes a name (must be a string) and returns a string\nfunction greet(name: string): string {\n  return `Hello, ${name}! Welcome to TypeScript.`;\n}\n\n// TypeScript catches this before you run it:\n// greet(42);  // Error: Argument of type 'number' is not assignable to 'string'\n\nconst message: string = greet(\"QA Engineer\");\nconsole.log(message);"
            },
            "expected": "Hello, QA Engineer! Welcome to TypeScript."
          },
          {
            "type": "code",
            "language": "bash",
            "label": {
              "en": "Compile and run",
              "tr": "Compile and run"
            },
            "content": {
              "en": "# Step 1: Compile TypeScript to JavaScript\ntsc index.ts\n# This creates index.js in the same folder\n\n# Step 2: Run the compiled JavaScript\nnode index.js\n# Expected: Hello, QA Engineer! Welcome to TypeScript.",
              "tr": "# Step 1: Compile TypeScript to JavaScript\ntsc index.ts\n# This creates index.js in the same folder\n\n# Step 2: Run the compiled JavaScript\nnode index.js\n# Expected: Hello, QA Engineer! Welcome to TypeScript."
            },
            "expected": "Hello, QA Engineer! Welcome to TypeScript."
          },
          {
            "type": "heading",
            "content": {
              "en": "Step 6 — ts-node: Skip the Compile Step",
              "tr": "Adım 6 — ts-node: Derleme Adımını Atla"
            }
          },
          {
            "type": "code",
            "language": "bash",
            "label": {
              "en": "Run TypeScript directly with ts-node",
              "tr": "Run TypeScript directly with ts-node"
            },
            "content": {
              "en": "# ts-node compiles and runs in one command — great for scripts and debugging\nnpx ts-node index.ts\n# Expected: Hello, QA Engineer! Welcome to TypeScript.\n\n# Install ts-node globally to avoid npx each time\nnpm install -g ts-node",
              "tr": "# ts-node compiles and runs in one command — great for scripts and debugging\nnpx ts-node index.ts\n# Expected: Hello, QA Engineer! Welcome to TypeScript.\n\n# Install ts-node globally to avoid npx each time\nnpm install -g ts-node"
            },
            "expected": "Hello, QA Engineer! Welcome to TypeScript."
          },
          {
            "type": "heading",
            "content": {
              "en": "Step 7 — Create a Playwright TypeScript Project",
              "tr": "Adım 7 — Playwright TypeScript Projesi Oluştur"
            }
          },
          {
            "type": "steps",
            "items": [
              {
                "en": "Create a new folder: `mkdir my-playwright-project && cd my-playwright-project`",
                "tr": "Yeni klasör oluştur: `mkdir my-playwright-project && cd my-playwright-project`"
              },
              {
                "en": "Run the Playwright installer: `npm init playwright@latest`",
                "tr": "Playwright yükleyicisini çalıştır: `npm init playwright@latest`"
              },
              {
                "en": "Prompt: 'Do you want to use TypeScript or JavaScript?' → Choose: TypeScript",
                "tr": "Soru: 'TypeScript mi JavaScript mi kullanmak istersiniz?' → TypeScript seçin"
              },
              {
                "en": "Prompt: 'Where to put your end-to-end tests?' → Accept default: tests",
                "tr": "Soru: 'End-to-end testlerinizi nereye koymak istersiniz?' → Varsayılanı kabul edin: tests"
              },
              {
                "en": "Prompt: 'Add a GitHub Actions workflow?' → Choose: true (recommended)",
                "tr": "Soru: 'GitHub Actions workflow eklensin mi?' → true seçin (önerilir)"
              },
              {
                "en": "Prompt: 'Install Playwright browsers?' → Choose: true",
                "tr": "Soru: 'Playwright tarayıcıları kurulsun mu?' → true seçin"
              },
              {
                "en": "Wait for install — Playwright downloads Chromium, Firefox, and WebKit",
                "tr": "Kurulum için bekleyin — Playwright Chromium, Firefox ve WebKit'i indirir"
              },
              {
                "en": "Run the example test: `npx playwright test`",
                "tr": "Örnek testi çalıştırın: `npx playwright test`"
              },
              {
                "en": "Open the HTML report: `npx playwright show-report`",
                "tr": "HTML raporu açın: `npx playwright show-report`"
              }
            ]
          },
          {
            "type": "code",
            "language": "bash",
            "label": {
              "en": "Full Playwright TypeScript setup from scratch",
              "tr": "Full Playwright TypeScript setup from scratch"
            },
            "content": {
              "en": "# 1. Create project folder\nmkdir my-playwright-project\ncd my-playwright-project\n\n# 2. Initialize Playwright (follow prompts: TypeScript, tests/, yes, yes)\nnpm init playwright@latest\n\n# 3. Verify project structure was created\nls\n# node_modules/   package.json   playwright.config.ts   tests/\n\n# 4. Run the bundled example tests\nnpx playwright test\n\n# 5. Open the rich HTML report in your browser\nnpx playwright show-report",
              "tr": "# 1. Create project folder\nmkdir my-playwright-project\ncd my-playwright-project\n\n# 2. Initialize Playwright (follow prompts: TypeScript, tests/, yes, yes)\nnpm init playwright@latest\n\n# 3. Verify project structure was created\nls\n# node_modules/   package.json   playwright.config.ts   tests/\n\n# 4. Run the bundled example tests\nnpx playwright test\n\n# 5. Open the rich HTML report in your browser\nnpx playwright show-report"
            }
          },
          {
            "type": "tip",
            "content": {
              "en": "After `npm init playwright@latest`, open `playwright.config.ts` — it is already fully typed. Your tests in `tests/` will be `.spec.ts` files. You get full autocomplete for `page`, `expect`, `browser`, and every Playwright API immediately.",
              "tr": "`npm init playwright@latest` sonrasında `playwright.config.ts` dosyasını açın — zaten tam olarak tiplenmiş. `tests/` klasöründeki testleriniz `.spec.ts` dosyaları olacak. `page`, `expect`, `browser` ve tüm Playwright API'si için anında otomatik tamamlama kullanabilirsiniz."
            }
          },
          {
            "type": "simple-box",
            "emoji": "🛠️",
            "content": {
              "tr": "Node.js kurmak, mutfağa su ve gaz tesisatı çekmek gibidir. TypeScript ise bu mutfağa aldığınız akıllı kahve makinesi gibidir — çalışması için altyapıya ihtiyaç duyar.",
              "en": "Installing Node.js is like laying down water and gas pipes in a kitchen. TypeScript is like the smart espresso machine you buy — it needs that infrastructure to run."
            }
          },
          {
            "type": "simple-box",
            "emoji": "⚙️",
            "content": {
              "tr": "tsconfig.json dosyası, bir akıllı cihazın Türkçe/İngilizce kullanım kılavuzu ve ayar menüsü gibidir. Cihazın hangi kurallarla çalışacağını buradan seçersiniz.",
              "en": "The tsconfig.json file is like the user manual and settings menu of a smart device. You configure the compilation rules and strictness options there."
            }
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "Neden ts-node Kullanırız? Kod yazarken sürekli tsc ile derleyip sonra node ile çalıştırmak zaman kaybıdır. ts-node bu iki adımı birleştirerek geliştirme hızını artırır.",
              "en": "Why Use ts-node? Having to compile with tsc and then run with node constantly wastes time. ts-node combines both steps to accelerate development."
            }
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "Neden strict: true Ayarı Önemlidir? TypeScript'in en güçlü koruma mekanizmalarını aktif eder. Bu ayar kapalıysa, TypeScript birçok tip hatasını gözden kaçırabilir.",
              "en": "Why is strict:true Important? It enables TypeScript's strongest safety checks. If disabled, TypeScript may overlook many potential type errors."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: tsconfig.json, LEGO fabrikasındaki kalite kontrol makinesi gibidir. Hangi boyuttaki tuğlalara izin verileceğini ve hangilerinin eleneceğini belirler.",
              "en": "LEGO analogy: tsconfig.json is like the quality control scanner at the LEGO factory. It determines which brick tolerances are allowed and which are rejected."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: Node.js, LEGO setlerini üzerine kurduğunuz zemin matı (baseplate) gibidir. TypeScript ise bu zemin üzerine inşa ettiğiniz karmaşık yapıların kendisüdür.",
              "en": "LEGO analogy: Node.js is like the green baseplate you build your LEGO sets on. TypeScript is the complex building you construct on top of that baseplate."
            }
          },
          {
            "type": "quiz",
            "question": {
              "tr": "tsconfig.json dosyasındaki 'strict: true' ayarı ne işe yarar?",
              "en": "What does the 'strict: true' configuration do in tsconfig.json?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "tr": "Derleyiciyi hızlandırır",
                  "en": "Speeds up the compiler"
                }
              },
              {
                "id": "b",
                "text": {
                  "tr": "Tüm katı tip kontrollerini ve güvenlik mekanizmalarını aktif hale getirir",
                  "en": "Enables all strict type checking and safety mechanisms"
                }
              },
              {
                "id": "c",
                "text": {
                  "tr": "JavaScript kodunu otomatik olarak optimize eder",
                  "en": "Automatically optimizes JavaScript code"
                }
              },
              {
                "id": "d",
                "text": {
                  "tr": "Kodun sadece macOS'ta çalışmasını sağlar",
                  "en": "Restricts the code to run only on macOS"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "tr": "strict: true ayarı, implicit any, strict null checks ve diğer katı tip denetim kurallarını tek bir bayrakla aktif eder. QA projelerinde açılması zorunludur.",
              "en": "The strict: true configuration enables implicit any checks, strict null checks, and other safety rules under a single flag. Mandatory for QA projects."
            },
            "retryQuestion": {
              "question": {
                "tr": "TypeScript projelerinde ts-node paketinin temel faydası nedir?",
                "en": "What is the primary benefit of the ts-node package in TypeScript projects?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "tr": "Test raporlarını güzelleştirir",
                    "en": "Beautifies test reports"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "tr": "Ayrı bir derleme (.js üretme) adımı olmadan TS dosyalarını doğrudan bellek üzerinde derleyip çalıştırır",
                    "en": "Compiles and executes TS files directly in memory without generating output files"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "tr": "Playwright testlerini paralel koşturur",
                    "en": "Runs Playwright tests in parallel"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "tr": "Tarayıcıları arka planda (headless) başlatır",
                    "en": "Launches browsers in headless mode"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "tr": "ts-node, geliştirme aşamasında tsc + node adımlarını tek komutta birleştirerek diske dosya yazmadan kod denemeyi sağlar.",
                "en": "ts-node combines tsc and node into a single command during development, letting you run TS code directly without writing files to disk."
              }
            }
          },
          {
            "type": "quiz",
            "question": {
              "en": "What is the main reason to prefer Node.js's LTS (Long Term Support) version when installing TypeScript?",
              "tr": "TypeScript kurulumunda Node.js'in LTS (Long Term Support) sürümünün tercih edilmesinin temel nedeni nedir?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "The LTS version always has the newest language features",
                  "tr": "LTS sürümü her zaman en yeni dil özelliklerine sahiptir"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "It is the most stable version and matches what CI/CD environments run",
                  "tr": "En kararlı sürümdür ve CI/CD ortamlarının kullandığı sürümle eşleşir"
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "Only the LTS version supports TypeScript",
                  "tr": "Sadece LTS sürümü TypeScript'i destekler"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "The LTS version requires no installation",
                  "tr": "LTS sürümü kurulum gerektirmez"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "en": "LTS versions get long-term security patches and a stability guarantee, which is why CI/CD pipelines, Docker images, and production servers typically run LTS. Using a different, newer version on your dev machine risks writing code that only works locally but fails in CI — the same reasoning behind picking a Java LTS JDK version (8/11/17/21).",
              "tr": "LTS sürümleri uzun süreli güvenlik yamaları ve kararlılık garantisi alır; bu yüzden CI/CD pipeline'ları, Docker imajları ve production sunucuları genellikle LTS kullanır. Geliştirme makinende farklı, daha yeni bir sürüm kullanırsan, sadece kendi makinende çalışan ama CI'da başarısız olan bir kod yazma riski oluşur — Java'da JDK LTS sürümü (8/11/17/21) seçmekle aynı mantık."
            },
            "retryQuestion": {
              "question": {
                "en": "A developer uses Node 22 (a non-LTS Current release) locally, while CI runs Node 20 LTS. What kind of risk does this mismatch create?",
                "tr": "Bir geliştirici local makinesinde Node 22 (henüz LTS olmayan, Current sürüm) kullanıyor, CI ise Node 20 LTS kullanıyor. Bu fark ne tür bir riske yol açar?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "No risk at all, Node versions are always backward compatible",
                    "tr": "Hiçbir risk yok, Node sürümleri her zaman geriye uyumludur"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "Code that works on the developer's machine may rely on an API not present in Node 20, and fail in CI",
                    "tr": "Geliştiricinin makinesinde çalışan kod, Node 20'de mevcut olmayan bir API'ye dayanıyorsa CI'da başarısız olabilir"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "The TypeScript compiler cannot run on different Node versions",
                    "tr": "TypeScript derleyicisi farklı Node sürümlerinde çalışmaz"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "Tests are automatically upgraded to Node 22 in CI",
                    "tr": "Testler her zaman CI'da otomatik olarak Node 22'ye yükseltilir"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "en": "Using an API or behavior available in a newer Node version but missing from the older LTS one causes code to work locally and then fail in CI with something like \"function is not defined.\" This is exactly why dev and CI environments should align on the same LTS version — version mismatch is a silent source of failures even when the code itself is correct.",
                "tr": "Yeni bir Node sürümünde mevcut olan ama eski LTS sürümünde olmayan bir API veya davranış kullanmak, kodun lokalde çalışıp CI'da \"fonksiyon tanımlı değil\" gibi bir hatayla başarısız olmasına yol açar. Bu yüzden geliştirme ve CI ortamlarının aynı LTS sürümünde hizalanması gerekir — versiyon uyuşmazlığı sessiz bir kaynaktır, kodun kendisi doğru olsa bile."
              }
            }
          },
          {
            "type": "ts-mini-hero",
            "promptTr": "Anlat bakalım: bir .ts dosyası yazıyoruz, sonuçta tarayıcı bunu nasıl çalıştırıyor? Aradaki adımları sırayla anlat.",
            "promptEn": "Explain this: we write a .ts file — how does the browser eventually run it? Walk me through the steps in order.",
            "keywords": [
              [
                "derleme",
                "compile",
                "tsc",
                "derleyici"
              ],
              [
                "js",
                "javascript",
                "dönüştür",
                "convert"
              ],
              [
                "tarayıcı",
                "browser",
                "node"
              ],
              [
                "adım",
                "step"
              ]
            ],
            "modelAnswerTr": ".ts dosyası → tsc derleyicisi JavaScript'e çevirir → .js dosyası → tarayıcı veya Node.js çalıştırır. Tarayıcı TypeScript'i doğrudan anlamaz.",
            "modelAnswerEn": ".ts file → tsc compiler converts to JavaScript → .js file → browser or Node.js runs it. The browser cannot run TypeScript directly."
          }
        ]
      },
      {
        "title": {
          "en": "Simple & Special Types",
          "tr": "Basit & Özel Tipler"
        },
        "blocks": [
          {
            "type": "heading",
            "text": {
              "en": "Simple Types",
              "tr": "Simple Types"
            },
            "difficulty": "🟢 Beginner"
          },
          {
            "type": "simple-box",
            "emoji": "🔷",
            "content": {
              "tr": "TypeScript, JavaScript'in üzerine etiket takılmış hali. 'Bu kutu sadece sayı içerir' etiketi gibi — yanlış bir şey koymaya çalışırsan hemen uyarı alırsın. Java'da zaten böyleydi; TypeScript bunu JavaScript'e getiriyor.",
              "en": "TypeScript is JavaScript with labels attached. Like a box labeled 'numbers only' — if you try to put the wrong thing in, you get an immediate warning. Java already had this; TypeScript brings it to JavaScript."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "Java'da her değişkenin tipi açıkça belirtilir: int x = 5; String name = 'Ali'. TypeScript'te aynı şey: let x: number = 5; let name: string = 'Ali'. Fark: TypeScript genellikle tipi otomatik çıkarabilir (type inference) — her yere yazmak zorunda değilsin.",
              "en": "Java requires explicit types: int x = 5; String name = 'Ali'. TypeScript is the same: let x: number = 5; let name: string = 'Ali'. Difference: TypeScript can usually infer the type automatically — you don't have to write it everywhere."
            }
          },
          {
            "type": "code",
            "language": "typescript",
            "code": "// TypeScript Simple Types — Java Comparison\n// Java:    int age = 25;\n// TypeScript: let age: number = 25;  (or just: let age = 25)\n\nlet age: number = 25;          // number (int, float, double all combined)\nlet name: string = \"Alice\";    // string\nlet isActive: boolean = true;  // boolean\nlet score: number = 98.5;      // TypeScript number = Java double\n\n// Type inference — TypeScript deduces type from value\nlet city = \"Istanbul\";         // TypeScript knows this is string\n// city = 42;                  // ERROR: Type 'number' not assignable to type 'string'\n\n// Type annotation vs inference\nlet explicitNum: number = 10;  // explicit annotation\nlet inferredNum = 10;          // inferred as number (same result)\n\n// any — disables type checking (avoid in production!)\nlet anything: any = \"hello\";\nanything = 42;                 // no error — but you lose type safety\nanything = true;\n\n// Function with typed params and return type\nfunction greet(name: string, times: number): string {\n  return (name + \" \").repeat(times).trim();\n}\nconsole.log(greet(\"Hi\", 3));   // Hi Hi Hi\n// greet(42, \"three\");          // ERROR: wrong types"
          },
          {
            "type": "editor",
            "lang": "typescript",
            "defaultCode": "// TypeScript catches errors at compile time\nfunction calculateTax(price: number, taxRate: number): number {\n  return price * (1 + taxRate);\n}\n\nconst total = calculateTax(100, 0.18);\nconsole.log(\"Total with tax:\", total);\n\n// Try: change 100 to \"100\" — TypeScript will show an error\n// const wrongTotal = calculateTax(\"100\", 0.18);"
          },
          {
            "type": "comparison",
            "title": {
              "tr": "Java ile Karşılaştırma",
              "en": "Java vs TypeScript — Basic Types"
            },
            "columns": [
              "Java",
              "TypeScript"
            ],
            "rows": [
              {
                "concept": {
                  "en": "Integer",
                  "tr": "Integer"
                },
                "java": "int x = 5;",
                "typescript": "let x: number = 5;"
              },
              {
                "concept": {
                  "en": "Float",
                  "tr": "Float"
                },
                "java": "double d = 3.14;",
                "typescript": "let d: number = 3.14;"
              },
              {
                "concept": {
                  "en": "String",
                  "tr": "String"
                },
                "java": "String s = \"hi\";",
                "typescript": "let s: string = \"hi\";"
              },
              {
                "concept": {
                  "en": "Boolean",
                  "tr": "Boolean"
                },
                "java": "boolean b = true;",
                "typescript": "let b: boolean = true;"
              },
              {
                "concept": {
                  "en": "No type",
                  "tr": "No type"
                },
                "java": "Object o = anything;",
                "typescript": "let o: any = anything;"
              }
            ]
          },
          {
            "type": "quiz",
            "question": {
              "en": "Which TypeScript type is used for both integers and floats?",
              "tr": "TypeScript'te hem integer hem float için hangi tip kullanılır?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "int",
                  "tr": "int"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "float",
                  "tr": "float"
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "number",
                  "tr": "number"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "numeric",
                  "tr": "numeric"
                }
              }
            ],
            "correct": "c",
            "explanation": {
              "en": "TypeScript's 'number' type covers Java's int, long, double, and float. There is only one numeric type. This distinction was important in Java — not in TypeScript.",
              "tr": "TypeScript'te 'number' tipi Java'daki int, long, double, float'un hepsini kapsar. Tek bir sayısal tip var. Java'da bu ayrım önemliydi — TypeScript'te yok."
            },
            "retryQuestion": {
              "question": {
                "en": "Which data type is preferred to store decimal numbers in TypeScript?",
                "tr": "TypeScript'te ondalıklı sayıları (decimal) saklamak için hangi veri tipi tercih edilir?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "decimal",
                    "tr": "decimal"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "float",
                    "tr": "float"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "number",
                    "tr": "number"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "double",
                    "tr": "double"
                  }
                }
              ],
              "correct": "c",
              "explanation": {
                "en": "TypeScript uses only the 'number' type for all numeric values, including both integers and floating-point numbers. There is no need to define distinct numeric types.",
                "tr": "TypeScript, tüm sayısal değerler (tam sayılar ve ondalıklı sayılar dahil) için sadece 'number' tipini kullanır. Farklı sayı tipleri tanımlamaya gerek yoktur."
              }
            }
          },
          {
            "type": "ts-mini-hero",
            "promptTr": "Bana şunu açıkla: Java'da int, float, double vardı. TypeScript'te neden hepsi sadece 'number'? Kısaca anlat.",
            "promptEn": "Explain this: Java had int, float, double. Why does TypeScript only have 'number' for all of them? Keep it short.",
            "keywords": [
              [
                "javascript",
                "js",
                "altta",
                "under",
                "temelde",
                "underneath"
              ],
              [
                "tek",
                "one",
                "single",
                "sadece"
              ],
              [
                "sayı",
                "number",
                "float"
              ],
              [
                "java",
                "fark",
                "difference"
              ]
            ],
            "modelAnswerTr": "JavaScript altında yalnızca tek tip sayı var (64-bit kayan nokta). TypeScript JavaScript üzerine kurulduğu için aynı kuralı kullanır. int/double ayrımı Java'nın JVM optimizasyonu için.",
            "modelAnswerEn": "Under the hood, JavaScript has only one number type (64-bit float). TypeScript builds on JavaScript so follows the same rule. The int/double split exists in Java for JVM performance optimization."
          },
          {
            "type": "heading",
            "text": {
              "en": "Special Types",
              "tr": "Special Types"
            },
            "difficulty": "🟢 Beginner"
          },
          {
            "type": "simple-box",
            "emoji": "⚠️",
            "content": {
              "0": "T",
              "1": "u",
              "2": "p",
              "3": "l",
              "4": "e",
              "5": "'",
              "6": "l",
              "7": "a",
              "8": "r",
              "tr": "Özel tipler, beklenmedik durumlar için. 'any' = her şey olabilir (kötü pratik), 'unknown' = bilinmiyor ama önce kontrol et, 'never' = bu kod asla çalışmaz, 'void' = fonksiyon bir şey döndürmez.",
              "en": "Special types for unexpected situations. 'any' = can be anything (bad practice), 'unknown' = unknown but check first, 'never' = this code never runs, 'void' = function returns nothing."
            }
          },
          {
            "type": "code",
            "language": "typescript",
            "code": "// TypeScript Special Types\n\n// void — function returns nothing (like Java void)\nfunction logMessage(msg: string): void {\n  console.log(\"[LOG]\", msg);\n  // no return value\n}\n\n// null and undefined\nlet nullVal: null = null;\nlet undVal: undefined = undefined;\n\n// any — escapes type checking (use sparingly)\nlet userInput: any = document.getElementById(\"input\");  // from DOM\nuserInput = 42;         // no error\n\n// unknown — safer than any: must type-check before use\nfunction processInput(input: unknown): string {\n  if (typeof input === \"string\") {\n    return input.toUpperCase();    // safe: we checked the type\n  }\n  if (typeof input === \"number\") {\n    return input.toFixed(2);       // safe: we checked the type\n  }\n  return String(input);            // fallback\n}\nconsole.log(processInput(\"hello\"));  // HELLO\nconsole.log(processInput(42.5));     // 42.50\n\n// never — function that never returns (throws or infinite loop)\nfunction throwError(message: string): never {\n  throw new Error(message);         // never returns normally\n}\n\n// Type guard pattern (common in QA code)\nfunction assertDefined<T>(val: T | null | undefined, name: string): T {\n  if (val == null) throwError(`${name} is required but was ${val}`);\n  return val;\n}"
          },
          {
            "type": "editor",
            "lang": "typescript",
            "defaultCode": "// Practice unknown vs any\nfunction parseAge(input: unknown): number {\n  if (typeof input === \"number\") return input;\n  if (typeof input === \"string\") {\n    const parsed = parseInt(input);\n    if (isNaN(parsed)) throw new Error(\"Invalid age: \" + input);\n    return parsed;\n  }\n  throw new Error(\"Cannot parse age from: \" + typeof input);\n}\n\nconsole.log(parseAge(25));       // 25\nconsole.log(parseAge(\"30\"));    // 30\n// console.log(parseAge(true)); // Error"
          },
          {
            "type": "quiz",
            "question": {
              "en": "What is the key difference between 'unknown' and 'any' in TypeScript?",
              "tr": "TypeScript'te 'unknown' ve 'any' arasındaki temel fark nedir?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "No difference",
                  "tr": "Hiçbir fark yok"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "unknown requires a type check before use, any does not",
                  "tr": "unknown kullanmadan önce tip kontrolü zorunlu, any'de değil"
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "unknown is only for strings, any is for everything",
                  "tr": "unknown sadece string için, any hepsi için"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "any is safer",
                  "tr": "any daha güvenli"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "en": "'unknown' cannot be used without a type check (typeof, instanceof). 'any' completely disables type safety. In production code, prefer unknown over any.",
              "tr": "'unknown' tip kontrolü (typeof, instanceof) yapılmadan kullanılamaz. 'any' tip güvenliğini tamamen devre dışı bırakır. Production kodunda any yerine unknown tercih edilir."
            },
            "retryQuestion": {
              "question": {
                "en": "What is the alternative to 'any' that forces type safety and prevents arbitrary method calls on a variable?",
                "tr": "Bir değişkene herhangi bir metodun uygulanmasını engelleyip tip güvenliğini zorunlu kılan 'any' alternatifi nedir?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "never",
                    "tr": "never"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "unknown",
                    "tr": "unknown"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "object",
                    "tr": "object"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "void",
                    "tr": "void"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "en": "The 'unknown' type allows you to write safe code by forcing you to perform type narrowing before interacting with the variable, whereas 'any' bypasses all type checks.",
                "tr": "'unknown' tipi, bir değişkenin üzerinde işlem yapmadan önce tip koruması (type narrowing) yapmanızı zorunlu kılarak güvenli bir kod yazmanıza olanak tanır. 'any' ise tüm tip kontrollerini atlar."
              }
            }
          },
          {
            "type": "ts-mini-hero",
            "promptTr": "Test et: 'any' ile 'unknown' arasındaki farkı kısa bir benzetmeyle anlat. Neden unknown daha güvenli?",
            "promptEn": "Test yourself: explain the difference between 'any' and 'unknown' with a quick analogy. Why is unknown safer?",
            "keywords": [
              [
                "kontrol",
                "check",
                "doğrula",
                "verify",
                "typeof"
              ],
              [
                "güvenli",
                "safe",
                "safer"
              ],
              [
                "tip",
                "type",
                "narrow"
              ],
              [
                "önce",
                "before",
                "first"
              ]
            ],
            "modelAnswerTr": "'any' = kasayı körü körüne kullan. 'unknown' = kasayı aç ama içini görmeden dokunma — önce typeof ile kontrol et. unknown daha güvenli çünkü yanlış operasyonu engeller.",
            "modelAnswerEn": "'any' = use the box blindly. 'unknown' = open it but don't touch until you check with typeof. unknown is safer because it prevents wrong operations on the value."
          },
          {
            "type": "simple-box",
            "emoji": "🏷️",
            "content": {
              "tr": "number, string ve boolean tipleri, oyuncak kutularının üzerindeki etiketler gibidir. 'Sadece Oyuncak Ayı' etiketli kutuya araba koyamazsınız.",
              "en": "The number, string, and boolean types are like stickers on toy boxes. You can't put a toy car in a box labeled 'Teddy Bears Only'."
            }
          },
          {
            "type": "simple-box",
            "emoji": "🕵️",
            "content": {
              "tr": "unknown tipi, hediye paketi sarılmış gizemli bir kutu gibidir. Ne olduğunu bilmediğin için açıp kontrol etmeden (narrowing) doğrudan içindekini çalıştıramazsın.",
              "en": "The unknown type is like a wrapped mystery gift box. Since you don't know what is inside, you cannot interact with it until you check its contents (narrowing)."
            }
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "Neden any Yerine unknown Tercih Edilmeli? any tipi tip denetimini tamamen kapatır ve çalışma zamanında çökmelere yol açar. unknown ise kontrol etmeye zorlayarak güvenliği korur.",
              "en": "Why Prefer unknown Over any? The any type disables safety checks entirely, risking runtime crashes. The unknown type preserves safety by forcing verification."
            }
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "Neden never Tipi Var? Bir fonksiyonun hata fırlattığını veya sonsuz döngüye girdiğini, yani kodun o noktadan ileriye asla gitmeyeceğini derleyiciye anlatmak için kullanılır.",
              "en": "Why is there a never Type? It informs the compiler that a function throws an exception or loops infinitely, meaning execution never proceeds past that point."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: number tipi kırmızı LEGO, string mavi LEGO'dur. Kırmızı yuvaya mavi parçayı takamazsınız.",
              "en": "LEGO analogy: The number type is a red brick, and string is a blue brick. You cannot plug a blue brick into a red slot."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: unknown tipi, rengini bilmediğiniz ve üzeri kapalı bir LEGO tuğlasıdır. Rengini açıp doğrulamadan (typeof check) onu diğer setlere uyduramazsınız.",
              "en": "LEGO analogy: The unknown type is a covered LEGO brick of unknown color. You cannot fit it into other assemblies until you inspect it first."
            }
          },
          {
            "type": "quiz",
            "question": {
              "tr": "TypeScript'te bir fonksiyonun asla bir değer döndürmeyeceğini (hata fırlatacağını veya sonsuz döngüye gireceğini) hangi tip belirtir?",
              "en": "Which type indicates that a function will never return a value (e.g. throws an error or loops infinitely)?"
            },
            "options": [
              {
                "id": "a",
                "text": "void"
              },
              {
                "id": "b",
                "text": "never"
              },
              {
                "id": "c",
                "text": "unknown"
              },
              {
                "id": "d",
                "text": "any"
              }
            ],
            "correct": "b",
            "explanation": {
              "tr": "never tipi, kodun o satırdan sonra asla normal bir şekilde ilerlemeyeceğini ifade eder. void ise fonksiyonun başarıyla tamamlandığını ama değer dönmediğini belirtir.",
              "en": "The never type represents values that will never occur (like functions that throw or loop infinitely). void indicates a function runs to completion but returns no value."
            },
            "retryQuestion": {
              "question": {
                "tr": "void ile never arasındaki temel fark nedir?",
                "en": "What is the key difference between void and never?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "tr": "Hiçbir fark yoktur",
                    "en": "There is no difference"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "tr": "void başarıyla biter ama değer dönmez; never ise hiçbir zaman başarıyla bitip geri dönmez",
                    "en": "void returns normally with no value; never never returns or finishes normally"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "tr": "never sadece sayılar içindir",
                    "en": "never is only for numbers"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "tr": "void sadece sınıflarda kullanılır",
                    "en": "void is only used in classes"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "tr": "void geri döner (undefined olarak), ama never fonksiyonun sonuna asla ulaşılamayacağını ve çağrıldığı yere geri dönmeyeceğini garanti eder.",
                "en": "void returns (as undefined), but never guarantees that the function's end is unreachable and it will never return to the caller."
              }
            }
          }
        ]
      },
      {
        "title": {
          "en": "Arrays & Tuples",
          "tr": "Diziler & Tuple'lar"
        },
        "blocks": [
          {
            "type": "heading",
            "text": {
              "en": "Arrays",
              "tr": "Arrays"
            },
            "difficulty": "🟢 Beginner"
          },
          {
            "type": "simple-box",
            "emoji": "📚",
            "content": {
              "0": "T",
              "1": "y",
              "2": "p",
              "3": "e",
              "4": " ",
              "5": "A",
              "6": "l",
              "7": "i",
              "8": "a",
              "9": "s",
              "10": " ",
              "11": "v",
              "12": "s",
              "13": " ",
              "14": "I",
              "15": "n",
              "16": "t",
              "17": "e",
              "18": "r",
              "19": "f",
              "20": "a",
              "21": "c",
              "22": "e",
              "tr": "TypeScript array'i Java'nın typed ArrayList'i gibi. Java'da List<String> yazınca sadece String girebilirdin. TypeScript'te string[] yazarsan sadece string girebilirsin.",
              "en": "TypeScript arrays are like Java's typed ArrayList. In Java, List<String> only accepts Strings. In TypeScript, string[] only accepts strings."
            }
          },
          {
            "type": "code",
            "language": "typescript",
            "code": "// TypeScript Arrays — two syntax options (both work)\n// Java: List<String> names = new ArrayList<>();\n// TypeScript:\nlet names: string[] = [\"Alice\", \"Bob\", \"Carol\"];    // preferred syntax\nlet scores: Array<number> = [95, 87, 72, 98];       // generic syntax\n\n// Typed array operations\nnames.push(\"Dave\");           // OK: string\n// names.push(42);            // ERROR: number not assignable to string\n\n// Array of objects (common in QA test data)\ninterface TestCase {\n  id: number;\n  name: string;\n  passed: boolean;\n}\n\nconst testCases: TestCase[] = [\n  { id: 1, name: \"login_test\", passed: true },\n  { id: 2, name: \"checkout_test\", passed: false },\n  { id: 3, name: \"profile_test\", passed: true },\n];\n\n// Filter, map, reduce — same as Java Stream API\nconst failedTests = testCases.filter(t => !t.passed);\nconst testNames = testCases.map(t => t.name);\nconst passCount = testCases.reduce((acc, t) => acc + (t.passed ? 1 : 0), 0);\n\nconsole.log(\"Failed:\", failedTests.length);    // 1\nconsole.log(\"Names:\", testNames);\nconsole.log(\"Pass count:\", passCount);          // 2\n\n// readonly array — like Java unmodifiableList\nconst fixedList: readonly string[] = [\"a\", \"b\", \"c\"];\n// fixedList.push(\"d\");        // ERROR: readonly"
          },
          {
            "type": "editor",
            "lang": "typescript",
            "defaultCode": "interface ApiEndpoint {\n  path: string;\n  method: \"GET\" | \"POST\" | \"PUT\" | \"DELETE\";\n  requiresAuth: boolean;\n}\n\nconst endpoints: ApiEndpoint[] = [\n  { path: \"/api/login\", method: \"POST\", requiresAuth: false },\n  { path: \"/api/users\", method: \"GET\", requiresAuth: true },\n  { path: \"/api/users/1\", method: \"DELETE\", requiresAuth: true },\n];\n\nconst publicEndpoints = endpoints.filter(e => !e.requiresAuth);\nconst paths = endpoints.map(e => `${e.method} ${e.path}`);\n\nconsole.log(\"Public endpoints:\", publicEndpoints.length);\npaths.forEach(p => console.log(p));"
          },
          {
            "type": "quiz",
            "question": {
              "en": "How do you declare a string array in TypeScript?",
              "tr": "TypeScript'te string array nasıl tanımlanır?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "let arr: Array<String>",
                  "tr": "let arr: Array<String>"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "let arr: string[]",
                  "tr": "let arr: string[]"
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "let arr = String[]",
                  "tr": "let arr = String[]"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "let arr: [string]",
                  "tr": "let arr: [string]"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "en": "string[] is the preferred syntax. Array<string> also works. [string] is tuple syntax — it defines a single-element string tuple.",
              "tr": "string[] tercih edilen syntax'tır. Array<string> da çalışır. [string] ise tuple sözdizimi — tek elemanlı string tuple'ı tanımlar."
            },
            "retryQuestion": {
              "question": {
                "en": "What is the most common way to declare an array of numbers in TypeScript?",
                "tr": "TypeScript'te birden fazla sayı içeren bir diziyi tanımlamanın en yaygın yolu nedir?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "let list: number[]",
                    "tr": "let list: number[]"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "let list: Array<number>",
                    "tr": "let list: Array<number>"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "let list = [number]",
                    "tr": "let list = [number]"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "let list: List<number>",
                    "tr": "let list: List<number>"
                  }
                }
              ],
              "correct": "a",
              "explanation": {
                "en": "The number[] syntax is the cleanest and most common way to define an array in TypeScript. Array<number> is also valid, but the shorter syntax is generally preferred.",
                "tr": "number[] syntax'ı TypeScript'te dizi tanımlamak için kullanılan en temiz ve yaygın yöntemdir. Array<number> da geçerlidir ancak genellikle kısa syntax tercih edilir."
              }
            }
          },
          {
            "type": "ts-lego-visual",
            "variant": "arrays-visual"
          },
          {
            "type": "heading",
            "text": {
              "en": "Tuples",
              "tr": "Tuples"
            },
            "difficulty": "🟢 Beginner"
          },
          {
            "type": "simple-box",
            "emoji": "🎁",
            "content": {
              "tr": "Tuple, sabit boyutlu ve her pozisyonun tipi bilinen bir dizi. 'İlk eleman her zaman isim (string), ikincisi yaş (number)' gibi. Java'da tam karşılığı yok — ama Python'da tuple var ve aynı mantık.",
              "en": "A tuple is a fixed-size array where each position has a known type. 'First element is always name (string), second is age (number).' Java has no direct equivalent — but Python has tuples with the same idea."
            }
          },
          {
            "type": "code",
            "language": "typescript",
            "code": "// TypeScript Tuples — fixed-length, typed by position\n// Java has no direct equivalent (use a simple class instead)\n// Python: (name, age) = (\"Alice\", 25)\n\n// Basic tuple\nlet person: [string, number] = [\"Alice\", 25];\nlet [name, age] = person;               // destructuring\nconsole.log(name, age);                 // Alice 25\n\n// Tuple types prevent index errors\n// person[0] = 42;                      // ERROR: number not assignable to string\n// person[2] = \"extra\";                 // ERROR: index 2 out of bounds\n\n// Named tuple elements (TypeScript 4.0+)\ntype TestResult = [testName: string, passed: boolean, durationMs: number];\n\nconst result: TestResult = [\"login_test\", true, 342];\nconsole.log(result[0], result[1], result[2]);  // login_test true 342\n\n// Tuple array — array of fixed-structure pairs\ntype KeyValue = [string, string];\nconst headers: KeyValue[] = [\n  [\"Content-Type\", \"application/json\"],\n  [\"Authorization\", \"Bearer token123\"],\n  [\"Accept\", \"application/json\"],\n];\n\nheaders.forEach(([key, value]) => {\n  console.log(`${key}: ${value}`);\n});\n\n// Optional tuple element\ntype Point3D = [x: number, y: number, z?: number];\nconst p2d: Point3D = [10, 20];          // z is optional\nconst p3d: Point3D = [10, 20, 30];"
          },
          {
            "type": "editor",
            "lang": "typescript",
            "defaultCode": "// Use tuples to represent test step results\ntype StepResult = [stepName: string, passed: boolean, ms: number];\n\nfunction runStep(name: string, shouldPass: boolean): StepResult {\n  const ms = Math.floor(Math.random() * 500) + 50;\n  return [name, shouldPass, ms];\n}\n\nconst steps: StepResult[] = [\n  runStep(\"Navigate to login\", true),\n  runStep(\"Enter credentials\", true),\n  runStep(\"Click submit\", true),\n  runStep(\"Assert dashboard\", false),  // simulated failure\n];\n\nconst failed = steps.filter(([, passed]) => !passed);\nconsole.log(\"Total steps:\", steps.length);\nconsole.log(\"Failed steps:\", failed.length);\nsteps.forEach(([name, passed, ms]) => {\n  console.log(`  ${passed ? \"✓\" : \"✗\"} ${name} (${ms}ms)`);\n});"
          },
          {
            "type": "quiz",
            "question": {
              "en": "Why does let t: [string, number] = [42, 'hello'] cause an error?",
              "tr": "let t: [string, number] = [42, 'hello'] neden hata verir?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "Tuple must be empty",
                  "tr": "Tuple boş olmalı"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "Wrong number of elements",
                  "tr": "Eleman sayısı hatalı"
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "Type order is wrong: first must be string, second must be number",
                  "tr": "Tip sıralaması yanlış: ilk eleman string, ikinci number olmalı"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "Tuple must be readonly",
                  "tr": "Tuple readonly olmalı"
                }
              }
            ],
            "correct": "c",
            "explanation": {
              "en": "In [string, number] tuple, position 0 must be string, position 1 must be number. 42 is a number, not a string. TypeScript checks the type of each position.",
              "tr": "[string, number] tuple'ında 0. pozisyon string, 1. pozisyon number olmalı. 42 number'dır, string değil. TypeScript her pozisyonun tipini kontrol eder."
            },
            "retryQuestion": {
              "question": {
                "en": "Why does let user: [number, string] = ['John', 25] cause a compilation error?",
                "tr": "let user: [number, string] = ['John', 25] ataması neden derleme hatası verir?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "The tuple length is too long",
                    "tr": "Tuple uzunluğu çok fazla"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "Tuple elements are immutable",
                    "tr": "Tuple elemanları değiştirilemez"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "Type mismatch: first must be number, second must be string",
                    "tr": "Tip uyumsuzluğu: ilk eleman number, ikinci string olmalı"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "Tuples cannot contain different types",
                    "tr": "Tuple içerisinde farklı tipler bulunamaz"
                  }
                }
              ],
              "correct": "c",
              "explanation": {
                "en": "In the defined [number, string] structure, index 0 must be a number and index 1 must be a string. Since 'John' is a string, TypeScript throws a type error.",
                "tr": "Tanımlanan [number, string] yapısında, indeks 0 mutlaka bir sayı (number), indeks 1 ise metin (string) olmalıdır. 'John' bir string olduğundan TypeScript tip hatası fırlatır."
              }
            }
          },
          {
            "type": "ts-mini-hero",
            "promptTr": "Tuple ile normal array arasındaki farkı anlat. Ne zaman tuple tercih edersin? Kısa bir örnek ver.",
            "promptEn": "Explain the difference between a tuple and a regular array. When would you prefer a tuple? Give a short example.",
            "keywords": [
              [
                "sabit",
                "fixed",
                "belirli",
                "specific"
              ],
              [
                "pozisyon",
                "position",
                "index",
                "sıra",
                "order"
              ],
              [
                "tip",
                "type"
              ],
              [
                "uzunluk",
                "length",
                "boyut",
                "size"
              ]
            ],
            "modelAnswerTr": "Array: değişken uzunluk, aynı tip. Tuple: sabit uzunluk, her pozisyonun tipi farklı olabilir. Örnek: [testAdı: string, süre: number, başarı: boolean].",
            "modelAnswerEn": "Array: variable length, same type throughout. Tuple: fixed length with each position having its own type. Example: [testName: string, duration: number, passed: boolean]."
          },
          {
            "type": "simple-box",
            "emoji": "🎒",
            "content": {
              "tr": "Dizi, bir sınıftaki aynı boydaki sıralı öğrenciler gibidir. Herkes sırayla dizilmiştir ve listeye yeni öğrenciler ekleyebilirsiniz.",
              "en": "An array is like a line of students of similar height. Everyone is ordered, and you can append new students to the end of the line."
            }
          },
          {
            "type": "simple-box",
            "emoji": "💳",
            "content": {
              "tr": "Tuple, bir kimlik kartındaki ad soyad ve TC kimlik numarası gibidir. Boyutu sabittir ve ilk sıradaki verinin string, ikinci sıradakinin number olacağı kesindir.",
              "en": "A tuple is like an ID card with a Name and an ID number. The length is fixed, and the first element is always a string, while the second is always a number."
            }
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "Neden Tuple Kullanırız? Bir fonksiyondan hem durum kodu (number) hem de hata mesajı (string) gibi çiftli verileri tek bir pakette güvenle dönmek için idealdir.",
              "en": "Why Use Tuples? They are ideal for returning pairs of data (like status code as number and error message as string) in a type-safe structure from a function."
            }
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "Neden readonly Tuple? Tuple'ların boyutunun ve eleman tiplerinin sonradan `push()` veya `pop()` metotlarıyla bozulmasını önlemek için readonly tanımlanması önerilir.",
              "en": "Why Use readonly Tuples? Defining tuples as readonly prevents their length and structure from being altered by methods like `push()` or `pop()` later."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: Dizi, yan yana dizilmiş aynı renkteki LEGO tuğlaları dizisi gibidir. Sonuna istediğiniz kadar aynı renkte tuğla ekleyebilirsiniz.",
              "en": "LEGO analogy: An array is like a row of LEGO bricks of the same color side-by-side. You can snap as many bricks of the same color as you want to the end."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: Tuple, önceden dökülmüş özel bir LEGO kalıbı gibidir. 1. sırada yuvarlak delik, 2. sırada kare delik vardır; başka türlü parça takamazsınız.",
              "en": "LEGO analogy: A tuple is like a custom molded LEGO plate with exactly one round socket at index 0 and a square socket at index 1. You cannot swap them."
            }
          },
          {
            "type": "quiz",
            "question": {
              "tr": "TypeScript'te `const t: readonly [string, number] = ['status', 200]` ifadesine `t.push(300)` uygulamak istediğinizde ne olur?",
              "en": "What happens when you try to run `t.push(300)` on `const t: readonly [string, number] = ['status', 200]` in TypeScript?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "tr": "Sorunsuz çalışır ve dizi boyutu 3 olur",
                  "en": "It runs fine and the array length becomes 3"
                }
              },
              {
                "id": "b",
                "text": {
                  "tr": "Derleme zamanında tip hatası verir (readonly özellikte push metodu yoktur)",
                  "en": "It throws a compile-time type error (push does not exist on readonly types)"
                }
              },
              {
                "id": "c",
                "text": {
                  "tr": "Çalışma zamanında sessizce göz ardı edilir",
                  "en": "It is silently ignored at runtime"
                }
              },
              {
                "id": "d",
                "text": {
                  "tr": "Diziyi otomatik olarak string array'e dönüştürür",
                  "en": "It automatically converts the tuple to a string array"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "tr": "readonly olarak işaretlenmiş diziler ve tuple'lar üzerinde ekleme, silme veya değiştirme metotları (push, pop, splice vb.) kullanılamaz; derleyici kırmızı çizer.",
              "en": "Arrays and tuples marked as readonly do not expose mutating methods like push, pop, or splice; the compiler flags these actions as errors."
            },
            "retryQuestion": {
              "question": {
                "tr": "Düz bir dizi (array) ile tuple arasındaki fark nedir?",
                "en": "What is the difference between a plain array and a tuple?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "tr": "Tuple sadece sayıları kabul eder",
                    "en": "Tuples only accept numbers"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "tr": "Array sınırsız boyutta aynı tip veriyi tutarken, tuple sabit boyutta ve her indeksinde farklı belirtilmiş tipleri tutar",
                    "en": "An array holds dynamic lengths of a single type, whereas a tuple holds fixed lengths of specific types per index"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "tr": "Array derleme zamanında kontrol edilmez",
                    "en": "Arrays are not verified at compile time"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "tr": "Tuple sadece tek elemanlıdır",
                    "en": "Tuples can only hold one element"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "tr": "Array esnektir; tuple ise indeks bazlı katı sözleşmelere sahiptir (örneğin 0. indeks her zaman string, 1. indeks her zaman boolean).",
                "en": "Arrays are dynamic; tuples enforce strict index-based contracts (e.g., index 0 must be string, index 1 must be boolean)."
              }
            }
          }
        ]
      },
      {
        "title": {
          "en": "Object Types & Enums",
          "tr": "Nesne Tipleri & Enum'lar"
        },
        "blocks": [
          {
            "type": "heading",
            "text": {
              "en": "Object Types",
              "tr": "Object Types"
            },
            "difficulty": "🟢 Beginner"
          },
          {
            "type": "simple-box",
            "emoji": "📋",
            "content": {
              "tr": "Object type, bir nesnenin içinde ne olması gerektiğini söyleyen sözleşme. 'Test sonucu için mutlaka ad, durum ve süre lazım' gibi. Java'da interface veya class ile yapılır.",
              "en": "Object type is a contract saying what must be inside an object. 'A test result must have a name, status, and duration.' In Java, this is done with an interface or class."
            }
          },
          {
            "type": "code",
            "language": "typescript",
            "code": "// TypeScript Object Types\n\n// Inline object type annotation\nfunction printTest(test: { name: string; passed: boolean; duration: number }): void {\n  const icon = test.passed ? \"✓\" : \"✗\";\n  console.log(`${icon} ${test.name} (${test.duration}ms)`);\n}\n\nprintTest({ name: \"login_test\", passed: true, duration: 342 });\n\n// Optional properties (Java: nullable fields)\ntype Config = {\n  baseUrl: string;\n  timeout?: number;         // optional — may be undefined\n  retries?: number;\n};\n\nconst cfg: Config = { baseUrl: \"https://api.example.com\" };\nconst cfgWithTimeout: Config = { baseUrl: \"https://api.example.com\", timeout: 5000 };\n\n// Readonly properties\ntype ImmutableUser = {\n  readonly id: number;      // like final in Java\n  readonly email: string;\n  role: string;             // mutable\n};\n\nconst user: ImmutableUser = { id: 1, email: \"alice@example.com\", role: \"admin\" };\nuser.role = \"user\";         // OK: mutable\n// user.id = 2;             // ERROR: Cannot assign to readonly property\n\n// Index signatures — object with dynamic keys\ntype TestSuiteResults = {\n  [testName: string]: \"PASS\" | \"FAIL\" | \"SKIP\";\n};\n\nconst results: TestSuiteResults = {\n  login_test: \"PASS\",\n  checkout_test: \"FAIL\",\n  profile_test: \"SKIP\",\n};\nconsole.log(results[\"login_test\"]);  // PASS"
          },
          {
            "type": "editor",
            "lang": "typescript",
            "defaultCode": "type ApiRequest = {\n  url: string;\n  method: \"GET\" | \"POST\" | \"PUT\" | \"DELETE\";\n  headers?: { [key: string]: string };\n  body?: unknown;\n};\n\nfunction describeRequest(req: ApiRequest): string {\n  const hasBody = req.body !== undefined ? \" with body\" : \"\";\n  const headerCount = req.headers ? Object.keys(req.headers).length : 0;\n  return `${req.method} ${req.url}${hasBody} (${headerCount} headers)`;\n}\n\nconst loginReq: ApiRequest = {\n  url: \"/api/login\",\n  method: \"POST\",\n  headers: { \"Content-Type\": \"application/json\" },\n  body: { email: \"test@example.com\", password: \"secret\" },\n};\n\nconst listReq: ApiRequest = {\n  url: \"/api/users\",\n  method: \"GET\",\n};\n\nconsole.log(describeRequest(loginReq));\nconsole.log(describeRequest(listReq));"
          },
          {
            "type": "quiz",
            "question": {
              "en": "What does a '?' after a property name mean in a TypeScript object type?",
              "tr": "TypeScript object type'ta '?' ile işaretlenmiş property ne anlama gelir?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "readonly",
                  "tr": "readonly"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "Optional — may be undefined",
                  "tr": "Opsiyonel — tanımsız olabilir"
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "Cannot be null",
                  "tr": "Null olamaz"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "Required field",
                  "tr": "Zorunlu alan"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "en": "'?' makes a property optional — the value may not be present (undefined). Similar to Java's @Nullable annotation. timeout?: number means it can be a number or undefined.",
              "tr": "'?' property'yi opsiyonel yapar — değer olmayabilir (undefined). Java'da @Nullable annotation'ına benzer. timeout?: number yazınca timeout veya undefined olabilir."
            },
            "retryQuestion": {
              "question": {
                "en": "What does adding a ':' at the end of a property in an interface imply?",
                "tr": "Bir interface içerisinde bir property'nin sonuna eklenen ':' işaretinin anlamı nedir?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "Specifies that the property is read-only",
                    "tr": "Property'nin sadece okuma modunda olduğunu belirtir"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "Indicates the property is not required and can be undefined",
                    "tr": "Property'nin zorunlu olmadığını, undefined olabileceğini belirtir"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "Ensures the property must always have a value",
                    "tr": "Property'nin mutlaka bir değer alması gerektiğini belirtir"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "Indicates the property can only be used in functions",
                    "tr": "Property'nin sadece fonksiyonlarda kullanılabileceğini belirtir"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "en": "In TypeScript, the '?' symbol indicates an optional field. This means if the field is missing in an object, no compilation error occurs and its value is treated as undefined.",
                "tr": "TypeScript'te '?' işareti bir alanın opsiyonel olduğunu gösterir. Yani o alan nesnede bulunmasa bile derleme hatası oluşmaz ve değeri undefined olarak değerlendirilir."
              }
            }
          },
          {
            "type": "ts-mini-hero",
            "promptTr": "TypeScript object type ile Java interface arasındaki benzerlikleri ve farkları anlat. Java'dan bakış açısıyla kısaca.",
            "promptEn": "Compare TypeScript object types and Java interfaces — key similarities and differences. Use your Java background.",
            "keywords": [
              [
                "interface",
                "sözleşme",
                "contract",
                "şekil",
                "shape"
              ],
              [
                "opsiyonel",
                "optional",
                "zorunlu",
                "required"
              ],
              [
                "readonly",
                "final"
              ],
              [
                "inline",
                "tip",
                "type"
              ]
            ],
            "modelAnswerTr": "İkisi de nesne şeklini tanımlar. Farklar: TS'de ? ile opsiyonel alanlar, readonly ile immutable, ve inline tanım mümkün. Java'da her zaman ayrı bir file/class gerekir.",
            "modelAnswerEn": "Both define the shape of an object. Differences: TS supports ? for optional, readonly for immutability, and inline type definitions — Java always requires a separate file/class."
          },
          {
            "type": "heading",
            "text": {
              "en": "Enums",
              "tr": "Enums"
            },
            "difficulty": "🟢 Beginner"
          },
          {
            "type": "simple-box",
            "emoji": "🎯",
            "content": {
              "tr": "Enum, izin verilen değerlerin sabit listesi. 'Test durumu sadece PASS, FAIL veya SKIP olabilir — başka bir şey yazarsan hata alırsın.' Java'da enum zaten vardı — TypeScript'te de aynı mantık.",
              "en": "An enum is a fixed list of allowed values. 'Test status can only be PASS, FAIL, or SKIP — write anything else and you get an error.' Java already had enums — TypeScript works the same way."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "Java'da enum çok güçlü — method'u, field'ı olabilir. TypeScript'te numeric enum (0,1,2) ve string enum var. QA'de string enum tercih edilir çünkü debug edilmesi kolay: TestStatus.PASS = 'PASS' string değeri taşır.",
              "en": "Java enums are powerful — they can have methods and fields. TypeScript has numeric enums (0,1,2) and string enums. In QA, string enums are preferred because they are easy to debug: TestStatus.PASS carries the string value 'PASS'."
            }
          },
          {
            "type": "code",
            "language": "typescript",
            "code": "// TypeScript Enums — QA Test Status Example\n\n// String enum (preferred in QA — readable in logs)\nenum TestStatus {\n  PASS = \"PASS\",      // value = string literal\n  FAIL = \"FAIL\",\n  SKIP = \"SKIP\",\n  PENDING = \"PENDING\"\n}\n\n// Numeric enum (auto-increments from 0)\nenum Priority {\n  LOW,      // = 0\n  MEDIUM,   // = 1\n  HIGH,     // = 2\n  CRITICAL  // = 3\n}\n\ninterface TestCase {\n  name: string;\n  status: TestStatus;\n  priority: Priority;\n}\n\nconst tc: TestCase = {\n  name: \"login_test\",\n  status: TestStatus.PASS,   // type-safe: only PASS/FAIL/SKIP/PENDING allowed\n  priority: Priority.HIGH,\n};\n\nconsole.log(tc.status);                 // PASS (string enum)\nconsole.log(tc.priority);               // 2   (numeric enum)\nconsole.log(Priority[2]);               // HIGH (reverse lookup works for numeric)\n\n// Use in switch\nfunction getStatusIcon(status: TestStatus): string {\n  switch (status) {\n    case TestStatus.PASS:    return \"✅\";\n    case TestStatus.FAIL:    return \"❌\";\n    case TestStatus.SKIP:    return \"⏭️\";\n    case TestStatus.PENDING: return \"⏳\";\n  }\n}\n\nconsole.log(getStatusIcon(TestStatus.FAIL));  // ❌"
          },
          {
            "type": "editor",
            "lang": "typescript",
            "defaultCode": "enum HttpMethod {\n  GET = \"GET\",\n  POST = \"POST\",\n  PUT = \"PUT\",\n  DELETE = \"DELETE\",\n  PATCH = \"PATCH\",\n}\n\nenum StatusCode {\n  OK = 200,\n  CREATED = 201,\n  BAD_REQUEST = 400,\n  UNAUTHORIZED = 401,\n  NOT_FOUND = 404,\n  SERVER_ERROR = 500,\n}\n\ninterface ApiCall {\n  method: HttpMethod;\n  endpoint: string;\n  expectedStatus: StatusCode;\n}\n\nconst apiTests: ApiCall[] = [\n  { method: HttpMethod.GET, endpoint: \"/api/users\", expectedStatus: StatusCode.OK },\n  { method: HttpMethod.POST, endpoint: \"/api/users\", expectedStatus: StatusCode.CREATED },\n  { method: HttpMethod.DELETE, endpoint: \"/api/users/1\", expectedStatus: StatusCode.OK },\n];\n\napiTests.forEach(t => {\n  console.log(`${t.method} ${t.endpoint} → expected ${t.expectedStatus}`);\n});"
          },
          {
            "type": "comparison",
            "title": {
              "tr": "Java ile Karşılaştırma",
              "en": "Java vs TypeScript — Enums"
            },
            "columns": [
              "Java",
              "TypeScript"
            ],
            "rows": [
              {
                "concept": {
                  "tr": "Temel enum",
                  "en": "Basic enum"
                },
                "java": "enum Status { PASS, FAIL }",
                "typescript": "enum Status { PASS = 'PASS', FAIL = 'FAIL' }"
              },
              {
                "concept": {
                  "tr": "Metod",
                  "en": "Methods"
                },
                "java": "Can have methods/fields",
                "typescript": "No methods (use namespace for that)"
              },
              {
                "concept": {
                  "tr": "Kullanım",
                  "en": "Usage"
                },
                "java": "Status.PASS",
                "typescript": "Status.PASS"
              },
              {
                "concept": {
                  "tr": "Switch",
                  "en": "Switch"
                },
                "java": "switch(s) { case PASS: }",
                "typescript": "switch(s) { case Status.PASS: }"
              }
            ]
          },
          {
            "type": "quiz",
            "question": {
              "en": "Why are string enums preferred over numeric enums in QA tests?",
              "tr": "QA testlerinde string enum neden numeric enum'a tercih edilir?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "They are faster",
                  "tr": "Daha hızlı"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "Values are readable in logs and debug (you see PASS, not 0)",
                  "tr": "Log ve debug'da değer okunabilir (PASS görürsün, 0 değil)"
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "They use less memory",
                  "tr": "Daha az bellek kullanır"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "Required — TypeScript has no numeric enums",
                  "tr": "Zorunlu — TypeScript'te numeric enum yok"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "en": "With string enum, TestStatus.PASS = 'PASS' — you see 'PASS' in logs. With numeric enum, TestStatus.PASS = 0 — you see 0 in logs, hard to understand. Readability matters in QA tools.",
              "tr": "String enum'da TestStatus.PASS = 'PASS' — log dosyasında 'PASS' görürsün. Numeric enum'da TestStatus.PASS = 0 — log'da 0 görürsün, anlamak zor. QA araçlarında okunabilirlik önemli."
            },
            "retryQuestion": {
              "question": {
                "en": "Why is it preferred in QA automation to use a string-based structure instead of 'enum Role { ADMIN, GUEST }'?",
                "tr": "QA otomasyonunda neden tercih edilir: 'const Role = { ADMIN: \"ADMIN\", GUEST: \"GUEST\" }' gibi bir yapı yerine 'enum Role { ADMIN, GUEST }' yerine string tabanlı bir yapı kullanmak?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "String values occupy less memory",
                    "tr": "String değerler bellekte daha az yer kaplar"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "Better readability of values as text during debugging and reporting",
                    "tr": "Hata ayıklama (debug) ve raporlama aşamasında değerlerin metin olarak okunabilir olması"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "String values are faster to compare",
                    "tr": "String değerler daha hızlı karşılaştırılır"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "Numeric enums are not supported by TypeScript",
                    "tr": "Numeric enum'lar TypeScript tarafından desteklenmez"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "en": "String-based structures (or string enums) ensure that when you see 'Role.ADMIN' in logs, you see the text 'ADMIN'. Numeric enums show only numbers, which makes test error reports harder to interpret.",
                "tr": "String tabanlı yapılar (veya string enum'lar), loglarda 'Role.ADMIN' değerini gördüğünüzde direkt 'ADMIN' metnini görmenizi sağlar. Numeric enum'lar ise sadece bir sayı gösterir, bu da test hata raporlarını anlamayı zorlaştırır."
              }
            }
          },
          {
            "type": "ts-lego-visual",
            "variant": "enums-visual"
          },
          {
            "type": "interview-questions",
            "topic": "TypeScript Foundations",
            "questions": [
              {
                "level": "basic",
                "q": {
                  "tr": "TypeScript neden JavaScript'e üstündür? Ne zaman tercih edilir?",
                  "en": "Why is TypeScript better than JavaScript? When should you prefer it?"
                },
                "a": {
                  "tr": "TypeScript compile-time type checking sağlar — hatalar çalıştırmadan önce yakalanır. Büyük ekiplerde, uzun vadeli projelerde, framework geliştirmede tercih edilir. Playwright ve Angular TypeScript ile yazılmıştır. Küçük scriptler için overkill olabilir.",
                  "en": "TypeScript provides compile-time type checking — bugs are caught before running. Preferred for large teams, long-term projects, framework development. Playwright and Angular are written in TypeScript. May be overkill for small scripts."
                }
              },
              {
                "level": "basic",
                "q": {
                  "tr": "TypeScript'te 'any' tipini neden kaçınmalısın?",
                  "en": "Why should you avoid the 'any' type in TypeScript?"
                },
                "a": {
                  "tr": "'any' tipin tüm type checking'i devre dışı bırakır — TypeScript'i JavaScript gibi yapar. 'any' değişkeni her metodu çağırabilir, hiçbiri kontrol edilmez. Bunun yerine 'unknown' kullan: önce typeof kontrolü yapman gerekir. Codebase'de any'nin yayılması tip güvenliğini tamamen mahveder.",
                  "en": "'any' disables all type checking — makes TypeScript behave like JavaScript. An 'any' variable can call any method with no checks. Use 'unknown' instead: it requires a typeof check first. Spreading 'any' through a codebase completely destroys type safety."
                }
              },
              {
                "level": "intermediate",
                "q": {
                  "tr": "TypeScript'te tuple ne zaman kullanılmalı?",
                  "en": "When should you use a tuple in TypeScript?"
                },
                "a": {
                  "tr": "Sabit sayıda eleman ve her pozisyonun tipi farklı olduğunda. Örneğin: [string, number, boolean] — name, age, active gibi. Genellikle fonksiyon dönüş değerleri için kullanılır: function useState<T>(init: T): [T, (v: T) => void]. Nesne daha okunabilirse, tuple yerine obje tercih et.",
                  "en": "When you have a fixed number of elements and each position has a different type. Example: [string, number, boolean] — like name, age, active. Often used for function return values: function useState<T>(init: T): [T, (v: T) => void]. If an object would be more readable, prefer that over a tuple."
                }
              }
            ]
          },
          {
            "type": "simple-box",
            "emoji": "📋",
            "content": {
              "tr": "Nesne tipi, bir form şablonu gibidir. Formda 'Ad', 'Soyad' ve 'E-posta' alanlarının olacağını baştan belirlersiniz; kimse fazladan veya eksik alan dolduramaz.",
              "en": "An object type is like a form template. You declare that 'Name', 'Surname', and 'Email' are required; no one can add random fields or leave out mandatory ones."
            }
          },
          {
            "type": "simple-box",
            "emoji": "🚦",
            "content": {
              "tr": "Enum, bir trafik lambası gibidir. Lambanın renkleri sadece KIRMIZI, SARI ve YEŞİL olabilir; mor veya mavi gibi geçersiz bir renk seçme şansınız yoktur.",
              "en": "An enum is like a traffic light. The lights can only be RED, YELLOW, or GREEN; there is no option to choose invalid colors like purple or cyan."
            }
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "Neden String Enum Tercih Edilir? Numeric enum'lar (0, 1, 2) loglarda ve hata raporlarında anlaşılmaz. String enum'lar ise raporlarda doğrudan 'PASS' veya 'FAIL' yazdırarak okunabilirliği artırır.",
              "en": "Why Prefer String Enums? Numeric enums output numbers (0, 1, 2) which are meaningless in logs. String enums write readable labels like 'PASS' or 'FAIL' directly to reports."
            }
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "tsconfig.json'daki excessPropertyChecks: Nesne literalleri tanımlanırken şablonda olmayan ek özelliklerin geçilmesini engeller, böylece hatalı/fazla parametre gönderilmesini önler.",
              "en": "tsconfig.json's excessPropertyChecks: Prevents passing undeclared properties when defining objects inline, catching typos or extra parameters early."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: Nesne tipi, bir LEGO evinin plan şablonudur. Evde 2 pencere ve 1 kapı yuvası olacağını söyler; bu yuvaya uymayan parçaları takamazsınız.",
              "en": "LEGO analogy: An object type is the blueprint for a LEGO house. It dictates exactly where the doors and windows fit; you cannot plug elements into invalid spots."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: Enum, fabrikadan özel kalıpla dökülmüş 3 renkli LEGO setidir (sadece sarı, yeşil, kırmızı). Başka renk veya boyutta parça üretemezsiniz.",
              "en": "LEGO analogy: An enum is a set of 3 pre-molded colored LEGO bricks (yellow, green, red only). You cannot introduce arbitrary colors outside this predefined palette."
            }
          },
          {
            "type": "quiz",
            "question": {
              "tr": "Aşağıdaki enum tanımlarından hangisi test raporlarında daha okunabilir log çıktıları üretir?",
              "en": "Which enum declaration produces more readable output in test reports and logs?"
            },
            "options": [
              {
                "id": "a",
                "text": "enum Status { PASS, FAIL, SKIP }"
              },
              {
                "id": "b",
                "text": "enum Status { PASS = 'PASS', FAIL = 'FAIL', SKIP = 'SKIP' }"
              },
              {
                "id": "c",
                "text": "type Status = 0 | 1 | 2"
              },
              {
                "id": "d",
                "text": "const Status = { PASS: 0, FAIL: 1 }"
              }
            ],
            "correct": "b",
            "explanation": {
              "tr": "Açıkça string değer atanmış enum'lar (String Enums), loglarda sayısal kodlar (0, 1, 2) yerine doğrudan 'PASS' değerini yazdırarak debug sürecini kolaylaştırır.",
              "en": "String enums with explicit string initializers write readable values like 'PASS' in logs rather than integer codes, making debugging much easier."
            },
            "retryQuestion": {
              "question": {
                "tr": "TypeScript nesne tiplerinde isteğe bağlı (optional) bir özellik nasıl tanımlanır?",
                "en": "How is an optional property declared in TypeScript object types?"
              },
              "options": [
                {
                  "id": "a",
                  "text": "propertyName?: type"
                },
                {
                  "id": "b",
                  "text": "propertyName!: type"
                },
                {
                  "id": "c",
                  "text": "propertyName: type | null"
                },
                {
                  "id": "d",
                  "text": "propertyName: optional type"
                }
              ],
              "correct": "a",
              "explanation": {
                "tr": "Özellik isminden sonra eklenen '?' sembolü, o alanın nesne içinde bulunmasının zorunlu olmadığını (undefined olabileceğini) belirtir.",
                "en": "Adding a '?' after the property name flags it as optional, meaning the object is valid whether the property is defined or undefined."
              }
            }
          },
          {
            "type": "interview-questions",
            "topic": "TypeScript Foundations",
            "questions": [
              {
                "level": "basic",
                "q": {
                  "tr": "TypeScript neden JavaScript'e üstündür? Ne zaman tercih edilir?",
                  "en": "Why is TypeScript better than JavaScript? When should you prefer it?"
                },
                "a": {
                  "tr": "TypeScript compile-time type checking sağlar — hatalar çalıştırmadan önce yakalanır. Büyük ekiplerde, uzun vadeli projelerde, framework geliştirmede tercih edilir. Playwright ve Angular TypeScript ile yazılmıştır. Küçük scriptler için overkill olabilir.",
                  "en": "TypeScript provides compile-time type checking — bugs are caught before running. Preferred for large teams, long-term projects, framework development. Playwright and Angular are written in TypeScript. May be overkill for small scripts."
                }
              },
              {
                "level": "basic",
                "q": {
                  "tr": "TypeScript'te 'any' tipini neden kaçınmalısın?",
                  "en": "Why should you avoid the 'any' type in TypeScript?"
                },
                "a": {
                  "tr": "'any' tipin tüm type checking'i devre dışı bırakır — TypeScript'i JavaScript gibi yapar. 'any' değişkeni her metodu çağırabilir, hiçbiri kontrol edilmez. Bunun yerine 'unknown' kullan: önce typeof kontrolü yapman gerekir. Codebase'de any'nin yayılması tip güvenliğini tamamen mahveder.",
                  "en": "'any' disables all type checking — makes TypeScript behave like JavaScript. An 'any' variable can call any method with no checks. Use 'unknown' instead: it requires a typeof check first. Spreading 'any' through a codebase completely destroys type safety."
                }
              },
              {
                "level": "intermediate",
                "q": {
                  "tr": "TypeScript'te tuple ne zaman kullanılmalı?",
                  "en": "When should you use a tuple in TypeScript?"
                },
                "a": {
                  "tr": "Sabit sayıda eleman ve her pozisyonun tipi farklı olduğunda. Örneğin: [string, number, boolean] — name, age, active gibi. Genellikle fonksiyon dönüş değerleri için kullanılır: function useState<T>(init: T): [T, (v: T) => void]. Nesne daha okunabilirse, tuple yerine obje tercih et.",
                  "en": "When you have a fixed number of elements and each position has a different type. Example: [string, number, boolean] — like name, age, active. Often used for function return values: function useState<T>(init: T): [T, (v: T) => void]. If an object would be more readable, prefer that over a tuple."
                }
              }
            ]
          }
        ]
      },
      {
        "title": {
          "en": "Interface & Union Types",
          "tr": "Interface & Union Tipleri"
        },
        "blocks": [
          {
            "type": "heading",
            "text": {
              "en": "Union Types",
              "tr": "Union Types"
            },
            "difficulty": "🟡 Intermediate"
          },
          {
            "type": "simple-box",
            "emoji": "🔀",
            "content": {
              "tr": "Union type, 'bu ya şu ya bu' demek. ID ya number ya string olabilir. Java'da bunu generic ya da overload ile yapardın — TypeScript daha zarif.",
              "en": "A union type means 'this OR that.' An ID can be either a number or a string. In Java you'd use generics or overloads — TypeScript is more elegant."
            }
          },
          {
            "type": "code",
            "language": "typescript",
            "code": "// Union Types — value can be one of multiple types\ntype TestStatus = \"PASS\" | \"FAIL\" | \"SKIP\";     // literal union\n\nfunction formatId(id: string | number): string {\n  if (typeof id === \"number\") {           // type narrowing\n    return \"TC-\" + id.toString().padStart(4, \"0\");\n  }\n  return id.startsWith(\"TC-\") ? id : \"TC-\" + id;\n}\nconsole.log(formatId(42));          // TC-0042\nconsole.log(formatId(\"LOGIN-001\")); // TC-LOGIN-001\n\n// Discriminated union — best pattern for modeling variants\ntype ApiResponse =\n  | { status: \"success\"; data: unknown; statusCode: 200 }\n  | { status: \"error\"; message: string; statusCode: 400 | 401 | 404 | 500 };\n\nfunction handleResponse(res: ApiResponse): void {\n  if (res.status === \"success\") {\n    console.log(\"Data:\", res.data);\n  } else {\n    console.error(\"Error \" + res.statusCode + \": \" + res.message);\n  }\n}\n\nhandleResponse({ status: \"success\", data: { users: 5 }, statusCode: 200 });\nhandleResponse({ status: \"error\", message: \"Not found\", statusCode: 404 });"
          },
          {
            "type": "editor",
            "lang": "typescript",
            "defaultCode": "// Model test events with discriminated union\ntype TestEvent =\n  | { type: \"start\"; testName: string; timestamp: number }\n  | { type: \"pass\"; testName: string; durationMs: number }\n  | { type: \"fail\"; testName: string; errorMessage: string; durationMs: number }\n  | { type: \"skip\"; testName: string; reason: string };\n\nfunction logEvent(event: TestEvent): void {\n  switch (event.type) {\n    case \"start\":\n      console.log(\"Starting: \" + event.testName);\n      break;\n    case \"pass\":\n      console.log(\"PASS: \" + event.testName + \" (\" + event.durationMs + \"ms)\");\n      break;\n    case \"fail\":\n      console.log(\"FAIL: \" + event.testName + \" — \" + event.errorMessage);\n      break;\n    case \"skip\":\n      console.log(\"SKIP: \" + event.testName + \" — \" + event.reason);\n      break;\n  }\n}\n\nconst events: TestEvent[] = [\n  { type: \"start\", testName: \"login_test\", timestamp: Date.now() },\n  { type: \"pass\", testName: \"login_test\", durationMs: 342 },\n  { type: \"fail\", testName: \"checkout_test\", errorMessage: \"Timeout\", durationMs: 5000 },\n  { type: \"skip\", testName: \"payment_test\", reason: \"Feature not ready\" },\n];\nevents.forEach(logEvent);"
          },
          {
            "type": "quiz",
            "question": {
              "en": "What does 'type narrowing' mean in TypeScript?",
              "tr": "TypeScript'te 'type narrowing' ne anlama gelir?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "Making the type smaller (bad thing)",
                  "tr": "Tipi daraltmak (kötü)"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "TypeScript knowing a more specific type after typeof/instanceof checks",
                  "tr": "typeof/instanceof kontrolleri sonrası TypeScript'in daha spesifik tip bilmesi"
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "Converting to any type",
                  "tr": "Tipi any'ye çevirmek"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "Removing a type from a union",
                  "tr": "Union'dan bir tip kaldırmak"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "en": "Type narrowing: after a typeof check, TypeScript knows the variable's specific type. Inside if (typeof x === 'number'), TypeScript guarantees x is a number.",
              "tr": "Type narrowing: typeof kontrolü sonrası TypeScript değişkenin tipini bilir. if (typeof x === 'number') içinde TypeScript x'in number olduğunu garanti eder."
            },
            "retryQuestion": {
              "question": {
                "en": "What is it called when a union type (string | number) is narrowed down to a specific type in TypeScript?",
                "tr": "TypeScript'te bir union tipinin (string | number) kesin bir tipe indirgenmesine ne ad verilir?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "Type casting",
                    "tr": "Type casting"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "Type narrowing",
                    "tr": "Type narrowing"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "Type annotation",
                    "tr": "Type annotation"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "Type inference",
                    "tr": "Type inference"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "en": "Type narrowing is the process of using control flow analysis (if/else, typeof, instanceof) to allow TypeScript to refine a variable's type to a more specific one.",
                "tr": "Type narrowing, kontrol akışı analizi (if/else, typeof, instanceof) kullanarak TypeScript'in değişkenin tipini daha dar bir kapsamda kesinleştirmesine verilen isimdir."
              }
            }
          },
          {
            "type": "ts-mini-hero",
            "promptTr": "Hey dostum! Şöyle bir kodun var: let id: string | number = getUserId(). O '|' sihirli çubuğu ne yapıyor? Bana teknik terim kullanmadan, sanki 5 yaşındaki bir çocuğa anlatır gibi açıkla!",
            "promptEn": "Hey friend! You have: let id: string | number = getUserId(). What does that '|' magic wand do? Explain it to me without any technical jargon, like I'm 5 years old!",
            "keywords": [
              [
                "ya da",
                "or",
                "veya",
                "either"
              ],
              "union",
              [
                "ikisi",
                "both",
                "birden"
              ],
              "string",
              "number"
            ],
            "modelAnswerTr": "Union type (|) 'ya bu ya da bu' demek. Telefon numarası hem '0532...' (string) hem de 5321234 (number) olabilir. TypeScript her ikisine de izin veren bir tip tanımlar. İki kutunun her ikisinden birine koyabilirsin.",
            "modelAnswerEn": "A union type (|) means 'either this OR that.' A phone number can be '0532...' as a string OR 5321234 as a number. TypeScript defines a type that accepts both — like a box that fits either shape."
          },
          {
            "type": "simple-box",
            "emoji": "🤝",
            "content": {
              "tr": "Interface, iki şirket arasındaki sözleşme gibidir. 'Eğer bu projeyi yapacaksan, şu metotları teslim etmek zorundasın' der. Sınıflar bu sözleşmeye uymak zorundadır.",
              "en": "An interface is like a business contract. It states: 'If you want this project, you must deliver these methods.' Classes implement this contract."
            }
          },
          {
            "type": "simple-box",
            "emoji": "🔌",
            "content": {
              "tr": "Union type, hem USB-C hem de Lightning şarj kablosu kabul eden ikili bir priz gibidir. Giriş ya A tipi ya da B tipi olabilir.",
              "en": "A union type is like a charging block with dual inputs for both USB-C and Lightning. The input can be either type A or type B."
            }
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "Neden Declaration Merging Var? Interface'ler aynı isimle tekrar tanımlandığında birleşirler. Bu özellik, Playwright gibi üçüncü taraf kütüphanelerin tiplerine yeni fixture özellikleri eklemek için çok yararlıdır.",
              "en": "Why is Declaration Merging Useful? Re-declaring an interface merges its properties. This is highly useful for extending third-party library types (like Playwright test fixtures)."
            }
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "Neden Type Alias Tercih Edilir? Type alias'lar, union (`string | number`) veya intersection (`A & B`) gibi interface'lerin yapamayacağı karmaşık bileşik tipleri tanımlayabilir.",
              "en": "Why Prefer Type Aliases? Type aliases can represent union (`string | number`) or intersection (`A & B`) shapes that interfaces cannot declare."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: Interface declaration merging, iki LEGO bloğunu üst üste takarak tek bir parça gibi birleştirmek gibidir. İki parça birleşip tek bir büyük bütün oluşturur.",
              "en": "LEGO analogy: Interface declaration merging is like stacking two LEGO bricks together. They lock into place and form a single, unified structure."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: Union tipi, hem yuvarlak hem kare deliklere uyan esnek bir LEGO bağlantı parçası gibidir. İki farklı yuvaya da uyum sağlayabilir.",
              "en": "LEGO analogy: A union type is like a flexible connector brick that fits either round or square LEGO pegs. It adapts to fit either interface."
            }
          },
          {
            "type": "quiz",
            "question": {
              "tr": "Interface'in desteklediği ama Type Alias'ın desteklemediği özellik hangisidir?",
              "en": "Which feature is supported by interfaces but not by type aliases?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "tr": "Union tipler tanımlama",
                  "en": "Declaring union types"
                }
              },
              {
                "id": "b",
                "text": {
                  "tr": "Declaration Merging (aynı isimli bildirimlerin otomatik birleşmesi)",
                  "en": "Declaration Merging (automatic merging of identical declarations)"
                }
              },
              {
                "id": "c",
                "text": {
                  "tr": "Nesne şekillerini tanımlama",
                  "en": "Describing object shapes"
                }
              },
              {
                "id": "d",
                "text": {
                  "tr": "Sınıflar tarafından implement edilme",
                  "en": "Being implemented by classes"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "tr": "Interface'ler genişletilebilir; aynı isimli iki interface derleyici tarafından otomatik birleştirilir. Type alias ise sonradan tekrar tanımlanamaz (reopened).",
              "en": "Interfaces can be reopened to merge declarations; type aliases cannot be changed once declared."
            },
            "retryQuestion": {
              "question": {
                "tr": "Aşağıdaki tanımlardan hangisi bir Union tipi doğru şekilde tanımlar?",
                "en": "Which of the following correctly defines a Union type?"
              },
              "options": [
                {
                  "id": "a",
                  "text": "type ID = string & number"
                },
                {
                  "id": "b",
                  "text": "type ID = string | number"
                },
                {
                  "id": "c",
                  "text": "interface ID { val: string | number }"
                },
                {
                  "id": "d",
                  "text": "type ID = [string, number]"
                }
              ],
              "correct": "b",
              "explanation": {
                "tr": "Union tipler '|' (pipe) sembolü ile tanımlanır ve değişkenin bu tiplerden herhangi birine sahip olabileceğini ifade eder.",
                "en": "Union types are declared using the '|' (pipe) symbol, indicating that a value can be any of the listed types."
              }
            }
          }
        ]
      },
      {
        "title": {
          "en": "Functions & Casting",
          "tr": "Fonksiyonlar & Tip Dönüştürme"
        },
        "blocks": [
          {
            "type": "heading",
            "text": {
              "en": "Functions",
              "tr": "Functions"
            },
            "difficulty": "🟡 Intermediate"
          },
          {
            "type": "simple-box",
            "emoji": "⚙️",
            "content": {
              "tr": "TypeScript fonksiyonları Java metodlarına çok benzer — ama daha kısa syntax. Parametre tipleri ve dönüş tipi belirtilir.",
              "en": "TypeScript functions are very similar to Java methods — but with shorter syntax. Parameter types and return types are specified."
            }
          },
          {
            "type": "code",
            "language": "typescript",
            "code": "// TypeScript Functions — all key patterns\nfunction add(a: number, b: number): number {\n  return a + b;\n}\n\n// Arrow function\nconst multiply = (a: number, b: number): number => a * b;\n\n// Optional and default parameters\nfunction createTestUser(\n  email: string,\n  role: \"admin\" | \"user\" = \"user\",    // default value\n  active?: boolean                      // optional\n): { email: string; role: string; active: boolean } {\n  return { email, role, active: active ?? true };\n}\n\nconsole.log(JSON.stringify(createTestUser(\"alice@example.com\")));\nconsole.log(JSON.stringify(createTestUser(\"admin@example.com\", \"admin\")));\n\n// Rest parameters (like Java varargs)\nfunction joinLogs(...messages: string[]): string {\n  return messages.join(\" | \");\n}\nconsole.log(joinLogs(\"PASS\", \"login\", \"342ms\"));\n\n// Function type\ntype Validator = (value: string) => boolean;\n\nconst isEmail: Validator = (v) => v.includes(\"@\") && v.includes(\".\");\nconst isPhone: Validator = (v) => /^[0-9]{10,11}$/.test(v);\n\nconsole.log(isEmail(\"test@example.com\"));  // true\nconsole.log(isPhone(\"05551234567\"));       // true"
          },
          {
            "type": "editor",
            "lang": "typescript",
            "defaultCode": "// Generic assertion helper with typed parameters\nfunction assertEqual<T>(actual: T, expected: T, message?: string): void {\n  const passed = JSON.stringify(actual) === JSON.stringify(expected);\n  const label = message ?? \"assertEqual\";\n  const icon = passed ? \"PASS\" : \"FAIL\";\n  console.log(icon + \": \" + label);\n  if (!passed) {\n    console.log(\"  Expected: \" + JSON.stringify(expected));\n    console.log(\"  Actual:   \" + JSON.stringify(actual));\n  }\n}\n\nassertEqual(2 + 2, 4, \"2+2=4\");\nassertEqual(\"hello\".toUpperCase(), \"HELLO\", \"toUpperCase\");\nassertEqual([1, 2, 3].length, 3, \"array length\");\nassertEqual(\"test\".includes(\"es\"), false, \"includes check\"); // fails"
          },
          {
            "type": "comparison",
            "title": {
              "tr": "Java ile Karşılaştırma",
              "en": "Java vs TypeScript — Functions"
            },
            "columns": [
              "Java",
              "TypeScript"
            ],
            "rows": [
              {
                "concept": {
                  "en": "Basic function",
                  "tr": "Basic function"
                },
                "java": "public int add(int a, int b)",
                "typescript": "function add(a: number, b: number): number"
              },
              {
                "concept": {
                  "en": "Arrow/lambda",
                  "tr": "Arrow/lambda"
                },
                "java": "(a, b) -> a + b",
                "typescript": "(a, b) => a + b"
              },
              {
                "concept": {
                  "en": "Default param",
                  "tr": "Default param"
                },
                "java": "Not supported (use overload)",
                "typescript": "function f(x: number = 0)"
              },
              {
                "concept": {
                  "en": "Varargs",
                  "tr": "Varargs"
                },
                "java": "void f(String... msgs)",
                "typescript": "function f(...msgs: string[])"
              }
            ]
          },
          {
            "type": "quiz",
            "question": {
              "en": "What does '?' at the end of a parameter name mean in TypeScript?",
              "tr": "TypeScript'te parametre sonundaki '?' ne anlama gelir?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "Parameter is nullable",
                  "tr": "Parametre nullable"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "Parameter is optional — can be undefined, can be omitted",
                  "tr": "Parametre opsiyonel — undefined olabilir, geçilmeyebilir"
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "Parameter is a string",
                  "tr": "Parametre bir string"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "Return type is optional",
                  "tr": "Return type optional"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "en": "function f(x?: number) means x can be number or undefined, and can be omitted. f() and f(42) are both valid.",
              "tr": "function f(x?: number) yazınca x hem number hem undefined olabilir ve çağırırken geçilmeyebilir. f() ve f(42) ikisi de geçerli."
            },
            "retryQuestion": {
              "question": {
                "en": "What does the '?' symbol represent in a TypeScript function parameter?",
                "tr": "TypeScript fonksiyon parametresinde kullanılan '?' işareti neyi ifade eder?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "The parameter type is unknown",
                    "tr": "Parametrenin tipinin kesinlikle bilinmediği"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "The parameter is optional and can be omitted",
                    "tr": "Parametrenin opsiyonel olduğu ve eksik gönderilebileceği"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "The parameter is mandatory",
                    "tr": "Parametrenin zorunlu olduğu"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "The parameter can only accept null",
                    "tr": "Parametrenin sadece null değer alabileceği"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "en": "The '?' added to a parameter name indicates that the parameter is not required during the function call. If it is omitted, its value will be 'undefined'.",
                "tr": "Parametre isminin sonuna eklenen '?', ilgili parametrenin çağrı sırasında gönderilmesinin zorunlu olmadığını belirtir. Gönderilmediğinde değeri 'undefined' olur."
              }
            }
          },
          {
            "type": "ts-lego-visual",
            "variant": "functions-visual"
          },
          {
            "type": "heading",
            "text": {
              "en": "Casting",
              "tr": "Casting"
            },
            "difficulty": "🟡 Intermediate"
          },
          {
            "type": "simple-box",
            "emoji": "🔄",
            "content": {
              "tr": "Casting, TypeScript'e 'Biliyorum bu any tipinde görünüyor ama aslında string — güven bana' demek. 'as' keyword'ü kullanılır. Java'daki (String) obj gibi.",
              "en": "Casting tells TypeScript 'I know this looks like any but it is actually a string — trust me.' Uses the 'as' keyword. Like (String) obj in Java."
            }
          },
          {
            "type": "code",
            "language": "typescript",
            "code": "// TypeScript Casting (Type Assertions)\n// as keyword — tells TypeScript what type to treat a value as\n// NOTE: no actual runtime conversion — purely compile-time hint\n\ninterface User {\n  id: number;\n  email: string;\n  role: string;\n}\n\n// Casting from unknown (common with API responses)\nfunction toUser(raw: unknown): User | null {\n  if (\n    typeof raw === \"object\" && raw !== null &&\n    \"id\" in raw && \"email\" in raw && \"role\" in raw\n  ) {\n    return raw as User;      // safe: we checked the shape\n  }\n  return null;\n}\n\nconst apiData: unknown = { id: 1, email: \"alice@example.com\", role: \"admin\" };\nconst user = toUser(apiData);\nif (user) {\n  console.log(\"User:\", user.email, user.role);\n}\n\n// DOM casting (when working in browsers)\n// const input = document.getElementById(\"username\") as HTMLInputElement;\n// input.value  — works because TypeScript now knows it's HTMLInputElement\n\n// Danger: double casting bypasses safety (avoid!)\nconst a: string = \"hello\";\nconst b = a as unknown as number;  // compiles, but bad practice\nconsole.log(typeof b);             // \"string\" — cast did NOT convert!"
          },
          {
            "type": "editor",
            "lang": "typescript",
            "defaultCode": "interface Config {\n  baseUrl: string;\n  timeout: number;\n  retries: number;\n}\n\nfunction parseConfig(raw: unknown): Config {\n  if (typeof raw !== \"object\" || raw === null) {\n    throw new Error(\"Config must be an object\");\n  }\n  const obj = raw as Record<string, unknown>;\n  if (typeof obj.baseUrl !== \"string\") throw new Error(\"baseUrl must be string\");\n  if (typeof obj.timeout !== \"number\") throw new Error(\"timeout must be number\");\n  if (typeof obj.retries !== \"number\") throw new Error(\"retries must be number\");\n  return obj as unknown as Config;\n}\n\nconst valid = { baseUrl: \"https://api.example.com\", timeout: 5000, retries: 3 };\nconst parsed = parseConfig(valid);\nconsole.log(\"Config: \" + parsed.baseUrl + \", timeout: \" + parsed.timeout);"
          },
          {
            "type": "quiz",
            "question": {
              "en": "What does the 'as' keyword do in TypeScript?",
              "tr": "TypeScript'te 'as' keyword'ü ne yapar?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "Actually converts the value",
                  "tr": "Değeri gerçekten dönüştürür"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "Tells TypeScript about the type — no effect at runtime",
                  "tr": "TypeScript'e tip hakkında bilgi verir — runtime'da etkisi yok"
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "Performs a null check",
                  "tr": "Null kontrolü yapar"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "Clones the value",
                  "tr": "Değeri clone'lar"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "en": "'as' tells TypeScript the type at compile-time — nothing happens at runtime. Java's (String) obj actually converts. TypeScript 'as' with a wrong type causes wrong behavior at runtime, not an explicit crash.",
              "tr": "'as' compile-time'da TypeScript'e tipi söyler — runtime'da hiçbir şey olmaz. Java'daki (String) obj gerçekten cast eder. TypeScript'te 'as' yanlış tipte kullanılsa bile runtime'da ClassCastException atmaz."
            },
            "retryQuestion": {
              "question": {
                "en": "Which of the following is true regarding the use of 'type assertion' (as) in TypeScript?",
                "tr": "TypeScript'te 'type assertion' (as) kullanımı için aşağıdakilerden hangisi doğrudur?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "It re-formats the value during runtime",
                    "tr": "Runtime sırasında değeri yeniden formatlar"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "It tells the compiler the type, but generates no conversion code in the output",
                    "tr": "Derleyiciye tipi belirtir, ancak çıktı kodunda dönüşüm (cast) kodu üretmez"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "It automatically changes the value type to prevent errors",
                    "tr": "Hata oluşmaması için değerin tipini otomatik olarak değiştirir"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "It only works on objects",
                    "tr": "Sadece nesneler üzerinde çalışır"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "en": "Type assertion (as) only affects TypeScript's compile-time type checking mechanism. It does not perform any actual type casting or transformation in the resulting JavaScript code.",
                "tr": "Type assertion (as), sadece TypeScript'in derleme zamanındaki (compile-time) tip kontrol mekanizmasını etkiler. Çıktı olarak üretilen JavaScript dosyasında herhangi bir tip dönüşümü (type casting) işlemi gerçekleştirilmez."
              }
            }
          },
          {
            "type": "ts-mini-hero",
            "promptTr": "'as' keyword'ünü ne zaman kullanmalısın, ne zaman kaçınmalısın? Java'daki (String) cast ile farkı nedir?",
            "promptEn": "When should you use the 'as' keyword, and when should you avoid it? How does it differ from Java's (String) cast?",
            "keywords": [
              [
                "compile",
                "derleme",
                "tip"
              ],
              [
                "runtime",
                "çalışma",
                "gerçek"
              ],
              [
                "güvensiz",
                "unsafe",
                "dikkat",
                "careful"
              ],
              [
                "dönüşüm",
                "conversion",
                "transform"
              ]
            ],
            "modelAnswerTr": "'as' sadece TypeScript'e tipi söyler — runtime'da hiçbir şey olmaz. Java cast runtime'da ClassCastException verebilir. TypeScript 'as' yanlış kullanılırsa runtime'da sessizce bozuk davranış olur.",
            "modelAnswerEn": "'as' only tells TypeScript the type — nothing happens at runtime. Java cast can throw ClassCastException at runtime. TypeScript 'as' with a wrong type causes silent broken behavior instead."
          },
          {
            "type": "simple-box",
            "emoji": "⚙️",
            "content": {
              "tr": "Fonksiyon, bir meyve sıkacağı gibidir. Girişte 'Portakal' (parametre tipi) bekler ve çıkışta 'Portakal Suyu' (dönüş tipi) vereceğini garanti eder.",
              "en": "A function is like a juicer. It expects 'Oranges' at the input (parameter type) and guarantees 'Orange Juice' at the output (return type)."
            }
          },
          {
            "type": "simple-box",
            "emoji": "🔄",
            "content": {
              "tr": "Casting (Tip dönüştürme), gümrükteki bir pakete 'Güvenlik Kontrolünden Geçti' etiketi yapıştırmak gibidir. İçeriğini değiştirmezsiniz ama görevliye güven telkin edersiniz.",
              "en": "Casting is like slapping a 'Security Inspected' sticker on a package. You don't change the contents, but you assure the handler that it's safe."
            }
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "Neden Opsiyonel Parametreler Var? Her test adımı aynı parametreleri gerektirmez. Örneğin, `clickSubmit(timeout?: number)` fonksiyonu timeout belirtilmediğinde varsayılan süreyi kullanır.",
              "en": "Why Use Optional Parameters? Not every test action requires all arguments. For example, `clickSubmit(timeout?: number)` falls back to defaults when timeout is omitted."
            }
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "Casting'in Tehlikesi: TypeScript'te `as` ile casting yapmak sadece derleme zamanı tip kontrolünü atlatır. Çalışma zamanında (runtime) gerçek bir dönüşüm yapmaz; yanlış yönlendirme çökmelere yol açabilir.",
              "en": "Danger of Casting: Using `as` only overrides the compiler's type checks. It performs no runtime conversion, so incorrect casting can lead to silent crashes."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: Fonksiyon, LEGO parçası üreten bir makine kalıbı gibidir. Kalıba kırmızı plastik (parametre) dökersiniz ve kalıptan kırmızı LEGO tuğlası (dönüş değeri) çıkar.",
              "en": "LEGO analogy: A function is like a LEGO mold. You pour in red plastic raw material (parameters) and it outputs a red LEGO brick (return value)."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: Casting, rengi belirsiz gri bir LEGO parçasının üzerine 'Mavi Parçadır' diye etiket yapıştırmak gibidir. Blok hala gridir ama derleyici artık onu mavi kabul eder.",
              "en": "LEGO analogy: Casting is like sticking a label on an uncolored grey LEGO brick that reads 'This is Blue'. The block is still grey, but the compiler accepts it as blue."
            }
          },
          {
            "type": "quiz",
            "question": {
              "tr": "TypeScript'teki `as` anahtar kelimesi ile yapılan casting işlemi çalışma zamanında (runtime) nasıl bir etki yaratır?",
              "en": "How does casting with the `as` keyword affect the code at runtime?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "tr": "Değeri gerçekten hedef tipe dönüştürür (örneğin string'i number yapar)",
                  "en": "It converts the value to the target type at runtime (e.g. string to number)"
                }
              },
              {
                "id": "b",
                "text": {
                  "tr": "Hiçbir etkisi yoktur; casting sadece derleme zamanındaki kontrol mekanizmasını etkiler",
                  "en": "It has no runtime effect; casting only tells the compiler how to treat the type"
                }
              },
              {
                "id": "c",
                "text": {
                  "tr": "Hatalı casting durumunda ClassCastException fırlatır",
                  "en": "It throws a ClassCastException if the cast is incorrect"
                }
              },
              {
                "id": "d",
                "text": {
                  "tr": "JavaScript kodunu şifreler",
                  "en": "It encrypts the output JavaScript code"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "tr": "Casting, TypeScript derleyicisini ikna etmek için kullanılan bir compile-time özelliğidir. Üretilen JavaScript kodunda `as` ifadesi tamamen silinir.",
              "en": "Casting is a compile-time construct to reassure the compiler. The generated JavaScript drops the `as` cast entirely, leaving runtime types unchanged."
            },
            "retryQuestion": {
              "question": {
                "tr": "Aşağıdakilerden hangisi bir parametrenin opsiyonel olduğunu doğru şekilde belirtir?",
                "en": "Which of the following declares an optional parameter in a function?"
              },
              "options": [
                {
                  "id": "a",
                  "text": "function log(msg: string | null)"
                },
                {
                  "id": "b",
                  "text": "function log(msg?: string)"
                },
                {
                  "id": "c",
                  "text": "function log(msg: string = 'default')"
                },
                {
                  "id": "d",
                  "text": "function log(optional msg: string)"
                }
              ],
              "correct": "b",
              "explanation": {
                "tr": "Parametre isminin sonuna konan '?' karakteri, o parametrenin geçilmesinin isteğe bağlı olduğunu gösterir.",
                "en": "Appending a '?' after the parameter name makes it optional, meaning the function can be called with or without that argument."
              }
            }
          }
        ]
      },
      {
        "title": {
          "en": "Classes & Decorators",
          "tr": "Sınıflar & Decorator'lar"
        },
        "blocks": [
          {
            "type": "heading",
            "text": {
              "en": "Classes",
              "tr": "Classes"
            },
            "difficulty": "🟡 Intermediate"
          },
          {
            "type": "simple-box",
            "emoji": "🏗️",
            "content": {
              "tr": "TypeScript class'ları Java class'larına çok benzer ama daha kısa syntax. Java'da field tanımla, constructor'da this.field = value yaz. TypeScript'te constructor parametresine 'public' yaz — ikisi birden yapılır.",
              "en": "TypeScript classes are very similar to Java classes but with shorter syntax. In Java, declare field, then write this.field = value. In TypeScript, add 'public' to constructor parameters — it does both at once."
            }
          },
          {
            "type": "ts-lego-visual",
            "variant": "constructor-visual"
          },
          {
            "type": "code",
            "language": "typescript",
            "code": "// TypeScript Classes — constructor shorthand\nclass User {\n  constructor(\n    public readonly id: number,       // public + readonly in one line!\n    public email: string,\n    private role: string = \"user\",    // private with default\n  ) {}\n\n  getRole(): string { return this.role; }\n\n  toString(): string {\n    return \"User(\" + this.id + \": \" + this.email + \", \" + this.role + \")\";\n  }\n}\n\n// Inheritance\nclass AdminUser extends User {\n  constructor(id: number, email: string, private permissions: string[]) {\n    super(id, email, \"admin\");\n  }\n\n  hasPermission(perm: string): boolean {\n    return this.permissions.includes(perm);\n  }\n}\n\nconst u = new User(1, \"alice@example.com\");\nconst admin = new AdminUser(2, \"admin@example.com\", [\"delete\", \"manage\"]);\n\nconsole.log(u.toString());\nconsole.log(admin.toString());\nconsole.log(admin.hasPermission(\"delete\"));   // true\n\n// Abstract class\nabstract class BaseTest {\n  abstract run(): void;\n  log(msg: string): void { console.log(\"[TEST] \" + msg); }\n}\n\nclass LoginTest extends BaseTest {\n  run(): void { this.log(\"Running login test\"); }\n}\nnew LoginTest().run();"
          },
          {
            "type": "ts-lego-visual",
            "variant": "inheritance-visual"
          },
          {
            "type": "editor",
            "lang": "typescript",
            "defaultCode": "class TestSuite {\n  private tests: Array<{ name: string; fn: () => boolean }> = [];\n\n  constructor(public readonly name: string) {}\n\n  addTest(name: string, fn: () => boolean): this {\n    this.tests.push({ name, fn });\n    return this;\n  }\n\n  run(): { passed: number; failed: number; total: number } {\n    let passed = 0, failed = 0;\n    for (const test of this.tests) {\n      const ok = test.fn();\n      console.log(\"  \" + (ok ? \"PASS\" : \"FAIL\") + \" \" + test.name);\n      if (ok) passed++; else failed++;\n    }\n    return { passed, failed, total: this.tests.length };\n  }\n}\n\nconst suite = new TestSuite(\"Math Tests\")\n  .addTest(\"2+2=4\", () => 2 + 2 === 4)\n  .addTest(\"5>3\", () => 5 > 3)\n  .addTest(\"string check\", () => typeof \"hello\" === \"string\")\n  .addTest(\"intentional fail\", () => 1 === 2);\n\nconsole.log(\"Suite: \" + suite.name);\nconst res = suite.run();\nconsole.log(\"Result: \" + res.passed + \"/\" + res.total + \" passed\");"
          },
          {
            "type": "ts-lego-visual",
            "variant": "abstract-visual"
          },
          {
            "type": "comparison",
            "title": {
              "tr": "Java ile Karşılaştırma",
              "en": "Java vs TypeScript — Classes"
            },
            "columns": [
              "Java",
              "TypeScript"
            ],
            "rows": [
              {
                "concept": {
                  "en": "Field + constructor",
                  "tr": "Field + constructor"
                },
                "java": "String x; MyClass(String x) { this.x = x; }",
                "typescript": "constructor(public x: string) {} (one line!)"
              },
              {
                "concept": {
                  "en": "Access modifiers",
                  "tr": "Access modifiers"
                },
                "java": "public, protected, private, default",
                "typescript": "public, protected, private"
              },
              {
                "concept": {
                  "en": "Readonly",
                  "tr": "Readonly"
                },
                "java": "final String x;",
                "typescript": "readonly x: string;"
              },
              {
                "concept": {
                  "en": "Abstract",
                  "tr": "Abstract"
                },
                "java": "abstract class A { abstract void run(); }",
                "typescript": "abstract class A { abstract run(): void; }"
              }
            ]
          },
          {
            "type": "quiz",
            "question": {
              "en": "What is the advantage of writing 'public' in a TypeScript constructor parameter?",
              "tr": "TypeScript constructor parametresinde 'public' yazmanın avantajı nedir?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "No advantage",
                  "tr": "Hiç avantajı yok"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "Defines and assigns the field in one line (Java's 2 steps become 1)",
                  "tr": "Field tanımlama ve atamayı tek satırda yapar"
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "Improves performance",
                  "tr": "Performansı artırır"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "Only works for strings",
                  "tr": "Sadece string için çalışır"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "en": "In Java: field declaration + constructor assignment = 2 steps. In TypeScript: 'constructor(public email: string)' = 1 step. Constructor shorthand defines and assigns simultaneously.",
              "tr": "Java'da: 'String email; MyClass(String email) { this.email = email; }' — 2 adım. TypeScript'te: 'constructor(public email: string)' — 1 adım. Constructor shorthand field tanımlamayı ve atamayı aynı anda yapar."
            },
            "retryQuestion": {
              "question": {
                "en": "What is the result of defining 'private name: string' inside a constructor using 'Parameter Properties' in TypeScript?",
                "tr": "TypeScript'te 'Parameter Properties' kullanarak 'private name: string' ifadesini constructor içinde tanımlamanın sonucu nedir?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "It creates a variable scoped only to the method",
                    "tr": "Sadece metodun kapsamı içinde geçerli bir değişken oluşturur"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "It declares a class field and assigns the constructor parameter to that field simultaneously",
                    "tr": "Hem sınıf içinde bir 'field' tanımlar hem de constructor parametresini bu field'a atar"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "It makes the variable readonly",
                    "tr": "Değişkenin değerini salt okunur (readonly) yapar"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "It throws an error because private fields cannot be defined in a constructor",
                    "tr": "Hata verir, çünkü private fieldlar constructor içinde tanımlanamaz"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "en": "TypeScript's 'Parameter Properties' feature allows you to declare and initialize a class member directly in the constructor by adding an access modifier (public, private, protected) to the parameter.",
                "tr": "TypeScript'in sunduğu 'Parameter Properties' özelliği, constructor parametrelerinde erişim belirleyicileri (public, private, protected) kullanarak, ayrı bir field tanımlamadan sınıf üyesinin doğrudan başlatılmasını sağlar."
              }
            }
          },
          {
            "type": "ts-lego-visual",
            "variant": "classes-visual"
          },
          {
            "type": "interview-questions",
            "topic": "TypeScript Intermediate",
            "questions": [
              {
                "level": "basic",
                "q": {
                  "tr": "TypeScript'te interface ve type alias ne zaman kullanılır?",
                  "en": "When do you use interface vs type alias in TypeScript?"
                },
                "a": {
                  "tr": "Interface: obje şekilleri ve class contracts için. Declaration merging gerektiğinde. Type alias: union types, intersection types için. Basit kural: obje yapısı tarif ediyorsan interface, 'bu ya şu' diyorsan type alias.",
                  "en": "Interface: for object shapes and class contracts, especially when you need declaration merging. Type alias: for union types, intersections. Simple rule: if describing an object shape, use interface; if saying 'this OR that,' use type alias."
                }
              },
              {
                "level": "intermediate",
                "q": {
                  "tr": "Discriminated union nedir? QA'de nasıl kullanılır?",
                  "en": "What is a discriminated union? How is it used in QA?"
                },
                "a": {
                  "tr": "Her varyantın ortak bir literal tip discriminant field'ı olan union. Örnek: { status: 'pass', data: T } | { status: 'fail', error: string }. QA'de test olaylarını modellemek için harika — start | pass | fail | skip her biri farklı field'a sahip.",
                  "en": "A union where each variant has a shared literal-type 'discriminant' field. Example: { status: 'pass', data: T } | { status: 'fail', error: string }. Great in QA for modeling test events — start, pass, fail, skip each have different fields."
                }
              },
              {
                "level": "advanced",
                "q": {
                  "tr": "TypeScript 'private' Java 'private'den nasıl farklı?",
                  "en": "How does TypeScript 'private' differ from Java 'private'?"
                },
                "a": {
                  "tr": "TypeScript 'private' sadece compile-time'da enforced — JavaScript'te runtime'da erişilebilir. Java 'private' runtime'da da enforced. Gerçek runtime gizlilik için JS private field syntax kullanılır: #field. TypeScript bu syntax'ı destekler.",
                  "en": "TypeScript 'private' is only compile-time enforced — accessible at runtime in JavaScript. Java 'private' is runtime-enforced. For true runtime privacy, use JS private field syntax: #field. TypeScript supports this syntax."
                }
              }
            ]
          },
          {
            "type": "heading",
            "text": {
              "en": "Decorators (Experimental)",
              "tr": "Decorator'lar (Deneysel)"
            },
            "difficulty": {
              "en": "🔴 Advanced",
              "tr": "🔴 İleri Seviye"
            }
          },
          {
            "type": "simple-box",
            "emoji": "🎗️",
            "content": {
              "tr": "Decorator, hediye paketi sarmak gibidir. Bir sınıfın veya metodun kodunu değiştirmeden dışına yeni bir işlev (örneğin loglama, hata yakalama, yetki kontrolü) sarmalarsınız.",
              "en": "A decorator is like wrapping a gift. Without modifying a class or method's internal code, you wrap it in new behaviors like logging, error handling, or access control."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "Java'daki anotasyonlar (@Test, @BeforeEach) gibi, TypeScript'te de `@` sembolü ile tanımlanan Decorator'lar bulunur. Bunlar, sarmaladıkları metot veya sınıflar çağrılmadan hemen önce çalışarak çalışma zamanını değiştirebilir. Test otomasyonunda, test adımlarını otomatik olarak rapora eklemek (@Step) için yaygın olarak kullanılır.",
              "en": "Similar to Java annotations (@Test, @BeforeEach), TypeScript supports Decorators prefixed with `@`. They execute immediately before the class or method runs, modifying runtime behavior. In test automation, decorators like `@Step` are used to auto-log actions to test reports."
            }
          },
          {
            "type": "code",
            "language": "typescript",
            "label": {
              "en": "TypeScript Decorators Example",
              "tr": "TypeScript Decorator Örneği"
            },
            "content": "// Step decorator: logs method call arguments automatically\nfunction Step(stepName: string) {\n  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {\n    const originalMethod = descriptor.value; // Store the original page action\n\n    // Override the action with custom logging logic\n    descriptor.value = async function (...args: any[]) {\n      console.log(`[REPORT STEP] ${stepName} with args: ${JSON.stringify(args)}`);\n      return await originalMethod.apply(this, args); // Run original method\n    };\n    return descriptor;\n  };\n}\n\nclass LoginPage {\n  @Step(\"Navigate to Login Page\")\n  async navigate() {\n    // Navigate logic\n  }\n\n  @Step(\"Fill credentials and Login\")\n  async login(user: string) {\n    // Fill credentials and click logic\n  }\n}",
            "expected": ""
          },
          {
            "type": "editor",
            "lang": "typescript",
            "defaultCode": "// Run decorator code (Requires experimentalDecorators in tsconfig)\nfunction Log(target: any, key: string, descriptor: PropertyDescriptor) {\n  const original = descriptor.value;\n  descriptor.value = function(...args: any[]) {\n    console.log(`Calling ${key} with:`, args);\n    return original.apply(this, args);\n  }\n}\n\nclass Calculator {\n  @Log\n  add(a: number, b: number) {\n    return a + b;\n  }\n}\n\nconst calc = new Calculator();\ncalc.add(5, 10);"
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "Neden Decorator? Test sınıflarınızın içinde kirli log kodları yazmak yerine, `@Step` gibi temiz sarmalayıcılar kullanarak raporlamayı tek merkezden yönetebilirsiniz.",
              "en": "Why Use Decorators? Instead of polluting your test page object code with logger statements, you can use `@Step` to direct all logs cleanly from a single place."
            }
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "tsconfig.json Ayarı: Decorator'ları TypeScript'te kullanabilmek için `compilerOptions` altında `\"experimentalDecorators\": true` ayarının açılması zorunludur.",
              "en": "tsconfig.json Configuration: To use decorators in TypeScript, you must enable `\"experimentalDecorators\": true` under `compilerOptions`."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: Bir LEGO arabasının üzerine takılan renkli bir tepe lambası gibidir. Arabanın hareket etme şeklini değiştirmez ama üzerine siren çalma (log atma) özelliği ekler.",
              "en": "LEGO analogy: Like snapping a colored siren light onto a LEGO police car. It doesn't change how the car rolls, but it adds the function of flashing/sirening (logging)."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: Standart bir LEGO tuğlasının etrafına koruyucu şeffaf kılıf geçirmek gibidir. Tuğla yine aynı tuğladır ama artık darbelere karşı dayanıklıdır (hata yakalama özelliği eklenmiştir).",
              "en": "LEGO analogy: Fitting a protective rubber sleeve around a LEGO block. The block remains the same, but it now absorbs shocks (error handling wrapped around the method)."
            }
          },
          {
            "type": "quiz",
            "question": {
              "tr": "TypeScript'te decorator'ları kullanabilmek için tsconfig.json dosyasında hangi ayar aktif edilmelidir?",
              "en": "Which configuration must be enabled in tsconfig.json to support decorators in TypeScript?"
            },
            "options": [
              {
                "id": "a",
                "text": "strict: true"
              },
              {
                "id": "b",
                "text": "experimentalDecorators: true"
              },
              {
                "id": "c",
                "text": "target: 'ES6'"
              },
              {
                "id": "d",
                "text": "resolveJsonModule: true"
              }
            ],
            "correct": "b",
            "explanation": {
              "tr": "Decorator'lar henüz standart JS özelliği olmadığı için deneysel destek (`experimentalDecorators`) bayrağı ile açılmalıdır.",
              "en": "Decorators are still an experimental proposal in JavaScript, requiring the `experimentalDecorators` flag to compile without errors."
            },
            "retryQuestion": {
              "question": {
                "tr": "Decorator'ların test otomasyon projelerinde sağladığı en büyük avantaj nedir?",
                "en": "What is the primary benefit of decorators in test automation projects?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "tr": "Testlerin çalışma hızını iki katına çıkarır",
                    "en": "Doubles the test execution speed"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "tr": "Loglama, yetkilendirme ve raporlama gibi ortak kodları test metotlarının içine yazmadan temizce sarmalamayı sağlar",
                    "en": "Allows wrapping shared concerns (logging, reporting, etc.) cleanly around test methods without polluting them"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "tr": "Tarayıcı kurulumunu kolaylaştırır",
                    "en": "Simplifies browser installation"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "tr": "XPath yazma zorunluluğunu kaldırır",
                    "en": "Eliminates the need to write XPath locators"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "tr": "Decorator'lar sayesinde loglama ve hata yönetimi gibi ortak şablon kodları (boilerplate) test metotlarının dışına taşınarak kod okunabilirliği korunur.",
                "en": "Decorators pull boilerplate logic (like logging or error handling) out of test scripts, ensuring clean page objects and tests."
              }
            }
          },
          {
            "type": "interview-questions",
            "topic": "TypeScript Intermediate",
            "questions": [
              {
                "level": "basic",
                "q": {
                  "tr": "TypeScript'te interface ve type alias ne zaman kullanılır?",
                  "en": "When do you use interface vs type alias in TypeScript?"
                },
                "a": {
                  "tr": "Interface: obje şekilleri ve class contracts için. Declaration merging gerektiğinde. Type alias: union types, intersection types için. Basit kural: obje yapısı tarif ediyorsan interface, 'bu ya şu' diyorsan type alias.",
                  "en": "Interface: for object shapes and class contracts, especially when you need declaration merging. Type alias: for union types, intersections. Simple rule: if describing an object shape, use interface; if saying 'this OR that,' use type alias."
                }
              },
              {
                "level": "intermediate",
                "q": {
                  "tr": "Discriminated union nedir? QA'de nasıl kullanılır?",
                  "en": "What is a discriminated union? How is it used in QA?"
                },
                "a": {
                  "tr": "Her varyantın ortak bir literal tip discriminant field'ı olan union. Örnek: { status: 'pass', data: T } | { status: 'fail', error: string }. QA'de test olaylarını modellemek için harika — start | pass | fail | skip her biri farklı field'a sahip.",
                  "en": "A union where each variant has a shared literal-type 'discriminant' field. Example: { status: 'pass', data: T } | { status: 'fail', error: string }. Great in QA for modeling test events — start, pass, fail, skip each have different fields."
                }
              },
              {
                "level": "advanced",
                "q": {
                  "tr": "TypeScript 'private' Java 'private'den nasıl farklı?",
                  "en": "How does TypeScript 'private' differ from Java 'private'?"
                },
                "a": {
                  "tr": "TypeScript 'private' sadece compile-time'da enforced — JavaScript'te runtime'da erişilebilir. Java 'private' runtime'da da enforced. Gerçek runtime gizlilik için JS private field syntax kullanılır: #field. TypeScript bu syntax'ı destekler.",
                  "en": "TypeScript 'private' is only compile-time enforced — accessible at runtime in JavaScript. Java 'private' is runtime-enforced. For true runtime privacy, use JS private field syntax: #field. TypeScript supports this syntax."
                }
              }
            ]
          }
        ]
      },
      {
        "title": {
          "en": "Generics",
          "tr": "Generic'ler"
        },
        "blocks": [
          {
            "type": "heading",
            "text": {
              "en": "Basic Generics",
              "tr": "Temel Generic'ler"
            },
            "difficulty": "🔴 Advanced"
          },
          {
            "type": "simple-box",
            "emoji": "🧩",
            "content": {
              "tr": "Generic, doldurulabilir şablon gibi. 'Liste' diyorsun ama ne listesi? Sayı listesi mi, isim listesi mi? Tip parametresi ile sonradan belirtiyorsun. Java'daki List<T> ile aynı mantık.",
              "en": "A generic is like a fill-in-the-blank template. 'A list' — but a list of what? Numbers? Names? You specify the type later with a type parameter. Same concept as Java's List<T>."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "Java'da generics: ArrayList<String>, Map<String, Integer>. TypeScript'te aynı şey: Array<string>, Map<string, number>. Fonksiyon generic'leri: function identity<T>(x: T): T. Java'dan zaten tanıdık — sözdizimi biraz farklı.",
              "en": "Java generics: ArrayList<String>, Map<String, Integer>. TypeScript is the same: Array<string>, Map<string, number>. Function generics: function identity<T>(x: T): T. Already familiar from Java — just slightly different syntax."
            }
          },
          {
            "type": "code",
            "language": "typescript",
            "code": "// TypeScript Generics — reusable code with type safety\n\n// Generic function — like Java <T> method\nfunction identity<T>(value: T): T {\n  return value;\n}\nconsole.log(identity<string>(\"hello\"));  // hello\nconsole.log(identity<number>(42));       // 42\n// TypeScript infers T automatically: identity(\"hello\")\n\n// Generic container — like Java class Box<T>\nclass Box<T> {\n  constructor(private value: T) {}\n  get(): T { return this.value; }\n  toString(): string { return \"Box(\" + String(this.value) + \")\"; }\n}\n\nconst strBox = new Box<string>(\"TypeScript\");\nconst numBox = new Box<number>(42);\nconsole.log(strBox.toString());    // Box(TypeScript)\nconsole.log(numBox.toString());    // Box(42)\n\n// Generic with constraint — like Java <T extends Comparable<T>>\nfunction findMax<T extends { value: number }>(items: T[]): T {\n  return items.reduce((max, item) => item.value > max.value ? item : max);\n}\n\nconst tests = [\n  { name: \"login\", value: 342 },\n  { name: \"checkout\", value: 891 },\n  { name: \"profile\", value: 215 },\n];\nconst slowest = findMax(tests);\nconsole.log(\"Slowest:\", slowest.name, slowest.value + \"ms\");"
          },
          {
            "type": "editor",
            "lang": "typescript",
            "defaultCode": "// Generic Result type — common QA pattern\ntype Result<T> =\n  | { success: true; data: T }\n  | { success: false; error: string };\n\nfunction parseJSON<T>(raw: string): Result<T> {\n  try {\n    const data = JSON.parse(raw) as T;\n    return { success: true, data };\n  } catch (e) {\n    return { success: false, error: \"Invalid JSON: \" + String(e) };\n  }\n}\n\ninterface User { id: number; email: string; }\n\nconst good = parseJSON<User>('{\"id\": 1, \"email\": \"alice@example.com\"}');\nconst bad = parseJSON<User>(\"not json\");\n\nif (good.success) console.log(\"User:\", good.data.email);\nif (!bad.success) console.log(\"Error:\", bad.error);"
          },
          {
            "type": "comparison",
            "title": {
              "tr": "Java ile Karşılaştırma",
              "en": "Java vs TypeScript — Generics"
            },
            "columns": [
              "Java",
              "TypeScript"
            ],
            "rows": [
              {
                "concept": {
                  "en": "Generic class",
                  "tr": "Generic class"
                },
                "java": "class Box<T> { T get() {...} }",
                "typescript": "class Box<T> { get(): T {...} }"
              },
              {
                "concept": {
                  "en": "Generic method",
                  "tr": "Generic method"
                },
                "java": "<T> T identity(T x)",
                "typescript": "function identity<T>(x: T): T"
              },
              {
                "concept": {
                  "en": "Constraint",
                  "tr": "Constraint"
                },
                "java": "<T extends Comparable<T>>",
                "typescript": "<T extends { compareTo: (a: T) => number }>"
              },
              {
                "concept": {
                  "en": "Multiple params",
                  "tr": "Multiple params"
                },
                "java": "Map<K, V>",
                "typescript": "Map<K, V> / function f<K, V>"
              }
            ]
          },
          {
            "type": "quiz",
            "question": {
              "en": "What does <T extends { length: number }> mean in TypeScript generics?",
              "tr": "TypeScript'te <T extends { length: number }> ne anlama gelir?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "T can only be a number",
                  "tr": "T sadece number olabilir"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "T can be any type that has a 'length' property of type number",
                  "tr": "T, 'length' adında number özelliği olan herhangi bir tip olabilir"
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "T must be an array",
                  "tr": "T bir array olmak zorunda"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "The length of T is being specified",
                  "tr": "T'nin uzunluğu belirtiliyor"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "en": "Generic constraints specify what properties T must have. string, array, or any object with { length: number } can be T. Similar to Java's <T extends Comparable<T>>.",
              "tr": "Generic constraint ile T'nin hangi özelliklere sahip olması gerektiği belirtilir. string, array, hatta { length: number } olan herhangi bir obje T olabilir. Java'daki <T extends Comparable<T>> gibi."
            },
            "retryQuestion": {
              "question": {
                "en": "What does the constraint <T extends { id: string }> guarantee in a generic structure?",
                "tr": "Generic bir yapıda <T extends { id: string }> kısıtlaması neyi garanti eder?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "That T must only be a string named 'id'",
                    "tr": "T'nin sadece 'id' adında bir string olması gerektiğini"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "That T must be a structure that has at least a string property named 'id'",
                    "tr": "T'nin en azından 'id' isminde string tipinde bir özelliği olan bir yapı olduğunu"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "That T is mapped to an ID database",
                    "tr": "T'nin bir ID veritabanı ile eşleştiğini"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "That T must be a class instance",
                    "tr": "T'nin mutlaka bir class instance olduğunu"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "en": "This constraint forces the Generic type (T) to have at least the specified object shape. T can be any type (object, class, etc.) as long as it includes a property named 'id' of type string.",
                "tr": "Bu kısıtlama, Generic tipin (T) en azından belirtilen nesne yapısına (interface veya object shape) sahip olması gerektiğini zorunlu kılar. T bu yapıya sahip olan herhangi bir tip (obje, class vb.) olabilir."
              }
            }
          },
          {
            "type": "ts-lego-visual",
            "variant": "generics-factory"
          },
          {
            "type": "simple-box",
            "emoji": "📦",
            "content": {
              "tr": "Generic, kargo kolisi gibidir. Kolinin yapısı aynıdır ama içine ister 'Kitap' (T = Book) ister 'Giysi' (T = Clothing) koyabilirsiniz. Kutu her tipe uyum sağlar.",
              "en": "A generic is like a shipping box. The box design is fixed, but you can fill it with either 'Books' (T = Book) or 'Clothes' (T = Clothing). It adapts to any type."
            }
          },
          {
            "type": "simple-box",
            "emoji": "🧴",
            "content": {
              "tr": "Generic, boş bir plastik şişe gibidir. Üzerine etiket yapıştırmadan önce içine şampuan, sabun veya kolonya koyabilirsiniz; şişe içine konan sıvının şeklini alır.",
              "en": "A generic is like an empty bottle. You can fill it with shampoo, soap, or water before labelling it; the bottle holds whatever liquid type you put inside."
            }
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "Neden Generic Kullanırız? API yanıtlarını sarmalarken (ApiResponse<T>) her endpoint farklı veri modeli (User, Product) döner. Generic'ler sayesinde her yanıt tipi için ayrı sarmalayıcı sınıf yazmaktan kurtuluruz.",
              "en": "Why Use Generics? When wrapping API responses (ApiResponse<T>), each endpoint returns a different model (User, Product). Generics prevent writing distinct wrapper classes."
            }
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "Generic Kısıtlamaları (Constraints): `<T extends object>` yazarak generic parametrenin rastgele bir tip (örneğin string veya number) değil, sadece nesne olmasını zorunlu kılabilirsiniz.",
              "en": "Generic Constraints: Writing `<T extends object>` limits the generic parameter to objects only, preventing callers from passing simple types like strings or numbers."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: Generic, şeffaf bir LEGO kutusudur. Kutunun dış hatları sabittir ama içine hangi renkte parça koyarsanız (T tipi), dışarıdan o tipin özellikleri görünür.",
              "en": "LEGO analogy: A generic is a transparent LEGO bin. The bin dimensions are fixed, but whatever color brick you place inside (type T) projects its type properties outwards."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: Generic kısıtlaması (T extends Shape), LEGO kutusunun girişine konan bir süzgeç gibidir. Süzgeçten sadece yuvarlak parçalar geçebilir, kare parçalar engellenir.",
              "en": "LEGO analogy: A generic constraint (T extends Shape) is like a sorting filter on top of a LEGO bin. Only pieces matching that profile pass through; others are blocked."
            }
          },
          {
            "type": "quiz",
            "question": {
              "tr": "TypeScript generic'lerinde `<T extends { id: number }>` kısıtlaması neyi garanti eder?",
              "en": "What does the constraint `<T extends { id: number }>` guarantee in TypeScript generics?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "tr": "T tipinin sadece number olabileceğini",
                  "en": "That type T can only be a number"
                }
              },
              {
                "id": "b",
                "text": {
                  "tr": "T tipine geçirilecek nesnenin mutlaka 'id' adında sayısal bir özelliğe sahip olması gerektiğini",
                  "en": "That any object passed as T must have an 'id' property of type number"
                }
              },
              {
                "id": "c",
                "text": {
                  "tr": "Fonksiyonun mutlaka id döneceğini",
                  "en": "That the function must return an id"
                }
              },
              {
                "id": "d",
                "text": {
                  "tr": "Kısıtlamanın derleme sırasında göz ardı edileceğini",
                  "en": "That the constraint is ignored at compile time"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "tr": "extends anahtar kelimesi ile generic tiplere sınır (constraint) konur. Bu sayede fonksiyona gelen nesnenin belirtilen alana sahip olduğu garanti altına alınır.",
              "en": "The extends keyword sets a generic constraint, guaranteeing that whatever object is passed has the specified properties, preventing runtime errors."
            },
            "retryQuestion": {
              "question": {
                "tr": "Generic API sarmalayıcısı `class ApiResponse<T> { data: T }` yapısında `ApiResponse<User>` tanımı ne anlama gelir?",
                "en": "What does `ApiResponse<User>` represent in `class ApiResponse<T> { data: T }`?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "tr": "data alanının sadece string olabileceğini",
                    "en": "That the data field can only be a string"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "tr": "data alanının tipinin User olacağını ve User nesnesinin özelliklerine erişilebileceğini",
                    "en": "That the data field is strictly typed as a User object, enabling full autocomplete"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "tr": "ApiResponse sınıfının silineceğini",
                    "en": "That the ApiResponse class is dropped"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "tr": "data alanının boş (null) olacağını",
                    "en": "That the data field must be null"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "tr": "Generic yapıya `User` tipi verildiğinde, `data` alanı artık dinamik olarak `User` tipi gibi davranır ve tüm IDE otomatik tamamlama özelliklerini sunar.",
                "en": "By passing `User` to the generic structure, the `data` field adopts the User type interface, offering full autocomplete and safety."
              }
            }
          }
        ]
      },
      {
        "title": {
          "en": "Utility Types & Keyof",
          "tr": "Utility Tipleri & Keyof"
        },
        "blocks": [
          {
            "type": "heading",
            "text": {
              "en": "Utility Types",
              "tr": "Utility Types"
            },
            "difficulty": "🔴 Advanced"
          },
          {
            "type": "simple-box",
            "emoji": "🔧",
            "content": {
              "tr": "Utility types, hazır tip dönüştürücüler. Bir tipin tüm alanlarını opsiyonel yap (Partial), sadece belirli alanları al (Pick), bir alanı çıkar (Omit). Java'da bunları manuel yapardın.",
              "en": "Utility types are ready-made type transformers. Make all fields optional (Partial), pick specific fields (Pick), remove a field (Omit). In Java you'd do these manually."
            }
          },
          {
            "type": "code",
            "language": "typescript",
            "code": "// TypeScript Utility Types — powerful type transformations\n\ninterface TestCase {\n  id: number;\n  name: string;\n  status: \"PASS\" | \"FAIL\" | \"SKIP\";\n  duration: number;\n  tags: string[];\n}\n\n// Partial — all fields optional (useful for updates)\ntype PartialTestCase = Partial<TestCase>;\nconst update: PartialTestCase = { status: \"PASS\" };  // only some fields\n\n// Required — all fields required (reverse of Partial)\n// Pick — select specific fields only\ntype TestSummary = Pick<TestCase, \"id\" | \"name\" | \"status\">;\nconst summary: TestSummary = { id: 1, name: \"login\", status: \"PASS\" };\n\n// Omit — remove specific fields\ntype TestWithoutId = Omit<TestCase, \"id\">;\n\n// Readonly — make all fields readonly\ntype ImmutableTest = Readonly<TestCase>;\n\n// Record — create key-value map type\ntype TestResults = Record<string, \"PASS\" | \"FAIL\" | \"SKIP\">;\nconst results: TestResults = {\n  login_test: \"PASS\",\n  checkout_test: \"FAIL\",\n};\n\n// ReturnType — get return type of a function\nfunction createUser() { return { id: 1, email: \"a@b.com\" }; }\ntype UserType = ReturnType<typeof createUser>;  // { id: number; email: string }\n\n// Practical: build update payload type\nfunction updateTest(id: number, changes: Partial<Omit<TestCase, \"id\">>): void {\n  console.log(\"Updating test \" + id + \":\", JSON.stringify(changes));\n}\nupdateTest(1, { status: \"PASS\", duration: 342 });"
          },
          {
            "type": "editor",
            "lang": "typescript",
            "defaultCode": "interface Config {\n  baseUrl: string;\n  timeout: number;\n  retries: number;\n  apiKey: string;\n  debug: boolean;\n}\n\n// Use utility types to create derived types\ntype PublicConfig = Omit<Config, \"apiKey\">;  // hide secret key\ntype PartialUpdate = Partial<Config>;         // all optional for PATCH\ntype RequiredCore = Required<Pick<Config, \"baseUrl\" | \"timeout\">>;  // subset required\n\nconst baseConfig: RequiredCore = { baseUrl: \"https://api.example.com\", timeout: 5000 };\nconst publicView: PublicConfig = { baseUrl: \"https://api.example.com\", timeout: 5000, retries: 3, debug: false };\nconst patchPayload: PartialUpdate = { timeout: 10000 };\n\nconsole.log(\"Base:\", JSON.stringify(baseConfig));\nconsole.log(\"Public:\", JSON.stringify(publicView));\nconsole.log(\"Patch:\", JSON.stringify(patchPayload));"
          },
          {
            "type": "quiz",
            "question": {
              "en": "What does Partial<T> do in TypeScript?",
              "tr": "TypeScript'te Partial<T> ne yapar?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "Removes all fields from T",
                  "tr": "T'nin tüm alanlarını siler"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "Makes all fields of T optional (?)",
                  "tr": "T'nin tüm alanlarını opsiyonel (?) yapar"
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "Selects only some fields of T",
                  "tr": "T'nin sadece kısmi alanlarını seçer"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "Makes T readonly",
                  "tr": "T'yi readonly yapar"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "en": "Partial<T> makes all fields optional. Ideal for PATCH endpoints where you only send changed fields. In Java you'd have to create this type manually.",
              "tr": "Partial<T> tüm alanları opsiyonel yapar. PATCH endpoint'lerinde sadece değişen alanları göndermek için idealdir. Java'da bu tipi manuel olarak oluşturman gerekirdi."
            },
            "retryQuestion": {
              "question": {
                "en": "What does Required<T> do in TypeScript?",
                "tr": "TypeScript'te Required<T> ne yapar?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "Makes all optional fields of T required",
                    "tr": "T'nin tüm opsiyonel alanlarını zorunlu hale getirir"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "Converts T to a string",
                    "tr": "T'yi stringe çevirir"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "Removes all methods from T",
                    "tr": "T içindeki tüm metotları kaldırır"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "Makes T read-only",
                    "tr": "T'yi sadece okunur yapar"
                  }
                }
              ],
              "correct": "a",
              "explanation": {
                "en": "Required<T> is the inverse of Partial<T>; it removes the optional flags (?) from all properties, making them mandatory. It is useful in validation scenarios to ensure all fields are provided.",
                "tr": "Required<T>, Partial<T>'nin tam tersidir; tüm özelliklerin opsiyonel işaretlerini (?) kaldırarak onları zorunlu kılar. Veri doğrulama senaryolarında tüm alanların doldurulmasını garantilemek için kullanılır."
              }
            }
          },
          {
            "type": "ts-lego-visual",
            "variant": "utility-types-visual"
          },
          {
            "type": "heading",
            "text": {
              "en": "Keyof",
              "tr": "Keyof"
            },
            "difficulty": "🔴 Advanced"
          },
          {
            "type": "simple-box",
            "emoji": "🔑",
            "content": {
              "tr": "keyof, bir nesnenin tüm anahtar isimlerini tip olarak alır. 'Bu fonksiyon TestCase'in herhangi bir alanı ile çağrılabilir, ama sadece gerçek alan isimleriyle' — TypeScript bunu garantiler.",
              "en": "keyof gets all the key names of an object as a type. 'This function can be called with any field of TestCase, but only with real field names' — TypeScript guarantees this."
            }
          },
          {
            "type": "code",
            "language": "typescript",
            "code": "// keyof — get all keys of a type as a union\ninterface TestCase {\n  id: number;\n  name: string;\n  status: \"PASS\" | \"FAIL\" | \"SKIP\";\n  duration: number;\n}\n\ntype TestCaseKeys = keyof TestCase;  // \"id\" | \"name\" | \"status\" | \"duration\"\n\n// Practical use: type-safe property accessor\nfunction getField<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}\n\nconst tc: TestCase = { id: 1, name: \"login_test\", status: \"PASS\", duration: 342 };\nconsole.log(getField(tc, \"name\"));      // \"login_test\" — TypeScript knows type is string\nconsole.log(getField(tc, \"duration\"));  // 342 — TypeScript knows type is number\n// getField(tc, \"invalid\");             // ERROR: \"invalid\" not in keyof TestCase\n\n// Sort array by any field — type-safe\nfunction sortBy<T>(items: T[], key: keyof T): T[] {\n  return [...items].sort((a, b) => {\n    if (a[key] < b[key]) return -1;\n    if (a[key] > b[key]) return 1;\n    return 0;\n  });\n}\n\nconst tests: TestCase[] = [\n  { id: 3, name: \"profile\", status: \"PASS\", duration: 215 },\n  { id: 1, name: \"login\", status: \"PASS\", duration: 342 },\n  { id: 2, name: \"checkout\", status: \"FAIL\", duration: 891 },\n];\n\nconst byName = sortBy(tests, \"name\");\nconst byDuration = sortBy(tests, \"duration\");\nconsole.log(byName.map(t => t.name));      // [\"checkout\", \"login\", \"profile\"]\nconsole.log(byDuration.map(t => t.name));  // [\"profile\", \"login\", \"checkout\"]"
          },
          {
            "type": "editor",
            "lang": "typescript",
            "defaultCode": "interface User {\n  id: number;\n  email: string;\n  role: \"admin\" | \"user\";\n  active: boolean;\n}\n\n// Build a type-safe filter function using keyof\nfunction filterBy<T>(\n  items: T[],\n  key: keyof T,\n  value: T[keyof T]\n): T[] {\n  return items.filter(item => item[key] === value);\n}\n\nconst users: User[] = [\n  { id: 1, email: \"alice@example.com\", role: \"admin\", active: true },\n  { id: 2, email: \"bob@example.com\", role: \"user\", active: true },\n  { id: 3, email: \"carol@example.com\", role: \"user\", active: false },\n  { id: 4, email: \"dave@example.com\", role: \"admin\", active: false },\n];\n\nconst admins = filterBy(users, \"role\", \"admin\");\nconst activeUsers = filterBy(users, \"active\", true);\n\nconsole.log(\"Admins:\", admins.map(u => u.email));\nconsole.log(\"Active:\", activeUsers.map(u => u.email));"
          },
          {
            "type": "quiz",
            "question": {
              "en": "What is keyof TestCase if interface TestCase { id: number; name: string; }?",
              "tr": "keyof TestCase nedir? interface TestCase { id: number; name: string; }"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "number | string",
                  "tr": "number | string"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "\"id\" | \"name\"",
                  "tr": "\"id\" | \"name\""
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "{ id: number; name: string }",
                  "tr": "{ id: number; name: string }"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "TestCase",
                  "tr": "TestCase"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "en": "keyof returns the key names as a string literal union. For TestCase, keyof = 'id' | 'name'. Java has no built-in equivalent — similar things are done with reflection.",
              "tr": "keyof, nesnenin anahtar isimlerini string literal union olarak döner. TestCase için keyof = 'id' | 'name'. Java'da böyle bir built-in operatör yok — reflection ile benzer şeyler yapılır."
            },
            "retryQuestion": {
              "question": {
                "en": "What does keyof User return for the interface User { email: string; age: number; }?",
                "tr": "interface User { email: string; age: number; } yapısında keyof User ifadesi ne döndürür?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "string | number",
                    "tr": "string | number"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "\"email\" | \"age\"",
                    "tr": "\"email\" | \"age\""
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "{ email: string; age: number }",
                    "tr": "{ email: string; age: number }"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "User",
                    "tr": "User"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "en": "The keyof operator retrieves all key names of an interface as a union type. In this case, it results in 'email' or 'age'. It is very powerful for dynamic property access in automation scripts.",
                "tr": "keyof operatörü, bir arayüzün tüm anahtar isimlerini union tipi olarak alır. Bu durumda 'email' veya 'age' anahtarları elde edilir. Otomasyon kodlarında dinamik özellik erişimi için çok güçlüdür."
              }
            }
          },
          {
            "type": "ts-mini-hero",
            "promptTr": "'keyof' ne işe yarar? Gerçek bir kullanım senaryosu ver — neden Java reflection'ından daha iyi?",
            "promptEn": "What does 'keyof' do? Give a real use case — why is it better than Java reflection?",
            "keywords": [
              [
                "anahtar",
                "key",
                "alan",
                "field",
                "isim",
                "name"
              ],
              [
                "compile",
                "derleme",
                "tip güvenli",
                "type-safe"
              ],
              [
                "dinamik",
                "dynamic"
              ],
              [
                "union",
                "birleşim"
              ]
            ],
            "modelAnswerTr": "keyof bir interface'in tüm key isimlerini union tip olarak alır. sortBy(items, 'name') — 'invalid' key giremezsin, derleme hatası alırsın. Java reflection runtime'da hata verirdi.",
            "modelAnswerEn": "keyof gets all key names of an interface as a union type. sortBy(items, 'name') — invalid key fails at compile time. Java reflection would fail at runtime instead."
          },
          {
            "type": "simple-box",
            "emoji": "✂️",
            "content": {
              "tr": "Utility type'lar, hazır kurabiye kalıpları gibidir. Mevcut bir kurabiyeyi alır, kenarlarını kesip (Omit) veya sadece ortasını çıkarıp (Pick) yeni şekiller üretir.",
              "en": "Utility types are like cookie cutters. They take an existing cookie shape, trim the edges (Omit), or punch out the center (Pick) to make new shapes."
            }
          },
          {
            "type": "simple-box",
            "emoji": "🔑",
            "content": {
              "tr": "keyof, bir nesnenin kapı anahtarları listesi gibidir. 'Bu evde sadece salon, mutfak ve banyo anahtarları var, başka anahtar getirme' kuralını koyar.",
              "en": "keyof is like the ring of key labels for a house. It dictates: 'We only have keys labeled bedroom, kitchen, and attic. No other keys are accepted.'"
            }
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "Neden Partial<T> Kullanırız? Test veri fabrikalarında (Data Factories) varsayılan bir kullanıcı nesnesi oluşturup, testin ihtiyacına göre sadece şifreyi değiştirmek (override) için mükemmeldir.",
              "en": "Why Use Partial<T>? Perfect for test data factories where you want to instantiate a default object and pass partial overrides (e.g. only modifying the password)."
            }
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "Neden Omit<T, K> Kullanırız? API testlerinde veritabanına veri yazarken, ID ve tarih gibi sistem tarafından atanan alanları çıkarıp temiz DTO nesneleri göndermek için kullanılır.",
              "en": "Why Use Omit<T, K>? Used in API testing to strip auto-generated fields like IDs or creation timestamps from payload shapes, creating clean DTO interfaces."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: Pick, büyük bir LEGO kalesinden sadece 2 kule parçasını söküp almak gibidir. Geri kalan duvarları ve kapıları arkada bırakırsınız.",
              "en": "LEGO analogy: Pick is like detaching exactly two towers from a large LEGO castle, leaving the walls and gates behind to build a smaller outpost."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: keyof, bir LEGO kutusundaki tüm tuğlaların üzerindeki bağlantı noktalarının (çıkıntılarının) isim listesini çıkarmak gibidir.",
              "en": "LEGO analogy: keyof is like generating a list of all studs and connection slots on a LEGO brick, identifying exactly where other pieces can snap."
            }
          },
          {
            "type": "quiz",
            "question": {
              "tr": "TypeScript'te `interface User { id: number; name: string; role: string; }` yapısından `id` ve `role` alanlarını çıkartıp sadece `name` alanına sahip yeni bir tip üretmek için hangisi kullanılır?",
              "en": "Which utility type removes properties from an interface (e.g. creating a name-only shape from User by dropping id and role)?"
            },
            "options": [
              {
                "id": "a",
                "text": "Pick<User, 'name'>"
              },
              {
                "id": "b",
                "text": "Omit<User, 'id' | 'role'>"
              },
              {
                "id": "c",
                "text": "Partial<User>"
              },
              {
                "id": "d",
                "text": "Hem A hem B şıkkı aynı sonucu üretir"
              }
            ],
            "correct": "d",
            "explanation": {
              "tr": "Pick ile istediğimiz alanı seçebiliriz (`Pick<User, 'name'>`), Omit ile istemediğimiz alanları çıkartabiliriz (`Omit<User, 'id'|'role'>`). İkisi de aynı nesne tipini üretir.",
              "en": "Both Pick (choosing the desired keys) and Omit (excluding the undesired keys) yield the same shape (a name-only type) in this scenario."
            },
            "retryQuestion": {
              "question": {
                "tr": "keyof operatörünün temel amacı nedir?",
                "en": "What is the primary purpose of the keyof operator?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "tr": "Nesnelerin çalışma zamanı değerlerini kontrol etmek",
                    "en": "Checking object values at runtime"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "tr": "Bir nesne tipinin tüm anahtar (property) isimlerini alıp bir string literal union tipi oluşturmak",
                    "en": "Extracting all property names of an object type as a string literal union type"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "tr": "Şifreleri hash'lemek",
                    "en": "Hashing passwords"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "tr": "Dizileri sıralamak",
                    "en": "Sorting arrays"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "tr": "keyof, nesne özellik isimlerini birer tip haline getirerek sadece geçerli anahtar adlarının kullanılmasını derleme zamanında garanti altına alır.",
                "en": "keyof turns property names into types, ensuring that only valid keys can be referenced at compile time, eliminating invalid property accesses."
              }
            }
          }
        ]
      },
      {
        "title": {
          "en": "Template Literals & Null",
          "tr": "Template Literaller & Null"
        },
        "blocks": [
          {
            "type": "heading",
            "text": {
              "en": "Null Safety",
              "tr": "Null Safety"
            },
            "difficulty": "🔴 Advanced"
          },
          {
            "type": "simple-box",
            "emoji": "🚫",
            "content": {
              "tr": "TypeScript null hataları derleme sırasında yakalar. Java'da NullPointerException çalışma sırasında patlardı — TypeScript bunu derlerken söyler. strictNullChecks açıksa, null/undefined kontrolü yapmadan değer kullanman engellenir.",
              "en": "TypeScript catches null errors at compile time. Java's NullPointerException would crash at runtime — TypeScript warns you during compilation. With strictNullChecks enabled, you cannot use a value without checking for null/undefined first."
            }
          },
          {
            "type": "code",
            "language": "typescript",
            "code": "// TypeScript Null Safety with strictNullChecks\n// (tsconfig.json: \"strictNullChecks\": true)\n\n// Nullable types — must be explicit\nlet name: string | null = null;   // string OR null\nlet age: number | undefined;      // number or undefined (not initialized)\n\n// Optional chaining — safe navigation (like Java ?. or Kotlin ?.))\ninterface User {\n  id: number;\n  profile?: {           // profile may not exist\n    email: string;\n    phone?: string;     // phone may not exist\n  };\n}\n\nfunction getPhone(user: User): string {\n  return user.profile?.phone ?? \"No phone\";  // ?. + ?? operator\n}\n\nconst u1: User = { id: 1, profile: { email: \"a@b.com\", phone: \"555-1234\" } };\nconst u2: User = { id: 2 };  // no profile\nconsole.log(getPhone(u1));   // 555-1234\nconsole.log(getPhone(u2));   // No phone\n\n// Nullish coalescing ?? vs || difference\nconst zero = 0;\nconsole.log(zero || \"default\");   // \"default\" — 0 is falsy!\nconsole.log(zero ?? \"default\");   // 0 — ?? only checks null/undefined\n\n// Non-null assertion operator ! (use carefully)\nfunction getLength(s: string | null): number {\n  return s!.length;   // tells TypeScript: \"I guarantee s is not null\"\n  // But if s IS null at runtime → crash! Use only when absolutely certain\n}\n\n// Safer approach: type guard\nfunction safeLength(s: string | null | undefined): number {\n  return s?.length ?? 0;\n}"
          },
          {
            "type": "editor",
            "lang": "typescript",
            "defaultCode": "// Practice null-safe API response handling\ninterface ApiUser {\n  id: number;\n  name: string;\n  email?: string;\n  address?: {\n    city: string;\n    country?: string;\n  };\n}\n\nfunction formatUser(user: ApiUser | null): string {\n  if (user === null) return \"No user\";\n  const email = user.email ?? \"No email\";\n  const city = user.address?.city ?? \"Unknown city\";\n  const country = user.address?.country ?? \"Unknown country\";\n  return user.name + \" | \" + email + \" | \" + city + \", \" + country;\n}\n\nconst fullUser: ApiUser = {\n  id: 1, name: \"Alice\", email: \"alice@example.com\",\n  address: { city: \"Istanbul\", country: \"Turkey\" }\n};\nconst partialUser: ApiUser = { id: 2, name: \"Bob\" };\n\nconsole.log(formatUser(fullUser));\nconsole.log(formatUser(partialUser));\nconsole.log(formatUser(null));"
          },
          {
            "type": "quiz",
            "question": {
              "en": "What is the difference between '??' and '||' operators in TypeScript?",
              "tr": "TypeScript'te '??' ve '||' operatörleri arasındaki fark nedir?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "No difference",
                  "tr": "Hiçbir fark yok"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "?? only checks for null/undefined, while || also treats 0, '', false as falsy",
                  "tr": "?? sadece null/undefined'ı kontrol eder, || 0, '', false'ı da falsy sayar"
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "|| is safer",
                  "tr": "|| daha güvenli"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "?? only exists in TypeScript, not JS",
                  "tr": "?? sadece TypeScript'te var, JS'de yok"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "en": "0 || 'default' = 'default' (0 is falsy). 0 ?? 'default' = 0 (0 is not null/undefined). In QA tests checking for zero values, use ?? — || would incorrectly treat 0 as missing.",
              "tr": "0 || 'default' = 'default' (0 falsy). 0 ?? 'default' = 0 (0 null/undefined değil). QA testlerinde sıfır değer kontrol ediyorsanız ?? kullanın — || sıfırı da default'a düşürür."
            },
            "retryQuestion": {
              "question": {
                "en": "What is the output of the following code: const val = false || 'Test'; const result = false ?? 'Test';",
                "tr": "Aşağıdaki kodun çıktısı nedir? const val = false || 'Test'; const result = false ?? 'Test';"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "val = 'Test', result = 'Test'",
                    "tr": "val = 'Test', result = 'Test'"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "val = false, result = false",
                    "tr": "val = false, result = false"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "val = 'Test', result = false",
                    "tr": "val = 'Test', result = false"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "val = false, result = 'Test'",
                    "tr": "val = false, result = 'Test'"
                  }
                }
              ],
              "correct": "c",
              "explanation": {
                "en": "The || operator treats 'false' as falsy and proceeds to the right side. The ?? operator only proceeds to the right side if the value is null or undefined; since false is neither, it is preserved.",
                "tr": "|| operatörü 'false' değerini falsy olarak kabul edip sağ tarafa geçer. ?? operatörü ise sadece null veya undefined durumunda sağ tarafa geçer; false değeri null/undefined olmadığı için korunur."
              }
            }
          },
          {
            "type": "ts-error-animation"
          },
          {
            "type": "heading",
            "text": {
              "en": "Template Literal Types",
              "tr": "Template Literal Tipleri"
            },
            "difficulty": {
              "en": "🔴 Advanced",
              "tr": "🔴 İleri Seviye"
            }
          },
          {
            "type": "simple-box",
            "emoji": "📝",
            "content": {
              "tr": "Template literal type, kelimeleri birleştirip yeni tip kuralları oluşturmaktır. 'staging' veya 'prod' kelimeleri ile '.myapp.com' adresini birleştirip sadece bu iki kalıba uyan URL'leri kabul eden bir kural yazar.",
              "en": "Template literal types let you merge strings to create new type rules. Like combining 'staging' or 'prod' with '.myapp.com' to restrict values to only those two URL strings."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "TypeScript 4.1 ile gelen Template Literal Types, JavaScript'in template literal (`${value}`) sözdizimini tiplere taşır. Bu sayede dinamik olarak oluşturulan string değerlerin doğruluğunu derleme zamanında kontrol edebilirsiniz. Özellikle test ortamlarındaki dynamic URL'ler, dynamic locators veya event isimleri için mükemmel bir koruma sağlar.",
              "en": "Introduced in TypeScript 4.1, Template Literal Types bring JS template literal string interpolation to type definitions. This checks dynamically built strings at compile time, preventing typos in test URLs, dynamic locators, or event names."
            }
          },
          {
            "type": "code",
            "language": "typescript",
            "label": {
              "en": "Template Literal Types Example",
              "tr": "Template Literal Tipleri Örneği"
            },
            "content": "type Environment = \"dev\" | \"staging\" | \"prod\";\n\n// Generate type-safe URL pattern: dev.app.com, staging.app.com, etc.\ntype AppUrl = `https://${Environment}.app.com`;\n\nconst validUrl: AppUrl = \"https://staging.app.com\"; // OK\n// const invalidUrl: AppUrl = \"https://qa.app.com\";    // ERROR: Type not assignable\n\n// Force test IDs to follow standards\ntype TestId = `data-testid=${string}`;\nconst validSelector: TestId = \"data-testid=submit-btn\"; // OK\n// const badSelector: TestId = \"submit-btn\";             // ERROR",
            "expected": ""
          },
          {
            "type": "editor",
            "lang": "typescript",
            "defaultCode": "// Try modifying the environment or prefix to trigger compile errors\ntype Browser = \"chrome\" | \"firefox\";\ntype Action = \"click\" | \"hover\";\n\ntype TestEvent = `${Browser}:${Action}`;\n\nconst myEvent: TestEvent = \"chrome:click\"; // OK\nconsole.log(\"Event registered:\", myEvent);\n\n// const badEvent: TestEvent = \"safari:click\"; // Try uncommenting this"
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "Neden Template Literal? dynamic locator yapılarında `data-testid` ön ekini veya ortam URL formatlarını yanlış yazıp testlerin CI'da patlamasını önler.",
              "en": "Why Use Template Literals? It avoids typos in dynamic locators or environment URL formats, preventing tests from failing in CI due to simple configuration slips."
            }
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "Java Karşılaştırması: Java'da string formatları derleme aşamasında tip olarak denetlenemez (ancak regex ile runtime'da denetlenir). TypeScript bunu derlerken kontrol eder.",
              "en": "Java Comparison: In Java, string structures cannot be validated as types at compile time (only regexed at runtime). TS enforces this at compilation."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: Üzerinde 'dev', 'prod' yazan küçük LEGO tuğlalarını, '.app.com' yazan büyük bloğun solundaki yuvaya takmak gibidir. Kalıba uymayan hiçbir etiket yuvaya girmez.",
              "en": "LEGO analogy: Snapping 'dev' or 'prod' labels into the socket of a larger '.app.com' LEGO block. Unapproved tags simply don't fit the connector pegs."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: 'Ön ek' (data-testid=) şeklindeki dişi LEGO parçası ile herhangi bir erkek LEGO parçasını (string) birleştirip sarsılmaz bir bütün oluşturmak gibidir.",
              "en": "LEGO analogy: Interlocking a female connector block ('data-testid=') with any male extension brick (representing the string), creating a rigid, standard assembly."
            }
          },
          {
            "type": "quiz",
            "question": {
              "tr": "TypeScript'te `type LogLevel = 'info' | 'error'; type LogMessage = `[${LogLevel}]: ${string}`;` tanımına göre hangisi geçerli bir değerdir?",
              "en": "Given the type declarations `type LogLevel = 'info' | 'error'; type LogMessage = `[${LogLevel}]: ${string}`;`, which string is a valid value?"
            },
            "options": [
              {
                "id": "a",
                "text": "[info]: Test passed successfully"
              },
              {
                "id": "b",
                "text": "[debug]: Test passed successfully"
              },
              {
                "id": "c",
                "text": "info: Test passed successfully"
              },
              {
                "id": "d",
                "text": "[error] Test passed successfully"
              }
            ],
            "correct": "a",
            "explanation": {
              "tr": "Tanımlanan pattern köşe parantezleri ve iki nokta üst üste içermektedir (`[LogLevel]: `). LogLevel ise sadece 'info' veya 'error' olabilir.",
              "en": "The pattern expects square brackets enclosing a valid log level followed by a colon and space. Only option A matches this layout exactly."
            },
            "retryQuestion": {
              "question": {
                "tr": "Template Literal Types test otomasyon projelerinde en çok ne için kullanılır?",
                "en": "What is the most common use case for Template Literal Types in QA automation?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "tr": "Test sürelerini ölçmek için",
                    "en": "Measuring test durations"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "tr": "Dinamik API URL'leri ve standarda bağlı seçicileri (locators) tip bazında doğrulamak için",
                    "en": "Validating dynamic API URLs and standard-compliant locators at compile time"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "tr": "Tarayıcıları açıp kapatmak için",
                    "en": "Launching and closing browsers"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "tr": "SQL sorguları yazmak için",
                    "en": "Writing SQL queries"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "tr": "Dinamik olarak birleştirilen test URL'leri ve seçicilerin belirli formatlara uymasını derleyici seviyesinde zorunlu kılmak için kullanılır.",
                "en": "They enforce string patterns (like URL structures or data-testid prefixes) at compile time, eliminating configuration errors before executing tests."
              }
            }
          }
        ]
      },
      {
        "title": {
          "en": "Error Handling & Advanced Types",
          "tr": "Hata Yönetimi & Gelişmiş Tipler"
        },
        "blocks": [
          {
            "type": "heading",
            "text": {
              "en": "Definitely Typed & @types Packages",
              "tr": "Definitely Typed & @types Packages"
            },
            "difficulty": "🟡 Intermediate"
          },
          {
            "type": "simple-box",
            "emoji": "📦",
            "content": {
              "tr": "@types paketi, bir JavaScript kütüphanesinin TypeScript rehber kitabı gibidir. Kütüphane TypeScript ile yazılmamışsa, bu paket TypeScript'e 'bu kütüphanede şu metodlar ve tipler var' der. Rehber olmadan TypeScript kütüphaneyi göremez.",
              "en": "A @types package is TypeScript's manual for a JavaScript library. If the library isn't written in TypeScript, this package tells TypeScript 'this library has these methods and types'. Without the manual, TypeScript can't see the library."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "Bazı kütüphaneler TypeScript ile yazılmış ve kendi .d.ts tip tanım dosyalarını içerir — Playwright ve axios buna örnek. Eski veya saf JavaScript kütüphaneleri için DefinitelyTyped topluluk deposu @types paketleri sağlar.",
              "en": "Some libraries are written in TypeScript and bundle their own .d.ts type definition files — Playwright and axios are examples. For older or plain JavaScript libraries, the DefinitelyTyped community repository provides @types packages."
            }
          },
          {
            "type": "code",
            "language": "typescript",
            "code": "// Installing @types packages\n\n// Library ships its own types — NO @types needed:\nnpm install --save-dev @playwright/test  // includes its own .d.ts\nnpm install axios                        // includes its own .d.ts\n\n// Library is plain JS — @types required:\nnpm install node-fetch\nnpm install --save-dev @types/node-fetch   // provides type definitions\n\n// Essential for Node.js projects:\nnpm install --save-dev @types/node         // Node.js built-ins (fs, path, process)\nnpm install --save-dev @types/jest         // Jest matchers (describe, it, expect)\n\n// Verify if a package bundles its own types:\n// Check package.json for \"types\" or \"typings\" field\n// → \"@playwright/test\": { \"types\": \"index.d.ts\" }    ← bundled!\n// → \"node-fetch\": (no types field)                   ← needs @types/node-fetch\n\nimport path from 'path';              // TypeScript knows: path.join, path.resolve\nimport { readFileSync } from 'fs';    // TypeScript knows the return type\nconst configPath: string = path.join(__dirname, 'playwright.config.ts');\nconsole.log('Config path:', configPath);"
          },
          {
            "type": "code",
            "language": "typescript",
            "code": "// What a .d.ts declaration file looks like\n// TypeScript reads these automatically — you don't write them for @types\n\n// Simplified version of @types/node fs.d.ts:\ndeclare module 'fs' {\n  function readFileSync(path: string, options: { encoding: BufferEncoding }): string;\n  function readFileSync(path: string): Buffer;\n  function writeFileSync(path: string, data: string | Buffer): void;\n  function existsSync(path: string): boolean;\n}\n\n// tsconfig.json — controlling type resolution\n// {\n//   \"compilerOptions\": {\n//     \"typeRoots\": [\"./node_modules/@types\", \"./src/types\"],\n//     // default already includes node_modules/@types — rarely need to change\n//\n//     \"types\": [\"node\", \"jest\"]\n//     // restrict to ONLY these @types packages (optional — omit to include all)\n//   }\n// }\n\n// Writing your own declaration for a legacy JS library\n// File: src/types/legacy-tool.d.ts\ndeclare module 'legacy-tool' {\n  export function runSuite(config: { url: string; timeout?: number }): Promise<void>;\n  export interface SuiteResult { passed: number; failed: number; }\n}"
          },
          {
            "type": "editor",
            "lang": "typescript",
            "defaultCode": "// Practice: Simulate type declarations for a plain JS library\n\n// Declare types for an imaginary legacy JavaScript library:\ndeclare function runBenchmark(\n  name: string,\n  fn: () => void,\n  iterations?: number\n): { name: string; avgMs: number; minMs: number; maxMs: number };\n\n// Now TypeScript understands runBenchmark:\nconst result = runBenchmark(\"sort 1000 items\", () => {\n  [3, 1, 4, 1, 5, 9, 2, 6].sort();\n}, 100);\n\n// TypeScript knows the return type shape:\nconst report: string = result.name + \": avg \" + result.avgMs.toFixed(2) + \"ms\";\nconsole.log(report);\n\n// Try breaking a type to see TypeScript catch it:\n// runBenchmark(42, () => {});   // Error: number not assignable to string\n// result.totalMs;               // Error: property does not exist\nconsole.log(\"Avg:\", result.avgMs, \"ms | Min:\", result.minMs, \"ms\");"
          },
          {
            "type": "java-compare",
            "topic": "Type declarations for external libraries",
            "why": {
              "en": "Java'da Jackson veya Gson kullanırken tipler Maven/Gradle ile gelir ve Java sınıflarının kendisidir. TypeScript'te ise çoğu JavaScript kütüphanesi tip tanımı içermez — @types paketi bu boşluğu doldurur.",
              "tr": "Java'da Jackson veya Gson kullanırken tipler Maven/Gradle ile gelir ve Java sınıflarının kendisidir. TypeScript'te ise çoğu JavaScript kütüphanesi tip tanımı içermez — @types paketi bu boşluğu doldurur."
            },
            "why_en": "In Java, libraries like Jackson or Gson come via Maven/Gradle and their types are the Java classes themselves. In TypeScript, most JavaScript libraries don't bundle type definitions — @types packages fill this gap.",
            "java": "// Java: types come from the library's compiled .class files\n// Add to pom.xml — types come bundled in the .jar:\n// <dependency>\n//   <groupId>com.fasterxml.jackson.core</groupId>\n//   <artifactId>jackson-databind</artifactId>\n//   <version>2.15.0</version>\n// </dependency>\n\n// IDE and compiler see all types automatically:\nObjectMapper mapper = new ObjectMapper();\nMyData obj = mapper.readValue(jsonString, MyData.class);\n// ↑ Full type safety — IDE shows all readValue overloads",
            "typescript": "// TypeScript: runtime code and types are SEPARATE for JS libraries\n\n// Option 1 — library bundles its own types (modern):\nimport { test, expect } from '@playwright/test';  // types included\nimport axios from 'axios';                         // types included\n\n// Option 2 — install @types for legacy JS libraries:\n// npm install node-fetch\n// npm install --save-dev @types/node-fetch\nimport fetch from 'node-fetch';  // now TypeScript understands fetch\n\n// Option 3 — write your own .d.ts declaration file:\n// src/types/legacy-api.d.ts\ndeclare module 'legacy-api' {\n  export function callEndpoint(url: string): Promise<{ status: number }>;\n}\n\n// Without types, TypeScript falls back to 'any' — no type safety",
            "note": {
              "en": "Kütüphane seçerken npm sayfasında 'TypeScript' rozetine veya package.json'da 'types' field'ına bakın. Varsa @types kurmanıza gerek yok. Yoksa @types/paket-adi kurun.",
              "tr": "Kütüphane seçerken npm sayfasında 'TypeScript' rozetine veya package.json'da 'types' field'ına bakın. Varsa @types kurmanıza gerek yok. Yoksa @types/paket-adi kurun."
            },
            "note_en": "When picking a library, check the npm page for a 'TypeScript' badge or 'types' field in package.json. If present, no @types needed. Otherwise install @types/package-name."
          },
          {
            "type": "quiz",
            "question": {
              "en": "When is it REQUIRED to install @types/node?",
              "tr": "@types/node kurulumu ne zaman GEREKLİDİR?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "It installs automatically in every TypeScript project",
                  "tr": "Her TypeScript projesinde otomatik kurulur"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "When using Node.js APIs (fs, path, process) in TypeScript code",
                  "tr": "Node.js API'lerini (fs, path, process) TypeScript kodunda kullanırken"
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "Only required for Playwright projects",
                  "tr": "Yalnızca Playwright projeleri için gereklidir"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "Only in frontend (React, Vue) projects",
                  "tr": "Yalnızca frontend (React, Vue) projelerinde"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "en": "@types/node is required when using Node.js built-in modules (fs, path, process) in TypeScript. The Node.js runtime ships no TypeScript types — @types/node provides them. Most Playwright projects need @types/node since they use Node.js APIs for file I/O, env vars, and path manipulation.",
              "tr": "Node.js runtime'ı JavaScript ile yazılmıştır — TypeScript tipleri içermez. @types/node paketi fs.readFileSync, path.join, process.env gibi built-in modüller için tip tanımları sağlar. Playwright projeleri de Node.js API'lerini kullandığından neredeyse her Playwright+TypeScript projesinde @types/node bulunur."
            },
            "retryQuestion": {
              "question": {
                "en": "Why do we need the @types/node package when using 'import fs from \"fs\"' in TypeScript projects?",
                "tr": "Neden TypeScript projelerinde 'import fs from \"fs\"' satırı için @types/node paketine ihtiyaç duyarız?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "It allows the TypeScript compiler to find the Node.js installation",
                    "tr": "TypeScript derleyicisinin Node.js kurulumunu bulmasını sağlar"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "It provides type definitions so that Node.js modules are understandable by TypeScript",
                    "tr": "Node.js modüllerinin TypeScript tarafından anlaşılabilmesi için tip tanımlarını (typings) sunar"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "It forces the code to run in the browser instead of Node.js",
                    "tr": "Kodun Node.js yerine tarayıcıda çalışmasını zorunlu kılar"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "It is an additional runtime library to speed up the fs module",
                    "tr": "fs modülünü hızlandırmak için ek bir runtime kütüphanesidir"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "en": "Node.js built-in modules (fs, path, http, etc.) are written in JavaScript. To let TypeScript understand the methods and parameter types of these modules, an external type definition package like @types/node is necessary.",
                "tr": "Node.js yerleşik modülleri (fs, path, http vb.) JavaScript ile yazılmıştır. TypeScript'in bu modüllerin metodlarını ve parametre tiplerini anlayabilmesi için harici bir tip tanım paketi olan @types/node gereklidir."
              }
            }
          },
          {
            "type": "ts-mini-hero",
            "promptTr": "@types paketi tam olarak ne işe yarar? Kütüphane kendi tip tanımlarını içeriyorsa @types kurman gerekiyor mu?",
            "promptEn": "What exactly does a @types package do? If a library already bundles its own types, do you still need @types?",
            "keywords": [
              [
                "tip tanım",
                "type definition",
                "d.ts",
                "declaration"
              ],
              [
                "bundle",
                "kendi",
                "own",
                "içeriyor",
                "bundled"
              ],
              [
                "hayır",
                "no",
                "gerekmez",
                "not needed",
                "required"
              ],
              [
                "javascript",
                "js",
                "plain"
              ]
            ],
            "modelAnswerTr": "@types paketi, JavaScript kütüphaneleri için TypeScript tip tanımları sağlar. Playwright gibi TypeScript ile yazılmış kütüphaneler kendi tiplerini içerir — @types kurmana gerek yok.",
            "modelAnswerEn": "@types packages provide TypeScript type definitions for JavaScript libraries. Libraries like Playwright are written in TypeScript and bundle their own types — no @types package needed."
          },
          {
            "type": "heading",
            "text": {
              "en": "Conditional & Mapped Types",
              "tr": "Conditional & Mapped Types"
            },
            "difficulty": "🔴 Advanced"
          },
          {
            "type": "simple-box",
            "emoji": "🗺️",
            "content": {
              "tr": "Conditional type, 'eğer X ise A, değilse B' mantığında çalışan tip. Mapped type, bir nesnenin tüm alanlarını dönüştürür — her alanı opsiyonel yap, her alanı string yap gibi. Partial<T> aslında bir mapped type.",
              "en": "A conditional type works like 'if X then A, else B' for types. A mapped type transforms all fields of an object — make every field optional, make every field a string. Partial<T> is actually a mapped type."
            }
          },
          {
            "type": "code",
            "language": "typescript",
            "code": "// Conditional Types — ternary for types\ntype IsString<T> = T extends string ? \"yes\" : \"no\";\n\ntype A = IsString<string>;   // \"yes\"\ntype B = IsString<number>;   // \"no\"\n\n// NonNullable (built-in utility — implemented as conditional type)\ntype NonNull<T> = T extends null | undefined ? never : T;\n\n// Mapped Types — transform all properties\ninterface User { id: number; name: string; active: boolean; }\n\n// Make all fields optional (same as Partial<T>)\ntype Optional<T> = { [K in keyof T]?: T[K] };\n\n// Make all fields readonly (same as Readonly<T>)\ntype Immutable<T> = { readonly [K in keyof T]: T[K] };\n\n// Make all fields strings (type transformation)\ntype Stringified<T> = { [K in keyof T]: string };\n\ntype StringUser = Stringified<User>;\nconst su: StringUser = { id: \"1\", name: \"Alice\", active: \"true\" };\n\n// Practical: validation schema\ntype ValidationRules<T> = {\n  [K in keyof T]?: (value: T[K]) => string | null;  // null = valid\n};\n\nconst userValidation: ValidationRules<User> = {\n  name: (v) => v.length < 2 ? \"Name too short\" : null,\n  id: (v) => v <= 0 ? \"ID must be positive\" : null,\n};\n\nfunction validate<T>(obj: T, rules: ValidationRules<T>): string[] {\n  const errors: string[] = [];\n  for (const key in rules) {\n    const rule = rules[key];\n    const error = rule ? rule(obj[key]) : null;\n    if (error) errors.push(key + \": \" + error);\n  }\n  return errors;\n}\n\nconst u: User = { id: 1, name: \"A\", active: true };\nconsole.log(validate(u, userValidation));  // [\"name: Name too short\"]"
          },
          {
            "type": "editor",
            "lang": "typescript",
            "defaultCode": "// Build a DeepReadonly mapped type\ntype DeepReadonly<T> = {\n  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];\n};\n\ninterface Config {\n  server: {\n    host: string;\n    port: number;\n    ssl: boolean;\n  };\n  database: {\n    url: string;\n    poolSize: number;\n  };\n}\n\nconst config: DeepReadonly<Config> = {\n  server: { host: \"localhost\", port: 3000, ssl: true },\n  database: { url: \"postgres://localhost/testdb\", poolSize: 5 },\n};\n\nconsole.log(\"Host:\", config.server.host);\nconsole.log(\"Port:\", config.server.port);\n\n// This would be a TypeScript error:\n// config.server.port = 9000;  // Cannot assign to readonly"
          },
          {
            "type": "quiz",
            "question": {
              "en": "What does { [K in keyof T]?: T[K] } do in TypeScript?",
              "tr": "TypeScript'te { [K in keyof T]?: T[K] } ne yapar?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "Removes all fields from T",
                  "tr": "T'nin tüm alanlarını siler"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "Makes all fields of T optional (same as Partial<T>)",
                  "tr": "T'nin tüm alanlarını opsiyonel yapar (Partial<T> ile aynı)"
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "Converts T's fields to strings",
                  "tr": "T'nin alanlarını string'e dönüştürür"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "Converts T to an array",
                  "tr": "T'yi array'e dönüştürür"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "en": "[K in keyof T] iterates over all keys of T. ?: makes each optional. T[K] preserves the original type. This is exactly how Partial<T> is implemented.",
              "tr": "[K in keyof T] ile T'nin tüm keylerini iterate edersin. ?: her birini opsiyonel yapar. T[K] ile orijinal tipi korursun. Bu tam olarak Partial<T>'nin implementation'ı."
            },
            "retryQuestion": {
              "question": {
                "en": "Which of the following is the underlying equivalent of the Readonly<T> utility type in TypeScript?",
                "tr": "TypeScript'te Readonly<T> yardımcı tipinin arka planda çalışan eşdeğeri aşağıdakilerden hangisidir?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "{ readonly [K in keyof T]: T[K] }",
                    "tr": "{ readonly [K in keyof T]: T[K] }"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "{ [K in keyof T]: T[K] | null }",
                    "tr": "{ [K in keyof T]: T[K] | null }"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "{ [K in keyof T]?: T[K] }",
                    "tr": "{ [K in keyof T]?: T[K] }"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "{ [K in keyof T]: T[K] | undefined }",
                    "tr": "{ [K in keyof T]: T[K] | undefined }"
                  }
                }
              ],
              "correct": "a",
              "explanation": {
                "en": "The Readonly<T> utility makes all properties of an object immutable. This is achieved using the mapped type syntax by prepending the readonly modifier to every key via [K in keyof T].",
                "tr": "Readonly<T> yapısı, bir nesnenin tüm özelliklerini değiştirilemez hale getirir. Bu, mapped type sözdizimi kullanılarak [K in keyof T] üzerinden her anahtarın önüne readonly değiştiricisi eklenerek gerçekleştirilir."
              }
            }
          },
          {
            "type": "ts-mini-hero",
            "promptTr": "Conditional type ne zaman kullanılır? T extends string ? 'evet' : 'hayır' — bunu gerçekte ne zaman yazarsın?",
            "promptEn": "When are conditional types actually useful? T extends string ? 'yes' : 'no' — when would you really write this?",
            "keywords": [
              [
                "utility",
                "yardımcı",
                "tip yazmak",
                "writing types",
                "utility type"
              ],
              [
                "conditional",
                "koşullu",
                "eğer",
                "if"
              ],
              [
                "generic",
                "genel",
                "T"
              ],
              [
                "kütüphane",
                "library",
                "framework"
              ]
            ],
            "modelAnswerTr": "Utility type yazmak istediğinde: IsArray<T> = T extends any[] ? 'array' : 'not array'. Çoğunlukla kütüphane/framework geliştiricileri kullanır. Normal uygulama kodunda nadiren gerekir.",
            "modelAnswerEn": "When writing utility types: IsArray<T> = T extends any[] ? 'array' : 'not array'. Mostly used by library and framework authors. In everyday application code, you rarely need them."
          },
          {
            "type": "interleaving-challenge",
            "challenges": [
              {
                "topic": "Union Types",
                "questionTr": "string | number tipinde bir değişkende TypeScript hangi yöntemle spesifik tipi anlar?",
                "questionEn": "With a string | number type, how does TypeScript determine the specific type?",
                "optionsTr": [
                  "Otomatik seçer",
                  "typeof kontrolü ile (type narrowing)",
                  "as ile cast edilir",
                  "Runtime'da anlar"
                ],
                "optionsEn": [
                  "Selects automatically",
                  "Via typeof check (type narrowing)",
                  "Cast with as keyword",
                  "Figures out at runtime"
                ],
                "correct": 1,
                "explanationTr": "typeof kontrolü (type narrowing) TypeScript'in değişkenin gerçek tipini statik olarak bilmesini sağlar — runtime'a gerek yok.",
                "explanationEn": "typeof check (type narrowing) lets TypeScript know the real type statically — no runtime needed."
              },
              {
                "topic": "Generics",
                "questionTr": "function identity<T>(x: T): T çağrılırken T'yi açıkça belirtmek şart mı?",
                "questionEn": "When calling function identity<T>(x: T): T, is it required to explicitly specify T?",
                "optionsTr": [
                  "Evet, her zaman belirtmek gerekir",
                  "Hayır, TypeScript T'yi argümandan çıkarsar",
                  "Sadece string/number için zorunlu",
                  "Hayır, T her zaman any olur"
                ],
                "optionsEn": [
                  "Yes, always required",
                  "No, TypeScript infers T from the argument",
                  "Only required for string/number",
                  "No, T always becomes any"
                ],
                "correct": 1,
                "explanationTr": "TypeScript T'yi argümandan otomatik çıkarsar. identity('hello') → T=string. Java'da da aynı mantık.",
                "explanationEn": "TypeScript infers T from the argument automatically. identity('hello') → T=string. Same logic as Java."
              },
              {
                "topic": "Null Safety",
                "questionTr": "user?.profile?.email ifadesinde profile null ise ne döner?",
                "questionEn": "In user?.profile?.email, what is returned if profile is null?",
                "optionsTr": [
                  "Hata fırlatır",
                  "null döner",
                  "undefined döner",
                  "Boş string döner"
                ],
                "optionsEn": [
                  "Throws an error",
                  "Returns null",
                  "Returns undefined",
                  "Returns empty string"
                ],
                "correct": 2,
                "explanationTr": "?. (optional chaining) null/undefined'da crash olmak yerine undefined döner. ?? ile varsayılan değer eklenebilir.",
                "explanationEn": "?. (optional chaining) returns undefined instead of crashing on null/undefined. Combine with ?? to add a default."
              },
              {
                "topic": "Interface",
                "questionTr": "Aynı isimde iki interface tanımlanırsa TypeScript ne yapar?",
                "questionEn": "If two interfaces share the same name, what does TypeScript do?",
                "optionsTr": [
                  "Hata verir",
                  "Sadece son tanımı kullanır",
                  "İkisini birleştirir (declaration merging)",
                  "İkincisini yok sayar"
                ],
                "optionsEn": [
                  "Throws an error",
                  "Uses only the last definition",
                  "Merges both (declaration merging)",
                  "Ignores the second"
                ],
                "correct": 2,
                "explanationTr": "Declaration merging: aynı isimli iki interface TypeScript tarafından otomatik birleştirilir. type alias bunu desteklemez.",
                "explanationEn": "Declaration merging: TypeScript automatically merges two interfaces with the same name. type alias does not support this."
              },
              {
                "topic": "Utility Types",
                "questionTr": "PATCH endpoint için 'sadece değişen alanları içeren' payload tipi nasıl üretilir?",
                "questionEn": "How do you produce a payload type containing only changed fields for a PATCH endpoint?",
                "optionsTr": [
                  "Required<T>",
                  "Readonly<T>",
                  "Partial<T>",
                  "Pick<T,K>"
                ],
                "optionsEn": [
                  "Required<T>",
                  "Readonly<T>",
                  "Partial<T>",
                  "Pick<T,K>"
                ],
                "correct": 2,
                "explanationTr": "Partial<T> tüm alanları opsiyonel (?) yapar — PATCH sadece değişen alanları gönderir. Required<T> tam tersidir.",
                "explanationEn": "Partial<T> makes all fields optional (?) — PATCH only sends changed fields. Required<T> is the exact opposite."
              }
            ]
          },
          {
            "type": "interview-questions",
            "topic": "TypeScript Advanced",
            "questions": [
              {
                "level": "basic",
                "q": {
                  "tr": "TypeScript Generics neden kullanılır? Java'dan farkı nedir?",
                  "en": "Why are TypeScript Generics used? How do they differ from Java?"
                },
                "a": {
                  "tr": "Generic'ler tip-güvenli, yeniden kullanılabilir kod yazmak için. function identity<T>(x: T): T — her tip için aynı kodu kullanabilirsin. Java generic'leriyle aynı mantık. Fark: TypeScript structural typing kullanır, Java nominal typing. TypeScript'te <T extends { length: number }> ile duck typing yapılabilir.",
                  "en": "Generics write type-safe, reusable code. function identity<T>(x: T): T — same code works for every type. Same concept as Java generics. Difference: TypeScript uses structural typing, Java uses nominal typing. TypeScript allows duck typing: <T extends { length: number }>."
                }
              },
              {
                "level": "intermediate",
                "q": {
                  "tr": "Utility types nedir? En çok kullandığın hangisi ve neden?",
                  "en": "What are utility types? Which do you use most and why?"
                },
                "a": {
                  "tr": "Built-in tip dönüştürücüler: Partial<T>, Required<T>, Pick<T,K>, Omit<T,K>, Record<K,V>, Readonly<T>. En çok: Partial<T> — PUT/PATCH API endpoint'lerinde tüm alanların opsiyonel olduğu update payload'lar için. Ve Omit<T, 'password'|'secret'> — hassas alanları response'dan çıkarmak için.",
                  "en": "Built-in type transformers: Partial<T>, Required<T>, Pick<T,K>, Omit<T,K>, Record<K,V>, Readonly<T>. Most used: Partial<T> — for update payloads in PUT/PATCH endpoints where all fields are optional. And Omit<T, 'password'|'secret'> — removing sensitive fields from API responses."
                }
              },
              {
                "level": "advanced",
                "q": {
                  "tr": "Conditional types ne zaman kullanılmalı?",
                  "en": "When should conditional types be used?"
                },
                "a": {
                  "tr": "Conditional types: T extends U ? X : Y — tipler üzerinde if/else gibi. Kullanım: 1) Utility types yazmak (NonNullable gibi). 2) Discriminated unions üzerinde çalışmak. 3) Function overload signatures yerine. Karmaşık olabilir — önce simpler çözüm dene. QA framework'lerinde genellikle result types için kullanılır.",
                  "en": "Conditional types: T extends U ? X : Y — if/else logic for types. Use cases: 1) Writing utility types (like NonNullable). 2) Working with discriminated unions. 3) Instead of function overload signatures. Can be complex — try simpler solutions first. In QA frameworks, often used for result types."
                }
              }
            ]
          },
          {
            "type": "heading",
            "text": {
              "en": "Type-Safe Error Handling",
              "tr": "Tip Güvenli Hata Yönetimi"
            },
            "difficulty": {
              "en": "🟡 Intermediate",
              "tr": "🟡 Orta Seviye"
            }
          },
          {
            "type": "simple-box",
            "emoji": "🛡️",
            "content": {
              "tr": "Hata yönetimi, bilinmeyen bir kutuyu eldivenle açmak gibidir. Kutunun içinden ne çıkacağını bilmediğin (unknown) için önce kontrol edersin, sonra dokunursun.",
              "en": "Error handling is like opening a mystery package with protective gloves. Since you don't know what is inside (unknown), you inspect it before handling it."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "JavaScript'te `throw` ifadesiyle her şeyi fırlatabilirsiniz (sayı, string veya özel bir nesne). Bu yüzden catch bloğuna düşen hata parametresi modern TypeScript'te varsayılan olarak `unknown` (bilinmeyen) tiptedir. Hatayı kontrol etmeden (instanceof check) onun `message` veya `stack` gibi özelliklerine erişemezsiniz. Bu, testlerin çalışırken tanımsız hatalarla (TypeError) çökmesini önler.",
              "en": "In JavaScript, you can throw anything (strings, numbers, or objects). Therefore, modern TS types catch variables as `unknown` by default. You cannot access properties like `message` without first narrowing the type (e.g., using `instanceof Error`), preventing runtime crashes."
            }
          },
          {
            "type": "code",
            "language": "typescript",
            "label": {
              "en": "Type-Safe Try-Catch in TypeScript",
              "tr": "TypeScript'te Güvenli Try-Catch"
            },
            "content": "async function clickSelector(selector: string) {\n  try {\n    await page.click(selector);\n  } catch (error: unknown) { // error is unknown by default\n    // We cannot do: console.log(error.message); // ERROR: error is unknown\n\n    if (error instanceof Error) {\n      // TypeScript now knows error is an Error object\n      console.error(\"Test failed:\", error.message);\n      console.error(\"Stack trace:\", error.stack);\n    } else {\n      // Fallback for non-standard throws (e.g. throw \"custom error string\")\n      console.error(\"An unexpected error occurred:\", String(error));\n    }\n  }\n}",
            "expected": ""
          },
          {
            "type": "editor",
            "lang": "typescript",
            "defaultCode": "// Try throwing a string vs an Error object\nfunction testAction() {\n  try {\n    // Try switching these:\n    throw new Error(\"Element not clickable!\");\n    // throw \"Something bad happened!\";\n  } catch (err: unknown) {\n    if (err instanceof Error) {\n      console.log(\"Caught standard error:\", err.message);\n    } else {\n      console.log(\"Caught non-standard throw:\", String(err));\n    }\n  }\n}\ntestAction();"
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "Neden instanceof Kontrolü? Testlerde beklenmedik API hataları veya timeout hataları yakalandığında, sadece hata mesajını (error.message) güvenle yazdırmak ve test akışını bozmamak için zorunludur.",
              "en": "Why Use instanceof? Crucial in tests when catching API or timeout failures, ensuring you only access `.message` safely without introducing nested TypeErrors."
            }
          },
          {
            "type": "tip-box",
            "content": {
              "tr": "Java Karşılaştırması: Java'da catch bloğunda tip belirtilir (`catch (IOException e)`). TypeScript'te ise tek bir catch vardır; bu yüzden çalışma zamanı tip daraltması (`instanceof`) Java'nın çoklu catch bloklarının işini yapar.",
              "en": "Java Comparison: Java catch blocks specify types explicitly (`catch (IOException e)`). TS has a single catch, so runtime `instanceof` checks serve the role of Java's multi-catch."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: Yere düşüp dağılan tuğlaları ayırmak gibidir. Eğer parça kırmızı renkteyse (instanceof Error), üzerindeki hata barkodunu (message) okursunuz; yoksa kenara koyarsınız.",
              "en": "LEGO analogy: Sifting through generic fallen parts. If a brick is red (instanceof Error), you read its serial code (message); otherwise, you handle it as an unlabelled component."
            }
          },
          {
            "type": "text",
            "content": {
              "tr": "LEGO ile anlatım: Üzerinde hiçbir etiket olmayan gri bir LEGO kutusunu açmak gibidir. Kutuyu açıp kılavuza (Error prototipine) bakmadan içindekilerle oynamazsınız.",
              "en": "LEGO analogy: Receiving an unlabelled box of bricks. You don't try to build complex assemblies until you open the box and confirm it contains the manual (Error prototype)."
            }
          },
          {
            "type": "quiz",
            "question": {
              "tr": "TypeScript 4+ sürümünde `catch (error)` bloğundaki error değişkeninin varsayılan olarak `unknown` olmasının temel nedeni nedir?",
              "en": "What is the primary reason why catch variables default to `unknown` in modern TypeScript?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "tr": "Bellek tasarrufu sağlamak için",
                  "en": "To save memory at runtime"
                }
              },
              {
                "id": "b",
                "text": {
                  "tr": "JavaScript'te throw ile nesne dışındaki tiplerin (string, number) de fırlatılabilecek olması ve tipin baştan bilinememesi",
                  "en": "Because JS allows throwing any value (strings, numbers, etc.), making the error type unpredictable beforehand"
                }
              },
              {
                "id": "c",
                "text": {
                  "tr": "Hataların otomatik yoksayılması için",
                  "en": "To automatically ignore errors"
                }
              },
              {
                "id": "d",
                "text": {
                  "tr": "Java ile tam uyumluluk yakalamak için",
                  "en": "To achieve identical behavior with Java catch blocks"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "tr": "JavaScript'te `throw 'hata'` veya `throw 500` gibi ifadelere izin verilir. Bu yüzden catch bloğuna neyin düşeceği garanti edilemez. unknown tipi bizi bunu doğrulamaya zorlar.",
              "en": "JavaScript throws are untyped (you can throw numbers or strings). Thus, TypeScript cannot guarantee the caught value is an Error instance, requiring `unknown`."
            },
            "retryQuestion": {
              "question": {
                "tr": "catch bloğuna düşen `error: unknown` değişkeninin `.message` özelliğine erişmek için en güvenli yol nedir?",
                "en": "What is the safest way to access the `.message` property of a caught `error: unknown` variable?"
              },
              "options": [
                {
                  "id": "a",
                  "text": "console.log((error as any).message)"
                },
                {
                  "id": "b",
                  "text": "if (error instanceof Error) { console.log(error.message); }"
                },
                {
                  "id": "c",
                  "text": "console.log(error.message)"
                },
                {
                  "id": "d",
                  "text": "console.log(error!.message)"
                }
              ],
              "correct": "b",
              "explanation": {
                "tr": "`instanceof Error` kontrolü çalışma zamanında nesnenin Error sınıfından türediğini doğrular ve TypeScript'in tipi Error olarak daraltmasını (narrowing) sağlar.",
                "en": "Checking `error instanceof Error` dynamically verifies the prototype chain and narrows the type, allowing safe access to `.message` without compiler errors."
              }
            }
          },
          {
            "type": "interleaving-challenge",
            "challenges": [
              {
                "topic": "Union Types",
                "questionTr": "string | number tipinde bir değişkende TypeScript hangi yöntemle spesifik tipi anlar?",
                "questionEn": "With a string | number type, how does TypeScript determine the specific type?",
                "optionsTr": [
                  "Otomatik seçer",
                  "typeof kontrolü ile (type narrowing)",
                  "as ile cast edilir",
                  "Runtime'da anlar"
                ],
                "optionsEn": [
                  "Selects automatically",
                  "Via typeof check (type narrowing)",
                  "Cast with as keyword",
                  "Figures out at runtime"
                ],
                "correct": 1,
                "explanationTr": "typeof kontrolü (type narrowing) TypeScript'in değişkenin gerçek tipini statik olarak bilmesini sağlar — runtime'a gerek yok.",
                "explanationEn": "typeof check (type narrowing) lets TypeScript know the real type statically — no runtime needed."
              },
              {
                "topic": "Generics",
                "questionTr": "function identity<T>(x: T): T çağrılırken T'yi açıkça belirtmek şart mı?",
                "questionEn": "When calling function identity<T>(x: T): T, is it required to explicitly specify T?",
                "optionsTr": [
                  "Evet, her zaman belirtmek gerekir",
                  "Hayır, TypeScript T'yi argümandan çıkarsar",
                  "Sadece string/number için zorunlu",
                  "Hayır, T her zaman any olur"
                ],
                "optionsEn": [
                  "Yes, always required",
                  "No, TypeScript infers T from the argument",
                  "Only required for string/number",
                  "No, T always becomes any"
                ],
                "correct": 1,
                "explanationTr": "TypeScript T'yi argümandan otomatik çıkarsar. identity('hello') → T=string. Java'da da aynı mantık.",
                "explanationEn": "TypeScript infers T from the argument automatically. identity('hello') → T=string. Same logic as Java."
              },
              {
                "topic": "Null Safety",
                "questionTr": "user?.profile?.email ifadesinde profile null ise ne döner?",
                "questionEn": "In user?.profile?.email, what is returned if profile is null?",
                "optionsTr": [
                  "Hata fırlatır",
                  "null döner",
                  "undefined döner",
                  "Boş string döner"
                ],
                "optionsEn": [
                  "Throws an error",
                  "Returns null",
                  "Returns undefined",
                  "Returns empty string"
                ],
                "correct": 2,
                "explanationTr": "?. (optional chaining) null/undefined'da crash olmak yerine undefined döner. ?? ile varsayılan değer eklenebilir.",
                "explanationEn": "?. (optional chaining) returns undefined instead of crashing on null/undefined. Combine with ?? to add a default."
              },
              {
                "topic": "Interface",
                "questionTr": "Aynı isimde iki interface tanımlanırsa TypeScript ne yapar?",
                "questionEn": "If two interfaces share the same name, what does TypeScript do?",
                "optionsTr": [
                  "Hata verir",
                  "Sadece son tanımı kullanır",
                  "İkisini birleştirir (declaration merging)",
                  "İkincisini yok sayar"
                ],
                "optionsEn": [
                  "Throws an error",
                  "Uses only the last definition",
                  "Merges both (declaration merging)",
                  "Ignores the second"
                ],
                "correct": 2,
                "explanationTr": "Declaration merging: aynı isimli iki interface TypeScript tarafından otomatik birleştirilir. type alias bunu desteklemez.",
                "explanationEn": "Declaration merging: TypeScript automatically merges two interfaces with the same name. type alias does not support this."
              },
              {
                "topic": "Utility Types",
                "questionTr": "PATCH endpoint için 'sadece değişen alanları içeren' payload tipi nasıl üretilir?",
                "questionEn": "How do you produce a payload type containing only changed fields for a PATCH endpoint?",
                "optionsTr": [
                  "Required<T>",
                  "Readonly<T>",
                  "Partial<T>",
                  "Pick<T,K>"
                ],
                "optionsEn": [
                  "Required<T>",
                  "Readonly<T>",
                  "Partial<T>",
                  "Pick<T,K>"
                ],
                "correct": 2,
                "explanationTr": "Partial<T> tüm alanları opsiyonel (?) yapar — PATCH sadece değişen alanları gönderir. Required<T> tam tersidir.",
                "explanationEn": "Partial<T> makes all fields optional (?) — PATCH only sends changed fields. Required<T> is the exact opposite."
              }
            ]
          },
          {
            "type": "interview-questions",
            "topic": "TypeScript Advanced",
            "questions": [
              {
                "level": "basic",
                "q": {
                  "tr": "TypeScript Generics neden kullanılır? Java'dan farkı nedir?",
                  "en": "Why are TypeScript Generics used? How do they differ from Java?"
                },
                "a": {
                  "tr": "Generic'ler tip-güvenli, yeniden kullanılabilir kod yazmak için. function identity<T>(x: T): T — her tip için aynı kodu kullanabilirsin. Java generic'leriyle aynı mantık. Fark: TypeScript structural typing kullanır, Java nominal typing. TypeScript'te <T extends { length: number }> ile duck typing yapılabilir.",
                  "en": "Generics write type-safe, reusable code. function identity<T>(x: T): T — same code works for every type. Same concept as Java generics. Difference: TypeScript uses structural typing, Java uses nominal typing. TypeScript allows duck typing: <T extends { length: number }>."
                }
              },
              {
                "level": "intermediate",
                "q": {
                  "tr": "Utility types nedir? En çok kullandığın hangisi ve neden?",
                  "en": "What are utility types? Which do you use most and why?"
                },
                "a": {
                  "tr": "Built-in tip dönüştürücüler: Partial<T>, Required<T>, Pick<T,K>, Omit<T,K>, Record<K,V>, Readonly<T>. En çok: Partial<T> — PUT/PATCH API endpoint'lerinde tüm alanların opsiyonel olduğu update payload'lar için. Ve Omit<T, 'password'|'secret'> — hassas alanları response'dan çıkarmak için.",
                  "en": "Built-in type transformers: Partial<T>, Required<T>, Pick<T,K>, Omit<T,K>, Record<K,V>, Readonly<T>. Most used: Partial<T> — for update payloads in PUT/PATCH endpoints where all fields are optional. And Omit<T, 'password'|'secret'> — removing sensitive fields from API responses."
                }
              },
              {
                "level": "advanced",
                "q": {
                  "tr": "Conditional types ne zaman kullanılmalı?",
                  "en": "When should conditional types be used?"
                },
                "a": {
                  "tr": "Conditional types: T extends U ? X : Y — tipler üzerinde if/else gibi. Kullanım: 1) Utility types yazmak (NonNullable gibi). 2) Discriminated unions üzerinde çalışmak. 3) Function overload signatures yerine. Karmaşık olabilir — önce simpler çözüm dene. QA framework'lerinde genellikle result types için kullanılır.",
                  "en": "Conditional types: T extends U ? X : Y — if/else logic for types. Use cases: 1) Writing utility types (like NonNullable). 2) Working with discriminated unions. 3) Instead of function overload signatures. Can be complex — try simpler solutions first. In QA frameworks, often used for result types."
                }
              }
            ]
          }
        ]
      },
      {
        "title": {
          "en": "QA Use Cases",
          "tr": "QA Kullanım Örnekleri"
        },
        "blocks": [
          {
            "type": "heading",
            "content": {
              "en": "1. Fully Typed Page Object Model",
              "tr": "1. Tam Tipli Page Object Model"
            },
            "difficulty": "🟡 Intermediate"
          },
          {
            "type": "code",
            "language": "typescript",
            "label": {
              "en": "Production-ready TypeScript POM class",
              "tr": "Production-ready TypeScript POM class"
            },
            "content": {
              "en": "// pages/LoginPage.ts\n// Full TypeScript Page Object Model using Playwright types\n\nimport { type Page, type Locator } from \"@playwright/test\";\n\n// Interface defines the public contract — what callers can do with this page\nexport interface ILoginPage {\n  navigate(): Promise<void>;\n  login(email: string, password: string): Promise<void>;\n  getErrorMessage(): Promise<string>;\n  isLoggedIn(): Promise<boolean>;\n}\n\nexport class LoginPage implements ILoginPage {\n  // private Locators — callers cannot access selectors directly\n  // Using Playwright's 'Locator' type for full IDE support\n  private readonly emailInput: Locator;\n  private readonly passwordInput: Locator;\n  private readonly submitButton: Locator;\n  private readonly errorMessage: Locator;\n  private readonly userMenu: Locator;\n\n  // Page is injected — dependency injection pattern\n  constructor(private readonly page: Page) {\n    // Define all locators in the constructor (fail fast if selectors change)\n    this.emailInput     = page.locator('[data-testid=\"email-input\"]');\n    this.passwordInput  = page.locator('[data-testid=\"password-input\"]');\n    this.submitButton   = page.locator('[data-testid=\"login-submit\"]');\n    this.errorMessage   = page.locator('[data-testid=\"error-message\"]');\n    this.userMenu       = page.locator('[data-testid=\"user-menu\"]');\n  }\n\n  // Typed method — returns Promise<void> (performs action, returns nothing)\n  async navigate(): Promise<void> {\n    await this.page.goto(\"/login\");\n    await this.page.waitForLoadState(\"domcontentloaded\");\n  }\n\n  // Typed params — TypeScript catches if caller passes wrong types\n  async login(email: string, password: string): Promise<void> {\n    await this.emailInput.fill(email);\n    await this.passwordInput.fill(password);\n    await this.submitButton.click();\n  }\n\n  // Returns a string — caller knows they'll always get a string back\n  async getErrorMessage(): Promise<string> {\n    await this.errorMessage.waitFor({ state: \"visible\" });\n    return await this.errorMessage.innerText();\n  }\n\n  // Returns boolean — clean API for assertions\n  async isLoggedIn(): Promise<boolean> {\n    return await this.userMenu.isVisible();\n  }\n}\n\n// Usage in test:\n// test(\"login with valid credentials\", async ({ page }) => {\n//   const loginPage = new LoginPage(page);   // page is typed as Page\n//   await loginPage.navigate();\n//   await loginPage.login(\"user@test.com\", \"pass123\");\n//   expect(await loginPage.isLoggedIn()).toBe(true);\n// });",
              "tr": "// pages/LoginPage.ts\n// Full TypeScript Page Object Model using Playwright types\n\nimport { type Page, type Locator } from \"@playwright/test\";\n\n// Interface defines the public contract — what callers can do with this page\nexport interface ILoginPage {\n  navigate(): Promise<void>;\n  login(email: string, password: string): Promise<void>;\n  getErrorMessage(): Promise<string>;\n  isLoggedIn(): Promise<boolean>;\n}\n\nexport class LoginPage implements ILoginPage {\n  // private Locators — callers cannot access selectors directly\n  // Using Playwright's 'Locator' type for full IDE support\n  private readonly emailInput: Locator;\n  private readonly passwordInput: Locator;\n  private readonly submitButton: Locator;\n  private readonly errorMessage: Locator;\n  private readonly userMenu: Locator;\n\n  // Page is injected — dependency injection pattern\n  constructor(private readonly page: Page) {\n    // Define all locators in the constructor (fail fast if selectors change)\n    this.emailInput     = page.locator('[data-testid=\"email-input\"]');\n    this.passwordInput  = page.locator('[data-testid=\"password-input\"]');\n    this.submitButton   = page.locator('[data-testid=\"login-submit\"]');\n    this.errorMessage   = page.locator('[data-testid=\"error-message\"]');\n    this.userMenu       = page.locator('[data-testid=\"user-menu\"]');\n  }\n\n  // Typed method — returns Promise<void> (performs action, returns nothing)\n  async navigate(): Promise<void> {\n    await this.page.goto(\"/login\");\n    await this.page.waitForLoadState(\"domcontentloaded\");\n  }\n\n  // Typed params — TypeScript catches if caller passes wrong types\n  async login(email: string, password: string): Promise<void> {\n    await this.emailInput.fill(email);\n    await this.passwordInput.fill(password);\n    await this.submitButton.click();\n  }\n\n  // Returns a string — caller knows they'll always get a string back\n  async getErrorMessage(): Promise<string> {\n    await this.errorMessage.waitFor({ state: \"visible\" });\n    return await this.errorMessage.innerText();\n  }\n\n  // Returns boolean — clean API for assertions\n  async isLoggedIn(): Promise<boolean> {\n    return await this.userMenu.isVisible();\n  }\n}\n\n// Usage in test:\n// test(\"login with valid credentials\", async ({ page }) => {\n//   const loginPage = new LoginPage(page);   // page is typed as Page\n//   await loginPage.navigate();\n//   await loginPage.login(\"user@test.com\", \"pass123\");\n//   expect(await loginPage.isLoggedIn()).toBe(true);\n// });"
            }
          },
          {
            "type": "heading",
            "content": {
              "en": "2. Enums for Environments, Browsers, and Test Status",
              "tr": "2. Ortam, Tarayıcı ve Test Durumu için Enum'lar"
            },
            "difficulty": "🟢 Beginner"
          },
          {
            "type": "code",
            "language": "typescript",
            "label": {
              "en": "String enums for type-safe configuration",
              "tr": "String enums for type-safe configuration"
            },
            "content": {
              "en": "// enums/index.ts\n// String enums for every configuration choice — prevents typos and invalid values\n\nexport enum TestStatus {\n  PASS    = \"PASS\",\n  FAIL    = \"FAIL\",\n  SKIP    = \"SKIP\",\n  BLOCKED = \"BLOCKED\",\n  FLAKY   = \"FLAKY\",\n}\n\nexport enum Environment {\n  DEV     = \"development\",\n  STAGING = \"staging\",\n  PROD    = \"production\",\n}\n\nexport enum Browser {\n  CHROMIUM = \"chromium\",\n  FIREFOX  = \"firefox\",\n  WEBKIT   = \"webkit\",\n}\n\nexport enum LogLevel {\n  DEBUG   = \"debug\",\n  INFO    = \"info\",\n  WARN    = \"warn\",\n  ERROR   = \"error\",\n}\n\n// Config interface uses the enums — values are constrained\ninterface RunConfig {\n  environment: Environment;\n  browser: Browser;\n  logLevel: LogLevel;\n  workers: number;\n}\n\nconst config: RunConfig = {\n  environment: Environment.STAGING,   // must be a valid Environment\n  browser: Browser.CHROMIUM,          // must be a valid Browser\n  logLevel: LogLevel.INFO,\n  workers: 4,\n};\n\n// config.browser = \"chrome\";          // Error: 'chrome' is not assignable to type 'Browser'\n// config.environment = \"staging\";     // Error: use Environment.STAGING\n\nconsole.log(`Running ${config.browser} on ${config.environment}`);\n// Running chromium on staging",
              "tr": "// enums/index.ts\n// String enums for every configuration choice — prevents typos and invalid values\n\nexport enum TestStatus {\n  PASS    = \"PASS\",\n  FAIL    = \"FAIL\",\n  SKIP    = \"SKIP\",\n  BLOCKED = \"BLOCKED\",\n  FLAKY   = \"FLAKY\",\n}\n\nexport enum Environment {\n  DEV     = \"development\",\n  STAGING = \"staging\",\n  PROD    = \"production\",\n}\n\nexport enum Browser {\n  CHROMIUM = \"chromium\",\n  FIREFOX  = \"firefox\",\n  WEBKIT   = \"webkit\",\n}\n\nexport enum LogLevel {\n  DEBUG   = \"debug\",\n  INFO    = \"info\",\n  WARN    = \"warn\",\n  ERROR   = \"error\",\n}\n\n// Config interface uses the enums — values are constrained\ninterface RunConfig {\n  environment: Environment;\n  browser: Browser;\n  logLevel: LogLevel;\n  workers: number;\n}\n\nconst config: RunConfig = {\n  environment: Environment.STAGING,   // must be a valid Environment\n  browser: Browser.CHROMIUM,          // must be a valid Browser\n  logLevel: LogLevel.INFO,\n  workers: 4,\n};\n\n// config.browser = \"chrome\";          // Error: 'chrome' is not assignable to type 'Browser'\n// config.environment = \"staging\";     // Error: use Environment.STAGING\n\nconsole.log(`Running ${config.browser} on ${config.environment}`);\n// Running chromium on staging"
            },
            "expected": "Running chromium on staging"
          },
          {
            "type": "heading",
            "content": {
              "en": "3. Interface for API Response Validation",
              "tr": "3. API Yanıtı Doğrulaması için Interface"
            },
            "difficulty": "🟡 Intermediate"
          },
          {
            "type": "code",
            "language": "typescript",
            "label": {
              "en": "Type-safe API response interface with validation function",
              "tr": "Type-safe API response interface with validation function"
            },
            "content": {
              "en": "// types/api.ts\n// Typed interfaces for API testing with runtime validation\n\n// The shape we expect from the API\ninterface UserResponse {\n  id: number;\n  name: string;\n  email: string;\n  role: \"admin\" | \"viewer\" | \"editor\";\n  createdAt: string;\n}\n\n// Generic API wrapper — wraps any response data\ninterface ApiEnvelope<T> {\n  data: T;\n  meta: {\n    total: number;\n    page: number;\n    perPage: number;\n  };\n  errors: string[] | null;\n}\n\n// Runtime type guard — validates that an unknown response matches UserResponse\n// Returns type predicate: 'value is UserResponse'\nfunction isUserResponse(value: unknown): value is UserResponse {\n  if (!value || typeof value !== \"object\") return false;\n  const obj = value as Record<string, unknown>;\n  return (\n    typeof obj.id         === \"number\"   &&\n    typeof obj.name       === \"string\"   &&\n    typeof obj.email      === \"string\"   &&\n    typeof obj.role       === \"string\"   &&\n    [\"admin\", \"viewer\", \"editor\"].includes(obj.role as string) &&\n    typeof obj.createdAt  === \"string\"\n  );\n}\n\n// Usage in a test\nasync function fetchAndValidateUser(userId: number): Promise<UserResponse> {\n  // const response = await fetch(`/api/users/${userId}`);\n  // const json: unknown = await response.json();\n\n  const json: unknown = {            // simulate API response\n    id: userId,\n    name: \"Alice\",\n    email: \"alice@test.com\",\n    role: \"admin\",\n    createdAt: \"2024-01-01\",\n  };\n\n  if (!isUserResponse(json)) {\n    throw new Error(`API response does not match UserResponse shape`);\n  }\n\n  // After the guard, TypeScript knows 'json' is UserResponse\n  return json;\n}\n\nfetchAndValidateUser(1).then((u) => {\n  console.log(`Validated user: ${u.name} (${u.role})`);\n});",
              "tr": "// types/api.ts\n// Typed interfaces for API testing with runtime validation\n\n// The shape we expect from the API\ninterface UserResponse {\n  id: number;\n  name: string;\n  email: string;\n  role: \"admin\" | \"viewer\" | \"editor\";\n  createdAt: string;\n}\n\n// Generic API wrapper — wraps any response data\ninterface ApiEnvelope<T> {\n  data: T;\n  meta: {\n    total: number;\n    page: number;\n    perPage: number;\n  };\n  errors: string[] | null;\n}\n\n// Runtime type guard — validates that an unknown response matches UserResponse\n// Returns type predicate: 'value is UserResponse'\nfunction isUserResponse(value: unknown): value is UserResponse {\n  if (!value || typeof value !== \"object\") return false;\n  const obj = value as Record<string, unknown>;\n  return (\n    typeof obj.id         === \"number\"   &&\n    typeof obj.name       === \"string\"   &&\n    typeof obj.email      === \"string\"   &&\n    typeof obj.role       === \"string\"   &&\n    [\"admin\", \"viewer\", \"editor\"].includes(obj.role as string) &&\n    typeof obj.createdAt  === \"string\"\n  );\n}\n\n// Usage in a test\nasync function fetchAndValidateUser(userId: number): Promise<UserResponse> {\n  // const response = await fetch(`/api/users/${userId}`);\n  // const json: unknown = await response.json();\n\n  const json: unknown = {            // simulate API response\n    id: userId,\n    name: \"Alice\",\n    email: \"alice@test.com\",\n    role: \"admin\",\n    createdAt: \"2024-01-01\",\n  };\n\n  if (!isUserResponse(json)) {\n    throw new Error(`API response does not match UserResponse shape`);\n  }\n\n  // After the guard, TypeScript knows 'json' is UserResponse\n  return json;\n}\n\nfetchAndValidateUser(1).then((u) => {\n  console.log(`Validated user: ${u.name} (${u.role})`);\n});"
            },
            "expected": "Validated user: Alice (admin)"
          },
          {
            "type": "heading",
            "content": {
              "en": "4. Generic Test Data Factory",
              "tr": "4. Generic Test Data Factory"
            },
            "difficulty": "🟡 Intermediate"
          },
          {
            "type": "code",
            "language": "typescript",
            "label": {
              "en": "Generic factory for creating test fixtures with overrides",
              "tr": "Generic factory for creating test fixtures with overrides"
            },
            "content": {
              "en": "// utils/factory.ts\n// A generic factory that creates test data with sensible defaults\n// Supports partial overrides so tests only specify what's relevant\n\ninterface Product {\n  id: number;\n  name: string;\n  price: number;\n  inStock: boolean;\n  category: string;\n  sku: string;\n}\n\ninterface Order {\n  id: number;\n  userId: number;\n  products: Product[];\n  total: number;\n  status: \"pending\" | \"confirmed\" | \"shipped\" | \"delivered\";\n  createdAt: string;\n}\n\n// Generic factory function — T is any object type\nfunction createTestData<T>(defaults: T, overrides?: Partial<T>): T {\n  return { ...defaults, ...overrides };\n}\n\n// Default test product\nconst defaultProduct: Product = {\n  id: 1,\n  name: \"Test Widget\",\n  price: 29.99,\n  inStock: true,\n  category: \"electronics\",\n  sku: \"WIDGET-001\",\n};\n\n// Create variants for specific test scenarios\nconst outOfStockProduct = createTestData(defaultProduct, {\n  inStock: false,\n  name: \"Sold Out Widget\",\n});\n\nconst premiumProduct = createTestData(defaultProduct, {\n  id: 2,\n  price: 299.99,\n  name: \"Premium Widget\",\n  sku: \"WIDGET-PREMIUM\",\n});\n\n// ── Builder pattern variant — chain overrides ─────────────────────\nfunction productFactory(overrides?: Partial<Product>): Product {\n  return createTestData(defaultProduct, overrides);\n}\n\nconst cheapProduct   = productFactory({ price: 1.99, name: \"Budget Widget\" });\nconst electronicItem = productFactory({ category: \"computers\", id: 99 });\n\nconsole.log(`Out of stock: ${outOfStockProduct.name} — ${outOfStockProduct.inStock}`);\nconsole.log(`Premium price: $${premiumProduct.price}`);\nconsole.log(`Budget price: $${cheapProduct.price}`);",
              "tr": "// utils/factory.ts\n// A generic factory that creates test data with sensible defaults\n// Supports partial overrides so tests only specify what's relevant\n\ninterface Product {\n  id: number;\n  name: string;\n  price: number;\n  inStock: boolean;\n  category: string;\n  sku: string;\n}\n\ninterface Order {\n  id: number;\n  userId: number;\n  products: Product[];\n  total: number;\n  status: \"pending\" | \"confirmed\" | \"shipped\" | \"delivered\";\n  createdAt: string;\n}\n\n// Generic factory function — T is any object type\nfunction createTestData<T>(defaults: T, overrides?: Partial<T>): T {\n  return { ...defaults, ...overrides };\n}\n\n// Default test product\nconst defaultProduct: Product = {\n  id: 1,\n  name: \"Test Widget\",\n  price: 29.99,\n  inStock: true,\n  category: \"electronics\",\n  sku: \"WIDGET-001\",\n};\n\n// Create variants for specific test scenarios\nconst outOfStockProduct = createTestData(defaultProduct, {\n  inStock: false,\n  name: \"Sold Out Widget\",\n});\n\nconst premiumProduct = createTestData(defaultProduct, {\n  id: 2,\n  price: 299.99,\n  name: \"Premium Widget\",\n  sku: \"WIDGET-PREMIUM\",\n});\n\n// ── Builder pattern variant — chain overrides ─────────────────────\nfunction productFactory(overrides?: Partial<Product>): Product {\n  return createTestData(defaultProduct, overrides);\n}\n\nconst cheapProduct   = productFactory({ price: 1.99, name: \"Budget Widget\" });\nconst electronicItem = productFactory({ category: \"computers\", id: 99 });\n\nconsole.log(`Out of stock: ${outOfStockProduct.name} — ${outOfStockProduct.inStock}`);\nconsole.log(`Premium price: $${premiumProduct.price}`);\nconsole.log(`Budget price: $${cheapProduct.price}`);"
            },
            "expected": "Out of stock: Sold Out Widget — false\nPremium price: $299.99\nBudget price: $1.99"
          },
          {
            "type": "heading",
            "content": {
              "en": "5. Type-Safe Config with Partial Overrides",
              "tr": "5. Partial Override ile Type-Safe Config"
            },
            "difficulty": "🟡 Intermediate"
          },
          {
            "type": "code",
            "language": "typescript",
            "label": {
              "en": "Environment-specific Playwright config using Partial<Config>",
              "tr": "Environment-specific Playwright config using Partial<Config>"
            },
            "content": {
              "en": "// config/index.ts\n// Type-safe configuration management for multi-environment test suites\n\ninterface TestSuiteConfig {\n  baseUrl: string;\n  apiUrl: string;\n  timeout: number;\n  retries: number;\n  headless: boolean;\n  workers: number;\n  screenshotOnFailure: boolean;\n  videoOnFailure: boolean;\n  reporter: \"html\" | \"json\" | \"junit\" | \"dot\";\n  credentials: {\n    adminEmail: string;\n    adminPassword: string;\n  };\n}\n\n// Base (default) config — used as fallback for everything\nconst baseConfig: TestSuiteConfig = {\n  baseUrl: \"http://localhost:3000\",\n  apiUrl: \"http://localhost:3001/api\",\n  timeout: 30_000,\n  retries: 0,\n  headless: true,\n  workers: 4,\n  screenshotOnFailure: true,\n  videoOnFailure: false,\n  reporter: \"html\",\n  credentials: {\n    adminEmail: \"admin@localhost.com\",\n    adminPassword: \"DevPass123\",\n  },\n};\n\n// Environment-specific partial overrides — only specify what changes\nconst envConfigs: Record<string, Partial<TestSuiteConfig>> = {\n  staging: {\n    baseUrl: \"https://staging.myapp.com\",\n    apiUrl: \"https://api.staging.myapp.com\",\n    retries: 1,\n    credentials: { adminEmail: \"admin@staging.myapp.com\", adminPassword: \"StagingPass456\" },\n  },\n  prod: {\n    baseUrl: \"https://myapp.com\",\n    apiUrl: \"https://api.myapp.com\",\n    retries: 2,\n    headless: true,\n    workers: 8,\n    videoOnFailure: true,\n    credentials: { adminEmail: \"qa@myapp.com\", adminPassword: \"ProdPass789\" },\n  },\n};\n\n// Merge: base config + environment override\nfunction getConfig(env: string): TestSuiteConfig {\n  const override = envConfigs[env] ?? {};\n  return { ...baseConfig, ...override };\n}\n\nconst stagingConfig = getConfig(\"staging\");\nconsole.log(`Staging URL: ${stagingConfig.baseUrl}`);    // https://staging.myapp.com\nconsole.log(`Staging retries: ${stagingConfig.retries}`);  // 1\nconsole.log(`Workers: ${stagingConfig.workers}`);          // 4 (from base — not overridden)",
              "tr": "// config/index.ts\n// Type-safe configuration management for multi-environment test suites\n\ninterface TestSuiteConfig {\n  baseUrl: string;\n  apiUrl: string;\n  timeout: number;\n  retries: number;\n  headless: boolean;\n  workers: number;\n  screenshotOnFailure: boolean;\n  videoOnFailure: boolean;\n  reporter: \"html\" | \"json\" | \"junit\" | \"dot\";\n  credentials: {\n    adminEmail: string;\n    adminPassword: string;\n  };\n}\n\n// Base (default) config — used as fallback for everything\nconst baseConfig: TestSuiteConfig = {\n  baseUrl: \"http://localhost:3000\",\n  apiUrl: \"http://localhost:3001/api\",\n  timeout: 30_000,\n  retries: 0,\n  headless: true,\n  workers: 4,\n  screenshotOnFailure: true,\n  videoOnFailure: false,\n  reporter: \"html\",\n  credentials: {\n    adminEmail: \"admin@localhost.com\",\n    adminPassword: \"DevPass123\",\n  },\n};\n\n// Environment-specific partial overrides — only specify what changes\nconst envConfigs: Record<string, Partial<TestSuiteConfig>> = {\n  staging: {\n    baseUrl: \"https://staging.myapp.com\",\n    apiUrl: \"https://api.staging.myapp.com\",\n    retries: 1,\n    credentials: { adminEmail: \"admin@staging.myapp.com\", adminPassword: \"StagingPass456\" },\n  },\n  prod: {\n    baseUrl: \"https://myapp.com\",\n    apiUrl: \"https://api.myapp.com\",\n    retries: 2,\n    headless: true,\n    workers: 8,\n    videoOnFailure: true,\n    credentials: { adminEmail: \"qa@myapp.com\", adminPassword: \"ProdPass789\" },\n  },\n};\n\n// Merge: base config + environment override\nfunction getConfig(env: string): TestSuiteConfig {\n  const override = envConfigs[env] ?? {};\n  return { ...baseConfig, ...override };\n}\n\nconst stagingConfig = getConfig(\"staging\");\nconsole.log(`Staging URL: ${stagingConfig.baseUrl}`);    // https://staging.myapp.com\nconsole.log(`Staging retries: ${stagingConfig.retries}`);  // 1\nconsole.log(`Workers: ${stagingConfig.workers}`);          // 4 (from base — not overridden)"
            },
            "expected": "Staging URL: https://staging.myapp.com\nStaging retries: 1\nWorkers: 4"
          },
          {
            "type": "heading",
            "content": {
              "en": "6. Typed Playwright Fixtures",
              "tr": "6. Tipli Playwright Fixture'ları"
            },
            "difficulty": "🔴 Advanced"
          },
          {
            "type": "code",
            "language": "typescript",
            "label": {
              "en": "Custom Playwright fixtures with full TypeScript types",
              "tr": "Custom Playwright fixtures with full TypeScript types"
            },
            "content": {
              "en": "// fixtures/index.ts\n// Typed Playwright test fixtures — extend the base 'test' with your own fixtures\n\nimport { test as base, type Page } from \"@playwright/test\";\n\n// Import your page objects\n// import { LoginPage }    from \"../pages/LoginPage\";\n// import { DashboardPage } from \"../pages/DashboardPage\";\n\n// 1. Define the SHAPE of your custom fixtures\ninterface MyFixtures {\n  loginPage:     { navigate: () => Promise<void>; login: (e: string, p: string) => Promise<void> };\n  dashboardPage: { isVisible: () => Promise<boolean> };\n  testUser:      { email: string; password: string; role: string };\n  adminUser:     { email: string; password: string; role: string };\n  apiBaseUrl:    string;\n}\n\n// 2. Extend the base test with your fixture types\nexport const test = base.extend<MyFixtures>({\n\n  // Fixture: loginPage — creates a new LoginPage instance per test\n  loginPage: async ({ page }, use) => {\n    // const lp = new LoginPage(page);   // real: use your POM class\n    const lp = {                         // simplified for demo\n      navigate: async () => { console.log(\"navigating to /login\"); },\n      login: async (e: string, p: string) => { console.log(`login: ${e}`); },\n    };\n    await use(lp);   // pass to the test\n  },\n\n  // Fixture: testUser — provides default test credentials\n  testUser: async ({}, use) => {\n    await use({\n      email: \"user@test.com\",\n      password: \"TestPass123\",\n      role: \"viewer\",\n    });\n  },\n\n  // Fixture: adminUser — provides admin credentials\n  adminUser: async ({}, use) => {\n    await use({\n      email: \"admin@test.com\",\n      password: \"AdminPass456\",\n      role: \"admin\",\n    });\n  },\n\n  // Fixture: apiBaseUrl — environment-aware API URL\n  apiBaseUrl: async ({}, use) => {\n    const env = process.env.TEST_ENV ?? \"staging\";\n    const urls: Record<string, string> = {\n      staging: \"https://api.staging.myapp.com\",\n      prod:    \"https://api.myapp.com\",\n    };\n    await use(urls[env] ?? urls.staging);\n  },\n\n  // dashboardPage omitted for brevity\n  dashboardPage: async ({ page }, use) => {\n    await use({ isVisible: async () => true });\n  },\n});\n\n// 3. Usage in tests — full autocomplete for loginPage, testUser, etc.\n// test(\"login as regular user\", async ({ loginPage, testUser }) => {\n//   await loginPage.navigate();\n//   await loginPage.login(testUser.email, testUser.password);\n//   expect(await loginPage.isLoggedIn()).toBe(true);\n// });\n\nexport { expect } from \"@playwright/test\";",
              "tr": "// fixtures/index.ts\n// Typed Playwright test fixtures — extend the base 'test' with your own fixtures\n\nimport { test as base, type Page } from \"@playwright/test\";\n\n// Import your page objects\n// import { LoginPage }    from \"../pages/LoginPage\";\n// import { DashboardPage } from \"../pages/DashboardPage\";\n\n// 1. Define the SHAPE of your custom fixtures\ninterface MyFixtures {\n  loginPage:     { navigate: () => Promise<void>; login: (e: string, p: string) => Promise<void> };\n  dashboardPage: { isVisible: () => Promise<boolean> };\n  testUser:      { email: string; password: string; role: string };\n  adminUser:     { email: string; password: string; role: string };\n  apiBaseUrl:    string;\n}\n\n// 2. Extend the base test with your fixture types\nexport const test = base.extend<MyFixtures>({\n\n  // Fixture: loginPage — creates a new LoginPage instance per test\n  loginPage: async ({ page }, use) => {\n    // const lp = new LoginPage(page);   // real: use your POM class\n    const lp = {                         // simplified for demo\n      navigate: async () => { console.log(\"navigating to /login\"); },\n      login: async (e: string, p: string) => { console.log(`login: ${e}`); },\n    };\n    await use(lp);   // pass to the test\n  },\n\n  // Fixture: testUser — provides default test credentials\n  testUser: async ({}, use) => {\n    await use({\n      email: \"user@test.com\",\n      password: \"TestPass123\",\n      role: \"viewer\",\n    });\n  },\n\n  // Fixture: adminUser — provides admin credentials\n  adminUser: async ({}, use) => {\n    await use({\n      email: \"admin@test.com\",\n      password: \"AdminPass456\",\n      role: \"admin\",\n    });\n  },\n\n  // Fixture: apiBaseUrl — environment-aware API URL\n  apiBaseUrl: async ({}, use) => {\n    const env = process.env.TEST_ENV ?? \"staging\";\n    const urls: Record<string, string> = {\n      staging: \"https://api.staging.myapp.com\",\n      prod:    \"https://api.myapp.com\",\n    };\n    await use(urls[env] ?? urls.staging);\n  },\n\n  // dashboardPage omitted for brevity\n  dashboardPage: async ({ page }, use) => {\n    await use({ isVisible: async () => true });\n  },\n});\n\n// 3. Usage in tests — full autocomplete for loginPage, testUser, etc.\n// test(\"login as regular user\", async ({ loginPage, testUser }) => {\n//   await loginPage.navigate();\n//   await loginPage.login(testUser.email, testUser.password);\n//   expect(await loginPage.isLoggedIn()).toBe(true);\n// });\n\nexport { expect } from \"@playwright/test\";"
            }
          },
          {
            "type": "heading",
            "content": {
              "en": "7. Utility Types for Partial Override Testing",
              "tr": "7. Partial Override Testi için Utility Type'lar"
            },
            "difficulty": "🔴 Advanced"
          },
          {
            "type": "code",
            "language": "typescript",
            "label": {
              "en": "Making fixture fields optional for flexible test setups",
              "tr": "Making fixture fields optional for flexible test setups"
            },
            "content": {
              "en": "// Using TypeScript utility types to make test fixtures flexible\n\n// Full fixture interface — all fields required\ninterface TestFixtures {\n  email: string;\n  password: string;\n  role: string;\n  permissions: string[];\n  teamId: number;\n  locale: string;\n  timezone: string;\n}\n\n// Partial<T> — ALL fields become optional\n// Use for test helpers that accept partial overrides\ntype PartialFixtures = Partial<TestFixtures>;\n\n// Required<T> — ALL optional become required\ntype StrictFixtures = Required<TestFixtures>;\n\n// Readonly<T> — no one can mutate fixture data (prevents accidental shared state)\ntype ImmutableFixtures = Readonly<TestFixtures>;\n\n// Pick — only the authentication-relevant fields\ntype AuthFixture = Pick<TestFixtures, \"email\" | \"password\" | \"role\">;\n\n// Omit — everything except sensitive credentials\ntype SafeFixture = Omit<TestFixtures, \"password\">;\n\n// ── createFixture: merge defaults + partial overrides ─────────────\nconst defaultFixtures: TestFixtures = {\n  email:       \"default@test.com\",\n  password:    \"DefaultPass123\",\n  role:        \"viewer\",\n  permissions: [\"read\"],\n  teamId:      1,\n  locale:      \"en-US\",\n  timezone:    \"UTC\",\n};\n\nfunction createFixture(overrides: Partial<TestFixtures>): Readonly<TestFixtures> {\n  const merged = { ...defaultFixtures, ...overrides };\n  return Object.freeze(merged);   // freeze = runtime + compile-time immutability\n}\n\nconst adminFixture   = createFixture({ role: \"admin\", permissions: [\"read\", \"write\", \"delete\"] });\nconst euFixture      = createFixture({ locale: \"de-DE\", timezone: \"Europe/Berlin\" });\nconst minimalFixture: AuthFixture = { email: \"qa@test.com\", password: \"pass\", role: \"editor\" };\n\nconsole.log(`Admin: ${adminFixture.role}, perms: ${adminFixture.permissions.join(\", \")}`);\nconsole.log(`EU locale: ${euFixture.locale}, tz: ${euFixture.timezone}`);\nconsole.log(`Auth only: ${minimalFixture.email}`);",
              "tr": "// Using TypeScript utility types to make test fixtures flexible\n\n// Full fixture interface — all fields required\ninterface TestFixtures {\n  email: string;\n  password: string;\n  role: string;\n  permissions: string[];\n  teamId: number;\n  locale: string;\n  timezone: string;\n}\n\n// Partial<T> — ALL fields become optional\n// Use for test helpers that accept partial overrides\ntype PartialFixtures = Partial<TestFixtures>;\n\n// Required<T> — ALL optional become required\ntype StrictFixtures = Required<TestFixtures>;\n\n// Readonly<T> — no one can mutate fixture data (prevents accidental shared state)\ntype ImmutableFixtures = Readonly<TestFixtures>;\n\n// Pick — only the authentication-relevant fields\ntype AuthFixture = Pick<TestFixtures, \"email\" | \"password\" | \"role\">;\n\n// Omit — everything except sensitive credentials\ntype SafeFixture = Omit<TestFixtures, \"password\">;\n\n// ── createFixture: merge defaults + partial overrides ─────────────\nconst defaultFixtures: TestFixtures = {\n  email:       \"default@test.com\",\n  password:    \"DefaultPass123\",\n  role:        \"viewer\",\n  permissions: [\"read\"],\n  teamId:      1,\n  locale:      \"en-US\",\n  timezone:    \"UTC\",\n};\n\nfunction createFixture(overrides: Partial<TestFixtures>): Readonly<TestFixtures> {\n  const merged = { ...defaultFixtures, ...overrides };\n  return Object.freeze(merged);   // freeze = runtime + compile-time immutability\n}\n\nconst adminFixture   = createFixture({ role: \"admin\", permissions: [\"read\", \"write\", \"delete\"] });\nconst euFixture      = createFixture({ locale: \"de-DE\", timezone: \"Europe/Berlin\" });\nconst minimalFixture: AuthFixture = { email: \"qa@test.com\", password: \"pass\", role: \"editor\" };\n\nconsole.log(`Admin: ${adminFixture.role}, perms: ${adminFixture.permissions.join(\", \")}`);\nconsole.log(`EU locale: ${euFixture.locale}, tz: ${euFixture.timezone}`);\nconsole.log(`Auth only: ${minimalFixture.email}`);"
            },
            "expected": "Admin: admin, perms: read, write, delete\nEU locale: de-DE, tz: Europe/Berlin\nAuth only: qa@test.com"
          },
          {
            "type": "heading",
            "content": {
              "en": "🏗️ Playwright POM Architecture — Class Hierarchy",
              "tr": "🏗️ Playwright POM Mimarisi — Sınıf Hiyerarşisi"
            },
            "difficulty": "🟡 Intermediate"
          },
          {
            "type": "visual",
            "variant": "flow",
            "title": {
              "en": "TypeScript POM Class Hierarchy — Layer by Layer",
              "tr": "TypeScript POM Sınıf Hiyerarşisi — Katman Katman"
            },
            "note": {
              "en": "Each layer inherits from the one above. Tests only call public methods — selectors are hidden inside page classes.",
              "tr": "Her katman üsttekinden miras alır. Testler yalnızca public metodları çağırır — selector'lar sayfa sınıflarının içinde gizlidir."
            },
            "steps": [
              {
                "num": "1",
                "label": "IPage Interface",
                "desc": {
                  "en": "navigate(), login(), getError() — the public contract",
                  "tr": "navigate(), login(), getError() — public sözleşme"
                },
                "highlight": true
              },
              {
                "num": "2",
                "label": "PageBase (abstract)",
                "desc": {
                  "en": "Shared helpers: waitForLoad(), expectUrl(), getLocator()",
                  "tr": "Paylaşılan yardımcılar: waitForLoad(), expectUrl(), getLocator()"
                }
              },
              {
                "num": "3",
                "label": "LoginPage extends PageBase",
                "desc": {
                  "en": "Implements IPage — owns all selectors + actions",
                  "tr": "IPage'i uygular — tüm selector ve aksiyonlara sahip"
                }
              },
              {
                "num": "4",
                "label": "test fixture (test.extend)",
                "desc": "loginPage: async({page}, use) => { ... }"
              },
              {
                "num": "5",
                "label": {
                  "en": "Test file",
                  "tr": "Test dosyası"
                },
                "desc": "test('login', async({ loginPage }) => { await loginPage.login(...) })",
                "highlight": true
              }
            ]
          },
          {
            "type": "comparison",
            "left": {
              "label": "❌ Untyped — Runtime Surprises",
              "code": "// JavaScript / untyped Playwright\ntest('login', async ({ page }) => {\n  await page.fill('#emal', 'user@test.com');  // typo: #emal\n  await page.click('#submit-btn');\n\n  // crashes at runtime — no IDE warning\n  const result = await page.locator('.dashbord').textContent();\n  //                                  ^ typo — no error until test runs\n  expect(result).toBe('Welcome!');\n});",
              "note": "Selector typos and wrong method calls discovered at runtime — expensive CI failures"
            },
            "right": {
              "label": "✅ Typed POM — Caught at Compile Time",
              "code": "// TypeScript Playwright POM\nexport class LoginPage {\n  private readonly emailInput: Locator;    // typed field\n  constructor(private readonly page: Page) {\n    this.emailInput = page.locator('[data-testid=\"email\"]');\n  }\n  async login(email: string, password: string): Promise<void> {\n    await this.emailInput.fill(email);   // IDE shows fill() options\n    // loginPage.fill(email)  ← compiler error: method doesn't exist\n  }\n}\n\ntest('login', async ({ loginPage }) => {\n  await loginPage.login('user@test.com', 'pass');\n  // loginPage.navigate(42) ← Error: number not assignable to void\n});",
              "note": "Selector changes cascade safely — compiler shows every broken call site"
            }
          },
          {
            "type": "visual",
            "variant": "boxes",
            "title": {
              "en": "Typed Fixture Pipeline — From Config to Test",
              "tr": "Tipli Fixture Pipeline'ı — Config'den Teste"
            },
            "items": [
              {
                "icon": {
                  "en": "⚙️",
                  "tr": "⚙️"
                },
                "label": {
                  "en": "playwright.config.ts",
                  "tr": "playwright.config.ts"
                },
                "desc": {
                  "en": "baseURL, timeout, retries",
                  "tr": "baseURL, timeout, retries"
                }
              },
              {
                "arrow": {
                  "en": true,
                  "tr": true
                }
              },
              {
                "icon": {
                  "en": "🔧",
                  "tr": "🔧"
                },
                "label": {
                  "en": "test.extend<MyFixtures>",
                  "tr": "test.extend<MyFixtures>"
                },
                "desc": {
                  "en": "loginPage, testUser, apiBaseUrl",
                  "tr": "loginPage, testUser, apiBaseUrl"
                }
              },
              {
                "arrow": {
                  "en": true,
                  "tr": true
                }
              },
              {
                "icon": {
                  "en": "📄",
                  "tr": "📄"
                },
                "label": {
                  "en": "LoginPage class",
                  "tr": "LoginPage sınıfı"
                },
                "desc": {
                  "en": "private Locators, typed methods",
                  "tr": "private Locator'lar, tipli metodlar"
                }
              },
              {
                "arrow": {
                  "en": true,
                  "tr": true
                }
              },
              {
                "icon": {
                  "en": "🧪",
                  "tr": "🧪"
                },
                "label": {
                  "en": "Test function",
                  "tr": "Test fonksiyonu"
                },
                "desc": {
                  "en": "async ({ loginPage, testUser }) => {}",
                  "tr": "async ({ loginPage, testUser }) => {}"
                }
              },
              {
                "arrow": {
                  "en": true,
                  "tr": true
                }
              },
              {
                "icon": {
                  "en": "✅",
                  "tr": "✅"
                },
                "label": {
                  "en": "Type-safe assertions",
                  "tr": "Type-safe assertion'lar"
                },
                "desc": {
                  "en": "expect().toHaveURL(), toHaveText()",
                  "tr": "expect().toHaveURL(), toHaveText()"
                }
              }
            ],
            "note": {
              "en": "Every arrow is a typed boundary — passing wrong types triggers a compile error, not a runtime crash.",
              "tr": "Her ok tipli bir sınırdır — yanlış tip geçilmesi çalışma zamanı hatası değil, derleme hatası tetikler."
            }
          },
          {
            "type": "quiz",
            "question": {
              "en": "What is the core benefit of a fully-typed Page Object Model in Playwright automation?",
              "tr": "Tam tipli bir Page Object Model'in Playwright otomasyonunda sağladığı temel avantaj nedir?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "Makes tests run faster",
                  "tr": "Testleri daha hızlı çalıştırır"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "The IDE autocompletes method/property names and misuse is caught at compile time",
                  "tr": "IDE metod/property isimlerini otomatik tamamlar ve yanlış kullanım derleme zamanında yakalanır"
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "Automatically updates locators",
                  "tr": "Locator'ları otomatik olarak günceller"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "Shares browser sessions",
                  "tr": "Tarayıcı oturumlarını paylaşır"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "en": "When a Page Object class is fully typed, calling a wrong method name or passing the wrong argument type is caught by the compiler before the test even runs — the IDE also autocompletes every method/property, so you never have to guess a method name. Same logic as compiling against an interface in Java.",
              "tr": "Bir Page Object class'ı tam tipli olduğunda, yanlış bir metod adı çağırmak veya yanlış argüman tipini geçirmek testi çalıştırmadan önce derleyici tarafından yakalanır — IDE de her metod/property için otomatik tamamlama gösterir, metod adlarını tahmin etmeye gerek kalmaz. Bu, Java'da bir arayüze (interface) karşı derleme yapmanın IDE/derleyici güvenliğiyle aynı mantıktır."
            },
            "retryQuestion": {
              "question": {
                "en": "In an untyped (plain JS) Page Object, someone writes `loginPage.clickLogin()` but the real method is `clickLoginButton()`. When is this mistake caught?",
                "tr": "Tipsiz (plain JS) bir Page Object'te `loginPage.clickLogin()` yazılır ama gerçek metod adı `clickLoginButton()`dır. Bu hata ne zaman fark edilir?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "Immediately, the IDE flags it with a red squiggly",
                    "tr": "Hemen, IDE kırmızı çizgiyle gösterir"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "Only when the test runs, with a \"clickLogin is not a function\" runtime error",
                    "tr": "Test çalıştırıldığında, \"clickLogin is not a function\" runtime hatasıyla"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "Never — JavaScript automatically creates missing methods",
                    "tr": "Asla — JavaScript var olmayan metodları otomatik oluşturur"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "At compile time, because JavaScript is compiled too",
                    "tr": "Derleme sırasında, çünkü JavaScript de derlenir"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "en": "In plain JavaScript (no type checking), a wrong method name only blows up when that line actually RUNS — there is no compile-time concept at all. This is the exact contrast with TypeScript catching the same mistake instantly in the IDE on a fully-typed Page Object — the difference between \"run the test and see the error in CI\" versus \"see the error while typing.\"",
                "tr": "Plain JavaScript'te (tip kontrolü olmadan) yanlış bir metod adı sadece o satır gerçekten ÇALIŞTIĞINDA patlar — derleme zamanı diye bir kavram yoktur. Bu, TypeScript'in tam tipli bir Page Object'te aynı hatayı yazarken IDE'de anında yakalamasıyla tam karşıtlık oluşturur; bu fark, \"test çalıştırıp hatayı CI'da görmek\" ile \"yazarken hatayı görmek\" arasındaki temel farktır."
              }
            }
          }
        ]
      },
      {
        "title": {
          "en": "☕ Java → TypeScript: Great News — Very Similar!",
          "tr": "☕ Java → TypeScript: Harika Haber — Çok Benzer!"
        },
        "blocks": [
          {
            "type": "text",
            "content": {
              "en": "TypeScript is much easier for Java developers than Python! class, interface, access modifiers, generics, enums — all will feel familiar. There are only a few critical differences. This section explains these differences from a Java perspective.",
              "tr": "TypeScript Java geliştiricileri için Python'dan çok daha kolay! class, interface, access modifiers, generics, enums — hepsi tanıdık gelecek. Sadece birkaç kritik fark var. Bu bölüm bu farkları Java perspektifinden açıklar."
            }
          },
          {
            "type": "heading",
            "text": {
              "en": "1. Basic Types — Very Similar to Java",
              "tr": "1. Temel Tipler — Java'ya Çok Benzer"
            }
          },
          {
            "type": "java-compare",
            "topic": "Basic Types",
            "why": {
              "en": "Java'da int, long, float, double gibi ayrı sayısal tipler vardır. TypeScript'te tüm sayılar için tek tip kullanılır: number. string küçük harf (Java'nın String objesi değil), boolean aynı.",
              "tr": "Java'da int, long, float, double gibi ayrı sayısal tipler vardır. TypeScript'te tüm sayılar için tek tip kullanılır: number. string küçük harf, boolean aynı."
            },
            "java": "// Java: separate numeric types\nint count = 5;          // 32-bit integer\nlong bigNum = 999L;     // 64-bit integer\nfloat rate = 3.14f;     // 32-bit float\ndouble price = 99.99;   // 64-bit double\nString name = \"test\";   // immutable Object\nboolean active = true;",
            "typescript": "// TypeScript: simplified!\nlet count: number = 5;       // ALL numbers: one type\nlet bigNum: number = 999;    // no 'L' suffix\nlet rate: number = 3.14;     // no 'f' suffix\nlet price: number = 99.99;   // same type\nlet name: string = \"test\";   // lowercase! (not String)\nlet active: boolean = true;  // identical!\n\n// Type inference (Java's 'var' equivalent):\nlet count2 = 5;       // inferred: number\nlet name2 = \"Alice\";  // inferred: string",
            "note": {
              "en": "\"number\" = Java'nın int/long/float/double hepsi. \"string\" (küçük harf) ≠ Java String (büyük harf). TypeScript'te ayrıca \"any\" (Object gibi, kaçış kapısı — kaçın!) ve \"unknown\" (daha güvenli any) var.",
              "tr": "\"number\" = Java'nın int/long/float/double hepsi. \"string\" (küçük harf) ≠ Java String (büyük harf). TypeScript'te ayrıca \"any\" (Object gibi — kaçın!) var."
            },
            "why_en": "In Java there are separate numeric types: int, long, float, double. TypeScript uses a single type for all numbers: number. string is lowercase (not Java's String object), and boolean is identical.",
            "note_en": "\"number\" = all of Java's int/long/float/double in one type. \"string\" (lowercase) ≠ Java String (uppercase). TypeScript also has \"any\" (like Object — an escape hatch, avoid it!) and \"unknown\" (safer any)."
          },
          {
            "type": "heading",
            "text": {
              "en": "2. Interface — Structural Typing (The Most Important Difference!)",
              "tr": "2. Interface — Yapısal Tipleme (En Önemli Fark!)"
            }
          },
          {
            "type": "java-compare",
            "topic": "interface (structural typing!)",
            "why": {
              "en": "TypeScript interface Java'dakilere benzer ama kritik bir fark var: TypeScript 'structural typing' (yapısal tipleme) kullanır. Nesnenin 'implements' bildirmesine gerek yoktur — doğru shape'e sahip her nesne interface'i karşılar.",
              "tr": "TypeScript interface Java'dakilere benzer ama kritik fark: TypeScript 'structural typing' kullanır. Nesnenin 'implements' bildirmesine gerek yoktur — doğru shape her nesne interface'i karşılar."
            },
            "java": "// Java: nominal typing\n// Class MUST declare \"implements\"\ninterface Testable {\n    void run();\n    String getName();\n    default int getTimeout() { return 30000; }\n}\n\n// Explicitly declares: \"implements Testable\"\npublic class LoginTest implements Testable {\n    public void run() { /* test logic */ }\n    public String getName() { return \"Login Test\"; }\n}",
            "typescript": "// TypeScript: structural typing!\ninterface Testable {\n    run(): void;\n    getName(): string;\n    timeout?: number;  // optional (no 'default' — use ?: instead)\n}\n\n// No \"implements\" needed if shape matches:\nconst loginTest = {\n    run: () => { /* test logic */ },\n    getName: () => \"Login Test\"\n};\n// ✅ TypeScript accepts loginTest as Testable!\n\n// But you CAN use implements for clarity:\nclass SignupTest implements Testable {\n    run() { /* test logic */ }\n    getName() { return \"Signup Test\"; }\n}",
            "note": {
              "en": "Java = nominal typing (\"implements\" bildirimi zorunlu). TypeScript = structural typing (\"doğru şekle sahip olman yeterli\"). Bu TypeScript'in en güçlü ve en farklı konsepti.",
              "tr": "Java = nominal typing ('implements' zorunlu). TypeScript = structural typing ('doğru şekil yeterli'). Bu TypeScript'in en güçlü ve en farklı konsepti."
            },
            "why_en": "TypeScript interfaces look like Java's but have one critical difference: TypeScript uses structural typing. An object does NOT need to declare \"implements\" — any object with the right shape satisfies the interface.",
            "note_en": "Java = nominal typing (\"implements\" declaration required). TypeScript = structural typing (\"having the right shape is enough\"). This is TypeScript's most powerful and most distinctive concept."
          },
          {
            "type": "heading",
            "text": {
              "en": "3. Classes — Nearly Identical!",
              "tr": "3. Sınıflar — Neredeyse Aynı!"
            }
          },
          {
            "type": "java-compare",
            "topic": "class (nearly identical!)",
            "why": {
              "en": "TypeScript class sözdizimi Java'ya o kadar benzer ki sadece küçük farklılıklar var: 'constructor' anahtar kelimesi, 'readonly' (final yerine), ve constructor shorthand (tek satırda hem declare hem assign).",
              "tr": "TypeScript class sözdizimi Java'ya çok benzer: 'constructor' anahtar kelimesi, 'readonly' (final yerine), ve constructor shorthand (tek satırda hem declare hem assign)."
            },
            "java": "// Java class\npublic class PageObject {\n    private final WebDriver driver; // final = immutable\n    protected String baseUrl;\n\n    public PageObject(WebDriver driver) {\n        this.driver = driver;\n        this.baseUrl = \"https://example.com\";\n    }\n\n    protected void click(By locator) {\n        driver.findElement(locator).click();\n    }\n\n    public static PageObject create(WebDriver d) {\n        return new PageObject(d);\n    }\n}",
            "typescript": "// TypeScript class — almost identical!\nclass PageObject {\n    private readonly driver: WebDriver; // readonly = final\n    protected baseUrl: string;\n\n    constructor(driver: WebDriver) {    // NOT class name!\n        this.driver = driver;\n        this.baseUrl = \"https://example.com\";\n    }\n\n    protected click(locator: Locator): void {\n        locator.click();\n    }\n\n    static create(d: WebDriver): PageObject {\n        return new PageObject(d);\n    }\n}\n\n// Constructor shorthand (saves boilerplate!):\nclass Test {\n    constructor(\n        private readonly driver: WebDriver, // declare + assign\n        public name: string                 // declare + assign\n    ) {}\n}",
            "note": {
              "en": "\"readonly\" = Java \"final\". Constructor shorthand: \"constructor(private x: T)\" hem field'ı tanımlar hem atar — Java'ya kıyasla büyük boilerplate tasarrufu.",
              "tr": "\"readonly\" = Java \"final\". Constructor shorthand: \"constructor(private x: T)\" hem field'ı tanımlar hem atar — büyük boilerplate tasarrufu."
            },
            "why_en": "TypeScript class syntax is so similar to Java that there are only minor differences: the \"constructor\" keyword, \"readonly\" (instead of final), and constructor shorthand (declare and assign in one line).",
            "note_en": "\"readonly\" = Java \"final\". Constructor shorthand: \"constructor(private x: T)\" both declares the field and assigns it — a big boilerplate saving compared to Java."
          },
          {
            "type": "heading",
            "text": {
              "en": "4. Access Modifiers — Identical!",
              "tr": "4. Erişim Belirleyicileri — Birebir Aynı!"
            }
          },
          {
            "type": "java-compare",
            "topic": "access modifiers (same keywords!)",
            "why": {
              "en": "TypeScript access modifier'ları Java ile birebir aynı keyword'ler: public, private, protected. Java'dan farklı olarak 'package-private' kavramı yoktur. Ve iyi haber: Python'un aksine TypeScript gerçekten derleme zamanında zorlar!",
              "tr": "TypeScript access modifier'ları Java ile birebir aynı: public, private, protected. Python'un aksine TypeScript gerçekten derleme zamanında zorlar!"
            },
            "java": "// Java access modifiers\npublic class BankTest {\n    public String testId;      // anyone\n    protected String env;      // subclasses + package\n    private String apiKey;     // only this class\n\n    public void run() { }\n    protected void setup() { }\n    private void loadKey() { }\n\n    // Package-private (no keyword):\n    String internalName;\n}",
            "typescript": "// TypeScript access modifiers — same keywords!\nclass BankTest {\n    public testId: string;     // anyone (default)\n    protected env: string;     // subclasses only\n    private apiKey: string;    // only this class\n    // No \"package-private\" in TypeScript\n\n    public run(): void { }\n    protected setup(): void { }\n    private loadKey(): void { }\n}\n\n// Constructor shorthand applies here too:\nclass ApiTest {\n    constructor(\n        public name: string,\n        private apiKey: string,\n        protected env: string = \"staging\"\n    ) {}\n}",
            "note": {
              "en": "TypeScript derleme zamanında private/protected'ı zorlar (Java gibi). Python'un aksine bu gerçek bir kısıtlamadır. \"package-private\" yok — modüllerde internal için \"export\" kullanılmaz.",
              "tr": "TypeScript derleme zamanında private/protected'ı zorlar (Java gibi). \"package-private\" yok."
            },
            "why_en": "TypeScript access modifiers use the exact same keywords as Java: public, private, protected. Unlike Java there is no \"package-private\". And good news: unlike Python, TypeScript actually enforces this at compile time!",
            "note_en": "TypeScript enforces private/protected at compile time (like Java). Unlike Python, this is a real constraint. No \"package-private\" — for internal module use, simply don't export."
          },
          {
            "type": "heading",
            "text": {
              "en": "5. Generics — Very Similar to Java Generics",
              "tr": "5. Generics — Java Generics'e Çok Benzer"
            }
          },
          {
            "type": "java-compare",
            "topic": "Generics <T>",
            "why": {
              "en": "TypeScript generic'leri Java generic'leri ile neredeyse aynı sözdizimini kullanır. <T>, kısıtlar (extends), ve tip parametresi tümü tanıdık gelecek.",
              "tr": "TypeScript generic'leri Java generic'leri ile neredeyse aynı sözdizimini kullanır. <T>, kısıtlar (extends) tümü tanıdık."
            },
            "java": "// Java Generics\npublic class ApiResponse<T> {\n    private T data;\n    private boolean success;\n    public T getData() { return data; }\n}\n\n// With bounds:\npublic <T extends Comparable<T>> T max(T a, T b) {\n    return a.compareTo(b) > 0 ? a : b;\n}\n\n// Usage:\nApiResponse<User> resp = service.getUser(1);\nUser user = resp.getData();",
            "typescript": "// TypeScript Generics — very similar!\ninterface ApiResponse<T> {\n    data: T;\n    success: boolean;\n}\n\n// With bounds (extends):\nfunction max<T extends { id: number }>(a: T, b: T): T {\n    return a.id > b.id ? a : b;\n}\n\n// Usage:\nconst resp: ApiResponse<User> = await api.getUser(1);\nconst user = resp.data;  // TypeScript knows: User\n\n// Playwright uses generics everywhere:\nasync function getData<T>(url: string): Promise<T> {\n    const res = await fetch(url);\n    return res.json() as T;\n}",
            "note": {
              "en": "TypeScript generics aynı <T> sözdizimini kullanır. \"T extends X\" = Java \"T extends X\". TypeScript ayrıca union types ve mapped types gibi Java'da olmayan güçlü özellikler ekler.",
              "tr": "TypeScript aynı <T> sözdizimini kullanır. TypeScript ayrıca Java'da olmayan union types ve mapped types gibi güçlü özellikler ekler."
            },
            "why_en": "TypeScript generics use nearly identical syntax to Java generics. <T>, constraints (extends), and type parameters will all feel familiar.",
            "note_en": "TypeScript generics use the same <T> syntax. \"T extends X\" = Java \"T extends X\". TypeScript also adds powerful features Java lacks, like union types and mapped types."
          },
          {
            "type": "heading",
            "text": {
              "en": "6. Enum — Similar to Java But Different Variants",
              "tr": "6. Enum — Java'ya Benzer Ama Farklı Çeşitleri Var"
            }
          },
          {
            "type": "java-compare",
            "topic": "enum",
            "why": {
              "en": "Java enum'ları tam teşekküllü sınıflardır. TypeScript'te numeric enum (Java'ya benzer) ve string enum var. QA'da genellikle string enum tercih edilir çünkü log'larda okunabilir değerler üretir.",
              "tr": "Java enum'ları tam teşekküllü sınıflardır. TypeScript'te numeric ve string enum var. QA'da genellikle string enum tercih edilir çünkü log'larda okunabilir değerler üretir."
            },
            "java": "// Java enum (full-featured class)\npublic enum TestStatus {\n    PASS(\"✅\"), FAIL(\"❌\"), SKIP(\"⏭️\");\n\n    private final String icon;\n    TestStatus(String icon) { this.icon = icon; }\n    public String getIcon() { return icon; }\n}\n\nTestStatus status = TestStatus.PASS;\nstatus.getIcon();  // \"✅\"\nstatus.name();     // \"PASS\"",
            "typescript": "// TypeScript: two enum styles + union type\n\n// 1. String enum (most similar to Java):\nenum TestStatus {\n    PASS = \"PASS\",    // log'da görünür değer\n    FAIL = \"FAIL\",\n    SKIP = \"SKIP\"\n}\nTestStatus.PASS // === \"PASS\"\n\n// 2. Numeric enum (Java numeric enum gibi):\nenum Priority { LOW, MEDIUM, HIGH }  // 0, 1, 2\n\n// 3. Union type (TypeScript idiomu — daha yaygın):\ntype Status = \"PASS\" | \"FAIL\" | \"SKIP\";\n// No enum import needed! Compiler checks all cases.",
            "note": {
              "en": "Java enum = TypeScript string enum. Ama TypeScript'te union type (type Status = \"PASS\" | \"FAIL\") daha kısa ve tree-shakeable. QA'de string enum kullan — log'larda \"PASS\" görünür, 0 değil.",
              "tr": "Java enum = TypeScript string enum. Ama TypeScript'te union type (type Status = \"PASS\" | \"FAIL\") daha kısa ve tree-shakeable. QA'de string enum kullan."
            },
            "why_en": "Java enums are full-featured classes. TypeScript has numeric enums (similar to Java) and string enums. In QA, string enums are preferred because they produce readable values in logs.",
            "note_en": "Java enum = TypeScript string enum. But TypeScript's union type (type Status = \"PASS\" | \"FAIL\") is shorter and tree-shakeable. Use string enums in QA — logs show \"PASS\" not 0."
          },
          {
            "type": "heading",
            "text": {
              "en": "7. Null Safety — Optional → Optional Chaining",
              "tr": "7. Null Safety — Optional → Optional Chaining"
            }
          },
          {
            "type": "java-compare",
            "topic": "null safety & Optional chaining",
            "why": {
              "en": "Java'da null NullPointerException'a yol açar. TypeScript'te de aynı risk var ama optional chaining (?.) ile çok daha kısa ve temiz handle edilir. Java Optional'ın tüm gücü tek bir operatörde.",
              "tr": "Java'da null NullPointerException'a yol açar. TypeScript'te de aynı risk var ama optional chaining (?.) ile çok daha kısa handle edilir."
            },
            "java": "// Java null — NPE risk\nString name = user.getName();  // NPE if user is null!\n\n// Java 8+ Optional (verbose):\nOptional.ofNullable(user)\n    .map(u -> u.getAddress())\n    .map(a -> a.getCity())\n    .orElse(\"Unknown\");\n\n// Or null check (long form):\nif (user != null && user.getAddress() != null) {\n    city = user.getAddress().getCity();\n}",
            "typescript": "// TypeScript: optional chaining ?. (much cleaner!)\nconst name = user?.getName(); // undefined if user is null\nconst city = user?.address?.city ?? \"Unknown\";\n// No NPE! Returns undefined instead of crashing.\n\n// ?? = nullish coalescing (null/undefined → default)\n// Like Java's orElse() built into the language\n\n// TypeScript strict null checks (tsconfig.json):\n// \"strictNullChecks\": true\nfunction greet(user: User | null): string {\n    if (user === null) return \"Guest\"; // must handle null\n    return user.getName(); // TypeScript: definitely not null\n}",
            "note": {
              "en": "\"?.\" = Java Optional.map(). \"??\" = Java .orElse(). tsconfig'da \"strictNullChecks: true\" aç — Java'nın null-safety derleme zamanı kontrolü gibi çalışır.",
              "tr": "\"?.\" = Java Optional.map(). \"??\" = Java .orElse(). tsconfig'da \"strictNullChecks: true\" aç — Java'nın null-safety derleme zamanı kontrolü gibi çalışır."
            },
            "why_en": "In Java, null causes NullPointerException. TypeScript has the same risk but optional chaining (?.) handles it much more concisely. All the power of Java Optional in a single operator.",
            "note_en": "\"?.\" = Java Optional.map(). \"??\" = Java .orElse(). Enable \"strictNullChecks: true\" in tsconfig — it works like Java's compile-time null-safety control."
          },
          {
            "type": "heading",
            "text": {
              "en": "8. Union Types — No Java Equivalent",
              "tr": "8. Union Types — Java'da Karşılığı Yok"
            }
          },
          {
            "type": "java-compare",
            "topic": "union types (no Java equivalent!)",
            "why": {
              "en": "TypeScript'in Java'ya göre en güçlü özelliklerinden biri. Bir değişkenin birden fazla tip tutabilmesini tip güvenli şekilde ifade eder. Java'da bunu Object veya abstract class ile yapmak zorunda kalırsın.",
              "tr": "TypeScript'in Java'ya göre en güçlü özelliklerinden biri. Bir değişkenin birden fazla tip tutabilmesini tip güvenli şekilde ifade eder."
            },
            "java": "// Java: no union types\n// Must use Object (loses type safety):\nvoid handle(Object result) {\n    if (result instanceof String s) {\n        // string logic\n    } else if (result instanceof Integer i) {\n        // int logic\n    }\n    // No compile-time guarantee all cases handled\n}\n\n// Sealed classes (Java 17+) are closest:\nsealed interface Result permits Ok, Err {}\nrecord Ok(String data) implements Result {}\nrecord Err(String msg) implements Result {}",
            "typescript": "// TypeScript union types — elegant!\ntype ApiResult =\n    | { status: \"ok\";    data: string  }\n    | { status: \"error\"; message: string };\n\nfunction handle(result: ApiResult) {\n    if (result.status === \"ok\") {\n        console.log(result.data);    // TS knows: has 'data'\n    } else {\n        console.log(result.message); // TS knows: has 'message'\n    }\n    // TypeScript ensures ALL cases are covered!\n}\n\n// Simple union (very common):\nfunction log(level: \"info\" | \"warn\" | \"error\"): void { ... }\nlet id: string | number = getIdFromApi();",
            "note": {
              "en": "\"Discriminated union\" (status field ile) = Java sealed classes, ama çok daha kısa. TypeScript switch/if ile tüm case'lerin ele alındığını derleme zamanında kontrol eder.",
              "tr": "\"Discriminated union\" = Java sealed classes, ama çok daha kısa. TypeScript tüm case'lerin ele alındığını derleme zamanında kontrol eder."
            },
            "why_en": "One of TypeScript's most powerful features compared to Java. Expresses in a type-safe way that a variable can hold more than one type. In Java you'd have to use Object or an abstract class.",
            "note_en": "\"Discriminated union\" (using a status field) = Java sealed classes, but much shorter. TypeScript verifies at compile time that all cases are handled in switch/if."
          },
          {
            "type": "heading",
            "text": {
              "en": "9. Async/Await — CompletableFuture → Promise",
              "tr": "9. Async/Await — CompletableFuture → Promise"
            }
          },
          {
            "type": "java-compare",
            "topic": "async/await & Promise",
            "why": {
              "en": "TypeScript (ve JavaScript) ağ, dosya işlemleri için async/await kullanır. Java'da CompletableFuture karşılığıdır. TypeScript versiyonu çok daha temizdir. Playwright tamamen async-first'tir — her sayfa işlemi await gerektirir.",
              "tr": "TypeScript ağ/dosya işlemleri için async/await kullanır. Java'da CompletableFuture karşılığıdır. Playwright tamamen async-first'tir — her sayfa işlemi await gerektirir."
            },
            "java": "// Java CompletableFuture (verbose)\nCompletableFuture<Response> future =\n    httpClient.getAsync(url);\n\nfuture.thenApply(response -> processResponse(response))\n      .thenAccept(result -> System.out.println(result))\n      .exceptionally(e -> {\n          System.err.println(\"Error: \" + e);\n          return null;\n      });",
            "typescript": "// TypeScript async/await (clean!)\nasync function fetchTests(url: string): Promise<Test[]> {\n    try {\n        const response = await fetch(url);   // waits\n        const data = await response.json();  // waits\n        return data as Test[];\n    } catch (error) {\n        console.error(\"Error:\", error);\n        throw error;  // re-throw\n    }\n}\n\n// Playwright — all async:\ntest(\"login works\", async ({ page }) => {\n    await page.goto(\"https://example.com/login\");\n    await page.fill(\"#email\", \"user@test.com\");\n    await page.click(\"#submit\");\n    await expect(page).toHaveURL(\"/dashboard\");\n});",
            "note": {
              "en": "\"await\" = .get() on CompletableFuture (blocker until done). \"async function\" = CompletableFuture<T>. Playwright, Axios, fetch API tümü async-first. \"await\" olmadan Promise objesi alırsın, sonuç değil!",
              "tr": "\"await\" = .get() on CompletableFuture. \"async function\" = CompletableFuture<T>. Playwright, fetch API tümü async-first. \"await\" olmadan Promise objesi alırsın!"
            },
            "why_en": "TypeScript (and JavaScript) uses async/await for network and file operations. The Java equivalent is CompletableFuture. The TypeScript version is much cleaner. Playwright is entirely async-first — every page operation requires await.",
            "note_en": "\"await\" = .get() on CompletableFuture (blocks until done). \"async function\" returns Promise<T>. Playwright, Axios, and fetch API are all async-first. Without \"await\" you get a Promise object, not the result!"
          },
          {
            "type": "heading",
            "text": {
              "en": "Quick Comparison Table",
              "tr": "Hızlı Karşılaştırma Tablosu"
            }
          },
          {
            "type": "table",
            "headers": [
              {
                "en": "Concept",
                "tr": "Kavram"
              },
              {
                "en": "Java",
                "tr": "Java"
              },
              {
                "en": "TypeScript",
                "tr": "TypeScript"
              },
              {
                "en": "Similarity",
                "tr": "Benzerlik"
              }
            ],
            "rows": [
              [
                {
                  "en": "Numeric types",
                  "tr": "Sayısal tipler"
                },
                {
                  "en": "int, long, double",
                  "tr": "int, long, double"
                },
                {
                  "en": "number",
                  "tr": "number"
                },
                {
                  "en": "⚠️ all one 'number' type",
                  "tr": "⚠️ hepsi tek 'number'"
                }
              ],
              [
                {
                  "en": "Text type",
                  "tr": "Metin tipi"
                },
                {
                  "en": "String (capital S)",
                  "tr": "String (büyük S)"
                },
                {
                  "en": "string (lowercase s)",
                  "tr": "string (küçük s)"
                },
                {
                  "en": "⚠️ lowercase!",
                  "tr": "⚠️ küçük harf!"
                }
              ],
              [
                {
                  "en": "Boolean",
                  "tr": "Boolean"
                },
                {
                  "en": "boolean",
                  "tr": "boolean"
                },
                {
                  "en": "boolean",
                  "tr": "boolean"
                },
                {
                  "en": "✅ identical",
                  "tr": "✅ aynı"
                }
              ],
              [
                {
                  "en": "Class",
                  "tr": "Class"
                },
                {
                  "en": "class Foo { }",
                  "tr": "class Foo { }"
                },
                {
                  "en": "class Foo { }",
                  "tr": "class Foo { }"
                },
                {
                  "en": "✅ nearly identical",
                  "tr": "✅ neredeyse aynı"
                }
              ],
              [
                {
                  "en": "Constructor",
                  "tr": "Constructor"
                },
                {
                  "en": "public Foo(args)",
                  "tr": "public Foo(args)"
                },
                {
                  "en": "constructor(args)",
                  "tr": "constructor(args)"
                },
                {
                  "en": "⚠️ different keyword",
                  "tr": "⚠️ farklı anahtar kelime"
                }
              ],
              [
                {
                  "en": "Interface",
                  "tr": "Interface"
                },
                {
                  "en": "interface I { }",
                  "tr": "interface I { }"
                },
                {
                  "en": "interface I { }",
                  "tr": "interface I { }"
                },
                {
                  "en": "⚠️ structural vs nominal",
                  "tr": "⚠️ structural vs nominal"
                }
              ],
              [
                {
                  "en": "Implements",
                  "tr": "Implements"
                },
                {
                  "en": "implements I",
                  "tr": "implements I"
                },
                {
                  "en": "implements I",
                  "tr": "implements I"
                },
                {
                  "en": "✅ same keyword",
                  "tr": "✅ aynı keyword"
                }
              ],
              [
                {
                  "en": "Extends",
                  "tr": "Extends"
                },
                {
                  "en": "extends Base",
                  "tr": "extends Base"
                },
                {
                  "en": "extends Base",
                  "tr": "extends Base"
                },
                {
                  "en": "✅ same keyword",
                  "tr": "✅ aynı keyword"
                }
              ],
              [
                {
                  "en": "Access modifier",
                  "tr": "Erişim modifier"
                },
                {
                  "en": "public/private/protected",
                  "tr": "public/private/protected"
                },
                {
                  "en": "public/private/protected",
                  "tr": "public/private/protected"
                },
                {
                  "en": "✅ same!",
                  "tr": "✅ aynı!"
                }
              ],
              [
                {
                  "en": "Final field",
                  "tr": "Final field"
                },
                {
                  "en": "final int x",
                  "tr": "final int x"
                },
                {
                  "en": "readonly x: number",
                  "tr": "readonly x: number"
                },
                {
                  "en": "⚠️ 'readonly' not 'final'",
                  "tr": "⚠️ 'readonly' değil 'final'"
                }
              ],
              [
                {
                  "en": "Static",
                  "tr": "Static"
                },
                {
                  "en": "static void foo()",
                  "tr": "static void foo()"
                },
                {
                  "en": "static foo(): void",
                  "tr": "static foo(): void"
                },
                {
                  "en": "✅ same concept",
                  "tr": "✅ aynı kavram"
                }
              ],
              [
                {
                  "en": "Generics",
                  "tr": "Generics"
                },
                {
                  "en": "class Box<T>",
                  "tr": "class Box<T>"
                },
                {
                  "en": "class Box<T>",
                  "tr": "class Box<T>"
                },
                {
                  "en": "✅ same syntax",
                  "tr": "✅ aynı sözdizim"
                }
              ],
              [
                {
                  "en": "Enum",
                  "tr": "Enum"
                },
                {
                  "en": "enum Status { A, B }",
                  "tr": "enum Status { A, B }"
                },
                {
                  "en": "enum Status { A = 'A' }",
                  "tr": "enum Status { A = 'A' }"
                },
                {
                  "en": "⚠️ string value required",
                  "tr": "⚠️ string değer gerekli"
                }
              ],
              [
                {
                  "en": "Null",
                  "tr": "Null"
                },
                {
                  "en": "null",
                  "tr": "null"
                },
                {
                  "en": "null / undefined",
                  "tr": "null / undefined"
                },
                {
                  "en": "⚠️ TS has both null and undefined",
                  "tr": "⚠️ TS'de hem null hem undefined"
                }
              ],
              [
                {
                  "en": "Optional",
                  "tr": "Optional"
                },
                {
                  "en": "Optional.ofNullable()",
                  "tr": "Optional.ofNullable()"
                },
                {
                  "en": "value?.property",
                  "tr": "value?.property"
                },
                {
                  "en": "✅ much shorter ?.",
                  "tr": "✅ çok daha kısa ?."
                }
              ],
              [
                {
                  "en": "Async",
                  "tr": "Async"
                },
                {
                  "en": "CompletableFuture<T>",
                  "tr": "CompletableFuture<T>"
                },
                {
                  "en": "Promise<T>",
                  "tr": "Promise<T>"
                },
                {
                  "en": "✅ same concept, clean syntax",
                  "tr": "✅ aynı kavram, temiz sözdizim"
                }
              ],
              [
                {
                  "en": "Checked exceptions",
                  "tr": "Checked exceptions"
                },
                {
                  "en": "throws IOException",
                  "tr": "throws IOException"
                },
                {
                  "en": "(none)",
                  "tr": "(yok)"
                },
                {
                  "en": "✅ no checked exceptions in TS",
                  "tr": "✅ TS'de checked exception yok"
                }
              ],
              [
                {
                  "en": "Union type",
                  "tr": "Union type"
                },
                {
                  "en": "(none — Object/sealed)",
                  "tr": "(yok — Object/sealed)"
                },
                {
                  "en": "string | number",
                  "tr": "string | number"
                },
                {
                  "en": "🆕 TypeScript exclusive",
                  "tr": "🆕 TypeScript'e özgü"
                }
              ]
            ]
          },
          {
            "type": "glossary-section",
            "terms": [
              {
                "term": "any",
                "definition": {
                  "tr": "TypeScript tip kontrolunu tamamen devre disi birakan tip. Kullanmaktan kacinin — unknown kullanin.",
                  "en": "A TypeScript type that completely disables type checking. Avoid — use unknown instead."
                }
              },
              {
                "term": "async/await",
                "definition": {
                  "tr": "Promise tabanlı asenkron kodu yazmanin temiz yolu. Playwright de her sayfa islemi await gerektirir.",
                  "en": "The clean way to write Promise-based async code. Every Playwright page operation requires await."
                }
              },
              {
                "term": "enum",
                "definition": {
                  "tr": "Adlandirilmis sabitler kumesi. Test otomasyonunda string enum tercih edilir (loglarda okunabilir deger uretir).",
                  "en": "A named set of constants. In test automation, string enums are preferred (produce readable values in logs)."
                }
              },
              {
                "term": "fixture",
                "definition": {
                  "tr": "Playwright de test.extend ile tanimlanan, testlere injection edilen yeniden kullanilabilir kurulum/yikim birimi.",
                  "en": "A reusable setup/teardown unit defined with test.extend in Playwright and injected into tests."
                }
              },
              {
                "term": "generic",
                "definition": {
                  "tr": "<T> sozdizimi ile yazilan tip parametresi. Herhangi bir tipte calisan ve o tipin bilgisini koruyan yeniden kullanilabilir kod saglar.",
                  "en": "A type parameter written as <T>. Enables reusable code that works with any type while preserving type information."
                }
              },
              {
                "term": "interface",
                "definition": {
                  "tr": "Bir nesnenin sekil sozlesmesini tanimlayan TypeScript yapisali. Java interface den farkli olarak yapisal tipleme kullanir.",
                  "en": "A TypeScript construct that defines the shape contract of an object. Unlike Java interfaces, uses structural typing."
                }
              },
              {
                "term": "Locator",
                "definition": {
                  "tr": "Playwright de bir UI elementini secen nesne. page.locator(\"CSS veya XPath\") ile olusturulur.",
                  "en": "A Playwright object that selects a UI element. Created with page.locator(\"CSS or XPath\")."
                }
              },
              {
                "term": "null / undefined",
                "definition": {
                  "tr": "TypeScript de iki farkli bos deger turu vardir. null = kasitli bos, undefined = hic atanmamis. Java nin null tan farkli olarak ikisi de ayri turlerdir.",
                  "en": "TypeScript has two empty value types. null = intentionally empty, undefined = never assigned. Unlike Java null, both are distinct types."
                }
              },
              {
                "term": "optional chaining (?.)",
                "definition": {
                  "tr": "Zincirdeki her nesnenin null/undefined olup olmadigini kontrol ederek null reference hatalarini onler. Java Optional.map() e esdegerdir.",
                  "en": "Checks each object in a chain for null/undefined, preventing null reference errors. Equivalent to Java Optional.map()."
                }
              },
              {
                "term": "Page Object Model (POM)",
                "definition": {
                  "tr": "Her sayfanin ayri bir TypeScript sinifi olarak temsil edildigi tasarim deseni. Selector lari ve aksiyonlari testlerden ayirir.",
                  "en": "A design pattern where each page is represented as a TypeScript class. Separates selectors and actions from tests."
                }
              },
              {
                "term": "Promise",
                "definition": {
                  "tr": "Gelecekte tamamlanacak asenkron islemleri temsil eden nesne. Java CompletableFuture e esdegerdir.",
                  "en": "An object representing an async operation that will complete in the future. Equivalent to Java CompletableFuture."
                }
              },
              {
                "term": "readonly",
                "definition": {
                  "tr": "Atandiktan sonra degistirilemeyen alan veya degiskeni isaretler. Java final a esdegerdir.",
                  "en": "Marks a field or variable that cannot be changed after assignment. Equivalent to Java final."
                }
              },
              {
                "term": "structural typing",
                "definition": {
                  "tr": "TypeScript tip sisteminin temeli: bir nesnenin tipini adi degil sekli (ozellikleri ve metodlari) belirler. Java nominal tiplemenin karsitidir.",
                  "en": "The foundation of TypeScript's type system: an object's type is determined by its shape (properties and methods), not its name. Opposite of Java's nominal typing."
                }
              },
              {
                "term": "tsconfig.json",
                "definition": {
                  "tr": "TypeScript derleyicisine projeyi nasil derleyecegini soyleyen yapilandirma dosyasi. strict, target, module gibi ayarlari icerir.",
                  "en": "The configuration file that tells the TypeScript compiler how to build the project. Contains settings like strict, target, module."
                }
              },
              {
                "term": "type alias",
                "definition": {
                  "tr": "type keyword u ile tanimlanan tip kisayolu. Union tipler, tuple lar ve primitive tipler icin interface den daha ifadeseldir.",
                  "en": "A type shortcut defined with the type keyword. More expressive than interface for union types, tuples, and primitive types."
                }
              },
              {
                "term": "type guard",
                "definition": {
                  "tr": "Typeof, instanceof veya in operatorleri ile bir union tipin belirli bir kolunu dogrulayan kontrol. TypeScript in o kolda ne oldugunu bilmesini saglar.",
                  "en": "A check using typeof, instanceof, or in operators to verify a specific branch of a union type. Lets TypeScript know what is in that branch."
                }
              },
              {
                "term": "union type (A | B)",
                "definition": {
                  "tr": "Bir degerin birden fazla tipten biri olabilecegini ifade eder. Java sealed classes a benzer ama cok daha kisadir.",
                  "en": "Expresses that a value can be one of multiple types. Similar to Java sealed classes but much more concise."
                }
              },
              {
                "term": "unknown",
                "definition": {
                  "tr": "any nin daha guvenli alternatifi. Kullanmadan once tip daralttirmasi (type narrowing) yapmak zorundasinizdir.",
                  "en": "A safer alternative to any. You must perform type narrowing before using it."
                }
              }
            ]
          },
          {
            "type": "quiz",
            "question": {
              "en": "What is the most important difference between an interface in Java and an interface in TypeScript?",
              "tr": "Java'daki interface ile TypeScript'teki interface arasındaki en önemli fark nedir?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "TypeScript interfaces cannot contain methods",
                  "tr": "TypeScript interface'leri metot içeremez"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "TypeScript uses structural typing — an object can satisfy an interface just by having the right shape, without explicitly declaring 'implements'; Java's nominal typing requires explicit 'implements'",
                  "tr": "TypeScript yapısal tipleme kullanır — bir obje açıkça 'implements' demeden, sadece şekli uyuyorsa o interface'e atanabilir; Java nominal tiplemede açık 'implements' ister"
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "TypeScript interfaces can only be used once",
                  "tr": "TypeScript interface'leri sadece bir kez kullanılabilir"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "Java interfaces support generics, TypeScript does not",
                  "tr": "Java interface'leri generic destekler, TypeScript desteklemez"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "en": "Java relies on nominal typing: a class must explicitly write `implements InterfaceName` to satisfy an interface. TypeScript relies on structural typing: an object can be assigned to an interface type as long as it has all the required properties/methods — the compiler only checks the shape, with no `implements` declaration needed at all. This makes TypeScript more flexible than Java when building mock objects or reconciling types across different libraries.",
              "tr": "Java nominal tiplemeye dayanır: bir sınıfın bir interface'i karşıladığını söylemek için açıkça `implements InterfaceName` yazman gerekir. TypeScript ise yapısal tiplemeye dayanır: bir obje, interface'in beklediği tüm property/metodlara sahipse, hiçbir `implements` bildirimi olmadan o interface tipine atanabilir — derleyici sadece şekle bakar. Bu, TypeScript'i mock obje oluşturmada ve farklı kütüphanelerin tiplerini birbirine uydurmada Java'dan daha esnek yapar."
            },
            "retryQuestion": {
              "question": {
                "en": "In a test, you pass a plain object literal `{ log: (msg) => console.log(msg) }` to a function expecting an `interface Logger { log(msg: string): void }` parameter, with no `implements Logger` anywhere. What does TypeScript do?",
                "tr": "Bir testte `interface Logger { log(msg: string): void }` tipinde bir parametre bekleyen bir fonksiyona, `{ log: (msg) => console.log(msg) }` şeklinde sade bir obje literal'i geçiriyorsun, hiç `implements Logger` yazmadan. TypeScript ne yapar?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "It throws a compile error because no class explicitly said implements Logger",
                    "tr": "Derleme hatası verir, çünkü hiçbir sınıf açıkça implements Logger demedi"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "It accepts it — the object has the shape Logger expects (a log method), so it's valid",
                    "tr": "Kabul eder — obje, Logger'ın beklediği şekle (bir log metodu) sahip olduğu için geçerlidir"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "It runs at runtime but warns at compile time",
                    "tr": "Runtime'da çalışır ama derleme zamanında uyarı verir"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "Only class instances are accepted as interface parameters",
                    "tr": "Sadece class instance'ları interface parametresi olarak kabul edilir"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "en": "This is structural typing in action: the object literal is accepted with no `implements` declaration needed at all, simply because it has the shape Logger requires (a `log(msg: string): void` method). This makes it easy to mock/stub in tests using plain object literals instead of creating a real logger class — Java would always require an actual class (or anonymous class) that implements the interface for this.",
                "tr": "Bu, yapısal tiplemenin (structural typing) tam tanımıdır: obje literal'i Logger interface'inin gerektirdiği şekle (bir `log(msg: string): void` metodu) sahip olduğu için, hiçbir `implements` bildirimine ihtiyaç olmadan kabul edilir. Bu, testlerde gerçek bir logger sınıfı oluşturmadan basit obje literal'leriyle mock/stub yapmayı kolaylaştırır — Java'da bunun için her zaman interface'i implement eden gerçek bir sınıf (veya anonim sınıf) gerekirdi."
              }
            }
          }
        ]
      },
      {
        "title": {
          "en": "Test Runners — Vitest & Unit Testing",
          "tr": "Test Runner'lar — Vitest & Unit Test"
        },
        "blocks": [
          {
            "type": "simple-box",
            "emoji": "🏃",
            "content": {
              "tr": "Vitest, bir öğretmenin tüm öğrenci ödevlerini hızlıca tek tek kontrol edip yanına ✅ veya ❌ yazması gibidir. Her test dosyası bir ödev kağıdıdır; Vitest hepsini saniyeler içinde tarar ve hangisinin doğru hangisinin yanlış olduğunu renkli olarak gösterir.",
              "en": "Vitest is like a teacher quickly checking every student's homework and marking it ✅ or ❌. Each test file is a homework sheet; Vitest scans them all in seconds and shows, in color, which ones are right and which are wrong."
            }
          },
          {
            "type": "heading",
            "content": {
              "en": "Vitest: The Vite-Native Test Runner",
              "tr": "Vitest: Vite-Native Test Runner"
            }
          },
          {
            "type": "text",
            "content": {
              "en": "Playwright Test already ships its own test runner for end-to-end browser tests — you don't need Vitest for that. But the moment you write a plain TypeScript helper function (a price formatter, a data parser, a custom wait utility), you want to unit test that function in isolation, without spinning up a browser. That's where Vitest comes in: a fast, Jest-compatible test runner built on top of Vite, with zero-config TypeScript support. Jest is the older, more established alternative — same API shape (describe, it, expect), slower startup, and requires ts-jest to understand TypeScript out of the box.",
              "tr": "Playwright Test zaten kendi test runner'ı ile geliyor — uçtan uca tarayıcı testleri için Vitest'e ihtiyacın yok. Ama düz bir TypeScript yardımcı fonksiyonu yazdığın an (bir fiyat formatlayıcı, bir veri parser'ı, özel bir wait utility'si), o fonksiyonu tarayıcı açmadan, izole şekilde unit test etmek istersin. İşte burada Vitest devreye girer: Vite üzerine kurulu, hızlı, Jest-uyumlu bir test runner — sıfır konfigürasyonla TypeScript desteği sunar. Jest ise daha eski, daha köklü alternatiftir — aynı API şekli (describe, it, expect), daha yavaş başlangıç, ve TypeScript'i anlaması için ts-jest gerektirir."
            }
          },
          {
            "type": "code",
            "language": "typescript",
            "code": "// utils/formatPrice.ts — a plain helper, no browser needed\nexport function formatPrice(cents: number): string {\n  if (cents < 0) throw new Error('Price cannot be negative');\n  return `$${(cents / 100).toFixed(2)}`;\n}\n\n// utils/formatPrice.test.ts — Vitest unit test\nimport { describe, it, expect } from 'vitest';\nimport { formatPrice } from './formatPrice';\n\ndescribe('formatPrice', () => {\n  it('formats whole dollars', () => {\n    expect(formatPrice(1000)).toBe('$10.00');\n  });\n\n  it('formats cents correctly', () => {\n    expect(formatPrice(99)).toBe('$0.99');\n  });\n\n  it('throws on negative input', () => {\n    expect(() => formatPrice(-50)).toThrow('Price cannot be negative');\n  });\n});\n\n// Run it:\n// npx vitest run"
          },
          {
            "type": "simulation",
            "icon": "🏃",
            "color": "#729b1e",
            "title": {
              "en": "Vitest — Live Unit Test Run",
              "tr": "Vitest — Canlı Unit Test Çalıştırma"
            },
            "scenario": "vitest-runner",
            "description": {
              "en": "Click \"▶ npx vitest run\": watch Vitest collect the test file, execute every \"it()\" block, and report a pass/fail summary plus a coverage report — the same flow your terminal shows in a real project.",
              "tr": "\"▶ npx vitest run\" butonuna bas: Vitest'in test dosyasını topladığını, her \"it()\" bloğunu çalıştırdığını ve bir pass/fail özeti ile coverage raporu verdiğini izle — gerçek bir projede terminalinde gördüğün akışın birebir aynısı."
            },
            "code": "// vitest.config.ts\nimport { defineConfig } from 'vitest/config';\n\nexport default defineConfig({\n  test: {\n    environment: 'node',\n    coverage: { reporter: ['text', 'html'] },\n  },\n});\n\n// package.json\n// \"scripts\": { \"test:unit\": \"vitest run --coverage\" }"
          },
          {
            "type": "java-compare",
            "topic": "Unit Test Runner: JUnit vs Vitest",
            "why": {
              "en": "JUnit is the standard unit test runner in Java, almost always paired with Maven Surefire to produce CI reports. Vitest plays the exact same role for plain TypeScript functions — fast, isolated, no browser needed.",
              "tr": "Java'da JUnit standart unit test runner'ıdır, neredeyse her zaman CI raporları üretmek için Maven Surefire ile birlikte kullanılır. Vitest, düz TypeScript fonksiyonları için tam olarak aynı rolü oynar — hızlı, izole, tarayıcı gerekmez."
            },
            "why_en": "JUnit is the standard unit test runner in Java, almost always paired with Maven Surefire to produce CI reports. Vitest plays the exact same role for plain TypeScript functions — fast, isolated, no browser needed.",
            "java": "// Java — JUnit 5\nimport org.junit.jupiter.api.Test;\nimport static org.junit.jupiter.api.Assertions.*;\n\nclass FormatPriceTest {\n    @Test\n    void formatsWholeDollars() {\n        assertEquals(\"$10.00\", PriceUtil.format(1000));\n    }\n\n    @Test\n    void throwsOnNegativeInput() {\n        assertThrows(IllegalArgumentException.class,\n            () -> PriceUtil.format(-50));\n    }\n}\n\n// mvn test → target/surefire-reports/*.xml",
            "typescript": "// TypeScript — Vitest\nimport { describe, it, expect } from 'vitest';\nimport { formatPrice } from './formatPrice';\n\ndescribe('formatPrice', () => {\n  it('formats whole dollars', () => {\n    expect(formatPrice(1000)).toBe('$10.00');\n  });\n\n  it('throws on negative input', () => {\n    expect(() => formatPrice(-50)).toThrow();\n  });\n});\n\n// npx vitest run --coverage → coverage/index.html",
            "note": {
              "en": "The @Test annotation in Java maps almost 1-to-1 to Vitest's it()/test() — both isolate one behavior per function, both fail loudly with a stack trace, and both plug into CI as a separate step from your end-to-end (Playwright/Selenium) suite.",
              "tr": "Java'daki @Test anotasyonu, Vitest'in it()/test() fonksiyonuna neredeyse birebir karşılık gelir — ikisi de fonksiyon başına tek bir davranışı izole eder, ikisi de stack trace ile gürültülü şekilde başarısız olur, ve ikisi de CI'da uçtan uca (Playwright/Selenium) paketinden ayrı bir adım olarak çalışır."
            },
            "note_en": "The @Test annotation in Java maps almost 1-to-1 to Vitest's it()/test() — both isolate one behavior per function, both fail loudly with a stack trace, and both plug into CI as a separate step from your end-to-end (Playwright/Selenium) suite."
          },
          {
            "type": "quiz",
            "question": {
              "en": "Given that Playwright Test already has its own test runner, when does a QA automation project actually need Vitest?",
              "tr": "Playwright Test zaten kendi test runner'ına sahipken, bir QA otomasyon projesinde Vitest'e ne zaman ihtiyaç duyulur?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "To make Playwright tests run faster",
                  "tr": "Playwright testlerini daha hızlı çalıştırmak için"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "To unit test a plain TypeScript helper function (a formatter, parser, util) in isolation, without opening a browser",
                  "tr": "Tarayıcı açmadan, düz bir TypeScript yardımcı fonksiyonunu (formatter, parser, util) izole şekilde unit test etmek için"
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "To run tests in browsers Playwright does not support at all",
                  "tr": "Playwright'ın hiç desteklemediği tarayıcılarda test çalıştırmak için"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "To eliminate the need for a CI/CD pipeline",
                  "tr": "CI/CD pipeline'ına ihtiyacı ortadan kaldırmak için"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "en": "Playwright Test is already sufficient for end-to-end browser tests — Vitest is not needed there. But the moment you write a plain TypeScript function like a price formatter or data parser, you want to test it fast and in isolation, without spinning up a browser — the same logic as JUnit unit-testing a service class in Java without touching Selenium at all. Vitest fills that role in the TypeScript world.",
              "tr": "Playwright Test, uçtan uca tarayıcı testleri için zaten yeterlidir — Vitest'e gerek yoktur. Ama bir fiyat formatlayıcı veya veri parser'ı gibi düz bir TypeScript fonksiyonu yazdığında, o fonksiyonu tarayıcı açmadan, hızlı ve izole şekilde test etmek istersin — Java'da JUnit'in bir servis sınıfını Selenium'a hiç dokunmadan unit test etmesiyle aynı mantık. Vitest bu rolü TypeScript dünyasında üstlenir."
            },
            "retryQuestion": {
              "question": {
                "en": "What is the core advantage of unit testing a `formatPrice(cents: number): string` function with Vitest, versus only testing it indirectly inside a Playwright E2E test?",
                "tr": "Bir `formatPrice(cents: number): string` fonksiyonunu Vitest ile unit test etmenin, onu sadece bir Playwright E2E testi içinde dolaylı olarak test etmeye göre temel avantajı nedir?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "Vitest tests always produce higher coverage",
                    "tr": "Vitest testleri her zaman daha yüksek coverage verir"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "It runs in seconds with no browser, testing the function in isolation — if an E2E test fails, it's unclear whether the bug is in formatPrice or the UI",
                    "tr": "Tarayıcı açmadan, saniyeler içinde ve fonksiyonu izole ederek çalışır — bir E2E testi başarısız olursa hatanın formatPrice'tan mı yoksa UI'dan mı geldiği belirsiz olur"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "Vitest uses syntax Playwright cannot test",
                    "tr": "Vitest, Playwright'ın test edemediği bir sözdizimi kullanır"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "E2E tests cannot execute unit-testable functions at all",
                    "tr": "E2E testleri unit test edilebilir fonksiyonları çalıştıramaz"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "en": "An E2E test only tests `formatPrice` INDIRECTLY (via the correct price appearing on the page) — if it fails, it is hard to tell whether the bug is in formatPrice itself or in rendering/UI logic, and spinning up a browser for every assertion costs seconds/minutes. Vitest tests the function directly, with no browser, in milliseconds — if it fails, it tells you exactly where the bug is.",
                "tr": "Bir E2E testi `formatPrice`'ı sadece DOLAYLI olarak (sayfada doğru fiyatın görünmesi üzerinden) test eder — başarısız olursa, hatanın formatPrice'ın kendisinde mi yoksa render/UI mantığında mı olduğunu ayırt etmek zordur, ayrıca her assertion için bir tarayıcı başlatmak gerekir (saniyeler/dakikalar). Vitest, fonksiyonu doğrudan, tarayıcısız ve milisaniyeler içinde test eder — hata varsa tam olarak nerede olduğunu hemen gösterir."
              }
            }
          }
        ]
      },
      {
        "title": {
          "en": "Interview Q&A",
          "tr": "Mülakat Soruları & Cevapları"
        },
        "blocks": [
                    {
            type: 'interview-questions',
            topic: 'TypeScript',
            questions: [
              // ── BASIC ──────────────────────────────────────────
              {"level":"basic","q":"1. Test otomasyonu için TypeScript ile JavaScript arasındaki temel fark nedir?","a":"TypeScript, bir derleme (compile) adımı ekleyen, statik tipli bir JavaScript superset'idir. Test otomasyonu için temel avantajları: tip hataları testler çalışmadan ÖNCE yakalanır (gece yarısı 3'te CI başarısızlığı sırasında değil); IDE autocomplete tüm Playwright API'lerinde, page object'lerde ve fixture'larda çalışır; refactoring güvenlidir çünkü compiler her bozuk çağrı noktasını anında gösterir. JavaScript'te derleme adımı yoktur — tüm tip hataları runtime sürprizlerine dönüşür. Playwright'ın kendisi TypeScript ile yazılmıştır ve TypeScript, Playwright projeleri için resmi olarak önerilen dildir."},
              {"level":"basic","q":"2. TypeScript'te interface ile type alias arasındaki fark nedir?","a":"İkisi de nesne şekillerini tanımlar, ama önemli farkları vardır. interface declaration merging'i destekler — bir interface'i yeniden açıp özellik ekleyebilirsin, bu üçüncü taraf tipleri genişletmek için kullanışlıdır (örn. Playwright'ın TestFixtures'ını genişletmek gibi). interface, OOP desenleri ve class kontratları için tercih edilir. type ise union tiplerini (`string | number`), intersection tiplerini (`A & B`), tuple tiplerini ve mapped type'ları destekler — hesaplanmış veya bileşik tiplere ihtiyaç duyduğunda daha ifade gücü yüksektir. Kural: class şekilleri ve public API'ler için interface kullan; union'lar, primitive'ler ve karmaşık hesaplanmış tipler için type kullan.","code":"interface Config { url: string }\ninterface Config { timeout: number }   // merged — now has url AND timeout\n\ntype Status = \"pass\" | \"fail\" | \"skip\";  // union — only possible with type\ntype ID     = string | number;           // union"},
              {"level":"basic","q":"3. 'any' nedir ve test otomasyonunda neden kaçınılmalıdır?","a":"any, bir değişken için TypeScript'in tip kontrolünü tamamen devre dışı bırakan bir kaçış kapısıdır. Ona her şeyi atayabilir ve hatasız herhangi bir metodu çağırabilirsin — ama o hatalar derleme zamanı yerine runtime'da ortaya çıkar. Test otomasyonunda any kullanmak TypeScript'in tüm amacını boşa çıkarır: autocomplete'i kaybedersin, derleme-zamanı güvenliğini kaybedersin ve TypeScript'in önlemesi gereken aynı runtime bug sınıfını yeniden tanıtırsın. Tipi gerçekten bilmediğinde bunun yerine unknown kullan — bu, kullanmadan önce bir type guard ile tipi daraltmanı zorunlu kılar. any yerine açık tipler, tip belirtme (as) veya generic'ler kullan.","code":"// WRONG — any disables all safety\nlet data: any = await response.json();\ndata.nonExistentField.toUpperCase(); // No error — crashes at runtime\n\n// RIGHT — unknown forces you to validate first\nlet safe: unknown = await response.json();\nif (typeof safe === \"object\" && safe !== null && \"name\" in safe) {\n  console.log((safe as { name: string }).name);  // safe to use\n}"},
              {"level":"basic","q":"4. Tip çıkarımı (type inference) nedir ve ne zaman çalışır?","a":"Tip çıkarımı, TypeScript'in bir değişkenin tipini açık bir annotation gerektirmeden başlangıç değerinden veya bağlamdan otomatik olarak belirleme yeteneğidir. Şunlar için çalışır: başlangıç değeri olan değişken tanımları (`let x = 5` → x, number olur), fonksiyon dönüş tipleri (return ifadesinden çıkarılır), generic tip parametreleri (argümanlardan çıkarılır) ve array/object literal'ları. Açıkça ne zaman annotation yapmalısın: değişken değer olmadan tanımlandığında, çıkarılan tip çok geniş olduğunda (örn. `(string | number)[]` değil `string[]` istiyorsan), ve asla çıkarılmayan fonksiyon parametrelerinde.","code":"let count = 5;            // inferred: number\nlet name  = \"Alice\";       // inferred: string\nlet arr   = [1, 2, 3];     // inferred: number[]\n\nfunction double(n: number) { return n * 2; }  // return: number (inferred)\n\nlet url: string;            // MUST annotate — no initial value\nurl = \"https://example.com\";"},
              {"level":"basic","q":"5. Enum'lar nedir ve test odaklı bir kullanım örneği verin?","a":"Enum'lar isimlendirilmiş sabit kümelerdir. String enum'lar (her üyenin açık bir string değeri olduğu) test otomasyonunda kesinlikle tercih edilir çünkü loglarda ve test raporlarında okunabilir çıktı üretirler. Bir number enum'unun `0` değeri bir test başarısızlık mesajında anlamsızdır; 'FAIL' değerine sahip bir string enum anında anlaşılır. Yaygın test kullanım örnekleri: test durumu (PASS/FAIL/SKIP/BLOCKED), tarayıcı hedefi (chromium/firefox/webkit), ortam (staging/production), HTTP metodları ve log seviyeleri. Ham string'ler yerine enum kullanmak, compiler'ın `'pase'` gibi yazım hatalarını anında yakalaması demektir.","code":"enum TestStatus { PASS = \"PASS\", FAIL = \"FAIL\", SKIP = \"SKIP\" }\nenum Browser    { CHROMIUM = \"chromium\", FIREFOX = \"firefox\" }\n\nfunction reportResult(status: TestStatus, browser: Browser) {\n  console.log(`[${browser}] ${status}`);   // [chromium] PASS — readable!\n}\nreportResult(TestStatus.PASS, Browser.CHROMIUM);\n// reportResult(\"pass\", \"chrome\");  // Error — prevents typos"},
              {"level":"basic","q":"6. tsconfig.json nedir ve bir Playwright projesi için en önemli alanları nelerdir?","a":"tsconfig.json, TypeScript compiler yapılandırma dosyasıdır. Playwright projeleri için en önemli alanlar: target: ESNext (çıktının hedeflediği JS versiyonu, modern Node.js için); module: NodeNext (ESM desteği için); strict: true (tüm strict kontrolleri etkinleştirir — bunu asla kapatma); types: [\"@playwright/test\"] (Playwright'ın tip tanımlarını dahil eder). Minimal bir Playwright tsconfig.json strict'i etkinleştirir, target'ı ESNext yapar ve opsiyonel olarak import alias'ları için baseUrl ve paths yapılandırır. Java analojisi: tsconfig.json, pom.xml compiler plugin ayarlarına benzer — kaynağın nasıl derleneceğini kontrol eder.","code":"{\n  \"compilerOptions\": {\n    \"target\": \"ESNext\",\n    \"module\": \"NodeNext\",\n    \"moduleResolution\": \"NodeNext\",\n    \"strict\": true,\n    \"types\": [\"@playwright/test\"],\n    \"baseUrl\": \".\",\n    \"paths\": { \"@helpers/*\": [\"./helpers/*\"] }\n  }\n}"},
              {"level":"basic","q":"7. TypeScript'te null ile undefined arasındaki fark nedir ve strictNullChecks kodunuzu nasıl etkiler?","a":"null, bir değerin kasıtlı olarak hiçbir şeye ayarlandığı anlamına gelir — açık bir boşluk. undefined ise tanımlanmış ama hiç atanmamış anlamına gelir — varsayılan başlatılmamış durum. strictNullChecks olmadan, ikisi de her tipe atanabilir, böylece `let name: string = null` hatasız yazılabilir ve runtime çökmelerine yol açar. strictNullChecks ile (strict:true ile etkinleşir), null ve undefined kendi tipleridir. string tipindeki bir değişken, açıkça `string | null` yazmadıkça null olamaz. Playwright'ta: `page.locator().getAttribute()` `string | null` döndürür — TypeScript, `.toLowerCase()` çağırmadan önce null'ı ele almanı zorlar. Bu, bu kontrol olmadan sadece CI runtime'ında ortaya çıkacak \"Cannot read properties of null\" çökmelerini önler.","code":"function processUrl(url: string | null): string {\n  if (url === null) return \"no-url\";\n  return url.toLowerCase();\n}\n// Playwright — getAttribute returns string | null\nconst href = await page.locator(\"a\").getAttribute(\"href\");\nif (href) { await page.goto(href); }"},
              {"level":"basic","q":"8. Interface özelliğindeki ? ne anlama gelir ve test otomasyonunda isteğe bağlı özellikler ne zaman kullanılmalıdır?","a":"? eki bir özelliği opsiyonel yapar — tipi `T | undefined` olur. Zorunlu özellikler her zaman sağlanmalıdır; opsiyonel olanlar atlanabilir ve factory bir varsayılan uygular. Test otomasyonunda: opsiyonel özellikler en çok test data factory'lerinde (`createUser({ role?: string })` — varsayılandan farklı olanı belirt), çoğu alanı varsayılanı olan config nesnelerinde (`TestRunConfig { retries?: number }`) ve bazı alanları koşullu olan API yanıt modellerinde kullanışlıdır. Opsiyonel özellikleri fazla kullanmaktan kaçın — bir alan nesnenin anlamlı olması için her zaman gerekliyse, onu zorunlu tut ve çağrı noktasında `Partial<T>` kullan.","code":"interface CreateUserOptions {\n  name: string;\n  role?: string;\n  verified?: boolean;\n}\nfunction createUser(opts: CreateUserOptions) {\n  return { name: opts.name, role: opts.role ?? \"viewer\", verified: opts.verified ?? false };\n}\ncreateUser({ name: \"Alice\" }); // role and verified are optional"},
              {"level":"basic","q":"9. Tip belirtme (as) nedir ve test otomasyonunda ne zaman güvenlidir?","a":"Bir tip belirtme (`value as SomeType`), TypeScript'e \"güven bana, bu tipi biliyorum\" diyen derleme-zamanı bir talimattır. Runtime dönüşümü veya doğrulaması YAPMAZ — sadece derleme-zamanı bir geçersiz kılmadır. Güvenli kullanımlar: bir type guard ile şekli zaten doğruladıktan sonra JSON parse'tan sonra unknown'ı daraltmak; any döndüren legacy JS API'leriyle çalışmak. Güvensiz kullanımlar: doğrulama yapmadan herhangi bir API yanıtını körü körüne belirli bir tipe atamak — belirtme compiler'ı susturur ama runtime çökmesi yine de gerçekleşir. Mümkün olduğunda her zaman type guard'ları belirtmelere tercih et. Java analojisi: as, önce instanceof kontrolü olmadan tehlikeli olan kontrolsüz bir cast `(User) someObject` gibidir.","code":"async function getUser(id: number): Promise<User> {\n  const res  = await fetch(\"/api/user/\" + id);\n  const data = await res.json();\n  if (!data || typeof data.name !== \"string\") throw new Error(\"bad response\");\n  return data as User;  // safe — shape verified above\n}"},
              {"level":"basic","q":"10. TypeScript'te string (küçük harf) ile String (büyük harf) arasındaki fark nedir?","a":"Küçük harf string, TypeScript'in primitive tipidir — annotation'lar için her zaman bunu kullan. Büyük harf String, `new String(\"hello\")` ile oluşturulan JavaScript wrapper nesne tipidir. Aynı metne sahip iki String nesnesi `===` ile EŞİT DEĞİLDİR; aynı metne sahip iki string primitive `===` ile EŞİTTİR. Aynısı number vs Number ve boolean vs Boolean için de geçerlidir. TypeScript ve tüm linter'lar büyük harfli nesne formlarına karşı uyarır. Java analojisi: int (primitive) vs Integer (wrapper class) — Java'da basit değerler için Integer yerine int'i tercih ettiğin gibi, TypeScript'te de primitive formu kullan.","code":"let a: string = \"hello\";       // use this\nlet b: String = new String(\"hello\"); // avoid\nconsole.log(a === \"hello\");     // true\nconsole.log(b === \"hello\");     // false — different identity"},
              {"level":"basic","q":"11. TypeScript kodu nasıl çalıştırılır? tsc, ts-node ve tsx arasındaki fark nedir?","a":"Üç ana yol: (1) tsc — TypeScript compiler, .js çıktı dosyaları üretir, sonra `node dist/file.js` çalıştırırsın. Bu production yoludur. (2) ts-node — her dosyayı bellekte derleyerek build adımı olmadan TypeScript'i direkt çalıştırır. Başlangıç daha yavaştır ama build adımı gerekmez; geliştirme scriptleri için yaygındır. (3) tsx — esbuild üzerine inşa edilmiş, ts-node'dan çok daha hızlı modern bir alternatif; esasen anında başlar. Playwright, script çalıştırmak için tsx önerir. Playwright .spec.ts dosyalarını çalıştırdığında kendi transform pipeline'ını içsel olarak ele alır. Kural: CI'da tipleri doğrulamak için `tsc --noEmit` kullan, lokal script çalıştırmak için tsx kullan, kendi test dosyalarını Playwright'a bırak.","code":"npx tsc --noEmit                    # type-check only, no output\nnpx tsx scripts/seed-test-data.ts   # run a TS script directly\nnpx playwright test                  # Playwright handles TS internally"},
              {"level":"basic","q":"12. Tanımlama dosyaları (.d.ts) nedir ve üçüncü taraf kütüphaneler için neden önemlidir?","a":"Tanımlama dosyaları (.d.ts) sadece TypeScript tip bilgisi içerir — hiç runtime JavaScript kodu yoktur. TypeScript'e bir JavaScript kütüphanesindeki export edilen fonksiyonların, class'ların ve değişkenlerin tiplerini söylerler, böylece autocomplete ve tip kontrolü alırsın. Bir kütüphane kendi tiplerini sağladığında .d.ts dosyaları npm paketine dahildir. Bir kütüphane tipsiz düz JS olduğunda, community dev bağımlılığı olarak kurduğun @types/kütüphane-adı paketlerini (DefinitelyTyped'dan) yayınlar. Playwright için, @playwright/test Page, Locator, APIRequestContext vb. tanımlayan kendi tanımlarını sağlar. Bu TypeScript tipleri olmadan her şey any olur ve tüm güvenliği ve autocomplete'i kaybedersin.","code":"npm install --save-dev @types/node\n# Playwright ships its own types — no @types needed:\nnpm install --save-dev @playwright/test\n# Check: node_modules/@playwright/test/index.d.ts"},
              {"level":"basic","q":"13. keyof operatörü nedir ve bir test otomasyonu kullanım örneği verin?","a":"keyof T, T tipinin tüm özellik adlarının string literal'leri olarak bir union tipini üretir. T = { email: string; password: string } ise, keyof T = \"email\" | \"password\" olur. Test otomasyonunda: (1) Type-safe form alan yardımcısı — `fillField(field: keyof FormData, value: string)` var olmayan bir alanı doldurmayı önler. (2) Type-safe env erişimi — `getEnv(key: keyof EnvConfig)` sadece bilinen anahtarlara erişildiğini garanti eder. (3) Generic override'lar — kısmi test data factory'leri için `{ [K in keyof T]?: T[K] }`. Java analojisi: keyof, tamamen derleme zamanında çözümlenen, sıfır runtime overhead'i olan bir reflection field name erişimi gibidir.","code":"interface LoginForm { email: string; password: string; rememberMe: boolean }\nasync function fillField(page: Page, field: keyof LoginForm, value: string) {\n  await page.locator('[data-testid=\"' + field + '\"]').fill(value);\n}\nawait fillField(page, \"email\", \"user@test.com\");  // OK\nawait fillField(page, \"phone\", \"123\");            // Compile Error!"},
              {"level":"basic","q":"14. TypeScript'te tuple ile array arasındaki fark nedir?","a":"Bir array (`T[]`) sabit uzunluğu olmayan, aynı tipte elemanların bir koleksiyonudur. Bir tuple (`[T, U, V]`) ise her pozisyonun belirli, muhtemelen farklı bir tipi olduğu sabit uzunluklu bir array'dir — TypeScript hem tipleri HEM pozisyonları kontrol eder. Test otomasyonunda tuple'lar birden fazla değer döndüren yardımcı fonksiyonlarda görünür: bir geçti/başarısız ve mesaj çifti için `[boolean, string]`, veya bir fixture ikisini de kurduğunda `[Page, User]`. Java analojisi: tuple'lar Java'da native olarak yoktur — özel bir class veya `Map.Entry<K,V>` kullanırdın. TypeScript tuple'ları, her indeksin derleme-zamanında zorlandığı, güçlü tipli bir `Object[]` gibidir.","code":"type TestResult = [passed: boolean, message: string, durationMs: number];\nfunction runCheck(): TestResult { return [true, \"Login OK\", 342]; }\nconst [passed, msg, ms] = runCheck();\nconsole.log(passed.toFixed()); // Compile Error — boolean has no toFixed"},
              {"level":"basic","q":"15. Literal tipler nedir ve test durumu ile tarayıcı seçimini modellemekte nasıl yardımcı olur?","a":"Literal tipler, genel bir tip yerine belirli, tam bir değeri temsil eder. `type: string` yerine `type: \"GET\" | \"POST\" | \"DELETE\"` yazarsın — TypeScript sadece o tam string'leri kabul eder. Test otomasyonu için: `type TestStatus = \"pass\" | \"fail\" | \"skip\" | \"blocked\"` geçersiz durum değerlerini önler; `type Browser = \"chromium\" | \"firefox\" | \"webkit\"` Playwright'ın izin verilen tarayıcı adlarıyla eşleşir. `as const` ile birleştirildiğinde, nesne özellik değerleri otomatik olarak literal tiplere dönüşür. Bu, sabit kümeler için ayrıntılı enum'ların yerini alır ve sadece test runtime'ında ortaya çıkacak yazım hatalarını önler.","code":"type TestStatus = \"pass\" | \"fail\" | \"skip\" | \"blocked\";\ntype Browser    = \"chromium\" | \"firefox\" | \"webkit\";\nfunction reportTest(status: TestStatus, browser: Browser) {}\nreportTest(\"pass\", \"chromium\");    // OK\nreportTest(\"passed\", \"chrome\");    // Compile Error — both values wrong\nconst URLS = { staging: \"https://staging.app.com\" } as const;\ntype EnvKey = keyof typeof URLS;   // \"staging\""},
              // ── INTERMEDIATE ────────────────────────────────────
              {"level":"intermediate","q":"16. Union tipleri ile intersection tipleri arasındaki fark nedir?","a":"Bir union tip (`A | B`), bir değerin bir VEYA diğer tip olabileceği anlamına gelir — her iki durumu da ele almalısın (genellikle bir type guard ile). Bir intersection tip (`A & B`), bir değerin listelenen TÜM tipleri eşzamanlı olarak karşılaması gerektiği anlamına gelir — birden fazla tipten özellikleri tek bir tipte birleştirir. Union 'veya' senaryoları içindir (birden fazla form kabul eden bir parametre), intersection 've' senaryoları içindir (birden fazla interface'i tek, tam bir tipe bileştirmek). Test otomasyonunda: union tipleri birden fazla format kabul eden fonksiyon parametreleri için yaygındır (`string | number`); intersection tipleri bileşik page object'ler veya config tipleri için yaygındır.","code":"type StringOrNumber = string | number;  // can be EITHER\n\ninterface HasId    { id: number }\ninterface HasTitle { title: string }\ntype TestItem = HasId & HasTitle;  // must have BOTH id AND title\n\nconst item: TestItem = { id: 1, title: \"Login test\" };  // OK\n// const bad: TestItem = { id: 1 };  // Error: missing 'title'"},
              {"level":"intermediate","q":"17. Generic'ler nedir ve test otomasyonunda neden kullanışlıdır?","a":"Generic'ler (`<T>` olarak yazılan) tip parametreleridir, herhangi bir tiple çalışan ama o tipin bilgisini kod boyunca koruyan fonksiyonlar, class'lar ve interface'ler yazmanı sağlar. Generic'ler olmadan, `any` kullanırsın (ve tüm tip güvenliğini kaybedersin) veya her tip için kodu çoğaltırsın. Test otomasyonunda generic'ler en kullanışlı olduğu yerler: verinin tipini koruyan API yanıt wrapper'ları (`ApiResponse<User>` vs `ApiResponse<Product>`), kısmi override'larla tipli nesneler oluşturan test data factory'leri (`createTestData<T>(defaults: T, overrides?: Partial<T>): T`), tipli veri erişimi için repository desenleri, ve birden fazla fixture tipinde çalışması gereken utility fonksiyonları.","code":"// Generic wrapper preserves type through the chain\ninterface ApiResponse<T> { data: T; status: number; ok: boolean }\n\nfunction createResponse<T>(data: T, status: number): ApiResponse<T> {\n  return { data, status, ok: status < 400 };\n}\n\nconst userResp = createResponse({ id: 1, name: \"Alice\" }, 200);\nconsole.log(userResp.data.name);  // 'name' is correctly typed as string"},
              {"level":"intermediate","q":"18. Access modifier'lar (public/private/protected/readonly) Page Object Model'de nasıl yardımcı olur?","a":"Access modifier'lar, POM class'larında encapsulation'ı zorlar, bu da test kodunun implementasyon detaylarına bağımlı olmasını önler. Locator özelliklerinde private olması, test dosyalarının selector'lara direkt erişememesi anlamına gelir — sadece page object'in metodları DOM ile etkileşir, böylece selector değişiklikleri her test dosyasına yayılmaz. protected, alt sınıfların base class'ların sağladığı metodları (örn. `waitForLoad()`) test koduna açmadan kullanmasına izin verir. baseUrl veya constructor'a enjekte edilen bağımlılıklarda readonly, testler arasında kazara değişikliği önler. public, page object'in public API'si olan metodları işaretler — test kodunun çağırması gereken tek şeyler.","code":"class LoginPage {\n  private readonly emailInput: Locator;   // tests cannot use selectors directly\n  protected readonly page: Page;          // accessible to subclasses\n  public readonly url = \"/login\";         // tests can read url, not change it\n\n  async login(e: string, p: string): Promise<void> {  // public API\n    await this.emailInput.fill(e);   // private — only this class\n  }\n}"},
              {"level":"intermediate","q":"19. Type guard nedir ve test otomasyonunda ne zaman kullanılır?","a":"Type guard'lar, bir union tipini bir kod dalı içinde belirli bir üyeye daraltan runtime kontrolleridir. TypeScript, `typeof`, `instanceof`, `in` operatörünü ve özel tip predicate fonksiyonlarını (`value is T`) type guard olarak tanır. Test otomasyonunda type guard'lar en çok şu durumlarda görünür: bilinmeyen şekildeki API yanıtlarını doğrulamak (yanıt doğrulanana kadar `unknown` tiplidir), birden fazla hata tipi olabilen hataları ele almak (NetworkError vs TimeoutError), birden fazla formatta gelen test sonuçlarını işlemek (UI testi vs API testi), ve undefined olabilen opsiyonel özelliklerle çalışmak.","code":"function handleError(err: NetworkError | TimeoutError): void {\n  if (err instanceof NetworkError) {\n    console.log(`HTTP ${err.statusCode}`);  // statusCode only on NetworkError\n  } else {\n    console.log(`Timed out after ${err.timeoutMs}ms`);\n  }\n}\n\n// Custom type predicate\nfunction isUser(val: unknown): val is { id: number; name: string } {\n  return typeof val === \"object\" && val !== null && \"id\" in val;\n}"},
              {"level":"intermediate","q":"20. 'readonly' ne yapar ve test otomasyonunda ne zaman kullanılmalıdır?","a":"readonly, bir özelliğin başlatıldıktan sonra yeniden atanmasını önler. Tip seviyesinde derleme-zamanı bir garantidir; `Object.freeze()` ile birleştirildiğinde runtime'da da çalışır. Test otomasyonunda readonly en önemli olduğu yerler: page object locator'ları (selector'lar construction'dan sonra asla değişmemeli), config nesneleri (testlerin paylaşılan config'i değiştirmesini önle), fixture'lara geçirilen ortam URL'leri ve credential'lar, ve factory'ler tarafından oluşturulan test data nesneleri (testler test'ler-arası kirlenmeyi önlemek için değiştirilemez veri almalı). `Readonly<T>`, eşdeğer utility tipidir — interface'i yeniden yazmadan mevcut bir tipin her özelliğini readonly yapar."},
              {"level":"intermediate","q":"21. String veya number kabul eden ve aynı tipi döndüren bir fonksiyonu nasıl doğru tiplendirilirsiniz?","a":"Function overload kullan — fonksiyon imzasını farklı parametre/dönüş kombinasyonlarıyla birden fazla kez bildir, sonra daha geniş bir tiple tek bir implementasyon sağla. Çağıran sadece overload imzalarını görür. Overload olmadan `string | number` döndürürsün ve çağıranlar bir string geçirip açıkça bir string geri bekleseler dahi her zaman daraltma yapmaları gerekir. Test otomasyonunda overload'lar `parseId(string):string` ve `parseId(number):number` gibi utility fonksiyonlarda, veya hem page locator'ları hem string selector'ları kabul eden yardımcılarda görünür.","code":"function parseId(value: string): string;\nfunction parseId(value: number): number;\nfunction parseId(value: string | number): string | number {\n  if (typeof value === \"string\") return value.trim();\n  return Math.floor(value);\n}\nconst s = parseId(\"  abc  \");  // type: string\nconst n = parseId(3.7);        // type: number"},
              {"level":"intermediate","q":"22. Discriminated union nedir ve test sonuç durumlarını modellemek için nasıl kullanılır?","a":"Discriminated union, her üyenin TypeScript'in dallar içinde tipi daraltmak için kullandığı paylaşılan bir literal özelliğe (discriminant) sahip olduğu bir union tiptir. Test otomasyonunda sonuca bağlı olarak farklı verisi olan durumları mükemmel şekilde modeller — geçen bir testin bir süresi vardır, başarısız bir testin error ve stacktrace'i vardır, atlanan bir testin bir sebebi vardır. Discriminated union'lar olmadan, tip içinde her zaman mevcut olan opsiyonel özellikler (`error?: string`) kullanırsın, bu da geçen bir testte `result.error.message`'a erişmeyi mümkün kılar. Discriminated union'larla compiler bunu derleme zamanında tamamen önler.","code":"type TestResult =\n  | { status: \"pass\"; durationMs: number }\n  | { status: \"fail\"; error: string; stackTrace: string }\n  | { status: \"skip\"; reason: string };\nfunction report(r: TestResult) {\n  if (r.status === \"pass\") console.log(r.durationMs);\n  else if (r.status === \"fail\") console.log(r.error);\n  else console.log(r.reason);\n}"},
              {"level":"intermediate","q":"23. Playwright'tın TestFixtures interface'ini özel fixture'lar için uygun TypeScript tipleriyle nasıl genişletirsiniz?","a":"`test.extend<MyFixtures>()` kullan, MyFixtures senin tanımladığın bir interface'dir. MyFixtures'taki her özellik, test fonksiyonlarında tam autocomplete ile mevcut tipli bir fixture olur. Tipli test nesnesini bir fixtures dosyasından export et ve tüm test dosyalarında Playwright'ın yerleşik test'i yerine onu import et. Interface'te olmayan bir fixture adı kullanırsan compiler hata verir. Bir fixture'ın tipini değiştirmek, suite boyunca tüm bozuk kullanımları anında gösterir — bu, büyük Playwright suite'lerini sürdürülebilir kılan TypeScript desenidir.","code":"import { test as base } from \"@playwright/test\";\nimport { LoginPage } from \"../pages/LoginPage\";\ninterface MyFixtures { loginPage: LoginPage }\nexport const test = base.extend<MyFixtures>({\n  loginPage: async ({ page }, use) => { await use(new LoginPage(page)); }\n});\n// In test files: import { test } from \"./fixtures\""},
              {"level":"intermediate","q":"24. 500 Playwright testiniz var ve CI'da tsc 45 saniye sürüyor. Bunu nasıl düzeltirsiz?","a":"Yavaş tip kontrolü bir mimari sorunudur. Etkiye göre sıralı çözümler: (1) `tsc --noEmit`'i testlerden ayrı çalıştır — Playwright'ın kendi transform'u var; tip kontrolü ve test koşumu paralel CI job'ları olarak çalışır. (2) `tsBuildInfoFile` ile `incremental: true`'yu etkinleştir — değişmemiş dosyalar sonraki koşumda atlanır. (3) Monorepo'lar için TypeScript proje referanslarını kullan — her paket bağımsız derlenir ve sonuçlar cache'lenir. (4) `skipLibCheck: true`'yu etkinleştir — node_modules'teki tanımlama dosyalarının tip kontrolünü atlar. (5) Büyük union tiplerinden ve derin iç içe geçmiş generic'lerden kaçın — en yaygın yavaş çıkarım sebepleridir. En yavaş tipleri bulmak için `@typescript/analyze-trace` kullan.","code":"{\n  \"compilerOptions\": {\n    \"incremental\": true,\n    \"tsBuildInfoFile\": \".tsbuildinfo\",\n    \"skipLibCheck\": true\n  }\n}\n# CI: parallel jobs\n# job1: npx tsc --noEmit\n# job2: npx playwright test"},
              {"level":"intermediate","q":"25. Partial<T> ne yapar ve bir test verisi factory'sinde nasıl kullanırsınız?","a":"`Partial<T>`, T'nin her özelliğini opsiyonel yapar — her özelliğe manuel olarak ? eklemeye eşdeğerdir. Ana test otomasyonu kullanım örneği factory desenidir: tam bir varsayılan nesne tanımla, çağıranların sadece farklı olanı belirtmesi için `Partial<User>` override'ları kabul et. Partial olmadan çağıranlar sadece bir alan ilgili olsa dahi her alanı sağlamak zorunda kalırdı. Bu, ayrıntı olmadan Java'nın builder deseninin TypeScript eşdeğeridir. Spread `{ ...defaults, ...overrides }` ile birleştirildiğinde temiz bir birleştirme verir. `Required<T>` tersidir — tüm opsiyonel işaretçileri kaldırır ve her özelliği zorunlu yapar.","code":"const defaultUser: User = { id: 1, email: \"user@test.com\", role: \"viewer\", verified: true };\nfunction createUser(overrides: Partial<User> = {}): User {\n  return { ...defaultUser, ...overrides };\n}\nconst admin = createUser({ role: \"admin\" });\nconst unverified = createUser({ verified: false });"},
              {"level":"intermediate","q":"26. satisfies operatörü ne yapar ve tip belirtmeden (as) nasıl farklıdır?","a":"satisfies operatörü (TS 4.9+), bir değerin bir tipe UYDUĞUNU, çıkarılan tipi GENİŞLETMEDEN doğrular. Bir tip belirtme (as) tipi zorlar ve belirli çıkarılan bilgiyi kaybeder. satisfies her iki faydayı da korur: compiler değerin tipe uyduğunu kontrol eder VE çıkarılan tip mümkün olduğunca belirli kalır. Test otomasyonunda satisfies en kullanışlı olduğu yer config nesneleridir — config şeklinin compiler doğrulamasını istersin ama aynı zamanda downstream autocomplete için literal URL tiplerini korumak istersin. Java analojisi: as, kontrolsüz bir cast `(User)obj` gibidir; satisfies, orijinal statik tipi de koruyan kontrollü bir cast gibidir.","code":"type EnvConfig = Record<string, string>;\n// With as — type widens, literals lost:\nconst e1 = { staging: \"https://staging.app.com\" } as EnvConfig;\n// e1.staging is: string\n// With satisfies — validated AND literals kept:\nconst e2 = { staging: \"https://staging.app.com\" } satisfies EnvConfig;\n// e2.staging is: \"https://staging.app.com\""},
              {"level":"intermediate","q":"27. Index signature nedir ve test framework'ünde { [key: string]: string } ne zaman kullanılır?","a":"Bir index signature, bir tipin tutarlı bir değer tipiyle herhangi sayıda özelliğe sahip olmasına izin verir. `{ [key: string]: string }`, herhangi bir string anahtarın bir string değere eşlendiği anlamına gelir — genel bir sözlük. Test otomasyonunda: HTTP header map'leri, anahtarları derleme zamanında bilinmeyen ortam değişkeni koleksiyonları, query parametre map'leri. Sınırlama: bir index signature ile TÜM özellikler değer tipiyle eşleşmelidir, böylece tipli bilinen özellikleri catch-all ile karıştıramazsın. Daha temiz bir alternatif olarak `Record<string, string>` kullan — eşdeğerdir ve daha okunaklıdır.","code":"interface Headers { [header: string]: string }\nconst h: Headers = { Authorization: \"Bearer xyz\", \"Content-Type\": \"application/json\" };\ntype QueryParams = Record<string, string | number>;\nconst p: QueryParams = { page: 1, search: \"alice\" };"},
              {"level":"intermediate","q":"28. Jest'te TypeScript ile fetch'i mock'luyorsunuz. any kullanmadan mock'u nasıl tiplendirilirsiniz?","a":"`jest.mocked(fn)` (TS 4.7+) veya `jest.MockedFunction<typeof fn>` kullanarak tam tipli bir mock al. `jest.Mocked<T>`, orijinal metod imzalarını korurken her metodu `jest.Mock` ile değiştirir. Doğru tipleme olmadan `mockResolvedValue` her şeyi kabul eder ve mock'unun gerçek implementasyonun tipiyle eşleştiği garantisini kaybedersin. Her zaman gerçek modülü import et, sonra `(fetch as any).mockResolvedValue()` yazmak yerine `jest.mocked()` ile sarmala. Compiler, yanlış dönüş tipiyle bir metodu mock'lamaya çalışırsan yakalar.","code":"import { fetchUser } from \"../api/userApi\";\nimport type { User } from \"../types\";\njest.mock(\"../api/userApi\");\nconst mockFetchUser = jest.mocked(fetchUser);\ntest(\"returns user\", async () => {\n  const fakeUser: User = { id: 1, name: \"Alice\", role: \"admin\" };\n  mockFetchUser.mockResolvedValueOnce(fakeUser); // type-checked\n});"},
              {"level":"intermediate","q":"29. Exclude<T, U> nedir ve test otomasyonunda ne zaman kullanılır?","a":"`Exclude<T, U>`, union T'den U'ya atanabilir tüm üyeleri kaldırarak bir tip üretir. `Extract<T, U>`'nun tamamlayıcısıdır. Test otomasyonunda: tüm test durumlarının bir union'ı var ama sadece geçmeyen durumları tutabilen bir değişkene ihtiyacın var — `Exclude<TestStatus, \"pass\">`, `\"fail\" | \"skip\" | \"blocked\"` verir. Audit alanları olmadan test verisi oluştururken bir interface'den belirli anahtarları hariç tutmak için mapped type'larda da kullanışlıdır. Java analojisi: derleme zamanında sıfır runtime maliyetiyle bir listeyi tipe göre filtrelemek gibi.","code":"type TestStatus = \"pass\" | \"fail\" | \"skip\" | \"blocked\";\ntype FailureStatus = Exclude<TestStatus, \"pass\">;\n// \"fail\" | \"skip\" | \"blocked\"\nfunction analyzeFailure(status: FailureStatus): string {\n  return \"Test did not pass: \" + status;\n}\nanalyzeFailure(\"fail\");  // OK\nanalyzeFailure(\"pass\");  // Compile Error"},
              {"level":"intermediate","q":"30. as const nedir ve test yapılandırması ve seçici sabitleriyle nasıl yardımcı olur?","a":"`as const` belirtmesi, TypeScript'e mümkün olan en belirli, dar tipi çıkarmasını söyler: string özellikler string değil literal tipler olur, nesne readonly olur. `as const` olmadan, `const BROWSERS = [\"chromium\", \"firefox\"]` tipi `string[]`'dir — TypeScript değerleri genişletir. `as const` ile tip `readonly [\"chromium\", \"firefox\"]` olur ve union'ı `typeof BROWSERS[number]` ile çıkarabilirsin. Test otomasyonunda `as const`, ortam URL map'leri, izin verilen tarayıcı listeleri, test tag sabitleri ve HTTP metod map'leri için gereklidir. Sabit kümeler için tam enum'ların hafif alternatifidir.","code":"const BROWSERS = [\"chromium\", \"firefox\", \"webkit\"] as const;\ntype Browser = typeof BROWSERS[number]; // \"chromium\" | \"firefox\" | \"webkit\"\nconst URLS = { staging: \"https://staging.app.com\", prod: \"https://app.com\" } as const;\ntype EnvKey = keyof typeof URLS;        // \"staging\" | \"prod\""},
              {"level":"intermediate","q":"31. Utility type'lar nedir ve en az dört tanesi için somut otomasyon örnekleri verin?","a":"Utility type'lar, mevcut tipleri dönüştüren yerleşik generic tiplerdir. Test otomasyonunda en kullanışlı olanlar: `Partial<T>` — tüm özellikleri opsiyonel yapar, config override'ları ve test data factory'leri için sadece değişeni belirtmek üzere kullanılır. `Pick<T,K>` — belirli özellikleri seçer, tam bir kullanıcı interface'inden sadece-auth fixture tipleri oluşturmak için kullanışlıdır. `Omit<T,K>` — özellikleri kaldırır, şifreler olmadan güvenli fixture tipleri oluşturmak için kullanışlıdır. `Record<K,V>` — tipli key-value map, ortam URL map'leri veya tarayıcı timeout config'leri için kullanılır. `Readonly<T>` — değişmez test config ve fixture verisi için bir tipi dondurur. `ReturnType<F>` ve `Awaited<ReturnType<F>>` — async fonksiyonların çözümlenmiş dönüş tipini çıkarır, fetch edilmiş veri tutan değişkenleri tiplemek için kullanışlıdır.","code":"type PartialConfig  = Partial<TestConfig>;                          // for overrides\ntype AuthOnly       = Pick<User, \"email\" | \"password\" | \"role\">;    // for login tests\ntype SafeUser       = Omit<User, \"password\">;                       // no credentials\ntype BrowserMap     = Record<Browser, number>;                       // { chromium: 30000, ... }\ntype FetchedUser    = Awaited<ReturnType<typeof fetchUser>>;         // resolved type"},
              {"level":"intermediate","q":"32. TypeScript'te olası hata durumlarıyla async fonksiyonlar nasıl doğru şekilde tiplendirilir?","a":"TypeScript'in yerleşik bir Result/Either tipi yoktur, ama bunu açıkça modelleyebilirsin. Üç ana desen: (1) Union dönüş tipi — `Promise<Data | null>` veya `Promise<{ data: T } | { error: string }>`, çağıranları her iki durumu da ele almaya zorlar. (2) Tipli exception'lar — özel hata class'ları bildir ve tutarlı kullan; çağıranlar instanceof ile kontrol edebilir. (3) Generic Result tipi — `type Result<T, E = Error> = { ok: true; data: T } | { ok: false; error: E }`, `ok` boolean'ının type guard olduğu bir discriminated union. Desen 3 en açık olanıdır ve büyük Playwright framework'lerinde popülerdir. Async fonksiyon dönüş tiplerini her zaman çıkarıma güvenmek yerine açıkça `Promise<T>` olarak belirt — bu, kontratı tüm çağıranlara açık kılar.","code":"type Result<T, E extends Error = Error> =\n  | { ok: true;  data:  T }\n  | { ok: false; error: E };\n\nasync function fetchUser(id: number): Promise<Result<User>> {\n  try {\n    const res = await fetch(`/api/users/${id}`);\n    if (!res.ok) return { ok: false, error: new Error(`HTTP ${res.status}`) };\n    return { ok: true, data: await res.json() as User };\n  } catch (e) {\n    return { ok: false, error: e as Error };\n  }\n}"},
              {"level":"intermediate","q":"33. Mapped type'lar nedir ve bir test framework'ünde nasıl kullanırsınız?","a":"Mapped type'lar, mevcut bir tipin anahtarları üzerinde yineleme yapar ve her özelliği dönüştürerek yeni bir tip üretir. Syntax: `{ [K in keyof T]: NewType }`. Bir test framework'ünde mapped type'lar şunlar için kullanışlıdır: form doğrulama hata tipleri oluşturmak (`{ [K in keyof Form]: string | null }` — alan başına bir hata yuvası), her metodu bir Jest spy ile değiştiren mock/spy wrapper tipleri oluşturmak, env-var parse'ı için bir config interface'inin serileştirilmiş string versiyonlarını üretmek, ve varsayılanlı-kısmi yardımcılar inşa etmek. Mapped type'lar çoğu yerleşik utility tipinin temelidir (Partial, Readonly, Required, Record, TypeScript'in lib'inde hepsi mapped type olarak implemente edilmiştir).","code":"// Form error type — one validation message per field\ntype FormErrors<T> = { [K in keyof T]: string | null };\ninterface LoginForm { email: string; password: string; rememberMe: boolean }\ntype LoginErrors = FormErrors<LoginForm>;\n// { email: string|null; password: string|null; rememberMe: string|null }\n\n// Serialized env-vars — all values become strings\ntype EnvVarMap<T> = { [K in keyof T]: string };"},
              {"level":"intermediate","q":"34. tsconfig.json'da 'strict' modu etkinleştirmek ne yapar ve test otomasyonu için neden önemlidir?","a":"`strict: true`, bir grup sıkılık kontrolünü eşzamanlı olarak etkinleştirir: noImplicitAny (parametreler sessizce any olamaz), strictNullChecks (null ve undefined kendi tipleridir — açıkça ele almalısın), strictFunctionTypes, strictBindCallApply, strictPropertyInitialization ve noImplicitThis. Test otomasyonu için strictNullChecks en etkili olanıdır — locator'ların element bulamayabileceği, API yanıtlarının null olabileceği veya opsiyonel config değerlerinin undefined olabileceği durumları ele almanı zorlar. strict modu olmadan, TypeScript çok izin vericidir ve önlemesi gereken runtime bug'larının çoğu yine de oluşur. Yeni Playwright projelerine her zaman strict: true ile başla. Legacy JS-to-TS geçişlerinde strict flag'lerini kademeli olarak etkinleştir."},
              {"level":"intermediate","q":"35. Büyük bir Playwright framework'ünde TypeScript tiplerini nasıl yapılandırırsınız?","a":"Ölçeklenebilir bir yapı tipleri sorumluluğa göre ayırır: (1) Paylaşılan interface'ler ve type alias'lar için `src/types/` veya `types/` dizini — domain'e göre böl: `user.types.ts`, `api.types.ts`, `config.types.ts`. (2) String enum'lar için `src/enums/` (Browser, Environment, TestStatus). (3) Her page object dosyası, class'ının yanında kendi interface'ini export eder (ILoginPage + LoginPage). (4) Bir barrel dosyası (`types/index.ts`) her şeyi yeniden export eder, böylece import'lar temiz kalır. (5) Playwright'ın TestFixtures interface'ini özel fixture tipleriyle genişletmek için `playwright.d.ts` veya `fixtures.d.ts`. (6) Tipleri asla test dosyalarına koyma — paylaşılan katmana ait olmalılar. (7) Sadece-tip import'lar için `import { ... }` değil `import type { ... }` kullan — derleme zamanında kaldırılırlar ve circular dependency oluşturmazlar.","code":"// types/index.ts — barrel exports\nexport type { User, AdminUser } from \"./user.types\";\nexport type { ApiResponse, ApiError } from \"./api.types\";\nexport { TestStatus, Browser, Environment } from \"../enums\";\n\n// In test file:\nimport type { User } from \"../types\";             // type-only import\nimport { TestStatus, Browser } from \"../types\";   // value import (enum)"},
              // ── ADVANCED ────────────────────────────────────────
              {"level":"advanced","q":"36. Koşullu tipler nedir ve iç tipleri çıkarmak için infer nasıl kullanılır?","a":"Koşullu tipler `T extends U ? X : Y` formuna sahiptir — T, U'ya atanabilirse tip X'tir, değilse Y'dir. infer anahtar kelimesi, extends clause'u içinde bir tip değişkeni yakalar ve bir wrapper'ın içindeki tipi çıkarmana izin verir. Yaygın kullanımlar: `Awaited<T>` (TS 4.5'ten beri yerleşik) `Promise<T>`'nin çözümlenmiş tipini çıkarır; `ReturnType<F>` fonksiyon dönüş tiplerini çıkarır. İleri seviye framework'ler, factory fonksiyon dönüş tiplerinden fixture tiplerini çıkarmak için koşullu tipleri kullanır, böylece tüm fixture sistemi otomatik-tipli olur. Java'da eşdeğeri yoktur — bu sadece TypeScript'e özgü bir yetenektir.","code":"type Item<T> = T extends Array<infer I> ? I : never;\ntype Str = Item<string[]>;  // string\ntype ReturnOf<F> = F extends (...args: any[]) => infer R ? R : never;\ntype R = ReturnOf<() => Promise<User>>;  // Promise<User>"},
              {"level":"advanced","q":"37. Type-safe API endpoint path'leri üretmek için template literal tiplerini nasıl kullanırsınız?","a":"Template literal tipler (TS 4.1+), template literal syntax'ı kullanarak diğer tiplerden yeni string literal tipler inşa eder. Bu, derleme-zamanında doğrulanmış API path'lerini mümkün kılar. Test otomasyonunda: path'lerin kaynak adlarından oluşturulduğu tipli API client'ları (`/api/` + string), module:action kuralı kullanan tipli event adı sistemleri, ve HTTP header adı union'ları. Bu, sadece test runtime'ında ortaya çıkacak, derleme zamanında değil, bir API endpoint string'indeki yaygın yazım hatası bug'ını önler.","code":"type Method = \"get\" | \"post\" | \"put\" | \"delete\";\ntype ApiPath = `/api/${string}`;\ntype ResourcePath<T extends string> = `/api/${T}` | `/api/${T}/${number}`;\ntype UserPath = ResourcePath<\"users\">;  // \"/api/users\" | \"/api/users/123\"\ntype AppEvent = `${\"auth\" | \"test\"}:${\"start\" | \"end\" | \"error\"}`;"},
              {"level":"advanced","q":"38. 20 kişilik ekibiniz API yanıt tipleri için sürekli any yazıyor. Hangi mimari çözümü uygularsınız?","a":"Bu birden fazla katman gerektirir: (1) `@typescript-eslint/no-explicit-any` ESLint kuralını error'a ayarla — lint'i ve CI pipeline'ını başarısız eder. (2) Merkezi tipli API client katmanı — tüm API çağrıları, yanıt tiplerinin her zaman sağlandığı genel bir `apiRequest<T>(method, path): Promise<T>` fonksiyonundan geçer. (3) OpenAPI spec'inden `openapi-typescript` kullanarak otomatik üretilen tipler — tipler backend kontratıyla otomatik olarak senkronize kalır. (4) API sınırlarında Zod schema doğrulaması — runtime şeklini doğrular VE eşzamanlı olarak TypeScript tiplerini çıkarır. (5) no-any gate'li PR review checklist'i. Bunları birleştirmek, any yazmanın hem bir linting hatası HEM mimari olarak gereksiz olduğu bir sistem oluşturur.","code":"async function apiGet<T>(path: string): Promise<T> {\n  const res = await fetch(path);\n  if (!res.ok) throw new Error(\"HTTP \" + res.status);\n  return res.json() as T;  // one assertion in the typed layer\n}\nconst users = await apiGet<User[]>(\"/api/users\");\nconst user  = await apiGet<User>(\"/api/users/1\");"},
              {"level":"advanced","q":"39. Modül genişletme (module augmentation) nedir ve process.env'e tip eklemek için nasıl kullanılır?","a":"Modül genişletme, bir modülün kaynak dosyalarını değiştirmeden mevcut tip bildirimlerine özellik eklemeni sağlar. `declare module \"kütüphane-adı\"` kullanarak modülün namespace'ini yeniden açan bir .d.ts dosyası oluşturur ve özellik eklersin. Playwright otomasyonunda en önemli kullanım örneği: process.env'i genişletmek — TypeScript onu senin belirli env değişkenlerin hakkında bilgisi olmadan `{ [key: string]: string | undefined }` olarak tipler. Modül genişletmeyle BASE_URL, API_KEY, CI_ENVIRONMENT'ı belirli tipli özellikler olarak bildirirsin — bildirilmemiş bir env değişkenine erişmek, runtime'da sessiz bir undefined yerine bir derleme hatası olur.","code":"// env.d.ts\ndeclare namespace NodeJS {\n  interface ProcessEnv {\n    BASE_URL: string;\n    API_KEY: string;\n    CI_ENVIRONMENT?: \"staging\" | \"production\";\n  }\n}\nconst baseUrl = process.env.BASE_URL;        // string\nconst unknown = process.env.UNKNOWN_KEY;     // Compile Error!"},
              {"level":"advanced","q":"40. TypeScript'te test verisi için type-safe builder pattern nasıl uygulanır?","a":"TypeScript'te builder deseni, akıcı bir API için method chaining'i generic'lerle birleştirir. Her builder metodu chaining için this döndürür ve build() varsayılanları uygulanmış tamamlanmış nesneyi döndürür. Test otomasyonunda builder'lar, test başına test verisi oluşturmanın ayrıntılı tekrarının yerini okunabilir, type-safe akıcı bir API ile alır. Java'nın builder desenine (Lombok @Builder veya manuel builder'lar) direkt benzer ama ayrıntı olmadan. Compiler, User'da var olmayan bir özellik ayarlarsan yakalar.","code":"class UserBuilder {\n  private data: Partial<User> = {};\n  withEmail(email: string): this { this.data.email = email; return this; }\n  withRole(role: User[\"role\"]): this { this.data.role = role; return this; }\n  build(): User {\n    return { id: 1, email: \"default@test.com\", role: \"viewer\", verified: true, ...this.data };\n  }\n}\nconst admin = new UserBuilder().withEmail(\"a@test.com\").withRole(\"admin\").build();"},
              {"level":"advanced","q":"41. 200 Playwright JS test dosyasını 6 ayda TypeScript'e taşımanız gerekiyor. Stratejiniz nedir?","a":"Aşama 1: tsconfig'de `allowJs: true` ve `checkJs: false` ayarla — TypeScript hem .js hem .ts dosyalarını derler, JS dosyaları henüz tip kontrolünden geçmez. Dosyaları bir dizin birer birer .js'den .ts'ye yeniden adlandır. Henüz geçirilmemiş dosyaların başına `// @ts-nocheck` ekle. Önce page object dosyalarını dönüştür — birçok test tarafından kullanılırlar, bu yüzden onları bir kez tiplemek tüm test dosyalarına fayda sağlar. Aşama 2: başlangıçta `noImplicitAny: false` ve `strict: false`'u etkinleştir. Aşama 3: sıkılığı üç aylık olarak yükselt — önce noImplicitAny'yi, sonra strictNullChecks'i, sonra strict: true'yu etkinleştir. İlk günden itibaren, susturmalarla dahi olsa, regresyonları anında yakalamak için CI gate olarak `tsc --noEmit` ekle.","code":"// Phase 1 tsconfig:\n{ \"allowJs\": true, \"checkJs\": false, \"strict\": false }\n// Phase 3 tsconfig:\n{ \"allowJs\": false, \"strict\": true }\n# CI gate from day 1:\nnpx tsc --noEmit"},
              {"level":"advanced","q":"42. TypeScript proje referansları nedir ve bir Playwright monorepo'sunda nasıl kullanılır?","a":"TypeScript proje referansları (TS 3.0+), büyük bir kod tabanını bağımsız-tipli, bağımsız-derlenen alt projelere böler. Her alt proje, tsconfig.json'unda `composite: true`'ya sahiptir ve diğer projeler ona references dizisi aracılığıyla referans verir. Faydalar: incremental build'ler (sadece değişen paketler yeniden derlenir), paralel tip kontrolü ve uygun izolasyon. Bir Playwright monorepo'sunda: packages/shared-types (interface'ler, enum'lar), packages/page-objects (POM class'ları, shared-types'a referans verir), packages/e2e-tests (test dosyaları, page-objects'a referans verir). Root tsconfig hepsini references olarak listeler. `tsc --build` bağımlılık sırasında derler.","code":"// packages/page-objects/tsconfig.json:\n{ \"compilerOptions\": { \"composite\": true }, \"references\": [{ \"path\": \"../shared-types\" }] }\n// root tsconfig.json:\n{ \"files\": [], \"references\": [\n  { \"path\": \"packages/shared-types\" },\n  { \"path\": \"packages/page-objects\" },\n  { \"path\": \"packages/e2e-tests\" }\n]}\nnpx tsc --build"},
              {"level":"advanced","q":"43. Branded tipler nedir ve test verisinde kullanıcı ID'lerinin ürün ID'leriyle karışmasını nasıl önlerler?","a":"TypeScript yapısal tipleme kullanır — `type UserId = number` ve `type ProductId = number` özdeştir, bu yüzden UserId bekleyen bir fonksiyon sessizce ProductId'yi de kabul eder. Branded tipler, sadece tip seviyesinde var olan bir hayalet özellik ekler: `type UserId = number & { readonly __brand: \"UserId\" }`. Şimdi TypeScript, runtime değerleri sadece bir number olsa dahi UserId ve ProductId'yi farklı olarak ele alır. Değer oluşturmak açık bir constructor fonksiyonu (brand fonksiyonu) gerektirir. Bu, `deleteProduct(userId)`'nin derlenmesini önler — ID karışıklığını veriyi bozmadan önce geliştirme zamanında yakalar.","code":"type UserId    = number & { readonly __brand: \"UserId\" };\ntype ProductId = number & { readonly __brand: \"ProductId\" };\nconst toUserId    = (n: number): UserId    => n as UserId;\nconst toProductId = (n: number): ProductId => n as ProductId;\nasync function deleteProduct(id: ProductId): Promise<void> {}\nconst uid = toUserId(42);\nawait deleteProduct(uid);  // Compile Error — UserId is not ProductId"},
              {"level":"advanced","q":"44. TypeScript strict CI gate'lerini nasıl kurarsınız ve legacy kodda strict ilk kez etkinleştirildiğinde ne olur?","a":"CI gate kurulumu: ayrı bir CI adımı olarak `npx tsc --noEmit` ekle — `--noEmit` çıktı dosyaları yazmadan tam tip kontrolü yapar. tsc, herhangi bir tip hatasında 1 exit code'uyla çıkar, pipeline'ı başarısız eder. Playwright için ayrıca `npx playwright test`'i ayrı bir adım olarak çalıştır, çünkü Playwright'ın kendi transform'u var. Legacy kodda strict'i etkinleştirmek tipik olarak yüzlerce hata ortaya çıkarır: tipsiz parametrelerde noImplicitAny, kontrol edilmeden null değerlere erişilen yerlerde strictNullChecks hataları, class'larda strictPropertyInitialization. Pratik yaklaşım: mevcut hatalara otomatik `@ts-expect-error` susturmaları eklemek için ts-migrate kullan, sonra sprint'ler boyunca yinelemeli olarak düzelt. Hataları susturmak için asla any kullanma — bunun yerine unknown ve type guard'lar kullan.","code":"# CI pipeline:\n- name: Type check\n  run: npx tsc --noEmit\n- name: Run tests\n  run: npx playwright test\n\n# Maximum strictness tsconfig:\n{\n  \"compilerOptions\": {\n    \"strict\": true,\n    \"noUncheckedIndexedAccess\": true,\n    \"noImplicitOverride\": true\n  }\n}"},
              {"level":"advanced","q":"45. TypeScript'te covariance ve contravariance'ı açıklayın. Bu Page Object metot override'ını nasıl etkiler?","a":"Covariance, bir subtype'ın bir supertype'ı yerine geçebileceği anlamına gelir — dönüş tipleri kovaryanttır (bir override eden metod daha belirli bir tip döndürebilir). Contravariance, parametre tiplerinin daha geniş olması veya eşit kalması gerektiği anlamına gelir — bir override eden metod parametre tiplerini DARALTMAMALIDIR. strictFunctionTypes ile (strict modda) TypeScript, fonksiyon parametreleri için contravariance'ı zorlar. Bir Page Object hiyerarşisinde: `BasePage.navigate(url: string)`, `LoginPage.navigate(url: \"login\" | \"register\")` ile override edilirse, TypeScript hata verir çünkü LoginPage.navigate daha kısıtlayıcıdır ve tüm string'leri kabul etmez. Düzeltme: alt sınıflarda parametre tiplerini eşit veya daha geniş tut. Java, metod override için aynı Liskov Substitution Principle'ı takip eder.","code":"class BasePage {\n  async navigate(url: string): Promise<void> {}\n}\n// WRONG — narrowing parameter (contravariance violation):\n// class LoginPage extends BasePage {\n//   override async navigate(url: \"login\" | \"register\"): Promise<void> {} // Error!\n// }\n// CORRECT — same parameter type:\nclass AuthPage extends BasePage {\n  override async navigate(url: string): Promise<void> {\n    await super.navigate(url);\n  }\n}"},
              {"level":"advanced","q":"46. TypeScript tipleriyle düzgün şekilde bir plugin/middleware sistemi nasıl uygulanır?","a":"Tipli bir plugin sistemi, bir name string'i, opsiyonel bağımlılıklar string dizisi ve application context'i alan bir install metoduyla generic bir `Plugin<T extends object>` interface'i kullanır. Uygulama bir `Map<string, Plugin<App>>` registry'si tutar. TypeScript, install()'un doğru context tipini aldığını garanti eder. Playwright için: her plugin'in beforeAll/afterAll/beforeEach hook'larını doğru tiplemeyle kaydedebileceği plugin olarak test hook'ları. Bu desen Playwright'ın kendi fixture sisteminde ve testing-library gibi test framework plugin'lerinde görünür. Java analojisi: Java SPI (ServiceLoader) desenine benzer ama runtime keşfi yerine derleme zamanında çözümlenir.","code":"interface Plugin<T extends object = object> {\n  name: string;\n  dependencies?: string[];\n  install(context: T): void | Promise<void>;\n}\nclass App {\n  private plugins = new Map<string, Plugin<App>>();\n  use(plugin: Plugin<App>): this {\n    this.plugins.set(plugin.name, plugin);\n    return this;\n  }\n}"},
              {"level":"advanced","q":"47. unknown ile never arasındaki fark nedir ve her biri gerçek test otomasyon kodunda ne zaman ortaya çıkar?","a":"unknown, any'nin type-safe alternatifidir — herhangi bir değeri kabul eder ama kullanmadan önce daraltmalısın. never, var olamayan bir değeri temsil eder — boş tip, her zaman fırlatan veya sonsuza kadar döngüye giren fonksiyonların dönüş tipi, ve tüm durumlar kapsandığında bir discriminated union'ı daraltmanın sonucu. Test otomasyonunda: unknown, catch bloklarında yakalanan hataların tipi olarak görünür (strict TS'de try/catch e, unknown'dır), e.message'a erişmeden önce instanceof Error kontrolü yapmanı zorlar. never, discriminated union'lar için exhaustive switch kontrollerinde görünür — tam bir status kontrolünün son else dalı never almalıdır, eksik durumları derleme zamanında yakalar.","code":"function assertNever(val: never, msg = \"Unhandled value\"): never {\n  throw new Error(msg + \": \" + JSON.stringify(val));\n}\nfunction handleStatus(s: TestStatus) {\n  switch (s) {\n    case \"pass\": return \"green\";\n    case \"fail\": return \"red\";\n    case \"skip\": return \"grey\";\n    default: return assertNever(s); // compile error if status added without handler\n  }\n}"},
              {"level":"advanced","q":"48. TypeScript tiplerini Playwright test süitiniz ile backend Express API'nız arasında kopyalamadan nasıl paylaşırsınız?","a":"Üç desen: (1) Paylaşılan npm paketi — tipleri packages/shared-types'a çıkar, özel bir npm registry'ye yayınla veya yerel workspace paketleri kullan (npm/yarn/pnpm workspaces). Hem test suite'i hem API @myorg/shared-types'tan import eder. (2) Sadece tip bildirimleri içeren bir Git submodule'ü — bir paketten daha basit ama versiyonlamak daha zor. (3) Tek doğru kaynak olarak OpenAPI spec — aynı spec dosyasından hem frontend/testler (openapi-typescript) hem backend (openapi-generator) için tipler otomatik üretilir. Desen 3 en sağlamdır çünkü spec eşzamanlı olarak dokümantasyon, kontrat testi temeli ve tip kaynağı olarak hizmet eder. Manuel tip çoğaltması sürdüren takımlar her zaman birbirinden uzaklaşır — otomatik üretim yaklaşımı ölçekte tek güvenli çözümdür.","code":"pnpm workspace setup:\n# pnpm-workspace.yaml\npackages: [\"packages/*\", \"tests/*\", \"backend/*\"]\n# packages/shared-types/src/index.ts\nexport interface User { id: number; email: string; role: Role; }\nexport type Role = \"admin\" | \"viewer\" | \"editor\";\n# tests/e2e/fixtures.ts\nimport type { User } from \"@myorg/shared-types\";"},
              {"level":"advanced","q":"49. TypeScript'in kendisi bir projeye hangi performans sorunlarını getirebilir ve bunları nasıl teşhis edersiniz?","a":"TypeScript performans sorunları derleme zamanı sorunlarıdır — runtime JS özdeştir. Kök sebepler: (1) Çok üyeli büyük union tipleri — TypeScript her kombinasyonu kontrol eder; (2) Derin iç içe geçmiş koşullu tipler veya recursive mapped type'lar; (3) `incremental: true` eksikliği her seferinde tam yeniden derlemeye yol açar; (4) skipLibCheck olmadan rxjs gibi büyük tanımlama dosyalarının birçok import'u. Teşhis: `npx tsc --noEmit --diagnostics` dahil edilen dosyaları, işlenen satırları, kullanılan belleği gösterir; `@typescript/analyze-trace`, Chrome trace viewer'da okunabilir, hangi tip kontrollerinin yavaş olduğunu tam olarak gösteren bir trace dosyası üretir. En üst düzeltmeler: incremental + skipLibCheck'i etkinleştir, proje referanslarını kullan, karmaşık recursive tipleri daha basit alternatiflerle değiştir, pahalı hesaplanmış tipleri cache'lemek için type alias'lar kullan.","code":"# Diagnose slow compilation:\nnpx tsc --noEmit --diagnostics 2>&1\nnpx tsc --noEmit --generateTrace ./ts-trace\n# Then open Chrome and load the trace:\n# chrome://tracing → Load → ./ts-trace/trace.json\n\n# Fix: cache expensive types\ntype AllRoutes = GetRoutes<AppRouter>;  // computed once, reused"},
              {"level":"advanced","q":"50. Playwright testlerinde hiç TypeScript tipi olmayan bir ekibe katılıyorsunuz — sadece any, tiplendirilmemiş fixture'lar ve tsconfig yok. 90 günlük iyileştirme planınız nedir?","a":"Gün 1-7: Denetim aşaması — toplam test dosyası sayısını say, mevcut CI süresini ölç, runtime başarısızlıklarının en büyük kaynaklarını belgele (undefined özellik erişimi, yanlış API yanıt varsayımları). Sadece görünürlük kazanmak için `allowJs:true, noEmit:true, strict:false` ile tsconfig.json ekle. Gün 8-30: Altyapı — tsconfig ekle, linting pipeline'ını düzelt, CI gate olarak `tsc --noEmit` ekle (başarısızlıklar başlangıçta ts-ignore ile susturulur). .js'yi .ts'ye yeniden adlandır. Her testte kullanıldıkları için önce tüm Page Object'leri tiple. Gün 31-60: Sistematik tipleme — noImplicitAny'yi etkinleştir, hataları class class düzelt. OpenAPI spec'inden API yanıt interface'lerini tiple. any susturmalarını kaldır. Gün 61-90: Sıkılığı yükselt — strictNullChecks'i etkinleştir, null ele almayı düzelt, tam strict:true'yu etkinleştir. Yeni any tanıtımlarını önleyen bir PR gate'i ekle. Kutla: tip hatalarından runtime başarısızlıkları ölçülebilir şekilde düşer.","code":"Week 1 tsconfig (audit mode):\n{ \"compilerOptions\": { \"allowJs\": true, \"checkJs\": false, \"strict\": false, \"noEmit\": true } }\n\nWeek 8 tsconfig (enforcement mode):\n{ \"compilerOptions\": { \"strict\": true, \"noEmit\": true } }\n\n# CI gate from day 1:\n- run: npx tsc --noEmit || true  # warn only\n# CI gate from week 8:\n- run: npx tsc --noEmit          # fail build on type errors"},
            ],
          },
{
            "type": "heading",
            "content": {
              "en": "☕ If You Know Java: Interview Q Bridge",
              "tr": "☕ Java Biliyorsan: Mülakat Soruları Köprüsü"
            }
          },
          {
            "type": "java-compare",
            "topic": "interface: Structural vs Nominal Typing (Q2 Deep Dive)",
            "why": {
              "en": "Q2 covers interface vs type — but the bigger surprise for Java devs is HOW TypeScript interfaces work. Java uses nominal typing (class must say 'implements'). TypeScript uses structural typing — any object with the right shape satisfies an interface automatically.",
              "tr": "S2 interface vs type'ı kapsar — ama Java geliştiricileri için asıl sürpriz TypeScript interface'lerinin NASIL çalıştığıdır. Java nominal tipleme kullanır (sınıfın 'implements' demesi gerekir). TypeScript yapısal tipleme kullanır — doğru şekle sahip herhangi bir nesne interface'i otomatik olarak karşılar."
            },
            "why_en": "Q2 covers interface vs type — but the bigger surprise for Java devs is HOW TypeScript interfaces work. Java uses nominal typing (class must say 'implements'). TypeScript uses structural typing — any object with the right shape satisfies an interface automatically.",
            "java": "// Java: NOMINAL typing — must explicitly declare\ninterface Clickable {\n    void click();\n}\n\n// MUST say \"implements Clickable\":\nclass Button implements Clickable {\n    public void click() { System.out.println(\"clicked\"); }\n}\n\n// This would NOT satisfy Clickable — no \"implements\":\nclass Link {\n    public void click() { System.out.println(\"link clicked\"); }\n}\n// new Clickable link = new Link(); // Compile error!",
            "typescript": "// TypeScript: STRUCTURAL typing — shape is all that matters\ninterface Clickable {\n  click(): void;\n}\n\n// No \"implements\" needed — has click() → satisfies Clickable!\nclass Button {\n  click() { console.log(\"clicked\"); }\n}\n\nclass Link {\n  click() { console.log(\"link clicked\"); }\n  href = \"/home\";   // extra props are fine\n}\n\n// Both work — structural match is enough:\nfunction doClick(item: Clickable) { item.click(); }\ndoClick(new Button());  // ✅\ndoClick(new Link());    // ✅ — extra href is ignored\n\n// Even plain objects work!\ndoClick({ click: () => console.log(\"inline\") }); // ✅",
            "note": {
              "en": "This is the most important TypeScript concept for Java devs. You rarely write \"implements\" in TS — if the shape matches, it satisfies the interface. Great for mocking in tests: just pass an object with the right methods.",
              "tr": "Bu Java geliştiricileri için en önemli TypeScript kavramıdır. TS'de neredeyse hiç 'implements' yazmıyorsunuz — şekil eşleşirse, interface'i karşılar. Testlerde mock yapmak için harika: sadece doğru metodlara sahip bir nesne iletin."
            },
            "note_en": "This is the most important TypeScript concept for Java devs. You rarely write \"implements\" in TS — if the shape matches, it satisfies the interface. Great for mocking in tests: just pass an object with the right methods."
          },
          {
            "type": "java-compare",
            "topic": "Generics <T>: Java vs TypeScript (Q7 Deep Dive)",
            "why": {
              "en": "Q7 covers generics — the good news: TypeScript generics look almost identical to Java generics. Same <T> syntax, same extends constraints. Key difference: TypeScript adds union types and conditional types that Java doesn't have.",
              "tr": "S7 generic'leri kapsar — iyi haber: TypeScript generic'leri Java generic'lerine neredeyse aynı görünür. Aynı <T> sözdizimi, aynı extends kısıtlamaları. Temel fark: TypeScript Java'nın sahip olmadığı union type'ları ve conditional type'ları ekler."
            },
            "why_en": "Q7 covers generics — the good news: TypeScript generics look almost identical to Java generics. Same <T> syntax, same extends constraints. Key difference: TypeScript adds union types and conditional types that Java doesn't have.",
            "java": "// Java generics — the model TypeScript is based on\ninterface ApiResponse<T> {\n    T getData();\n    int getStatus();\n    boolean isOk();\n}\n\n// Bounded generic (extends):\n<T extends Comparable<T>> T max(T a, T b) {\n    return a.compareTo(b) > 0 ? a : b;\n}\n\n// Generic class:\npublic class Repository<T> {\n    private List<T> items = new ArrayList<>();\n    public void add(T item) { items.add(item); }\n    public List<T> getAll() { return items; }\n}",
            "typescript": "// TypeScript generics — nearly identical syntax!\ninterface ApiResponse<T> {\n  data:   T;       // same as Java getData()\n  status: number;\n  ok:     boolean;\n}\n\n// Bounded generic (extends — same keyword!):\nfunction max<T extends { compareTo(other: T): number }>(\n  a: T, b: T\n): T {\n  return a.compareTo(b) > 0 ? a : b;\n}\n\n// Generic class (same syntax):\nclass Repository<T> {\n  private items: T[] = [];\n  add(item: T): void  { this.items.push(item); }\n  getAll(): T[]       { return this.items; }\n}\n\n// TypeScript bonus — Java doesn't have this:\ntype MaybeNull<T> = T | null;           // union generic\ntype Keys<T> = keyof T;                 // mapped type key\ntype Unwrap<T> = T extends Promise<infer R> ? R : T;  // conditional",
            "note": {
              "en": "If you know Java generics, TypeScript generics will feel instantly familiar. The extra power (union types, infer, conditional types) comes naturally once you are comfortable with the basics.",
              "tr": "Java generic'lerini biliyorsanız TypeScript generic'leri anında tanıdık gelecektir. Ekstra güç (union type'lar, infer, conditional type'lar) temellerle rahat olduğunuzda doğal olarak gelir."
            },
            "note_en": "If you know Java generics, TypeScript generics will feel instantly familiar. The extra power (union types, infer, conditional types) comes naturally once you are comfortable with the basics."
          },
          {
            "type": "java-compare",
            "topic": "readonly vs final — and Readonly<T> utility (Q10 Deep Dive)",
            "why": {
              "en": "Q10 covers readonly — Java developers know 'final' prevents reassignment. TypeScript 'readonly' is the compile-time equivalent. Key additions: Readonly<T> utility type makes every property readonly at once, and 'as const' freezes literal values.",
              "tr": "S10 readonly'i kapsar — Java geliştiricileri 'final'in yeniden atamayı önlediğini bilir. TypeScript 'readonly' derleme zamanı eşdeğeridir. Temel eklemeler: Readonly<T> utility type tüm özellikleri bir anda readonly yapar ve 'as const' literal değerleri dondurur."
            },
            "why_en": "Q10 covers readonly — Java developers know 'final' prevents reassignment. TypeScript 'readonly' is the compile-time equivalent. Key additions: Readonly<T> utility type makes every property readonly at once, and 'as const' freezes literal values.",
            "java": "// Java: final — prevents reassignment\npublic class LoginPage {\n    private final String url;           // must assign in constructor\n    private final Page page;\n\n    public LoginPage(Page page) {\n        this.url  = \"/login\";           // must set here\n        this.page = page;\n    }\n    // this.url = \"/other\"; would be compile error\n\n    // Java has no built-in \"make all fields final\" utility\n    // You manually mark each field final — verbose!\n}",
            "typescript": "// TypeScript: readonly — same guarantee, cleaner syntax\nclass LoginPage {\n  readonly url  = \"/login\";       // like Java final field\n  readonly page: Page;            // must assign in constructor\n\n  constructor(page: Page) {\n    this.page = page;\n    // this.url = \"/other\";  // Compile error!\n  }\n}\n\n// Readonly<T> — make EVERY property readonly at once:\ninterface Config { baseUrl: string; retries: number; }\ntype FrozenConfig = Readonly<Config>;\nconst cfg: FrozenConfig = { baseUrl: \"https://app.com\", retries: 2 };\n// cfg.baseUrl = \"x\";  // Error — no Java equivalent (must mark each field)\n\n// \"as const\" — literal type + readonly (no Java equivalent):\nconst STATUS = [\"PASS\", \"FAIL\", \"SKIP\"] as const;\n// type: readonly [\"PASS\", \"FAIL\", \"SKIP\"]  — values AND type frozen",
            "note": {
              "en": "\"readonly\" = Java \"final\" for fields. \"Readonly<T>\" = automatic final on all fields — no Java equivalent. \"as const\" freezes both the type AND the value — very useful for test status enums.",
              "tr": "\"readonly\" = Java \"final\" alanlar için. \"Readonly<T>\" = tüm alanlarda otomatik final — Java eşdeğeri yok. \"as const\" hem tip hem değeri dondurur — test durumu enum'ları için çok kullanışlı."
            },
            "note_en": "\"readonly\" = Java \"final\" for fields. \"Readonly<T>\" = automatic final on all fields — no Java equivalent. \"as const\" freezes both the type AND the value — very useful for test status enums."
          },
          {
            "type": "error-dictionary",
            "framework": "Playwright TypeScript",
            "errors": [
              {
                "error": "TimeoutError: locator.click: Timeout 30000ms exceeded",
                "fullMessage": "TimeoutError: page.locator('button[type=\"submit\"]').click: Timeout 30000ms exceeded.\nWaiting for selector \"button[type=\\\"submit\\\"]\" to be visible.",
                "cause": {
                  "tr": "Locator hiçbir element bulamadı veya element timeout süresinde tıklanabilir (actionable) olmadı. Nedenler: yanlış selector, element henüz render edilmedi, element başka bir frame içinde.",
                  "en": "The locator matched no element or the element was not actionable within the timeout. Causes: wrong selector, element not yet rendered, element inside a different frame."
                },
                "solution": {
                  "tr": "1) Playwright Inspector ile selectoru doğrula: npx playwright codegen. 2) data-testid attribute ekle ve page.getByTestId() kullan. 3) Timeout'u artır: locator.click({ timeout: 60000 }). 4) Frame içindeyse: page.frameLocator() kullan.",
                  "en": "1) Validate selector with Playwright Inspector: npx playwright codegen. 2) Add data-testid and use page.getByTestId(). 3) Increase timeout: locator.click({ timeout: 60000 }). 4) If inside a frame: use page.frameLocator()."
                },
                "codeWrong": "// YANLIŞ — genel CSS selector, değişime açık\nawait page.locator('button').click();",
                "codeFixed": "// DOĞRU — data-testid ile stabil locator\nawait page.getByTestId('submit-btn').click();\n\n// veya rol + isim ile:\nawait page.getByRole('button', { name: 'Submit' }).click();"
              },
              {
                "error": "Error: strict mode violation: locator resolved to 2 elements",
                "fullMessage": "Error: strict mode violation: locator(\"input\") resolved to 2 elements:\n  1) <input type=\"text\" name=\"username\">\n  2) <input type=\"email\" name=\"email\">",
                "cause": {
                  "tr": "Locator sayfada birden fazla element buldu. Playwright strict modda varsayılan olarak tek bir element bekler.",
                  "en": "The locator matched more than one element. Playwright in strict mode expects exactly one element by default."
                },
                "solution": {
                  "tr": "Daha spesifik selector kullan: getByLabel, getByPlaceholder veya nth(). Ya da all() ile hepsini liste olarak al.",
                  "en": "Use a more specific selector: getByLabel, getByPlaceholder, or nth(). Alternatively use all() to get all matches as a list."
                },
                "codeWrong": "// YANLIŞ — çok genel, birden fazla eşleşiyor\nawait page.locator('input').fill('test@example.com');",
                "codeFixed": "// DOĞRU — etiket ile spesifik element\nawait page.getByLabel('Email address').fill('test@example.com');\n\n// veya nth() ile belirli indeks:\nawait page.locator('input').nth(1).fill('test@example.com');"
              },
              {
                "error": "Error: page has been closed",
                "fullMessage": "Error: page.goto: page has been closed\nCall log:\n  - navigating to \"https://example.com\"",
                "cause": {
                  "tr": "Test bitiminde browser context veya page zaten kapatılmış. Genellikle fixture teardown sırası yanlış veya bir önceki test başarısız olup page'i kapattı.",
                  "en": "The browser context or page was already closed when the action was attempted. Usually caused by incorrect fixture teardown order or a previous test failure closing the page."
                },
                "solution": {
                  "tr": "Playwright fixture'larını doğru kullan — page fixture'ı her test için otomatik oluşturulur ve temizlenir. Worker kapsamlı browser fixture'larında context'in açık olduğundan emin ol.",
                  "en": "Use Playwright fixtures correctly — the page fixture is automatically created and cleaned up per test. For worker-scoped browser fixtures, ensure the context is still open."
                },
                "codeWrong": "// YANLIŞ — page'i manuel kapatıp sonra kullanmaya çalışmak\nawait page.close();\nawait page.goto('/dashboard'); // Error!",
                "codeFixed": "// DOĞRU — fixture'lar sayfa ömrünü yönetir\ntest('dashboard loads', async ({ page }) => {\n  // page otomatik açılır ve test sonunda kapatılır\n  await page.goto('/dashboard');\n  await expect(page).toHaveTitle('Dashboard');\n}); // page burada otomatik kapanır"
              },
              {
                "error": "net::ERR_CONNECTION_REFUSED",
                "fullMessage": "Error: page.goto: net::ERR_CONNECTION_REFUSED at https://localhost:3000\nCall log:\n  - navigating to \"https://localhost:3000\"",
                "cause": {
                  "tr": "Hedef URL'e bağlantı reddedildi. Test çalışmadan önce uygulama başlatılmamış veya port numarası yanlış.",
                  "en": "Connection to the target URL was refused. The application was not started before tests ran, or the port number is wrong."
                },
                "solution": {
                  "tr": "1) Playwright webServer config ile uygulamayı otomatik başlat. 2) baseURL'i playwright.config.ts içinde doğru ayarla. 3) CI'da uygulama başlatma adımının test adımından önce geldiğini kontrol et.",
                  "en": "1) Use Playwright webServer config to auto-start the app. 2) Set baseURL correctly in playwright.config.ts. 3) In CI, verify the app start step runs before the test step."
                },
                "codeWrong": "// YANLIŞ — uygulama başlamadan test çalışıyor\nawait page.goto('http://localhost:3000');",
                "codeFixed": "// DOĞRU — playwright.config.ts\nexport default defineConfig({\n  webServer: {\n    command: 'npm run start',       // uygulamayı başlat\n    url: 'http://localhost:3000',   // hazır olana dek bekle\n    reuseExistingServer: !process.env.CI,\n  },\n  use: { baseURL: 'http://localhost:3000' },\n});"
              },
              {
                "error": "expect(locator).toBeVisible() → Error: Timeout 5000ms exceeded",
                "fullMessage": "Error: expect(received).toBeVisible()\nTimeout 5000ms exceeded.\nExpecting locator(\"[data-testid='success-toast']\") to be visible.",
                "cause": {
                  "tr": "Assertion timeout'u doldu — beklenen element görünür olmadı. Animasyon süresi, API yanıt gecikmesi veya yanlış selector nedeniyle olabilir.",
                  "en": "The assertion timeout expired — the expected element was not visible within the timeout. Possible causes: animation delay, API response latency, or wrong selector."
                },
                "solution": {
                  "tr": "1) expect timeout'unu artır: expect(locator).toBeVisible({ timeout: 10000 }). 2) Önce bir aksiyon bekle (navigation, API yanıtı). 3) waitFor() ile element hazır olana dek bekle.",
                  "en": "1) Increase assertion timeout: expect(locator).toBeVisible({ timeout: 10000 }). 2) Await an earlier action (navigation, API response). 3) Use waitFor() to wait until the element is ready."
                },
                "codeWrong": "// YANLIŞ — aksiyon tamamlanmadan assertion\nawait page.click('#save-btn');\nawait expect(page.getByText('Saved!')).toBeVisible(); // çok hızlı",
                "codeFixed": "// DOĞRU — yeterli timeout ile bekle\nawait page.click('#save-btn');\nawait expect(page.getByText('Saved!')).toBeVisible({ timeout: 10000 });\n\n// veya response bekliyorsan:\nconst [response] = await Promise.all([\n  page.waitForResponse('/api/save'),\n  page.click('#save-btn'),\n]);\nawait expect(page.getByText('Saved!')).toBeVisible();"
              },
              {
                "error": "TS2345: Argument of type 'string' is not assignable to parameter of type 'Browser'",
                "fullMessage": "src/helpers.ts:12:25 - error TS2345: Argument of type 'string' is not assignable to parameter of type 'Browser'.",
                "cause": {
                  "tr": "Fonksiyon enum tipi bekliyor ama string geçirildi. TypeScript string'i enum tipine otomatik olarak dönüştürmez.",
                  "en": "A function expects an enum type but received a plain string. TypeScript does not automatically coerce strings to enum types."
                },
                "solution": {
                  "tr": "Enum değerini kullan (Browser.CHROMIUM) veya string'i enum'a dönüştür. Eğer dışarıdan gelen değeri dönüştürmek gerekiyorsa as ile cast et.",
                  "en": "Use the enum value (Browser.CHROMIUM) or cast the string. If converting external input to enum, use as assertion."
                },
                "codeWrong": "// YANLIŞ — string enum yerine geçirilemiyor\nfunction runTest(browser: Browser) { ... }\nrunTest('chromium'); // TS2345 hatası",
                "codeFixed": "// DOĞRU — enum değeri kullan\nrunTest(Browser.CHROMIUM); // ✅\n\n// veya dışarıdan gelen string'i cast et:\nconst browserStr = process.env.BROWSER ?? 'chromium';\nrunTest(browserStr as Browser); // dikkatli kullan — doğrulama ekle"
              }
            ]
          },
          {
            "type": "quiz",
            "question": {
              "en": "Why should the 'any' type be avoided in test automation, and what is recommended instead?",
              "tr": "Test otomasyonunda 'any' tipi kullanmaktan neden kaçınılır ve onun yerine ne önerilir?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "any runs slower",
                  "tr": "any daha yavaş çalışır"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "any disables all type checking, so errors surface at runtime instead; use unknown when the type is genuinely not known",
                  "tr": "any tür denetimini tamamen kapatır, hatalar runtime'da ortaya çıkar; bilmediğin tipte unknown kullan"
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "any can only be used in test files",
                  "tr": "any sadece test dosyalarında kullanılabilir"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "any is automatically converted to string",
                  "tr": "any otomatik olarak string'e dönüştürülür"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "en": "`any` is an escape hatch — you can assign anything to it and call any method, and the compiler checks nothing. Those errors stay invisible until runtime, defeating TypeScript's whole purpose. `unknown` offers the same flexibility but FORCES you to narrow the type (e.g. a `typeof` check) before using it — which is why an unknown API response should always use `unknown`, never `any`.",
              "tr": "`any` bir kaçış kapısıdır — ona her şeyi atayabilir, herhangi bir metodu çağırabilirsin, derleyici hiçbir şeyi kontrol etmez. Bu hatalar çalışma zamanına kadar görünmez kalır, yani TypeScript'in tüm amacı ortadan kalkar. `unknown` ise aynı esnekliği verir ama kullanmadan önce tip daralması (type narrowing, örn. `typeof` kontrolü) yapmaya ZORLAR — bu yüzden bilinmeyen bir API yanıtı için her zaman `any` değil `unknown` kullanılmalı."
            },
            "retryQuestion": {
              "question": {
                "en": "You write `let data: unknown = await response.json()`. What happens if you try to access `data.name` directly?",
                "tr": "`let data: unknown = await response.json()` yazdın. `data.name` özelliğine doğrudan erişmeye çalışırsan ne olur?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "It works fine, behaving exactly like any",
                    "tr": "Çalışır, `any` ile aynı davranışı gösterir"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "TypeScript gives a compile error — you must narrow the type first (e.g. a typeof/in check)",
                    "tr": "TypeScript derleme hatası verir — önce tip daralması (örn. typeof/in kontrolü) yapman gerekir"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "It silently returns undefined at runtime",
                    "tr": "Runtime'da sessizce undefined döner"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "unknown automatically converts to any",
                    "tr": "unknown otomatik olarak any'e dönüşür"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "en": "Unlike `any`, `unknown` does not allow accessing ANY property/method without validation first — the compiler requires a type narrowing step like `typeof data === \"object\" && data !== null && \"name\" in data\"` before `data.name` is allowed. This restores the safety that `any` throws away: it forces you to actually validate an unknown API response before using it.",
                "tr": "`unknown`, `any`'den farklı olarak HİÇBİR property/metoda doğrulama yapmadan erişime izin vermez — derleyici, `data.name`'e erişmeden önce `typeof data === \"object\" && data !== null && \"name\" in data` gibi bir tip daralması ister. Bu, `any` kullanırken atlanan güvenliği geri getirir: bilinmeyen bir API yanıtını kullanmadan önce gerçekten doğrulamaya zorlar."
              }
            }
          }
        ]
      },
      {
        "title": {
          "en": "Practice & Reference",
          "tr": "Pratik Alıştırmalar & Hızlı Referans"
        },
        "blocks": [
          {
            "type": "heading",
            "content": {
              "en": "Exercise 1 — Define TestCase Interface",
              "tr": "Alıştırma 1 — TestCase Interface Tanımlama"
            },
            "difficulty": "🟢 Beginner"
          },
          {
            "type": "exercise",
            "difficulty": "🟢 Beginner",
            "title": {
              "en": "Build a TestCase Interface with Enum",
              "tr": "Enum ve Interface ile TestCase Oluştur"
            },
            "description": {
              "en": "Define a string enum `Priority` with values LOW, MEDIUM, HIGH, CRITICAL. Define a string enum `TestStatus` with PASS, FAIL, SKIP, BLOCKED. Define an interface `TestCase` with: id (number, readonly), title (string), description (optional string), status (TestStatus), priority (Priority), tags (string array), durationMs (number), and assignee (optional string). Create two TestCase objects: one for a passing login test and one for a failing payment test.",
              "tr": "LOW, MEDIUM, HIGH, CRITICAL değerlerine sahip `Priority` string enum'u ve PASS, FAIL, SKIP, BLOCKED değerlerine sahip `TestStatus` string enum'u tanımlayın. `TestCase` interface'ini tanımlayın: id (number, readonly), title (string), description (isteğe bağlı string), status (TestStatus), priority (Priority), tags (string dizisi), durationMs (number) ve assignee (isteğe bağlı string). İki TestCase nesnesi oluşturun: biri başarılı bir login testi, diğeri başarısız bir ödeme testi için."
            },
            "hint": {
              "en": "Use readonly for id, ? for optional properties, and string enum values like Status.PASS = 'PASS'. Remember both enums must be string enums for readable test output.",
              "tr": "id için readonly, isteğe bağlı özellikler için ? kullanın ve string enum değerlerini Status.PASS = 'PASS' şeklinde yazın. Her iki enum'un da okunabilir test çıktısı için string enum olması gerektiğini unutmayın."
            },
            "solution": "// ── Enums ────────────────────────────────────────────────────────\nenum Priority {\n  LOW      = \"LOW\",\n  MEDIUM   = \"MEDIUM\",\n  HIGH     = \"HIGH\",\n  CRITICAL = \"CRITICAL\",\n}\n\nenum TestStatus {\n  PASS    = \"PASS\",\n  FAIL    = \"FAIL\",\n  SKIP    = \"SKIP\",\n  BLOCKED = \"BLOCKED\",\n}\n\n// ── Interface ─────────────────────────────────────────────────────\ninterface TestCase {\n  readonly id:    number;          // immutable after creation\n  title:          string;          // test case title\n  description?:   string;          // optional detailed description\n  status:         TestStatus;      // must be a valid TestStatus value\n  priority:       Priority;        // must be a valid Priority value\n  tags:           string[];        // array of tag strings\n  durationMs:     number;          // execution time in milliseconds\n  assignee?:      string;          // optional QA engineer name\n}\n\n// ── Create typed test cases ────────────────────────────────────────\nconst loginTest: TestCase = {\n  id:          1,\n  title:       \"Login with valid credentials\",\n  description: \"Verify that a registered user can log in with correct email and password\",\n  status:      TestStatus.PASS,\n  priority:    Priority.CRITICAL,\n  tags:        [\"smoke\", \"auth\", \"regression\"],\n  durationMs:  1240,\n  assignee:    \"Alice\",\n};\n\nconst paymentTest: TestCase = {\n  id:        2,\n  title:     \"Complete checkout with credit card\",\n  status:    TestStatus.FAIL,\n  priority:  Priority.HIGH,\n  tags:      [\"e2e\", \"payment\"],\n  durationMs: 3800,\n  // description and assignee omitted — they are optional\n};\n\n// ── Print summary ─────────────────────────────────────────────────\n[loginTest, paymentTest].forEach((tc) => {\n  console.log(`[${tc.status}] ${tc.priority} — ${tc.title} (${tc.durationMs}ms)`);\n});",
            "explanation": {
              "en": "String enums produce readable values ('PASS', 'CRITICAL') in logs and reports instead of opaque numbers. The readonly modifier on id prevents tests from accidentally changing an identifier. Optional fields (?) let you create minimal test objects without boilerplate, while required fields enforce a complete, valid contract.",
              "tr": "String enum'lar log ve raporlarda anlaşılmaz sayılar yerine okunabilir değerler ('PASS', 'CRITICAL') üretir. id üzerindeki readonly modifier, testlerin tanımlayıcıyı yanlışlıkla değiştirmesini önler. İsteğe bağlı alanlar (?) gereksiz kod yazmadan minimal test nesneleri oluşturmanıza olanak tanır."
            }
          },
          {
            "type": "divider"
          },
          {
            "type": "heading",
            "content": {
              "en": "Exercise 2 — Generic ApiResponse<T> Wrapper",
              "tr": "Alıştırma 2 — Generic ApiResponse<T> Sarmalayıcı"
            },
            "difficulty": "🟡 Intermediate"
          },
          {
            "type": "exercise",
            "difficulty": "🟡 Intermediate",
            "title": {
              "en": "Generic API Response Wrapper with Type Guards",
              "tr": "Type Guard ile Generic API Yanıtı Sarmalayıcısı"
            },
            "description": {
              "en": "Create a generic interface `ApiResponse<T>` with fields: data (T | null), status (number), ok (boolean), error (string | null), requestId (string). Write a generic factory function `createApiResponse<T>` that takes data and status code and returns a correctly filled ApiResponse<T>. Write a type guard function `isSuccessResponse<T>` that returns true if ok is true and data is not null. Write a `parseUserResponse` function that takes `ApiResponse<unknown>` and validates it is a user (has id: number, name: string, email: string). Test with a 200 user response and a 404 error response.",
              "tr": "data (T | null), status (number), ok (boolean), error (string | null), requestId (string) alanlarına sahip generic `ApiResponse<T>` interface'i oluşturun. Veri ve durum kodu alan ve doğru doldurulmuş ApiResponse<T> döndüren generic `createApiResponse<T>` factory fonksiyonu yazın. ok true ve data null değilse true döndüren `isSuccessResponse<T>` type guard fonksiyonu yazın. `ApiResponse<unknown>` alan ve bunun bir user olduğunu doğrulayan `parseUserResponse` fonksiyonu yazın."
            },
            "hint": {
              "en": "The type guard should have the signature `(res: ApiResponse<T>): res is ApiResponse<NonNullable<T>>`. For the user validation function use the 'in' operator and typeof checks to validate the unknown data shape.",
              "tr": "Type guard'ın imzası `(res: ApiResponse<T>): res is ApiResponse<NonNullable<T>>` olmalıdır. User doğrulama fonksiyonu için 'in' operatörü ve typeof kontrollerini kullanın."
            },
            "solution": "// ── Generic response interface ────────────────────────────────────\ninterface ApiResponse<T> {\n  data:      T | null;   // null on error responses\n  status:    number;     // HTTP status code\n  ok:        boolean;    // true for 2xx\n  error:     string | null;\n  requestId: string;\n}\n\n// ── Factory function ─────────────────────────────────────────────\nlet reqCounter = 0;\n\nfunction createApiResponse<T>(data: T | null, status: number): ApiResponse<T> {\n  return {\n    data,\n    status,\n    ok:        status >= 200 && status < 300,\n    error:     status >= 400 ? `HTTP Error ${status}` : null,\n    requestId: `req-${++reqCounter}`,\n  };\n}\n\n// ── Type guard ───────────────────────────────────────────────────\n// Narrows ApiResponse<T> to ApiResponse<NonNullable<T>> — data is guaranteed non-null\nfunction isSuccessResponse<T>(res: ApiResponse<T>): res is ApiResponse<NonNullable<T>> {\n  return res.ok === true && res.data !== null;\n}\n\n// ── Interfaces ───────────────────────────────────────────────────\ninterface ApiUser { id: number; name: string; email: string }\n\n// ── Validation function ───────────────────────────────────────────\nfunction parseUserResponse(res: ApiResponse<unknown>): ApiUser {\n  if (!isSuccessResponse(res)) {\n    throw new Error(`Request failed: ${res.error ?? \"unknown error\"}`);\n  }\n  const d = res.data;                          // narrowed: not null/undefined\n  if (\n    typeof d !== \"object\"           ||\n    d === null                      ||\n    !(\"id\"    in d) || typeof (d as any).id    !== \"number\" ||\n    !(\"name\"  in d) || typeof (d as any).name  !== \"string\" ||\n    !(\"email\" in d) || typeof (d as any).email !== \"string\"\n  ) {\n    throw new Error(\"Response does not match ApiUser shape\");\n  }\n  return d as ApiUser;\n}\n\n// ── Test it ──────────────────────────────────────────────────────\nconst userResp  = createApiResponse({ id: 1, name: \"Alice\", email: \"alice@test.com\" }, 200);\nconst errorResp = createApiResponse<ApiUser>(null, 404);\n\nconsole.log(`OK response: ${userResp.ok}, id: ${userResp.data?.id}`);   // OK response: true, id: 1\nconsole.log(`Error:       ${errorResp.error}`);                          // Error: HTTP Error 404\n\nconst user = parseUserResponse(userResp);\nconsole.log(`Parsed user: ${user.name} <${user.email}>`);               // Parsed user: Alice <alice@test.com>\n\ntry {\n  parseUserResponse(errorResp);\n} catch (e) {\n  console.log(`Caught: ${(e as Error).message}`);                        // Caught: Request failed: HTTP Error 404\n}",
            "explanation": {
              "en": "Generics allow one `ApiResponse<T>` interface to correctly type the data field as User, Product, Order, or any other type. The type guard narrows the type so TypeScript knows data is non-null after the check. The runtime validation function bridges the gap between 'unknown API data' and your typed interface — essential for safe API test assertions.",
              "tr": "Generic'ler tek bir `ApiResponse<T>` interface'inin veri alanını User, Product, Order veya herhangi başka bir tip olarak doğru şekilde tiplemesine izin verir. Type guard, kontrol sonrasında data'nın null olmadığını TypeScript'in bilmesi için tipi daraltır."
            }
          },
          {
            "type": "divider"
          },
          {
            "type": "heading",
            "content": {
              "en": "Exercise 3 — Typed Playwright POM Base Class",
              "tr": "Alıştırma 3 — Tipli Playwright POM Base Class"
            },
            "difficulty": "🔴 Advanced"
          },
          {
            "type": "exercise",
            "difficulty": "🔴 Advanced",
            "title": {
              "en": "Generic Playwright POM Base Class with Fixtures",
              "tr": "Fixture'lı Generic Playwright POM Base Class"
            },
            "description": {
              "en": "Create an abstract class `PageObjectBase` that accepts `Page` from Playwright in its constructor. It should have: a protected abstract `path` property (string), a `navigate()` method that calls `page.goto`, a generic `getElement<T extends Locator>(selector: string): T` method, a protected `waitForSelector(selector: string, state?: 'visible'|'hidden'|'attached'|'detached')` helper, and an `expectUrl(expected: string)` assertion helper. Then create a concrete `LoginPage` that extends it with typed `login(creds: {email:string, password:string})`, `getErrorText()`, and `isLoggedIn()` methods. Finally show a typed fixture extension using `test.extend<{loginPage: LoginPage}>`.",
              "tr": "Constructor'ında Playwright'tan `Page` kabul eden abstract `PageObjectBase` class'ı oluşturun. Şunları içermeli: protected abstract `path` özelliği (string), `page.goto` çağıran `navigate()` metodu, generic `getElement<T extends Locator>(selector: string): T` metodu, protected `waitForSelector` yardımcısı ve `expectUrl` assertion yardımcısı. Ardından `LoginPage` somut class'ını oluşturun. Son olarak `test.extend<{loginPage: LoginPage}>` kullanarak tipli fixture uzantısını gösterin."
            },
            "hint": {
              "en": "Use `import { type Page, type Locator, test as base } from '@playwright/test'`. The abstract path property forces every page to declare its route. The generic getElement method preserves Locator subtype information.",
              "tr": "`import { type Page, type Locator, test as base } from '@playwright/test'` kullanın. Abstract path özelliği her page'in kendi route'unu bildirmesini zorunlu kılar."
            },
            "solution": "// ── Import types from Playwright ─────────────────────────────────\n// import { type Page, type Locator, test as base, expect } from \"@playwright/test\";\n\n// ── Interfaces ───────────────────────────────────────────────────\ninterface LoginCredentials {\n  email:    string;\n  password: string;\n}\n\n// ── Abstract base class ───────────────────────────────────────────\nabstract class PageObjectBase {\n  // Every concrete page must declare its path\n  protected abstract readonly path: string;\n\n  constructor(\n    protected readonly page: any,   // Page — typed as any for demo (use Playwright's Page in real code)\n    protected readonly baseUrl: string = \"https://staging.myapp.com\"\n  ) {}\n\n  // Navigate to this page's path\n  async navigate(): Promise<void> {\n    const fullUrl = `${this.baseUrl}${this.path}`;\n    console.log(`→ goto: ${fullUrl}`);\n    // await this.page.goto(fullUrl);\n    // await this.page.waitForLoadState(\"domcontentloaded\");\n  }\n\n  // Generic element getter — preserves Locator subtype\n  protected getElement<T = any>(selector: string): T {\n    // return this.page.locator(selector) as T;\n    console.log(`→ locator: ${selector}`);\n    return { selector } as T;\n  }\n\n  // Protected helper — only page objects and subclasses can call this\n  protected async waitForSelector(\n    selector: string,\n    state: \"visible\" | \"hidden\" | \"attached\" | \"detached\" = \"visible\"\n  ): Promise<void> {\n    console.log(`→ wait for ${selector} to be ${state}`);\n    // await this.page.locator(selector).waitFor({ state });\n  }\n\n  // Assertion helper — usable in any page object\n  async expectUrl(expected: string): Promise<void> {\n    const current = `${this.baseUrl}${this.path}`;\n    const ok = current.includes(expected);\n    console.log(`→ URL check: ${ok ? \"PASS\" : \"FAIL\"} (expected to include: ${expected})`);\n    // await expect(this.page).toHaveURL(new RegExp(expected));\n  }\n}\n\n// ── Concrete LoginPage ────────────────────────────────────────────\nclass LoginPage extends PageObjectBase {\n  protected readonly path = \"/login\";   // must implement abstract property\n\n  // Private typed locators — selectors are an implementation detail\n  private get emailInput()    { return this.getElement('[data-testid=\"email-input\"]'); }\n  private get passwordInput() { return this.getElement('[data-testid=\"password-input\"]'); }\n  private get submitButton()  { return this.getElement('[data-testid=\"login-submit\"]'); }\n  private get errorMsg()      { return this.getElement('[data-testid=\"error-message\"]'); }\n  private get userMenu()      { return this.getElement('[data-testid=\"user-menu\"]'); }\n\n  // Typed login method — accepts our LoginCredentials interface\n  async login(creds: LoginCredentials): Promise<void> {\n    console.log(`→ fill email: ${creds.email}`);\n    console.log(`→ fill password: ***`);\n    console.log(`→ click submit`);\n    // await this.emailInput.fill(creds.email);\n    // await this.passwordInput.fill(creds.password);\n    // await this.submitButton.click();\n  }\n\n  // Returns string — callers always get a string (no null handling needed)\n  async getErrorText(): Promise<string> {\n    await this.waitForSelector('[data-testid=\"error-message\"]');\n    return \"Invalid email or password\";   // would be: await this.errorMsg.innerText()\n  }\n\n  // Returns boolean — clean assertion-ready API\n  async isLoggedIn(): Promise<boolean> {\n    return true;   // would be: await this.userMenu.isVisible()\n  }\n}\n\n// ── Typed Playwright fixture extension ────────────────────────────\n// const test = base.extend<{ loginPage: LoginPage }>({\n//   loginPage: async ({ page }, use) => {\n//     const lp = new LoginPage(page);\n//     await use(lp);\n//   },\n// });\n//\n// Usage in tests:\n// test(\"login flow\", async ({ loginPage }) => {\n//   await loginPage.navigate();\n//   await loginPage.login({ email: \"qa@test.com\", password: \"Pass123\" });\n//   expect(await loginPage.isLoggedIn()).toBe(true);\n// });\n\n// ── Demo output ───────────────────────────────────────────────────\nconst demoPage = new LoginPage(null);\ndemoPage.navigate().then(async () => {\n  await demoPage.login({ email: \"qa@test.com\", password: \"Pass123\" });\n  const loggedIn = await demoPage.isLoggedIn();\n  console.log(`→ isLoggedIn: ${loggedIn}`);\n  await demoPage.expectUrl(\"/login\");\n});",
            "explanation": {
              "en": "Abstract classes enforce that every page declares its own path, preventing forgetting to set the route. Protected access on helpers and locators keeps the public API clean — test code only sees navigate, login, getErrorText, isLoggedIn. The generic getElement preserves type information from Playwright's Locator hierarchy. The fixture extension pattern makes the typed page object available in every test that needs it without manually constructing it — this is the standard Playwright TypeScript pattern for large projects.",
              "tr": "Abstract class'lar her sayfanın kendi yolunu bildirmesini zorunlu kılar. Yardımcılarda ve locator'larda protected/private erişim, public API'yi temiz tutar — test kodu yalnızca navigate, login, getErrorText ve isLoggedIn gibi public metodları görür. Fixture uzantısı kalıbı, tipli page object'i onu manuel olarak oluşturmadan her testte kullanılabilir kılar."
            }
          },
          {
            "type": "heading",
            "content": {
              "en": "Quick Reference: TypeScript Features",
              "tr": "Hızlı Referans: TypeScript Özellikleri"
            },
            "difficulty": "🟢 Beginner"
          },
          {
            "type": "table",
            "headers": [
              {
                "en": "Feature",
                "tr": "Özellik"
              },
              {
                "en": "Syntax",
                "tr": "Söz Dizimi"
              },
              {
                "en": "When to Use",
                "tr": "Ne Zaman Kullanılır"
              }
            ],
            "rows": [
              [
                {
                  "en": "String enum",
                  "tr": "String enum"
                },
                {
                  "en": "enum E { A = 'A' }",
                  "tr": "enum E { A = 'A' }"
                },
                {
                  "en": "Status, browser, env constants — readable in logs",
                  "tr": "Durum, tarayıcı, ortam sabitleri — loglarda okunabilir"
                }
              ],
              [
                {
                  "en": "Interface",
                  "tr": "Interface"
                },
                {
                  "en": "interface Foo { x: string }",
                  "tr": "interface Foo { x: string }"
                },
                {
                  "en": "Object shapes, class contracts, POM types",
                  "tr": "Nesne şekilleri, class sözleşmeleri, POM tipleri"
                }
              ],
              [
                {
                  "en": "Type alias",
                  "tr": "Type alias"
                },
                {
                  "en": "type ID = string | number",
                  "tr": "type ID = string | number"
                },
                {
                  "en": "Unions, primitives, computed/complex types",
                  "tr": "Union'lar, primitifler, hesaplanmış/karmaşık tipler"
                }
              ],
              [
                {
                  "en": "Optional prop",
                  "tr": "İsteğe bağlı özellik"
                },
                {
                  "en": "{ x?: string }",
                  "tr": "{ x?: string }"
                },
                {
                  "en": "Config overrides, partial test data objects",
                  "tr": "Config override'lar, kısmi test veri nesneleri"
                }
              ],
              [
                {
                  "en": "Readonly prop",
                  "tr": "Readonly özellik"
                },
                {
                  "en": "{ readonly id: number }",
                  "tr": "{ readonly id: number }"
                },
                {
                  "en": "IDs, URLs, tokens that must not change",
                  "tr": "Değişmemesi gereken ID'ler, URL'ler, token'lar"
                }
              ],
              [
                {
                  "en": "Generic function",
                  "tr": "Generic fonksiyon"
                },
                {
                  "en": "function f<T>(x: T): T",
                  "tr": "function f<T>(x: T): T"
                },
                {
                  "en": "Factories, wrappers, utility functions",
                  "tr": "Factory'ler, sarmalayıcılar, utility fonksiyonlar"
                }
              ],
              [
                {
                  "en": "Generic interface",
                  "tr": "Generic interface"
                },
                {
                  "en": "interface R<T> { data: T }",
                  "tr": "interface R<T> { data: T }"
                },
                {
                  "en": "API responses, repositories, collections",
                  "tr": "API yanıtları, repository'ler, koleksiyonlar"
                }
              ],
              [
                {
                  "en": "Partial<T>",
                  "tr": "Partial<T>"
                },
                {
                  "en": "Partial<Config>",
                  "tr": "Partial<Config>"
                },
                {
                  "en": "Config overrides, optional test data factories",
                  "tr": "Config override'lar, isteğe bağlı test data factory'leri"
                }
              ],
              [
                {
                  "en": "Pick<T,K>",
                  "tr": "Pick<T,K>"
                },
                {
                  "en": "Pick<User, 'email'|'role'>",
                  "tr": "Pick<User, 'email'|'role'>"
                },
                {
                  "en": "Auth-only fixtures, slim DTO types",
                  "tr": "Auth-only fixture'lar, ince DTO tipleri"
                }
              ],
              [
                {
                  "en": "Omit<T,K>",
                  "tr": "Omit<T,K>"
                },
                {
                  "en": "Omit<User, 'password'>",
                  "tr": "Omit<User, 'password'>"
                },
                {
                  "en": "Safe fixture types without sensitive fields",
                  "tr": "Hassas alanlar olmadan güvenli fixture tipleri"
                }
              ],
              [
                {
                  "en": "Record<K,V>",
                  "tr": "Record<K,V>"
                },
                {
                  "en": "Record<Browser, number>",
                  "tr": "Record<Browser, number>"
                },
                {
                  "en": "Typed maps: timeout per browser, URL per env",
                  "tr": "Tipli haritalar: tarayıcı başına timeout, ortam başına URL"
                }
              ],
              [
                {
                  "en": "Type guard",
                  "tr": "Type guard"
                },
                {
                  "en": "x is MyType",
                  "tr": "x is MyType"
                },
                {
                  "en": "Validate unknown API responses at runtime",
                  "tr": "Çalışma zamanında bilinmeyen API yanıtlarını doğrula"
                }
              ],
              [
                {
                  "en": "Non-null assert",
                  "tr": "Non-null assert"
                },
                {
                  "en": "value!",
                  "tr": "value!"
                },
                {
                  "en": "Only when you are certain value is not null/undefined",
                  "tr": "Yalnızca değerin kesinlikle null/undefined olmadığından emin olduğunuzda"
                }
              ],
              [
                {
                  "en": "Satisfies",
                  "tr": "Satisfies"
                },
                {
                  "en": "obj satisfies Type",
                  "tr": "obj satisfies Type"
                },
                {
                  "en": "Validate config without losing literal types (TS 4.9+)",
                  "tr": "Literal tipleri kaybetmeden config doğrula (TS 4.9+)"
                }
              ],
              [
                {
                  "en": "Template literal type",
                  "tr": "Template literal type"
                },
                {
                  "en": "`${Env}.myapp.com`",
                  "tr": "`${Env}.myapp.com`"
                },
                {
                  "en": "Type-safe URL patterns, event names, route strings",
                  "tr": "Type-safe URL kalıpları, event adları, route string'leri"
                }
              ]
            ]
          },
          {
            "type": "tip",
            "content": {
              "en": "Bookmark the TypeScript Playground at typescriptlang.org/play — paste any snippet and see the compiled JavaScript, type errors, and hover types instantly. It is the fastest way to experiment with TypeScript concepts without setting up a project.",
              "tr": "typescriptlang.org/play adresindeki TypeScript Playground'u yer imlerine ekleyin — herhangi bir kod parçasını yapıştırın ve derlenmiş JavaScript'i, tür hatalarını ve hover tiplerini anında görün. Proje kurmadan TypeScript kavramlarını denemenin en hızlı yoludur."
            }
          },
          {
            "type": "quiz",
            "question": {
              "en": "What is the purpose of defining a generic `ApiResponse<T>` wrapper type?",
              "tr": "Generic bir `ApiResponse<T>` sarmalayıcı tipi tanımlamanın amacı nedir?"
            },
            "options": [
              {
                "id": "a",
                "text": {
                  "en": "It makes API calls faster",
                  "tr": "API çağrılarını hızlandırır"
                }
              },
              {
                "id": "b",
                "text": {
                  "en": "It lets each endpoint's different data shape reuse a common wrapper structure (e.g. status/data/error) with full type safety",
                  "tr": "Her endpoint'in farklı veri şeklini, ortak bir sarmalayıcı yapıyı (status/data/error gibi) tip güvenliğiyle tekrar kullanmayı sağlar"
                }
              },
              {
                "id": "c",
                "text": {
                  "en": "It only works for string-type responses",
                  "tr": "Sadece string tipindeki yanıtlar için çalışır"
                }
              },
              {
                "id": "d",
                "text": {
                  "en": "It automatically retries network errors",
                  "tr": "Network hatalarını otomatik olarak retry eder"
                }
              }
            ],
            "correct": "b",
            "explanation": {
              "en": "A generic type like `ApiResponse<T>` defines the common envelope `{ status: number, data: T, error?: string }` ONCE; you substitute `T` with each endpoint's real data type like `User`, `Product`, `OrderResult`. Same logic as a generic `ApiResponse<T>` class in Java — you get type safety per endpoint without duplicating the wrapper.",
              "tr": "`ApiResponse<T>` gibi bir generic tip, `{ status: number, data: T, error?: string }` şeklindeki ortak zarfı BİR kez tanımlar; `T` yerine `User`, `Product`, `OrderResult` gibi her endpoint'in gerçek veri tipini geçirirsin. Java'daki generic bir `ApiResponse<T>` sınıfıyla aynı mantık — kod tekrarı olmadan her endpoint için tip güvenliği kazanırsın."
            },
            "retryQuestion": {
              "question": {
                "en": "Without the generic `ApiResponse<T>` type, if you wrote a SEPARATE response wrapper type for each endpoint (UserResponse, ProductResponse, OrderResponse), what would be the main downside?",
                "tr": "`ApiResponse<T>` generic tipi olmadan, her endpoint için (User, Product, Order) AYRI bir response wrapper tipi (UserResponse, ProductResponse, OrderResponse) yazsaydın, temel dezavantajı ne olurdu?"
              },
              "options": [
                {
                  "id": "a",
                  "text": {
                    "en": "The compiler could not type-check any of them",
                    "tr": "Derleyici hiçbirini tip kontrolü yapamaz"
                  }
                },
                {
                  "id": "b",
                  "text": {
                    "en": "You'd have to repeat the {status, data, error} envelope shape in every type — changing one field means updating it in N places",
                    "tr": "{status, data, error} zarf şeklini her tipte tekrar yazman gerekirdi — bir alanı değiştirmek N yerde güncelleme ister"
                  }
                },
                {
                  "id": "c",
                  "text": {
                    "en": "TypeScript does not support defining multiple interfaces",
                    "tr": "TypeScript birden fazla interface tanımlamayı desteklemez"
                  }
                },
                {
                  "id": "d",
                  "text": {
                    "en": "API responses could no longer be parsed as JSON",
                    "tr": "API yanıtları artık JSON olarak parse edilemezdi"
                  }
                }
              ],
              "correct": "b",
              "explanation": {
                "en": "Without generics, the common envelope shape ({status, data, error}) gets COPIED into every separate response type. If you need to add a field to the envelope (e.g. a `requestId`), you must update UserResponse, ProductResponse, and OrderResponse individually — with a generic `ApiResponse<T>`, that change happens in one place and automatically propagates to every usage.",
                "tr": "Generic olmadan, ortak zarf yapısı ({status, data, error}) her ayrı response tipinde KOPYALANIR. Zarfa yeni bir alan eklemen gerekirse (örn. bir `requestId`), bunu UserResponse, ProductResponse, OrderResponse'un hepsinde tek tek güncellemen gerekir — generic bir `ApiResponse<T>` ile bu değişiklik tek bir yerde yapılır ve her kullanıma otomatik yayılır."
              }
            }
          }
        ]
      }
    ]
  }
};
