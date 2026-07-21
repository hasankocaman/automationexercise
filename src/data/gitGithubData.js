import { fillMissingCodeTrios } from './interactiveTrioFillers.js'

// ─── Bir Commit'in Yolculuğu film bloğu (video-scene — EN + TR paylaşımlı) ───
// Veri şeması: Documents/video-rollout-plan.md §2.1 / src/components/VideoSceneBlock.jsx
const commitJourneyFilm = {
  type: 'video-scene',
  id: 'git-commit-journey-film',
  title: {
    tr: '🎬 Bir Commit\'in Yolculuğu',
    en: '🎬 The Journey of a Commit',
  },
  xpReward: 15,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'file',     emoji: '📝', label: { tr: 'checkout.spec.js',       en: 'checkout.spec.js' },      color: '#ef4444' },
    { id: 'ghost',    emoji: '👻', label: { tr: 'Untracked dosya',        en: 'Untracked file' },        color: '#64748b' },
    { id: 'staging',  emoji: '🎬', label: { tr: 'Staging Area',           en: 'Staging Area' },          color: '#f59e0b' },
    { id: 'commit',   emoji: '📦', label: { tr: 'Commit (snapshot)',      en: 'Commit (snapshot)' },     color: '#8b5cf6' },
    { id: 'repo',     emoji: '🗄️', label: { tr: 'Local Repo (.git)',      en: 'Local Repo (.git)' },      color: '#6366f1' },
    { id: 'head',     emoji: '🏷️', label: { tr: 'HEAD',                   en: 'HEAD' },                   color: '#f97316' },
    { id: 'remote',   emoji: '☁️', label: { tr: 'Remote (GitHub)',        en: 'Remote (GitHub)' },        color: '#0ea5e9' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Bir satır kodun `git push`\'a kadar geçtiği GERÇEK yolculuğu izleyeceksin — working directory\'den staging\'e, commit\'e, local repo\'ya ve en sonda remote\'a.',
        en: 'You will watch the ACTUAL journey one line of code takes on its way to `git push` — from the working directory to staging, to a commit, to the local repo, and finally to the remote.',
      },
      code: { tr: `git status`, en: `git status` },
      positions: {
        file: { x: 50, y: 50, scale: 1.1, pulse: true },
      },
    },
    {
      caption: {
        tr: 'Adım 1 — Working Directory: `checkout.spec.js` düzenlendi (kırmızı = "modified"). `git status` bunu görür ama HENÜZ hiçbir şey commit\'e aday değil — dosya sadece diskte değişti.',
        en: 'Step 1 — Working Directory: `checkout.spec.js` was edited (red = "modified"). `git status` sees this, but NOTHING is a commit candidate yet — the file only changed on disk.',
      },
      code: { tr: `# modified:   tests/checkout.spec.js`, en: `# modified:   tests/checkout.spec.js` },
      positions: {
        file: { x: 16, y: 50, scale: 1.2, pulse: true },
      },
    },
    {
      caption: {
        tr: 'Adım 2 — `git add`: dosya staging area\'ya TAŞINIR (kopyalanmaz, seçilir). Dikkat: yanındaki untracked bir dosya `git add` edilmediği için staging\'e GİRMEDİ — sadece bilerek seçtiğin şey commit\'e aday olur.',
        en: 'Step 2 — `git add`: the file is MOVED into the staging area (not copied, selected). Notice: a nearby untracked file was NOT `git add`-ed, so it did NOT enter staging — only what you deliberately select becomes a commit candidate.',
      },
      code: { tr: `git add tests/checkout.spec.js`, en: `git add tests/checkout.spec.js` },
      positions: {
        file: { x: 14, y: 50, opacity: 0.5, scale: 0.85 },
        ghost: { x: 14, y: 80, opacity: 0.4, scale: 0.8 },
        staging: { x: 42, y: 50, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'file', to: 'staging' }],
    },
    {
      caption: {
        tr: 'Adım 3 — `git commit`: staging area\'daki seçim kalıcı bir SNAPSHOT olarak DONDURULUR. Bu andan sonra staging boşalır — bir sonraki commit için tertemiz başlar.',
        en: 'Step 3 — `git commit`: the selection in staging is FROZEN into a permanent SNAPSHOT. From this moment, staging empties out — a clean slate for the next commit.',
      },
      code: { tr: `git commit -m "fix(checkout): wait for payment iframe"`, en: `git commit -m "fix(checkout): wait for payment iframe"` },
      positions: {
        staging: { x: 24, y: 50, opacity: 0.5, scale: 0.85 },
        commit: { x: 50, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'staging', to: 'commit' }],
    },
    {
      caption: {
        tr: 'Adım 4 — Local Repo: commit, `.git` klasöründeki zincire EKLENİR ve HEAD işaretçisi bu yeni commit\'i gösterecek şekilde İLERLER. Zincir her commit\'te büyür, hiçbiri silinmez.',
        en: 'Step 4 — Local Repo: the commit is APPENDED to the chain inside `.git`, and the HEAD pointer MOVES FORWARD to point at this new commit. The chain grows with every commit; nothing is deleted.',
      },
      code: { tr: `git log --oneline -1`, en: `git log --oneline -1` },
      positions: {
        commit: { x: 22, y: 50, opacity: 0.55, scale: 0.85 },
        repo: { x: 48, y: 50, scale: 1.15, pulse: true },
        head: { x: 62, y: 30, scale: 1.1, pulse: true },
      },
      beams: [{ from: 'commit', to: 'repo' }, { from: 'repo', to: 'head', color: '#f97316' }],
    },
    {
      caption: {
        tr: 'Adım 5 — `git push`: local repo zincirindeki commit\'ler REMOTE\'a (GitHub) kopyalanır. Bu ana kadar her şey senin bilgisayarındaydı — push\'tan önce takım arkadaşların bu commit\'i GÖREMEZ.',
        en: 'Step 5 — `git push`: the commits in the local repo chain are COPIED to the REMOTE (GitHub). Up to this point everything lived only on your machine — before push, your teammates CANNOT see this commit.',
      },
      code: { tr: `git push -u origin main`, en: `git push -u origin main` },
      positions: {
        repo: { x: 24, y: 50, opacity: 0.55, scale: 0.85 },
        remote: { x: 54, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'repo', to: 'remote' }],
    },
    {
      caption: {
        tr: 'Final — üç bölge özeti: Working Directory (henüz seçilmemiş değişiklikler) → Staging (seçilmiş, commit\'e aday) → Local Repo (kalıcı snapshot\'lar). Bu ayrımı bilmek QA için kritik: yarım kalan, test edilmemiş bir işi asla "sadece stage ettim diye" commit\'lemezsin — commit bir SEÇİM anıdır, bir kaza değil.',
        en: 'Final — the three-zone summary: Working Directory (unselected changes) → Staging (selected, commit-bound) → Local Repo (permanent snapshots). Knowing this split matters for QA: you never commit unfinished, untested work just because it happened to be staged — a commit is a moment of deliberate SELECTION, not an accident.',
      },
      positions: {
        file: { x: 12, y: 60, scale: 0.9 },
        staging: { x: 36, y: 40, scale: 0.95 },
        repo: { x: 60, y: 60, scale: 0.95 },
        remote: { x: 84, y: 40, scale: 1.1, pulse: true },
      },
      beams: [{ from: 'file', to: 'staging' }, { from: 'staging', to: 'repo' }, { from: 'repo', to: 'remote' }],
    },
  ],
}

// ─── Hata Sözlüğü sekmesi tam paketi (film + animasyon + sandbox — EN + TR paylaşımlı) ───
// Spesifikasyon: Documents/video-rollout-plan.md §7.3 (Fable payı)
const gitPrPushPractice = {
  type: 'code-playground',
  relatedTopicId: 'git-pr-checklist',
  id: 'git-pr-push-practice-01',
  label: { tr: 'Kendin Dene: Push Komutundaki Eksiği Tamamla', en: 'Try It Yourself: Complete the Missing Push Command' },
  language: 'bash',
  task: { tr: 'feature/login-tests branch\'ini upstream kurarak GitHub\'a yayınlayan komutu tamamla.', en: 'Complete the command that publishes the feature/login-tests branch to GitHub, setting upstream.' },
  starterCode: { tr: '// TODO: branch\'i yayinla ve upstream kur\ngit push origin feature/login-tests', en: '// TODO: publish the branch and set upstream\ngit push origin feature/login-tests' },
  solutionCode: { tr: 'git push -u origin feature/login-tests', en: 'git push -u origin feature/login-tests' },
  hint: { tr: '-u (--set-upstream) bayrağı olmadan, bir SONRAKİ push\'ta hangi remote branch\'e gideceğini Git HATIRLAMAZ — her seferinde branch adını TEKRAR yazman gerekir.', en: 'Without the -u (--set-upstream) flag, Git does NOT REMEMBER which remote branch to push to NEXT time — you would have to TYPE the branch name AGAIN every time.' },
  successMessage: { tr: '-u bayrağı sayesinde bundan sonraki push\'lar SADECE git push yazarak yapılabilir — Git artık hangi remote branch\'i KASTETTİĞİNİ BİLİR.', en: 'Correct! Thanks to -u, future pushes can be done with JUST git push — Git now KNOWS which remote branch you MEAN.' },
}

const gitGitignorePractice = {
  type: 'code-playground',
  relatedTopicId: 'git-gitignore-patterns',
  id: 'git-gitignore-practice-01',
  label: { tr: 'Kendin Dene: .gitignore Kalıbını Düzelt', en: 'Try It Yourself: Fix the .gitignore Pattern' },
  language: 'bash',
  task: { tr: 'node_modules klasörünü, kaç seviye derinlikte olursa olsun, doğru şekilde yok sayan satırı yaz.', en: 'Write the line that correctly ignores the node_modules folder at any depth.' },
  starterCode: { tr: '// TODO: node_modules klasorunu (dosya degil, klasor) doğru sekilde yok say\nnode_modules', en: '// TODO: correctly ignore the node_modules folder (not a file)\nnode_modules' },
  solutionCode: { tr: 'node_modules/', en: 'node_modules/' },
  hint: { tr: 'Sonuna / eklemeden yazılan bir kural, AYNI isimde bir DOSYAYI da eşleyebilir — / eklemek bunun SADECE bir klasör olduğunu garanti eder.', en: 'A rule without a trailing / can also match a FILE with the same name — adding / guarantees it only matches a folder.' },
  successMessage: { tr: "Doğru! node_modules/ (sonundaki / ile) SADECE klasörü eşler — kaç seviye derinlikte olursa olsun, node_modules adındaki HER klasörü yok sayar.", en: 'Correct! node_modules/ (with the trailing /) matches ONLY the folder — it ignores EVERY folder named node_modules at ANY depth.' },
}

const gitSshKeygenPractice = {
  type: 'code-playground',
  relatedTopicId: 'git-ssh-setup',
  id: 'git-ssh-keygen-practice-01',
  label: { tr: 'Kendin Dene: SSH Anahtarı Oluşturma Komutunu Tamamla', en: 'Try It Yourself: Complete the SSH Key Generation Command' },
  language: 'bash',
  task: { tr: 'ed25519 tipinde bir SSH anahtarı oluşturan komutu, e-posta yorumuyla birlikte tamamla.', en: 'Complete the command that generates an ed25519 SSH key, including the email comment.' },
  starterCode: { tr: '// TODO: ed25519 tipinde bir SSH anahtari olustur\nssh-keygen -C "hasan@example.com"', en: '// TODO: generate an ed25519 SSH key\nssh-keygen -C "hasan@example.com"' },
  solutionCode: { tr: 'ssh-keygen -t ed25519 -C "hasan@example.com"', en: 'ssh-keygen -t ed25519 -C "hasan@example.com"' },
  hint: { tr: '-t bayrağı anahtar TİPİNİ belirtir — ed25519, günümüzde önerilen modern ve hızlı bir algoritmadır.', en: 'The -t flag specifies the key TYPE — ed25519 is the modern, fast algorithm recommended today.' },
  successMessage: { tr: 'Doğru! -t ed25519 olmadan ssh-keygen varsayılan (RSA) bir anahtar üretir — GitHub\'ın önerdiği modern tip için -t bayrağı ZORUNLUDUR.', en: 'Correct! Without -t ed25519, ssh-keygen generates a default (RSA) key — the -t flag is REQUIRED for the modern type GitHub recommends.' },
}

const gitErrorDiagnosisFilm = {
  type: 'video-scene',
  id: 'git-error-diagnosis-film',
  title: {
    tr: '🎬 Bir Git Hatasının Teşhis Zinciri',
    en: '🎬 The Diagnosis Chain of a Git Error',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'error',  emoji: '❌', label: { tr: '! [rejected] hatası',      en: '! [rejected] error' },       color: '#ef4444' },
    { id: 'reader', emoji: '👀', label: { tr: 'Mesajı okuma',             en: 'Reading the message' },      color: '#f59e0b' },
    { id: 'map',    emoji: '🗺️', label: { tr: 'Katman haritası',          en: 'Layer map' },                color: '#8b5cf6' },
    { id: 'remote', emoji: '☁️', label: { tr: 'origin/main (+2 commit)',  en: 'origin/main (+2 commits)' }, color: '#0ea5e9' },
    { id: 'fetch',  emoji: '📥', label: { tr: 'git fetch',                en: 'git fetch' },                color: '#10b981' },
    { id: 'merge',  emoji: '🔀', label: { tr: 'git merge',                en: 'git merge' },                color: '#6366f1' },
    { id: 'push',   emoji: '✅', label: { tr: 'Başarılı push',            en: 'Successful push' },          color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'CI log\'unda korkutucu bir satır belirdi: push REDDEDİLDİ. Panik butonuna basmadan önce bu filmde, sözlükteki HER hataya uygulanabilen 5 adımlık teşhis zincirini izleyeceksin.',
        en: 'A scary line just appeared in the CI log: the push was REJECTED. Before you hit the panic button, this film shows the 5-step diagnosis chain that applies to EVERY error in the dictionary.',
      },
      code: { tr: `git push origin main`, en: `git push origin main` },
      positions: {
        error: { x: 50, y: 50, scale: 1.2, pulse: true },
      },
    },
    {
      caption: {
        tr: 'Adım 1 — Mesajı PARÇALA: "rejected" bozulma değil, Git\'in KORUMA refleksi; "non-fast-forward" ise "uzak zincir seninkinden ileride" demek. Hata cümlesi rastgele değil, teknik olarak kesin bir teşhistir.',
        en: 'Step 1 — DECOMPOSE the message: "rejected" is not corruption, it is Git\'s PROTECTIVE reflex; "non-fast-forward" means "the remote chain is ahead of yours". The error sentence is not random — it is a technically precise diagnosis.',
      },
      code: { tr: `# ! [rejected] main -> main (non-fast-forward)`, en: `# ! [rejected] main -> main (non-fast-forward)` },
      positions: {
        error: { x: 20, y: 45, scale: 1 },
        reader: { x: 52, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'error', to: 'reader' }],
    },
    {
      caption: {
        tr: 'Adım 2 — KATMANI bul: sorun working tree\'de mi, staging\'de mi, local repo\'da mı, remote\'ta mı? "non-fast-forward" remote katmanının sesidir — local dosyalarını düzeltmeye çalışmak boşa kürek çekmek olur.',
        en: 'Step 2 — Locate the LAYER: is the problem in the working tree, staging, local repo, or the remote? "non-fast-forward" is the voice of the remote layer — trying to fix your local files would be rowing in the wrong direction.',
      },
      positions: {
        reader: { x: 18, y: 45, opacity: 0.5, scale: 0.85 },
        map: { x: 48, y: 50, scale: 1.2, pulse: true },
        remote: { x: 78, y: 35, scale: 1.05, pulse: true },
      },
      beams: [{ from: 'map', to: 'remote', color: '#0ea5e9' }],
    },
    {
      caption: {
        tr: 'Adım 3 — Önce DEĞİŞTİRMEYEN komutlarla kanıt topla: `git fetch origin` uzaktaki yeniliği indirir ama hiçbir şeye dokunmaz; `git status` artık "behind by 2 commits" der. Teşhis kesinleşti: takım senden önce push\'lamış.',
        en: 'Step 3 — Collect evidence with NON-DESTRUCTIVE commands first: `git fetch origin` downloads the remote news without touching anything; `git status` now says "behind by 2 commits". Diagnosis confirmed: the team pushed before you.',
      },
      code: { tr: `git fetch origin\ngit status  # Your branch is behind 'origin/main' by 2 commits`, en: `git fetch origin\ngit status  # Your branch is behind 'origin/main' by 2 commits` },
      positions: {
        remote: { x: 22, y: 40, scale: 0.95, opacity: 0.7 },
        fetch: { x: 52, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'remote', to: 'fetch' }],
    },
    {
      caption: {
        tr: 'Adım 4 — En küçük GÜVENLİ düzeltmeyi uygula: `git merge origin/main` takımın 2 commit\'ini local zincirine alır. `--force` ile push\'u zorlamak da "çözerdi" — ama takımın işini ezerek. Sözlükteki çözümler hep bu en-küçük-güvenli hamledir.',
        en: 'Step 4 — Apply the smallest SAFE fix: `git merge origin/main` brings the team\'s 2 commits into your local chain. Forcing the push with `--force` would also "solve" it — by crushing your team\'s work. Dictionary fixes are always this smallest-safe move.',
      },
      code: { tr: `git merge origin/main`, en: `git merge origin/main` },
      positions: {
        fetch: { x: 20, y: 45, opacity: 0.5, scale: 0.85 },
        merge: { x: 50, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'fetch', to: 'merge' }],
    },
    {
      caption: {
        tr: 'Adım 5 — KANITLA: başarısız olan komutu aynen tekrar çalıştır. `git push origin main` artık kabul edilir. Hata mesajı "kayboldu" değil — ANLAŞILDI ve kökten çözüldü; birazdan aynı hata gelirse zinciri yine bilirsin.',
        en: 'Step 5 — PROVE it: rerun the exact command that failed. `git push origin main` is now accepted. The error did not "disappear" — it was UNDERSTOOD and fixed at the root; if it ever returns, you know the chain.',
      },
      code: { tr: `git push origin main  # kabul edildi`, en: `git push origin main  # accepted` },
      positions: {
        merge: { x: 20, y: 45, opacity: 0.5, scale: 0.85 },
        push: { x: 52, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'merge', to: 'push' }],
    },
    {
      caption: {
        tr: 'Final — teşhis zinciri: mesajı parçala → katmanı bul → değiştirmeyen komutla kanıt topla → en küçük güvenli düzeltme → aynı komutla kanıtla. Java\'daki refleksin aynısı: stack trace\'te ilk satır + "Caused by" okunur, rastgele satır silinmez. Aşağıdaki sözlükteki 9 hatanın HER biri bu zincirle çözülür.',
        en: 'Final — the diagnosis chain: decompose the message → locate the layer → collect evidence non-destructively → apply the smallest safe fix → prove it with the same command. The exact reflex you use in Java: read the first stack-trace line + "Caused by", never delete random lines. Every one of the 9 errors in the dictionary below yields to this chain.',
      },
      positions: {
        error: { x: 10, y: 60, scale: 0.85 },
        reader: { x: 26, y: 40, scale: 0.85 },
        map: { x: 42, y: 60, scale: 0.85 },
        fetch: { x: 58, y: 40, scale: 0.85 },
        merge: { x: 74, y: 60, scale: 0.85 },
        push: { x: 88, y: 40, scale: 1.1, pulse: true },
      },
      beams: [{ from: 'error', to: 'reader' }, { from: 'reader', to: 'map' }, { from: 'map', to: 'fetch' }, { from: 'fetch', to: 'merge' }, { from: 'merge', to: 'push' }],
    },
  ],
}

const gitErrorDiagnosisSteps = {
  type: 'step-animation',
  id: 'git-error-diagnosis-steps',
  title: { tr: 'Adım Adım: Hata Teşhis Refleksi', en: 'Step by Step: The Error Diagnosis Reflex' },
  steps: [
    { id: 1, icon: '📖', label: { tr: 'Mesajı tam oku', en: 'Read the full message' }, detail: { tr: 'Ilk kelime ciddiyeti soyler: `fatal` islem durdu, `error` islem reddedildi, `warning` islem gecti ama dikkat. Mesajin geri kalani cogu zaman kok nedeni acikca yazar.', en: 'The first word states severity: `fatal` stopped the operation, `error` rejected it, `warning` let it pass with a caveat. The rest of the message usually states the root cause explicitly.' } },
    { id: 2, icon: '🗺️', label: { tr: 'Katmanı belirle', en: 'Locate the layer' }, detail: { tr: 'Hata hangi bolgeden konusuyor: working tree, staging, local repo, remote? Ornegin `not a git repository` local katman, `non-fast-forward` remote katmandir — yanlis katmanda ugrasma.', en: 'Which zone is speaking: working tree, staging, local repo, or remote? For example `not a git repository` is the local layer, `non-fast-forward` is the remote layer — do not struggle in the wrong zone.' } },
    { id: 3, icon: '🔍', label: { tr: 'Değiştirmeyen komutla kanıt topla', en: 'Collect non-destructive evidence' }, detail: { tr: 'Once `git status`, `git log`, `git fetch` gibi hicbir seyi bozamayan komutlari calistir. `--force`, `reset --hard` gibi kalici hamlelerle ASLA baslama.', en: 'Start with commands that cannot break anything: `git status`, `git log`, `git fetch`. NEVER start with permanent moves like `--force` or `reset --hard`.' } },
    { id: 4, icon: '🔧', label: { tr: 'En küçük güvenli düzeltme', en: 'Smallest safe fix' }, detail: { tr: 'Sozlukteki cozumu uygula — hedef her zaman en az yan etkiyle duzeltmektir: fetch+merge varken force push, tek dosya duzeltmesi varken repo silip yeniden clone SECILMEZ.', en: 'Apply the dictionary fix — the goal is always the fewest side effects: never force-push when fetch+merge works, never delete-and-reclone when a single-file fix exists.' } },
    { id: 5, icon: '✅', label: { tr: 'Aynı komutla kanıtla', en: 'Prove with the same command' }, detail: { tr: 'Basarisiz olan komutu AYNEN tekrar calistir ve gectigini gor. Gecmediyse teshis yanlisti — 2. adima don, baska katmani dene.', en: 'Rerun the EXACT command that failed and watch it pass. If it still fails, the diagnosis was wrong — go back to step 2 and try another layer.' } },
  ],
}

const gitErrorPractice = {
  type: 'code-playground',
  relatedTopicId: 'git-github-errors',
  id: 'git-error-practice-01',
  label: {
    tr: 'Micro Lab: Reddedilen push\'u teşhis zinciriyle çöz',
    en: 'Micro Lab: Fix a rejected push with the diagnosis chain',
  },
  language: 'bash',
  task: {
    tr: 'Yukarıdaki filmdeki teşhis zincirini kendin uygula: push reddedildi, kanıt toplandı, sıra çözüm adımında. TODO satırını zincirin 4. adımıyla (en küçük güvenli düzeltme) tamamla.',
    en: 'Apply the diagnosis chain from the film above yourself: the push was rejected, evidence is collected, and the fix step is next. Complete the TODO line with step 4 of the chain (the smallest safe fix).',
  },
  explanation: {
    tr: 'Bu gercek bir runtime degil; amac reddedilen push karsisinda dogru refleks sirasini (kanit → guvenli cozum → dogrulama) elle yazarak pekistirmek.',
    en: 'This is not a real runtime; the goal is to reinforce the correct reflex order for a rejected push (evidence → safe fix → verification) by writing it yourself.',
  },
  code: {
    tr: `# push denemesi reddedildi — takim senden once push'lamis\ngit push origin main\n# cikti: ! [rejected] main -> main (non-fast-forward)\n\n# 1) once degistirmeyen komutlarla kanit topla\ngit fetch origin\ngit status\n# cikti: Your branch is behind 'origin/main' by 2 commits\n\n# 2) takimin commit'lerini local zincirine al\ngit merge origin/main\n\n# 3) dogrula: ayni push artik kabul edilir\ngit push origin main`,
    en: `# the push attempt was rejected — the team pushed before you\ngit push origin main\n# output: ! [rejected] main -> main (non-fast-forward)\n\n# 1) collect evidence with non-destructive commands first\ngit fetch origin\ngit status\n# output: Your branch is behind 'origin/main' by 2 commits\n\n# 2) bring the team's commits into your local chain\ngit merge origin/main\n\n# 3) verify: the same push is now accepted\ngit push origin main`,
  },
  starterCode: {
    tr: `# push denemesi reddedildi — takim senden once push'lamis\ngit push origin main\n# cikti: ! [rejected] main -> main (non-fast-forward)\n\n# 1) once degistirmeyen komutlarla kanit topla\ngit fetch origin\ngit status\n# cikti: Your branch is behind 'origin/main' by 2 commits\n\n# 2) TODO: takimin commit'lerini local zincirine alan komutu yaz\n\n# 3) dogrula: ayni push artik kabul edilir\ngit push origin main`,
    en: `# the push attempt was rejected — the team pushed before you\ngit push origin main\n# output: ! [rejected] main -> main (non-fast-forward)\n\n# 1) collect evidence with non-destructive commands first\ngit fetch origin\ngit status\n# output: Your branch is behind 'origin/main' by 2 commits\n\n# 2) TODO: write the command that brings the team's commits into your local chain\n\n# 3) verify: the same push is now accepted\ngit push origin main`,
  },
  solutionCode: {
    tr: `# push denemesi reddedildi — takim senden once push'lamis\ngit push origin main\n# cikti: ! [rejected] main -> main (non-fast-forward)\n\n# 1) once degistirmeyen komutlarla kanit topla\ngit fetch origin\ngit status\n# cikti: Your branch is behind 'origin/main' by 2 commits\n\n# 2) takimin commit'lerini local zincirine al\ngit merge origin/main\n\n# 3) dogrula: ayni push artik kabul edilir\ngit push origin main`,
    en: `# the push attempt was rejected — the team pushed before you\ngit push origin main\n# output: ! [rejected] main -> main (non-fast-forward)\n\n# 1) collect evidence with non-destructive commands first\ngit fetch origin\ngit status\n# output: Your branch is behind 'origin/main' by 2 commits\n\n# 2) bring the team's commits into your local chain\ngit merge origin/main\n\n# 3) verify: the same push is now accepted\ngit push origin main`,
  },
  expected: {
    tr: 'Son `git push origin main` kabul edilir; `git status` artik "Your branch is up to date" gosterir.',
    en: 'The final `git push origin main` is accepted; `git status` now shows "Your branch is up to date".',
  },
  hints: [
    { tr: 'Reddedilen push karsisinda ilk hamle asla `--force` degildir — zincirin 4. adimi, uzaktaki yeni commit\'leri KENDI tarafina almaktir.', en: 'The first move after a rejected push is never `--force` — step 4 of the chain is bringing the new remote commits into YOUR side.' },
    { tr: '`git status` "behind by 2 commits" dediyse, `origin/main`\'i mevcut branch\'ine birlestirmeden push kabul edilmez.', en: 'Once `git status` says "behind by 2 commits", the push will not be accepted until you integrate `origin/main` into your current branch.' },
    { tr: 'TODO satiri tek bir komuttur ve hedefi `origin/main`\'dir — fetch zaten yapildi, simdi birlestirme sirasi.', en: 'The TODO line is a single command targeting `origin/main` — fetch is already done, now comes the integration.' },
  ],
  xpReward: 10,
}

// ─── Mülakat sekmesi tam paketi (film + animasyon + sandbox — EN + TR paylaşımlı) ───
const gitInterviewAnswerFilm = {
  type: 'video-scene',
  id: 'git-interview-answer-film',
  title: {
    tr: '🎬 Senaryo Sorusuna Güçlü Cevap Anatomisi',
    en: '🎬 The Anatomy of a Strong Scenario Answer',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'question', emoji: '🎤', label: { tr: 'Senaryo sorusu',    en: 'Scenario question' },  color: '#6366f1' },
    { id: 'rote',     emoji: '😰', label: { tr: 'Ezber cevap',       en: 'Rote answer' },        color: '#94a3b8' },
    { id: 'detect',   emoji: '🧭', label: { tr: 'Durum tespiti',     en: 'Situation check' },    color: '#f59e0b' },
    { id: 'evidence', emoji: '⌨️', label: { tr: 'Komut + gerekçe',   en: 'Command + rationale' }, color: '#10b981' },
    { id: 'team',     emoji: '🛡️', label: { tr: 'Takım güvenliği',   en: 'Team safety' },        color: '#0ea5e9' },
    { id: 'java',     emoji: '☕', label: { tr: 'Java analojisi',    en: 'Java analogy' },       color: '#8b5cf6' },
    { id: 'win',      emoji: '🏆', label: { tr: 'Güçlü cevap',       en: 'Strong answer' },      color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Mülakatçı soruyor: "Yanlışlıkla main\'e commit attın, henüz push etmedin — ne yaparsın?" Bu filmde aynı soruya iki cevabın — ezber ile yapılandırılmış cevabın — farkını izleyeceksin.',
        en: 'The interviewer asks: "You accidentally committed to main and have not pushed yet — what do you do?" In this film you will watch the difference between two answers to the same question — rote versus structured.',
      },
      positions: {
        question: { x: 50, y: 50, scale: 1.2, pulse: true },
      },
    },
    {
      caption: {
        tr: 'Zayıf refleks: "git reset kullanırım." Hangi reset? İş kaybolur mu? Push edilmiş olsaydı ne değişirdi? Komut adı ezberlemek Google\'da arama yapabilmekle eşdeğerdir — mülakatçı derinliği burada GÖREMEZ.',
        en: 'The weak reflex: "I would use git reset." Which reset? Is work lost? What if it had been pushed? Memorizing a command name is equivalent to being able to search Google — the interviewer sees NO depth here.',
      },
      positions: {
        question: { x: 18, y: 40, scale: 0.9, opacity: 0.7 },
        rote: { x: 52, y: 55, scale: 1.15, pulse: true, opacity: 0.75 },
      },
      beams: [{ from: 'question', to: 'rote', color: '#94a3b8' }],
    },
    {
      caption: {
        tr: 'Güçlü cevabın 1. katmanı — durumu TESPİT et: "Önce `git status` ve `git log --oneline -3` ile neyin commit\'lendiğini ve push edilip edilmediğini doğrularım. Push yoksa tarih hâlâ sadece bende — hareket alanım geniş."',
        en: 'Layer 1 of the strong answer — CHECK the situation: "First I confirm what was committed and whether it was pushed, with `git status` and `git log --oneline -3`. If there is no push, the history still lives only on my machine — I have room to move."',
      },
      code: { tr: `git status\ngit log --oneline -3`, en: `git status\ngit log --oneline -3` },
      positions: {
        rote: { x: 14, y: 70, scale: 0.7, opacity: 0.35 },
        detect: { x: 48, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'question', to: 'detect' }],
    },
    {
      caption: {
        tr: '2. katman — komut + GEREKÇE: "`git reset --soft HEAD~1` derim, çünkü commit\'i geri alırken işi staging\'de KORUR. `--hard` da commit\'i geri alırdı ama emeği silerdi." Alternatifi neden SEÇMEDİĞİNİ söylemek, komutun kendisinden daha değerlidir.',
        en: 'Layer 2 — command + RATIONALE: "I would run `git reset --soft HEAD~1`, because it undoes the commit while KEEPING the work staged. `--hard` would also undo the commit but would destroy the work." Saying why you did NOT choose the alternative is worth more than the command itself.',
      },
      code: { tr: `git reset --soft HEAD~1`, en: `git reset --soft HEAD~1` },
      positions: {
        detect: { x: 18, y: 40, scale: 0.85, opacity: 0.6 },
        evidence: { x: 50, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'detect', to: 'evidence' }],
    },
    {
      caption: {
        tr: '3. katman — TAKIM güvenliği: "Commit push edilmiş OLSAYDI reset kullanmazdım; paylaşılan tarihi yeniden yazmak takımın referanslarını bozar. Orada `git revert` ile geri alma commit\'i eklerdim." Bu cümle, gerçek takım tecrübesinin kanıtıdır.',
        en: 'Layer 3 — TEAM safety: "HAD the commit been pushed, I would not use reset; rewriting shared history breaks the team\'s references. There I would add an undo commit with `git revert`." This sentence is the proof of real team experience.',
      },
      code: { tr: `# push edilmis olsaydi:\ngit revert HEAD`, en: `# had it been pushed:\ngit revert HEAD` },
      positions: {
        evidence: { x: 18, y: 40, scale: 0.85, opacity: 0.6 },
        team: { x: 50, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'evidence', to: 'team' }],
    },
    {
      caption: {
        tr: '4. katman — Java köprüsü: "reset --soft, IDE\'deki \'undo commit\'e benzer — değişiklik durur, kayıt geri alınır; revert ise muhasebedeki ters kayıt gibi bir compensating transaction\'dır: tarihi silmez, düzelten yeni bir kayıt ekler." Bildiğin dünyaya köprü kurmak cevabı kalıcı yapar.',
        en: 'Layer 4 — the Java bridge: "reset --soft is like \'undo commit\' in the IDE — the change stays, the record is taken back; revert is a compensating transaction like a reversing entry in accounting: it never erases history, it adds a new correcting record." Bridging to a world you know makes the answer stick.',
      },
      positions: {
        team: { x: 18, y: 40, scale: 0.85, opacity: 0.6 },
        java: { x: 50, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'team', to: 'java' }],
    },
    {
      caption: {
        tr: 'Final — formül: durum tespiti → komut + gerekçe → takım güvenliği/risk → Java analojisi. Aşağıdaki her mülakat sorusunda cevabını bu 4 katmandan geçir; sıralı düşünen aday, komut ezberleyeni her zaman geçer.',
        en: 'Final — the formula: situation check → command + rationale → team safety/risk → Java analogy. Run your answer through these 4 layers for every interview question below; the candidate who thinks in order always beats the one who memorized commands.',
      },
      positions: {
        detect: { x: 14, y: 55, scale: 0.85 },
        evidence: { x: 34, y: 40, scale: 0.85 },
        team: { x: 54, y: 55, scale: 0.85 },
        java: { x: 72, y: 40, scale: 0.85 },
        win: { x: 88, y: 50, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'detect', to: 'evidence' }, { from: 'evidence', to: 'team' }, { from: 'team', to: 'java' }, { from: 'java', to: 'win' }],
    },
  ],
}

const gitInterviewAnswerSteps = {
  type: 'step-animation',
  id: 'git-interview-answer-steps',
  title: { tr: 'Adım Adım: Senaryo Cevabı Kurma', en: 'Step by Step: Building a Scenario Answer' },
  steps: [
    { id: 1, icon: '🧭', label: { tr: 'Durumu netleştir', en: 'Clarify the situation' }, detail: { tr: 'Cevaba kosullari netlestirerek basla: push edildi mi, kac commit var, kimler etkilenir? Mulakatci bu sorulari sordugunu duymak ister — gercek iste de ilk adim budur.', en: 'Open by clarifying conditions: was it pushed, how many commits, who is affected? The interviewer wants to hear you ask these — it is also the first step in real work.' } },
    { id: 2, icon: '🔍', label: { tr: 'Kanıt komutlarını söyle', en: 'Name the evidence commands' }, detail: { tr: '"Once `git status` ve `git log` ile gorurum" de — korkusuzca komut listelemek degil, KANIT toplama refleksini gostermek puandir.', en: 'Say "first I look with `git status` and `git log`" — the point is showing the evidence-gathering reflex, not fearlessly listing commands.' } },
    { id: 3, icon: '⚖️', label: { tr: 'Komut + gerekçe ver', en: 'Give command + rationale' }, detail: { tr: 'Secilen komutu NEDENiyle soyle ve reddettigin alternatifi ekle: "--soft isi korur, --hard silerdi". Gerekce yoksa cevap ezberden ayirt edilemez.', en: 'State the chosen command WITH its why and add the alternative you rejected: "--soft keeps the work, --hard would destroy it". Without rationale the answer is indistinguishable from rote memory.' } },
    { id: 4, icon: '🛡️', label: { tr: 'Takım riskini açıkla', en: 'Explain the team risk' }, detail: { tr: 'Paylasilan tarih kuralini mutlaka soyle: push edilmis commit\'te reset degil `git revert`; force gerekiyorsa `--force-with-lease`. Takim guvenligi cumlesi, junior ile senior cevabi ayiran cizgidir.', en: 'Always state the shared-history rule: `git revert` instead of reset on pushed commits; `--force-with-lease` if force is unavoidable. The team-safety sentence is the line between a junior and a senior answer.' } },
    { id: 5, icon: '☕', label: { tr: 'Java analojisiyle kapat', en: 'Close with a Java analogy' }, detail: { tr: 'Cevabi bildigin dunyaya bagla: revert bir compensating transaction, stash bir gecici degisken raflamasi gibidir. Analoji, kavrami gercekten ANLADIGINI kanitlar.', en: 'Tie the answer to a world you know: revert is like a compensating transaction, stash like shelving a temporary variable. The analogy proves you truly UNDERSTAND the concept.' } },
  ],
}

const gitInterviewPractice = {
  type: 'code-playground',
  relatedTopicId: 'git-github',
  id: 'git-interview-practice-01',
  label: {
    tr: 'Micro Lab: Mülakat senaryosunu komutlarla cevapla',
    en: 'Micro Lab: Answer the interview scenario with commands',
  },
  language: 'bash',
  task: {
    tr: 'Klasik mülakat senaryosu: yanlış dosya commit\'lendi ama henüz push YOK. Filmdeki 4 katmanlı cevabı komut akışına çevir — TODO satırını, commit\'i geri alırken işi staging\'de koruyan komutla tamamla.',
    en: 'The classic interview scenario: the wrong file was committed but NOT yet pushed. Turn the film\'s 4-layer answer into a command flow — complete the TODO line with the command that undoes the commit while keeping the work staged.',
  },
  explanation: {
    tr: 'Bu gercek bir runtime degil; amac mulakatta anlatacagin cozum akisini (tespit → geri al → ayikla → yeniden commit\'le) elle yazarak pekistirmek.',
    en: 'This is not a real runtime; the goal is to reinforce the solution flow you would narrate in an interview (check → undo → separate → recommit) by writing it yourself.',
  },
  code: {
    tr: `# senaryo: rapor.xlsx yanlislikla commit'lendi (push HENUZ yok)\ngit log --oneline -1\n# cikti: a1b2c3d chore: gecici rapor eklendi\n\n# 1) commit'i geri al ama isi staging'de KORU\ngit reset --soft HEAD~1\n\n# 2) yanlis dosyayi staging'den cikar\ngit restore --staged rapor.xlsx\n\n# 3) bir daha kazara girmesin diye ignore'a ekle\necho "rapor.xlsx" >> .gitignore\n\n# 4) sadece dogru dosyalarla yeniden commit'le\ngit commit -m "test: checkout regression spec eklendi"`,
    en: `# scenario: report.xlsx was committed by mistake (NOT pushed yet)\ngit log --oneline -1\n# output: a1b2c3d chore: temp report added\n\n# 1) undo the commit but KEEP the work staged\ngit reset --soft HEAD~1\n\n# 2) take the wrong file out of staging\ngit restore --staged report.xlsx\n\n# 3) add it to ignore so it never slips in again\necho "report.xlsx" >> .gitignore\n\n# 4) recommit with only the right files\ngit commit -m "test: add checkout regression spec"`,
  },
  starterCode: {
    tr: `# senaryo: rapor.xlsx yanlislikla commit'lendi (push HENUZ yok)\ngit log --oneline -1\n# cikti: a1b2c3d chore: gecici rapor eklendi\n\n# 1) TODO: commit'i geri al ama isi staging'de koruyan komutu yaz\n\n# 2) yanlis dosyayi staging'den cikar\ngit restore --staged rapor.xlsx\n\n# 3) bir daha kazara girmesin diye ignore'a ekle\necho "rapor.xlsx" >> .gitignore\n\n# 4) sadece dogru dosyalarla yeniden commit'le\ngit commit -m "test: checkout regression spec eklendi"`,
    en: `# scenario: report.xlsx was committed by mistake (NOT pushed yet)\ngit log --oneline -1\n# output: a1b2c3d chore: temp report added\n\n# 1) TODO: write the command that undoes the commit but keeps the work staged\n\n# 2) take the wrong file out of staging\ngit restore --staged report.xlsx\n\n# 3) add it to ignore so it never slips in again\necho "report.xlsx" >> .gitignore\n\n# 4) recommit with only the right files\ngit commit -m "test: add checkout regression spec"`,
  },
  solutionCode: {
    tr: `# senaryo: rapor.xlsx yanlislikla commit'lendi (push HENUZ yok)\ngit log --oneline -1\n# cikti: a1b2c3d chore: gecici rapor eklendi\n\n# 1) commit'i geri al ama isi staging'de KORU\ngit reset --soft HEAD~1\n\n# 2) yanlis dosyayi staging'den cikar\ngit restore --staged rapor.xlsx\n\n# 3) bir daha kazara girmesin diye ignore'a ekle\necho "rapor.xlsx" >> .gitignore\n\n# 4) sadece dogru dosyalarla yeniden commit'le\ngit commit -m "test: checkout regression spec eklendi"`,
    en: `# scenario: report.xlsx was committed by mistake (NOT pushed yet)\ngit log --oneline -1\n# output: a1b2c3d chore: temp report added\n\n# 1) undo the commit but KEEP the work staged\ngit reset --soft HEAD~1\n\n# 2) take the wrong file out of staging\ngit restore --staged report.xlsx\n\n# 3) add it to ignore so it never slips in again\necho "report.xlsx" >> .gitignore\n\n# 4) recommit with only the right files\ngit commit -m "test: add checkout regression spec"`,
  },
  expected: {
    tr: '`git log --oneline -1` yeni ve dogru mesajli commit\'i gosterir; rapor.xlsx artik ne commit\'te ne staging\'dedir, .gitignore onu kalici olarak dislar.',
    en: '`git log --oneline -1` shows the new, correctly-messaged commit; report.xlsx is in neither the commit nor staging, and .gitignore excludes it permanently.',
  },
  hints: [
    { tr: 'Push HENUZ yapilmadigi icin tarih sadece senin makinende — reset ailesi guvenli; push edilmis olsaydi `git revert` gerekirdi.', en: 'Since there is NO push yet, the history lives only on your machine — the reset family is safe; had it been pushed, `git revert` would be required.' },
    { tr: 'Isi kaybetmeden commit\'i geri almak icin reset\'in `--soft` modunu sec: HEAD bir geri gider, dosyalar staging\'de bekler.', en: 'To undo the commit without losing work, pick the `--soft` mode of reset: HEAD moves back one, the files wait in staging.' },
    { tr: 'TODO satirinin hedefi `HEAD~1`\'dir — yani "bir onceki commit\'e don ama calismami koru".', en: 'The target of the TODO line is `HEAD~1` — that is, "go back one commit but preserve my work".' },
  ],
  xpReward: 10,
}

// ─── Giriş sekmesi film bloğu (video-scene — EN + TR paylaşımlı) ───
// Spesifikasyon: Documents/video-rollout-plan.md §7.4 A1
const gitVersionChaosFilm = {
  type: 'video-scene',
  id: 'git-version-chaos-film',
  title: {
    tr: '🎬 Versiyonsuz Dünyadan Git\'e',
    en: '🎬 From a Versionless World to Git',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'file1',    emoji: '📁', label: { tr: 'rapor_final.zip',          en: 'report_final.zip' },         color: '#94a3b8' },
    { id: 'file2',    emoji: '📁', label: { tr: 'rapor_final_v2_SON.zip',   en: 'report_final_v2_FINAL.zip' }, color: '#64748b' },
    { id: 'lost',     emoji: '😱', label: { tr: 'Kaybolan emek',            en: 'Lost work' },                 color: '#ef4444' },
    { id: 'snapshot', emoji: '📸', label: { tr: 'Git snapshot zinciri',     en: 'Git snapshot chain' },        color: '#8b5cf6' },
    { id: 'head',     emoji: '🏷️', label: { tr: 'HEAD',                    en: 'HEAD' },                      color: '#f97316' },
    { id: 'github',   emoji: '☁️', label: { tr: 'GitHub',                   en: 'GitHub' },                    color: '#0ea5e9' },
    { id: 'team',     emoji: '👥', label: { tr: 'Takım',                    en: 'Team' },                      color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Git\'ten önceki dünyayı izleyeceksin: dosya adına "_v2", "_SON", "_GERCEK_SON" ekleyerek versiyonlamanın gerçekte NEDEN çöktüğünü göreceksin.',
        en: 'You will watch the world before Git: adding "_v2", "_FINAL", "_ACTUAL_FINAL" to a filename — and why this "versioning" actually collapses.',
      },
      positions: {
        file1: { x: 50, y: 50, scale: 1.2, pulse: true },
      },
    },
    {
      caption: {
        tr: 'İkinci bir kopya doğar: `rapor_final_v2_SON.zip`. Hangisi güncel? İki hafta sonra kimse hatırlamaz — biri yanlış dosya üzerinde çalışır, saatlerce emek SESSİZCE kaybolur, hiçbir uyarı gelmez.',
        en: 'A second copy is born: `report_final_v2_FINAL.zip`. Which one is current? Two weeks later nobody remembers — someone works on the wrong file, hours of work vanish SILENTLY, with no warning at all.',
      },
      positions: {
        file1: { x: 20, y: 40, scale: 0.9, opacity: 0.6 },
        file2: { x: 45, y: 55, scale: 1.05 },
        lost: { x: 72, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'file2', to: 'lost', color: '#ef4444' }],
    },
    {
      caption: {
        tr: '`git init` bir zaman makinesi kurar: artık dosya adını değiştirerek versiyon uydurmuyorsun — Git her anlamlı değişikliği kendi başına, isim çakışması olmadan hatırlıyor.',
        en: '`git init` builds a time machine: you no longer fake versions by renaming files — Git remembers every meaningful change on its own, with no naming collisions.',
      },
      code: { tr: `git init`, en: `git init` },
      positions: {
        file1: { x: 14, y: 65, scale: 0.6, opacity: 0.3 },
        file2: { x: 14, y: 35, scale: 0.6, opacity: 0.3 },
        lost: { x: 30, y: 50, scale: 0.6, opacity: 0.25 },
        snapshot: { x: 55, y: 50, scale: 1.15, pulse: true },
      },
    },
    {
      caption: {
        tr: 'Her `git commit` zincire yeni bir SNAPSHOT ekler — dosyayı EZMEZ, yanına bir kopya da bırakmaz; zaman içinde geriye dönüp karşılaştırabileceğin bir tarih biriktirir.',
        en: 'Every `git commit` adds a new SNAPSHOT to the chain — it does not overwrite the file, nor does it leave a copy lying around; it accumulates a history you can look back through and compare.',
      },
      code: { tr: `git commit -m "rapor: ilk taslak"`, en: `git commit -m "report: first draft"` },
      positions: {
        snapshot: { x: 30, y: 50, scale: 1, pulse: true },
      },
    },
    {
      caption: {
        tr: '🏷️ HEAD işaretçisi her zaman "şu an neredeyim" sorusunun cevabıdır. İstenirse önceki bir snapshot\'a GERİ dönülebilir — dosya isminde "_SON" yazması gerekmez, HEAD güvenle taşır.',
        en: 'The 🏷️ HEAD pointer always answers "where am I right now". You can safely move BACK to an earlier snapshot on demand — no filename needs to say "_FINAL", HEAD carries you there safely.',
      },
      code: { tr: `git log --oneline`, en: `git log --oneline` },
      positions: {
        snapshot: { x: 40, y: 50, scale: 1, opacity: 0.7 },
        head: { x: 58, y: 32, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'snapshot', to: 'head', color: '#f97316' }],
    },
    {
      caption: {
        tr: 'GitHub, bu zincirin BULUTTAKİ kopyasıdır — üstüne işbirliği katmanı eklenir: takım arkadaşların aynı snapshot zincirini görür, review yapar, kimse dosyayı e-posta ekiyle göndermez.',
        en: 'GitHub is the CLOUD copy of this chain — a collaboration layer is added on top: your teammates see the same snapshot chain, review it, and nobody emails zip attachments anymore.',
      },
      code: { tr: `git push -u origin main`, en: `git push -u origin main` },
      positions: {
        snapshot: { x: 24, y: 50, scale: 0.85, opacity: 0.6 },
        github: { x: 54, y: 50, scale: 1.2, pulse: true },
        team: { x: 80, y: 40, scale: 1.05, pulse: true },
      },
      beams: [{ from: 'snapshot', to: 'github' }, { from: 'github', to: 'team', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Final — Git ≠ GitHub: Git motorun kendisidir (local, offline çalışır, snapshot zinciri tutar); GitHub o motorun showroom\'udur (bulutta paylaşım, review, CI). QA bağı: versiyonsuz bir test reposu, kanıtsız bir QA demektir — hangi test script\'inin hangi bug\'ı yakaladığını asla ispatlayamazsın.',
        en: 'Final — Git ≠ GitHub: Git is the engine itself (local, works offline, keeps the snapshot chain); GitHub is that engine\'s showroom (cloud sharing, review, CI). The QA tie-in: a versionless test repo means QA without proof — you can never prove which test script caught which bug.',
      },
      positions: {
        snapshot: { x: 14, y: 55, scale: 0.85 },
        head: { x: 32, y: 35, scale: 0.85 },
        github: { x: 54, y: 55, scale: 0.9 },
        team: { x: 74, y: 35, scale: 0.85 },
        lost: { x: 88, y: 58, scale: 0.7, opacity: 0.4 },
      },
      beams: [{ from: 'snapshot', to: 'head' }, { from: 'head', to: 'github' }, { from: 'github', to: 'team' }],
    },
  ],
}

// ─── Kurulum sekmesi film bloğu (video-scene — EN + TR paylaşımlı) ───
// Spesifikasyon: Documents/video-rollout-plan.md §7.4 A2
const gitIdentityConfigFilm = {
  type: 'video-scene',
  id: 'git-identity-config-film',
  title: {
    tr: '🎬 Bir Commit\'e Kimlik Damgası Vurmak',
    en: '🎬 Stamping a Commit with an Identity',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'machine',   emoji: '💻', label: { tr: 'Yeni makine',              en: 'Fresh machine' },              color: '#64748b' },
    { id: 'installer', emoji: '📦', label: { tr: 'Git installer',            en: 'Git installer' },              color: '#f97316' },
    { id: 'identity',  emoji: '🪪', label: { tr: 'user.name / user.email',   en: 'user.name / user.email' },     color: '#8b5cf6' },
    { id: 'layers',    emoji: '🗂️', label: { tr: 'Config katmanları',        en: 'Config layers' },              color: '#0ea5e9' },
    { id: 'commit',    emoji: '✍️', label: { tr: 'İlk commit',               en: 'First commit' },               color: '#22c55e' },
    { id: 'ghost',     emoji: '❓', label: { tr: 'Kimliksiz commit',         en: 'Identity-less commit' },       color: '#ef4444' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Yepyeni bir makinedesin — henüz Git yok. Bu filmde `git --version`\'dan ilk commit\'e kadar giden kimlik yolculuğunu izleyeceksin.',
        en: 'You are on a brand-new machine — no Git yet. In this film you will watch the identity journey from `git --version` all the way to the first commit.',
      },
      positions: {
        machine: { x: 50, y: 50, scale: 1.2, pulse: true },
      },
    },
    {
      caption: {
        tr: 'Git kurulur (`winget`/`brew`/`apt`) ve `git --version` ile doğrulanır. Ama kurulum tek başına yetmez — Git seni HENÜZ tanımıyor, her komut anonim çalışır.',
        en: 'Git gets installed (`winget`/`brew`/`apt`) and verified with `git --version`. But installation alone is not enough — Git does not know who you are YET, every command runs anonymously.',
      },
      code: { tr: `git --version\n# git version 2.43.0`, en: `git --version\n# git version 2.43.0` },
      positions: {
        machine: { x: 18, y: 50, scale: 0.85, opacity: 0.6 },
        installer: { x: 52, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'machine', to: 'installer' }],
    },
    {
      caption: {
        tr: 'Kimlik ayarı: `git config --global user.name` ve `user.email`. Bu ikisi olmadan bir sonraki soru şu — "commit\'i kim attı?" sorusunun cevabı olmaz.',
        en: 'Identity setup: `git config --global user.name` and `user.email`. Without these two, the next question has no answer — "who made this commit?"',
      },
      code: { tr: `git config --global user.name "Hasan Kocaman"\ngit config --global user.email "hasan@example.com"`, en: `git config --global user.name "Hasan Kocaman"\ngit config --global user.email "hasan@example.com"` },
      positions: {
        installer: { x: 18, y: 45, scale: 0.85, opacity: 0.6 },
        identity: { x: 52, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'installer', to: 'identity' }],
    },
    {
      caption: {
        tr: 'Config\'in 3 katmanı vardır: system → global → local. Aynı ayar birden fazla katmanda varsa LOCAL kazanır — tıpkı Java\'da method-level override\'ın class-level default\'u ezmesi gibi.',
        en: 'Config has 3 layers: system → global → local. If the same setting exists in more than one layer, LOCAL wins — just like a Java method-level override beats a class-level default.',
      },
      code: { tr: `git config --list --show-origin`, en: `git config --list --show-origin` },
      positions: {
        identity: { x: 20, y: 40, scale: 0.85, opacity: 0.6 },
        layers: { x: 55, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'identity', to: 'layers' }],
    },
    {
      caption: {
        tr: 'İlk commit atılır — ve o an kimlik SNAPSHOT\'ın içine damgalanır: kim, ne zaman, hangi e-postayla. Bu damga o commit\'ten asla silinmez.',
        en: 'The first commit lands — and at that moment the identity is stamped INTO the snapshot: who, when, with which email. This stamp never leaves that commit.',
      },
      code: { tr: `git commit -m "chore: proje iskeleti"\n# Author: Hasan Kocaman <hasan@example.com>`, en: `git commit -m "chore: project scaffold"\n# Author: Hasan Kocaman <hasan@example.com>` },
      positions: {
        layers: { x: 20, y: 40, scale: 0.85, opacity: 0.6 },
        commit: { x: 55, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'layers', to: 'commit' }],
    },
    {
      caption: {
        tr: 'Kontrast — kimlik ayarlanmasaydı: commit "unknown" veya makine kullanıcı adıyla düşer. `git blame` kimin yazdığını söyleyemez, audit log\'lar çöker.',
        en: 'Contrast — had identity not been set: the commit falls back to "unknown" or the machine\'s system username. `git blame` cannot say who wrote it, audit logs break down.',
      },
      positions: {
        commit: { x: 22, y: 45, scale: 0.85, opacity: 0.6 },
        ghost: { x: 58, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'commit', to: 'ghost', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Final — QA bağı: "bu test hangi commit\'te bozuldu, kim değiştirdi?" sorusunun cevabı, kurulumdan ÖNCE değil, `user.name`/`user.email` ayarından SONRA doğru olmaya başlar. Kimlik, test edilebilirliğin ilk katmanıdır.',
        en: 'Final — the QA tie-in: the answer to "which commit broke this test, who changed it?" only starts being correct AFTER `user.name`/`user.email` are set — not before installation. Identity is the first layer of testability.',
      },
      positions: {
        machine: { x: 10, y: 55, scale: 0.75 },
        identity: { x: 30, y: 38, scale: 0.85 },
        layers: { x: 50, y: 58, scale: 0.85 },
        commit: { x: 72, y: 40, scale: 1.1, pulse: true },
        ghost: { x: 88, y: 58, scale: 0.65, opacity: 0.35 },
      },
      beams: [{ from: 'identity', to: 'layers' }, { from: 'layers', to: 'commit' }],
    },
  ],
}

// ─── .gitignore sekmesi film bloğu (video-scene — EN + TR paylaşımlı) ───
// Spesifikasyon: Documents/video-rollout-plan.md §7.4 A3
const gitignoreFilterFilm = {
  type: 'video-scene',
  id: 'gitignore-filter-film',
  title: {
    tr: '🎬 .gitignore: Kapıdaki Filtre',
    en: '🎬 .gitignore: The Filter at the Door',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'screenshots', emoji: '📸', label: { tr: 'screenshots/',            en: 'screenshots/' },            color: '#94a3b8' },
    { id: 'videos',      emoji: '🎥', label: { tr: 'videos/',                 en: 'videos/' },                 color: '#94a3b8' },
    { id: 'env',         emoji: '🔑', label: { tr: '.env',                    en: '.env' },                    color: '#ef4444' },
    { id: 'results',     emoji: '📄', label: { tr: 'test-results/',           en: 'test-results/' },           color: '#94a3b8' },
    { id: 'filter',      emoji: '🛡️', label: { tr: '.gitignore filtresi',     en: '.gitignore filter' },       color: '#059669' },
    { id: 'staging',     emoji: '🎬', label: { tr: 'Staging',                 en: 'Staging' },                 color: '#f59e0b' },
    { id: 'leak',        emoji: '💥', label: { tr: 'Sızan secret',            en: 'Leaked secret' },           color: '#dc2626' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Test koşumu bitti: ekran görüntüleri, video kayıtları, `.env` dosyası ve test raporları diskte birikti. Şimdi hepsi `git add .` ile staging\'e süpürülmek üzere.',
        en: 'The test run just finished: screenshots, video recordings, a `.env` file and test reports piled up on disk. Now all of it is about to be swept into staging with `git add .`.',
      },
      positions: {
        screenshots: { x: 18, y: 30, scale: 0.9 },
        videos: { x: 18, y: 70, scale: 0.9 },
        env: { x: 50, y: 50, scale: 1.1, pulse: true },
        results: { x: 82, y: 50, scale: 0.9 },
      },
    },
    {
      caption: {
        tr: '`git add .` çalışır — filtre OLMASAYDI bu dört dosya da doğrudan staging\'e girerdi. Ama araya `.gitignore` giriyor.',
        en: '`git add .` runs — WITHOUT a filter, all four of these would go straight into staging. But `.gitignore` steps in between.',
      },
      code: { tr: `git add .`, en: `git add .` },
      positions: {
        screenshots: { x: 30, y: 30, scale: 0.85 },
        videos: { x: 30, y: 70, scale: 0.85 },
        env: { x: 45, y: 50, scale: 1 },
        results: { x: 60, y: 50, scale: 0.85 },
        filter: { x: 78, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'env', to: 'filter' }, { from: 'screenshots', to: 'filter' }],
    },
    {
      caption: {
        tr: '.gitignore filtresi devreye girer: `*.png`, `videos/`, `.env*`, `test-results/` desenleriyle eşleşen HER şey kapıda geri döner — kapıdan içeri hiç girmezler.',
        en: 'The .gitignore filter kicks in: EVERYTHING matching `*.png`, `videos/`, `.env*`, `test-results/` patterns turns back at the door — they never make it inside.',
      },
      code: { tr: `screenshots/*.png\nvideos/\n.env*\ntest-results/`, en: `screenshots/*.png\nvideos/\n.env*\ntest-results/` },
      positions: {
        screenshots: { x: 30, y: 25, scale: 0.7, opacity: 0.45 },
        videos: { x: 30, y: 75, scale: 0.7, opacity: 0.45 },
        env: { x: 30, y: 50, scale: 0.7, opacity: 0.45 },
        results: { x: 55, y: 50, scale: 0.7, opacity: 0.45 },
        filter: { x: 55, y: 50, scale: 1.25, pulse: true },
      },
    },
    {
      caption: {
        tr: 'Sadece kaynak kod staging\'e geçer — dört üretilmiş dosya kapının dışında kaldı. `git status` artık sadece anlamlı, kasıtlı değişiklikleri gösterir.',
        en: 'Only source code makes it into staging — the four generated files stayed outside the gate. `git status` now shows only meaningful, intentional changes.',
      },
      code: { tr: `git status\n# clean — sadece kaynak kod degisti`, en: `git status\n# clean — only source code changed` },
      positions: {
        filter: { x: 30, y: 50, scale: 0.85, opacity: 0.6 },
        staging: { x: 62, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'filter', to: 'staging', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Kural anatomisi: `*.png` her yerdeki eşleşeni yakalar, `node_modules/` sonundaki `/` ile SADECE klasörü hedefler, `!keep.png` ise bir öncekini İSTİSNA ederek geri kabul eder.',
        en: 'Rule anatomy: `*.png` catches every match anywhere, the trailing `/` in `node_modules/` targets ONLY the folder, and `!keep.png` re-admits a file by EXCEPTING an earlier rule.',
      },
      code: { tr: `*.png\nnode_modules/\n!keep.png`, en: `*.png\nnode_modules/\n!keep.png` },
      positions: {
        staging: { x: 50, y: 50, scale: 1, pulse: true },
      },
    },
    {
      caption: {
        tr: 'Kontrast — filtre OLMASAYDI: `.env` içindeki gerçek API key remote\'a çıkardı. Herkese açık repo geçmişinde artık bir secret var — rotasyon ZORUNLU, incident raporu açılır.',
        en: 'Contrast — WITHOUT the filter: the real API key inside `.env` would have gone to the remote. There is now a secret in a public repo\'s history forever — rotation is MANDATORY, an incident report gets opened.',
      },
      positions: {
        staging: { x: 22, y: 45, scale: 0.85, opacity: 0.5 },
        leak: { x: 60, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'staging', to: 'leak', color: '#dc2626' }],
    },
    {
      caption: {
        tr: 'Final — kritik uyarı: .gitignore\'u SONRADAN eklemek, zaten commit\'lenmiş bir dosyayı KURTARMAZ; Git onu izlemeye devam eder. Kurtuluş `git rm --cached <dosya>` ile takibi bırakmaktır — dosya diskte kalır, sadece Git\'in radarından çıkar.',
        en: 'Final — the critical warning: adding .gitignore AFTERWARD does NOT rescue a file that is already committed; Git keeps tracking it. The fix is `git rm --cached <file>` to stop tracking — the file stays on disk, it just leaves Git\'s radar.',
      },
      code: { tr: `git rm --cached .env`, en: `git rm --cached .env` },
      positions: {
        filter: { x: 15, y: 55, scale: 0.85 },
        staging: { x: 38, y: 38, scale: 0.85 },
        env: { x: 60, y: 55, scale: 0.9, pulse: true },
        leak: { x: 82, y: 38, scale: 0.75, opacity: 0.4 },
      },
      beams: [{ from: 'filter', to: 'staging' }, { from: 'staging', to: 'env' }],
    },
  ],
}

// ─── Branch & Switch sekmesi film bloğu (video-scene — EN + TR paylaşımlı) ───
// Spesifikasyon: Documents/video-rollout-plan.md §7.4 A4
const gitBranchParallelFilm = {
  type: 'video-scene',
  id: 'git-branch-parallel-film',
  title: {
    tr: '🎬 Branch: Ucuz Bir Paralel Evren',
    en: '🎬 Branch: A Cheap Parallel Universe',
  },
  xpReward: 15,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'main',    emoji: '🌳', label: { tr: 'main zinciri',           en: 'main chain' },            color: '#16a34a' },
    { id: 'feature', emoji: '🌿', label: { tr: 'feature/login-tests',    en: 'feature/login-tests' },   color: '#22c55e' },
    { id: 'head',    emoji: '🏷️', label: { tr: 'HEAD',                   en: 'HEAD' },                  color: '#f97316' },
    { id: 'commits', emoji: '📦', label: { tr: 'Dal commit\'leri',       en: 'Branch commits' },        color: '#8b5cf6' },
    { id: 'stash',   emoji: '📥', label: { tr: 'stash rafı',             en: 'stash shelf' },           color: '#7c3aed' },
    { id: 'switch',  emoji: '🔀', label: { tr: 'switch',                 en: 'switch' },                color: '#0ea5e9' },
  ],
  scenes: [
    {
      caption: {
        tr: 'main zinciri stabil ve yeşil — CI ondan deploy ediyor. Bu filmde, main\'i hiç kirletmeden nasıl paralel bir çalışma alanı açtığını izleyeceksin.',
        en: 'The main chain is stable and green — CI deploys from it. In this film you will watch how to open a parallel workspace without ever dirtying main.',
      },
      positions: {
        main: { x: 50, y: 50, scale: 1.2, pulse: true },
      },
    },
    {
      caption: {
        tr: '`git branch feature/login-tests` sadece yeni bir İŞARETÇİ yaratır — dosyaların KOPYASI değil. Ucuzluğun sırrı bu: saniyeler içinde, disk alanı harcamadan.',
        en: '`git branch feature/login-tests` only creates a new POINTER — not a copy of the files. That is the secret of its cheapness: instant, with zero disk cost.',
      },
      code: { tr: `git branch feature/login-tests`, en: `git branch feature/login-tests` },
      positions: {
        main: { x: 30, y: 50, scale: 1, pulse: true },
        feature: { x: 65, y: 50, scale: 1.1, pulse: true },
      },
      beams: [{ from: 'main', to: 'feature', color: '#22c55e' }],
    },
    {
      caption: {
        tr: '`git switch feature/login-tests` ile HEAD işaretçisi dala GEÇER. Dosyaların hiçbiri fiziksel olarak taşınmadı — sadece "şu an neredeyim" cevabı değişti.',
        en: '`git switch feature/login-tests` MOVES the HEAD pointer onto the branch. None of the files physically moved — only the answer to "where am I right now" changed.',
      },
      code: { tr: `git switch feature/login-tests`, en: `git switch feature/login-tests` },
      positions: {
        main: { x: 22, y: 35, scale: 0.9, opacity: 0.6 },
        feature: { x: 55, y: 50, scale: 1.1 },
        head: { x: 55, y: 30, scale: 1.15, pulse: true },
        switch: { x: 38, y: 40, scale: 0.9, opacity: 0.7 },
      },
      beams: [{ from: 'feature', to: 'head', color: '#f97316' }],
    },
    {
      caption: {
        tr: 'Dalda commit\'ler birikir — main tamamen KIRLENMEDEN. İki zincir yan yana büyür, biri diğerini hiç etkilemez.',
        en: 'Commits pile up on the branch — main stays completely UNTOUCHED. Two chains grow side by side, neither affecting the other.',
      },
      code: { tr: `git commit -m "test: login timeout senaryosu"`, en: `git commit -m "test: login timeout scenario"` },
      positions: {
        main: { x: 20, y: 65, scale: 0.9 },
        feature: { x: 20, y: 30, scale: 0.9 },
        commits: { x: 55, y: 30, scale: 1.15, pulse: true },
        head: { x: 55, y: 15, scale: 0.9 },
      },
      beams: [{ from: 'feature', to: 'commits' }],
    },
    {
      caption: {
        tr: 'Acil bir işle bölündün ama işin yarım — commit atacak durumda değilsin. `git stash` yarım işi geçici bir RAFA kaldırır, working tree tertemiz kalır.',
        en: 'You get interrupted by something urgent, but your work is half-done — not ready to commit. `git stash` shelves the unfinished work onto a temporary SHELF, leaving the working tree spotless.',
      },
      code: { tr: `git stash\ngit switch main`, en: `git stash\ngit switch main` },
      positions: {
        commits: { x: 22, y: 40, scale: 0.85, opacity: 0.6 },
        stash: { x: 55, y: 55, scale: 1.2, pulse: true },
        main: { x: 80, y: 35, scale: 1.1, pulse: true },
      },
      beams: [{ from: 'commits', to: 'stash' }, { from: 'stash', to: 'main', color: '#16a34a' }],
    },
    {
      caption: {
        tr: 'Acil iş bitti, dala geri dönülür — `git stash pop` rafı boşaltıp yarım işi AYNI haliyle geri getirir. Hiçbir şey kaybolmadı, sadece bekletildi.',
        en: 'The urgent work is done, back to the branch — `git stash pop` empties the shelf and restores the unfinished work in the EXACT same state. Nothing was lost, it was only paused.',
      },
      code: { tr: `git switch feature/login-tests\ngit stash pop`, en: `git switch feature/login-tests\ngit stash pop` },
      positions: {
        main: { x: 20, y: 35, scale: 0.85, opacity: 0.6 },
        stash: { x: 45, y: 55, scale: 1, opacity: 0.7 },
        feature: { x: 70, y: 45, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'stash', to: 'feature', color: '#7c3aed' }],
    },
    {
      caption: {
        tr: 'Final — branch = paralel evren, stash = o evrende geçici duraklatma. QA bağı: riskli bir locator refactor\'ü main\'deki yeşil suite\'i bozmadan dalda denenir; başarısız olursa dal silinir, main hiç haberdar bile olmaz.',
        en: 'Final — branch = a parallel universe, stash = a temporary pause inside it. The QA tie-in: a risky locator refactor is tried on a branch without breaking main\'s green suite; if it fails, the branch is deleted and main never even knew.',
      },
      positions: {
        main: { x: 14, y: 60, scale: 0.9 },
        feature: { x: 40, y: 35, scale: 0.9 },
        commits: { x: 62, y: 55, scale: 0.85 },
        head: { x: 62, y: 20, scale: 0.75 },
        stash: { x: 84, y: 45, scale: 0.85, opacity: 0.6 },
      },
      beams: [{ from: 'main', to: 'feature', color: '#22c55e' }, { from: 'feature', to: 'commits' }],
    },
  ],
}

// ─── Merge & Conflict sekmesi film bloğu (video-scene — EN + TR paylaşımlı) ───
// Spesifikasyon: Documents/video-rollout-plan.md §7.4 A5
const gitMergeTwoFacesFilm = {
  type: 'video-scene',
  id: 'git-merge-two-faces-film',
  title: {
    tr: '🎬 Merge\'ün İki Yüzü: Fast-Forward ve Conflict',
    en: '🎬 The Two Faces of Merge: Fast-Forward and Conflict',
  },
  xpReward: 15,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'main',        emoji: '🌳', label: { tr: 'main',                    en: 'main' },                    color: '#16a34a' },
    { id: 'feature',     emoji: '🌿', label: { tr: 'feature dalı',            en: 'feature branch' },          color: '#22c55e' },
    { id: 'fastforward', emoji: '⏩', label: { tr: 'Fast-forward',            en: 'Fast-forward' },            color: '#0ea5e9' },
    { id: 'mergecommit', emoji: '🔗', label: { tr: 'Merge commit',            en: 'Merge commit' },            color: '#8b5cf6' },
    { id: 'conflict',    emoji: '⚔️', label: { tr: 'Conflict marker\'ları',   en: 'Conflict markers' },        color: '#ef4444' },
    { id: 'decision',    emoji: '🧑‍⚖️', label: { tr: 'İnsan kararı',           en: 'Human decision' },          color: '#f59e0b' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Senaryo 1: main hiç ilerlememiş, feature dalı ondan ayrıldığından beri tek başına commit atmış. `git merge` çağrılır — ne olacak?',
        en: 'Scenario 1: main has not moved at all, the feature branch has been committing alone since it split off. `git merge` is called — what happens?',
      },
      positions: {
        main: { x: 30, y: 50, scale: 1.1, pulse: true },
        feature: { x: 65, y: 50, scale: 1.1, pulse: true },
      },
    },
    {
      caption: {
        tr: 'Fast-forward: main\'in işaretçisi sadece ÖNE kayar, feature\'ın ucuna kadar. YENİ bir commit oluşmaz — main zaten hiç sapmamıştı, birleştirilecek "iki taraf" bile yoktu.',
        en: 'Fast-forward: main\'s pointer simply slides FORWARD, all the way to the tip of feature. NO new commit is created — main never diverged, there were not even "two sides" to combine.',
      },
      code: { tr: `git merge feature/login-tests\n# Fast-forward`, en: `git merge feature/login-tests\n# Fast-forward` },
      positions: {
        main: { x: 60, y: 50, scale: 1.2, pulse: true },
        feature: { x: 60, y: 50, scale: 0.9, opacity: 0.5 },
        fastforward: { x: 35, y: 30, scale: 1.1, pulse: true },
      },
      beams: [{ from: 'fastforward', to: 'main', color: '#0ea5e9' }],
    },
    {
      caption: {
        tr: 'Senaryo 2: bu sefer İKİ dal da ilerlemiş. Git ortak atayı bulur ve 3-yönlü bir merge dener — ortak ata + main\'in hali + feature\'ın hali karşılaştırılır.',
        en: 'Scenario 2: this time BOTH branches have moved forward. Git finds the common ancestor and attempts a 3-way merge — comparing the common ancestor, main\'s state, and feature\'s state.',
      },
      code: { tr: `git merge feature/login-tests`, en: `git merge feature/login-tests` },
      positions: {
        main: { x: 25, y: 35, scale: 1.05, pulse: true },
        feature: { x: 25, y: 65, scale: 1.05, pulse: true },
        mergecommit: { x: 65, y: 50, scale: 1.1, pulse: true },
      },
      beams: [{ from: 'main', to: 'mergecommit' }, { from: 'feature', to: 'mergecommit' }],
    },
    {
      caption: {
        tr: 'Aynı dosyanın FARKLI satırları değiştiyse: Git bunu otomatik birleştirir. Sen ellemeden, iki değişiklik de sonuca girer — çünkü çakışma YOK.',
        en: 'If DIFFERENT lines of the same file changed: Git merges it automatically. Both changes land in the result without you touching anything — because there is NO real collision.',
      },
      positions: {
        mergecommit: { x: 50, y: 50, scale: 1.15, pulse: true },
      },
    },
    {
      caption: {
        tr: 'Ama AYNI satır İKİ tarafta da değiştiyse: Git durur, tahmin etmez. `<<<<<<< HEAD` / `=======` / `>>>>>>> feature` marker\'larını dosyanın içine yazıp senden karar bekler.',
        en: 'But if the SAME line changed on BOTH sides: Git stops, it does not guess. It writes `<<<<<<< HEAD` / `=======` / `>>>>>>> feature` markers right into the file and waits for your decision.',
      },
      code: { tr: `<<<<<<< HEAD\nexpect(total).toBe(120)\n=======\nexpect(total).toBe(100)\n>>>>>>> feature/login-tests`, en: `<<<<<<< HEAD\nexpect(total).toBe(120)\n=======\nexpect(total).toBe(100)\n>>>>>>> feature/login-tests` },
      positions: {
        mergecommit: { x: 22, y: 40, scale: 0.85, opacity: 0.5 },
        conflict: { x: 58, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'mergecommit', to: 'conflict', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'İnsan araya girer: doğru içeriği seçer, üç marker satırını da SİLER, dosyayı test eder, sonra `git add` + `git commit` ile merge\'i tamamlar.',
        en: 'A human steps in: picks the correct content, DELETES all three marker lines, tests the file, then finishes the merge with `git add` + `git commit`.',
      },
      code: { tr: `git add tests/checkout.spec.js\ngit commit`, en: `git add tests/checkout.spec.js\ngit commit` },
      positions: {
        conflict: { x: 22, y: 40, scale: 0.85, opacity: 0.5 },
        decision: { x: 58, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'conflict', to: 'decision', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Final — bu merge commit\'in İKİ ebeveyni vardır, main ve feature\'ın ikisi de: tarih birleşmeyi UNUTMAZ. Ve asıl mesaj: conflict bir HATA değildir — Git\'in "iki doğru var, birini SEN seç" demesidir. Panik yerine prosedür.',
        en: 'Final — this merge commit has TWO parents, both main and feature: history NEVER forgets the merge happened. And the real message: a conflict is NOT an error — it is Git saying "there are two truths, YOU pick one". Procedure over panic.',
      },
      positions: {
        main: { x: 15, y: 60, scale: 0.85 },
        feature: { x: 15, y: 30, scale: 0.85 },
        conflict: { x: 45, y: 45, scale: 0.8, opacity: 0.5 },
        decision: { x: 66, y: 45, scale: 0.9 },
        mergecommit: { x: 88, y: 45, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'main', to: 'mergecommit' }, { from: 'feature', to: 'mergecommit' }, { from: 'decision', to: 'mergecommit' }],
    },
  ],
}

// ─── Rebase & İleri Akış sekmesi film bloğu (video-scene — EN + TR paylaşımlı) ───
// Spesifikasyon: Documents/video-rollout-plan.md §7.4 A6
const gitRebaseReplayFilm = {
  type: 'video-scene',
  id: 'git-rebase-replay-film',
  title: {
    tr: '🎬 Rebase: Commit\'leri Yeniden Oynatmak',
    en: '🎬 Rebase: Replaying Commits',
  },
  xpReward: 15,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'main',       emoji: '🌳', label: { tr: 'main (ilerlemiş)',        en: 'main (advanced)' },        color: '#16a34a' },
    { id: 'commits',    emoji: '📦', label: { tr: 'feature commit\'leri (C1, C2)', en: 'feature commits (C1, C2)' }, color: '#8b5cf6' },
    { id: 'replay',     emoji: '🔁', label: { tr: 'Replay mekanizması',      en: 'Replay mechanism' },       color: '#0ea5e9' },
    { id: 'newcommits', emoji: '🆕', label: { tr: 'C1\', C2\' (yeni hash)',   en: 'C1\', C2\' (new hash)' },   color: '#22c55e' },
    { id: 'linear',     emoji: '📜', label: { tr: 'Doğrusal tarih',          en: 'Linear history' },         color: '#f59e0b' },
    { id: 'danger',     emoji: '💥', label: { tr: 'Paylaşılan dalda rebase', en: 'Rebase on a shared branch' }, color: '#dc2626' },
  ],
  scenes: [
    {
      caption: {
        tr: 'feature dalı ESKİ bir main\'den ayrılmış. O günden beri main ilerledi — iki dal artık farklı temellerde duruyor.',
        en: 'The feature branch split off from an OLD main. Since then main has advanced — the two branches now stand on different bases.',
      },
      positions: {
        main: { x: 30, y: 35, scale: 1.1, pulse: true },
        commits: { x: 30, y: 65, scale: 1.1, pulse: true },
      },
    },
    {
      caption: {
        tr: 'Merge yerine REBASE seçilir: amaç ayrı iki tarih değil, tek bir DOĞRUSAL hikaye. `git rebase main` çağrılır.',
        en: 'REBASE is chosen instead of merge: the goal is not two separate histories, but a single LINEAR story. `git rebase main` is called.',
      },
      code: { tr: `git switch feature/login-tests\ngit rebase main`, en: `git switch feature/login-tests\ngit rebase main` },
      positions: {
        main: { x: 25, y: 40, scale: 1.1, pulse: true },
        commits: { x: 25, y: 68, scale: 0.9, opacity: 0.6 },
        replay: { x: 62, y: 50, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'commits', to: 'replay' }],
    },
    {
      caption: {
        tr: 'C1 kopyalanır ve main\'in en TEPESİNE yeniden uygulanır: C1\' doğar. İçerik AYNIDIR ama HASH FARKLIDIR — çünkü bir commit\'in kimliği kısmen kendi ATASININ hash\'inden gelir.',
        en: 'C1 is copied and replayed on TOP of main: C1\' is born. The content is THE SAME but the HASH is DIFFERENT — because a commit\'s identity partly comes from its PARENT\'s hash.',
      },
      code: { tr: `# C1 -> C1' (icerik ayni, hash farkli)`, en: `# C1 -> C1' (same content, different hash)` },
      positions: {
        replay: { x: 30, y: 50, scale: 0.9, opacity: 0.7 },
        newcommits: { x: 62, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'replay', to: 'newcommits', color: '#0ea5e9' }],
    },
    {
      caption: {
        tr: 'Sıra C2\'de: aynı şekilde kopyalanır, main\'in (artık C1\'\'i içeren) ucuna eklenir — C2\' oluşur. Replay mekanizması her commit\'i TEK TEK, sırayla işler.',
        en: 'Next is C2: it is copied the same way and appended to the tip of main (which now includes C1\') — C2\' is formed. The replay mechanism processes each commit ONE BY ONE, in order.',
      },
      code: { tr: `# C2 -> C2' (main'in yeni ucuna eklenir)`, en: `# C2 -> C2' (appended to main's new tip)` },
      positions: {
        newcommits: { x: 40, y: 50, scale: 1.1, pulse: true },
        linear: { x: 72, y: 50, scale: 1, opacity: 0.6 },
      },
      beams: [{ from: 'newcommits', to: 'linear' }],
    },
    {
      caption: {
        tr: 'Sonuç: dümdüz DOĞRUSAL bir tarih — merge commit yok, çatallanma yok. `git log --oneline --graph` artık tek bir düz çizgi çizer.',
        en: 'The result: a completely LINEAR history — no merge commit, no fork. `git log --oneline --graph` now draws a single straight line.',
      },
      code: { tr: `git log --oneline --graph`, en: `git log --oneline --graph` },
      positions: {
        linear: { x: 50, y: 50, scale: 1.25, pulse: true },
      },
    },
    {
      caption: {
        tr: 'Kontrast — TEHLİKE: bu feature dalı zaten push edilmiş, takım arkadaşların ondan çekmiş OLSAYDI, rebase onların yerel referanslarını "çöp"e çevirirdi — herkesin geçmişi Git\'in gözünde farklılaşır, ortak zemin kaybolur.',
        en: 'Contrast — DANGER: had this feature branch already been pushed, with teammates having pulled from it, rebase would turn their local references into "garbage" — everyone\'s history diverges in Git\'s eyes, common ground is lost.',
      },
      positions: {
        linear: { x: 22, y: 40, scale: 0.85, opacity: 0.5 },
        danger: { x: 60, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'linear', to: 'danger', color: '#dc2626' }],
    },
    {
      caption: {
        tr: 'Final — kural: merge tarihi KORUR (iki taraf da görünür kalır), rebase tarihi YENİDEN YAZAR (tek doğrusal hikaye anlatır). Hangisi doğru? Cevap ekip sözleşmesindedir — asla tek başına, paylaşılan bir dalda rastgele seçilmez.',
        en: 'Final — the rule: merge PRESERVES history (both sides stay visible), rebase REWRITES history (tells one linear story). Which is correct? The answer lives in the team\'s contract — never picked at random, alone, on a shared branch.',
      },
      positions: {
        main: { x: 12, y: 55, scale: 0.85 },
        commits: { x: 30, y: 35, scale: 0.75, opacity: 0.5 },
        replay: { x: 48, y: 55, scale: 0.85 },
        newcommits: { x: 66, y: 38, scale: 0.9 },
        linear: { x: 86, y: 55, scale: 1.1, pulse: true },
      },
      beams: [{ from: 'main', to: 'replay' }, { from: 'replay', to: 'newcommits' }, { from: 'newcommits', to: 'linear' }],
    },
  ],
}

// ─── GitHub Akışı sekmesi film bloğu (video-scene — EN + TR paylaşımlı) ───
// Spesifikasyon: Documents/video-rollout-plan.md §7.4 B1
const gitRemoteSyncFilm = {
  type: 'video-scene',
  id: 'git-remote-sync-film',
  title: {
    tr: '🎬 origin/main: Uzaktaki Son Bilinen Fotoğraf',
    en: '🎬 origin/main: The Last Known Photo of the Remote',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'repo',   emoji: '🗄️', label: { tr: 'Local repo',              en: 'Local repo' },              color: '#8b5cf6' },
    { id: 'origin', emoji: '☁️', label: { tr: 'origin (GitHub)',         en: 'origin (GitHub)' },         color: '#0ea5e9' },
    { id: 'push',   emoji: '📤', label: { tr: 'push',                    en: 'push' },                    color: '#22c55e' },
    { id: 'fetch',  emoji: '📥', label: { tr: 'fetch',                   en: 'fetch' },                   color: '#10b981' },
    { id: 'pull',   emoji: '🔀', label: { tr: 'pull (fetch+merge)',      en: 'pull (fetch+merge)' },      color: '#6366f1' },
    { id: 'marker', emoji: '🏷️', label: { tr: 'origin/main işaretçisi',  en: 'origin/main pointer' },     color: '#f97316' },
    { id: 'team',   emoji: '👥', label: { tr: 'Takım commit\'i',         en: 'Team commit' },             color: '#ef4444' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Local repo\'n zaten var, ama GitHub\'daki karşılığından habersiz — ikisi arasında bir bağlantı henüz kurulmadı.',
        en: 'Your local repo already exists, but it does not know about its GitHub counterpart yet — no link has been established between them.',
      },
      positions: {
        repo: { x: 50, y: 50, scale: 1.2, pulse: true },
      },
    },
    {
      caption: {
        tr: '`git remote add origin` local zincire uzak bir ADRES tanıtır. `origin` sadece bir takma isimdir — Git\'e "buluttaki karşılığın burada" der.',
        en: '`git remote add origin` introduces a remote ADDRESS to the local chain. `origin` is just a nickname — it tells Git "your cloud counterpart lives here".',
      },
      code: { tr: `git remote add origin https://github.com/hasankocaman/deneme2.git`, en: `git remote add origin https://github.com/hasankocaman/deneme2.git` },
      positions: {
        repo: { x: 30, y: 50, scale: 1, pulse: true },
        origin: { x: 68, y: 50, scale: 1.1, pulse: true },
      },
      beams: [{ from: 'repo', to: 'origin', color: '#0ea5e9' }],
    },
    {
      caption: {
        tr: '`git push` ile local commit\'ler buluta KOPYALANIR. Bu ana kadar her şey senin bilgisayarındaydı — artık takım da görebiliyor.',
        en: '`git push` COPIES local commits to the cloud. Until this moment everything lived only on your machine — now the team can see it too.',
      },
      code: { tr: `git push -u origin main`, en: `git push -u origin main` },
      positions: {
        repo: { x: 22, y: 45, scale: 0.9, opacity: 0.6 },
        push: { x: 50, y: 50, scale: 1.2, pulse: true },
        origin: { x: 78, y: 45, scale: 1.1 },
      },
      beams: [{ from: 'push', to: 'origin', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Takım arkadaşın da kendi commit\'ini push\'lar — origin ilerler. Ama senin local\'in bunu HENÜZ bilmiyor; hiçbir otomatik bildirim gelmez, sessizce GERİDE kalırsın.',
        en: 'Your teammate also pushes their own commit — origin moves forward. But your local does NOT know this yet; no automatic notification arrives, you silently fall BEHIND.',
      },
      positions: {
        origin: { x: 55, y: 50, scale: 1.1, pulse: true },
        team: { x: 80, y: 35, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'team', to: 'origin', color: '#ef4444' }],
    },
    {
      caption: {
        tr: '`git fetch origin` uzaktaki yeniliği indirir — ama working tree\'ye DOKUNMAZ. Sadece `origin/main` işaretçisi ilerler: "işte uzaktakinin son hali" der, senin dosyaların hâlâ eskisi.',
        en: '`git fetch origin` downloads the remote news — but does NOT touch your working tree. Only the `origin/main` pointer moves: it says "here is the remote\'s latest state", while your files stay the old ones.',
      },
      code: { tr: `git fetch origin`, en: `git fetch origin` },
      positions: {
        origin: { x: 22, y: 40, scale: 0.9, opacity: 0.6 },
        fetch: { x: 50, y: 50, scale: 1.15, pulse: true },
        marker: { x: 74, y: 32, scale: 1.1, pulse: true },
      },
      beams: [{ from: 'origin', to: 'fetch' }, { from: 'fetch', to: 'marker', color: '#f97316' }],
    },
    {
      caption: {
        tr: '`git pull` = `fetch` + `merge` TEK adımda. Uzaktaki yenilik hem indirilir HEM de senin dalına birleştirilir — iki komutu birbirine bağlayan bir kısayoldur.',
        en: '`git pull` = `fetch` + `merge` in ONE step. The remote news is both downloaded AND merged into your branch — a shortcut that chains two commands together.',
      },
      code: { tr: `git pull origin main`, en: `git pull origin main` },
      positions: {
        fetch: { x: 22, y: 45, scale: 0.85, opacity: 0.6 },
        pull: { x: 55, y: 50, scale: 1.2, pulse: true },
        repo: { x: 80, y: 40, scale: 1.05, pulse: true },
      },
      beams: [{ from: 'fetch', to: 'pull' }, { from: 'pull', to: 'repo', color: '#6366f1' }],
    },
    {
      caption: {
        tr: 'Final — `origin/main` = "uzaktaki main\'in en son BİLİNEN fotoğrafı", canlı bağlantı değil. QA bağı: sabah ilk iş `git pull`, akşam son iş `git push` ritmi, günler sonra patlayan dev bir conflict\'i önler.',
        en: 'Final — `origin/main` is "the last KNOWN photo of the remote main", not a live connection. The QA tie-in: `git pull` first thing in the morning, `git push` last thing at night — this rhythm prevents a giant conflict from exploding days later.',
      },
      positions: {
        repo: { x: 15, y: 55, scale: 0.85 },
        marker: { x: 35, y: 35, scale: 0.85 },
        origin: { x: 58, y: 55, scale: 0.9 },
        team: { x: 80, y: 35, scale: 0.85 },
        pull: { x: 92, y: 55, scale: 0.75, opacity: 0.5 },
      },
      beams: [{ from: 'repo', to: 'marker' }, { from: 'marker', to: 'origin' }, { from: 'origin', to: 'team' }],
    },
  ],
}

// ─── Pull Request sekmesi film bloğu (video-scene — EN + TR paylaşımlı) ───
// Spesifikasyon: Documents/video-rollout-plan.md §7.4 B2
const githubPrLifecycleFilm = {
  type: 'video-scene',
  id: 'github-pr-lifecycle-film',
  title: {
    tr: '🎬 Bir Pull Request\'in Yaşam Döngüsü',
    en: '🎬 The Life Cycle of a Pull Request',
  },
  xpReward: 15,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'branch',   emoji: '🌿', label: { tr: 'feature dalı',           en: 'feature branch' },       color: '#22c55e' },
    { id: 'pr',       emoji: '📬', label: { tr: 'PR',                     en: 'PR' },                   color: '#2563eb' },
    { id: 'ci',       emoji: '🤖', label: { tr: 'CI check\'leri',         en: 'CI checks' },            color: '#f59e0b' },
    { id: 'reviewer', emoji: '👀', label: { tr: 'Reviewer',               en: 'Reviewer' },             color: '#8b5cf6' },
    { id: 'fix',      emoji: '🔧', label: { tr: 'Düzeltme commit\'i',     en: 'Fix commit' },           color: '#0ea5e9' },
    { id: 'approve',  emoji: '✅', label: { tr: 'Approve',                en: 'Approve' },              color: '#16a34a' },
    { id: 'merge',    emoji: '🔀', label: { tr: 'Merge butonu',           en: 'Merge button' },         color: '#7c3aed' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Feature dalı push\'lanır ve GitHub\'da bir PR AÇILIR: başlık, açıklama, diff — "bu değişikliği main\'e almak istiyorum" başvurusu.',
        en: 'The feature branch is pushed and a PR is OPENED on GitHub: title, description, diff — a formal request to "bring this change into main".',
      },
      code: { tr: `git push -u origin feature/login-tests\n# GitHub: Open Pull Request`, en: `git push -u origin feature/login-tests\n# GitHub: Open Pull Request` },
      positions: {
        branch: { x: 30, y: 50, scale: 1.1, pulse: true },
        pr: { x: 68, y: 50, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'branch', to: 'pr' }],
    },
    {
      caption: {
        tr: 'CI otomatik olarak KOŞAR — hiç kimse elle tetiklemez. Kırmızıysa, reviewer henüz devreye girmeden PR geri döner: bir insanın zamanını boşa harcamadan önce robot elemesi.',
        en: 'CI RUNS automatically — nobody triggers it by hand. If it is red, the PR bounces back before a reviewer even gets involved: a robot filter before any human time is spent.',
      },
      positions: {
        pr: { x: 25, y: 45, scale: 0.9, opacity: 0.6 },
        ci: { x: 60, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'pr', to: 'ci', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'CI yeşil — sıra insan gözünde: reviewer diff\'i satır satır okur, şüpheli bir satıra yorum bırakır, "Request changes" ile merge\'ü BLOKE eder.',
        en: 'CI is green — now the human eye: the reviewer reads the diff line by line, leaves a comment on a suspicious line, and BLOCKS the merge with "Request changes".',
      },
      positions: {
        ci: { x: 22, y: 40, scale: 0.85, opacity: 0.6 },
        reviewer: { x: 58, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'ci', to: 'reviewer' }],
    },
    {
      caption: {
        tr: 'Yazar düzeltme commit\'ini AYNI dala push\'lar — PR OTOMATİK güncellenir, yeni bir PR açmaya GEREK YOK. Diff büyür, CI yeniden koşar.',
        en: 'The author pushes a fix commit to the SAME branch — the PR updates AUTOMATICALLY, NO new PR is needed. The diff grows, CI reruns.',
      },
      code: { tr: `git add tests/login.spec.js\ngit commit -m "fix: cover empty password edge case"\ngit push`, en: `git add tests/login.spec.js\ngit commit -m "fix: cover empty password edge case"\ngit push` },
      positions: {
        reviewer: { x: 22, y: 45, scale: 0.85, opacity: 0.6 },
        fix: { x: 58, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'reviewer', to: 'fix', color: '#0ea5e9' }],
    },
    {
      caption: {
        tr: 'Reviewer tekrar bakar: sorun çözülmüş, check\'ler yeşil. `Approve` gelir — "bu değişiklik benim gözümden merge\'e hazır" demektir.',
        en: 'The reviewer looks again: the issue is fixed, checks are green. `Approve` arrives — meaning "from my perspective this change is merge-ready".',
      },
      positions: {
        fix: { x: 22, y: 40, scale: 0.85, opacity: 0.6 },
        approve: { x: 58, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'fix', to: 'approve', color: '#16a34a' }],
    },
    {
      caption: {
        tr: 'Tüm koşullar sağlandı: approve VAR, check\'ler yeşil, açık conversation YOK. `Merge pull request` butonu tıklanır — squash/merge/rebase seçeneklerinden biriyle main\'e girer.',
        en: 'All conditions are met: approve EXISTS, checks are green, no open conversations. The `Merge pull request` button is clicked — it lands in main via one of squash/merge/rebase.',
      },
      code: { tr: `# Merge pull request -> main`, en: `# Merge pull request -> main` },
      positions: {
        approve: { x: 22, y: 45, scale: 0.85, opacity: 0.6 },
        merge: { x: 58, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'approve', to: 'merge', color: '#7c3aed' }],
    },
    {
      caption: {
        tr: 'Final — PR bir KALİTE KAPISIDIR: kod + test kanıtı + insan onayı, hepsi AYNI kapıdan geçer. QA bağı: test kodu da PR\'sız main\'e girmez — flaky bir test bile review\'dan geçmeden production\'a sızmaz.',
        en: 'Final — a PR is a QUALITY GATE: code + test evidence + human approval all pass through the SAME gate. The QA tie-in: test code does not enter main without a PR either — not even a flaky test slips into production without review.',
      },
      positions: {
        branch: { x: 12, y: 55, scale: 0.85 },
        ci: { x: 30, y: 35, scale: 0.8 },
        reviewer: { x: 48, y: 55, scale: 0.8 },
        fix: { x: 65, y: 35, scale: 0.75, opacity: 0.5 },
        merge: { x: 86, y: 50, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'branch', to: 'ci' }, { from: 'ci', to: 'reviewer' }, { from: 'reviewer', to: 'merge' }],
    },
  ],
}

// ─── GitHub Actions sekmesi film bloğu (video-scene — EN + TR paylaşımlı) ───
// Spesifikasyon: Documents/video-rollout-plan.md §7.4 B3
const githubActionsTriggerFilm = {
  type: 'video-scene',
  id: 'github-actions-trigger-film',
  title: {
    tr: '🎬 Push\'tan Yeşil Onaya: Bir Actions Koşumu',
    en: '🎬 From Push to Green Check: One Actions Run',
  },
  xpReward: 15,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'push',     emoji: '📤', label: { tr: 'push event',              en: 'push event' },              color: '#22c55e' },
    { id: 'workflow', emoji: '📄', label: { tr: 'workflow.yml',            en: 'workflow.yml' },            color: '#8b5cf6' },
    { id: 'runner',   emoji: '🖥️', label: { tr: 'Runner (ubuntu-latest)',  en: 'Runner (ubuntu-latest)' },  color: '#0ea5e9' },
    { id: 'setup',    emoji: '📦', label: { tr: 'checkout+setup',          en: 'checkout+setup' },          color: '#f59e0b' },
    { id: 'test',     emoji: '🧪', label: { tr: 'Test adımı',              en: 'Test step' },               color: '#6366f1' },
    { id: 'artifact', emoji: '📊', label: { tr: 'Artifact/rapor',          en: 'Artifact/report' },         color: '#10b981' },
    { id: 'status',   emoji: '✅', label: { tr: 'Status check',            en: 'Status check' },            color: '#16a34a' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Bir `push` gerçekleşir — GitHub bunu bir EVENT olarak yayınlar. Kimse "Actions\'ı çalıştır" demedi, bu event kendi başına bir tetikleyicidir.',
        en: 'A `push` happens — GitHub broadcasts it as an EVENT. Nobody said "run Actions", this event is a trigger all on its own.',
      },
      positions: {
        push: { x: 50, y: 50, scale: 1.2, pulse: true },
      },
    },
    {
      caption: {
        tr: '`.github/workflows/*.yml` dosyaları TARANIR: `on: push` ile eşleşen workflow bulunur. YAML dosyası aslında bir SÖZLEŞMEDİR — "bu event olursa şunları yap".',
        en: '`.github/workflows/*.yml` files are SCANNED: the workflow matching `on: push` is found. The YAML file is really a CONTRACT — "if this event happens, do the following".',
      },
      code: { tr: `on:\n  push:\n    branches: [main]`, en: `on:\n  push:\n    branches: [main]` },
      positions: {
        push: { x: 20, y: 45, scale: 0.9, opacity: 0.6 },
        workflow: { x: 55, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'push', to: 'workflow', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Taze bir runner VM ayağa kalkar — HER koşumda SIFIRDAN. Önceki koşumdan hiçbir dosya, hiçbir cache kalıntısı YOK; "bende çalışıyor"un panzehiri tam olarak bu.',
        en: 'A fresh runner VM spins up — SCRATCH every single run. No file, no cache leftover from the previous run — this is the exact antidote to "works on my machine".',
      },
      code: { tr: `runs-on: ubuntu-latest`, en: `runs-on: ubuntu-latest` },
      positions: {
        workflow: { x: 22, y: 40, scale: 0.9, opacity: 0.6 },
        runner: { x: 55, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'workflow', to: 'runner' }],
    },
    {
      caption: {
        tr: 'Adımlar SIRAYLA çalışır: `checkout` kodu indirir, `setup-node` runtime\'ı kurar, `npm ci` bağımlılıkları kilit dosyasından yükler — hepsi bir öncekinin bitmesini bekler.',
        en: 'Steps run IN ORDER: `checkout` downloads the code, `setup-node` installs the runtime, `npm ci` installs dependencies from the lockfile — each one waits for the previous to finish.',
      },
      code: { tr: `- uses: actions/checkout@v4\n- uses: actions/setup-node@v4\n- run: npm ci`, en: `- uses: actions/checkout@v4\n- uses: actions/setup-node@v4\n- run: npm ci` },
      positions: {
        runner: { x: 22, y: 40, scale: 0.85, opacity: 0.6 },
        setup: { x: 55, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'runner', to: 'setup' }],
    },
    {
      caption: {
        tr: 'Kontrast — testler KIRMIZI çıkarsa: adım zinciri orada DURUR, sonraki adımlar hiç çalışmaz, commit\'e ❌ status düşer. Zincir kırıldı, ilerlemek anlamsız.',
        en: 'Contrast — if tests come back RED: the step chain STOPS right there, later steps never run, a ❌ status lands on the commit. The chain is broken, continuing would be meaningless.',
      },
      code: { tr: `- run: npm test\n# FAIL — sonraki adimlar calismaz`, en: `- run: npm test\n# FAIL — later steps do not run` },
      positions: {
        setup: { x: 20, y: 40, scale: 0.85, opacity: 0.5 },
        test: { x: 58, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'setup', to: 'test', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Testler YEŞİLSE: adım zinciri devam eder, `upload-artifact` raporu/screenshot\'ı SAKLAR, commit\'e ✅ status düşer — PR sekmesindeki "checks" tam olarak budur.',
        en: 'If tests are GREEN: the step chain continues, `upload-artifact` SAVES the report/screenshots, a ✅ status lands on the commit — this is exactly what "checks" on the PR tab means.',
      },
      code: { tr: `- run: npm test\n- uses: actions/upload-artifact@v4`, en: `- run: npm test\n- uses: actions/upload-artifact@v4` },
      positions: {
        test: { x: 22, y: 40, scale: 0.85, opacity: 0.6 },
        artifact: { x: 50, y: 50, scale: 1.15, pulse: true },
        status: { x: 78, y: 40, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'test', to: 'artifact', color: '#10b981' }, { from: 'artifact', to: 'status', color: '#16a34a' }],
    },
    {
      caption: {
        tr: 'Final — CI şudur: her push\'ta TARAFSIZ bir robotun, testleri TEMİZ bir ortamda koşması. Reviewer\'ın güvendiği yeşil check, insanın hiç görmediği bu zincirin ÇIKTISIDIR.',
        en: 'Final — CI is this: an IMPARTIAL robot running the tests in a CLEAN environment, on every push. The green check the reviewer trusts is the OUTPUT of this chain that no human ever watched directly.',
      },
      positions: {
        push: { x: 12, y: 55, scale: 0.8 },
        workflow: { x: 30, y: 35, scale: 0.8 },
        runner: { x: 48, y: 55, scale: 0.8 },
        test: { x: 66, y: 35, scale: 0.8 },
        status: { x: 88, y: 50, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'push', to: 'workflow' }, { from: 'workflow', to: 'runner' }, { from: 'runner', to: 'test' }, { from: 'test', to: 'status' }],
    },
  ],
}

// ─── GitHub Pages sekmesi film bloğu (video-scene — EN + TR paylaşımlı) ───
// Spesifikasyon: Documents/video-rollout-plan.md §7.4 B4
const githubPagesDeployFilm = {
  type: 'video-scene',
  id: 'github-pages-deploy-film',
  title: {
    tr: '🎬 dist/\'ten Canlı Siteye: Bir SPA\'nın Yayın Yolculuğu',
    en: '🎬 From dist/ to Live: An SPA\'s Deployment Journey',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'dist',    emoji: '📦', label: { tr: 'dist/ build çıktısı',      en: 'dist/ build output' },      color: '#8b5cf6' },
    { id: 'deploy',  emoji: '🤖', label: { tr: 'Actions deploy job\'u',    en: 'Actions deploy job' },      color: '#0ea5e9' },
    { id: 'artifact',emoji: '🗜️', label: { tr: 'Artifact',                en: 'Artifact' },                color: '#f59e0b' },
    { id: 'cdn',     emoji: '🌍', label: { tr: 'Pages CDN',                en: 'Pages CDN' },               color: '#22c55e' },
    { id: 'domain',  emoji: '🔗', label: { tr: 'Custom domain (DNS)',      en: 'Custom domain (DNS)' },     color: '#6366f1' },
    { id: 'notfound',emoji: '👻', label: { tr: '404 (SPA fallback)',       en: '404 (SPA fallback)' },      color: '#ef4444' },
  ],
  scenes: [
    {
      caption: {
        tr: '`npm run build` çalışır — React kodu derlenir, tek bir statik `dist/` klasörü ÜRETİLİR: HTML, CSS, JS, hepsi hazır ve sabit.',
        en: '`npm run build` runs — the React code is compiled, a single static `dist/` folder is PRODUCED: HTML, CSS, JS, all ready and fixed.',
      },
      code: { tr: `npm run build`, en: `npm run build` },
      positions: {
        dist: { x: 50, y: 50, scale: 1.2, pulse: true },
      },
    },
    {
      caption: {
        tr: 'Actions\'daki deploy job\'u devreye girer: `dist/` klasörünü bir ARTIFACT olarak PAKETLER — bu paket sunucuya gönderilecek tek birim.',
        en: 'The deploy job in Actions kicks in: it PACKAGES the `dist/` folder as an ARTIFACT — this package is the single unit that gets shipped to the server.',
      },
      code: { tr: `uses: actions/upload-pages-artifact@v3`, en: `uses: actions/upload-pages-artifact@v3` },
      positions: {
        dist: { x: 20, y: 45, scale: 0.9, opacity: 0.6 },
        deploy: { x: 50, y: 50, scale: 1.1, pulse: true },
        artifact: { x: 78, y: 45, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'deploy', to: 'artifact' }],
    },
    {
      caption: {
        tr: 'Artifact Pages CDN\'e YAYILIR — site artık gerçek bir URL\'de CANLI. Bu andan sonra dünyanın her yerinden erişilebilir bir vending machine gibi çalışır.',
        en: 'The artifact gets SPREAD across the Pages CDN — the site is now LIVE at a real URL. From this point it works like a vending machine reachable from anywhere in the world.',
      },
      positions: {
        artifact: { x: 22, y: 40, scale: 0.85, opacity: 0.6 },
        cdn: { x: 55, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'artifact', to: 'cdn', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Custom domain: DNS\'e eklenen bir `CNAME` kaydı, çirkin `github.io` URL\'sini `learnqa.dev` gibi bir isimle GÜZELLEŞTİRİR — CDN\'in kendisi değişmez, sadece kapıdaki tabela.',
        en: 'Custom domain: a `CNAME` record added to DNS BEAUTIFIES the ugly `github.io` URL into something like `learnqa.dev` — the CDN itself does not change, only the sign on the door.',
      },
      positions: {
        cdn: { x: 22, y: 40, scale: 0.85, opacity: 0.6 },
        domain: { x: 55, y: 50, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'cdn', to: 'domain', color: '#6366f1' }],
    },
    {
      caption: {
        tr: 'Kontrast — kullanıcı `/selenium`\'u DOĞRUDAN tarayıcı adres çubuğundan açar. Sunucuda öyle bir DOSYA yok — sadece tek bir `index.html` var. Sonuç: çıplak 404.',
        en: 'Contrast — the user types `/selenium` DIRECTLY into the browser address bar. There is no such FILE on the server — only a single `index.html` exists. Result: a bare 404.',
      },
      positions: {
        domain: { x: 20, y: 40, scale: 0.85, opacity: 0.5 },
        notfound: { x: 58, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'domain', to: 'notfound', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Çözüm: `dist/index.html` kopyalanıp `dist/404.html` olarak da yayınlanır — Pages 404 verdiğinde bile React uygulaması yüklenir, JavaScript routing\'i devralır.',
        en: 'The fix: `dist/index.html` is copied and also published as `dist/404.html` — even when Pages returns a 404, the React app still loads and JavaScript routing takes over.',
      },
      code: { tr: `cp dist/index.html dist/404.html`, en: `cp dist/index.html dist/404.html` },
      positions: {
        notfound: { x: 24, y: 45, scale: 0.85, opacity: 0.6 },
        dist: { x: 58, y: 50, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'notfound', to: 'dist', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Final — GitHub Pages sunucu-taraflı YÖNLENDİRME BİLMEZ, sadece dosya sunar. SPA yayınlıyorsan `404.html` fallback\'i + statik route shell\'leri (bu projenin gerçek mimarisi) ZORUNLUDUR, opsiyonel değil.',
        en: 'Final — GitHub Pages does NOT know server-side REDIRECTS, it only serves files. If you publish an SPA, a `404.html` fallback + static route shells (this project\'s actual architecture) are MANDATORY, not optional.',
      },
      positions: {
        dist: { x: 12, y: 55, scale: 0.8 },
        deploy: { x: 30, y: 35, scale: 0.75 },
        cdn: { x: 50, y: 55, scale: 0.85 },
        domain: { x: 68, y: 35, scale: 0.8 },
        notfound: { x: 88, y: 50, scale: 0.7, opacity: 0.4 },
      },
      beams: [{ from: 'dist', to: 'deploy' }, { from: 'deploy', to: 'cdn' }, { from: 'cdn', to: 'domain' }],
    },
  ],
}

// ─── İş Riskleri sekmesi film bloğu (video-scene — EN + TR paylaşımlı) ───
// Spesifikasyon: Documents/video-rollout-plan.md §7.4 B5
const gitForcePushRescueFilm = {
  type: 'video-scene',
  id: 'git-force-push-rescue-film',
  title: {
    tr: '🎬 Force Push Kazası: Neşter mi Silah mı?',
    en: '🎬 The Force-Push Accident: Scalpel or Weapon?',
  },
  xpReward: 15,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'local',   emoji: '💻', label: { tr: 'Local\'in (eski)',         en: 'Your local (stale)' },      color: '#64748b' },
    { id: 'origin',  emoji: '☁️', label: { tr: 'origin/main (+3 commit)',  en: 'origin/main (+3 commits)' }, color: '#0ea5e9' },
    { id: 'force',   emoji: '💥', label: { tr: 'push --force',             en: 'push --force' },            color: '#dc2626' },
    { id: 'crushed', emoji: '😱', label: { tr: 'Ezilen commit\'ler',       en: 'Crushed commits' },         color: '#ef4444' },
    { id: 'reflog',  emoji: '🧾', label: { tr: 'reflog',                   en: 'reflog' },                  color: '#f59e0b' },
    { id: 'lease',   emoji: '🛟', label: { tr: '--force-with-lease',       en: '--force-with-lease' },      color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Local\'in GERİDE — takım origin/main\'e 3 yeni commit eklemiş. Normal `git push` REDDEDİLİR: "non-fast-forward".',
        en: 'Your local is BEHIND — the team has added 3 new commits to origin/main. A plain `git push` gets REJECTED: "non-fast-forward".',
      },
      code: { tr: `git push origin main\n# ! [rejected] non-fast-forward`, en: `git push origin main\n# ! [rejected] non-fast-forward` },
      positions: {
        local: { x: 25, y: 50, scale: 1.1, pulse: true },
        origin: { x: 68, y: 50, scale: 1.15, pulse: true },
      },
    },
    {
      caption: {
        tr: 'Yanlış refleks devreye girer: "reddedildiyse zorla gönderirim" — `git push --force` çalıştırılır. Bu, güvenlik kemerini KESMEK gibidir.',
        en: 'The wrong reflex kicks in: "if it is rejected, I will force it through" — `git push --force` is run. This is like CUTTING the seatbelt.',
      },
      code: { tr: `git push --force origin main`, en: `git push --force origin main` },
      positions: {
        local: { x: 25, y: 50, scale: 1, opacity: 0.7 },
        force: { x: 58, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'local', to: 'force', color: '#dc2626' }],
    },
    {
      caption: {
        tr: 'Takımın 3 commit\'i remote\'tan SİLİNİR — origin artık senin eski local\'ini birebir yansıtıyor. Saatlerce emek, hiç uyarı vermeden buharlaşır.',
        en: 'The team\'s 3 commits get WIPED from the remote — origin now mirrors your stale local exactly. Hours of work evaporates without a single warning.',
      },
      positions: {
        force: { x: 25, y: 45, scale: 0.9, opacity: 0.6 },
        crushed: { x: 60, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'force', to: 'crushed', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Panik — ama Git UNUTMAZ. `git reflog`, HEAD\'in gittiği her yerin bir kaydını tutar; ezilen commit\'lerin eski hash\'i hâlâ orada duruyor.',
        en: 'Panic — but Git NEVER forgets. `git reflog` keeps a record of everywhere HEAD has been; the old hash of the crushed commits is still sitting right there.',
      },
      code: { tr: `git reflog\n# a1b2c3d HEAD@{1}: commit: fix(payment): ...`, en: `git reflog\n# a1b2c3d HEAD@{1}: commit: fix(payment): ...` },
      positions: {
        crushed: { x: 22, y: 45, scale: 0.85, opacity: 0.6 },
        reflog: { x: 58, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'crushed', to: 'reflog', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Kurtarma: `git reset --hard <eski-hash>` local\'i o ana geri taşır, sonra normal bir `git push --force` ile origin ONARILIR. Kayıp geri geldi.',
        en: 'Recovery: `git reset --hard <old-hash>` takes local back to that moment, then a normal `git push --force` REPAIRS origin. The loss is undone.',
      },
      code: { tr: `git reset --hard a1b2c3d\ngit push --force origin main`, en: `git reset --hard a1b2c3d\ngit push --force origin main` },
      positions: {
        reflog: { x: 22, y: 45, scale: 0.85, opacity: 0.6 },
        origin: { x: 58, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'reflog', to: 'origin', color: '#0ea5e9' }],
    },
    {
      caption: {
        tr: 'Doğru araç baştan `--force-with-lease` OLMALIYDI: "uzak, benim son bildiğim durumdaysa zorla — DEĞİLSE dur". Kilitli bir emniyet, kör bir silah değil.',
        en: 'The right tool from the start SHOULD have been `--force-with-lease`: "force it only if the remote is where I last knew it to be — otherwise STOP". A locked safety catch, not a blind weapon.',
      },
      code: { tr: `git push --force-with-lease origin main`, en: `git push --force-with-lease origin main` },
      positions: {
        origin: { x: 22, y: 45, scale: 0.85, opacity: 0.6 },
        lease: { x: 58, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'origin', to: 'lease', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Final — force push bir SİLAH değil, bir NEŞTERdir: doğru elde, doğru anda gerekli. Korunan main + PR akışı (bu sekmenin diğer konuları) tam da bu kazayı BAŞTAN engellemek için var.',
        en: 'Final — a force push is not a WEAPON, it is a SCALPEL: necessary in the right hand, at the right moment. A protected main + PR flow (the rest of this tab) exists precisely to PREVENT this accident from the start.',
      },
      positions: {
        local: { x: 12, y: 55, scale: 0.8 },
        force: { x: 30, y: 35, scale: 0.75, opacity: 0.5 },
        reflog: { x: 50, y: 55, scale: 0.85 },
        lease: { x: 70, y: 35, scale: 0.9 },
        origin: { x: 90, y: 50, scale: 1.1, pulse: true },
      },
      beams: [{ from: 'local', to: 'reflog' }, { from: 'reflog', to: 'lease' }, { from: 'lease', to: 'origin' }],
    },
  ],
}

const iq = (level, qTr, aTr, qEn, aEn) => ({
  level,
  q: { tr: qTr, en: qEn },
  a: { tr: aTr, en: aEn },
})

const gitInterviewQuestions = [
  iq('basic',
    'Yeni bir QA projesine girdin ve repoyu ilk kez bilgisayarına alacaksın. `git clone` sonrası ilk kontrol edeceğin şeyler nelerdir?',
    '`git clone` sonrası önce `git status`, aktif branch, README ve kurulum adımlarını kontrol ederim. Ardından `npm test`, `mvn test` veya projedeki karşılığı neyse onu çalıştırıp lokal ortamın gerçekten hazır olduğunu kanıtlarım. Java’da yeni bir Maven projesi açınca `pom.xml` ve testlerin çalışmasını kontrol etmek gibi, Git’te de repo geldikten sonra state’i doğrulamak gerekir.',
    'You join a QA project and clone the repository for the first time. What do you check right after `git clone`?',
    'After `git clone`, I check `git status`, the active branch, README, and setup steps. Then I run the project test command such as `npm test` or `mvn test` to prove the local environment works. It is like opening a Java Maven project: you inspect `pom.xml` and verify the tests before changing code.'),
  iq('basic',
    '`git status` neden her gün kullanılan en önemli komutlardan biridir?',
    '`git status` working tree ve staging area durumunu gösterir; yani ne değişti, ne commit’e hazır, ne takip edilmiyor onu söyler. Commit atmadan veya branch değiştirmeden önce yanlış dosyayı taşıma riskini azaltır. Java’da debug sırasında variable state’e bakmak gibi, Git’te `status` repo state’ine bakmaktır.',
    'Why is `git status` one of the most important daily Git commands?',
    '`git status` shows the working tree and staging area: what changed, what is staged, and what is untracked. It reduces the risk of committing the wrong file or switching branches with hidden work. In Java terms, it is like checking variable state while debugging.'),
  iq('basic',
    '`git add` ve `git commit` arasındaki farkı gerçek bir örnekle açıklar mısın?',
    '`git add`, değişikliği staging area’ya koyar; `git commit`, staged değişikliklerden kalıcı snapshot oluşturur. Örneğin sadece login testini commit’e almak istiyorsam `git add tests/login.spec.js` derim, sonra `git commit -m "test: add login validation"` ile kaydederim. Java’da object oluşturmak ile onu listeye eklemek ayrı adımlar olabilir; Git’te de hazırlamak ve kaydetmek ayrı adımlardır.',
    'Explain the difference between `git add` and `git commit` with a real example.',
    '`git add` puts changes into the staging area; `git commit` creates a permanent snapshot from staged changes. If I only want the login test in the commit, I run `git add tests/login.spec.js` and then `git commit -m "test: add login validation"`. Like Java object creation and adding it to a collection, preparing and saving are separate steps.'),
  iq('basic',
    'Commit mesajı yazarken QA takımında hangi formatı tercih edersin?',
    'Kısa, emir kipinde ve değişikliğin niyetini anlatan mesaj tercih ederim: `test: add checkout regression cases` gibi. Gerekiyorsa `fix`, `docs`, `ci`, `refactor` gibi prefix kullanırım; mesaj dosya adını değil davranış değişikliğini anlatmalıdır. Java’da method adı nasıl niyeti anlatıyorsa commit mesajı da değişikliğin niyetini anlatmalıdır.',
    'What commit message style do you prefer in a QA team?',
    'I prefer short, imperative messages that explain the intent, such as `test: add checkout regression cases`. Prefixes like `fix`, `docs`, `ci`, or `refactor` help group changes, and the message should describe behavior rather than only file names. Like a Java method name, a commit message should reveal intent.'),
  iq('basic',
    'GitHub ve Git arasındaki farkı hiç bilmeyen birine nasıl anlatırsın?',
    'Git bilgisayarında çalışan version control aracıdır; GitHub ise Git repolarını takım, PR, issue, Actions ve Pages ile barındıran platformdur. Git internet olmadan commit alabilir, ama GitHub ile paylaşım ve takım workflow’u kazanırsın. Java ile IntelliJ benzetmesi gibi: Java dilin ve runtime’ın, IntelliJ ise onu daha verimli kullandığın platformdur.',
    'How would you explain the difference between Git and GitHub to a beginner?',
    'Git is the version control tool running on your machine; GitHub is the platform that hosts Git repositories with collaboration features like PRs, issues, Actions, and Pages. Git can create commits offline, while GitHub adds sharing and team workflow. It is similar to Java versus IntelliJ: Java is the language/runtime, IntelliJ is the productivity platform around it.'),
  iq('basic',
    '`origin` kelimesi Git’te neyi temsil eder?',
    '`origin`, uzak repository için verilen varsayılan remote adıdır; çoğu zaman GitHub’daki repo URL’ini gösterir. `git push origin feature/login` dediğinde lokal branch’i GitHub’daki origin remote’una gönderirsin. Java’da değişken adı nasıl bir object referansını temsil ediyorsa `origin` de uzak repo referansıdır.',
    'What does `origin` represent in Git?',
    '`origin` is the default remote name for a repository URL, usually the GitHub repository. When you run `git push origin feature/login`, you send the local branch to that remote. Like a Java variable name referencing an object, `origin` references the remote repository.'),
  iq('basic',
    'Branch neden kullanılır ve QA otomasyonunda tipik branch isimleri nasıl olur?',
    'Branch, main’i bozmadan ayrı bir çalışma alanı açar. QA otomasyonunda `feature/login-tests`, `fix/flaky-checkout-test`, `ci/add-playwright-report` gibi niyeti belli isimler kullanırım. Java’da yeni bir class içinde deneme yapıp çalışan API’ye dokunmamak gibi, branch de ana hattı korur.',
    'Why do we use branches, and what branch names are common in QA automation?',
    'A branch gives you a separate workspace without breaking main. In QA automation I use intent-revealing names like `feature/login-tests`, `fix/flaky-checkout-test`, or `ci/add-playwright-report`. Like experimenting in a new Java class before touching public API, a branch protects the main line.'),
  iq('basic',
    '`git pull` komutu ne yapar, hangi durumda dikkatli kullanırsın?',
    '`git pull`, remote’daki değişiklikleri alır ve mevcut branch’e uygular; çoğu durumda fetch + merge gibi davranır. Çalışma alanında commit edilmemiş değişiklik varsa pull öncesi `git status` bakarım, gerekirse commit veya stash yaparım. Java’da aynı dosyayı iki kişinin düzenlemesi conflict çıkarabileceği gibi, Git’te de pull yerel değişikliklerle çakışabilir.',
    'What does `git pull` do, and when should you be careful with it?',
    '`git pull` gets remote changes and applies them to the current branch, commonly behaving like fetch plus merge. If I have uncommitted work, I check `git status` first and either commit or stash. Like two developers editing the same Java file, pulling can conflict with local changes.'),
  iq('basic',
    '`git log --oneline --graph` çıktısı sana ne anlatır?',
    'Commit geçmişini kısa ve dallanma yapısıyla gösterir; hangi branch nereden ayrılmış, nerede birleşmiş görürsün. Review veya conflict çözümü öncesi tarihçeyi anlamayı kolaylaştırır. Java’da call stack nasıl akışın nereden geldiğini gösteriyorsa Git graph de kod geçmişinin akışını gösterir.',
    'What does `git log --oneline --graph` tell you?',
    'It shows commit history in a compact form with branch topology, so you can see where branches diverged and merged. It helps before reviews or conflict resolution. Like a Java call stack shows execution flow, the Git graph shows code history flow.'),
  iq('basic',
    'Tracked ve untracked dosya farkı nedir?',
    'Tracked dosya Git’in geçmişte bildiği ve izlediği dosyadır; untracked dosya repo klasöründe vardır ama Git henüz takip etmez. Yeni test dosyası oluşturduğunda `git add` yapana kadar untracked görünür. Java projesinde yeni class dosyası IDE’de görünür ama build’e dahil olup olmadığını ayrıca kontrol etmek gibi düşünebilirsin.',
    'What is the difference between tracked and untracked files?',
    'A tracked file is known by Git history; an untracked file exists in the folder but Git is not tracking it yet. A new test file appears untracked until you run `git add`. It is like creating a new Java class and then checking whether the build actually includes it.'),
  iq('basic',
    '`.gitignore` dosyasına QA projelerinde neler eklenmelidir?',
    'Build çıktıları, IDE ayarları, loglar, rapor klasörleri, `.env`, secret dosyaları ve geçici test artifact’leri eklenmelidir. Ama ekip için gerekli örnek config dosyaları, örneğin `.env.example`, repoda kalabilir. Java’da `target/` klasörünü değil `pom.xml` dosyasını commit etmek gibi, kaynak ile üretilmiş çıktıyı ayırırsın.',
    'What should go into `.gitignore` in QA projects?',
    'Build outputs, IDE settings, logs, report folders, `.env`, secret files, and temporary test artifacts should be ignored. Team-needed sample configs such as `.env.example` can stay in the repo. Like committing `pom.xml` but ignoring Java `target/`, you separate source from generated output.'),
  iq('basic',
    'GitHub Pull Request nedir ve QA için neden önemlidir?',
    'Pull Request, branch’teki değişikliği main’e almadan önce diff, yorum, review ve CI sonucuyla görünür hale getirir. QA için özellikle testlerin niyeti, flaky riskleri ve raporların doğru üretilip üretilmediği burada tartışılır. Java’da code review nasıl production bug’ını azaltıyorsa PR da otomasyon kodunun kalite kapısıdır.',
    'What is a GitHub Pull Request and why is it important for QA?',
    'A Pull Request exposes branch changes before merging to main, including diff, comments, review, and CI results. For QA it is where test intent, flaky risks, and report generation are discussed. Like Java code review, a PR is a quality gate for automation code.'),
  iq('basic',
    'GitHub Actions’ı tek cümlede nasıl tanımlarsın?',
    'GitHub Actions, repodaki olaylara göre otomatik çalışan CI/CD sistemidir; push, PR veya manuel tetikleme ile test, build ve deploy adımlarını çalıştırır. QA tarafında her PR’da otomasyon testlerini koşturmak için kullanılır. Java’daki Maven lifecycle gibi, bir YAML tarifi adımları sırayla yönetir.',
    'How would you define GitHub Actions in one sentence?',
    'GitHub Actions is a CI/CD system that runs automation based on repository events like push, pull request, or manual trigger. QA teams use it to run tests on every PR. Like the Maven lifecycle in Java, a YAML recipe controls the ordered steps.'),
  iq('basic',
    'GitHub Pages hangi problem için kullanılır?',
    'GitHub Pages statik dosyaları web sitesi olarak yayınlar; dokümantasyon, test raporu demosu, portfolyo veya SPA build’i için uygundur. Server-side backend çalıştırmaz, bu yüzden statik HTML/CSS/JS çıktısı gerekir. Java’da Spring Boot server deploy etmekten farklıdır; burada daha çok `dist/` klasörünü yayınlarsın.',
    'What problem does GitHub Pages solve?',
    'GitHub Pages publishes static files as a website, useful for documentation, test report demos, portfolios, or SPA builds. It does not run a server-side backend, so you need static HTML/CSS/JS output. Unlike deploying a Java Spring Boot server, you usually publish a `dist/` folder.'),
  iq('basic',
    'Bir commit attın ama mesajda typo var. Ne yaparsın?',
    'Eğer commit henüz push edilmediyse `git commit --amend -m "..."` ile mesajı düzeltebilirim. Push edildiyse takım branch’inde history değiştirmek riskli olabilir; PR açıklamasında düzeltmek veya yeni commit atmak daha güvenlidir. Java’da public API’yi değiştirmeden önce kimin kullandığını kontrol etmek gibi, Git history değişikliğinde de paylaşılmış mı diye bakarsın.',
    'You made a commit with a typo in the message. What do you do?',
    'If it has not been pushed, I can fix it with `git commit --amend -m "..."`. If it was already pushed to a shared branch, rewriting history can be risky, so I may correct the PR description or add a new commit. Like changing a public Java API, first check whether others depend on that history.'),

  iq('intermediate',
    'PR açmadan önce kendi branch’ini main ile güncellemek için hangi akışı tercih edersin?',
    'Önce `git fetch origin` çalıştırır, sonra ekip standardına göre `git merge origin/main` veya `git rebase origin/main` kullanırım. Paylaşılmış branch’te rebase yapacaksam çok dikkat ederim çünkü commit hash’leri değişir. Java’da dependency update öncesi testleri çalıştırmak gibi, branch güncellemeden sonra test suite’i tekrar koştururum.',
    'Before opening a PR, how do you update your branch with main?',
    'I run `git fetch origin` first, then use either `git merge origin/main` or `git rebase origin/main` depending on team convention. I am careful with rebase on shared branches because commit hashes change. Like running tests after a Java dependency update, I rerun the test suite after updating the branch.'),
  iq('intermediate',
    'Merge conflict çıktığında panik yapmadan nasıl ilerlersin?',
    'Önce `git status` ile hangi dosyaların conflicted olduğunu görürüm, sonra conflict marker’larını tek tek düzenlerim. Çözümden sonra ilgili testleri çalıştırır, `git add` ve commit/rebase continue ile işlemi tamamlarım. Java’da iki farklı değişiklik aynı methodu değiştirdiyse nasıl mantığı birleştiriyorsan, Git conflict de metin değil davranış birleştirme işidir.',
    'How do you handle a merge conflict without panic?',
    'I start with `git status` to see conflicted files, then resolve conflict markers carefully. After resolving, I run relevant tests, stage the files, and complete the merge or rebase. Like merging two changes to the same Java method, Git conflict resolution is about behavior, not just text.'),
  iq('intermediate',
    '`git stash` gerçek işte ne zaman faydalıdır, ne zaman tehlikeli olabilir?',
    '`git stash`, bitmemiş değişiklikleri geçici olarak kenara alıp branch değiştirmek gerektiğinde faydalıdır. Tehlikesi, stash listesinin unutulması veya aynı dosyaya yeni değişiklikler geldikten sonra apply ederken conflict üretmesidir. Java’da geçici debug kodunu kenara not almak gibi işe yarar ama kalıcı çözüm değildir.',
    'When is `git stash` useful in real work, and when can it be risky?',
    '`git stash` is useful when you must temporarily set aside unfinished work to switch branches. It becomes risky when stashes are forgotten or applied after the same files changed, causing conflicts. It is like setting aside temporary Java debug code: useful, but not a permanent workflow.'),
  iq('intermediate',
    '`git reset --hard` neden tehlikelidir?',
    '`git reset --hard`, commit edilmemiş working tree değişikliklerini geri getirilemeyecek şekilde silebilir. Gerçek işte önce `git status`, gerekiyorsa `git diff`, sonra yedek branch veya stash kullanırım. Java’da RAM’deki object state’i kaydetmeden programı kapatmak gibi, kaydedilmemiş değişiklik gidebilir.',
    'Why is `git reset --hard` dangerous?',
    '`git reset --hard` can permanently discard uncommitted working tree changes. In real work I check `git status`, inspect `git diff`, and use a backup branch or stash if needed. It is like closing a Java program without saving in-memory object state.'),
  iq('intermediate',
    '`git push --force` yerine neden `--force-with-lease` tercih edilir?',
    '`--force-with-lease`, remote branch beklediğin noktadaysa push eder; arada başkası push yaptıysa durur. Bu, takım arkadaşının commit’ini yanlışlıkla ezme riskini azaltır. Java’da optimistic locking gibi düşünebilirsin: veriyi yazmadan önce hâlâ beklediğin version mı kontrol edersin.',
    'Why prefer `--force-with-lease` over `git push --force`?',
    '`--force-with-lease` pushes only if the remote branch is still at the commit you expect; if someone else pushed meanwhile, it stops. This reduces the risk of overwriting a teammate’s commits. It is similar to optimistic locking in Java: check the version before writing.'),
  iq('intermediate',
    'Bir PR’da hem test refactor hem yeni feature testi varsa nasıl düzenlersin?',
    'Mümkünse ayrı commitlere veya ayrı PR’lara bölerim: önce refactor, sonra davranış ekleyen test. Review eden kişi davranış değişikliğini daha net görür ve revert gerekirse daha kolay olur. Java’da refactor ile feature’ı aynı method değişikliğine gömmemek gibi, Git’te de değişiklik niyetlerini ayırırım.',
    'A PR contains both test refactor and a new feature test. How do you organize it?',
    'If possible, I split them into separate commits or separate PRs: refactor first, behavior-adding test second. Reviewers can see behavioral changes clearly, and reverting becomes easier. Like not mixing Java refactor and feature logic in one method change, Git changes should separate intent.'),
  iq('intermediate',
    'GitHub Actions workflow’unda `pull_request` ve `push` trigger farkı QA için neden önemlidir?',
    '`pull_request`, main’e girmeden önce aday değişikliği test eder; `push` ise branch veya main güncellendiğinde çalışır. QA için PR trigger kalite kapısıdır, main push trigger ise merge sonrası deploy veya nightly işlere uygundur. Java’da unit testin localde, integration testin CI’da farklı aşamada koşması gibi trigger da farklı aşamaları temsil eder.',
    'Why does the difference between `pull_request` and `push` triggers matter for QA?',
    '`pull_request` tests a candidate change before it enters main; `push` runs when a branch or main is updated. For QA, PR triggers are quality gates, while main push triggers are good for deploys or nightly jobs. Like unit and integration tests running at different Java pipeline stages, triggers represent different moments.'),
  iq('intermediate',
    'Workflow’da secret kullanırken nelere dikkat edersin?',
    'Secret’ları YAML içine düz metin yazmam, GitHub Secrets veya environment secrets kullanırım. Loglarda secret basılmadığından, fork PR’larında secret erişimi olmadığından ve minimum permission verildiğinden emin olurum. Java’da password’u source code’a hardcode etmemek gibi, CI secret’ı da kodun içinde yaşamamalıdır.',
    'What do you watch for when using secrets in a workflow?',
    'I never write secrets directly in YAML; I use GitHub Secrets or environment secrets. I ensure logs do not print secrets, fork PRs do not receive unsafe secret access, and permissions are minimal. Like not hardcoding passwords in Java source, CI secrets should not live in code.'),
  iq('intermediate',
    'CI’da testler geçiyor ama lokalinde geçmiyor. Git/GitHub tarafında neleri kontrol edersin?',
    'Önce aynı commit üzerinde misin diye `git rev-parse HEAD` ve workflow run commit hash’ini karşılaştırırım. Sonra branch güncelliği, environment variable farkı, Node/Java version farkı ve ignored dosya eksikliği gibi konulara bakarım. Java’da lokal JDK farklıysa test sonucu değişebilir; Git tarafında da aynı snapshot üzerinde olduğundan emin olmalısın.',
    'CI tests pass but fail locally. What do you check on the Git/GitHub side?',
    'First I compare my `git rev-parse HEAD` with the workflow run commit SHA. Then I check branch freshness, environment variables, Node/Java version differences, and missing ignored files. Like Java tests changing with a different JDK, you must prove you are testing the same snapshot.'),
  iq('intermediate',
    'GitHub branch protection kurallarında QA açısından neler zorunlu olmalıdır?',
    'Main için doğrudan push kapalı olmalı, PR review ve passing status checks zorunlu olmalıdır. Gerekirse stale review dismissal, linear history veya CODEOWNERS da eklenir. Java’da production’a deploy etmeden önce test ve review kapısı koymak gibi, branch protection main’i korur.',
    'Which branch protection rules matter for QA?',
    'Main should block direct pushes and require PR reviews plus passing status checks. Depending on the team, stale review dismissal, linear history, or CODEOWNERS can be added. Like requiring tests and review before Java production deploy, branch protection guards main.'),
  iq('intermediate',
    'GitHub Pages ile SPA yayınlarken 404 problemi neden çıkar?',
    'GitHub Pages statik host olduğu için `/login` gibi client-side route doğrudan açıldığında o klasörde gerçek dosya arar. Çözüm olarak static route shell üretmek veya `404.html` fallback stratejisi kullanmak gerekir. Java backend’de server route yazabildiğin için bu sorun farklı çözülür; Pages’te server logic yoktur.',
    'Why can a SPA have 404 problems on GitHub Pages?',
    'GitHub Pages is static hosting, so opening `/login` directly makes it look for real files under that path. A solution is generating static route shells or using a `404.html` fallback strategy. With a Java backend you can write server routes; Pages has no server logic.'),
  iq('intermediate',
    'GitHub Actions cache kullanırken yanlış cache hangi probleme yol açar?',
    'Yanlış cache, eski dependency veya eski browser binary ile testin gerçekte olmayan şekilde geçmesine ya da kalmasına neden olabilir. Cache key’i lockfile, OS ve ilgili version bilgisiyle bağlanmalıdır. Java’da Maven cache’i hız kazandırır ama bozuk dependency cache’i build’i yanıltabilir; aynı mantık Actions için geçerlidir.',
    'What problem can a bad GitHub Actions cache cause?',
    'A bad cache can make tests pass or fail using stale dependencies or browser binaries. Cache keys should include lockfile, OS, and relevant version data. Like Maven cache in Java, it speeds builds up but can mislead when corrupted or stale.'),
  iq('intermediate',
    'Bir dosyayı yanlışlıkla commit’e ekledin ama henüz push etmedin. Nasıl çıkarırsın?',
    'Sadece staging’den çıkarmak için `git restore --staged file` kullanırım; commit oluştuysa ve push edilmediyse `git reset --soft HEAD~1` veya yeni düzeltme commit’i seçeneğini değerlendiririm. Dosyanın içeriğini silmek istemiyorsam working tree’yi koruyan komut seçerim. Java’da yanlış import’u silmekle dosyayı diskten silmek farklıdır; Git’te staging’den çıkarma da dosya silme değildir.',
    'You accidentally added a file to a commit but have not pushed yet. How do you remove it?',
    'To unstage it, I use `git restore --staged file`; if the commit already exists and is not pushed, I consider `git reset --soft HEAD~1` or a corrective commit. If I want to keep the file content, I choose commands that preserve the working tree. Like removing a wrong Java import is different from deleting the file, unstaging is not deletion.'),
  iq('intermediate',
    'Büyük binary test dosyaları veya video kayıtları repo için neden risklidir?',
    'Git history büyür, clone yavaşlar ve her checkout maliyetli hale gelir. Video, screenshot ve rapor gibi artifact’ler genelde CI artifact storage veya release asset olarak tutulmalıdır. Java’da `target/` klasörünü commit etmek nasıl gereksiz yükse, test artifact’lerini Git history’ye koymak da uzun vadeli maliyettir.',
    'Why are large binary test files or videos risky for a repository?',
    'They increase Git history size, slow down clone, and make checkout expensive. Videos, screenshots, and reports should usually be CI artifacts or release assets. Like committing Java `target/` output, storing test artifacts in Git history creates long-term cost.'),
  iq('intermediate',
    '`git revert` ile `git reset` arasındaki pratik fark nedir?',
    '`git revert`, eski commit’i silmeden tersini yapan yeni bir commit oluşturur; paylaşılan branch için güvenlidir. `git reset`, branch pointer’ını geriye alır ve history değiştirebilir; paylaşılmış branch’te risklidir. Java’da production bug fix için yeni patch commit’i atmak revert’e benzer, geçmişi yok saymak reset’e benzer.',
    'What is the practical difference between `git revert` and `git reset`?',
    '`git revert` creates a new commit that undoes a previous commit, preserving shared history. `git reset` moves the branch pointer and can rewrite history, which is risky on shared branches. In Java production fixes, adding a patch commit is like revert; pretending history did not happen is like reset.'),
  iq('intermediate',
    'GitHub issue, branch ve PR arasında nasıl izlenebilirlik kurarsın?',
    'Issue numarasını branch adına, commit mesajına veya PR açıklamasına eklerim; örneğin `fix/123-login-timeout`. PR açıklamasında “Closes #123” kullanılırsa merge sonrası issue otomatik kapanabilir. Java’da test case ID ile otomasyon methodunu bağlamak gibi, GitHub’da issue-PR ilişkisi traceability sağlar.',
    'How do you create traceability between GitHub issues, branches, and PRs?',
    'I include the issue number in the branch name, commit message, or PR description, such as `fix/123-login-timeout`. Using `Closes #123` can close the issue automatically after merge. Like linking a test case ID to a Java automation method, issue-PR links provide traceability.'),
  iq('intermediate',
    'Matrix strategy QA pipeline’da neden kullanılır?',
    'Matrix strategy aynı workflow’u birden fazla OS, browser, Node veya Java version kombinasyonunda çalıştırır. Cross-browser veya multi-version destek için tek YAML içinde çoğaltılmış güven sağlar. Java’da aynı testleri JDK 17 ve 21 ile çalıştırmak gibi, matrix farklı ortam risklerini yakalar.',
    'Why use matrix strategy in a QA pipeline?',
    'Matrix strategy runs the same workflow across multiple OS, browser, Node, or Java versions. It gives broader confidence for cross-browser or multi-version support from one YAML file. Like running the same Java tests on JDK 17 and 21, matrix catches environment-specific risks.'),
  iq('intermediate',
    'Actions job’larında artifact ve report neden önemlidir?',
    'Test başarısız olduğunda log tek başına yeterli olmayabilir; screenshot, trace, video, HTML report gibi artifact’ler sorunu yeniden anlamayı sağlar. Artifact retention süresi gereksiz maliyeti ve gizli veri riskini azaltacak şekilde ayarlanmalıdır. Java’da Surefire report nasıl failed test detayını saklıyorsa Actions artifact de QA kanıtını saklar.',
    'Why are artifacts and reports important in Actions jobs?',
    'When a test fails, logs may not be enough; screenshots, traces, videos, and HTML reports help diagnose the issue. Artifact retention should balance debugging value, cost, and sensitive data risk. Like Java Surefire reports, Actions artifacts preserve QA evidence.'),
  iq('intermediate',
    'Bir teammate yanlışlıkla secret commit etti. İlk tepkin ne olmalı?',
    'Önce secret’ı hemen revoke/rotate ederim; sadece Git history’den silmek yeterli değildir çünkü secret çoktan görünmüş olabilir. Sonra repository secret scanning, audit log ve gerekiyorsa history cleanup planlanır. Java’da leaked database password’u koddan silmek yetmez; gerçek credential değiştirilmelidir.',
    'A teammate accidentally committed a secret. What is your first response?',
    'First I revoke or rotate the secret immediately; removing it from Git history is not enough because it may already be exposed. Then I check secret scanning, audit logs, and plan history cleanup if needed. Like a leaked database password in Java code, deleting the line does not secure the credential.'),
  iq('intermediate',
    'PR review’da sadece kod stiline değil hangi QA risklerine bakarsın?',
    'Testin deterministik olup olmadığına, beklemelerin doğru kullanılıp kullanılmadığına, test datasının izolasyonuna, rapor ve cleanup adımlarına bakarım. Ayrıca secret, flaky selector, gereksiz sleep ve çok geniş assertion risklerini kontrol ederim. Java testinde sadece syntax değil lifecycle, setup/teardown ve assertion kalitesi de review konusudur.',
    'In PR review, beyond code style, which QA risks do you check?',
    'I check determinism, waiting strategy, test data isolation, reporting, and cleanup. I also look for secrets, flaky selectors, unnecessary sleeps, and overly broad assertions. In Java tests, review is not only syntax; lifecycle, setup/teardown, and assertion quality matter.'),

  iq('advanced',
    'Trunk-based development ile GitFlow arasında QA açısından hangi trade-off’lar vardır?',
    'Trunk-based development küçük PR ve hızlı CI gerektirir; risk erken yakalanır ama main sürekli sağlıklı kalmalıdır. GitFlow daha belirgin release branch’leri sağlar fakat uzun yaşayan branch’ler conflict ve geç entegrasyon riski üretir. Java’da küçük method değişikliklerini sık test etmek ile büyük release branch’inde toplu değişiklik yapmak arasındaki fark gibidir.',
    'What are the QA trade-offs between trunk-based development and GitFlow?',
    'Trunk-based development requires small PRs and fast CI; risks are found early, but main must stay healthy. GitFlow gives explicit release branches, but long-lived branches create conflict and late integration risk. It is like frequently testing small Java method changes versus batching many changes into a release branch.'),
  iq('advanced',
    'Monorepo’da GitHub Actions workflow tasarlarken QA maliyetini nasıl kontrol edersin?',
    'Path filter, reusable workflow, dependency cache ve test seçimi kullanırım; sadece etkilenen paketlerin testleri çalıştırılır. Kritik nightly veya main workflow’unda daha geniş regression çalıştırılabilir. Java multi-module Maven projesinde sadece değişen module testini koşup release öncesi tüm suite’i çalıştırmakla aynı stratejidir.',
    'How do you control QA cost when designing GitHub Actions for a monorepo?',
    'I use path filters, reusable workflows, dependency caching, and selective tests so only affected packages run. Broader regression can run nightly or on main. It is the same strategy as testing only changed modules in a Java multi-module Maven project, then running the full suite before release.'),
  iq('advanced',
    'CI/CD pipeline’da minimum permission prensibini nasıl uygularsın?',
    'Workflow seviyesinde `permissions` alanını açıkça tanımlar, job’a sadece gerekli yetkiyi veririm. Pages deploy için `pages: write` ve `id-token: write` gerekebilirken normal test job’ında read yeterli olabilir. Java’da bir class’a gereksiz public method vermemek gibi, workflow token’a da gereksiz yetki verilmez.',
    'How do you apply least privilege in a CI/CD pipeline?',
    'I explicitly define `permissions` and grant only what each job needs. Pages deployment may need `pages: write` and `id-token: write`, while a normal test job may only need read access. Like avoiding unnecessary public methods in Java classes, workflow tokens should not get unnecessary power.'),
  iq('advanced',
    'Protected environments GitHub Actions deploy güvenliğine nasıl katkı sağlar?',
    'Protected environment deploy öncesi manuel approval, branch restriction veya environment secret izolasyonu sağlayabilir. Production Pages veya cloud deploy job’larında yanlış branch’ten yayın riskini azaltır. Java’da production profile’ı test profile’dan ayırmak gibi, GitHub environment da deployment bağlamını ayırır.',
    'How do protected environments improve GitHub Actions deployment safety?',
    'Protected environments can require manual approval, restrict branches, or isolate environment secrets before deployment. They reduce the risk of publishing from the wrong branch in Pages or cloud deploy jobs. Like separating production and test profiles in Java, GitHub environments separate deployment context.'),
  iq('advanced',
    'History rewrite gereken bir durumda takım iletişimini nasıl yönetirsin?',
    'Önce neden history rewrite gerektiğini ve hangi branch’i etkileyeceğini açıkça duyururum. İşlem öncesi remote state’i fetch eder, gerekirse backup tag/branch oluşturur ve sonrasında herkesin nasıl sync edeceğini yazarım. Java’da database migration duyurusu gibi, Git history rewrite da koordinasyon gerektiren bir operasyonel değişikliktir.',
    'How do you manage team communication when history rewrite is required?',
    'I clearly announce why the rewrite is needed and which branch is affected. Before acting, I fetch remote state, create a backup tag or branch if needed, and document how everyone should resync afterward. Like a Java database migration announcement, Git history rewrite is an operational change requiring coordination.'),
  iq('advanced',
    'Flaky testleri GitHub Actions üzerinde nasıl görünür ve yönetilebilir hale getirirsin?',
    'Raporları artifact olarak saklar, retry kullanımını sınırlı ve etiketli yapar, flaky testleri ayrı label veya issue ile takip ederim. Fail eden testin commit, browser, OS ve seed bilgisi loglarda görünmelidir. Java’da flaky JUnit testini `@Disabled` ile sonsuza kadar saklamak yerine root cause açmak gibi, Actions tarafında da görünürlük ve sahiplik gerekir.',
    'How do you make flaky tests visible and manageable in GitHub Actions?',
    'I store reports as artifacts, use retries sparingly and explicitly, and track flaky tests with labels or issues. Failed runs should expose commit, browser, OS, and seed information. Like not hiding a flaky JUnit test forever with `@Disabled`, Actions needs visibility and ownership.'),
  iq('advanced',
    'GitHub Pages ile custom domain yayınında DNS ve build tarafında hangi noktalar kritiktir?',
    'DNS tarafında GitHub Pages’in istediği A/AAAA veya CNAME kayıtları doğru olmalıdır; build tarafında custom domain için `CNAME` dosyası artifact içinde kalmalıdır. SPA ise route fallback veya static shell stratejisi ayrıca gerekir. Java backend deploy’da reverse proxy ayarı yapabildiğin için fallback server’da çözülür; Pages’te bunu build çıktısıyla çözersin.',
    'What is critical for custom domain publishing with GitHub Pages?',
    'DNS must have the correct A/AAAA or CNAME records for GitHub Pages, and the build artifact must include the `CNAME` file for the custom domain. If it is a SPA, you also need route fallback or static shell strategy. With a Java backend you can solve fallback at the server/proxy layer; on Pages you solve it in static output.'),
  iq('advanced',
    'Bir workflow’da test, build ve deploy’u tek job mı ayrı job mı yaparsın?',
    'Küçük projede tek job basit olabilir; büyüyen projede test, build ve deploy ayrı job olarak daha okunabilir ve kontrollüdür. Deploy job’ı test/build başarısına `needs` ile bağlanır ve environment permission ayrı tutulur. Java’da compile, test, package fazlarını ayırmak gibi, CI job ayrımı sorumlulukları netleştirir.',
    'Would you put test, build, and deploy in one workflow job or separate jobs?',
    'For a small project one job may be simple; as the project grows, separate test, build, and deploy jobs are clearer and safer. The deploy job should depend on test/build via `needs` and have separate environment permissions. Like separating compile, test, and package phases in Java, CI job separation clarifies responsibilities.'),
  iq('advanced',
    'Submodule veya subtree kullanımı QA projelerinde ne zaman mantıklıdır?',
    'Ortak test data veya shared automation library farklı repolarda versiyonlanacaksa düşünülebilir, fakat karmaşıklık getirir. Çoğu ekip için package registry, npm/Maven artifact veya monorepo daha yönetilebilir olabilir. Java’da ortak library’yi jar dependency olarak almak submodule’dan daha temiz olabileceği gibi, Git yapısı da ekip olgunluğuna göre seçilmelidir.',
    'When do submodules or subtrees make sense in QA projects?',
    'They can make sense when shared test data or automation libraries must be versioned in separate repositories, but they add complexity. For many teams, a package registry, npm/Maven artifact, or monorepo is easier to manage. Like consuming a shared Java library as a jar dependency, Git structure should match team maturity.'),
  iq('advanced',
    'Release tag stratejisi QA için ne sağlar?',
    'Tag, belirli bir commit’i release noktası olarak sabitler; hangi test suite’i hangi ürün versiyonunda geçti izlenebilir. Annotated tag ve release notes, hotfix ve rollback sürecini kolaylaştırır. Java’da artifact version `1.4.2` nasıl izlenebilirlik sağlıyorsa Git tag de kaynak kod snapshot’ını sabitler.',
    'What does a release tag strategy provide for QA?',
    'A tag pins a specific commit as a release point, making it clear which test suite passed on which product version. Annotated tags and release notes help hotfix and rollback processes. Like Java artifact version `1.4.2`, a Git tag fixes a source snapshot.'),
  iq('advanced',
    'Security scanning ve dependency review PR sürecine nasıl eklenmelidir?',
    'Dependency review, secret scanning ve code scanning PR checks olarak görünür olmalıdır; yüksek riskli bulgu merge’i durdurabilir. False positive yönetimi için security owner ve exception süreci gerekir. Java’da OWASP dependency check nasıl supply-chain riskini yakalarsa GitHub security checks de PR aşamasında risk yakalar.',
    'How should security scanning and dependency review be added to PR workflow?',
    'Dependency review, secret scanning, and code scanning should appear as PR checks, and high-risk findings can block merge. A security owner and exception process are needed for false positives. Like OWASP dependency checks in Java, GitHub security checks catch supply-chain risk during PR review.'),
  iq('advanced',
    'Çok uzun yaşayan feature branch’lerin QA’ya etkisi nedir?',
    'Uzun yaşayan branch’ler main’den uzaklaşır, conflict ve geç entegrasyon bug’ı üretir. QA otomasyonunda selector, test data ve environment değişiklikleri arkadan değiştiği için testler merge anında patlayabilir. Java’da aylarca eski interface’e göre kod yazmak gibi, uzun branch entegrasyon maliyetini büyütür.',
    'What is the QA impact of long-lived feature branches?',
    'Long-lived branches drift away from main, creating conflicts and late integration bugs. In QA automation, selectors, test data, and environments may change underneath, so tests can fail at merge time. Like coding against an old Java interface for months, long branches increase integration cost.'),
  iq('advanced',
    'GitHub Actions self-hosted runner kullanırken hangi riskleri değerlendirirsin?',
    'Self-hosted runner daha fazla kontrol ve özel environment sağlar ama güvenlik, cleanup ve erişim yönetimi sorumluluğunu artırır. Fork PR’larının güvenilmeyen kodu runner’da çalıştırması kritik risktir; izolasyon ve runner lifecycle planlanmalıdır. Java testlerini özel cihaz lab’ında koşturmak gibi, ortam avantajı vardır ama operasyonel güvenlik de sana geçer.',
    'What risks do you evaluate with GitHub Actions self-hosted runners?',
    'Self-hosted runners provide more control and custom environments, but increase responsibility for security, cleanup, and access management. Running untrusted fork PR code on them is a major risk, so isolation and runner lifecycle must be planned. Like running Java tests in a private device lab, the environment is powerful but operational security becomes yours.'),
  iq('advanced',
    'Bir PR’da generated snapshot dosyaları da değişti. Review stratejin ne olur?',
    'Önce generator komutunun gerçekten çalıştırıldığını ve kaynak değişiklikle snapshot değişikliğinin uyumlu olduğunu kontrol ederim. Generated dosyalar büyükse diff okunabilirliği için ayrı commit veya artifact yaklaşımı tercih edilebilir. Java’da generated code ile source code ayrımı nasıl review stratejisini etkiliyorsa snapshot dosyaları da ayrı dikkat ister.',
    'Generated snapshot files changed in a PR. What is your review strategy?',
    'I first verify the generator command was actually run and that generated changes match source changes. If generated files are large, a separate commit or artifact approach may improve reviewability. Like generated Java code versus source code, snapshot files need special review handling.'),
  iq('advanced',
    'GitHub Actions reusable workflows ne zaman tercih edilir?',
    'Birden fazla repoda aynı test, build veya deploy mantığı tekrar ediliyorsa reusable workflow bakım maliyetini azaltır. Ancak abstraction fazla kaçarsa debug zorlaşır, bu yüzden input/output ve versioning net olmalıdır. Java’da ortak base class veya utility library ne zaman anlamlıysa reusable workflow da o zaman anlamlıdır.',
    'When do you prefer reusable GitHub Actions workflows?',
    'When multiple repositories repeat the same test, build, or deploy logic, reusable workflows reduce maintenance cost. But too much abstraction makes debugging harder, so inputs, outputs, and versioning must be clear. Like a shared Java base class or utility library, reusable workflows are useful when the reuse is real.'),
  iq('advanced',
    'Repository’de CODEOWNERS dosyası QA sürecine nasıl katkı sağlar?',
    'CODEOWNERS belirli klasörlerde otomatik reviewer atar; örneğin `tests/e2e/` değişince QA lead review zorunlu olabilir. Bu, domain sahipliğini görünür yapar ve kritik test altyapısı değişikliklerinin kaçmasını engeller. Java’da package ownership nasıl bakım sorumluluğu veriyorsa CODEOWNERS da GitHub seviyesinde bunu uygular.',
    'How does CODEOWNERS improve the QA process?',
    'CODEOWNERS automatically requests reviewers for specific paths; for example, changes under `tests/e2e/` can require QA lead review. This makes domain ownership visible and prevents critical test infrastructure changes from slipping through. Like Java package ownership, CODEOWNERS applies ownership at GitHub level.'),
  iq('advanced',
    'Bir production deploy sonrası sorun çıktıysa Git/GitHub ile hızlı teşhisi nasıl yaparsın?',
    'Önce release tag veya deploy commit SHA’yı bulur, önceki sağlıklı commit ile diff alırım. GitHub Actions run logları, artifact’ler ve PR bağlantıları üzerinden hangi değişikliklerin deploy edildiğini izlerim. Java’da stack trace’i ilgili release artifact version’a bağlamak gibi, Git SHA production davranışını kaynak snapshot’a bağlar.',
    'After a production deploy issue, how do you diagnose quickly with Git/GitHub?',
    'I first find the release tag or deployed commit SHA, then diff it against the last healthy commit. I inspect GitHub Actions logs, artifacts, and linked PRs to see exactly what was deployed. Like mapping a Java stack trace to an artifact version, the Git SHA maps production behavior to a source snapshot.'),
]

const gitErrorEntries = [
  {
    error: 'fatal: not a git repository',
    fullMessage: 'fatal: not a git repository (or any of the parent directories): .git',
    cause: {
      tr: 'Komutu repo klasörü dışında çalıştırıyorsun veya `.git` klasörü yok. Genelde yanlış terminal dizini, silinmiş repo metadata’sı ya da henüz `git init` yapılmamış klasör sebep olur.',
      en: 'You are running the command outside a repository or the `.git` folder does not exist. The usual causes are a wrong terminal directory, deleted repository metadata, or a folder that has not been initialized.',
    },
    solution: {
      tr: '`pwd`/`dir` ile klasörü kontrol et, doğru repo köküne geç veya yeni projede `git init` çalıştır. Gerçek işte önce yanlış klasörde olmadığını doğrula; yanlış klasörde init yapmak gereksiz nested repo oluşturabilir.',
      en: 'Check the folder with `pwd`/`dir`, move to the repository root, or run `git init` for a new project. In real work, verify the directory first because initializing in the wrong folder can create an accidental nested repo.',
    },
    codeWrong: `# Wrong: command is run from Desktop, not the repo
cd ~/Desktop
git status`,
    codeFixed: `# Fixed: move to the repository root first
cd ~/projects/learnqa
git status`,
  },
  {
    error: 'error: pathspec did not match any file(s)',
    fullMessage: "error: pathspec 'feature/login' did not match any file(s) known to git",
    cause: {
      tr: 'Branch, tag veya dosya adını yanlış yazdın ya da remote branch henüz localde bilinmiyor. `git switch feature/login` demeden önce branch gerçekten var mı kontrol edilmelidir.',
      en: 'The branch, tag, or file name is misspelled, or the remote branch is not known locally yet. Before `git switch feature/login`, verify the branch exists.',
    },
    solution: {
      tr: '`git branch -a` ve `git fetch origin` kullan. Remote branch varsa `git switch --track origin/feature/login` ile local tracking branch oluştur.',
      en: 'Use `git branch -a` and `git fetch origin`. If the remote branch exists, create a local tracking branch with `git switch --track origin/feature/login`.',
    },
    codeWrong: `# Wrong: local Git has not fetched this branch yet
git switch feature/login`,
    codeFixed: `# Fixed: fetch and track the remote branch
git fetch origin
git switch --track origin/feature/login`,
  },
  {
    error: 'rejected non-fast-forward',
    fullMessage: '! [rejected] main -> main (non-fast-forward)',
    cause: {
      tr: 'Remote branch sende olmayan commit’ler içeriyor; senin push’un geçmişi ileri taşımak yerine eski noktadan yazmaya çalışıyor. Takımda başka biri main’e merge etmiş olabilir.',
      en: 'The remote branch contains commits you do not have; your push would not simply move history forward. Someone else may have merged to main.',
    },
    solution: {
      tr: 'Önce `git fetch origin`, sonra branch’ini `origin/main` ile merge veya rebase et. Conflict varsa çöz, testleri çalıştır ve tekrar push et.',
      en: 'Run `git fetch origin`, then merge or rebase your branch with `origin/main`. Resolve conflicts, run tests, and push again.',
    },
    codeWrong: `# Wrong: pushing without integrating remote changes
git push origin main`,
    codeFixed: `# Fixed: update from remote before pushing
git fetch origin
git merge origin/main
git push origin main`,
  },
  {
    error: 'CONFLICT (content)',
    fullMessage: 'CONFLICT (content): Merge conflict in tests/login.spec.js',
    cause: {
      tr: 'Aynı satır veya yakın kod bölgesi iki branch’te farklı değişmiş. Git hangi davranışın doğru olduğuna otomatik karar veremez.',
      en: 'The same line or nearby code changed differently on two branches. Git cannot automatically decide which behavior is correct.',
    },
    solution: {
      tr: 'Conflict marker’larını silip doğru birleşik davranışı yaz. Sadece marker temizlemek yetmez; ilgili testleri çalıştırıp davranışın doğru olduğunu kanıtla.',
      en: 'Remove conflict markers and write the correct combined behavior. Removing markers is not enough; run the relevant tests to prove behavior is correct.',
    },
    codeWrong: `// Wrong: conflict markers left in the test file
<<<<<<< HEAD
await loginAsAdmin()
=======
await loginAsStandardUser()
>>>>>>> feature/login`,
    codeFixed: `// Fixed: choose the correct behavior and test it
await loginAsAdmin()       // Use admin for this permission scenario
await expect(page).toHaveURL(/dashboard/)`,
  },
  {
    error: 'detached HEAD',
    fullMessage: 'You are in detached HEAD state.',
    cause: {
      tr: 'Bir branch yerine doğrudan commit hash veya tag checkout ettin. Bu durumda commit atarsan branch referansı olmadığı için çalışman kolayca kaybolmuş gibi görünebilir.',
      en: 'You checked out a commit hash or tag directly instead of a branch. If you commit here, there is no branch reference, so work can look lost.',
    },
    solution: {
      tr: 'Değişiklik yapacaksan hemen `git switch -c rescue/my-work` ile branch oluştur. Sadece geçmişi inceliyorsan sorun yok, ama geliştirme detached HEAD üzerinde yapılmamalı.',
      en: 'If you will make changes, immediately create a branch with `git switch -c rescue/my-work`. It is fine for inspection, but development should not happen on detached HEAD.',
    },
    codeWrong: `# Risky: committing while detached
git checkout 3a1b2c4
git commit -am "fix: quick patch"`,
    codeFixed: `# Safe: create a branch from that commit
git switch -c rescue/quick-patch
git commit -am "fix: quick patch"`,
  },
  {
    error: 'Permission denied (publickey)',
    fullMessage: 'git@github.com: Permission denied (publickey).',
    cause: {
      tr: 'SSH key GitHub hesabına ekli değil, yanlış key kullanılıyor veya remote SSH URL ile ayarlı ama makinede SSH auth yok. Yeni cihazlarda sık görülür.',
      en: 'The SSH key is not added to GitHub, the wrong key is used, or the remote uses an SSH URL while the machine has no SSH auth. It is common on new devices.',
    },
    solution: {
      tr: '`ssh -T git@github.com` ile bağlantıyı test et. SSH key’i GitHub hesabına ekle veya remote’u HTTPS URL’e çevir.',
      en: 'Test the connection with `ssh -T git@github.com`. Add the SSH key to GitHub or switch the remote to an HTTPS URL.',
    },
    codeWrong: `# Wrong: remote uses SSH but this machine has no key
git remote -v
git push origin main`,
    codeFixed: `# Fixed option 1: test SSH after adding your key
ssh -T git@github.com
git push origin main

# Fixed option 2: use HTTPS remote
git remote set-url origin https://github.com/org/repo.git`,
  },
  {
    error: 'Authentication failed',
    fullMessage: 'remote: Invalid username or password. fatal: Authentication failed',
    cause: {
      tr: 'GitHub artık hesap şifresiyle Git over HTTPS kabul etmez; Personal Access Token veya credential manager gerekir. Token scope/permission yanlışsa da aynı hata çıkabilir.',
      en: 'GitHub does not accept account passwords for Git over HTTPS; you need a Personal Access Token or credential manager. Wrong token scope or permission can produce the same error.',
    },
    solution: {
      tr: 'Credential manager’ı güncelle, yeni token oluştur ve sadece gereken repository yetkisini ver. Token’ı asla repoya veya workflow log’una yazma.',
      en: 'Update the credential manager, create a new token, and grant only the required repository access. Never write the token into the repository or workflow logs.',
    },
    codeWrong: `# Wrong: password or token pasted into a script
git push https://TOKEN@github.com/org/repo.git main`,
    codeFixed: `# Fixed: let Git Credential Manager store credentials securely
git remote set-url origin https://github.com/org/repo.git
git push origin main`,
  },
  {
    error: 'GH013: Repository rule violations found',
    fullMessage: 'remote: error: GH013: Repository rule violations found for refs/heads/main.',
    cause: {
      tr: 'Branch protection, secret scanning veya required status check gibi repository rules push’u engelledi. Bu genelde main’e doğrudan push, secret içeren commit veya başarısız check anlamına gelir.',
      en: 'Repository rules such as branch protection, secret scanning, or required status checks blocked the push. This often means direct push to main, a secret in the commit, or failing checks.',
    },
    solution: {
      tr: 'PR akışına dön, secret varsa revoke/rotate et ve history cleanup planla. Required check başarısızsa önce workflow loglarını düzelt.',
      en: 'Return to the PR workflow, revoke/rotate secrets if present, and plan history cleanup. If a required check failed, fix the workflow or test failure first.',
    },
    codeWrong: `# Wrong: bypassing the team workflow
git push origin main`,
    codeFixed: `# Fixed: push a branch and open a PR
git switch -c fix/login-secret-cleanup
git push -u origin fix/login-secret-cleanup`,
  },
  {
    error: 'refusing to merge unrelated histories',
    fullMessage: 'fatal: refusing to merge unrelated histories',
    cause: {
      tr: 'İki repo geçmişi ortak ancestor paylaşmıyor; genelde lokal `git init` sonrası GitHub’da ayrıca README ile repo oluşturulduğunda olur.',
      en: 'Two repositories do not share a common ancestor; this often happens when you run local `git init` and also create a GitHub repo with a README.',
    },
    solution: {
      tr: 'En temiz çözüm genelde repoyu tekrar doğru şekilde clone etmek veya başlangıç stratejisini net seçmektir. `--allow-unrelated-histories` ancak gerçekten iki geçmişi bilinçli birleştireceksen kullanılmalı.',
      en: 'The cleanest solution is often to clone correctly or choose one initialization strategy. Use `--allow-unrelated-histories` only when you intentionally want to combine two histories.',
    },
    codeWrong: `# Risky: two separate histories were created
git init
git remote add origin https://github.com/org/repo.git
git pull origin main`,
    codeFixed: `# Cleaner: clone the existing GitHub repo first
git clone https://github.com/org/repo.git
cd repo`,
  },
]

const glossaryTerms = [
  { term: 'branch', definition: { tr: 'Aynı repo içinde ayrı çalışma çizgisi; main’i bozmadan değişiklik yapmanı sağlar.', en: 'A separate line of work inside the same repository; it lets you change code without breaking main.' } },
  { term: 'commit', definition: { tr: 'Projenin belirli andaki kalıcı snapshot kaydı.', en: 'A permanent snapshot of the project at a specific moment.' } },
  { term: 'remote', definition: { tr: 'GitHub gibi uzak repository referansı; genelde adı origin olur.', en: 'A reference to a remote repository such as GitHub; commonly named origin.' } },
  { term: 'Pull Request', definition: { tr: 'Branch değişikliğini main’e almadan önce review, CI ve tartışmaya açan GitHub akışı.', en: 'A GitHub flow that opens branch changes for review, CI, and discussion before merging.' } },
  { term: 'GitHub Actions', definition: { tr: 'Repository event’lerine göre test, build ve deploy yapan CI/CD sistemi.', en: 'A CI/CD system that runs tests, builds, and deploys based on repository events.' } },
  { term: 'GitHub Pages', definition: { tr: 'Repository’den statik web sitesi yayınlama özelliği.', en: 'A feature for publishing a static website from a repository.' } },
  { term: 'rebase', definition: { tr: 'Commitleri başka bir taban üzerine yeniden yazar; temiz history sağlar ama paylaşılmış branch’te risklidir.', en: 'Rewrites commits onto a new base; creates clean history but is risky on shared branches.' } },
  { term: 'artifact', definition: { tr: 'CI job sonunda saklanan rapor, build çıktısı, screenshot veya trace dosyası.', en: 'A report, build output, screenshot, or trace stored after a CI job.' } },
]

const terminalToolsPractice = {
  type: 'git-practice',
  icon: '🖥️',
  title: { tr: 'Try It Yourself: Terminalde güvenli ilk tur', en: 'Try It Yourself: First safe terminal tour' },
  intro: {
    tr: 'Git Bash veya terminal içinde önce nerede olduğunu gör, klasör aç, içine gir, Git kurulu mu kontrol et ve repo durumunu sor.',
    en: 'Inside Git Bash or a terminal, first see where you are, create a folder, enter it, verify Git, and ask for repository state.',
  },
  starterCommands: {
    tr: `git status
mkdir git-practice
git init
pwd
git --version
cd git-practice
ls`,
    en: `git status
mkdir git-practice
git init
pwd
git --version
cd git-practice
ls`,
  },
  expectedSteps: [
    { label: { tr: 'Önce hangi klasörde olduğunu gör', en: 'See which folder you are in first' }, pattern: '^pwd$', example: 'pwd' },
    { label: { tr: 'Bulunduğun klasörde ne var listele', en: 'List what is in the current folder' }, pattern: '^(ls|dir)$', example: 'ls' },
    { label: { tr: 'Deneme klasörü oluştur', en: 'Create a practice folder' }, pattern: '^mkdir\\s+git-practice$', example: 'mkdir git-practice' },
    { label: { tr: 'Yeni klasörün içine gir', en: 'Enter the new folder' }, pattern: '^cd\\s+git-practice$', example: 'cd git-practice' },
    { label: { tr: 'Git gerçekten çalışıyor mu doğrula', en: 'Verify Git really works' }, pattern: '^git --version$', example: 'git --version' },
    { label: { tr: 'Bu klasörü Git repo yap', en: 'Turn this folder into a Git repository' }, pattern: '^git init$', example: 'git init' },
    { label: { tr: 'Repo durumunu oku', en: 'Read repository state' }, pattern: '^git status$', example: 'git status' },
  ],
  successOutput: {
    tr: 'Doğru akış: nerede olduğunu gördün, klasör açtın, içine girdin, Git kurulumunu doğruladın, repo başlattın ve durumunu okudun.',
    en: 'Correct flow: you saw your location, created a folder, entered it, verified Git, initialized a repo, and read its state.',
  },
  retryOutput: {
    tr: 'Sıra eksik. Önce konum ve klasör mantığını kur; sonra Git komutlarına geç. Yanlış klasörde `git init` yapmak yeni başlayanların en sık hatasıdır.',
    en: 'The order is incomplete. Build the location and folder model first, then move to Git commands. Running `git init` in the wrong folder is a common beginner mistake.',
  },
}

const gitBashDailyCommandsPractice = {
  type: 'git-practice',
  icon: '⌨️',
  title: { tr: 'Try It Yourself: Git Bash temel komut turu', en: 'Try It Yourself: Git Bash basic command tour' },
  intro: {
    tr: 'Bu alanda Git Bash veya IDE terminalinde el alışkanlığı kazan: konum gör, klasör değiştir, dosya oluştur, içeriği oku, ağ bilgisini göster.',
    en: 'Use this to build muscle memory in Git Bash or an IDE terminal: see location, change folders, create a file, read it, and show network info.',
  },
  starterCommands: {
    tr: `ipconfig
cat notes.txt
cd terminal-demo
pwd
echo "ilk terminal notum" > notes.txt
mkdir terminal-demo
ls
touch notes.txt
cd ..`,
    en: `ipconfig
cat notes.txt
cd terminal-demo
pwd
echo "my first terminal note" > notes.txt
mkdir terminal-demo
ls
touch notes.txt
cd ..`,
  },
  expectedSteps: [
    { label: { tr: 'Önce bulunduğun klasörü gör', en: 'First see your current folder' }, pattern: '^pwd$', example: 'pwd' },
    { label: { tr: 'Klasörde ne var listele', en: 'List what is in the folder' }, pattern: '^(ls|dir)$', example: 'ls' },
    { label: { tr: 'Deneme klasörü oluştur', en: 'Create a practice folder' }, pattern: '^mkdir\\s+terminal-demo$', example: 'mkdir terminal-demo' },
    { label: { tr: 'Deneme klasörünün içine gir', en: 'Enter the practice folder' }, pattern: '^cd\\s+terminal-demo$', example: 'cd terminal-demo' },
    { label: { tr: 'Boş dosya oluştur', en: 'Create an empty file' }, pattern: '^touch\\s+notes\\.txt$', example: 'touch notes.txt' },
    { label: { tr: 'Dosyaya metin yaz', en: 'Write text into the file' }, pattern: '^echo\\s+["\'].+["\']\\s+>\\s+notes\\.txt$', example: 'echo "ilk terminal notum" > notes.txt' },
    { label: { tr: 'Dosya içeriğini oku', en: 'Read file content' }, pattern: '^(cat|type)\\s+notes\\.txt$', example: 'cat notes.txt' },
    { label: { tr: 'Bir üst klasöre dön', en: 'Go back to the parent folder' }, pattern: '^cd\\s+\\.\\.$', example: 'cd ..' },
    { label: { tr: 'Windows ağ bilgisini göster', en: 'Show Windows network information' }, pattern: '^ipconfig$', example: 'ipconfig' },
  ],
  successOutput: {
    tr: 'Harika: konum gördün, klasör değiştirdin, dosya oluşturdun, metin yazdın, dosyayı okudun ve `ipconfig` çıktısının terminalde nasıl göründüğünü öğrendin.',
    en: 'Great: you saw location, changed folders, created a file, wrote text, read the file, and learned how `ipconfig` output appears in the terminal.',
  },
  retryOutput: {
    tr: 'Sıra eksik. Terminalde önce nerede olduğunu gör, sonra klasör/dosya işlemleri yap, en sonda sonucu oku. Komutları ezberleme; her komutun ekranda ne değiştirdiğine bak.',
    en: 'The order is incomplete. In the terminal, first see where you are, then do folder/file operations, then read the result. Do not memorize commands; watch what each command changes on screen.',
  },
}

const gitBasicsPractice = {
  type: 'git-practice',
  icon: '⌨️',
  title: { tr: 'Try It Yourself: İlk güvenli commit akışı', en: 'Try It Yourself: First safe commit flow' },
  intro: {
    tr: 'Aşağıdaki komutları gerçek terminale geçmeden önce doğru sıraya getir.',
    en: 'Put the commands in the correct order before using a real terminal.',
  },
  starterCommands: {
    tr: `# İlk commit akışını yaz
git status
git add README.md
git commit -m "docs: add project notes"
git status`,
    en: `# Write the first commit flow
git status
git add README.md
git commit -m "docs: add project notes"
git status`,
  },
  expectedSteps: [
    { label: { tr: 'Önce repo durumunu kontrol et', en: 'Check repository state first' }, pattern: '^git status$', example: 'git status' },
    { label: { tr: 'İlgili dosyayı staging area’ya al', en: 'Stage the relevant file' }, pattern: '^git add\\s+README\\.md$', example: 'git add README.md' },
    { label: { tr: 'Anlamlı mesajla commit oluştur', en: 'Create a commit with a meaningful message' }, pattern: '^git commit\\s+-m\\s+["\'].+["\']$', example: 'git commit -m "docs: add project notes"' },
    { label: { tr: 'Son durumda working tree temiz mi bak', en: 'Check whether the working tree is clean' }, pattern: '^git status$', example: 'git status' },
  ],
  successOutput: {
    tr: 'On branch feature/git-notes\nnothing to commit, working tree clean',
    en: 'On branch feature/git-notes\nnothing to commit, working tree clean',
  },
  retryOutput: {
    tr: 'Sıra eksik. Commit atmadan önce neyi staging’e aldığını görmelisin.',
    en: 'The order is incomplete. You should know what is staged before committing.',
  },
}

const gitRemoteOriginPractice = {
  type: 'git-practice',
  icon: '🔗',
  title: { tr: 'Try It Yourself: Local repo ile GitHub repo bağlama', en: 'Try It Yourself: Connect a local repo to GitHub' },
  intro: {
    tr: 'En az 1 commit oluştur, origin remote ekle, remote URL listesini kontrol et ve ilk push ile upstream kur.',
    en: 'Create at least 1 commit, add the origin remote, inspect remote URLs, and set upstream with the first push.',
  },
  starterCommands: {
    tr: `git push -u origin main
git remote -v
git commit -m "chore: initial project snapshot"
git remote add origin https://github.com/hasankocaman/deneme2.git
git status
git add README.md package.json`,
    en: `git push -u origin main
git remote -v
git commit -m "chore: initial project snapshot"
git remote add origin https://github.com/hasankocaman/deneme2.git
git status
git add README.md package.json`,
  },
  expectedSteps: [
    { label: { tr: 'Önce local durumunu gör', en: 'Inspect local state first' }, pattern: '^git status$', example: 'git status' },
    { label: { tr: 'Commitlenecek dosyaları bilinçli stage et', en: 'Stage the files intentionally' }, pattern: '^git add\\s+.+$', example: 'git add README.md package.json' },
    { label: { tr: 'İlk local commit snapshotını oluştur', en: 'Create the first local commit snapshot' }, pattern: '^git commit\\s+-m\\s+["\'].+["\']$', example: 'git commit -m "chore: initial project snapshot"' },
    { label: { tr: 'GitHub repo URL’sini origin adıyla bağla', en: 'Attach the GitHub repo URL as origin' }, pattern: '^git remote\\s+add\\s+origin\\s+(https?:\\/\\/\\S+(?:\\.git)?|git@github\\.com:[^\\s]+(?:\\.git)?)$', example: 'git remote add origin https://github.com/hasankocaman/deneme2.git' },
    { label: { tr: 'Remote fetch/push URL’lerini listele', en: 'List remote fetch/push URLs' }, pattern: '^git remote\\s+(-v|--verbose)$', example: 'git remote -v' },
    { label: { tr: 'İlk push ile upstream kur', en: 'Set upstream with the first push' }, pattern: '^git push\\s+-u\\s+origin\\s+(main|master)$', example: 'git push -u origin main' },
  ],
  dangerousPatterns: [
    { pattern: '\\bgit\\s+reset\\s+--hard\\b', label: { tr: 'git reset --hard çalışma alanındaki kaydedilmemiş değişiklikleri siler.', en: 'git reset --hard discards uncommitted work in the working tree.' } },
    { pattern: '\\bgit\\s+push\\s+--force\\b', label: { tr: 'git push --force ortak branch geçmişini ezebilir; işte --force-with-lease tercih edilir.', en: 'git push --force can overwrite shared history; prefer --force-with-lease at work.' } },
    { pattern: '\\bgit\\s+clean\\s+-f', label: { tr: 'git clean -f untracked dosyaları siler; önce git clean -n ile prova yap.', en: 'git clean -f deletes untracked files; preview with git clean -n first.' } },
    { pattern: 'https?:\\/\\/[^\\s/@]+:[^\\s@]+@', label: { tr: 'Token veya şifreyi remote URL içine yazma; credential manager veya GitHub CLI kullan.', en: 'Do not put a token or password inside the remote URL; use a credential manager or GitHub CLI.' } },
  ],
  successOutput: {
    tr: 'origin bağlı, remote URL kontrol edildi ve main/master branch için upstream kuruldu. Bundan sonra aynı branch üzerindeyken sadece git push yeterli.',
    en: 'origin is attached, remote URLs were checked, and upstream is set for main/master. Future pushes on the same branch can use plain git push.',
  },
  retryOutput: {
    tr: 'Sıra eksik. İlk commit olmadan anlamlı push olmaz; origin eklenmeden de GitHub hedefi bilinmez.',
    en: 'The order is incomplete. Without the first commit there is nothing meaningful to push; without origin Git does not know the GitHub target.',
  },
}

const gitPrPractice = {
  type: 'git-practice',
  icon: '🐙',
  title: { tr: 'Try It Yourself: PR açmaya hazır branch', en: 'Try It Yourself: Branch ready for a PR' },
  intro: {
    tr: 'Feature branch oluştur, commit at, push et ve PR açmaya hazır hale getir.',
    en: 'Create a feature branch, commit, push, and get ready to open a PR.',
  },
  starterCommands: {
    tr: `git fetch origin
git switch -c feature/login-tests
git add tests/login.spec.js
git commit -m "test: add login regression checks"
git push -u origin feature/login-tests`,
    en: `git fetch origin
git switch -c feature/login-tests
git add tests/login.spec.js
git commit -m "test: add login regression checks"
git push -u origin feature/login-tests`,
  },
  expectedSteps: [
    { label: { tr: 'Remote bilgisini güncelle', en: 'Refresh remote information' }, pattern: '^git fetch\\s+origin$', example: 'git fetch origin' },
    { label: { tr: 'Yeni feature branch aç', en: 'Create a new feature branch' }, pattern: '^git switch\\s+-c\\s+feature\\/login-tests$', example: 'git switch -c feature/login-tests' },
    { label: { tr: 'Sadece ilgili test dosyasını ekle', en: 'Stage only the relevant test file' }, pattern: '^git add\\s+tests\\/login\\.spec\\.js$', example: 'git add tests/login.spec.js' },
    { label: { tr: 'Test niyetini anlatan commit at', en: 'Commit with test intent' }, pattern: '^git commit\\s+-m\\s+["\']test:.+["\']$', example: 'git commit -m "test: add login regression checks"' },
    { label: { tr: 'Upstream ile branch’i GitHub’a gönder', en: 'Push the branch to GitHub with upstream' }, pattern: '^git push\\s+-u\\s+origin\\s+feature\\/login-tests$', example: 'git push -u origin feature/login-tests' },
  ],
  successOutput: {
    tr: 'remote: Create a pull request for feature/login-tests on GitHub.\nBranch PR için hazır.',
    en: 'remote: Create a pull request for feature/login-tests on GitHub.\nBranch is ready for a PR.',
  },
  retryOutput: {
    tr: 'PR akışı eksik. Branch, commit ve upstream push sırası korunmalı.',
    en: 'PR flow is incomplete. Keep branch, commit, and upstream push in order.',
  },
}

const githubPrOpenUiPractice = {
  type: 'git-practice',
  icon: '🧾',
  title: { tr: 'Try It Yourself: GitHub arayüzünden PR aç', en: 'Try It Yourself: Open a PR from the GitHub UI' },
  intro: {
    tr: 'Feature branch GitHub’a push edildikten sonra Pull Request ekranında hangi alanları hangi sırayla dolduracağını dene.',
    en: 'After a feature branch is pushed to GitHub, practice which Pull Request UI fields to fill in order.',
  },
  starterCommands: {
    tr: `Pull requests tab
New pull request
base: main
compare: feature/login-tests
Create pull request
Add PR title
Fill description with test evidence
Request reviewer
Create pull request`,
    en: `Pull requests tab
New pull request
base: main
compare: feature/login-tests
Create pull request
Add PR title
Fill description with test evidence
Request reviewer
Create pull request`,
  },
  expectedSteps: [
    { label: { tr: 'Repository üst menüsünden Pull requests tabına gir', en: 'Open the Pull requests tab from the repository nav' }, pattern: '^Pull requests tab$', example: 'Pull requests tab' },
    { label: { tr: 'Yeni PR başlat', en: 'Start a new PR' }, pattern: '^New pull request$', example: 'New pull request' },
    { label: { tr: 'Hedef branch main olmalı', en: 'Target branch should be main' }, pattern: '^base:\\s*main$', example: 'base: main' },
    { label: { tr: 'Karşılaştırılacak branch feature branch olmalı', en: 'Compare branch should be the feature branch' }, pattern: '^compare:\\s*feature\\/login-tests$', example: 'compare: feature/login-tests' },
    { label: { tr: 'Compare ekranından PR formuna geç', en: 'Open the PR form from compare view' }, pattern: '^Create pull request$', example: 'Create pull request' },
    { label: { tr: 'Başlık değişikliğin amacını söylemeli', en: 'Title should state the intent' }, pattern: '^Add PR title$', example: 'Add PR title' },
    { label: { tr: 'Açıklamaya test kanıtını yaz', en: 'Put test evidence in the description' }, pattern: '^Fill description with test evidence$', example: 'Fill description with test evidence' },
    { label: { tr: 'Doğru reviewer seç', en: 'Request the right reviewer' }, pattern: '^Request reviewer$', example: 'Request reviewer' },
    { label: { tr: 'PR’ı oluştur', en: 'Create the PR' }, pattern: '^Create pull request$', example: 'Create pull request' },
  ],
  successOutput: {
    tr: 'PR hazır: base main, compare feature/login-tests, açıklama test kanıtı içeriyor ve reviewer istendi.',
    en: 'PR ready: base main, compare feature/login-tests, description includes test evidence and reviewer was requested.',
  },
  retryOutput: {
    tr: 'Sıra eksik. Önce Pull requests → New pull request → base/compare seçimi, sonra PR title, description, reviewer ve Create pull request.',
    en: 'Order is incomplete. Use Pull requests → New pull request → base/compare first, then title, description, reviewer and Create pull request.',
  },
}

const githubPrReviewPractice = {
  type: 'git-practice',
  icon: '👀',
  title: { tr: 'Try It Yourself: Code review yap ve karar ver', en: 'Try It Yourself: Review code and make a decision' },
  intro: {
    tr: 'Files changed ekranında yorum yaz, review başlat, sonra Approve veya Request changes kararını bilinçli ver.',
    en: 'In Files changed, leave a comment, start a review, then choose Approve or Request changes intentionally.',
  },
  starterCommands: {
    tr: `Files changed tab
Open tests/login.spec.js
Add line comment
Start a review
Review changes
Choose Approve
Submit review`,
    en: `Files changed tab
Open tests/login.spec.js
Add line comment
Start a review
Review changes
Choose Approve
Submit review`,
  },
  expectedSteps: [
    { label: { tr: 'Diff ekranını aç', en: 'Open the diff screen' }, pattern: '^Files changed tab$', example: 'Files changed tab' },
    { label: { tr: 'İlgili dosyayı incele', en: 'Inspect the relevant file' }, pattern: '^Open tests\\/login\\.spec\\.js$', example: 'Open tests/login.spec.js' },
    { label: { tr: 'Satır yorumu ekle', en: 'Add a line comment' }, pattern: '^Add line comment$', example: 'Add line comment' },
    { label: { tr: 'Yorumları review paketine al', en: 'Start a review package' }, pattern: '^Start a review$', example: 'Start a review' },
    { label: { tr: 'Review karar penceresini aç', en: 'Open the review decision dialog' }, pattern: '^Review changes$', example: 'Review changes' },
    { label: { tr: 'Bu örnekte onay ver', en: 'Approve in this example' }, pattern: '^Choose Approve$', example: 'Choose Approve' },
    { label: { tr: 'Review kararını gönder', en: 'Submit the review decision' }, pattern: '^Submit review$', example: 'Submit review' },
  ],
  successOutput: {
    tr: 'Review tamam: dosya okundu, satır yorumu yazıldı, Approve kararı submit edildi. Request changes gerektiğinde aynı ekranda bloklayıcı karar verilir.',
    en: 'Review complete: file inspected, line comment added, Approve submitted. When needed, Request changes is the blocking decision in the same dialog.',
  },
  retryOutput: {
    tr: 'Review sırası eksik. Önce Files changed içinde diff oku, sonra yorum, Review changes, karar ve Submit review.',
    en: 'Review order is incomplete. First read the diff in Files changed, then comment, Review changes, decision and Submit review.',
  },
}

const githubPrConflictPractice = {
  type: 'git-practice',
  icon: '🧯',
  title: { tr: 'Try It Yourself: PR conflict’i lokal çöz', en: 'Try It Yourself: Resolve a PR conflict locally' },
  intro: {
    tr: 'PR GitHub’da conflict gösterdiğinde güvenli iş akışı genellikle local branch’te main’i merge edip testle kanıtladıktan sonra push etmektir.',
    en: 'When GitHub shows a PR conflict, the safe workflow is usually to merge main locally into your branch, prove it with tests, then push.',
  },
  starterCommands: {
    tr: `git fetch origin
git switch feature/login-tests
git merge origin/main
code tests/login.spec.js
npm test -- login.spec.js
git add tests/login.spec.js
git commit -m "fix: resolve PR conflict"
git push`,
    en: `git fetch origin
git switch feature/login-tests
git merge origin/main
code tests/login.spec.js
npm test -- login.spec.js
git add tests/login.spec.js
git commit -m "fix: resolve PR conflict"
git push`,
  },
  expectedSteps: [
    { label: { tr: 'Remote main bilgisini indir', en: 'Fetch remote main knowledge' }, pattern: '^git fetch\\s+origin$', example: 'git fetch origin' },
    { label: { tr: 'PR branch’ine geç', en: 'Switch to the PR branch' }, pattern: '^git switch\\s+feature\\/login-tests$', example: 'git switch feature/login-tests' },
    { label: { tr: 'main’i kendi branch’ine uygula', en: 'Merge main into your branch' }, pattern: '^git merge\\s+origin\\/main$', example: 'git merge origin/main' },
    { label: { tr: 'Conflict dosyasını editörde aç', en: 'Open the conflicted file in the editor' }, pattern: '^code\\s+tests\\/login\\.spec\\.js$', example: 'code tests/login.spec.js' },
    { label: { tr: 'Çözümü testle kanıtla', en: 'Prove the resolution with a test' }, pattern: '^npm test\\s+--\\s+login\\.spec\\.js$', example: 'npm test -- login.spec.js' },
    { label: { tr: 'Resolved dosyayı Git’e bildir', en: 'Tell Git the file is resolved' }, pattern: '^git add\\s+tests\\/login\\.spec\\.js$', example: 'git add tests/login.spec.js' },
    { label: { tr: 'Conflict fix commit’i oluştur', en: 'Create the conflict fix commit' }, pattern: '^git commit\\s+-m\\s+["\']fix:.+["\']$', example: 'git commit -m "fix: resolve PR conflict"' },
    { label: { tr: 'PR branch’ini GitHub’a güncelle', en: 'Push the updated PR branch' }, pattern: '^git push$', example: 'git push' },
  ],
  successOutput: {
    tr: 'Conflict güvenli çözüldü: main lokal merge edildi, dosya bilinçli düzenlendi, test geçti ve PR branch’i GitHub’da güncellendi.',
    en: 'Conflict resolved safely: main merged locally, file edited intentionally, test passed and the PR branch updated on GitHub.',
  },
  retryOutput: {
    tr: 'Sıra eksik. Conflict çözümünde fetch → switch → merge → edit → test → add → commit → push akışı korunmalı.',
    en: 'Order is incomplete. Conflict resolution should stay fetch → switch → merge → edit → test → add → commit → push.',
  },
  dangerousPatterns: [
    { pattern: '\\bgit\\s+reset\\s+--hard\\b', label: { tr: 'Conflict anında `reset --hard` kaydedilmemiş işi silebilir. Önce durumunu anla ve gerekirse backup branch aç.', en: '`reset --hard` during a conflict can delete uncommitted work. Inspect state and create a backup branch if needed.' } },
    { pattern: '\\bgit\\s+push\\s+--force\\b', label: { tr: 'PR conflict çözmek için force push normalde gerekmez; takım branch’ini ezebilirsin.', en: 'Force push is normally not needed to solve a PR conflict; it can overwrite team work.' } },
  ],
}

const gitRecoveryPractice = {
  type: 'git-practice',
  icon: '🧯',
  title: { tr: 'Try It Yourself: Tehlikeli komut öncesi güvenli kurtarma', en: 'Try It Yourself: Safe recovery before dangerous commands' },
  intro: {
    tr: '`reset --hard` yazmadan önce neyi kaybedeceğini gör ve güvenli yedek al.',
    en: 'Before typing `reset --hard`, inspect what you would lose and create a safe backup.',
  },
  starterCommands: {
    tr: `git status
git diff
git switch -c backup/wip-login-fix
git add tests/login.spec.js
git commit -m "wip: backup login fix"`,
    en: `git status
git diff
git switch -c backup/wip-login-fix
git add tests/login.spec.js
git commit -m "wip: backup login fix"`,
  },
  expectedSteps: [
    { label: { tr: 'Önce çalışma alanı durumunu gör', en: 'Inspect working tree state first' }, pattern: '^git status$', example: 'git status' },
    { label: { tr: 'Kaybedilecek diff’i oku', en: 'Read the diff you may lose' }, pattern: '^git diff$', example: 'git diff' },
    { label: { tr: 'Yedek branch oluştur', en: 'Create a backup branch' }, pattern: '^git switch\\s+-c\\s+backup\\/wip-login-fix$', example: 'git switch -c backup/wip-login-fix' },
    { label: { tr: 'Yedek commit ile çalışmayı sabitle', en: 'Preserve work with a backup commit' }, pattern: '^git commit\\s+-m\\s+["\']wip:.+["\']$', example: 'git commit -m "wip: backup login fix"' },
  ],
  successOutput: {
    tr: 'Güvenli. Artık destructive komut gerekirse geri dönebileceğin bir branch var.',
    en: 'Safe. If a destructive command is needed later, you have a branch to return to.',
  },
  retryOutput: {
    tr: 'Kurtarma planı eksik. Önce status/diff gör, sonra yedek branch ve commit oluştur.',
    en: 'Recovery plan is incomplete. Inspect status/diff, then create a backup branch and commit.',
  },
}

const gitConceptOrderPractice = {
  type: 'git-practice',
  icon: '🧭',
  title: { tr: 'Try It Yourself: Git akış sırasını kur', en: 'Try It Yourself: Build the Git workflow order' },
  intro: {
    tr: 'Komutları ezberlemek yerine neden-sonuç sırasına koy: local repo kur, snapshot al, GitHub’a bağla, feature branch aç, paylaş, sonra remote değişiklikleri güvenli al.',
    en: 'Instead of memorizing commands, place them in cause-and-effect order: create the local repo, save a snapshot, connect GitHub, create a feature branch, share it, then safely bring remote changes back.',
  },
  starterCommands: {
    tr: `git push -u origin feature/login-tests
git commit -m "test: add login checks"
git remote add origin https://github.com/hasankocaman/deneme2.git
git merge origin/main
git init
git switch -c feature/login-tests
git add README.md
git fetch origin
git push -u origin main
git status
git add tests/login.spec.js
git commit -m "chore: initial snapshot"`,
    en: `git push -u origin feature/login-tests
git commit -m "test: add login checks"
git remote add origin https://github.com/hasankocaman/deneme2.git
git merge origin/main
git init
git switch -c feature/login-tests
git add README.md
git fetch origin
git push -u origin main
git status
git add tests/login.spec.js
git commit -m "chore: initial snapshot"`,
  },
  expectedSteps: [
    { label: { tr: 'Klasörü Git repository yap', en: 'Turn the folder into a Git repository' }, pattern: '^git init$', example: 'git init' },
    { label: { tr: 'Git ne görüyor kontrol et', en: 'Check what Git sees' }, pattern: '^git status$', example: 'git status' },
    { label: { tr: 'İlk snapshot için dosya seç', en: 'Select files for the first snapshot' }, pattern: '^git add\\s+README\\.md$', example: 'git add README.md' },
    { label: { tr: 'İlk local commit oluştur', en: 'Create the first local commit' }, pattern: '^git commit\\s+-m\\s+["\']chore:.+["\']$', example: 'git commit -m "chore: initial snapshot"' },
    { label: { tr: 'GitHub repo adresini origin olarak bağla', en: 'Attach the GitHub repo URL as origin' }, pattern: '^git remote\\s+add\\s+origin\\s+(https?:\\/\\/\\S+(?:\\.git)?|git@github\\.com:[^\\s]+(?:\\.git)?)$', example: 'git remote add origin https://github.com/hasankocaman/deneme2.git' },
    { label: { tr: 'main/master branch’i ilk kez GitHub’a gönder', en: 'Push main/master to GitHub for the first time' }, pattern: '^git push\\s+-u\\s+origin\\s+(main|master)$', example: 'git push -u origin main' },
    { label: { tr: 'main dışında güvenli feature branch aç', en: 'Create a safe feature branch outside main' }, pattern: '^git\\s+(switch\\s+-c|checkout\\s+-b)\\s+feature\\/login-tests$', example: 'git switch -c feature/login-tests' },
    { label: { tr: 'Feature branch’te ilgili test dosyasını seç', en: 'Stage the relevant test file on the feature branch' }, pattern: '^git add\\s+tests\\/login\\.spec\\.js$', example: 'git add tests/login.spec.js' },
    { label: { tr: 'Feature işini ayrı commit yap', en: 'Commit the feature work separately' }, pattern: '^git commit\\s+-m\\s+["\']test:.+["\']$', example: 'git commit -m "test: add login checks"' },
    { label: { tr: 'Feature branch’i remote’da aç ve paylaş', en: 'Create/share the feature branch on remote' }, pattern: '^git push\\s+-u\\s+origin\\s+feature\\/login-tests$', example: 'git push -u origin feature/login-tests' },
    { label: { tr: 'Remote’daki son bilgiyi indir ama dosyana uygulama', en: 'Download latest remote knowledge without applying it yet' }, pattern: '^git fetch\\s+origin$', example: 'git fetch origin' },
    { label: { tr: 'İndirilen main değişikliğini local branch’e uygula', en: 'Apply downloaded main changes into the local branch' }, pattern: '^git merge\\s+origin\\/main$', example: 'git merge origin/main' },
  ],
  successOutput: {
    tr: 'Akış doğru: init → status → add → commit → origin → push main → feature branch → feature commit → push branch → fetch → merge. Artık her komutun nedenini biliyorsun.',
    en: 'Correct flow: init → status → add → commit → origin → push main → feature branch → feature commit → push branch → fetch → merge. You now know why each command exists.',
  },
  retryOutput: {
    tr: 'Sıra hâlâ karışık. Önce Git’in local hafızasını kur, sonra snapshot al, sonra GitHub’a bağla; branch/push/fetch/merge daha sonra gelir.',
    en: 'The order is still mixed. First create Git local memory, then save a snapshot, then connect GitHub; branch/push/fetch/merge come later.',
  },
}

const gitClonePractice = {
  type: 'git-practice',
  icon: '📥',
  title: { tr: 'Try It Yourself: Var olan projeye katıl', en: 'Try It Yourself: Join an existing project' },
  intro: {
    tr: 'Takımın reposunu bilgisayarına al, klasöre gir, durumunu kontrol et ve branch listesini gör.',
    en: 'Clone the team repository, enter the folder, check the state, and see the branch list.',
  },
  starterCommands: {
    tr: `git branch -a\ngit status\ncd qa-automation\ngit clone https://github.com/team/qa-automation.git`,
    en: `git branch -a\ngit status\ncd qa-automation\ngit clone https://github.com/team/qa-automation.git`,
  },
  expectedSteps: [
    { label: { tr: 'Repoyu bilgisayarına indir', en: 'Download the repository to your machine' }, pattern: '^git clone\\s+https?:\\/\\/\\S+$', example: 'git clone https://github.com/team/qa-automation.git' },
    { label: { tr: 'İndirilen klasöre gir', en: 'Enter the downloaded folder' }, pattern: '^cd\\s+\\S+$', example: 'cd qa-automation' },
    { label: { tr: 'Çalışma durumunu kontrol et', en: 'Check the working state' }, pattern: '^git status$', example: 'git status' },
    { label: { tr: 'Tüm branchleri gör (local + remote)', en: 'See all branches (local + remote)' }, pattern: '^git branch\\s+-a$', example: 'git branch -a' },
  ],
  successOutput: {
    tr: 'Repo indirildi, klasöre girildi, durum kontrol edildi ve branch listesi görüldü. Artık çalışmaya hazırsın.',
    en: 'Repo cloned, folder entered, state checked, branch list seen. You are ready to work.',
  },
  retryOutput: {
    tr: 'Sıra: önce clone ile indir, sonra klasöre gir, sonra durum kontrol et.',
    en: 'Order: first clone to download, then enter the folder, then check state.',
  },
}

const gitStashPractice = {
  type: 'git-practice',
  icon: '📦',
  title: { tr: 'Try It Yourself: Stash ile güvenli branch değiştirme', en: 'Try It Yourself: Safe branch switch with stash' },
  intro: {
    tr: 'Yarım kalan işi rafa koy, başka branch\'a geç, geri dön ve raftan al.',
    en: 'Shelve unfinished work, switch to another branch, come back, and restore from the shelf.',
  },
  starterCommands: {
    tr: `git stash pop\ngit switch main\ngit stash\ngit switch feature/login`,
    en: `git stash pop\ngit switch main\ngit stash\ngit switch feature/login`,
  },
  expectedSteps: [
    { label: { tr: 'Yarım işi geçici rafa koy', en: 'Shelve unfinished work temporarily' }, pattern: '^git stash$', example: 'git stash' },
    { label: { tr: 'Gitmek istediğin branch\'a geç', en: 'Switch to the branch you need' }, pattern: '^git switch\\s+main$', example: 'git switch main' },
    { label: { tr: 'İşini bitirince geri dön', en: 'Come back when done' }, pattern: '^git switch\\s+feature\\/login$', example: 'git switch feature/login' },
    { label: { tr: 'Raftan işini geri al', en: 'Restore your work from the shelf' }, pattern: '^git stash pop$', example: 'git stash pop' },
  ],
  successOutput: {
    tr: 'Stash akışı doğru: rafa koy → geç → geri dön → raftan al. Hiçbir değişiklik kaybolmadı.',
    en: 'Stash flow correct: shelve → switch → return → restore. No changes were lost.',
  },
  retryOutput: {
    tr: 'Sıra: önce stash ile rafa koy, sonra branch değiştir, sonra geri dön, en son stash pop ile geri al.',
    en: 'Order: first stash to shelve, then switch branch, then return, finally stash pop to restore.',
  },
}

const gitSafeUndoPractice = {
  type: 'git-practice',
  icon: '⏪',
  title: { tr: 'Try It Yourself: Güvenli geri alma akışı', en: 'Try It Yourself: Safe undo workflow' },
  intro: {
    tr: 'Hatalı commit\'i güvenli şekilde geri al: önce history\'ye bak, revert ile geri al, sonra doğrula.',
    en: 'Safely undo a bad commit: inspect history, revert it, then verify.',
  },
  starterCommands: {
    tr: `git status\ngit revert HEAD\ngit log --oneline -5`,
    en: `git status\ngit revert HEAD\ngit log --oneline -5`,
  },
  expectedSteps: [
    { label: { tr: 'Önce son commitleri gör', en: 'Inspect recent commits first' }, pattern: '^git log\\s+--oneline\\s+-5$', example: 'git log --oneline -5' },
    { label: { tr: 'Son commit\'i güvenli şekilde geri al', en: 'Safely undo the last commit' }, pattern: '^git revert\\s+HEAD$', example: 'git revert HEAD' },
    { label: { tr: 'Sonucu kontrol et', en: 'Verify the result' }, pattern: '^git status$', example: 'git status' },
  ],
  successOutput: {
    tr: 'Güvenli geri alma tamam: history kontrol → revert → doğrulama. History bozulmadı, yeni bir geri alma commit\'i oluştu.',
    en: 'Safe undo complete: history check → revert → verify. History preserved, a new undo commit was created.',
  },
  retryOutput: {
    tr: 'Sıra: önce log ile ne geri alacağını gör, sonra revert ile güvenli geri al, sonra kontrol et.',
    en: 'Order: first log to see what to undo, then revert safely, then verify.',
  },
}

const gitignoreCreatePractice = {
  type: 'git-practice',
  icon: '🚫',
  title: { tr: 'Try It Yourself: İlk .gitignore dosyanı oluştur', en: 'Try It Yourself: Create your first .gitignore' },
  intro: {
    tr: 'Bir Node + Java QA projesinde, henüz hiç commit edilmemiş üretilen klasörleri Git\'in hiç görmemesini sağla.',
    en: 'In a Node + Java QA project, make sure generated folders are never seen by Git in the first place.',
  },
  starterCommands: {
    tr: `# .gitignore dosyasını oluştur ve doldur\ntouch .gitignore\necho "node_modules/" >> .gitignore\necho "target/" >> .gitignore\necho ".env*" >> .gitignore\necho "!.env.example" >> .gitignore\ngit check-ignore -v .env\ngit add .gitignore\ngit commit -m "chore: add .gitignore"\ngit status`,
    en: `# Create and fill the .gitignore file\ntouch .gitignore\necho "node_modules/" >> .gitignore\necho "target/" >> .gitignore\necho ".env*" >> .gitignore\necho "!.env.example" >> .gitignore\ngit check-ignore -v .env\ngit add .gitignore\ngit commit -m "chore: add .gitignore"\ngit status`,
  },
  expectedSteps: [
    { label: { tr: 'Boş .gitignore dosyasını oluştur', en: 'Create an empty .gitignore file' }, pattern: '^touch\\s+\\.gitignore$', example: 'touch .gitignore' },
    { label: { tr: 'node_modules/ kuralını ekle', en: 'Add the node_modules/ rule' }, pattern: '^echo\\s+["\']node_modules/?["\']\\s*>>\\s*\\.gitignore$', example: 'echo "node_modules/" >> .gitignore' },
    { label: { tr: 'target/ kuralını ekle (Maven build çıktısı)', en: 'Add the target/ rule (Maven build output)' }, pattern: '^echo\\s+["\']target/?["\']\\s*>>\\s*\\.gitignore$', example: 'echo "target/" >> .gitignore' },
    { label: { tr: '.env* kuralını ekle (secret dosyalar)', en: 'Add the .env* rule (secret files)' }, pattern: '^echo\\s+["\']\\.env\\*["\']\\s*>>\\s*\\.gitignore$', example: 'echo ".env*" >> .gitignore' },
    { label: { tr: '.env.example dosyasını tekrar dahil et', en: 'Re-include the .env.example file' }, pattern: '^echo\\s+["\']!\\.env\\.example["\']\\s*>>\\s*\\.gitignore$', example: 'echo "!.env.example" >> .gitignore' },
    { label: { tr: 'Kural gerçekten çalışıyor mu kontrol et', en: 'Verify the rule actually matches' }, pattern: '^git check-ignore\\s+-v\\s+\\.env$', example: 'git check-ignore -v .env' },
    { label: { tr: '.gitignore dosyasının kendisini commit et', en: 'Commit the .gitignore file itself' }, pattern: '^git add\\s+\\.gitignore$', example: 'git add .gitignore' },
    { label: { tr: 'Anlamlı mesajla kaydet', en: 'Save with a meaningful message' }, pattern: '^git commit\\s+-m\\s+["\'].+["\']$', example: 'git commit -m "chore: add .gitignore"' },
    { label: { tr: 'node_modules/, target/ ve .env artık görünmüyor mu kontrol et', en: 'Verify node_modules/, target/ and .env no longer show up' }, pattern: '^git status$', example: 'git status' },
  ],
  successOutput: {
    tr: '.gitignore:3:.env*  .env\nOn branch feature/qa-setup\nnothing to commit, working tree clean\n(.env ignore edildi, .env.example ise takım için commit edilebilir örnek dosya olarak kalır.)',
    en: '.gitignore:3:.env*  .env\nOn branch feature/qa-setup\nnothing to commit, working tree clean\n(.env is ignored, while .env.example stays commit-ready as the team sample file.)',
  },
  retryOutput: {
    tr: 'Sıra: önce dosyayı oluştur, ignore kurallarını ekle, .env.example için exception koy, git check-ignore -v ile kanıtla, .gitignore\'ı commit et ve status ile doğrula.',
    en: 'Order: create the file first, add ignore rules, add the .env.example exception, prove it with git check-ignore -v, commit .gitignore itself, then verify with status.',
  },
}

const gitignoreVerifyPractice = {
  type: 'git-practice',
  icon: '🔎',
  title: { tr: 'Try It Yourself: Hangi kuralın çalıştığını kanıtla', en: 'Try It Yourself: Prove which rule is active' },
  intro: {
    tr: 'Bir dosyanın neden görünmediğini tahmin etme; Git’e hangi .gitignore satırının eşleştiğini gösterterek öğren.',
    en: 'Do not guess why a file is hidden; ask Git to show which .gitignore line matched it.',
  },
  starterCommands: {
    tr: `git check-ignore -v .env\ngit check-ignore -v node_modules/\ngit status --ignored --short\ngit status --short`,
    en: `git check-ignore -v .env\ngit check-ignore -v node_modules/\ngit status --ignored --short\ngit status --short`,
  },
  expectedSteps: [
    { label: { tr: '.env hangi satırdan ignore ediliyor gör', en: 'See which line ignores .env' }, pattern: '^git check-ignore\\s+-v\\s+\\.env$', example: 'git check-ignore -v .env' },
    { label: { tr: 'node_modules/ hangi satırdan ignore ediliyor gör', en: 'See which line ignores node_modules/' }, pattern: '^git check-ignore\\s+-v\\s+node_modules/?$', example: 'git check-ignore -v node_modules/' },
    { label: { tr: 'Ignored dosyaları ayrıca listele', en: 'List ignored files explicitly' }, pattern: '^git status\\s+--ignored\\s+--short$', example: 'git status --ignored --short' },
    { label: { tr: 'Normal status ile farkı gör', en: 'Compare with normal status' }, pattern: '^git status\\s+--short$', example: 'git status --short' },
  ],
  successOutput: {
    tr: '.gitignore:3:.env*  .env\n.gitignore:1:node_modules/  node_modules/\n!! .env\n!! node_modules/\nNormal `git status --short` içinde bu dosyalar görünmez.',
    en: '.gitignore:3:.env*  .env\n.gitignore:1:node_modules/  node_modules/\n!! .env\n!! node_modules/\nThese files do not appear in normal `git status --short` output.',
  },
  retryOutput: {
    tr: 'Önce `git check-ignore -v` ile hangi kuralın eşleştiğini kanıtla, sonra `git status --ignored --short` ile ignored dosyaları özellikle görünür yap.',
    en: 'First prove the matching rule with `git check-ignore -v`, then make ignored files visible with `git status --ignored --short`.',
  },
}

const gitignoreRescuePractice = {
  type: 'git-practice',
  icon: '🆘',
  title: { tr: 'Try It Yourself: Zaten takip edilen .env dosyasını kurtar', en: 'Try It Yourself: Rescue an already-tracked .env file' },
  intro: {
    tr: '.env dosyası yanlışlıkla ilk commit\'te gitmiş. .gitignore\'a eklemek tek başına yetmez — gerçek kurtarma akışını uygula.',
    en: 'The .env file was committed by mistake in an early commit. Adding it to .gitignore alone is not enough — apply the real rescue flow.',
  },
  starterCommands: {
    tr: `# .env hâlâ tracked, önce .gitignore'a ekle\necho ".env*" >> .gitignore\necho "!.env.example" >> .gitignore\ngit rm --cached .env\ngit check-ignore -v .env\ngit add .gitignore\ngit commit -m "fix: stop tracking .env secret file"\ngit status`,
    en: `# .env is still tracked, first add it to .gitignore\necho ".env*" >> .gitignore\necho "!.env.example" >> .gitignore\ngit rm --cached .env\ngit check-ignore -v .env\ngit add .gitignore\ngit commit -m "fix: stop tracking .env secret file"\ngit status`,
  },
  expectedSteps: [
    { label: { tr: '.env* kuralını .gitignore\'a ekle', en: 'Add the .env* rule to .gitignore' }, pattern: '^echo\\s+["\']\\.env\\*["\']\\s*>>\\s*\\.gitignore$', example: 'echo ".env*" >> .gitignore' },
    { label: { tr: '.env.example dosyasını güvenli örnek olarak bırak', en: 'Keep .env.example as the safe sample' }, pattern: '^echo\\s+["\']!\\.env\\.example["\']\\s*>>\\s*\\.gitignore$', example: 'echo "!.env.example" >> .gitignore' },
    { label: { tr: 'Dosyayı sadece Git takibinden çıkar (diskten silme!)', en: 'Stop tracking the file only (do not delete it from disk!)' }, pattern: '^git rm\\s+--cached\\s+\\.env$', example: 'git rm --cached .env' },
    { label: { tr: 'Yeni kuralın .env dosyasını yakaladığını doğrula', en: 'Verify the new rule catches .env' }, pattern: '^git check-ignore\\s+-v\\s+\\.env$', example: 'git check-ignore -v .env' },
    { label: { tr: 'Güncellenen .gitignore\'ı stage et', en: 'Stage the updated .gitignore' }, pattern: '^git add\\s+\\.gitignore$', example: 'git add .gitignore' },
    { label: { tr: 'Düzeltmeyi anlamlı mesajla kaydet', en: 'Save the fix with a meaningful message' }, pattern: '^git commit\\s+-m\\s+["\'].+["\']$', example: 'git commit -m "fix: stop tracking .env secret file"' },
    { label: { tr: '.env artık untracked mi doğrula', en: 'Verify .env is now untracked' }, pattern: '^git status$', example: 'git status' },
  ],
  successOutput: {
    tr: '.gitignore:1:.env*  .env\nOn branch main\nnothing to commit, working tree clean\n(.env diskte duruyor, artık Git izlemiyor. Eğer secret daha önce push edildiyse token/key mutlaka rotate edilmelidir.)',
    en: '.gitignore:1:.env*  .env\nOn branch main\nnothing to commit, working tree clean\n(.env still exists on disk, Git no longer tracks it. If the secret was already pushed, the token/key must be rotated.)',
  },
  retryOutput: {
    tr: 'Sıra: önce .gitignore\'a kuralı ekle, .env.example exception koy, git rm --cached ile takibi durdur, git check-ignore -v ile kanıtla, sonra commit et ve doğrula. `git rm --cached` dosyayı diskten silmez.',
    en: 'Order: add the rule to .gitignore, add the .env.example exception, stop tracking with git rm --cached, prove it with git check-ignore -v, then commit and verify. `git rm --cached` does not delete the file from disk.',
  },
  dangerousPatterns: [
    { pattern: '^git\\s+rm\\s+\\.env$', label: { tr: '`git rm .env` dosyayı diskten de siler. Burada amaç sadece Git takibini durdurmak; `git rm --cached .env` kullan.', en: '`git rm .env` also deletes the file from disk. The goal here is only to stop Git tracking; use `git rm --cached .env`.' } },
    { pattern: '^git\\s+add\\s+\\.env$', label: { tr: '`git add .env` secret dosyasını tekrar stage eder. Secret dosyalar commit edilmez.', en: '`git add .env` stages the secret file again. Secret files must not be committed.' } },
    { pattern: '(API_KEY|PASSWORD|TOKEN|SECRET)=', label: { tr: 'Gerçek secret değerini alıştırma alanına veya repoya yazma; örnek değer kullan.', en: 'Do not paste a real secret value into the practice area or repo; use a sample value.' } },
  ],
}

const githubActionsUiPractice = {
  type: 'git-practice',
  icon: '🚀',
  title: { tr: 'Try It Yourself: Actions arayüzünde güvenli run incele', en: 'Try It Yourself: Inspect a safe Actions run' },
  intro: {
    tr: 'GitHub Actions ekranında nereye tıklayacağını sıraya koy: workflow seç, run aç, log/artifact kontrol et, gerekirse güvenli tekrar çalıştır.',
    en: 'Order the GitHub Actions UI steps: choose a workflow, open a run, inspect logs/artifacts, and rerun safely if needed.',
  },
  starterCommands: {
    tr: `Actions tab\nAll workflows\nDeploy LearnQA.dev to GitHub Pages\nOpen latest run\nCheck failed job logs\nDownload artifact\nRe-run failed jobs`,
    en: `Actions tab\nAll workflows\nDeploy LearnQA.dev to GitHub Pages\nOpen latest run\nCheck failed job logs\nDownload artifact\nRe-run failed jobs`,
  },
  expectedSteps: [
    { label: { tr: 'Repository üst menüsünden Actions tabına gir', en: 'Open the Actions tab from the repository top nav' }, pattern: '^Actions tab$', example: 'Actions tab' },
    { label: { tr: 'Sol tarafta All workflows görünümünü seç', en: 'Select All workflows in the left sidebar' }, pattern: '^All workflows$', example: 'All workflows' },
    { label: { tr: 'İlgili workflow adını seç', en: 'Choose the relevant workflow name' }, pattern: '^Deploy LearnQA\\.dev to GitHub Pages$', example: 'Deploy LearnQA.dev to GitHub Pages' },
    { label: { tr: 'En güncel workflow run satırını aç', en: 'Open the latest workflow run row' }, pattern: '^Open latest run$', example: 'Open latest run' },
    { label: { tr: 'Önce failed job loglarını oku', en: 'Read failed job logs first' }, pattern: '^Check failed job logs$', example: 'Check failed job logs' },
    { label: { tr: 'Rapor/artifact indir', en: 'Download the report/artifact' }, pattern: '^Download artifact$', example: 'Download artifact' },
    { label: { tr: 'Gerekirse sadece failed jobları tekrar çalıştır', en: 'Rerun only failed jobs if needed' }, pattern: '^Re-run failed jobs$', example: 'Re-run failed jobs' },
  ],
  successOutput: {
    tr: 'Doğru arayüz akışı: workflow seçildi, run açıldı, log ve artifact incelendi. Re-run kararını artık kanıta göre veriyorsun.',
    en: 'Correct UI flow: workflow selected, run opened, logs and artifacts inspected. Rerun decisions are now evidence-based.',
  },
  retryOutput: {
    tr: 'Sıra eksik: önce Actions tabına gir, workflow/run seç, log ve artifact kanıtını oku, en son re-run kararı ver.',
    en: 'Order is incomplete: open Actions, choose workflow/run, inspect logs and artifacts, and decide on rerun last.',
  },
}

const githubPagesUiPractice = {
  type: 'git-practice',
  icon: '🌐',
  title: { tr: 'Try It Yourself: Pages ayarını güvenli sırayla yap', en: 'Try It Yourself: Configure Pages in a safe order' },
  intro: {
    tr: 'GitHub Pages ekranında yayın kaynağı, custom domain ve HTTPS ayarlarını doğru sırayla yapmayı dene.',
    en: 'Practice the correct order for source, custom domain and HTTPS on the GitHub Pages settings screen.',
  },
  starterCommands: {
    tr: `Settings tab\nPages menu\nSource: GitHub Actions\nCustom domain: learnqa.dev\nSave domain\nEnforce HTTPS\nVisit site`,
    en: `Settings tab\nPages menu\nSource: GitHub Actions\nCustom domain: learnqa.dev\nSave domain\nEnforce HTTPS\nVisit site`,
  },
  expectedSteps: [
    { label: { tr: 'Repository üst menüsünden Settings tabına gir', en: 'Open the Settings tab from the repository top nav' }, pattern: '^Settings tab$', example: 'Settings tab' },
    { label: { tr: 'Sol menüden Pages seç', en: 'Choose Pages in the left menu' }, pattern: '^Pages menu$', example: 'Pages menu' },
    { label: { tr: 'Source olarak GitHub Actions seç', en: 'Choose GitHub Actions as the source' }, pattern: '^Source:\\s*GitHub Actions$', example: 'Source: GitHub Actions' },
    { label: { tr: 'Custom domain alanını doldur', en: 'Fill the custom domain field' }, pattern: '^Custom domain:\\s*[a-z0-9.-]+\\.[a-z]{2,}$', example: 'Custom domain: learnqa.dev' },
    { label: { tr: 'Domain ayarını kaydet', en: 'Save the domain setting' }, pattern: '^Save domain$', example: 'Save domain' },
    { label: { tr: 'HTTPS zorlamasını aç', en: 'Enable Enforce HTTPS' }, pattern: '^Enforce HTTPS$', example: 'Enforce HTTPS' },
    { label: { tr: 'Canlı siteyi Visit site ile kontrol et', en: 'Verify the live site with Visit site' }, pattern: '^Visit site$', example: 'Visit site' },
  ],
  successOutput: {
    tr: 'Pages ayarı güvenli: kaynak GitHub Actions, domain kaydedildi, HTTPS açık ve canlı site kontrol edildi.',
    en: 'Pages setup is safe: source is GitHub Actions, domain saved, HTTPS enabled and live site verified.',
  },
  retryOutput: {
    tr: 'Sıra eksik: önce Settings → Pages, sonra source, domain, save, HTTPS ve en son Visit site kontrolü.',
    en: 'Order is incomplete: first Settings → Pages, then source, domain, save, HTTPS and finally Visit site.',
  },
}

const githubSettingsPractice = {
  type: 'git-practice',
  icon: '⚙️',
  title: { tr: 'Try It Yourself: Settings içinde doğru güvenlik sırası', en: 'Try It Yourself: Safe order inside Settings' },
  intro: {
    tr: 'Repo Settings içinde collaborator, visibility, branch protection ve secret ayarlarını hangi sırayla kontrol edeceğini dene.',
    en: 'Practice the order for checking collaborators, visibility, branch protection and secrets inside repo Settings.',
  },
  starterCommands: {
    tr: `Settings tab\nCollaborators: Add people\nGeneral: Change visibility\nBranches: Add branch protection rule\nSecrets and variables: Actions\nPages: Check deployment source`,
    en: `Settings tab\nCollaborators: Add people\nGeneral: Change visibility\nBranches: Add branch protection rule\nSecrets and variables: Actions\nPages: Check deployment source`,
  },
  expectedSteps: [
    { label: { tr: 'Settings tabına gir', en: 'Open the Settings tab' }, pattern: '^Settings tab$', example: 'Settings tab' },
    { label: { tr: 'Collaborators ile kişiyi davet et', en: 'Invite a teammate from Collaborators' }, pattern: '^Collaborators:\\s*Add people$', example: 'Collaborators: Add people' },
    { label: { tr: 'General içinde public/private görünürlüğü kontrol et', en: 'Check public/private visibility in General' }, pattern: '^General:\\s*Change visibility$', example: 'General: Change visibility' },
    { label: { tr: 'Branches altında main koruması ekle', en: 'Add main protection under Branches' }, pattern: '^Branches:\\s*Add branch protection rule$', example: 'Branches: Add branch protection rule' },
    { label: { tr: 'Actions secret alanını kontrol et', en: 'Check the Actions secrets area' }, pattern: '^Secrets and variables:\\s*Actions$', example: 'Secrets and variables: Actions' },
    { label: { tr: 'Pages yayın kaynağını kontrol et', en: 'Check the Pages deployment source' }, pattern: '^Pages:\\s*Check deployment source$', example: 'Pages: Check deployment source' },
  ],
  successOutput: {
    tr: 'Settings turu tamam: erişim, görünürlük, branch protection, secret ve Pages source güvenli sırayla kontrol edildi.',
    en: 'Settings tour complete: access, visibility, branch protection, secrets and Pages source were checked in a safe order.',
  },
  retryOutput: {
    tr: 'Sıra eksik: Settings → Collaborators → General visibility → Branches protection → Secrets → Pages source şeklinde ilerle.',
    en: 'Order is incomplete: use Settings → Collaborators → General visibility → Branches protection → Secrets → Pages source.',
  },
}

export const gitGithubData = {
  // CP6 sekme atomikleştirme (2026-07-06): 12 mega-sekme → 14 atomik sekme.
  // Sadece eski [4] "Branching, Merge, Rebase and Conflicts" 3'e bölündü
  // (Branch & Switch / Merge & Conflict / Rebase & Advanced Flow); diğer
  // 11 sekme aynı index'te kaldı. Eski localStorage ilerlemesi (index-anahtarlı)
  // bu haritayla yeni düzene çevrilir — TopicPage.jsx'teki migrateTabProgress
  // bunu okur (Docker CP3 emsali, TopicPage'e dokunulmadı).
  progressMigration: {
    version: 2,
    tabMap: {
      0: [0],        // Giriş → Giriş
      1: [1],        // Kurulum → Kurulum
      2: [2],        // Git Temelleri → Git Temelleri
      3: [3],        // .gitignore → .gitignore
      4: [4, 5, 6],  // Branching → Branch & Switch / Merge & Conflict / Rebase & Advanced
      5: [7],        // GitHub Workflow → GitHub Workflow
      6: [8],        // Pull Request → Pull Request
      7: [9],        // Actions → Actions
      8: [10],       // Pages → Pages
      9: [11],       // Real Work Risks → Real Work Risks
      10: [12],      // Error Dictionary → Error Dictionary
      11: [13],      // Interview Q&A → Interview Q&A
    },
  },
  en: {
    hero: {
      title: '🔀 Git & GitHub',
      subtitle: 'Version Control, Collaboration, CI/CD and Pages for QA Engineers',
      intro: 'Learn Git and GitHub visually: snapshots, branches, pull requests, Actions, Pages deployment, production safety rules and hands-on command practice.',
    },
    tabs: ['🎯 Introduction', '⚙️ Installation', '⌨️ Git Basics', '🚫 .gitignore', '🌿 Branch & Switch', '🔀 Merge & Conflict', '🧬 Rebase & Advanced', '🐙 GitHub Workflow', '🧾 Pull Request', '🚀 Actions', '🌐 Pages', '⚠️ Real Work Risks', '🚨 Error Dictionary', '💼 Interview Q&A'],
    sections: [
      {
        title: '🎯 What are Git and GitHub?',
        blocks: [
          {
            type: 'simple-box',
            emoji: '📸',
            content: 'Git is like a medical record system for your project: every meaningful change is written down with a timestamp, a doctor\'s signature, and a reason — not just the final diagnosis but the entire history of how the patient arrived there. But here is the real question: if you already save files on your hard drive, why do you need Git on top of that? Because Ctrl+Z only remembers one session, and your teammate\'s "save" on the same file silently erases yours. Java analogy: think of each Git commit as an immutable value object — once created it cannot change, and you can always compare two of them with a diff just like comparing two object snapshots in a unit test assertion. In real QA work, without Git you cannot answer "which test script version was running when this CI failure happened?" — with Git you just look up the commit SHA from the Actions run and reproduce the exact state in seconds.',
          },
          {
            type: 'css-animation',
            kind: 'git-flow',
            label: { tr: 'Git Yerel ↔ Uzak Repo Akışı', en: 'Git Local ↔ Remote Flow' },
          },
          {
            type: 'simulation',
            scenario: 'git-snapshot-story',
            icon: '📸',
            color: '#059669',
            title: { en: 'Step 1: Understand Git as Project Memory', tr: 'Adım 1: Git’i Proje Hafızası Olarak Anla' },
            description: { en: 'Before commands, watch the idea: files change, Git stores meaningful snapshots, and you can compare or recover later.', tr: 'Komutlardan önce fikri izle: dosyalar değişir, Git anlamlı snapshot’lar saklar, sonra karşılaştırabilir veya geri dönebilirsin.' },
          },
          {
            type: 'text',
            content: 'At the beginning, do not think “I must memorize commands.” Think “my project is changing and I need a safe memory.” Git gives that memory. Java analogy: when debugging, you care about object state at a moment; Git cares about project state at a moment.',
          },
          {
            type: 'simulation',
            scenario: 'github-collaboration-story',
            icon: '🌐',
            color: '#2563eb',
            title: { en: 'Step 2: Understand GitHub as the Team Workspace', tr: 'Adım 2: GitHub’ı Takım Çalışma Alanı Olarak Anla' },
            description: { en: 'Now watch what changes when the project memory is shared with a team: review, checks and safe merge.', tr: 'Şimdi proje hafızası takımla paylaşılınca ne değişiyor gör: review, checks ve güvenli merge.' },
          },
          {
            type: 'simulation',
            scenario: 'git-concept-order-map',
            icon: '🧭',
            color: '#0f766e',
            title: { en: 'Step 3: Learn the Order Before the Commands', tr: 'Adım 3: Komutlardan Önce Sıralamayı Anla' },
            description: { en: 'See the real learning order: first local Git memory, then snapshots, then GitHub sharing, then branches, merge and conflicts.', tr: 'Gerçek öğrenme sırasını gör: önce local Git hafızası, sonra snapshot, sonra GitHub paylaşımı, ardından branch, merge ve conflict.' },
          },
          {
            type: 'heading',
            text: 'The Git/GitHub order: why each step exists',
          },
          {
            type: 'table',
            headers: ['Order', 'Action', 'Purpose', 'If you skip or confuse it'],
            rows: [
              ['1', '`git init` in the project folder', 'Tell Git: “start tracking this folder as a repository.”', 'Git commands say “not a git repository”; no local history exists.'],
              ['2', '`git status`', 'Ask Git what changed before touching anything.', 'You may stage generated reports, `.env` files or unrelated changes by mistake.'],
              ['3', '`git add`', 'Choose which changed files will enter the next commit.', 'The commit has nothing to save, or it saves the wrong files.'],
              ['4', '`git commit`', 'Save a local snapshot with a meaningful message.', 'There is nothing solid to push, review, compare or roll back to.'],
              ['5', '`git remote add origin ...`', 'Connect the local repo to the GitHub repo URL.', 'Git does not know where `push` and `pull` should go.'],
              ['6', '`git push -u origin main`', 'Upload the first main/master commit and remember the upstream target.', 'GitHub stays empty, and future `git push` may ask where to send commits.'],
              ['7', '`git switch -c feature/...`', 'Work outside main so experiments and QA changes stay isolated.', 'Direct main changes bypass review and can break the shared branch.'],
              ['8', '`git push -u origin feature/...`', 'Create the remote feature branch so GitHub can show a Pull Request.', 'Your teammate cannot review your local-only branch.'],
              ['9', 'Pull Request + merge', 'Review, run checks, discuss and combine approved work into main.', 'Code reaches main without review, tests or team visibility.'],
              ['10', '`git fetch` then `git merge` or `git pull`', 'Bring GitHub changes back to local. `pull` means fetch + merge.', 'Your local branch becomes old; later conflicts get harder.'],
              ['11', 'Resolve conflict locally', 'When two histories changed the same area, choose the final correct file content and test it.', 'Conflict markers remain, build/tests fail, or wrong behavior reaches main.'],
            ],
          },
          {
            type: 'table',
            headers: ['Concept', 'Plain meaning', 'Important difference'],
            rows: [
              ['`clone`', 'Download an existing GitHub repository to your computer.', 'Use this when the repo already exists on GitHub; do not start with `git init` for that same repo.'],
              ['`push`', 'Send local commits to GitHub.', 'Push sends committed snapshots, not every unsaved file in your folder.'],
              ['`fetch`', 'Download remote history information without changing your files.', 'Safer for learning because you can inspect what changed before merging.'],
              ['`merge`', 'Apply another branch/history into your current branch.', 'Merge always happens into the branch you are currently on.'],
              ['`pull`', 'Run fetch + merge in one command.', 'Convenient, but beginners should understand the two steps separately first.'],
              ['`branch`', 'A separate line of work.', 'Local branch lives on your machine; remote branch appears on GitHub after push.'],
              ['`conflict`', 'Git cannot safely choose between two edits.', 'It is solved in local files, then tested, staged and completed.'],
            ],
          },
          gitConceptOrderPractice,
          {
            type: 'grid',
            cols: 2,
            items: [
              { icon: '🧠', label: 'Git', desc: 'Local version control. It stores snapshots, branches, diffs and history even when you are offline.' },
              { icon: '🐙', label: 'GitHub', desc: 'Collaboration platform. Pull Requests, Issues, Actions, security, Pages and team review live here.' },
              { icon: '☕', label: 'Java analogy', desc: 'A commit is like a saved object state. A branch is a separate object copy where you can experiment safely.' },
              { icon: '🧪', label: 'QA value', desc: 'Every test change becomes reviewable, reproducible and traceable to a bug, story or release.' },
            ],
          },
          gitVersionChaosFilm,
          {
            type: 'quiz',
            question: 'Which statement is the safest mental model?',
            options: [
              { id: 'a', text: 'GitHub and Git are the same tool' },
              { id: 'b', text: 'Git saves local snapshots; GitHub hosts and reviews shared work' },
              { id: 'c', text: 'A commit automatically deploys to production' },
              { id: 'd', text: 'Staging area is the same as remote repository' },
            ],
            correct: 'b',
            explanation: 'Git works locally and creates snapshots. GitHub hosts repositories and adds PRs, Actions, Pages and collaboration features.',
          
        retryQuestion: {
      "question": "Which of the following best describes the fundamental difference between Git and a platform like GitLab?",
      "options": [
            {
                  "id": "a",
                  "text": "Git is the platform and GitLab is the version control system"
            },
            {
                  "id": "b",
                  "text": "Git is a version control system for local tracking; GitLab is a remote service for collaboration and CI/CD"
            },
            {
                  "id": "c",
                  "text": "Git manages server infrastructure while GitLab manages local file snapshots"
            },
            {
                  "id": "d",
                  "text": "They are identical and can be used interchangeably without any setup"
            }
      ],
      "correct": "b",
      "explanation": "Git is a distributed version control system designed to manage code history locally. Services like GitLab (similar to GitHub) provide a centralized server interface to manage these repositories, handle user permissions, and run automated pipelines."
}
},
        ],
      },
      {
        title: '⚙️ Installation and First Configuration',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🧰',
            content: 'Installing Git is like registering as an official contractor before stepping onto a building site: the gate logs your badge number, your name, and which door you entered — every nail you hammer is traceable to you. The question to sit with before moving to commands is: why does Git need your name and email at all, given that you are the only one at your keyboard right now? Because six months later, when the CI pipeline breaks on a specific commit, "who changed this?" is the first question the team asks — and without proper author metadata, you are all anonymous. Java analogy: in Maven or Gradle you declare coordinates — groupId, artifactId, version — before the project can be published anywhere; `git config --global user.name` is the same declaration layer for your commits. In QA, wrong or missing identity in commits means audit logs are useless, CODEOWNERS triggers cannot auto-assign reviewers, and GDPR-relevant code change traceability breaks.',
          },
          {
            type: 'heading',
            text: 'Before Git commands: understand the terminal tools',
          },
          {
            type: 'simulation',
            scenario: 'git-terminal-shell-map',
            icon: '🖥️',
            color: '#38bdf8',
            title: { en: 'Terminal, Shell and Git: who does what?', tr: 'Terminal, Shell ve Git: kim ne yapar?' },
            description: { en: 'Watch one command travel from the visual terminal window to the shell engine, then to Git and back as readable output.', tr: 'Bir komutun görsel terminal penceresinden shell motoruna, oradan Git’e gidip okunabilir çıktı olarak geri dönmesini izle.' },
          },
          {
            type: 'grid',
            cols: 3,
            items: [
              { icon: '🪟', label: 'Terminal window', desc: 'Visible screen: Windows Terminal, Git Bash window, VS Code/IntelliJ Terminal or macOS Terminal.' },
              { icon: '⚙️', label: 'Shell', desc: 'Command engine: Git Bash, PowerShell, CMD, bash or zsh. This is why `ls`, `dir`, `rm` and `del` differ.' },
              { icon: '🔧', label: 'Git program', desc: 'Version control tool: `git status`, `git add`, `git commit`. It works after Git is installed and you are in the right folder.' },
            ],
          },
          {
            type: 'simulation',
            scenario: 'git-terminal-install-use',
            icon: '🧭',
            color: '#10b981',
            title: { en: 'Download, install, open, verify: the safe first run', tr: 'İndir, kur, aç, doğrula: güvenli ilk çalıştırma' },
            description: { en: 'Follow the beginner path for Windows Git Bash, macOS Terminal, Linux terminal and IDE terminals before touching a real project.', tr: 'Gerçek projeye dokunmadan önce Windows Git Bash, macOS Terminal, Linux terminal ve IDE terminal yolunu izle.' },
          },
          {
            type: 'grid',
            cols: 2,
            items: [
              { icon: '🟩', label: 'Git Bash', desc: 'Windows with Git for Windows. Best for learning `pwd`, `ls`, `touch`, `rm`; be careful with destructive `rm -rf`.' },
              { icon: '🔵', label: 'PowerShell', desc: 'Windows automation shell. Good for `winget`, path checks and Git after install; PowerShell command names differ.' },
              { icon: '⚫', label: 'CMD', desc: 'Classic Windows prompt. Fine for `git --version` or old scripts; Git Bash is usually easier for beginners.' },
              { icon: '⌘', label: 'macOS Terminal', desc: 'Built-in macOS terminal, usually zsh. Use Homebrew or Apple Command Line Tools, then verify with `git --version`.' },
              { icon: '🐧', label: 'Linux Terminal', desc: 'Ubuntu/Fedora/Arch terminal. Install with `apt`, `dnf` or `pacman`, then use the same Git workflow.' },
              { icon: '🧑‍💻', label: 'IDE Terminal', desc: 'VS Code, IntelliJ or WebStorm panel. Use it inside the project, but check selected shell and current folder first.' },
            ],
          },
          terminalToolsPractice,
          {
            type: 'simulation',
            scenario: 'git-install-os-setup',
            icon: '🧰',
            color: '#f97316',
            title: { en: 'Installation Map: Pick Your Operating System First', tr: 'Kurulum Haritası: Önce İşletim Sistemini Seç' },
            description: { en: 'Watch the installation path for Windows, macOS and Linux before copying any command.', tr: 'Herhangi bir komutu kopyalamadan önce Windows, macOS ve Linux kurulum yolunu gör.' },
          },
          {
            type: 'heading',
            text: 'Windows setup',
          },
          {
            type: 'installation',
            title: 'Install Git on Windows',
            steps: [
              { cmd: 'winget install --id Git.Git -e --source winget', explanation: 'Install Git for Windows with winget. If winget is not available, download Git for Windows from the official installer and keep the default beginner-friendly options.' },
              { cmd: 'git --version', explanation: 'Open a new PowerShell or Git Bash window and verify installation. Expected output: git version 2.x.x.' },
              { cmd: 'git config --global user.name "Your Name"', explanation: 'Set the commit author name. This is like writing your name on every saved project snapshot.' },
              { cmd: 'git config --global user.email "you@example.com"', explanation: 'Set the commit author email. Use the email connected to GitHub or your GitHub no-reply email.' },
              { cmd: 'git config --global init.defaultBranch main', explanation: 'Make new local repositories start with the branch name main.' },
              { cmd: 'git config --global --list', explanation: 'Confirm that name, email and default branch are visible before making commits.' },
            ],
          },
          {
            type: 'heading',
            text: 'macOS setup',
          },
          {
            type: 'installation',
            title: 'Install Git on macOS',
            steps: [
              { cmd: 'brew install git', explanation: 'Install Git with Homebrew. If Homebrew is not installed, install Homebrew first or use Apple Command Line Tools.' },
              { cmd: 'git --version', explanation: 'Open a new Terminal window and verify installation. Expected output: git version 2.x.x.' },
              { cmd: 'git config --global user.name "Your Name"', explanation: 'Set the commit author name for all repositories on this Mac.' },
              { cmd: 'git config --global user.email "you@example.com"', explanation: 'Set the commit author email. Keep it aligned with your GitHub account.' },
              { cmd: 'git config --global init.defaultBranch main', explanation: 'Use main as the default branch for new repositories.' },
              { cmd: 'git config --global --list', explanation: 'Verify the final configuration.' },
            ],
          },
          {
            type: 'heading',
            text: 'Linux setup',
          },
          {
            type: 'installation',
            title: 'Install Git on Linux',
            steps: [
              { cmd: 'sudo apt update && sudo apt install git', explanation: 'Debian/Ubuntu path. Fedora users can run `sudo dnf install git`; Arch users can run `sudo pacman -S git`.' },
              { cmd: 'git --version', explanation: 'Verify installation in a new terminal. Expected output: git version 2.x.x.' },
              { cmd: 'git config --global user.name "Your Name"', explanation: 'Set the author name for commits created on this Linux machine.' },
              { cmd: 'git config --global user.email "you@example.com"', explanation: 'Set the author email. Use the same identity your team expects on GitHub.' },
              { cmd: 'git config --global init.defaultBranch main', explanation: 'Keep new repositories aligned with modern main branch naming.' },
              { cmd: 'git config --global --list', explanation: 'Confirm the configuration before starting a real project.' },
            ],
          },
          {
            type: 'heading',
            text: 'After Git is installed: open a terminal inside the project folder',
          },
          {
            type: 'simulation',
            scenario: 'git-bash-open-folder',
            icon: '🗂️',
            color: '#22c55e',
            title: { en: 'Open CMD or Git Bash directly in the project folder', tr: 'CMD veya Git Bash’i doğrudan proje klasöründe aç' },
            description: { en: 'Watch the exact beginner moves: type `cmd` in the Windows Explorer address bar, or right-click the folder and choose Git Bash here.', tr: 'Yeni başlayan için net adımları izle: Windows Explorer adres çubuğuna `cmd` yaz veya klasörde sağ tıklayıp Git Bash here seç.' },
          },
          {
            type: 'grid',
            cols: 3,
            items: [
              { icon: '1️⃣', label: 'Explorer address bar', desc: 'Open your project folder, click the address bar, type `cmd`, press Enter. CMD opens already inside that folder.' },
              { icon: '2️⃣', label: 'Git Bash here', desc: 'Right-click inside the project folder and choose Git Bash Here. On Windows 11 it may be under Show more options.' },
              { icon: '3️⃣', label: 'IDE terminal', desc: 'Open VS Code or IntelliJ in the project, then use Terminal > New Terminal and choose Git Bash if needed.' },
            ],
          },
          {
            type: 'simulation',
            scenario: 'git-bash-command-runner',
            icon: '⌨️',
            color: '#0ea5e9',
            title: { en: 'Command result lab: type a command, read the output', tr: 'Komut sonucu lab: komutu yaz, çıktıyı oku' },
            description: { en: 'Run beginner terminal commands visually: folder navigation, file creation, reading a file, checking network info and confirming Git.', tr: 'Başlangıç terminal komutlarını görsel olarak çalıştır: klasör değiştirme, dosya oluşturma, dosya okuma, ağ bilgisini görme ve Git’i doğrulama.' },
          },
          {
            type: 'grid',
            cols: 2,
            items: [
              { icon: '📍', label: '`pwd`', desc: 'Prints the current folder path, for example `/c/Users/hasan/Desktop/qa-project`.' },
              { icon: '📋', label: '`ls` / `dir`', desc: 'Lists files and folders in the current location.' },
              { icon: '➡️', label: '`cd folder`', desc: 'Moves into a folder. `cd ..` moves one level back.' },
              { icon: '📁', label: '`mkdir demo`', desc: 'Creates a new folder named `demo`.' },
              { icon: '📄', label: '`touch notes.txt`', desc: 'Creates an empty file in Git Bash. In CMD you can use `type nul > notes.txt`.' },
              { icon: '✍️', label: '`echo "hi" > notes.txt`', desc: 'Writes text into a file. `cat notes.txt` reads it in Git Bash; `type notes.txt` reads it in CMD.' },
              { icon: '🌐', label: '`ipconfig`', desc: 'Shows Windows network information such as IPv4 address, gateway and adapters.' },
              { icon: '✅', label: '`git --version`', desc: 'Confirms Git is installed and reachable from this terminal.' },
            ],
          },
          gitBashDailyCommandsPractice,
          {
            type: 'heading',
            text: 'SSH or HTTPS?',
          },
          {
            type: 'table',
            headers: ['Choice', 'Best for', 'Watch out'],
            rows: [
              ['HTTPS', 'Simple setup, credential manager, corporate machines', 'Use token/credential manager, never paste tokens into scripts'],
              ['SSH', 'Frequent Git users, stable developer machines', 'Private key must be protected; new devices need key setup'],
              ['GitHub CLI', 'Fast login and PR workflow from terminal', 'Still requires clear permission boundaries'],
            ],
          },
          {
            type: 'grid',
            cols: 3,
            items: [
              { icon: '✅', label: '1. Git responds', desc: '`git --version` prints a real version number.' },
              { icon: '🪪', label: '2. Identity exists', desc: '`user.name` and `user.email` are configured.' },
              { icon: '🌿', label: '3. main is default', desc: 'New repositories start from `main`, not an old default.' },
            ],
          },
          gitIdentityConfigFilm,
          {
            type: 'simulation',
            scenario: 'github-account-repo-setup',
            icon: '🐙',
            color: '#6e40c9',
            title: { en: 'GitHub Account and First Repository', tr: 'GitHub Hesabı ve İlk Repository' },
            description: { en: 'Watch the steps: create a GitHub account, verify your email, create your first repository, and copy the URL.', tr: 'Adımları izle: GitHub hesabı aç, e-postanı doğrula, ilk repository oluştur ve URL kopyala.' },
          },
          {
            type: 'heading',
            text: 'HTTPS or SSH: choose your connection method',
          },
          {
            type: 'table',
            headers: ['Method', 'Setup', 'Push/Pull behavior', 'Best for'],
            rows: [
              ['HTTPS + Token', 'GitHub → Settings → Developer settings → Personal access tokens → Generate new token', 'Token required per push; credential manager stores it after first use', 'Beginners — easier first setup'],
              ['SSH Key', '`ssh-keygen -t ed25519` → copy public key → GitHub Settings → SSH Keys → New SSH key', 'No token needed; automatic authentication via key pair', 'Daily use — more convenient long-term'],
            ],
          },
          {
            type: 'code',
            label: 'HTTPS: create and use a Personal Access Token',
            language: 'bash',
            code: `# 1. GitHub.com → profile photo → Settings\n# 2. Developer settings → Personal access tokens → Tokens (classic)\n# 3. Generate new token → select \"repo\" scope → Generate\n# 4. Copy the token (you see it only once!)\n\n# When Git asks for password during push:\ngit push -u origin main\n# Username: your-github-username\n# Password: paste-your-token-here\n\n# Windows Credential Manager / macOS Keychain remembers it after first use`,
          },
          {
            type: 'code',
            label: 'SSH: generate a key and add it to GitHub',
            language: 'bash',
            code: `# 1. Generate an SSH key pair\nssh-keygen -t ed25519 -C "your-email@example.com"\n# Press Enter for default file location; set a passphrase if you wish\n\n# 2. Copy the PUBLIC key\n# Windows PowerShell:\nGet-Content ~\\.ssh\\id_ed25519.pub\n# macOS / Linux:\ncat ~/.ssh/id_ed25519.pub\n\n# 3. GitHub.com → Settings → SSH and GPG keys → New SSH key → paste\n\n# 4. Test the connection\nssh -T git@github.com\n# \"Hi username! You've successfully authenticated...\"`,
          },
          {
            type: 'step-animation',
            id: 'git-ssh-keygen-step-01',
            title: { tr: "ssh-keygen Bir Anahtar Çiftini Nasıl Oluşturur ve GitHub Onu Nasıl Tanır?", en: 'How Does ssh-keygen Create a Key Pair, and How Does GitHub Recognize It?' },
            steps: [
              { id: 1, icon: '1️⃣', label: { tr: 'ssh-keygen -t ed25519 çalıştırıldığında…', en: 'Running ssh-keygen -t ed25519…' }, detail: { tr: 'ssh-keygen -t ed25519 çalıştırıldığında İKİ dosya oluşturulur: id_ed25519 (ÖZEL anahtar, asla paylaşılmaz) ve id_ed25519.pub (herkese AÇIK anahtar).', en: 'Running ssh-keygen -t ed25519 CREATES TWO files: id_ed25519 (the PRIVATE key, never shared) and id_ed25519.pub (the PUBLIC key).' } },
              { id: 2, icon: '2️⃣', label: { tr: 'cat ~/.ssh/id_ed25519.pub ile yazdırılan metin…', en: 'The text printed by cat ~/.ssh/id_ed25519.pub…' }, detail: { tr: "cat ~/.ssh/id_ed25519.pub ile ekrana yazdırılan metin, matematiksel olarak ÖZEL anahtarla EŞLEŞEN ama ondan GERİ HESAPLANAMAYAN bir açık anahtardır.", en: 'The text printed by cat ~/.ssh/id_ed25519.pub is a public key that MATHEMATICALLY MATCHES the private key but CANNOT be reverse-computed from it.' } },
              { id: 3, icon: '3️⃣', label: { tr: "GitHub'a yapıştırılan bu AÇIK anahtar…", en: 'This PUBLIC key, once pasted into GitHub…' }, detail: { tr: "GitHub'a yapıştırılan bu AÇIK anahtar, GitHub tarafında hesabınla EŞLEŞTİRİLİR — artık GitHub \"bu genel anahtarla eşleşen özel anahtara sahip biri seninle konuşuyor\" diye DOĞRULAYABİLİR.", en: 'This PUBLIC key, once pasted into GitHub, gets LINKED to your account — GitHub can now VERIFY that "whoever is talking to me holds the private key matching this public key".' } },
              { id: 4, icon: '4️⃣', label: { tr: 'ssh -T git@github.com çalıştırıldığında…', en: 'Running ssh -T git@github.com…' }, detail: { tr: "ssh -T git@github.com çalıştırıldığında GERÇEK bir SSH el sıkışması olur: GitHub sana bir MEYDAN OKUMA gönderir, sadece özel anahtarın sahibi bunu doğru CEVAPLAYABİLİR.", en: 'Running ssh -T git@github.com triggers a REAL SSH handshake: GitHub sends you a CHALLENGE that only the holder of the private key can ANSWER correctly.' } },
              { id: 5, icon: '5️⃣', label: { tr: 'Bu doğrulandıktan sonra git push/pull…', en: 'Once verified, git push/pull…' }, detail: { tr: "Bu doğrulandıktan sonra git push/pull komutları ARTIK şifre SORMAZ — SSH anahtarı, her işlemde otomatik olarak KİMLİĞİNİ kanıtlar.", en: 'Once verified, git push/pull commands NEVER ask for a password again — the SSH key automatically PROVES your identity on every operation.' } },
            ],
          },
          gitSshKeygenPractice,
          {
            type: 'challenge',
            variant: 'order-sort',
            id: 'git-ssh-setup-order-01',
            question: { tr: 'SSH anahtarıyla GitHub kimlik doğrulamasını kurma sırasını diz.', en: 'Order the steps for setting up SSH authentication with GitHub.' },
            items: [
              { id: '1', text: { tr: 'ssh-keygen -t ed25519 ile anahtar çifti oluştur', en: 'Generate a key pair with ssh-keygen -t ed25519' }, order: 1 },
              { id: '2', text: { tr: "cat ~/.ssh/id_ed25519.pub ile public key'i kopyala", en: "Copy the public key with cat ~/.ssh/id_ed25519.pub" }, order: 2 },
              { id: '3', text: { tr: 'GitHub Settings → SSH and GPG keys → New SSH key → yapıştır', en: 'GitHub Settings → SSH and GPG keys → New SSH key → paste' }, order: 3 },
              { id: '4', text: { tr: 'ssh -T git@github.com ile bağlantıyı test et', en: 'Test the connection with ssh -T git@github.com' }, order: 4 },
              { id: '5', text: { tr: "git push -u origin main ile şifresiz push yap", en: 'Push without a password with git push -u origin main' }, order: 5 },
            ],
            xpReward: 10,
          },
          {
            type: 'warning',
            content: 'Pick one method and stick with it. HTTPS remotes look like `https://github.com/user/repo.git`, SSH remotes look like `git@github.com:user/repo.git`. If you switch later, update with `git remote set-url origin <new-url>`.',
          },
          {
            type: 'quiz',
            question: "Right after installing Git, you skip `git config --global user.name`/`user.email` and make your first commit anyway. What happens?",
            options: [
              { id: 'a', text: 'Git refuses to commit until you configure it' },
              { id: 'b', text: 'The commit succeeds but is attributed to a missing or wrong author identity' },
              { id: 'c', text: 'GitHub automatically fills in your account name' },
              { id: 'd', text: 'The commit is created without a timestamp' },
            ],
            correct: 'b',
            explanation: "Git does not block commits without a configured identity — depending on the OS/Git version it either falls back to a guessed system username/hostname or errors only when that fallback is also missing. Either way, the commit's author metadata is unreliable, which breaks `git log`/`git blame` history and confuses code review. Always set `user.name`/`user.email` before your first real commit.",
            retryQuestion: {
              question: 'You already made several commits with the wrong `user.email` before noticing. What is the safe way to fix the identity for FUTURE commits on a shared branch?',
              options: [
                { id: 'a', text: 'Rewrite all past commits with `git rebase` to fix the author on a branch others have already pulled' },
                { id: 'b', text: 'Run `git config user.email "correct@email.com"` and simply continue committing normally going forward' },
                { id: 'c', text: 'Delete the repository and clone it again' },
                { id: 'd', text: 'Nothing can be done once a commit is made' },
              ],
              correct: 'b',
              explanation: 'Fixing the config only affects commits made AFTER the change — past commits keep whatever identity they already have. Rewriting history on a shared branch (rebase/amend) to fix old author metadata is risky if anyone else has already pulled those commits, since it breaks their history too; that kind of rewrite should only be done on a private, not-yet-pushed branch.',
            },
          },
        ],
      },
      {
        title: '⌨️ Git Basics: status, add, commit, diff, log',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🧺',
            content: 'The staging area works exactly like a shopping cart that sits between the store shelves and the checkout counter: you can put things in the cart, take them out, swap them — and the receipt is only printed when you actually check out. The "why" worth pausing on: if Git is going to take a snapshot anyway, why not just snapshot everything that changed in one step? Because a QA engineer who fixed a flaky test and unrelated whitespace in the same session wants two separate, reviewable commits — one that says "fix: stabilize login test" and another that says "style: trim trailing whitespace". Java analogy: this maps directly to the Builder pattern — you call setter methods (git add) to configure the object, then call build() (git commit) when the state is exactly right; nobody can see the half-built object from outside. Without this two-step model, CI pipelines receive commits that bundle unrelated changes, making bisect and rollback precision impossible when a flaky test suddenly appears.',
          },
          {
            type: 'simulation',
            scenario: 'git-three-areas',
            icon: '🔀',
            color: '#059669',
            title: { en: 'Step 4: See Working Tree, Staging Area and Commit', tr: 'Adım 4: Working Tree, Staging Area ve Commit’i Gör' },
            description: { en: 'Now that Git makes sense, watch how one change moves through the three local Git areas before it is shared.', tr: 'Git’in fikri oturduktan sonra tek değişikliğin paylaşılmadan önce üç local Git alanından nasıl geçtiğini izle.' },
          },
          {
            type: 'simulation',
            scenario: 'git-interactive-terminal',
            icon: '💻',
            color: '#10b981',
            title: { en: 'Interactive Git Terminal', tr: 'Etkileşimli Git Terminali' },
            description: { en: 'Type git status, add, commit, branch, switch commands and see Staging and Commit Graph update live.', tr: 'git status, add, commit, branch, switch komutlarını yazarak Staging ve Commit şemasını canlı izle.' },
          },
          gitBasicsPractice,
          {
            type: 'simulation',
            scenario: 'git-remote-origin-setup',
            icon: '🔗',
            color: '#2563eb',
            title: { en: 'Step 5: Connect Local Repo to GitHub with origin', tr: 'Adım 5: Local Repo’yu origin ile GitHub’a Bağla' },
            description: { en: 'After at least one commit, attach the GitHub repository URL, list existing remotes, then push once with upstream.', tr: 'En az bir committen sonra GitHub repository URL’sini bağla, mevcut remote’ları listele, sonra upstream ile ilk push’u yap.' },
          },
          {
            type: 'table',
            headers: ['Command', 'What changes?', 'Expected result'],
            rows: [
              ['`git remote`', 'Shows remote names only', '`origin` appears if the repo is connected'],
              ['`git remote -v`', 'Shows fetch and push URLs', 'You see the GitHub URL twice: fetch and push'],
              ['`git remote --verbose`', 'Long form of `-v`', 'Same detailed output as `git remote -v`'],
              ['`git remote add origin [REMOTE_URL]`', 'Adds a GitHub target named origin', 'Git knows where to push, but code is not uploaded yet'],
              ['`git remote set-url origin [REMOTE_URL]`', 'Fixes a wrong origin URL', 'Future push/pull uses the corrected repo'],
              ['`git push -u origin main`', 'Uploads main and sets upstream', 'Later on the same branch, plain `git push` is enough'],
            ],
          },
          {
            type: 'warning',
            content: 'Use `git push -u origin main` for modern repositories. If an older repo really uses `master`, use `git push -u origin master`. If GitHub asks you to log in, Windows may store the session in Credential Manager and macOS in Keychain. Never paste a token or password into the remote URL or a shared script.',
          },
          gitRemoteOriginPractice,
          {
            type: 'file-tree',
            title: 'A clean QA automation repository',
            tree: `qa-automation/
├── tests/
│   ├── login.spec.js
│   └── checkout.spec.js
├── pages/
│   └── LoginPage.js
├── reports/              # ignored: generated output
├── .github/workflows/
│   └── tests.yml
├── .gitignore
├── package.json
└── README.md`,
            note: 'Commit source, configuration and docs. Ignore reports, videos, local env files and build output.',
          },
          {
            type: 'table',
            headers: ['Command', 'What it answers', 'QA habit'],
            rows: [
              ['git status', 'What changed?', 'Run before add, commit, pull and branch switch'],
              ['git diff', 'What exactly changed?', 'Review your own test logic before PR'],
              ['git add -p', 'Which hunks should be staged?', 'Split refactor and behavior changes'],
              ['git commit', 'What snapshot should be saved?', 'Keep commits small and focused'],
              ['git log --oneline --graph', 'How did history evolve?', 'Debug release and merge history'],
            ],
          },
          {
            type: 'code',
            label: 'Stage one test file and commit with a Conventional Commits message',
            language: 'bash',
            code: `# 1. Check what changed before staging anything\ngit status\n# modified:   tests/checkout.spec.js\n\n# 2. Stage ONLY the file you intend to commit (not "git add .")\ngit add tests/checkout.spec.js\n\n# 3. Confirm exactly what is staged\ngit diff --staged\n\n# 4. Commit with a Conventional Commits style message\ngit commit -m "fix(checkout): wait for payment iframe before asserting total"\n\n# 5. Verify the snapshot landed in history\ngit log --oneline -1\n# a1b2c3d fix(checkout): wait for payment iframe before asserting total`,
          },
          {
            type: 'code-playground',
              relatedTopicId: 'git-commit-practice-01',
            id: 'git-commit-practice-01',
            label: { tr: 'Micro Lab: git commit', en: 'Micro Lab: git commit' },
            language: 'bash',
            task: {
              tr: '`tests/checkout.spec.js` dosyasini stage et ve "fix(checkout): ..." formatinda bir Conventional Commits mesaji ile commitle. Java\'da bunu IDE\'nin "Commit" diyalogunda mesaj yazip "Stage + Commit" demeye benzet; Git\'te bu iki ayri adim (`git add` + `git commit -m`).',
              en: 'Stage `tests/checkout.spec.js` and commit it with a Conventional Commits style message starting with "fix(checkout): ...". Think of it like your IDE\'s commit dialog where you type a message and hit "Stage + Commit" in Java/IntelliJ — except in Git these are two explicit steps (`git add` then `git commit -m`).',
            },
            explanation: {
              tr: 'TODO satirini, gercek staging+commit komutuyla degistir. Bu sandbox gercek bir Git repo calistirmiyor; amac dogru komut+mesaj yapisini elinle yazmak.',
              en: 'Replace the TODO line with the real staging+commit command. This sandbox does not run a real Git repo; the goal is to type the correct command+message structure by hand.',
            },
            code: {
              tr: `git status\ngit add tests/checkout.spec.js\ngit diff --staged\n// EKSIK: tests/checkout.spec.js dosyasini "fix(checkout): ..." mesajiyla commitle\ngit log --oneline -1`,
              en: `git status\ngit add tests/checkout.spec.js\ngit diff --staged\n// MISSING: commit tests/checkout.spec.js with a "fix(checkout): ..." message\ngit log --oneline -1`,
            },
            starterCode: {
              tr: `git status\ngit add tests/checkout.spec.js\ngit diff --staged\n// TODO: tests/checkout.spec.js dosyasini "fix(checkout): ..." mesajiyla commitle\ngit log --oneline -1`,
              en: `git status\ngit add tests/checkout.spec.js\ngit diff --staged\n// TODO: commit tests/checkout.spec.js with a "fix(checkout): ..." message\ngit log --oneline -1`,
            },
            solutionCode: {
              tr: `git status\ngit add tests/checkout.spec.js\ngit diff --staged\ngit commit -m "fix(checkout): wait for payment iframe before asserting total"\ngit log --oneline -1`,
              en: `git status\ngit add tests/checkout.spec.js\ngit diff --staged\ngit commit -m "fix(checkout): wait for payment iframe before asserting total"\ngit log --oneline -1`,
            },
            expected: {
              tr: '`git log --oneline -1` ciktisi, dogru mesajli yeni commiti gosterir; staging area artik temizdir.',
              en: '`git log --oneline -1` shows the new commit with the correct message; the staging area is now clean.',
            },
            hints: [
              { tr: 'Komut sirasi: once `git add <dosya>`, sonra `git commit -m "..."`.', en: 'Order matters: `git add <file>` first, then `git commit -m "..."`.' },
              { tr: 'Conventional Commits formati: `tip(kapsam): kisa aciklama`, orn. `fix(checkout): ...`.', en: 'Conventional Commits format is `type(scope): short description`, e.g. `fix(checkout): ...`.' },
              { tr: '`git diff --staged` ile commitlemeden once neyin gittigini gor.', en: 'Use `git diff --staged` to see exactly what will be committed before you commit.' },
            ],
            xpReward: 10,
          },
          {
            type: 'step-animation',
            id: 'git-commit-step-01',
            title: { tr: 'Adim Adim: git commit', en: 'Step by Step: git commit' },
            steps: [
              { id: 1, icon: '📋', label: { tr: 'Durumu kontrol et', en: 'Check status' }, detail: { tr: '`git status` calistir: `modified: tests/checkout.spec.js` satirini gor, henuz hicbir sey staged degil.', en: 'Run `git status`: see `modified: tests/checkout.spec.js`, nothing staged yet.' } },
              { id: 2, icon: '➕', label: { tr: 'Stage et', en: 'Stage it' }, detail: { tr: '`git add tests/checkout.spec.js` ile sadece o dosyayi staging area\'ya koy, `git add .` kullanma.', en: 'Run `git add tests/checkout.spec.js` to stage only that file — avoid `git add .`.' } },
              { id: 3, icon: '🔍', label: { tr: 'Staged diff\'i incele', en: 'Inspect staged diff' }, detail: { tr: '`git diff --staged` ile tam olarak hangi satirlarin commit\'e gidecegini gor.', en: 'Run `git diff --staged` to see exactly which lines will go into the commit.' } },
              { id: 4, icon: '✍️', label: { tr: 'Snapshot al', en: 'Take the snapshot' }, detail: { tr: '`git commit -m "fix(checkout): wait for payment iframe before asserting total"` ile kalici bir snapshot olustur.', en: 'Run `git commit -m "fix(checkout): wait for payment iframe before asserting total"` to create a permanent snapshot.' } },
              { id: 5, icon: '🔗', label: { tr: 'Geçmişi doğrula', en: 'Verify history' }, detail: { tr: '`git log --oneline -1` ciktisinda `a1b2c3d fix(checkout): ...` gibi yeni bir hash ve mesaj gorursun.', en: '`git log --oneline -1` shows a new hash and message like `a1b2c3d fix(checkout): ...`.' } },
            ],
          },
          commitJourneyFilm,
          {
            type: 'challenge',
            variant: 'order-sort',
            id: 'git-commit-order-01',
            question: { tr: 'Staging\'den commit\'e giden gercek akisi sirala.', en: 'Order the real staging-to-commit flow.' },
            items: [
              { id: '1', text: { tr: '`git status` ile degisen dosyalari gor', en: 'Run `git status` to see changed files' }, order: 1 },
              { id: '2', text: { tr: '`git add tests/checkout.spec.js` ile dosyayi stage et', en: 'Run `git add tests/checkout.spec.js` to stage the file' }, order: 2 },
              { id: '3', text: { tr: '`git diff --staged` ile stage edileni dogrula', en: 'Run `git diff --staged` to verify what is staged' }, order: 3 },
              { id: '4', text: { tr: '`git commit -m "fix(checkout): ..."` ile snapshot al', en: 'Run `git commit -m "fix(checkout): ..."` to take the snapshot' }, order: 4 },
              { id: '5', text: { tr: '`git log --oneline -1` ile commit\'in olustugunu dogrula', en: 'Run `git log --oneline -1` to confirm the commit landed' }, order: 5 },
            ],
            xpReward: 10,
          },
          {
            type: 'warning',
            content: 'Do not use `git add .` blindly in QA projects. It can stage screenshots, videos, `.env`, generated reports or local notes. Prefer adding intentional files or inspect with `git diff --staged` before committing.',
          },
          {
            type: 'simulation',
            scenario: 'git-dot-folder',
            icon: '🔍',
            color: '#7c3aed',
            title: { en: 'X-Ray: what is inside .git/?', tr: 'X-Ray: .git/ içinde ne var?' },
            description: { en: 'When you run `git init`, a hidden `.git/` folder appears. See what each part does — this is where Git keeps all history.', tr: '`git init` çalıştırınca gizli `.git/` klasörü oluşur. Her parçanın ne yaptığını gör — Git tüm geçmişi burada saklar.' },
          },
          {
            type: 'heading',
            text: 'Two ways to start: init vs clone',
          },
          {
            type: 'simulation',
            scenario: 'git-clone-vs-init',
            icon: '🔀',
            color: '#0891b2',
            title: { en: 'Compare: start from scratch vs join a team', tr: 'Karşılaştır: sıfırdan başla vs takıma katıl' },
            description: { en: 'See the two paths side by side: `git init` for new projects, `git clone` for existing team repositories.', tr: 'İki yolu yan yana gör: yeni projeler için `git init`, var olan takım repoları için `git clone`.' },
          },
          gitClonePractice,
          {
            type: 'heading',
            text: 'Reading git diff output',
          },
          {
            type: 'simulation',
            scenario: 'git-diff-reader',
            icon: '📊',
            color: '#059669',
            title: { en: 'Understand diff: red lines removed, green lines added', tr: 'Diff anla: kırmızı satırlar silindi, yeşil satırlar eklendi' },
            description: { en: 'Watch a real diff appear line by line. Learn to read `-` (removed) and `+` (added) markers.', tr: 'Gerçek diff çıktısının satır satır oluşmasını izle. `-` (silinen) ve `+` (eklenen) işaretlerini okumayı öğren.' },
          },
          {
            type: 'table',
            headers: ['Command', 'Shows', 'When to use'],
            rows: [
              ['`git diff`', 'Unstaged changes (working tree vs staging)', 'See what you changed but did not stage yet'],
              ['`git diff --staged`', 'Staged changes (staging vs last commit)', 'Review exactly what will enter the next commit'],
              ['`git diff HEAD`', 'All changes (working tree vs last commit)', 'See everything that changed since last commit'],
            ],
          },
          {
            type: 'heading',
            text: 'Reading git log output',
          },
          {
            type: 'simulation',
            scenario: 'git-log-timeline',
            icon: '📜',
            color: '#b45309',
            title: { en: 'Commit Timeline: HEAD, branches and hashes', tr: 'Commit Zaman Çizelgesi: HEAD, branch ve hash' },
            description: { en: 'See how `git log --oneline --graph` output maps to a visual commit chain with HEAD and branch pointers.', tr: '`git log --oneline --graph` çıktısının HEAD ve branch pointer ile commit zincirine nasıl karşılık geldiğini gör.' },
          },
          {
            type: 'quiz',
            question: 'You have 10 modified files in your working directory, but you only run `git add` on 3 of them before committing. What ends up in the commit?',
            options: [
              { id: 'a', text: 'All 10 files, because Git always commits every change' },
              { id: 'b', text: 'Only the 3 staged files — the other 7 stay as uncommitted changes' },
              { id: 'c', text: 'Nothing, because you must stage all files at once' },
              { id: 'd', text: 'The 3 staged files plus a warning that blocks the commit' },
            ],
            correct: 'b',
            explanation: "The staging area (index) is exactly what its name says: a deliberate selection of what goes into the next commit. `git add` moves specific files into that selection; `git commit` only snapshots what is staged. The remaining 7 modified files keep existing in your working directory, untouched, ready to be staged in a later, separate commit.",
            retryQuestion: {
              question: 'You run `git add file1.js file2.js` then immediately `git add file3.js`, then `git commit`. Which files end up in this single commit?',
              options: [
                { id: 'a', text: 'Only file3.js, since the second `git add` overwrites the first' },
                { id: 'b', text: 'All three files — each `git add` call adds to the existing staging selection, it does not replace it' },
                { id: 'c', text: 'None — you must stage everything in one command' },
                { id: 'd', text: 'Only file1.js and file2.js' },
              ],
              correct: 'b',
              explanation: '`git add` is additive: every call adds more files to the existing staging selection rather than resetting it. So staging file1.js+file2.js and then file3.js separately still results in all three being staged together — the next `git commit` snapshots everything currently in the index, regardless of how many separate `git add` calls built up that selection.',
            },
          },
        ],
      },
      {
        title: '🚫 .gitignore: Keep the Right Files Out of Git',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🗄️',
            content: '.gitignore works like the "do not publish" stamp a legal team puts on internal draft documents before sending a contract packet to the client: the drafts still exist in the office filing cabinet, they just never leave the building. The critical "why" question here is: if a file is already in the repository, does adding it to .gitignore make it disappear from Git history? No — .gitignore only blocks untracked files from being accidentally staged; anything already committed stays in history forever until explicitly purged. Java analogy: Maven\'s default .gitignore excludes the `target/` directory the same reason no one commits compiled `.class` files — the build tool regenerates them deterministically, so shipping the source (pom.xml + src/) is sufficient, and committing target/ would bloat the repository by megabytes on every build. For QA automation this matters when someone accidentally commits a Playwright `test-results/` folder with video recordings — clone time triples overnight and sensitive test data about production URLs leaks into the public repository history.',
          },
          {
            type: 'heading',
            text: 'Purpose: why does .gitignore exist?',
          },
          {
            type: 'text',
            content: 'The .gitignore file tells Git which files and folders to never track: build output, downloaded dependencies, IDE settings, OS junk files, logs, and secrets. It is a shared, committed file, so the whole team ignores the same things automatically without remembering it by hand. Java analogy: a Maven project never commits the target folder with compiled class files and generated jars, only pom.xml and source files are version-controlled. The same idea applies to the node_modules folder in a JavaScript project — you commit the recipe, package.json, not the generated result.',
          },
          {
            type: 'heading',
            text: 'First decision: commit it or ignore it?',
          },
          {
            type: 'grid',
            cols: 3,
            items: [
              { icon: '✅', label: 'Commit', desc: 'Source code, tests, README, package.json, pom.xml, lockfiles, Dockerfile, CI workflow files, and safe sample configs such as .env.example.' },
              { icon: '🚫', label: 'Ignore', desc: 'Generated output, downloaded dependencies, local reports, screenshots/videos, logs, IDE cache, OS junk, and real secret files such as .env.' },
              { icon: '🔎', label: 'Prove it', desc: 'Use git status to see normal files, git status --ignored --short to see ignored files, and git check-ignore -v <file> to see the exact matching rule.' },
            ],
          },
          {
            type: 'simulation',
            scenario: 'gitignore-create-and-match',
            icon: '🚫',
            color: '#dc2626',
            title: { en: 'Create a .gitignore and watch it filter files', tr: '.gitignore oluştur ve dosyaları filtrelemesini izle' },
            description: { en: 'Watch how Git automatically skips matching files and folders from git status once a pattern exists.', tr: 'Bir desen eklendiğinde Git’in eşleşen dosya ve klasörleri git status’tan nasıl otomatik atladığını izle.' },
          },
          {
            type: 'heading',
            text: 'How to create it: Git Bash, IntelliJ and other IDEs',
          },
          {
            type: 'table',
            headers: ['Method', 'Steps', 'Notes'],
            rows: [
              ['Git Bash / macOS / Linux terminal', '`touch .gitignore` then `code .gitignore`, `nano .gitignore`, or `notepad .gitignore` on Windows Git Bash', 'Fastest path when you already use Git Bash or a Unix-like terminal'],
              ['Windows CMD', '`type nul > .gitignore` then `notepad .gitignore`', 'Useful when you opened CMD from the Explorer address bar'],
              ['PowerShell', '`New-Item .gitignore -ItemType File` then `notepad .gitignore`', 'Works in Windows Terminal, VS Code terminal and PowerShell'],
              ['IntelliJ IDEA', 'Right-click a file/folder → Git → Add to .gitignore, or New → File named `.gitignore` in the project root', 'IntelliJ can also offer to ignore build folders automatically when it detects them'],
              ['VS Code', 'New File in Explorer, name it `.gitignore`; the optional "gitignore" extension can generate templates by language', 'No built-in generator without an extension'],
              ['Template website', 'Visit github.com/github/gitignore or gitignore.io, pick your stack (Java, Maven, Node...), paste the result', 'Best starting point for a brand-new project'],
            ],
          },
          {
            type: 'text',
            content: 'Where it goes: almost always at the project root, right next to package.json or pom.xml. Git also supports a .gitignore file inside any subfolder — rules in a nested .gitignore only apply to that folder and below, and the closest .gitignore wins for a given file. For ignore rules that are personal and should never be shared with the team, use a global ignore file instead, configured once with git config --global core.excludesFile, or the repository-local file at .git/info/exclude, which is never committed.',
          },
          {
            type: 'heading',
            text: 'What is inside: pattern syntax',
          },
          {
            type: 'table',
            headers: ['Pattern', 'Meaning', 'Example'],
            rows: [
              ['`# comment`', 'Lines starting with # are ignored by Git, used for notes', '`# build output`'],
              ['`*.log`', 'Wildcard — ignores every file with this extension, anywhere', 'ignores app.log, error.log'],
              ['`node_modules/`', 'Trailing slash — matches a folder only, not a file with that name', 'ignores the whole dependency folder'],
              ['`/dist`', 'Leading slash — matches only at the project root, not in subfolders', 'ignores root dist/, not src/dist/'],
              ['`**/temp`', 'Double star — matches temp at any folder depth', 'ignores temp/, a/temp/, a/b/temp/'],
              ['`!important.log`', 'Negation — re-includes a file an earlier pattern excluded', 'keeps important.log even if *.log is ignored'],
              ['`.env*` + `!.env.example`', 'Ignore real environment files but keep the safe example file', '.env is ignored, .env.example can be committed'],
            ],
          },
          {
            type: 'code',
            label: 'A realistic .gitignore for a QA automation project',
            language: 'bash',
            code: `# Dependencies\nnode_modules/\n\n# Build output\ndist/\nbuild/\ntarget/\n\n# Test reports and artifacts\nplaywright-report/\ntest-results/\ncypress/screenshots/\ncypress/videos/\nallure-results/\nscreenshots/*.png\nreports/\n\n# Environment and secrets\n.env*\n!.env.example\n\n# IDE and local machine files\n.idea/\n.vscode/\n*.iml\n\n# OS files\n.DS_Store\nThumbs.db\n\n# Logs and temp files\n*.log\nnpm-debug.log*\n*.tmp\n*.swp`,
          },
          {
            type: 'step-animation',
            id: 'git-gitignore-patterns-step-01',
            title: { tr: "node_modules/ ve .env* Satırları Git'e Ne Anlatır?", en: 'What Do node_modules/ and .env* Actually Tell Git?' },
            steps: [
              { id: 1, icon: '1️⃣', label: { tr: 'node_modules/ satırı SONUNDAKİ /…', en: 'The trailing / in node_modules/…' }, detail: { tr: "node_modules/ satırı SONUNDAKİ / ile bunun bir KLASÖR olduğunu belirtir — Git bu isimde bir klasörle KARŞILAŞTIĞI HER YERDE (kaç seviye derinlikte olursa olsun) onu YOK SAYAR.", en: "The trailing / in node_modules/ MARKS it as a FOLDER — Git IGNORES it EVERYWHERE it finds a folder with this name, no matter how DEEP." } },
              { id: 2, icon: '2️⃣', label: { tr: '.env* satırındaki * joker karakteri…', en: 'The * wildcard in .env*…' }, detail: { tr: '.env* satırındaki * joker karakteri .env, .env.local, .env.production gibi TÜM varyasyonları TEK bir kuralla KAPSAR.', en: 'The * wildcard in .env* COVERS every variation like .env, .env.local, .env.production with ONE single rule.' } },
              { id: 3, icon: '3️⃣', label: { tr: '!.env.example satırındaki ! işareti…', en: 'The ! mark in !.env.example…' }, detail: { tr: '!.env.example satırındaki ! işareti bir İSTİSNA tanımlar — bir önceki .env* kuralı BU dosyayı yok saysa bile, ! onu TEKRAR takip edilebilir yapar.', en: 'The ! mark in !.env.example DEFINES an EXCEPTION — even though the earlier .env* rule ignores this file, ! makes it TRACKABLE AGAIN.' } },
              { id: 4, icon: '4️⃣', label: { tr: '*.log gibi bir desen…', en: 'A pattern like *.log…' }, detail: { tr: '*.log gibi bir desen, klasör derinliğine BAKMAKSIZIN o UZANTIYA sahip HER dosyayı eşler — src/logs/app.log da, kök dizindeki debug.log da AYNI kuralla yakalanır.', en: 'A pattern like *.log matches EVERY file with that EXTENSION regardless of folder depth — src/logs/app.log and root-level debug.log are BOTH caught by the SAME rule.' } },
              { id: 5, icon: '5️⃣', label: { tr: '.gitignore SADECE henüz TAKİP EDİLMEYEN…', en: '.gitignore only affects files NOT YET…' }, detail: { tr: ".gitignore SADECE henüz TAKİP EDİLMEYEN dosyalar için çalışır — bir dosya ZATEN commit edilmişse, .gitignore'a eklemek onu OTOMATİK olarak silmez, git rm --cached ile AYRICA çıkarman gerekir.", en: '.gitignore only WORKS for files NOT YET tracked — if a file is ALREADY committed, adding it to .gitignore does NOT AUTOMATICALLY remove it, you must ALSO run git rm --cached.' } },
            ],
          },
          gitGitignorePractice,
          {
            type: 'challenge',
            variant: 'order-sort',
            id: 'git-gitignore-setup-order-01',
            question: { tr: 'Yeni bir projede .gitignore kurma sırasını diz.', en: 'Order the steps for setting up .gitignore in a new project.' },
            items: [
              { id: '1', text: { tr: 'touch .gitignore ile dosyayı proje kökünde oluştur', en: 'Create the file at the project root with touch .gitignore' }, order: 1 },
              { id: '2', text: { tr: 'node_modules/, dist/, .env* gibi kalıpları ekle', en: 'Add patterns like node_modules/, dist/, .env*' }, order: 2 },
              { id: '3', text: { tr: "git status ile artık İZLENMEYEN dosyaları doğrula", en: 'Verify the now-UNTRACKED files with git status' }, order: 3 },
              { id: '4', text: { tr: 'git add .gitignore && git commit ile kaydet', en: 'Save it with git add .gitignore && git commit' }, order: 4 },
              { id: '5', text: { tr: 'ZATEN takip edilen bir dosya varsa git rm --cached ile ayrıca çıkar', en: 'If a file was ALREADY tracked, also remove it with git rm --cached' }, order: 5 },
            ],
            xpReward: 10,
          },
          {
            type: 'warning',
            content: 'Real-world trap: if a file was already committed before it was added to .gitignore, Git keeps tracking it — the rule only affects files that are not tracked yet. You must run `git rm --cached <file>` to stop tracking it (the file stays on disk), then commit. If a real token/password was already pushed, .gitignore does not erase it from history: revoke or rotate the secret immediately, then decide with the team whether history cleanup is needed.',
          },
          {
            type: 'simulation',
            scenario: 'gitignore-already-tracked-fix',
            icon: '🆘',
            color: '#b45309',
            title: { en: 'The most common .gitignore mistake — and the real fix', tr: 'En yaygın .gitignore hatası — ve gerçek düzeltme' },
            description: { en: 'See why adding an already-committed file to .gitignore is not enough, and what git rm --cached actually does.', tr: 'Zaten commit edilmiş bir dosyayı .gitignore’a eklemenin neden yetmediğini ve git rm --cached’in gerçekte ne yaptığını gör.' },
          },
          gitignoreCreatePractice,
          gitignoreVerifyPractice,
          gitignoreRescuePractice,
          gitignoreFilterFilm,
          {
            type: 'grid',
            cols: 2,
            items: [
              { icon: '🚫', label: '.gitignore', desc: 'A shared text file of patterns that tells Git which untracked files and folders to never stage automatically.' },
              { icon: '🗂️', label: 'Location', desc: 'Project root for team-wide rules; nested folders for scoped rules; a global file for personal-only rules.' },
              { icon: '☕', label: 'Java analogy', desc: 'Just like Maven never versions the target folder, .gitignore keeps generated and machine-specific files out of history.' },
              { icon: '🧪', label: 'QA value', desc: 'Keeps test reports, screenshots, videos and secrets out of the shared repo, so diffs stay readable and credentials stay safe.' },
            ],
          },
          {
            type: 'quiz',
            question: 'A teammate just added node_modules/ to .gitignore, but it was already committed weeks ago and still shows up in every diff. What is the correct fix?',
            options: [
              { id: 'a', text: 'Nothing — .gitignore removes it automatically on the next commit' },
              { id: 'b', text: 'Delete the node_modules folder from disk so Git forgets about it' },
              { id: 'c', text: 'Run git rm --cached -r node_modules, then commit the change' },
              { id: 'd', text: 'Rename .gitignore to .gitignore.txt and back' },
            ],
            correct: 'c',
            explanation: '.gitignore only affects files Git is not already tracking. To stop tracking something committed before, use git rm --cached (add -r for folders) and commit — this removes it from future tracking without deleting it from disk.',
          
        retryQuestion: {
      "question": "You have accidentally tracked a 'config.env' file that contains secrets. You added it to '.gitignore', but it still appears as modified in your Git status. How do you stop Git from tracking this file without deleting it from your local system?",
      "options": [
            {
                  "id": "a",
                  "text": "Run 'git clean -f' to clear the ignored files"
            },
            {
                  "id": "b",
                  "text": "Simply delete the file and recreate it, Git will ignore it then"
            },
            {
                  "id": "c",
                  "text": "Run 'git rm --cached config.env' and then commit"
            },
            {
                  "id": "d",
                  "text": "Use 'git reset --hard' to revert the file to the state of the initial commit"
            }
      ],
      "correct": "c",
      "explanation": "Files that were already committed to the repository are still tracked by Git even if you add them to .gitignore later. You must use 'git rm --cached <file>' to remove it from the Git index (staging area) while keeping the actual file on your local machine."
}
},
        ],
      },
      {
        title: '🌿 Branch & Switch: Create, Rename and Shelve Work',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🌱',
            content: 'A Git branch is like a parallel universe copy of your codebase that costs nothing to create — you are not duplicating files, you are only moving a pointer one step sideways, the same way a train switches track without physically duplicating the train. The thought-provoking question before you write a single branch command: if your work takes three hours, why not just commit directly to main and be done? Because in a QA team, main is the branch CI deploys from — one broken test file pushed directly to main fails every colleague\'s build and blocks the release pipeline until it is reverted. Java analogy: think of each branch as a separate thread with its own stack frame — threads in Java share heap memory until you explicitly synchronize, but each branch in Git keeps its own isolated snapshot and only merges when you decide to call join(). The real automation cost of skipping branches shows up during incidents: without a clean branch per fix, cherry-picking a specific bug fix to a hotfix release means manually hunting which commits to include instead of just merging one targeted branch.',
          },
          {
            type: 'css-animation',
            kind: 'git-branch',
            label: { tr: 'Git Branch & Merge Akışı', en: 'Git Branch & Merge Flow' },
          },
          {
            type: 'simulation',
            title: { en: '1) Branch creation: main stays safe', tr: '1) Branch açma: main güvende kalır' },
            icon: '🌿',
            color: '#16a34a',
            scenario: 'git-branch-lab',
            description: { en: 'See what each branch command changes: list local branches, create `hasan`, switch to it, rename it, then push with upstream.', tr: 'Her branch komutunun ne değiştirdiğini gör: local branch listele, `hasan` oluştur, ona geç, adını değiştir, sonra upstream ile push et.' },
          },
          {
            type: 'table',
            headers: ['Command', 'When to use it', 'What happens'],
            rows: [
              ['`git branch`', 'Ask which local branches exist', 'Lists local branches; `*` marks the active branch'],
              ['`git branch hasan`', 'Create a local branch without moving to it', 'New branch exists, but you are still on the old branch'],
              ['`git checkout -b hasan`', 'Old style: create and switch at the same time', 'Creates `hasan` and moves you onto it'],
              ['`git switch -c hasan`', 'Modern style: create and switch at the same time', 'Same intent as `checkout -b`, clearer wording'],
              ['`git switch hasan`', 'Move to an existing branch', 'Working tree changes to the selected branch'],
              ['`git checkout hasan`', 'Older branch switch command', 'Same switch result, but checkout also has other meanings'],
              ['`git branch -m main`', 'Rename the current local branch', 'Current branch name becomes `main`'],
              ['`git branch -m old_name new_name`', 'Rename a specific local branch', '`old_name` becomes `new_name` locally'],
            ],
          },
          {
            type: 'code',
            label: 'List and create a branch without switching',
            language: 'bash',
            code: `# 1. List all local branches, * marks the current one\ngit branch\n#   main\n# * develop\n\n# 2. Create a branch without switching to it\ngit branch bugfix/login-timeout`,
          },
          {
            type: 'callout',
            icon: '🧪',
            content: { tr: 'Şimdi Git Temelleri sekmesindeki gerçek terminalde dene: yeni bir branch oluşturup üzerine geç (`git branch`, `git switch`/`git checkout`) — sandbox\'taki "Yeni bir branch oluşturup üzerine geç" görevi tam bunu istiyor.', en: 'Try it now in the real terminal on the Git Basics tab: create a new branch and switch onto it (`git branch`, `git switch`/`git checkout`) — the sandbox\'s "Create a new branch and switch onto it" mission asks for exactly this.' },
          },
          {
            type: 'code',
            label: 'Create and switch in one step, then rename and confirm',
            language: 'bash',
            code: `# 3. Create AND switch in one step (modern syntax)\ngit switch -c bugfix/login-timeout\n\n# 4. Rename the current branch\ngit branch -m bugfix/login-timeout-fix\n\n# 5. Confirm the rename\ngit branch\n# main\n#   develop\n# * bugfix/login-timeout-fix`,
          },
          {
            type: 'code-playground',
              relatedTopicId: 'git-branch-practice-01',
            id: 'git-branch-practice-01',
            label: { tr: 'Micro Lab: git branch', en: 'Micro Lab: git branch' },
            language: 'bash',
            task: {
              tr: '`bugfix/login-timeout` adinda bir branch olustur ve ayni anda ona gec (`git switch -c`), sonra `git branch -m` ile `bugfix/login-timeout-fix` olarak yeniden adlandir. Java\'da bunu bir feature branch acmak icin IDE\'nin "New Branch" diyaloguna benzet — burada komut iki ayri eylemi (`create` + `switch`) tek satirda birlestirir.',
              en: 'Create a branch named `bugfix/login-timeout` and switch to it at the same time (`git switch -c`), then rename it to `bugfix/login-timeout-fix` with `git branch -m`. Think of this like your IDE\'s "New Branch" dialog when starting a feature branch in Java — except here one command combines two actions (`create` + `switch`).',
            },
            explanation: {
              tr: 'TODO satirini gercek `git switch -c` komutuyla degistir. Sandbox gercek bir repo calistirmiyor; amac dogru komut yapisini elinle kurmak.',
              en: 'Replace the TODO line with the real `git switch -c` command. The sandbox does not run a real repo; the goal is to build the correct command structure by hand.',
            },
            code: {
              tr: `git branch\n// EKSIK: bugfix/login-timeout branch'ini olustur ve ona gec\ngit branch -m bugfix/login-timeout-fix\ngit branch`,
              en: `git branch\n// MISSING: create bugfix/login-timeout and switch to it\ngit branch -m bugfix/login-timeout-fix\ngit branch`,
            },
            starterCode: {
              tr: `git branch\n// TODO: bugfix/login-timeout branch'ini olustur ve ona gec\ngit branch -m bugfix/login-timeout-fix\ngit branch`,
              en: `git branch\n// TODO: create bugfix/login-timeout and switch to it\ngit branch -m bugfix/login-timeout-fix\ngit branch`,
            },
            solutionCode: {
              tr: `git branch\ngit switch -c bugfix/login-timeout\ngit branch -m bugfix/login-timeout-fix\ngit branch`,
              en: `git branch\ngit switch -c bugfix/login-timeout\ngit branch -m bugfix/login-timeout-fix\ngit branch`,
            },
            expected: {
              tr: 'Son `git branch` ciktisinda aktif (`*`) branch `bugfix/login-timeout-fix` olarak gorunur.',
              en: 'The final `git branch` output shows the active (`*`) branch as `bugfix/login-timeout-fix`.',
            },
            hints: [
              { tr: '`git switch -c <isim>` hem olusturur hem o branch\'e gecer.', en: '`git switch -c <name>` both creates and switches to that branch in one step.' },
              { tr: '`git branch -m <yeni-isim>` SADECE aktif branch\'i yeniden adlandirir.', en: '`git branch -m <new-name>` renames ONLY the currently active branch.' },
              { tr: 'Yildizli (`*`) satir, su an uzerinde oldugun branch\'i gosterir.', en: 'The starred (`*`) line shows which branch you are currently on.' },
            ],
            xpReward: 10,
          },
          {
            type: 'step-animation',
            id: 'git-branch-step-01',
            title: { tr: 'Adim Adim: git branch', en: 'Step by Step: git branch' },
            steps: [
              { id: 1, icon: '📂', label: { tr: 'Mevcut branch\'leri listele', en: 'List existing branches' }, detail: { tr: '`git branch` calistir: `* develop` satiri aktif branch\'i gosterir.', en: 'Run `git branch`: the `* develop` line shows the currently active branch.' } },
              { id: 2, icon: '🌱', label: { tr: 'Olustur ve gec', en: 'Create and switch' }, detail: { tr: '`git switch -c bugfix/login-timeout` ile yeni branch\'i olustur ve aninda uzerine gec.', en: 'Run `git switch -c bugfix/login-timeout` to create the new branch and move onto it instantly.' } },
              { id: 3, icon: '✏️', label: { tr: 'Yeniden adlandir', en: 'Rename it' }, detail: { tr: '`git branch -m bugfix/login-timeout-fix` SADECE aktif branch\'in adini degistirir.', en: 'Run `git branch -m bugfix/login-timeout-fix` to rename ONLY the active branch.' } },
              { id: 4, icon: '🔎', label: { tr: 'Sonucu dogrula', en: 'Verify the result' }, detail: { tr: '`git branch` tekrar calistir: artik `* bugfix/login-timeout-fix` gorursun.', en: 'Run `git branch` again: now you see `* bugfix/login-timeout-fix`.' } },
              { id: 5, icon: '🚀', label: { tr: 'Calismaya basla', en: 'Start working' }, detail: { tr: 'Bu branch artik izole; main\'e dokunmadan commit\'ler burada birikir.', en: 'This branch is now isolated; commits accumulate here without touching main.' } },
            ],
          },
          {
            type: 'challenge',
            variant: 'order-sort',
            id: 'git-branch-order-01',
            question: { tr: 'Branch olusturma, gecis ve yeniden adlandirma akisini sirala.', en: 'Order the branch create, switch and rename flow.' },
            items: [
              { id: '1', text: { tr: '`git branch` ile mevcut branch\'leri listele', en: 'Run `git branch` to list existing branches' }, order: 1 },
              { id: '2', text: { tr: '`git switch -c bugfix/login-timeout` ile olustur ve gec', en: 'Run `git switch -c bugfix/login-timeout` to create and switch' }, order: 2 },
              { id: '3', text: { tr: '`git branch -m bugfix/login-timeout-fix` ile yeniden adlandir', en: 'Run `git branch -m bugfix/login-timeout-fix` to rename it' }, order: 3 },
              { id: '4', text: { tr: '`git branch` ile sonucu dogrula', en: 'Run `git branch` to verify the result' }, order: 4 },
              { id: '5', text: { tr: 'Yeni isimli branch uzerinde calismaya basla', en: 'Start working on the newly named branch' }, order: 5 },
            ],
            xpReward: 10,
          },
          {
            type: 'warning',
            content: 'If you have uncommitted changes, Git may block branch switching when those changes would be overwritten. First run `git status`; then commit the work, stash it, or intentionally discard it. Do not jump branches blindly.',
          },
          {
            type: 'heading',
            text: 'git stash: shelve work without committing',
          },
          {
            type: 'simulation',
            scenario: 'git-stash-flow',
            icon: '📦',
            color: '#7c3aed',
            title: { en: 'Stash: temporary shelf for unfinished work', tr: 'Stash: yarım kalan iş için geçici raf' },
            description: { en: 'Watch work move to a temporary shelf, let you switch branches safely, then restore when you return.', tr: 'İşin geçici rafa taşınmasını izle, güvenle branch değiştir, geri dönünce işini geri al.' },
          },
          {
            type: 'table',
            headers: ['Command', 'What it does', 'When to use'],
            rows: [
              ['`git stash`', 'Saves uncommitted changes to a temporary shelf and cleans the working tree', 'You need to switch branches but are not ready to commit'],
              ['`git stash pop`', 'Restores the most recent stash and removes it from the shelf', 'You returned to your branch and want your work back'],
              ['`git stash list`', 'Shows all stashed entries', 'Check whether you have forgotten stashes'],
              ['`git stash drop`', 'Deletes a specific stash entry', 'Clean up a stash you no longer need'],
            ],
          },
          {
            type: 'code',
            label: 'See the unfinished work, then shelve it',
            language: 'bash',
            code: `# 1. You are mid-edit on tests/login.spec.js but a hotfix is urgent
git status
# modified:   tests/login.spec.js

# 2. Shelve the unfinished work
git stash
# Saved working directory and index state WIP on feature/hasan: a1b2c3d test: login flow`,
          },
          {
            type: 'callout',
            icon: '🧪',
            content: { tr: 'Şimdi Git Temelleri sekmesindeki gerçek terminalde dene: işi rafa kaldır ve geri getir (`git stash`, `git stash pop`) — sandbox\'taki "İşi rafa kaldır ve geri getir" görevi bu adımların birebir aynısı.', en: 'Try it now in the real terminal on the Git Basics tab: shelve work and bring it back (`git stash`, `git stash pop`) — the sandbox\'s "Shelve work and bring it back" mission is exactly this sequence.' },
          },
          {
            type: 'code',
            label: 'Switch safely, then restore the shelved work',
            language: 'bash',
            code: `# 3. Switch safely with a clean working tree
git switch main
# ...fix the hotfix, commit, push...

# 4. Return to your branch and restore the shelved work
git switch feature/hasan
git stash pop
# Dropped refs/stash@{0} (e4f5...)  -> tests/login.spec.js is back, modified`,
          },
          {
            type: 'code-playground',
              relatedTopicId: 'git-stash-practice-01',
            id: 'git-stash-practice-01',
            label: { tr: 'Micro Lab: git stash', en: 'Micro Lab: git stash' },
            language: 'bash',
            task: {
              tr: '`tests/login.spec.js` uzerinde commit edilmemis bir degisikligin var. `git stash` ile rafa kaldir, `git switch main` ile gec, sonra `git switch feature/hasan` ile geri don ve `git stash pop` ile isini geri al. Java\'da bunu IDE\'nin "Shelve Changes" ozelligine benzet — IntelliJ\'de degisiklikleri gecici olarak rafa kaldirip sonra "Unshelve" ile geri getirirsin.',
              en: 'You have uncommitted changes in `tests/login.spec.js`. Shelve them with `git stash`, switch with `git switch main`, then return with `git switch feature/hasan` and bring the work back with `git stash pop`. Think of it like IntelliJ\'s "Shelve Changes" feature in Java — you temporarily shelve changes, then "Unshelve" them later.',
            },
            explanation: {
              tr: 'TODO satirini gercek `git stash` komutuyla degistir. Sandbox gercek bir repo calistirmiyor; amac dogru komut yapisini elinle kurmak.',
              en: 'Replace the TODO line with the real `git stash` command. The sandbox does not run a real repo; the goal is to build the correct command structure by hand.',
            },
            code: {
              tr: `git status\n// EKSIK: degisiklikleri gecici rafa kaldir\ngit switch main\ngit switch feature/hasan\ngit stash pop`,
              en: `git status\n// MISSING: shelve the changes temporarily\ngit switch main\ngit switch feature/hasan\ngit stash pop`,
            },
            starterCode: {
              tr: `git status\n// TODO: degisiklikleri gecici rafa kaldir\ngit switch main\ngit switch feature/hasan\ngit stash pop`,
              en: `git status\n// TODO: shelve the changes temporarily\ngit switch main\ngit switch feature/hasan\ngit stash pop`,
            },
            solutionCode: {
              tr: `git status\ngit stash\ngit switch main\ngit switch feature/hasan\ngit stash pop`,
              en: `git status\ngit stash\ngit switch main\ngit switch feature/hasan\ngit stash pop`,
            },
            expected: {
              tr: '`git stash pop` calistiktan sonra `tests/login.spec.js` tekrar "modified" olarak gorunur ve stash listesi bosalir.',
              en: 'After `git stash pop` runs, `tests/login.spec.js` shows as "modified" again and the stash list is empty.',
            },
            hints: [
              { tr: 'Once `git stash` calistirmadan branch degistirmeye calismak Git\'i engelleyebilir.', en: 'Trying to switch branches before running `git stash` can get blocked by Git.' },
              { tr: '`git stash pop` hem geri yukler hem stash listesinden siler; `apply` sadece geri yukler.', en: '`git stash pop` both restores and removes from the stash list; `apply` only restores.' },
              { tr: 'Birden fazla stash varsa `git stash list` ile hangisinin uste oldugunu kontrol et.', en: 'If you have multiple stashes, check which one is on top with `git stash list`.' },
            ],
            xpReward: 10,
          },
          {
            type: 'step-animation',
            id: 'git-stash-step-01',
            title: { tr: 'Adim Adim: git stash', en: 'Step by Step: git stash' },
            steps: [
              { id: 1, icon: '📝', label: { tr: 'Yarim isi gor', en: 'See the unfinished work' }, detail: { tr: '`git status` ile `modified: tests/login.spec.js` satirini gor; commit etmeye hazir degilsin.', en: 'Run `git status` and see `modified: tests/login.spec.js`; you are not ready to commit yet.' } },
              { id: 2, icon: '📦', label: { tr: 'Rafa kaldir', en: 'Shelve it' }, detail: { tr: '`git stash` calistir: "Saved working directory and index state WIP on feature/hasan: ..." mesajini gor.', en: 'Run `git stash`: see the message "Saved working directory and index state WIP on feature/hasan: ...".' } },
              { id: 3, icon: '🔀', label: { tr: 'Guvenle gec', en: 'Switch safely' }, detail: { tr: 'Working tree artik temiz oldugu icin `git switch main` engellenmeden calisir.', en: 'Because the working tree is now clean, `git switch main` runs without being blocked.' } },
              { id: 4, icon: '↩️', label: { tr: 'Branch\'ine don', en: 'Return to your branch' }, detail: { tr: '`git switch feature/hasan` ile geri don.', en: 'Run `git switch feature/hasan` to come back.' } },
              { id: 5, icon: '🎁', label: { tr: 'Isini geri al', en: 'Bring your work back' }, detail: { tr: '`git stash pop` calistir: "Dropped refs/stash@{0}" mesaji ile `tests/login.spec.js` tekrar modified gorunur.', en: 'Run `git stash pop`: the "Dropped refs/stash@{0}" message appears and `tests/login.spec.js` shows modified again.' } },
            ],
          },
          gitBranchParallelFilm,
          {
            type: 'challenge',
            variant: 'order-sort',
            id: 'git-stash-order-01',
            question: { tr: 'Stash ile guvenli branch degisimi akisini sirala.', en: 'Order the safe branch-switch-with-stash flow.' },
            items: [
              { id: '1', text: { tr: '`git status` ile commit edilmemis degisikligi gor', en: 'Run `git status` to see the uncommitted change' }, order: 1 },
              { id: '2', text: { tr: '`git stash` ile isini gecici rafa kaldir', en: 'Run `git stash` to shelve your work temporarily' }, order: 2 },
              { id: '3', text: { tr: '`git switch main` ile temiz working tree ile gec', en: 'Run `git switch main` with a clean working tree' }, order: 3 },
              { id: '4', text: { tr: '`git switch feature/hasan` ile geri don', en: 'Run `git switch feature/hasan` to return' }, order: 4 },
              { id: '5', text: { tr: '`git stash pop` ile isini geri al', en: 'Run `git stash pop` to bring your work back' }, order: 5 },
            ],
            xpReward: 10,
          },
          gitStashPractice,
          {
            type: 'warning',
            content: 'Stash is temporary storage, not a permanent backup. If you stash and forget, changes can get lost in a long list. Prefer small commits over long-lived stashes.',
          },
          {
            type: 'git-practice',
            icon: '🌿',
            title: { en: 'Try it yourself: branch command mini lab', tr: 'Kendin dene: branch komut mini lab' },
            intro: { en: 'Write the commands in the order: list local branches, create `hasan`, switch to it, rename it, then show the create+switch shortcut.', tr: 'Komutları şu sıraya koy: local branchleri listele, `hasan` oluştur, ona geç, adını değiştir, sonra create+switch kısayolunu göster.' },
            starterCommands: `git branch -m feature/hasan
git checkout -b demo-branch
git branch hasan
git switch hasan
git branch`,
            expectedSteps: [
              { pattern: '^git\\s+branch$', label: { en: 'List local branches first', tr: 'Önce local branchleri listele' }, example: 'git branch' },
              { pattern: '^git\\s+branch\\s+hasan$', label: { en: 'Create `hasan` without switching', tr: '`hasan` branch’ini geçiş yapmadan oluştur' }, example: 'git branch hasan' },
              { pattern: '^git\\s+(switch|checkout)\\s+hasan$', label: { en: 'Switch to the existing `hasan` branch', tr: 'Var olan `hasan` branch’ine geç' }, example: 'git switch hasan' },
              { pattern: '^git\\s+branch\\s+-m\\s+feature\\/hasan$', label: { en: 'Rename the current branch', tr: 'Aktif branch’in adını değiştir' }, example: 'git branch -m feature/hasan' },
              { pattern: '^git\\s+(checkout\\s+-b|switch\\s+-c)\\s+demo-branch$', label: { en: 'Show create+switch in one command', tr: 'Tek komutta oluştur+geç kısayolunu göster' }, example: 'git switch -c demo-branch' },
            ],
            successOutput: { en: 'You covered the local branch basics: list, create, switch, rename, and create+switch.', tr: 'Local branch temelleri tamam: listele, oluştur, geç, rename et, tek komutta oluştur+geç.' },
            retryOutput: { en: 'Follow the state change order: list → create → switch → rename → create+switch shortcut.', tr: 'State değişim sırasını takip et: listele → oluştur → geç → rename → oluştur+geç kısayolu.' },
            help: { en: '`git branch hasan` and `git switch hasan` are different. One creates; the other moves you.', tr: '`git branch hasan` ile `git switch hasan` farklıdır. Biri oluşturur, diğeri seni taşır.' },
          },
          {
            type: 'simulation',
            title: { en: '2) First remote publish: create the branch on GitHub', tr: '2) Remote publish: branch GitHub tarafında ilk kez açılır' },
            icon: '🚀',
            color: '#0ea5e9',
            scenario: 'git-remote-branch-publish',
            description: { en: 'Watch a local branch become a remote branch. Choose one first-publish method once; after upstream is set, plain `git push` is enough while you are on that branch.', tr: 'Local branch’in remote branch’e dönüşmesini izle. İlk remote branch açma yöntemlerinden birini sadece bir kez kullan; upstream kurulduktan sonra o branch üzerindeyken `git push` yeterlidir.' },
          },
          {
            type: 'warning',
            content: 'Use only one first-publish method once: either `git push -u origin hasan` or `git push -u https://github.com/hasankocaman/deneme2.git hasan`. After the branch exists on remote and upstream is set, do not repeat long commands every time; switch to the branch and run `git push`.',
          },
          {
            type: 'table',
            headers: ['Command', 'When to use it', 'Result'],
            rows: [
              ['`git switch hasan`', 'Before publishing, move to the local branch you actually want to share', 'Active branch becomes `hasan`'],
              ['`git push -u origin hasan`', 'Preferred when `origin` already points to your GitHub repo', 'Creates `hasan` on GitHub and remembers upstream'],
              ['`git push -u https://github.com/hasankocaman/deneme2.git hasan`', 'Alternative if remote name is not configured and you want to push directly to a repo URL', 'Creates the remote branch on that repo URL and sets upstream'],
              ['`git branch -vv`', 'Verify whether upstream was connected', 'Shows something like `[origin/hasan]` next to your local branch'],
              ['`git push`', 'After upstream is set and you are on `hasan`', 'Pushes new commits to the remembered remote branch'],
            ],
          },
          {
            type: 'code',
            label: 'Switch, then publish the branch once',
            language: 'bash',
            code: `git switch hasan                                      # Move to your local branch

# Method 1 - preferred when origin exists:
git push -u origin hasan                              # Create remote branch and set upstream`,
          },
          {
            type: 'challenge',
            variant: 'order-sort',
            id: 'git-remote-publish-order-01',
            question: { tr: 'Bir local branch\'i GitHub\'da ilk kez yayınlama sırasını diz.', en: 'Order the sequence for publishing a local branch to GitHub for the first time.' },
            items: [
              { id: '1', text: { tr: '`git switch hasan` ile paylaşılacak branch\'e geç', en: 'Run `git switch hasan` to move to the branch you want to share' }, order: 1 },
              { id: '2', text: { tr: '`git push -u origin hasan` ile remote branch\'i oluştur ve upstream kur', en: 'Run `git push -u origin hasan` to create the remote branch and set upstream' }, order: 2 },
              { id: '3', text: { tr: '`git branch -vv` ile upstream bağlantısını doğrula', en: 'Run `git branch -vv` to verify the upstream connection' }, order: 3 },
            ],
            xpReward: 10,
          },
          {
            type: 'code',
            label: 'Alternative method, then verify and simplify future pushes',
            language: 'bash',
            code: `# Method 2 - alternative with direct repo URL:
git push -u https://github.com/hasankocaman/deneme2.git hasan

git branch -vv                                        # Verify: hasan tracks origin/hasan
git push                                              # Next pushes are this short`,
          },
          {
            type: 'git-practice',
            icon: '🚀',
            title: { en: 'Try it yourself: publish a local branch to remote', tr: 'Kendin dene: local branch’i remote’a aç' },
            intro: { en: 'Arrange the commands so `hasan` is published to GitHub once, upstream is verified, then future pushes become simple.', tr: '`hasan` branch’i GitHub’da bir kez açılacak, upstream kontrol edilecek, sonra sonraki push kısalacak şekilde komutları sırala.' },
            starterCommands: `git push
git branch -vv
git switch hasan
git push -u origin hasan`,
            expectedSteps: [
              { pattern: '^git\\s+switch\\s+hasan$', label: { en: 'Move to the local branch first', tr: 'Önce local branch’e geç' }, example: 'git switch hasan' },
              { pattern: '^git\\s+push\\s+-u\\s+(origin|https?:\\/\\/\\S+\\.git)\\s+(hasan|hasan2|feature\\/hasan)$', label: { en: 'Create the remote branch once and set upstream', tr: 'Remote branch’i bir kez aç ve upstream kur' }, example: 'git push -u origin hasan' },
              { pattern: '^git\\s+branch\\s+-vv$', label: { en: 'Verify the upstream connection', tr: 'Upstream bağlantısını kontrol et' }, example: 'git branch -vv' },
              { pattern: '^git\\s+push$', label: { en: 'Use plain push after upstream exists', tr: 'Upstream varsa sonraki push kısa olur' }, example: 'git push' },
            ],
            successOutput: { en: 'Remote branch created once, upstream verified, and future pushes are simple.', tr: 'Remote branch bir kez açıldı, upstream kontrol edildi ve sonraki push’lar kısa.' },
            retryOutput: { en: 'Use the order: switch branch → push -u once → branch -vv → plain git push.', tr: 'Sıra şöyle olmalı: branch’e geç → bir kez push -u → branch -vv → kısa git push.' },
            help: { en: 'Do not run both first-publish methods. Pick `origin` or the direct repo URL, then use plain `git push` afterward.', tr: 'İlk publish için iki yöntemi birden çalıştırma. `origin` veya direkt repo URL yolundan birini seç; sonra normal `git push` kullan.' },
          },
          {
            type: 'code',
            label: 'fetch vs plain pull',
            language: 'bash',
            code: `# fetch: download remote history, do NOT touch your working branch
git fetch origin
# main: 3 new commits available, your local main is unchanged

# pull: fetch + merge in one step (creates a merge commit if histories diverged)
git pull origin main
# Merge made by the 'ort' strategy. -> extra "Merge branch 'main'" commit appears`,
          },
          {
            type: 'step-animation',
            id: 'git-fetch-vs-pull-step-01',
            title: { tr: "git fetch Neden Branch'ine HİÇ Dokunmaz, git pull Neden Dokunur?", en: 'Why Does git fetch NEVER Touch Your Branch, But git pull Does?' },
            steps: [
              { id: 1, icon: '1️⃣', label: { tr: 'git fetch origin çalıştırıldığında…', en: 'Running git fetch origin…' }, detail: { tr: "git fetch origin çalıştırıldığında, uzak sunucudaki YENİ commit'ler senin LOKAL .git veritabanına İNDİRİLİR (örn. origin/main güncellenir) — ama senin ÇALIŞMA dizinindeki hiçbir dosya DEĞİŞMEZ.", en: "Running git fetch origin DOWNLOADS the remote's new commits into your LOCAL .git database (e.g. origin/main gets updated) — but NOT a single file in your WORKING directory CHANGES." } },
              { id: 2, icon: '2️⃣', label: { tr: 'fetch sonrası git log origin/main çalıştırırsan…', en: 'Running git log origin/main after fetch…' }, detail: { tr: "fetch sonrası git log origin/main --oneline çalıştırırsan YENİ commit'leri GÖREBİLİRSİN, ama git log (kendi main'in) HİÇBİR YENİ commit GÖSTERMEZ — indirilen veri sadece \"referans\" olarak DURUR, henüz BİRLEŞTİRİLMEMİŞTİR.", en: "Running git log origin/main --oneline after fetch lets you SEE the new commits, but git log (your own main) shows NO new commits — the downloaded data just SITS there as a \"reference\", not yet MERGED." } },
              { id: 3, icon: '3️⃣', label: { tr: 'git pull origin main ise…', en: 'git pull origin main instead…' }, detail: { tr: "git pull origin main ise İKİ işlemi TEK komutta yapar: ÖNCE fetch ile aynı indirmeyi yapar, SONRA otomatik olarak bir merge (veya rebase, ayara göre) ÇALIŞTIRIR.", en: "git pull origin main does TWO things in ONE command: it FIRST downloads exactly like fetch, THEN automatically RUNS a merge (or rebase, depending on config)." } },
              { id: 4, icon: '4️⃣', label: { tr: 'İki geçmiş BİRBİRİNDEN AYRIŞMIŞSA…', en: 'If the two histories have DIVERGED…' }, detail: { tr: "İki geçmiş (senin commit'lerin ve uzaktaki yeni commit'ler) BİRBİRİNDEN AYRIŞMIŞSA, bu otomatik merge fazladan bir \"Merge branch 'main'\" COMMIT'i OLUŞTURUR — bu, git log geçmişinde EKSTRA bir düğüm olarak GÖRÜNÜR.", en: "If the two histories (your commits and the new remote ones) have DIVERGED, this automatic merge CREATES an extra \"Merge branch 'main'\" COMMIT — it SHOWS UP as an EXTRA node in the git log history." } },
              { id: 5, icon: '5️⃣', label: { tr: 'Bu yüzden CI/CD script\'lerinde…', en: 'This is why CI/CD scripts…' }, detail: { tr: 'Bu yüzden CI/CD script\'lerinde veya sadece "durumu KONTROL etmek" istediğinde git fetch TERCİH edilir — çalışma dizinini DEĞİŞTİRMEDEN neyin değiştiğini görmeni sağlar, git pull ise SENİ hazır olmadan bir merge\'e SOKABİLİR.', en: 'This is why git fetch is PREFERRED in CI/CD scripts or when you just want to CHECK status — it lets you see what changed WITHOUT touching your working directory, while git pull can PULL you into a merge before you\'re READY.' } },
            ],
          },
          {
            type: 'challenge',
            variant: 'order-sort',
            id: 'git-fetch-vs-pull-order-01',
            question: { tr: 'fetch ile düz pull arasındaki farkı görme sırasını diz.', en: 'Order the sequence for seeing the difference between fetch and plain pull.' },
            items: [
              { id: '1', text: { tr: '`git fetch origin` ile SADECE indir, branch\'ine dokunma', en: 'Run `git fetch origin` to ONLY download, without touching your branch' }, order: 1 },
              { id: '2', text: { tr: 'Working tree\'nin değişmediğini gör', en: 'See that your working tree has not changed' }, order: 2 },
              { id: '3', text: { tr: 'Düz `git pull origin main` çalıştırsan, history\'ler ayrışmışsa ekstra bir merge commit oluşabileceğini bil', en: 'Know that plain `git pull origin main` can add an extra merge commit if histories diverged' }, order: 3 },
            ],
            xpReward: 10,
          },
          {
            type: 'code',
            label: 'pull --rebase: the cleaner alternative',
            language: 'bash',
            code: `# pull --rebase: fetch + replay YOUR commits on top of the updated main
git pull --rebase origin main
# Successfully rebased and updated refs/heads/feature/hasan
# -> linear history, no extra merge commit`,
          },
          {
            type: 'code-playground',
              relatedTopicId: 'git-pull-practice-01',
            id: 'git-pull-practice-01',
            label: { tr: 'Micro Lab: git pull / git fetch', en: 'Micro Lab: git pull / git fetch' },
            language: 'bash',
            task: {
              tr: 'Once `git fetch origin` ile sadece indir (branch\'ine dokunma), sonra `git pull --rebase origin main` ile hem indir hem kendi commit\'lerini guncel main\'in ustune yeniden uygula. Java\'da `fetch`i bir Maven repository\'den metadata indirip henuz build\'e dahil etmemeye benzet; `pull --rebase` ise indirilenleri hemen entegre edip projeyi yeniden derlemek gibidir.',
              en: 'First download only with `git fetch origin` (does not touch your branch), then download AND replay your commits on top of updated main with `git pull --rebase origin main`. Think of `fetch` like downloading metadata from a Maven repository without building yet in Java; `pull --rebase` is like immediately integrating it and rebuilding the project.',
            },
            explanation: {
              tr: 'TODO satirini gercek `git pull --rebase origin main` komutuyla degistir. Sandbox gercek bir repo calistirmiyor; amac fetch ile pull --rebase arasindaki farki elinle yazarak pekistirmek.',
              en: 'Replace the TODO line with the real `git pull --rebase origin main` command. The sandbox does not run a real repo; the goal is to reinforce the difference between fetch and pull --rebase by typing it.',
            },
            code: {
              tr: `git fetch origin\ngit log origin/main --oneline -3\n// EKSIK: rebase ile fetch+entegre et\ngit log --oneline -3`,
              en: `git fetch origin\ngit log origin/main --oneline -3\n// MISSING: fetch and integrate via rebase\ngit log --oneline -3`,
            },
            starterCode: {
              tr: `git fetch origin\ngit log origin/main --oneline -3\n// TODO: rebase ile fetch+entegre et\ngit log --oneline -3`,
              en: `git fetch origin\ngit log origin/main --oneline -3\n// TODO: fetch and integrate via rebase\ngit log --oneline -3`,
            },
            solutionCode: {
              tr: `git fetch origin\ngit log origin/main --oneline -3\ngit pull --rebase origin main\ngit log --oneline -3`,
              en: `git fetch origin\ngit log origin/main --oneline -3\ngit pull --rebase origin main\ngit log --oneline -3`,
            },
            expected: {
              tr: '`git pull --rebase origin main` sonrasinda "Successfully rebased and updated" mesaji gorursun; history\'de ekstra bir merge commit YOKTUR.',
              en: 'After `git pull --rebase origin main` you see "Successfully rebased and updated"; there is NO extra merge commit in the history.',
            },
            hints: [
              { tr: '`git fetch` SADECE indirir; senin branch\'in ve working tree degismez.', en: '`git fetch` ONLY downloads; your branch and working tree stay unchanged.' },
              { tr: 'Duz `git pull` = `fetch` + `merge`; diverge varsa ekstra bir "Merge branch" commiti olusur.', en: 'Plain `git pull` = `fetch` + `merge`; if histories diverged, an extra "Merge branch" commit appears.' },
              { tr: '`git pull --rebase` = `fetch` + `rebase`; senin commit\'lerin guncel main\'in ustune yeniden uygulanir, ekstra commit olmaz.', en: '`git pull --rebase` = `fetch` + `rebase`; your commits are replayed on top of the updated main, no extra commit.' },
            ],
            xpReward: 10,
          },
          {
            type: 'step-animation',
            id: 'git-pull-step-01',
            title: { tr: 'Adim Adim: git pull / git fetch', en: 'Step by Step: git pull / git fetch' },
            steps: [
              { id: 1, icon: '📡', label: { tr: 'Sadece indir', en: 'Download only' }, detail: { tr: '`git fetch origin` calistir: "3 new commits available" gibi bir bilgi gorursun, working tree\'n DEGISMEZ.', en: 'Run `git fetch origin`: you see something like "3 new commits available", your working tree stays UNCHANGED.' } },
              { id: 2, icon: '🔍', label: { tr: 'Farki incele', en: 'Inspect the difference' }, detail: { tr: '`git log origin/main --oneline -3` ile remote\'taki yeni commit\'leri merge/rebase yapmadan once gor.', en: 'Run `git log origin/main --oneline -3` to see the new remote commits before merging/rebasing.' } },
              { id: 3, icon: '🔀', label: { tr: 'Duz pull riski', en: 'Plain pull risk' }, detail: { tr: 'Duz `git pull origin main` calistirsan ve historyler ayrismissa, otomatik bir "Merge branch \'main\'" commit\'i eklenir.', en: 'If you ran plain `git pull origin main` and histories diverged, an automatic "Merge branch \'main\'" commit gets added.' } },
              { id: 4, icon: '🪜', label: { tr: 'Rebase ile entegre et', en: 'Integrate via rebase' }, detail: { tr: '`git pull --rebase origin main` calistir: senin commit\'lerin guncel main\'in ustune tek tek yeniden uygulanir.', en: 'Run `git pull --rebase origin main`: your commits are replayed one by one on top of the updated main.' } },
              { id: 5, icon: '✅', label: { tr: 'Temiz history\'i dogrula', en: 'Verify the clean history' }, detail: { tr: '`git log --oneline -3` ile artik ekstra merge commit\'i olmayan duz bir cizgi gorursun.', en: 'Run `git log --oneline -3` and see a straight line with no extra merge commit.' } },
            ],
          },
          {
            type: 'challenge',
            variant: 'order-sort',
            id: 'git-pull-order-01',
            question: { tr: 'fetch ve pull --rebase ile guvenli guncelleme akisini sirala.', en: 'Order the safe update flow using fetch and pull --rebase.' },
            items: [
              { id: '1', text: { tr: '`git fetch origin` ile remote degisiklikleri indir', en: 'Run `git fetch origin` to download remote changes' }, order: 1 },
              { id: '2', text: { tr: '`git log origin/main --oneline -3` ile yeni commit\'leri incele', en: 'Run `git log origin/main --oneline -3` to inspect the new commits' }, order: 2 },
              { id: '3', text: { tr: '`git pull --rebase origin main` ile fetch+entegre et', en: 'Run `git pull --rebase origin main` to fetch and integrate' }, order: 3 },
              { id: '4', text: { tr: 'Conflict cikarsa coz ve `git add` ile isaretle', en: 'Resolve any conflict and mark it with `git add`' }, order: 4 },
              { id: '5', text: { tr: '`git log --oneline -3` ile temiz, dogrusal history\'i dogrula', en: 'Run `git log --oneline -3` to confirm a clean, linear history' }, order: 5 },
            ],
            xpReward: 10,
          },
          {
            type: 'quiz',
            question: 'Every time you run `git pull origin main` on your feature branch, Git creates an unwanted "Merge branch \'main\'" commit. Which command gets the same update without that extra commit?',
            options: [
              { id: 'a', text: 'git fetch origin' },
              { id: 'b', text: 'git pull --rebase origin main' },
              { id: 'c', text: 'git push --force' },
              { id: 'd', text: 'git branch -m main' },
            ],
            correct: 'b',
            explanation: '`git pull --rebase` fetches the remote history and replays your local commits on top of it, producing a linear history with no extra merge commit. Plain `git pull` merges by default and creates one whenever the histories have diverged.',

        retryQuestion: {
      "question": "A teammate ran `git fetch origin` and says nothing changed in their working files or branch. Why is that the expected behavior?",
      "options": [
            {
                  "id": "a",
                  "text": "git fetch is broken; only git pull actually works"
            },
            {
                  "id": "b",
                  "text": "git fetch only downloads remote history into origin/* references — it never touches your local branch or working tree"
            },
            {
                  "id": "c",
                  "text": "git fetch requires --force to apply anything"
            },
            {
                  "id": "d",
                  "text": "git fetch automatically stashes uncommitted work first"
            }
      ],
      "correct": "b",
      "explanation": "`git fetch` is a read-only download: it updates your local copies of the remote branches (`origin/main`, etc.) but leaves your current branch and working tree completely untouched until you explicitly merge, rebase, or pull."
}
},
        ],
      },
      {
        title: '🔀 Merge & Conflict: Bring Changes Together Safely',
        blocks: [
          {
            type: 'simple-box',
            emoji: '⚖️',
            content: `A Git merge is like a court stenographer reconciling two witnesses' testimony of the same event: wherever their stories don't overlap, Git combines them automatically, but the moment two people changed the exact same line, it stops guessing and hands you the conflict markers instead. The thought-provoking question before you touch a single marker: if Git can auto-merge most of the time, why does it even bother stopping you for the rest? Because if it asked on every line, nobody would use branches at all — the whole point of parallel branches is that most changes don't actually collide, so the tool should only interrupt at the rare point a human decision is truly required. Java analogy: this is the same tension as two developers editing the same class in a shared IDE without a lock — a build tool can merge two developers' work automatically only when they touched different methods, never when they overrode the exact same method body, exactly like Git can only auto-merge non-overlapping lines. In real QA work this is precisely why a conflict resolved by quietly keeping the wrong line of an assertion is more dangerous than a build that fails loudly — a wrongly resolved marker can ship a test that passes for the wrong reason, and nobody notices until production.`,
          },
          {
            type: 'simulation',
            title: { en: '3) Merge: bring main into your branch', tr: '3) Merge: main değişikliklerini branch içine al' },
            icon: '🔁',
            color: '#2563eb',
            scenario: 'git-merge-lab',
            description: { en: 'Watch `origin/main` updates flow into a feature branch. The key idea: merge happens into the branch you are currently on.', tr: '`origin/main` güncellemelerinin feature branch içine akmasını izle. Ana fikir: merge, bulunduğun branch’in içine yapılır.' },
          },
          {
            type: 'simulation',
            title: { en: '4) Conflict resolution: markers are a decision point', tr: '4) Conflict çözümü: markerlar karar noktasıdır' },
            icon: '🧯',
            color: '#dc2626',
            scenario: 'git-conflict-lab',
            description: { en: 'Watch a conflict appear, read the markers, create the final file, run the test, mark it resolved, and continue the merge/rebase.', tr: 'Conflict’in çıkmasını, markerların okunmasını, final dosyanın yazılmasını, testin koşmasını, resolved işaretini ve merge/rebase devamını izle.' },
          },
          {
            type: 'grid',
            items: [
              { icon: '🧭', label: 'Branch name', desc: '`feature/checkout-tests`, `fix/login-timeout`, `ci/add-playwright-report`: the name should reveal intent.' },
              { icon: '🧪', label: 'Small PR', desc: 'One behavior change, one test story, one review conversation. This reduces conflicts.' },
              { icon: '🔒', label: 'Protected main', desc: 'Main should receive work through PR review and passing checks, not direct pushes.' },
              { icon: '⏱️', label: 'Short-lived branch', desc: 'Long branches drift from main and create late conflicts, especially in QA automation selectors and test data.' },
            ],
          },
          {
            type: 'code',
            label: 'Sync main, then branch off',
            language: 'bash',
            code: `git fetch origin                         # Refresh remote branches
git switch main                          # Move to local main
git pull --ff-only origin main            # Update main without surprise merge commits
git switch -c feature/checkout-tests      # Create a feature branch`,
          },
          {
            type: 'step-animation',
            id: 'git-ff-only-sync-step-01',
            title: { tr: "git pull --ff-only Neden \"Sürpriz\" Bir Merge Commit'i Engeller?", en: 'Why Does git pull --ff-only Prevent a "Surprise" Merge Commit?' },
            steps: [
              { id: 1, icon: '1️⃣', label: { tr: 'git fetch origin çalıştırıldığında…', en: 'Running git fetch origin…' }, detail: { tr: 'git fetch origin çalıştırıldığında SADECE uzaktaki branch referansları (origin/main gibi) GÜNCELLENİR — local main dalın HİÇBİR satırı henüz DEĞİŞMEZ.', en: 'Running git fetch origin ONLY updates the remote branch references (like origin/main) — NOT a single line of your local main branch CHANGES yet.' } },
              { id: 2, icon: '2️⃣', label: { tr: 'git switch main ile…', en: 'git switch main moves…' }, detail: { tr: "git switch main ile local main'e GEÇİLİR — artık sonraki komutlar main dalı ÜZERİNDE çalışır, feature branch'in ETKİLENMEZ.", en: "git switch main MOVES you to local main — subsequent commands now operate ON the main branch, your feature branch is UNAFFECTED." } },
              { id: 3, icon: '3️⃣', label: { tr: 'git pull --ff-only origin main, SADECE…', en: 'git pull --ff-only origin main works ONLY…' }, detail: { tr: "git pull --ff-only origin main, SADECE local main'in origin/main'in TAM OLARAK GERİSİNDE (hiçbir kendi commit'i olmadan) olduğu durumda ÇALIŞIR — pointer'ı basitçe İLERİ SÜRÜKLER, yeni bir merge commit'i OLUŞTURMAZ.", en: "git pull --ff-only origin main works ONLY when local main is EXACTLY BEHIND origin/main (with no commits of its own) — it just SLIDES the pointer FORWARD, it never CREATES a new merge commit." } },
              { id: 4, icon: '4️⃣', label: { tr: "Eğer local main'de kendi commit'lerin varsa…", en: 'If local main has its own commits…' }, detail: { tr: "Eğer local main'de origin/main'de OLMAYAN kendi commit'lerin varsa (dallar AYRIŞMIŞSA), --ff-only bu durumu ALGILAR ve KOMUTU REDDEDER — sessizce bir merge commit'i oluşturmak yerine sana AÇIKÇA hata verir.", en: "If local main has commits of its own that origin/main doesn't (the histories have DIVERGED), --ff-only DETECTS this and REJECTS the command — instead of silently creating a merge commit, it gives you an EXPLICIT error." } },
              { id: 5, icon: '5️⃣', label: { tr: "git switch -c feature/checkout-tests ise…", en: 'git switch -c feature/checkout-tests then…' }, detail: { tr: "git switch -c feature/checkout-tests ise main GÜNCEL haldeyken YENİ bir branch açar — bu sıralama sayesinde yeni feature branch'in TEMELİ her zaman en TAZE main'dir, gereksiz erken conflict RİSKİ azalır.", en: "git switch -c feature/checkout-tests then opens a NEW branch while main is UP TO DATE — this ordering guarantees the new feature branch's BASE is always the FRESHEST main, reducing the risk of an unnecessary early conflict." } },
            ],
          },
          {
            type: 'challenge',
            variant: 'order-sort',
            id: 'git-daily-sync-order-01',
            question: { tr: 'Yeni bir feature branch\'e güncel main üzerinden başlama sırasını diz.', en: 'Order the sequence for starting a new feature branch from an updated main.' },
            items: [
              { id: '1', text: { tr: '`git fetch origin` ile remote branch bilgisini yenile', en: 'Run `git fetch origin` to refresh remote branch info' }, order: 1 },
              { id: '2', text: { tr: '`git switch main` ile local main\'e geç', en: 'Run `git switch main` to move to local main' }, order: 2 },
              { id: '3', text: { tr: '`git pull --ff-only origin main` ile sürpriz merge commit\'siz güncelle', en: 'Run `git pull --ff-only origin main` to update without a surprise merge commit' }, order: 3 },
              { id: '4', text: { tr: '`git switch -c feature/checkout-tests` ile feature branch oluştur', en: 'Run `git switch -c feature/checkout-tests` to create the feature branch' }, order: 4 },
            ],
            xpReward: 10,
          },
          {
            type: 'code',
            label: 'Make focused changes, then publish',
            language: 'bash',
            code: `# edit tests/checkout.spec.js             # Make focused QA changes
git add tests/checkout.spec.js            # Stage only the intended file
git commit -m "test: cover checkout tax"  # Commit a small snapshot
git push -u origin feature/checkout-tests # Push branch and set upstream`,
          },
          {
            type: 'challenge',
            variant: 'order-sort',
            id: 'git-daily-publish-order-01',
            question: { tr: 'Odaklı bir değişikliği commitleyip push etme sırasını diz.', en: 'Order the sequence for committing and pushing one focused change.' },
            items: [
              { id: '1', text: { tr: 'Sadece amaçlanan dosyayı stage et: `git add tests/checkout.spec.js`', en: 'Stage only the intended file: `git add tests/checkout.spec.js`' }, order: 1 },
              { id: '2', text: { tr: 'Küçük, açıklayıcı bir commit at: `git commit -m "test: cover checkout tax"`', en: 'Make a small, descriptive commit: `git commit -m "test: cover checkout tax"`' }, order: 2 },
              { id: '3', text: { tr: '`git push -u origin feature/checkout-tests` ile branch\'i push et ve upstream kur', en: 'Run `git push -u origin feature/checkout-tests` to push the branch and set upstream' }, order: 3 },
            ],
            xpReward: 10,
          },
          {
            type: 'code',
            label: 'Commit your own branch state first',
            language: 'bash',
            code: `git status                              # Check uncommitted work before switching
git add tests/login.spec.js               # Stage your focused change
git commit -m "test: cover login errors"  # Save your branch state first`,
          },
          {
            type: 'callout',
            icon: '🧪',
            content: { tr: 'Şimdi Git Temelleri sekmesindeki gerçek terminalde dene: bir değişikliği stage et ve commitle (`git add`, `git commit -m "..."`) — sandbox\'taki "Bir değişikliği stage et ve commitle" görevi bu adımların ta kendisi.', en: 'Try it now in the real terminal on the Git Basics tab: stage a change and commit it (`git add`, `git commit -m "..."`) — the sandbox\'s "Stage a change and commit it" mission is exactly this.' },
          },
          {
            type: 'code',
            label: 'Update main, return, and merge',
            language: 'bash',
            code: `git switch main                           # Move to the shared base branch
git pull --ff-only origin main             # Get remote changes safely

git switch feature/hasan                  # Return to your own branch
git merge main                            # Merge fresh main into your branch
# If a conflict appears, resolve it locally, run tests, git add, then finish the merge`,
          },
          {
            type: 'code-playground',
              relatedTopicId: 'git-merge-practice-01',
            id: 'git-merge-practice-01',
            label: { tr: 'Micro Lab: git merge', en: 'Micro Lab: git merge' },
            language: 'bash',
            task: {
              tr: '`feature/hasan` branch\'indeyken `main`i merge et: once `git switch main` + `git pull --ff-only origin main` ile main\'i guncelle, sonra `git switch feature/hasan` ile geri don ve `git merge main` calistir. Java\'da bunu iki ayri SVN working copy\'sini birlestirmeye benzet — ama Git\'te merge yerel ve hizlidir, network gerektirmez.',
              en: 'While on `feature/hasan`, merge `main` into it: first update main with `git switch main` + `git pull --ff-only origin main`, then return with `git switch feature/hasan` and run `git merge main`. Think of it like reconciling two SVN working copies in Java tooling — except in Git, merge is local and fast, no network round-trip needed for the merge step itself.',
            },
            explanation: {
              tr: 'TODO satirini gercek `git merge main` komutuyla degistir. Sandbox gercek bir repo calistirmiyor; amac dogru sirayi elinle kurmak.',
              en: 'Replace the TODO line with the real `git merge main` command. The sandbox does not run a real repo; the goal is to build the correct order by hand.',
            },
            code: {
              tr: `git switch main\ngit pull --ff-only origin main\ngit switch feature/hasan\n// EKSIK: main'i feature/hasan icine merge et\ngit status`,
              en: `git switch main\ngit pull --ff-only origin main\ngit switch feature/hasan\n// MISSING: merge main into feature/hasan\ngit status`,
            },
            starterCode: {
              tr: `git switch main\ngit pull --ff-only origin main\ngit switch feature/hasan\n// TODO: main'i feature/hasan icine merge et\ngit status`,
              en: `git switch main\ngit pull --ff-only origin main\ngit switch feature/hasan\n// TODO: merge main into feature/hasan\ngit status`,
            },
            solutionCode: {
              tr: `git switch main\ngit pull --ff-only origin main\ngit switch feature/hasan\ngit merge main\ngit status`,
              en: `git switch main\ngit pull --ff-only origin main\ngit switch feature/hasan\ngit merge main\ngit status`,
            },
            expected: {
              tr: '`git merge main` calisir, conflict yoksa otomatik bir merge commit olusur; `git status` "nothing to commit" veya conflict listesi gosterir.',
              en: '`git merge main` runs; if there is no conflict, an automatic merge commit is created and `git status` shows a clean tree or the conflict list.',
            },
            hints: [
              { tr: 'Merge etmeden once dogru branch uzerinde oldugundan emin ol: `git switch feature/hasan`.', en: 'Make sure you are on the right branch before merging: `git switch feature/hasan`.' },
              { tr: '`git merge main` aktif branch\'e main\'in commit\'lerini getirir.', en: '`git merge main` brings main\'s commits into the currently active branch.' },
              { tr: 'Conflict cikarsa dosyalari duzelt, `git add`, sonra `git commit` ile merge\'i bitir.', en: 'If a conflict appears, fix the files, `git add`, then `git commit` to finish the merge.' },
            ],
            xpReward: 10,
          },
          {
            type: 'step-animation',
            id: 'git-merge-step-01',
            title: { tr: 'Adim Adim: git merge', en: 'Step by Step: git merge' },
            steps: [
              { id: 1, icon: '🔄', label: { tr: 'main\'i guncelle', en: 'Update main' }, detail: { tr: '`git switch main` sonra `git pull --ff-only origin main` ile remote\'taki son commit\'leri al.', en: 'Run `git switch main` then `git pull --ff-only origin main` to get the latest remote commits.' } },
              { id: 2, icon: '↩️', label: { tr: 'Feature branch\'ine don', en: 'Return to feature branch' }, detail: { tr: '`git switch feature/hasan` ile kendi branch\'ine geri don.', en: 'Run `git switch feature/hasan` to go back to your own branch.' } },
              { id: 3, icon: '🔀', label: { tr: 'Merge et', en: 'Run the merge' }, detail: { tr: '`git merge main` calistir: Git iki branch\'in ortak atasini bulup farkli commit\'leri birlestirir.', en: 'Run `git merge main`: Git finds the common ancestor of both branches and combines the diverging commits.' } },
              { id: 4, icon: '⚠️', label: { tr: 'Conflict varsa coz', en: 'Resolve conflicts if any' }, detail: { tr: '`<<<<<<< HEAD` ile `>>>>>>> main` arasindaki kismi elle duzenle, `git add` ile isaretle.', en: 'Manually edit the section between `<<<<<<< HEAD` and `>>>>>>> main`, mark it resolved with `git add`.' } },
              { id: 5, icon: '✅', label: { tr: 'Merge commit\'i tamamla', en: 'Complete the merge commit' }, detail: { tr: 'Conflict yoksa Git otomatik bir merge commit olusturur; varsa `git commit` ile sen tamamlarsin.', en: 'If there was no conflict, Git auto-creates a merge commit; if there was, you finish it with `git commit`.' } },
            ],
          },
          gitMergeTwoFacesFilm,
          {
            type: 'challenge',
            variant: 'order-sort',
            id: 'git-merge-order-01',
            question: { tr: 'Guvenli bir merge akisini gercek sirasiyla diz.', en: 'Order a safe merge flow in its real sequence.' },
            items: [
              { id: '1', text: { tr: '`git switch main` ile main\'e gec', en: 'Run `git switch main` to move to main' }, order: 1 },
              { id: '2', text: { tr: '`git pull --ff-only origin main` ile main\'i guncelle', en: 'Run `git pull --ff-only origin main` to update main' }, order: 2 },
              { id: '3', text: { tr: '`git switch feature/hasan` ile feature branch\'ine don', en: 'Run `git switch feature/hasan` to return to the feature branch' }, order: 3 },
              { id: '4', text: { tr: '`git merge main` ile guncel main\'i icine al', en: 'Run `git merge main` to bring in the updated main' }, order: 4 },
              { id: '5', text: { tr: 'Conflict varsa coz, `git add`, gerekirse `git commit`', en: 'Resolve any conflicts, `git add`, and `git commit` if needed' }, order: 5 },
            ],
            xpReward: 10,
          },
          {
            type: 'git-practice',
            icon: '🧪',
            title: { en: 'Try it yourself: order a safe branch start', tr: 'Kendin dene: güvenli branch başlangıcını sırala' },
            intro: { en: 'Arrange the commands so the feature branch starts from an updated main.', tr: 'Komutları feature branch güncel main üzerinden başlayacak şekilde sırala.' },
            starterCommands: `git switch main
git fetch origin
git switch -c feature/checkout-tests
git pull --ff-only origin main
git push -u origin feature/checkout-tests`,
            expectedSteps: [
              { pattern: 'git\\s+fetch\\s+origin', label: { en: 'Refresh remote state first', tr: 'Önce remote bilgisini yenile' }, example: 'git fetch origin' },
              { pattern: 'git\\s+switch\\s+main', label: { en: 'Move to main before creating the feature branch', tr: 'Feature branch açmadan önce main’e geç' }, example: 'git switch main' },
              { pattern: 'git\\s+pull\\s+--ff-only\\s+origin\\s+main', label: { en: 'Update main without surprise merge commits', tr: 'main’i sürpriz merge commit olmadan güncelle' }, example: 'git pull --ff-only origin main' },
              { pattern: 'git\\s+switch\\s+-c\\s+feature\\/checkout-tests', label: { en: 'Create the feature branch from updated main', tr: 'Feature branch’i güncel main’den aç' }, example: 'git switch -c feature/checkout-tests' },
              { pattern: 'git\\s+push\\s+-u\\s+origin\\s+feature\\/checkout-tests', label: { en: 'Push with upstream after at least one commit in real work', tr: 'Gerçek işte commit sonrası upstream ile push et' }, example: 'git push -u origin feature/checkout-tests' },
            ],
            successOutput: { en: 'Branch starts from updated main. In a real repo, edit, add and commit before the final push.', tr: 'Branch güncel main üzerinden başlıyor. Gerçek repoda final push öncesi değişiklik, add ve commit yapılır.' },
            retryOutput: { en: 'Reorder the flow: fetch → switch main → pull --ff-only → switch -c → push -u.', tr: 'Akışı yeniden sırala: fetch → switch main → pull --ff-only → switch -c → push -u.' },
            help: { en: 'This checker focuses on the branch-start order, not on changing a real repository.', tr: 'Bu kontrol gerçek repo değiştirmez; sadece branch başlangıç sırasına bakar.' },
          },
          {
            type: 'quiz',
            question: 'You are resolving a merge conflict and see `<<<<<<< HEAD`, `=======`, and `>>>>>>> main` markers inside a test file. What is the correct next step once you have decided which lines to keep?',
            options: [
              { id: 'a', text: 'Delete the whole file and recreate it from scratch' },
              { id: 'b', text: 'Remove the conflict markers, save the final version, run the test, then `git add` the file and finish with `git commit`' },
              { id: 'c', text: 'Run `git merge --abort` immediately' },
              { id: 'd', text: 'Push the file with the markers still inside so a teammate can review them' },
            ],
            correct: 'b',
            explanation: 'The markers are a decision point, not an error to escape from: remove them, keep the correct final logic, verify it with a test run, mark the file resolved with `git add`, and complete the merge with `git commit`.',

        retryQuestion: {
      "question": "When does Git complete a merge automatically, without ever asking you to resolve anything?",
      "options": [
            {
                  "id": "a",
                  "text": "When the merge is a fast-forward, or the two branches changed different, non-overlapping lines"
            },
            {
                  "id": "b",
                  "text": "Always — merges never require manual resolution"
            },
            {
                  "id": "c",
                  "text": "Only when you pass a --no-conflict flag"
            },
            {
                  "id": "d",
                  "text": "Only when both branches have completely identical content"
            }
      ],
      "correct": "a",
      "explanation": "Git can auto-combine changes whenever it can prove there is no real overlap — a fast-forward, or edits to different lines/files. It only stops and hands you conflict markers when two branches changed the exact same lines in incompatible ways."
}
},
        ],
      },
      {
        title: '🧬 Rebase & Advanced Flow: Cherry-pick and Rewriting History',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🪄',
            content: `Rebase and cherry-pick are both time-machine tools that rewrite WHERE a commit sits in history, but they answer two different questions: rebase asks "what if my whole branch had started from a later point in time?" and replays every one of your commits on the new base, while cherry-pick asks "can I copy just this ONE change elsewhere, without dragging its neighbors along?" and applies a single commit's diff as a brand-new commit somewhere else. The thought-provoking question: if merge already exists and preserves the true history, why would a team ever choose to rewrite commit hashes with rebase at all? Because a history full of "fix typo" and "oops" commits on a shared branch is not honesty, it is noise — rebase lets you present the story as it should have been told, one clean logical commit at a time, before anyone reviews it. Java analogy: rebase is like regenerating a Gradle/Maven dependency tree after changing a version — every downstream artifact gets recalculated against the new base, exactly like every commit's hash changes once the base commit changes; cherry-pick is closer to copying one compiled class out of someone else's JAR into your own project, without pulling in the rest of that JAR's history. In real QA work, this is precisely why a hotfix branch pulls in ONE specific bug-fix commit with cherry-pick instead of merging an entire in-progress feature branch that might also carry untested, unrelated changes — and why rebasing a branch a teammate has already pulled can silently break their local history unless the whole team explicitly agreed to it first.`,
          },
          {
            type: 'table',
            headers: ['Operation', 'Use when', 'Risk'],
            rows: [
              ['merge', 'You want to preserve branch history and teamwork context', 'History can become noisy if branches live too long'],
              ['rebase', 'You want a clean linear story before PR', 'Rewrites commit hashes; dangerous after sharing'],
              ['squash merge', 'PR has many WIP commits but should land as one logical change', 'Fine-grained commit history is collapsed'],
              ['cherry-pick', 'You need one specific commit on another branch', 'Can duplicate logic if used without tracking'],
            ],
          },
          {
            type: 'code',
            label: 'Find the exact commit, then switch to the target branch',
            language: 'bash',
            code: `# 1. Find the exact commit hash you need from another branch
git log feature/hasan --oneline -5
# d4e5f6a fix(login): handle empty password field
# c3d4e5f test: add login error cases

# 2. Switch to the branch that needs that single fix
git switch hotfix/release-1.4`,
          },
          {
            type: 'step-animation',
            id: 'git-cherry-pick-find-step-01',
            title: { tr: 'git log feature/hasan --oneline -5 Aslında Neyi Listeler?', en: 'What Does git log feature/hasan --oneline -5 Actually List?' },
            steps: [
              { id: 1, icon: '1️⃣', label: { tr: 'git log feature/hasan --oneline -5, SENİN…', en: 'git log feature/hasan --oneline -5 shows…' }, detail: { tr: "git log feature/hasan --oneline -5, SENİN o an bulunduğun branch'i DEĞİL, feature/hasan branch'inin GEÇMİŞİNİ görüntüler — checkout yapmadan BAŞKA bir branch'in commit'lerine BAKABİLİRSİN.", en: "git log feature/hasan --oneline -5 shows the HISTORY of the feature/hasan branch, NOT the branch you're currently on — you can LOOK at another branch's commits WITHOUT checking it out." } },
              { id: 2, icon: '2️⃣', label: { tr: '--oneline bayrağı her commit\'i…', en: 'The --oneline flag compresses…' }, detail: { tr: "--oneline bayrağı her commit'i TEK satıra (kısa hash + mesaj) SIKIŞTIRIR, -5 ise SADECE en SON 5 commit'i GÖSTERİR — büyük bir geçmişte hızlıca TARAMA yapmanı sağlar.", en: "The --oneline flag COMPRESSES each commit into ONE line (short hash + message), and -5 shows ONLY the LAST 5 commits — this lets you SCAN a large history quickly." } },
              { id: 3, icon: '3️⃣', label: { tr: 'Listede görünen d4e5f6a gibi kısa hash…', en: 'A short hash like d4e5f6a in the list…' }, detail: { tr: "Listede görünen d4e5f6a gibi kısa hash, o commit'in TAM İÇERİĞİNİN (diff, yazar, mesaj) BENZERSİZ bir PARMAK İZİDİR — bu hash'i bir SONRAKİ adımda cherry-pick'e VERECEKSİN.", en: "A short hash like d4e5f6a in the list is a UNIQUE FINGERPRINT of that commit's FULL content (diff, author, message) — you'll PASS this hash to cherry-pick in the NEXT step." } },
              { id: 4, icon: '4️⃣', label: { tr: 'git switch hotfix/release-1.4 çalıştırıldığında…', en: 'Running git switch hotfix/release-1.4…' }, detail: { tr: "git switch hotfix/release-1.4 çalıştırıldığında AKTİF branch DEĞİŞİR — artık bir SONRAKİ komut (cherry-pick) bu branch'in ÜZERİNE yeni bir commit EKLEYECEK, feature/hasan ETKİLENMEYECEK.", en: "Running git switch hotfix/release-1.4 CHANGES the ACTIVE branch — the NEXT command (cherry-pick) will ADD a new commit ON TOP OF this branch, feature/hasan stays UNAFFECTED." } },
              { id: 5, icon: '5️⃣', label: { tr: 'Bu iki adımın SIRASI önemlidir…', en: 'The ORDER of these two steps matters…' }, detail: { tr: "Bu iki adımın SIRASI önemlidir: ÖNCE hangi commit'in taşınacağını BUL, SONRA hedef branch'e GEÇ — ters sırada gidersen yanlış branch'teyken hash arama RİSKİ oluşur.", en: "The ORDER of these two steps matters: FIRST FIND which commit to move, THEN SWITCH to the target branch — reversing the order risks searching for the hash while on the WRONG branch." } },
            ],
          },
          {
            type: 'challenge',
            variant: 'order-sort',
            id: 'git-cherry-pick-find-order-01',
            question: { tr: 'Başka bir branch\'teki tek bir commit\'i hedeflemenin ilk adımlarını diz.', en: 'Order the first steps for targeting a single commit on another branch.' },
            items: [
              { id: '1', text: { tr: '`git log feature/hasan --oneline -5` ile commit hash\'ini bul', en: 'Run `git log feature/hasan --oneline -5` to find the commit hash' }, order: 1 },
              { id: '2', text: { tr: 'O tek fix\'in gitmesi gereken branch\'i belirle', en: 'Identify the branch that needs just that one fix' }, order: 2 },
              { id: '3', text: { tr: '`git switch hotfix/release-1.4` ile o branch\'e geç', en: 'Run `git switch hotfix/release-1.4` to move to that branch' }, order: 3 },
            ],
            xpReward: 10,
          },
          {
            type: 'code',
            label: 'Cherry-pick it, then handle a conflict if one appears',
            language: 'bash',
            code: `# 3. Apply just that one commit here
git cherry-pick d4e5f6a
# [hotfix/release-1.4 9f8e7d6] fix(login): handle empty password field

# If a conflict appears:
git status                  # See the conflicted file
# ...resolve manually...
git add tests/login.spec.js
git cherry-pick --continue`,
          },
          {
            type: 'code-playground',
              relatedTopicId: 'git-cherry-pick-practice-01',
            id: 'git-cherry-pick-practice-01',
            label: { tr: 'Micro Lab: git cherry-pick', en: 'Micro Lab: git cherry-pick' },
            language: 'bash',
            task: {
              tr: '`git log feature/hasan --oneline -5` ile `d4e5f6a` commit hash\'ini bul, `git switch hotfix/release-1.4` ile o branch\'e gec ve `git cherry-pick d4e5f6a` ile SADECE o commit\'i tasi. Java\'da bunu bir JAR\'dan tek bir sinifi baska bir projeye kopyalamaya benzet — tum tarihi degil, sadece o tek "parcayi" alirsin.',
              en: 'Find the commit hash `d4e5f6a` with `git log feature/hasan --oneline -5`, switch to that branch with `git switch hotfix/release-1.4`, and apply ONLY that commit with `git cherry-pick d4e5f6a`. Think of it like copying a single class from one Java project\'s JAR into another — you take just that one "piece", not the whole history.',
            },
            explanation: {
              tr: 'TODO satirini gercek `git cherry-pick d4e5f6a` komutuyla degistir. Sandbox gercek bir repo calistirmiyor; amac dogru hash ile dogru komutu elinle yazmak.',
              en: 'Replace the TODO line with the real `git cherry-pick d4e5f6a` command. The sandbox does not run a real repo; the goal is to type the correct command with the correct hash by hand.',
            },
            code: {
              tr: `git log feature/hasan --oneline -5\ngit switch hotfix/release-1.4\n// EKSIK: sadece d4e5f6a commit'ini buraya tasi\ngit log --oneline -1`,
              en: `git log feature/hasan --oneline -5\ngit switch hotfix/release-1.4\n// MISSING: bring only commit d4e5f6a here\ngit log --oneline -1`,
            },
            starterCode: {
              tr: `git log feature/hasan --oneline -5\ngit switch hotfix/release-1.4\n// TODO: sadece d4e5f6a commit'ini buraya tasi\ngit log --oneline -1`,
              en: `git log feature/hasan --oneline -5\ngit switch hotfix/release-1.4\n// TODO: bring only commit d4e5f6a here\ngit log --oneline -1`,
            },
            solutionCode: {
              tr: `git log feature/hasan --oneline -5\ngit switch hotfix/release-1.4\ngit cherry-pick d4e5f6a\ngit log --oneline -1`,
              en: `git log feature/hasan --oneline -5\ngit switch hotfix/release-1.4\ngit cherry-pick d4e5f6a\ngit log --oneline -1`,
            },
            expected: {
              tr: '`git log --oneline -1` artik `hotfix/release-1.4` uzerinde yeni bir commit (orijinal mesajla) gosterir; `feature/hasan`in geri kalani tasinmamistir.',
              en: '`git log --oneline -1` now shows a new commit on `hotfix/release-1.4` (with the original message); the rest of `feature/hasan` was not brought along.',
            },
            hints: [
              { tr: 'Once dogru hash\'i `git log <branch> --oneline` ile bul.', en: 'First find the right hash with `git log <branch> --oneline`.' },
              { tr: '`git cherry-pick <hash>` SADECE o tek commit\'in degisikliklerini uygular, tum branch\'i degil.', en: '`git cherry-pick <hash>` applies ONLY that single commit\'s changes, not the whole branch.' },
              { tr: 'Conflict cikarsa: duzelt, `git add`, sonra `git cherry-pick --continue`.', en: 'On conflict: fix it, `git add`, then `git cherry-pick --continue`.' },
            ],
            xpReward: 10,
          },
          {
            type: 'step-animation',
            id: 'git-cherry-pick-step-01',
            title: { tr: 'Adim Adim: git cherry-pick', en: 'Step by Step: git cherry-pick' },
            steps: [
              { id: 1, icon: '🔎', label: { tr: 'Commit\'i bul', en: 'Find the commit' }, detail: { tr: '`git log feature/hasan --oneline -5` ile `d4e5f6a fix(login): handle empty password field` satirini bul.', en: 'Run `git log feature/hasan --oneline -5` and find the line `d4e5f6a fix(login): handle empty password field`.' } },
              { id: 2, icon: '🎯', label: { tr: 'Hedef branch\'e gec', en: 'Switch to the target branch' }, detail: { tr: '`git switch hotfix/release-1.4` ile o tek fix\'in gitmesi gereken branch\'e gec.', en: 'Run `git switch hotfix/release-1.4` to move to the branch that needs just that one fix.' } },
              { id: 3, icon: '🍒', label: { tr: 'Cherry-pick et', en: 'Cherry-pick it' }, detail: { tr: '`git cherry-pick d4e5f6a` calistir: Git o commit\'in diff\'ini alip burada yeni bir commit olarak uygular.', en: 'Run `git cherry-pick d4e5f6a`: Git takes that commit\'s diff and applies it here as a new commit.' } },
              { id: 4, icon: '⚠️', label: { tr: 'Conflict varsa coz', en: 'Resolve conflicts if any' }, detail: { tr: '`git status` ile conflict\'li dosyayi gor, duzelt, `git add` ile isaretle.', en: 'Run `git status` to see the conflicted file, fix it, mark it with `git add`.' } },
              { id: 5, icon: '✅', label: { tr: 'Devam et veya dogrula', en: 'Continue or verify' }, detail: { tr: 'Conflict varsa `git cherry-pick --continue`; yoksa direkt `git log --oneline -1` ile yeni commit\'i dogrula.', en: 'If there was a conflict, run `git cherry-pick --continue`; otherwise verify directly with `git log --oneline -1`.' } },
            ],
          },
          {
            type: 'challenge',
            variant: 'order-sort',
            id: 'git-cherry-pick-order-01',
            question: { tr: 'Tek bir commit\'i baska branch\'e tasima akisini sirala.', en: 'Order the flow for moving a single commit to another branch.' },
            items: [
              { id: '1', text: { tr: '`git log feature/hasan --oneline -5` ile hash\'i bul', en: 'Run `git log feature/hasan --oneline -5` to find the hash' }, order: 1 },
              { id: '2', text: { tr: '`git switch hotfix/release-1.4` ile hedef branch\'e gec', en: 'Run `git switch hotfix/release-1.4` to move to the target branch' }, order: 2 },
              { id: '3', text: { tr: '`git cherry-pick d4e5f6a` ile sadece o commit\'i uygula', en: 'Run `git cherry-pick d4e5f6a` to apply just that commit' }, order: 3 },
              { id: '4', text: { tr: 'Conflict cikarsa duzelt ve `git add` ile isaretle', en: 'If a conflict appears, fix it and mark with `git add`' }, order: 4 },
              { id: '5', text: { tr: '`git cherry-pick --continue` ile bitir', en: 'Run `git cherry-pick --continue` to finish' }, order: 5 },
            ],
            xpReward: 10,
          },
          {
            type: 'warning',
            content: 'Merge vs rebase rule of thumb: use the team convention. Never rebase a shared branch casually; if history rewrite is truly agreed, prefer `git push --force-with-lease`, not plain `--force`.',
          },
          {
            type: 'code',
            label: 'Conflict resolution checklist after seeing the animation',
            language: 'bash',
            code: `git status                          # See conflicted files
code tests/login.spec.js             # Read <<<<<<< ======= >>>>>>> markers
# Write the final behavior; do not just delete random lines
npm test -- login.spec.js            # Prove the resolved behavior
git add tests/login.spec.js          # Mark conflict as resolved
git rebase --continue                # Or: git commit if you were merging`,
          },
          {
            type: 'code-playground',
              relatedTopicId: 'git-rebase-practice-01',
            id: 'git-rebase-practice-01',
            label: { tr: 'Micro Lab: git rebase', en: 'Micro Lab: git rebase' },
            language: 'bash',
            task: {
              tr: '`feature/hasan` branch\'ini `git rebase main` ile main\'in ucuna tasi, conflict cikarsa `tests/login.spec.js` dosyasini duzelt, `git add` ile isaretle ve `git rebase --continue` ile devam et. Java\'da bunu bir Maven/Gradle dependency tree\'sini yeniden hesaplamaya benzet — rebase de commit\'lerin "temelini" yeniden hesaplar.',
              en: 'Move `feature/hasan` onto the tip of main with `git rebase main`; if a conflict appears, fix `tests/login.spec.js`, mark it with `git add`, then continue with `git rebase --continue`. Think of it like recalculating a Maven/Gradle dependency tree in Java — rebase recalculates the commit "base" the same way.',
            },
            explanation: {
              tr: 'TODO satirini gercek `git rebase main` komutuyla degistir. Sandbox gercek bir repo calistirmiyor; amac dogru sirayi elinle kurmak.',
              en: 'Replace the TODO line with the real `git rebase main` command. The sandbox does not run a real repo; the goal is to build the correct order by hand.',
            },
            code: {
              tr: `git switch feature/hasan\n// EKSIK: feature/hasan'i main'in ucuna rebase et\ngit add tests/login.spec.js\ngit rebase --continue`,
              en: `git switch feature/hasan\n// MISSING: rebase feature/hasan onto main\ngit add tests/login.spec.js\ngit rebase --continue`,
            },
            starterCode: {
              tr: `git switch feature/hasan\n// TODO: feature/hasan'i main'in ucuna rebase et\ngit add tests/login.spec.js\ngit rebase --continue`,
              en: `git switch feature/hasan\n// TODO: rebase feature/hasan onto main\ngit add tests/login.spec.js\ngit rebase --continue`,
            },
            solutionCode: {
              tr: `git switch feature/hasan\ngit rebase main\ngit add tests/login.spec.js\ngit rebase --continue`,
              en: `git switch feature/hasan\ngit rebase main\ngit add tests/login.spec.js\ngit rebase --continue`,
            },
            expected: {
              tr: '`git rebase --continue` sonunda "Successfully rebased" mesaji gorursun; commit hash\'leri yeniden yazilmis olur.',
              en: 'After `git rebase --continue` you see a "Successfully rebased" message; the commit hashes have been rewritten.',
            },
            hints: [
              { tr: '`git rebase main` feature branch\'in commit\'lerini main\'in en tepesine tek tek yeniden uygular.', en: '`git rebase main` reapplies your feature branch\'s commits one by one on top of main.' },
              { tr: 'Conflict cikinca once dosyayi elle duzelt, sonra `git add`, sonra `git rebase --continue`.', en: 'On conflict, fix the file by hand first, then `git add`, then `git rebase --continue`.' },
              { tr: 'Paylasilmis (push edilmis) bir branch\'i rebase etmeden once takim ile anlas.', en: 'Agree with the team before rebasing a branch that has already been pushed/shared.' },
            ],
            xpReward: 10,
          },
          {
            type: 'step-animation',
            id: 'git-rebase-step-01',
            title: { tr: 'Adim Adim: git rebase', en: 'Step by Step: git rebase' },
            steps: [
              { id: 1, icon: '🎯', label: { tr: 'Hedef branch\'e bak', en: 'Target the base branch' }, detail: { tr: '`git switch feature/hasan` ile rebase edilecek branch\'te oldugunu dogrula.', en: 'Run `git switch feature/hasan` to confirm you are on the branch to be rebased.' } },
              { id: 2, icon: '🪜', label: { tr: 'Rebase\'i baslat', en: 'Start the rebase' }, detail: { tr: '`git rebase main` calistir: Git senin commit\'lerini tek tek main\'in ucuna tasimaya baslar.', en: 'Run `git rebase main`: Git starts replaying your commits one by one on top of main.' } },
              { id: 3, icon: '🧨', label: { tr: 'Conflict markerlarini gor', en: 'See the conflict markers' }, detail: { tr: '`<<<<<<< HEAD` / `=======` / `>>>>>>> main` arasinda hangi satirin kalacagina karar ver.', en: 'Decide which lines stay between `<<<<<<< HEAD` / `=======` / `>>>>>>> main`.' } },
              { id: 4, icon: '✅', label: { tr: 'Cozumu isaretle', en: 'Mark the resolution' }, detail: { tr: '`git add tests/login.spec.js` ile bu commit adimi icin conflict\'in cozuldugunu Git\'e soyle.', en: 'Run `git add tests/login.spec.js` to tell Git this conflict is resolved for this replay step.' } },
              { id: 5, icon: '➡️', label: { tr: 'Devam et', en: 'Continue the rebase' }, detail: { tr: '`git rebase --continue` ile bir sonraki commit\'in replay\'ine gec; tum commit\'ler bitince "Successfully rebased" mesaji gelir.', en: 'Run `git rebase --continue` to move to replaying the next commit; once all commits are done you see "Successfully rebased".' } },
            ],
          },
          gitRebaseReplayFilm,
          {
            type: 'challenge',
            variant: 'order-sort',
            id: 'git-rebase-order-01',
            question: { tr: 'Conflict\'li bir rebase\'i guvenli sirayla bitir.', en: 'Finish a conflicting rebase in the safe order.' },
            items: [
              { id: '1', text: { tr: '`git rebase main` ile rebase\'i baslat', en: 'Run `git rebase main` to start the rebase' }, order: 1 },
              { id: '2', text: { tr: '`git status` ile conflict\'li dosyalari gor', en: 'Run `git status` to see the conflicted files' }, order: 2 },
              { id: '3', text: { tr: 'Conflict marker\'lari arasinda dogru satiri elle sec', en: 'Manually choose the correct lines between the conflict markers' }, order: 3 },
              { id: '4', text: { tr: '`git add tests/login.spec.js` ile cozumu isaretle', en: 'Run `git add tests/login.spec.js` to mark the resolution' }, order: 4 },
              { id: '5', text: { tr: '`git rebase --continue` ile bir sonraki commit\'e gec', en: 'Run `git rebase --continue` to move to the next commit' }, order: 5 },
            ],
            xpReward: 10,
          },
          {
            type: 'git-practice',
            icon: '🧯',
            title: { en: 'Try it yourself: safe conflict finish', tr: 'Kendin dene: conflict’i güvenli bitir' },
            intro: { en: 'Put the commands in a safe order after conflict markers have been resolved in the file.', tr: 'Dosyadaki conflict markerları çözüldükten sonra komutları güvenli sıraya koy.' },
            starterCommands: `git rebase --continue
git add tests/login.spec.js
npm test -- login.spec.js
git status`,
            expectedSteps: [
              { pattern: 'git\\s+status', label: { en: 'Inspect what Git still sees as conflicted', tr: 'Git’in hâlâ neyi conflicted gördüğünü kontrol et' }, example: 'git status' },
              { pattern: 'npm\\s+test\\s+--\\s+login\\.spec\\.js', label: { en: 'Run the relevant test before continuing', tr: 'Devam etmeden önce ilgili testi çalıştır' }, example: 'npm test -- login.spec.js' },
              { pattern: 'git\\s+add\\s+tests\\/login\\.spec\\.js', label: { en: 'Mark the resolved file as resolved', tr: 'Çözülen dosyayı resolved olarak işaretle' }, example: 'git add tests/login.spec.js' },
              { pattern: 'git\\s+rebase\\s+--continue', label: { en: 'Continue the operation you started', tr: 'Başlattığın operasyonu devam ettir' }, example: 'git rebase --continue' },
            ],
            successOutput: { en: 'Conflict finished in a safe order: inspect → test → add → continue.', tr: 'Conflict güvenli sırayla bitti: kontrol → test → add → continue.' },
            retryOutput: { en: 'Do not continue before test and add. The safe order is status, test, add, continue.', tr: 'Test ve add yapmadan continue etme. Güvenli sıra: status, test, add, continue.' },
            help: { en: 'This practice assumes you already edited the file and removed the conflict markers intentionally.', tr: 'Bu alıştırma dosyayı düzenleyip conflict markerlarını bilinçli şekilde kaldırdığını varsayar.' },
          },
          {
            type: 'quiz',
            question: 'You rebased a branch that was already shared. What is the safe push command if your team agreed to rewrite it?',
            options: [
              { id: 'a', text: 'git push --force' },
              { id: 'b', text: 'git push --force-with-lease' },
              { id: 'c', text: 'git pull --rebase --hard' },
              { id: 'd', text: 'git reset origin/main' },
            ],
            correct: 'b',
            explanation: '`--force-with-lease` checks that the remote branch did not move unexpectedly, reducing the chance of overwriting a teammate.',
          
        retryQuestion: {
      "question": "When you need to force-push to a branch that others are also working on, which command is considered the professional standard to prevent accidental overwriting of others' work?",
      "options": [
            {
                  "id": "a",
                  "text": "git push --force"
            },
            {
                  "id": "b",
                  "text": "git push --force-with-lease"
            },
            {
                  "id": "c",
                  "text": "git push --all --soft"
            },
            {
                  "id": "d",
                  "text": "git push --mirror"
            }
      ],
      "correct": "b",
      "explanation": "'--force-with-lease' is a safer alternative to '--force'. It verifies that the remote branch has not been updated by someone else since your last fetch; if it has, the push will be rejected, preventing you from silently deleting a colleague's contributions."
}
},
        ],
      },
      {
        title: '🐙 GitHub Workflow: Repository, Remote, Pull Request, Review',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🏢',
            content: 'GitHub is the air traffic control tower for your team\'s code: every pilot (developer) has their own runway (branch), but before any plane lands on the main runway (main), the tower approves the flight path, checks for conflicts with other aircraft, and only then clears landing. The "why" question that unlocks real understanding: if Git already lets you push to main directly, why does GitHub add this entire pull request layer on top? Because Git is a solo tool — it only tracks history; GitHub is the collaboration protocol that enforces review, runs automated checks, and creates an audit trail that answers "who approved this security patch and what did the CI report look like when it merged?" Java analogy: GitHub\'s repository model is like Maven Central with access control — pushing to it requires authentication, versioning, and meeting standards, not just copying a jar onto a server. In QA automation, the GitHub workflow catches test files pushed without running locally, detects secrets accidentally included in environment setup scripts, and provides the paper trail needed for compliance audits.',
          },
          {
            type: 'simulation',
            scenario: 'github-pr-flow',
            icon: '🐙',
            color: '#2563eb',
            title: { en: 'Animate a Real Pull Request Flow', tr: 'Gerçek Pull Request Akışını Canlandır' },
            description: { en: 'Follow a test branch from local work to PR, review, CI checks and merge.', tr: 'Bir test branch’inin lokal çalışmadan PR, review, CI checks ve merge adımına gidişini izle.' },
            code: `# Create a reviewable QA change
git fetch origin
git switch -c feature/login-tests
git add tests/login.spec.js
git commit -m "test: add login regression checks"
git push -u origin feature/login-tests
# Open Pull Request on GitHub, request review, wait for checks`,
            language: 'bash',
          },
          gitPrPractice,
          gitRemoteSyncFilm,
          {
            type: 'grid',
            cols: 2,
            items: [
              { icon: '📝', label: 'PR description', desc: 'Explain what changed, how it was tested, screenshots/reports and related issue.' },
              { icon: '✅', label: 'Required checks', desc: 'Unit, lint, e2e, smoke or build checks that must pass before merge.' },
              { icon: '👀', label: 'Reviewers', desc: 'Use code owners or specific reviewers for test infrastructure changes.' },
              { icon: '🧭', label: 'Traceability', desc: 'Link issues, test cases, bugs and release notes to the PR.' },
            ],
          },
          {
            type: 'warning',
            content: 'Avoid direct pushes to `main`. In professional teams, `main` should be protected with PR review and required checks. A direct push can bypass test evidence and make rollback harder.',
          },
          {
            type: 'quiz',
            question: 'On a professional team, why should you avoid pushing directly to `main` instead of always going through a Pull Request?',
            options: [
              { id: 'a', text: 'Direct push is slower than opening a PR' },
              { id: 'b', text: 'It bypasses code review and required checks, making bad changes and rollback harder to manage' },
              { id: 'c', text: 'GitHub does not allow direct pushes at all' },
              { id: 'd', text: 'Direct push deletes the commit history' },
            ],
            correct: 'b',
            explanation: 'A protected `main` requires PR review and passing checks (tests, lint, build) before code lands — this is the gate that catches mistakes before they reach production. A direct push skips that gate entirely: no second pair of eyes, no CI evidence that tests pass, and if something breaks, there is no documented PR to revert cleanly.',
            retryQuestion: {
              question: 'A repository has branch protection enabled on `main` requiring 1 approval and passing CI. What happens if someone tries `git push origin main` directly with a local commit?',
              options: [
                { id: 'a', text: 'GitHub silently merges it without review' },
                { id: 'b', text: 'GitHub rejects the push because the protection rule requires changes to go through a reviewed, passing Pull Request' },
                { id: 'c', text: 'The push succeeds but is automatically reverted a day later' },
                { id: 'd', text: 'GitHub disables branch protection automatically for emergencies' },
              ],
              correct: 'b',
              explanation: 'Branch protection rules are enforced by GitHub itself, not just a team convention — once enabled, a direct push to a protected branch is rejected outright, forcing every change through a Pull Request that satisfies the configured requirements (review count, required status checks). This is what actually makes "always go through PR" enforceable instead of just a polite request.',
            },
          },
        ],
      },
      {
        title: '🧾 Pull Request: Open, Review, Approve, Request Changes and Resolve Conflicts',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🧾',
            content: 'A Pull Request is the same as submitting a scientific paper for peer review before publication: you do not just email the final PDF to the journal — you submit it through a structured process where reviewers see exactly what changed from the previous version, leave line-level comments, and the paper is only published after passing both human review and automated editorial checks. The question that reveals depth: why not just review code by reading it on Slack or in a shared doc — what does a PR add that a chat message cannot? A PR preserves the review conversation permanently next to the exact lines that were discussed, links the CI result to the specific commit, and creates a merge decision record that is auditable months later when a compliance team asks "who verified this authentication change?" Java analogy: a PR is like a formal code review gate in a Java team\'s Definition of Done — the code exists in a feature branch (like a local branch in development), and only after static analysis (CI checks), unit test coverage (test jobs), and peer sign-off (approvals) does it get merged, mirroring how a class gets promoted from dev to production artifact. For QA, a PR blocked by a failing Playwright test is the mechanism that stops a broken login flow from reaching users — without it, the flaky test is just a local annoyance that sneaks into production.',
          },
          {
            type: 'simulation',
            scenario: 'github-pull-request-ui-tour',
            icon: '🧾',
            color: '#2563eb',
            title: { en: 'GitHub Pull Request screen tour: compare, create, review and merge', tr: 'GitHub Pull Request ekran turu: compare, create, review ve merge' },
            description: { en: 'Walk through a GitHub-like PR interface: Pull requests tab, compare branches, Create pull request form, Conversation, Files changed, review decision, checks and merge button.', tr: 'GitHub benzeri PR arayüzünü gez: Pull requests tabı, branch karşılaştırma, Create pull request formu, Conversation, Files changed, review kararı, checks ve merge butonu.' },
          },
          {
            type: 'heading',
            text: 'What is a Pull Request really for?',
          },
          {
            type: 'table',
            headers: ['PR area', 'Purpose', 'Real-work rule'],
            rows: [
              ['Pull requests tab', 'Lists open/closed PRs and starts a new PR', 'Do not merge work that nobody can review'],
              ['base / compare', 'base is the target branch, compare is your feature branch', 'Usually base is main and compare is feature/...'],
              ['PR title', 'A short intent statement', 'Prefer "test: add login regression checks" over vague text'],
              ['Description', 'Explains what changed, why, how it was tested and links issues', 'Include test evidence, screenshots, reports or risk notes'],
              ['Conversation tab', 'Discussion, timeline, CI summary and merge box live here', 'A reviewer should understand the story without asking in chat'],
              ['Files changed tab', 'Line-by-line diff review area', 'Review behavior, tests and hidden side effects, not only syntax'],
              ['Review changes', 'Submit Comment, Approve or Request changes', 'Approve means merge-ready from your perspective; Request changes blocks merge'],
              ['Checks', 'Actions status for tests/build/lint', 'Green review is not enough if required checks are red'],
              ['Merge pull request', 'Combines approved PR into main', 'Only merge after approvals, green checks and no unresolved conversations'],
            ],
          },
          githubPrOpenUiPractice,
          {
            type: 'heading',
            text: 'How code review works',
          },
          {
            type: 'simulation',
            scenario: 'github-pr-review-conflict-ui',
            icon: '👀',
            color: '#7c3aed',
            title: { en: 'Review, approve, request changes and conflict screen', tr: 'Review, approve, request changes ve conflict ekranı' },
            description: { en: 'See the real GitHub review shape: Files changed, line comment, Start a review, Review changes, Approve/Request changes, merge blocked by conflict, local conflict fix and green merge box.', tr: 'Gerçek GitHub review şeklini gör: Files changed, satır yorumu, Start a review, Review changes, Approve/Request changes, conflict yüzünden merge blocked, lokal conflict fix ve yeşil merge kutusu.' },
          },
          {
            type: 'table',
            headers: ['Review decision', 'What it means', 'When to use it'],
            rows: [
              ['Comment', 'Leaves feedback without approving or blocking', 'Question, optional suggestion, documentation note'],
              ['Approve', 'Reviewer accepts the change from their perspective', 'Behavior is clear, tests are enough, no blocking issue remains'],
              ['Request changes', 'Blocks merge until author fixes the issue', 'Bug risk, missing test, unsafe secret, broken contract, unclear design'],
              ['Dismiss review', 'Admin/maintainer removes a stale review decision', 'Use rarely and explain why; never hide real risk'],
              ['Resolve conversation', 'Marks a review thread as handled', 'Only after the comment was answered or fixed'],
            ],
          },
          githubPrReviewPractice,
          {
            type: 'heading',
            text: 'Can PR conflicts be resolved?',
          },
          {
            type: 'text',
            content: 'Yes. GitHub can sometimes offer a web conflict editor for simple text conflicts, but real QA work is safer locally because you can run tests. The normal flow is: fetch the latest main, switch to your PR branch, merge origin/main, edit conflict markers, run the relevant test, commit the fix and push. The PR updates automatically.',
          },
          githubPrConflictPractice,
          githubPrLifecycleFilm,
          {
            type: 'warning',
            content: 'Real-work danger: do not click Merge pull request just because GitHub lets you. Check unresolved conversations, required checks, requested changes, test evidence, branch freshness and deployment risk first.',
          },
          {
            type: 'code',
            label: 'PR author checklist before asking for review',
            language: 'bash',
            code: `git status
npm test -- login.spec.js
git push -u origin feature/login-tests
# On GitHub:
# 1. Open Pull requests → New pull request
# 2. base: main, compare: feature/login-tests
# 3. Write title + description + test evidence
# 4. Request reviewer
# 5. Wait for checks and review`,
          },
          {
            type: 'step-animation',
            id: 'git-pr-checklist-step-01',
            title: { tr: 'PR Author Checklist\'indeki Her Adım Neyi Kanıtlar?', en: 'What Does Each Step of the PR Author Checklist Actually Prove?' },
            steps: [
              { id: 1, icon: '1️⃣', label: { tr: 'git status çalıştırılması…', en: 'Running git status…' }, detail: { tr: 'git status çalıştırılması, PUSH etmeden ÖNCE hangi dosyaların DEĞİŞTİĞİNİ ve stage\'de olduğunu GÖRMENİ sağlar — sürpriz bir dosyanın YANLIŞLIKLA PR\'a girmesini ÖNLER.', en: 'Running git status LETS you SEE which files CHANGED and are staged BEFORE pushing — it PREVENTS a surprise file from ACCIDENTALLY entering the PR.' } },
              { id: 2, icon: '2️⃣', label: { tr: 'npm test -- login.spec.js…', en: 'npm test -- login.spec.js…' }, detail: { tr: "npm test -- login.spec.js İLGİLİ testin LOKALDE geçtiğini kanıtlar — CI'nin RED vermesini BEKLEMEDEN, hatayı KENDİ makinende YAKALARSIN.", en: "npm test -- login.spec.js PROVES the RELEVANT test passes LOCALLY — you CATCH the error on YOUR OWN machine WITHOUT waiting for CI to turn RED." } },
              { id: 3, icon: '3️⃣', label: { tr: 'git push -u origin feature/login-tests…', en: 'git push -u origin feature/login-tests…' }, detail: { tr: 'git push -u origin feature/login-tests, LOKAL branch\'i GitHub\'da bir REMOTE branch olarak YAYINLAR — bu olmadan GitHub\'da bir PR açacak HİÇBİR ŞEY olmaz.', en: 'git push -u origin feature/login-tests PUBLISHES the LOCAL branch as a REMOTE branch on GitHub — without this, there is NOTHING to open a PR against.' } },
              { id: 4, icon: '4️⃣', label: { tr: 'base: main / compare: feature/login-tests SEÇİMİ…', en: 'The base: main / compare: feature/login-tests choice…' }, detail: { tr: '"New pull request" ekranında base: main / compare: feature/login-tests SEÇİMİ, GitHub\'a "bu DEĞİŞİKLİĞİ NEREYE birleştirmek istiyorum" der.', en: 'On the "New pull request" screen, choosing base: main / compare: feature/login-tests TELLS GitHub "WHERE I want to merge this CHANGE INTO".' } },
              { id: 5, icon: '5️⃣', label: { tr: 'Test kanıtı İÇEREN bir açıklama YAZMAK…', en: 'Writing a description WITH test evidence…' }, detail: { tr: 'Test kanıtı (screenshot/log) İÇEREN bir açıklama YAZMAK, reviewer\'ın "çalıştığını NASIL biliyorsun?" sorusunu SORMADAN cevaplamasını sağlar — review SÜRESİNİ kısaltır.', en: 'Writing a description WITH test evidence (screenshot/log) ANSWERS the reviewer\'s "HOW do you know it works?" question BEFORE it\'s ASKED — it SHORTENS the review time.' } },
            ],
          },
          gitPrPushPractice,
          {
            type: 'challenge',
            variant: 'order-sort',
            id: 'git-pr-checklist-order-01',
            question: { tr: 'Review istemeden önceki PR author checklist sırasını diz.', en: 'Order the PR author checklist before asking for review.' },
            items: [
              { id: '1', text: { tr: 'git status ile değişiklikleri kontrol et', en: 'Check the changes with git status' }, order: 1 },
              { id: '2', text: { tr: 'İlgili testi lokalde çalıştır (npm test -- login.spec.js)', en: 'Run the relevant test locally (npm test -- login.spec.js)' }, order: 2 },
              { id: '3', text: { tr: "git push -u origin feature/login-tests ile branch'i yayınla", en: 'Publish the branch with git push -u origin feature/login-tests' }, order: 3 },
              { id: '4', text: { tr: "GitHub'da base/compare seçerek PR aç", en: 'Open a PR on GitHub by choosing base/compare' }, order: 4 },
              { id: '5', text: { tr: 'Test kanıtıyla açıklama yaz ve reviewer iste', en: 'Write a description with test evidence and request a reviewer' }, order: 5 },
            ],
            xpReward: 10,
          },
          {
            type: 'quiz',
            question: 'A reviewer finds a missing negative login test that can let a bug reach main. Which review decision is correct?',
            options: [
              { id: 'a', text: 'Approve, because the code compiles' },
              { id: 'b', text: 'Comment only, because tests are optional' },
              { id: 'c', text: 'Request changes and explain the missing test' },
              { id: 'd', text: 'Merge pull request immediately' },
            ],
            correct: 'c',
            explanation: 'A missing test that can let a real bug through is blocking feedback. Request changes keeps the PR out of main until the risk is handled.',
          
        retryQuestion: {
      "question": "A pull request introduces a new payment processing function but lacks a unit test for handling invalid credit card inputs. What is the most professional review action?",
      "options": [
            {
                  "id": "a",
                  "text": "Approve, since payment functionality is complex and can be tested later"
            },
            {
                  "id": "b",
                  "text": "Merge the PR and create a ticket for the missing test in the next sprint"
            },
            {
                  "id": "c",
                  "text": "Request changes, highlighting that invalid input handling is a critical test coverage gap"
            },
            {
                  "id": "d",
                  "text": "Ignore the missing test if the manual QA team has already verified it"
            }
      ],
      "correct": "c",
      "explanation": "Security and stability require proper test coverage for edge cases. Requesting changes ensures that the code meets quality standards before it ever reaches the main branch."
}
},
        ],
      },
      {
        title: '🚀 GitHub Actions for QA: CI, Reports, Matrix and Secrets',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🏭',
            content: 'GitHub Actions is like the automatic quality checkpoint belt at an airport security lane: every bag (commit or PR) that passes the sensor triggers the same sequence of checks — X-ray, metal detector, weight limit — and the bag only exits the lane if all checks pass, regardless of which passenger carried it or how confident they felt about it. The "why" question worth holding: your tests already pass locally, so why run them again on GitHub\'s machines? Because "works on my laptop" is not a contract — it depends on your specific OS, Node version, installed browser binaries, and the environment variables that happen to be set. Java analogy: GitHub Actions plays the role of a Maven CI build server like Jenkins did in Java teams — the YAML workflow file is your pipeline definition, jobs are your build phases (compile → test → package → deploy), and the runner is the clean-room JVM that has never seen your local .m2 cache. The QA business case is stark: without Actions, a test that only fails on Linux/Chrome goes undetected until a user reports it in production, because the Windows/Firefox developer never hit it; Actions matrix builds catch exactly that class of environment-specific regression before merge.',
          },
          {
            type: 'simulation',
            scenario: 'github-actions-ui-tour',
            icon: '🚀',
            color: '#2563eb',
            title: { en: 'GitHub Actions screen tour: buttons, runs and reports', tr: 'GitHub Actions ekran turu: butonlar, run’lar ve raporlar' },
            description: { en: 'Walk through the real GitHub Actions interface shape: top Actions tab, New workflow, workflow list, run rows, filters, logs, artifacts and rerun controls.', tr: 'Gerçek GitHub Actions arayüz şeklini gez: üst Actions tabı, New workflow, workflow listesi, run satırları, filter, loglar, artifact ve rerun kontrolleri.' },
          },
          {
            type: 'heading',
            text: 'What do the Actions screen buttons do?',
          },
          {
            type: 'table',
            headers: ['UI area', 'What it does', 'When a QA engineer uses it'],
            rows: [
              ['Actions top tab', 'Opens CI/CD runs for the repository', 'Check whether a PR or main deploy passed'],
              ['New workflow', 'Creates a new workflow file under `.github/workflows/` from a template or blank YAML', 'Add first CI, Playwright, Maven or Pages deploy workflow'],
              ['All workflows', 'Shows runs from every workflow together', 'See the newest failures without guessing the workflow name'],
              ['Workflow name in sidebar', 'Filters runs to one workflow', 'Open only "Deploy site" or only "QA Checks"'],
              ['Filter workflow runs', 'Search/filter by text', 'Find a commit, branch, actor or failed run quickly'],
              ['Run row', 'Opens one workflow execution', 'Read jobs, logs, annotations and artifacts'],
              ['Green/red status icon', 'Shows success/failure/cancelled state', 'Know if the quality gate passed before merge/deploy'],
              ['Three-dot menu / rerun controls', 'Rerun all jobs or failed jobs', 'Use after flaky infrastructure or after fixing environment problems'],
              ['Artifacts', 'Download saved reports, screenshots and traces', 'Debug failed browser/API tests without reproducing locally'],
              ['Caches / Runners / Usage metrics', 'Management tools for speed, runner health and cost/usage visibility', 'Investigate slow CI, stale cache or runner capacity problems'],
            ],
          },
          githubActionsUiPractice,
          {
            type: 'simulation',
            scenario: 'github-actions-pages',
            icon: '🚀',
            color: '#7c3aed',
            title: { en: 'Actions Pipeline: Push to Live Site', tr: 'Actions Pipeline: Push’tan Canlı Siteye' },
            description: { en: 'Watch a GitHub Actions workflow install dependencies, test, build and deploy to GitHub Pages.', tr: 'GitHub Actions workflow’unun bağımlılık kurup test, build ve GitHub Pages deploy yapmasını izle.' },
            code: `name: QA Checks
on:
  pull_request:                    # Run before merge
  push:
    branches: [main]               # Run again after merge

jobs:
  test:
    runs-on: ubuntu-latest          # GitHub-hosted Linux runner
    steps:
      - uses: actions/checkout@v4   # Download repository code
      - uses: actions/setup-node@v4 # Install Node runtime
        with:
          node-version: 20
          cache: npm
      - run: npm ci                 # Clean install from package-lock
      - run: npm test               # Run QA checks
      - run: npm run build          # Prove the app builds`,
            language: 'yaml',
          },
          {
            type: 'heading',
            text: 'Workflow anatomy',
          },
          {
            type: 'table',
            headers: ['YAML part', 'Meaning', 'QA example'],
            rows: [
              ['on', 'Which event starts the workflow', 'pull_request for PR checks, push to main for deploy'],
              ['jobs', 'Independent units of work', 'test, build, deploy'],
              ['runs-on', 'Runner machine', 'ubuntu-latest, windows-latest, macos-latest'],
              ['steps', 'Ordered commands inside a job', 'checkout, setup, install, test, upload report'],
              ['permissions', 'Token capabilities', 'read for tests, pages write for deploy'],
              ['artifacts', 'Files saved after the run', 'HTML report, screenshots, Playwright traces'],
            ],
          },
          {
            type: 'code',
            label: 'Upload Playwright artifacts after failed tests',
            language: 'yaml',
            code: `- name: Run Playwright tests
  run: npx playwright test              # Execute browser tests

- name: Upload Playwright report
  if: always()                          # Upload even when tests fail
  uses: actions/upload-artifact@v4
  with:
    name: playwright-report
    path: playwright-report/
    retention-days: 7                   # Keep reports long enough for debugging`,
          },
          githubActionsTriggerFilm,
          {
            type: 'warning',
            content: 'Never print secrets in workflow logs. Use repository or environment secrets, keep permissions minimal, and remember that secrets are restricted for untrusted fork pull requests.',
          },
          {
            type: 'quiz',
            question: 'You want a workflow that blocks a Pull Request from being merged whenever the test job fails. Which `on:` trigger fits this QA gatekeeping use case?',
            options: [
              { id: 'a', text: 'on: push (to main)' },
              { id: 'b', text: 'on: pull_request' },
              { id: 'c', text: 'on: schedule' },
              { id: 'd', text: 'on: workflow_dispatch' },
            ],
            correct: 'b',
            explanation: "`on: pull_request` runs the workflow on every PR update and surfaces pass/fail status as a required check before merge — exactly the gatekeeping behavior QA wants. `on: push` (to main) only runs AFTER code is already merged, which is useful for deploys but too late to block a bad PR. `schedule` and `workflow_dispatch` are for periodic or manually triggered runs, not merge gating.",
            retryQuestion: {
              question: 'A team wants a workflow to deploy to production automatically the moment code lands on `main`, but NOT on every PR (to avoid deploying unreviewed code). Which trigger fits?',
              options: [
                { id: 'a', text: 'on: pull_request' },
                { id: 'b', text: 'on: push (filtered to the main branch)' },
                { id: 'c', text: 'on: schedule' },
                { id: 'd', text: 'on: workflow_dispatch only' },
              ],
              correct: 'b',
              explanation: '`on: push` restricted to `main` runs the workflow only when commits actually land there — i.e. after a PR has already been reviewed and merged, which is exactly the right moment to deploy. `on: pull_request` would deploy unreviewed code from every PR update, `schedule` runs on a timer unrelated to merges, and `workflow_dispatch` only fires when someone manually triggers it.',
            },
          },
        ],
      },
      {
        title: '🌐 GitHub Pages: Static Deploy, Custom Domain and SPA Fallback',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🏡',
            content: 'GitHub Pages is like a vending machine for your website: you load the pre-packaged products (HTML, CSS, JS files) into the slots, the machine dispenses them on demand to anyone who walks up — but it cannot cook anything fresh, it can only serve what was already sealed inside. The "why" question that sharpens the concept: if you have a React app that works perfectly in your browser after `npm run build`, why does directly opening the `/login` URL on Pages return a 404? Because Pages is a file server, not a router — it looks for a literal file at `dist/login/index.html`, but a Single Page Application has only one real HTML file (`dist/index.html`) and handles all routing in JavaScript. Java analogy: deploying to GitHub Pages is the opposite of deploying a Spring Boot JAR — a JAR brings its own embedded Tomcat server that handles dynamic routes at runtime, while Pages deployment is like publishing only the static assets that Tomcat would have served, with no Tomcat present. For QA, this means automated tests that hit `/dashboard` directly via `page.goto()` will fail on the deployed Pages site unless you have added a static fallback shell for that route — a gap that only shows up in end-to-end tests against the deployed URL, not in local dev.',
          },
          {
            type: 'simulation',
            scenario: 'github-pages-settings-ui',
            icon: '🌐',
            color: '#0ea5e9',
            title: { en: 'GitHub Pages settings screen: source, domain, HTTPS and live site', tr: 'GitHub Pages Settings ekranı: source, domain, HTTPS ve canlı site' },
            description: { en: 'See where Pages lives inside Settings and what Visit site, Unpublish site, Source, Custom domain, Save, Remove and Enforce HTTPS do.', tr: 'Pages’in Settings içinde nerede olduğunu ve Visit site, Unpublish site, Source, Custom domain, Save, Remove, Enforce HTTPS kontrollerinin ne yaptığını gör.' },
          },
          {
            type: 'heading',
            text: 'What do the Pages screen controls do?',
          },
          {
            type: 'table',
            headers: ['Control', 'Purpose', 'Be careful about'],
            rows: [
              ['Your site is live at', 'Shows the current public Pages URL', 'If this URL is wrong, DNS or source may be wrong'],
              ['Visit site', 'Opens the live published site', 'Always verify after deploy, not only after local build'],
              ['Unpublish site', 'Stops serving the Pages site', 'Dangerous on production docs/portfolio sites'],
              ['Source dropdown', 'Chooses Branch deploy or GitHub Actions deploy', 'Wrong source can publish old or empty files'],
              ['Custom domain field', 'Connects a domain such as learnqa.dev', 'DNS must match GitHub Pages requirements'],
              ['Save / Remove', 'Persists or removes custom domain', 'Removing may break production URL'],
              ['DNS check status', 'Shows whether GitHub can verify DNS', 'Wait and verify before assuming deploy is broken'],
              ['Enforce HTTPS', 'Forces secure HTTPS access', 'Keep enabled after DNS/certificate are ready'],
            ],
          },
          githubPagesUiPractice,
          {
            type: 'simulation',
            scenario: 'github-repo-settings-tour',
            icon: '⚙️',
            color: '#64748b',
            title: { en: 'Repository Settings tour: collaborators, visibility, branch rules and secrets', tr: 'Repository Settings turu: collaborator, visibility, branch rule ve secret' },
            description: { en: 'Learn what the Settings tab is for: add collaborators, switch public/private, protect main, manage Actions permissions, secrets, webhooks, environments and Pages.', tr: 'Settings tabının ne işe yaradığını öğren: collaborator ekle, public/private değiştir, main’i koru, Actions permission, secret, webhook, environment ve Pages ayarlarını yönet.' },
          },
          {
            type: 'table',
            headers: ['Settings area', 'What you can do there', 'Real-work warning'],
            rows: [
              ['General', 'Rename repo, change description, default branch, features, visibility and Danger Zone actions', 'Changing visibility or deleting a repo affects every teammate'],
              ['Collaborators', 'Invite people and manage access', 'Give the lowest role that still lets the person work'],
              ['Branches / Rules', 'Protect main, require PR reviews and required checks', 'Without rules, direct push can bypass QA evidence'],
              ['Actions', 'Allow/disable Actions, set workflow permissions and runner rules', 'Do not grant write token permissions to every workflow by default'],
              ['Secrets and variables', 'Store tokens and config for workflows', 'Never paste secrets into YAML or logs'],
              ['Webhooks', 'Notify external services on GitHub events', 'Wrong endpoint can leak event payloads'],
              ['Environments', 'Add deployment environments, approvals and environment secrets', 'Production deploys should often require approval'],
              ['Pages', 'Configure static hosting source, domain and HTTPS', 'Publishing wrong source can expose old or private build output'],
            ],
          },
          githubSettingsPractice,
          {
            type: 'code',
            label: 'Pages deploy workflow for a Vite app',
            language: 'yaml',
            code: `name: Deploy site to GitHub Pages
on:
  push:
    branches: [main]                  # Deploy only from main
  workflow_dispatch:                  # Allow manual deploy

permissions:
  contents: read                      # Read repository files
  pages: write                        # Publish to Pages
  id-token: write                     # Use OIDC token for deploy

concurrency:
  group: pages
  cancel-in-progress: false           # Do not interrupt a running Pages deploy

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4     # Pull code into runner
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci                   # Install exact dependencies
      - run: npm run build            # Generate dist/
      - run: cp dist/index.html dist/404.html # SPA fallback for unknown routes
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4`,
          },
          {
            type: 'table',
            headers: ['Topic', 'What to check', 'Danger'],
            rows: [
              ['Publishing source', 'Settings → Pages should match your strategy: branch or GitHub Actions', 'Wrong source can publish old files'],
              ['Custom domain', '`CNAME` must be in the published artifact', 'Domain can reset or point to default github.io URL'],
              ['SPA routes', 'Generate static route shells or provide 404 fallback', 'Direct URL refresh can show 404'],
              ['SEO', 'Each route needs title, description, canonical and sitemap entry', 'Search crawlers may see a blank shell'],
              ['Secrets', 'Pages deploy usually should not need app secrets for a static site', 'Accidental leak in built JS is public forever'],
            ],
          },
          githubPagesDeployFilm,
          {
            type: 'warning',
            content: 'Anything inside a static Pages build is public. Do not put API keys, tokens or private test data into Vite/React client code. Environment variables bundled into client JavaScript are visible to users.',
          },
          {
            type: 'quiz',
            question: 'Your GitHub Pages Source setting is left pointing at an old branch instead of the one your GitHub Actions workflow actually deploys. What is the visible symptom?',
            options: [
              { id: 'a', text: 'The site fails to build entirely' },
              { id: 'b', text: 'The live site serves stale or empty files, even though your latest deploy "succeeded"' },
              { id: 'c', text: 'GitHub automatically corrects the source to match the workflow' },
              { id: 'd', text: 'The custom domain stops resolving' },
            ],
            correct: 'b',
            explanation: "GitHub Pages publishes whatever the configured Source points to — it has no awareness of which workflow you intended to be authoritative. If Source is still set to an old branch (or the wrong deploy method) while your Actions workflow deploys somewhere else, the workflow run can show green/success while the public site keeps serving outdated or blank content, because Pages never picked up the new artifact.",
            retryQuestion: {
              question: 'You switch your Pages Source from "Deploy from a branch" to "GitHub Actions" in repo settings. What else must be true for the live site to actually update?',
              options: [
                { id: 'a', text: 'Nothing else — the switch alone updates the live site immediately' },
                { id: 'b', text: 'A workflow using actions/deploy-pages must actually run successfully at least once after the switch' },
                { id: 'c', text: 'The repository must be made public' },
                { id: 'd', text: 'The old branch must be deleted' },
              ],
              correct: 'b',
              explanation: 'Changing the Source setting only tells GitHub Pages WHERE to look for its next deployment — it does not retroactively trigger one. The live site only updates once an Actions workflow that uses `actions/deploy-pages` (or equivalent) actually completes a run after the switch; until then, Pages may show nothing new or even an error until that first successful deploy happens.',
            },
          },
        ],
      },
      {
        title: '⚠️ Real Work Risks and Team Safety Rules',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🚧',
            content: 'Some Git commands work like a controlled demolition charge: `git reset --hard`, `git push --force`, and `git rebase` on a shared branch are legitimate tools that professionals use deliberately — but they rewrite what already exists rather than adding something new, which means a split-second mistake in the wrong context permanently erases a colleague\'s committed work from the shared history. The "why" question that separates experienced engineers from beginners: if `git push --force-with-lease` is safer than `--force`, why does `--force` even exist? Because there are valid solo-branch scenarios — rebasing a personal feature branch before opening a PR — where force-pushing is exactly the right thing to do; the danger is only when the branch is shared. Java analogy: `git reset --hard` is like calling `System.exit(0)` mid-transaction — everything in memory that was not persisted to the database is gone, there is no rollback handle, and no exception is thrown to warn you. In QA automation, the most expensive real-world incident from this mistake pattern is accidentally force-pushing over a colleague\'s hotfix branch ten minutes before a production deployment window, requiring manual SHA recovery, emergency coordination, and a post-mortem — all because the engineer did not run `git fetch` first.',
          },
          gitRecoveryPractice,
          {
            type: 'table',
            headers: ['Risk', 'Why it hurts', 'Safer habit'],
            rows: [
              ['`git reset --hard`', 'Deletes uncommitted work', 'Inspect `git status` and `git diff`; create backup branch first'],
              ['`git push --force`', 'Can overwrite teammate commits', 'Use `--force-with-lease` only after team agreement'],
              ['Secrets in Git', 'History and forks may expose credentials', 'Rotate secret immediately; do not rely only on deletion'],
              ['Blind `git add .`', 'Stages reports, videos, `.env` and local notes', 'Stage specific files and inspect `git diff --staged`'],
              ['Long-lived branches', 'Late conflicts and hidden integration bugs', 'Small PRs, frequent fetch, fast review'],
              ['Ignored required files', 'CI passes locally but fails remotely or vice versa', 'Commit sample config and document local secrets'],
              ['Direct main push', 'Bypasses review and required checks', 'Protect main and require PR checks'],
              ['Huge binary history', 'Slow clone and heavy repository forever', 'Use artifacts, releases, LFS only when appropriate'],
            ],
          },
          {
            type: 'heading',
            text: 'Undo strategies: revert vs reset',
          },
          {
            type: 'simulation',
            scenario: 'git-revert-vs-reset',
            icon: '⏪',
            color: '#dc2626',
            title: { en: 'Revert vs Reset: two undo strategies', tr: 'Revert vs Reset: iki geri alma stratejisi' },
            description: { en: 'Watch revert create a safe new commit vs reset silently removing history. See why revert is safer for shared branches.', tr: 'Revert güvenli yeni commit oluştururken reset sessizce history siler. Paylaşılmış branch için revert neden daha güvenli gör.' },
          },
          {
            type: 'table',
            headers: ['Strategy', 'What happens', 'Safe for shared branches?', 'When to use'],
            rows: [
              ['`git revert HEAD`', 'Creates a NEW commit that undoes the last commit. History is preserved.', '✅ Yes — teammates see the undo and why', 'Undo a bug that was already pushed'],
              ['`git reset --soft HEAD~1`', 'Removes the last commit but keeps changes staged. History changes.', '⚠️ Only before push', 'Fix a commit message or split a commit'],
              ['`git reset --hard HEAD~1`', 'Removes the last commit AND all changes. Nothing remains.', '❌ Never after push', 'Truly discard local-only work you do not want'],
            ],
          },
          gitSafeUndoPractice,
          {
            type: 'code',
            label: 'Three reset modes on the same last commit',
            language: 'bash',
            code: `git log --oneline -3                      # a3f7c2d (HEAD) test: cover login errors

git reset --soft HEAD~1                    # Commit removed, changes stay STAGED
git status                                 # Changes: to be committed: tests/login.spec.js

git reset HEAD~1                           # --mixed (default): commit removed, changes stay UNSTAGED
git status                                 # Changes not staged for commit: tests/login.spec.js

git reset --hard HEAD~1                    # Commit AND all changes destroyed, nothing remains
git status                                 # Working tree clean`,
          },
          {
            type: 'code-playground',
              relatedTopicId: 'git-reset-practice-01',
            id: 'git-reset-practice-01',
            label: { tr: 'Micro Lab: git reset modları', en: 'Micro Lab: git reset modes' },
            language: 'bash',
            task: {
              tr: 'Son commit\'in mesajını düzeltmek istiyorsun ama dosya içeriğini kaybetmek istemiyorsun. TODO satırını, değişiklikleri staged halde bırakan reset moduyla tamamla. Java\'da bir nesneyi yok edip referansı null yapmak (`--hard`) ile sadece son atamayı geri almak (`--soft`) arasındaki fark gibi düşün.',
              en: 'You want to fix the last commit message without losing the file content. Complete the TODO line with the reset mode that leaves changes staged. Think of it like the difference in Java between destroying an object and nulling the reference (`--hard`) versus just undoing the last assignment (`--soft`).',
            },
            code: { tr: 'git log --oneline -1\ngit reset --soft HEAD~1\ngit status\ngit commit -m "fix: dogru mesaj"', en: 'git log --oneline -1\ngit reset --soft HEAD~1\ngit status\ngit commit -m "fix: correct message"' },
            starterCode: { tr: 'git log --oneline -1\n// TODO: son commiti kaldir ama degisiklikleri staged birak\ngit status\ngit commit -m "fix: dogru mesaj"', en: 'git log --oneline -1\n// TODO: remove the last commit but keep changes staged\ngit status\ngit commit -m "fix: correct message"' },
            solutionCode: { tr: 'git log --oneline -1\ngit reset --soft HEAD~1\ngit status\ngit commit -m "fix: dogru mesaj"', en: 'git log --oneline -1\ngit reset --soft HEAD~1\ngit status\ngit commit -m "fix: correct message"' },
            expected: {
              tr: '`git status` çalıştırıldığında dosya "Changes to be committed" altında görünür — hiçbir şey kaybolmadı, sadece commit geri alındı.',
              en: '`git status` shows the file under "Changes to be committed" — nothing was lost, only the commit was undone.',
            },
            hints: [
              { tr: '--soft sadece commit\'i geri alır; staging area ve working tree dokunulmaz kalır.', en: '--soft only undoes the commit; the staging area and working tree stay untouched.' },
              { tr: '--mixed (bayraksız varsayılan) staging\'i de geri alır; --hard hem staging hem working tree\'yi yok eder.', en: '--mixed (the flagless default) also unstages; --hard destroys both staging and the working tree.' },
            ],
            xpReward: 10,
          },
          {
            type: 'step-animation',
            id: 'git-reset-step-01',
            title: { tr: 'Adım Adım: git reset --soft vs --mixed vs --hard', en: 'Step by Step: git reset --soft vs --mixed vs --hard' },
            steps: [
              { id: 1, icon: '📍', label: { tr: 'Mevcut commit\'i gör', en: 'See the current commit' }, detail: { tr: 'git log --oneline -3 çalıştırılır: a3f7c2d (HEAD) en üstte görünür.', en: 'Run git log --oneline -3: a3f7c2d (HEAD) appears at the top.' } },
              { id: 2, icon: '🟢', label: { tr: '--soft: en güvenli', en: '--soft: the safest' }, detail: { tr: 'git reset --soft HEAD~1 sonrası git status "Changes to be committed" gösterir — dosya hâlâ staged.', en: 'After git reset --soft HEAD~1, git status shows "Changes to be committed" — the file is still staged.' } },
              { id: 3, icon: '🟡', label: { tr: '--mixed: varsayılan', en: '--mixed: the default' }, detail: { tr: 'git reset HEAD~1 (bayraksız) sonrası git status "Changes not staged for commit" gösterir — staging temizlendi ama dosya diskte duruyor.', en: 'After git reset HEAD~1 (no flag), git status shows "Changes not staged for commit" — staging is cleared but the file is still on disk.' } },
              { id: 4, icon: '🔴', label: { tr: '--hard: geri dönüşsüz', en: '--hard: irreversible' }, detail: { tr: 'git reset --hard HEAD~1 sonrası git status "working tree clean" yazar — commit ve içerik birlikte yok oldu.', en: 'After git reset --hard HEAD~1, git status prints "working tree clean" — the commit and the content are both gone.' } },
              { id: 5, icon: '🛡️', label: { tr: 'Güvenlik kuralı', en: 'Safety rule' }, detail: { tr: 'Push edilmiş bir commit üzerinde asla --hard kullanma; bunun yerine git revert kullan, çünkü revert tarihi yeni bir commit ile düzeltir, silmez.', en: 'Never run --hard on an already-pushed commit; use git revert instead, since revert fixes history with a new commit instead of deleting it.' } },
            ],
          },
          gitForcePushRescueFilm,
          {
            type: 'challenge',
            variant: 'order-sort',
            id: 'git-reset-order-01',
            question: { tr: 'Yanlış commit mesajını güvenli şekilde düzeltme sırasını kur.', en: 'Order the safe sequence for fixing a wrong commit message.' },
            items: [
              { id: '1', text: { tr: 'git log --oneline -1 ile mevcut commit\'i kontrol et', en: 'Check the current commit with git log --oneline -1' }, order: 1 },
              { id: '2', text: { tr: 'Commit\'in push edilip edilmediğini doğrula', en: 'Verify whether the commit was already pushed' }, order: 2 },
              { id: '3', text: { tr: 'git reset --soft HEAD~1 ile commit\'i geri al, değişiklikleri staged bırak', en: 'Undo the commit with git reset --soft HEAD~1, keeping changes staged' }, order: 3 },
              { id: '4', text: { tr: 'git status ile dosyanın hâlâ staged olduğunu doğrula', en: 'Confirm the file is still staged with git status' }, order: 4 },
              { id: '5', text: { tr: 'git commit -m "doğru mesaj" ile yeniden commit at', en: 'Recommit with git commit -m "correct message"' }, order: 5 },
            ],
            xpReward: 10,
          },
          {
            type: 'code',
            label: 'Safe pre-push checklist',
            language: 'bash',
            code: `git status                         # Working tree should only contain intended files
git diff --staged                   # Review exactly what will be committed
npm test                            # Run relevant local checks
git fetch origin                    # See whether remote moved
git log --oneline --graph --decorate --max-count=12 # Inspect recent history
git push origin feature/my-branch   # Push only your branch`,
          },
          {
            type: 'warning',
            content: 'If a command rewrites history, deletes files, removes branches or touches credentials, slow down. In a real company, ask in the team channel before changing shared history.',
          },
          {
            type: 'quiz',
            question: 'A teammate force-pushes over your already-pushed commits on a shared branch using `git push --force`. What is the safer alternative they should have used instead?',
            options: [
              { id: 'a', text: '`git push --force-with-lease`, after team agreement' },
              { id: 'b', text: 'There is no safer alternative — force push should never be used' },
              { id: 'c', text: '`git pull --force`' },
              { id: 'd', text: '`git commit --amend --force`' },
            ],
            correct: 'a',
            explanation: '`git push --force` overwrites the remote branch unconditionally, silently destroying any commits someone else pushed in the meantime. `git push --force-with-lease` refuses to push if the remote has moved since your last fetch — it fails safely instead of overwriting unseen work, which is why it should be the default whenever a forced push is genuinely needed (e.g. after an interactive rebase on your own feature branch), combined with a heads-up to the team.',
            retryQuestion: {
              question: 'You run `git push --force-with-lease` and it REJECTS the push with a "stale info" error. What does this tell you?',
              options: [
                { id: 'a', text: 'Your network connection is broken' },
                { id: 'b', text: 'Someone else pushed to the remote branch since your last fetch — force-with-lease is protecting their work from being overwritten' },
                { id: 'c', text: 'force-with-lease never actually works and you should use --force instead' },
                { id: 'd', text: 'Your local repository is corrupted' },
              ],
              correct: 'b',
              explanation: 'This is `--force-with-lease` doing exactly its job: it refuses to push because the remote has moved since you last fetched, meaning someone else\'s commits are sitting there that you have not seen yet. The correct response is to `git fetch`, look at what changed, and reconcile before forcing again — switching to plain `--force` here would silently destroy those commits, which is the exact problem this flag exists to prevent.',
            },
          },
        ],
      },
      {
        title: '🚨 Git and GitHub Error Dictionary',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🧯',
            content: 'Git error messages are like the warning lights on a car dashboard: they look alarming in isolation, but each one pinpoints a specific system fault — the oil pressure light does not mean the engine is destroyed, it means check the oil level before driving further. The "why" worth understanding before you rush to Stack Overflow: why does Git output errors that look like sentences but are not actionable on their own? Because Git was designed for command-line piping and scripting, so its messages are precise technical statements rather than user-friendly suggestions — learning to parse "fatal: refusing to merge unrelated histories" as "these two repos were initialized separately and share no common ancestor commit" takes practice but pays off every single time. Java analogy: Git error messages are like Java\'s checked exceptions — they force you to acknowledge the failure condition explicitly rather than silently continuing; `fatal: not a git repository` is Git\'s equivalent of a `FileNotFoundException` that the caller must handle, not ignore. In QA, the highest-risk moment for misreading a Git error is during a CI incident at deploy time: a `! [rejected] main -> main (non-fast-forward)` error in an Actions log is not a permissions problem or infrastructure failure — it means someone pushed to main between your last fetch and your push, and the correct response is fetch-then-merge, not force-push.',
          },
          gitErrorDiagnosisFilm,
          gitErrorDiagnosisSteps,
          {
            type: 'error-dictionary',
              relatedTopicId: 'git-github-errors',
            framework: 'Git & GitHub',
            errors: gitErrorEntries,
          },
          gitErrorPractice,
          {
            type: 'quiz',
            question: '`git push origin main` fails with `! [rejected] main -> main (non-fast-forward)`. What is the root cause and the correct fix?',
            options: [
              { id: 'a', text: 'Your local Git installation is outdated — reinstall Git' },
              { id: 'b', text: 'The remote branch has commits you do not have locally; fetch and merge/rebase before pushing again' },
              { id: 'c', text: 'You need to delete the remote branch and push fresh' },
              { id: 'd', text: 'The repository ran out of disk space' },
            ],
            correct: 'b',
            explanation: "This happens when someone else pushed to `main` after your last fetch — your push would overwrite history instead of extending it, so Git rejects it to protect those commits. The fix is `git fetch origin`, then `git merge origin/main` (or rebase), resolve any conflicts, and push again. Deleting the remote branch would destroy your teammate's work — never the right move here.",
            retryQuestion: {
              question: 'After `git fetch origin` and `git merge origin/main`, Git reports a merge conflict in `app.js`. What is the correct next step?',
              options: [
                { id: 'a', text: 'Run `git push --force` to skip the conflict' },
                { id: 'b', text: 'Open app.js, manually resolve the conflict markers, then `git add app.js` and `git commit` to complete the merge, then push' },
                { id: 'c', text: 'Delete app.js entirely to remove the conflict' },
                { id: 'd', text: 'Run `git fetch origin` again until the conflict disappears' },
              ],
              correct: 'b',
              explanation: 'A merge conflict means Git could not automatically reconcile two different changes to the same lines — it pauses and waits for a human decision. Editing the file to choose the correct final content, removing the `<<<<<<<`/`=======`/`>>>>>>>` markers, then staging and committing tells Git the conflict is resolved, after which the (now-merged) branch can be pushed normally. Force-pushing or deleting the file would either skip the conflict dangerously or lose real work.',
            },
          },
        ],
      },
      {
        title: '💼 Git and GitHub Interview Questions',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🎤',
            content: 'Listing Git commands in an interview is like asking a driver to recite road signs from memory: knowing the signs is necessary, but nobody hands over the keys for that — what they actually want to know is which call you make at a crowded junction. So if you already know what `git revert` and `git reset` do, why isn\'t saying that enough? Because the real question is not "which one is correct" but "do you see what rewriting history on a shared branch costs your team" — the command is the threshold, the reasoning is the differentiator. Java works the same way: explaining how a `HashMap` works is mid-level, explaining what silently disappears in production when the `equals`/`hashCode` contract is broken is senior-level. In QA terms the competency being measured is clear: you are accountable not only for your own commits but for the team\'s history, for whether a change can be rolled back, and for whether the origin of a regression can still be proven six months later. So build every answer on three legs: what you did, why you chose that route, and how you get back if it goes wrong.',
          },
          gitInterviewAnswerFilm,
          gitInterviewAnswerSteps,
          gitInterviewPractice,
          {
            type: 'interview-questions',
              relatedTopicId: 'git-github',
            topic: 'Git & GitHub',
            questions: gitInterviewQuestions,
          },
          {
            type: 'glossary-section',
            terms: glossaryTerms,
          },
        ],
      },
    ],
  },
  tr: {
    hero: {
      title: '🔀 Git ve GitHub',
      subtitle: 'QA mühendisleri için version control, takım akışı, CI/CD ve Pages',
      intro: 'Git ve GitHub’ı görsel öğren: snapshot, branch, pull request, GitHub Actions, Pages deploy, gerçek iş güvenliği ve komut alıştırmaları.',
    },
    tabs: ['🎯 Giriş', '⚙️ Kurulum', '⌨️ Git Temelleri', '🚫 .gitignore', '🌿 Branch & Switch', '🔀 Merge & Conflict', '🧬 Rebase & İleri Akış', '🐙 GitHub Akışı', '🧾 Pull Request', '🚀 Actions', '🌐 Pages', '⚠️ İş Riskleri', '🚨 Hata Sözlüğü', '💼 Mülakat S&C'],
    sections: [
      {
        title: '🎯 Git ve GitHub nedir?',
        blocks: [
          {
            type: 'simple-box',
            emoji: '📸',
            content: 'Git, projen için bir tıbbi kayıt sistemi gibi çalışır: her anlamlı değişiklik zaman damgası, imzalayanın adı ve gerekçesiyle kaydedilir — sadece son teşhis değil, hastanın o noktaya nasıl geldiğinin tüm geçmişi tutulur. Ama asıl soru şu: dosyaları zaten sabit diske kaydediyorken Git\'e neden ihtiyaç var? Çünkü Ctrl+Z sadece o oturumu hatırlar ve takım arkadaşının aynı dosyayı "kaydetmesi" seninkini sessizce ezer. Java analojisi: her Git commit\'i değiştirilemez bir value object gibi düşün — bir kez oluşturulunca değişmez ve iki commit\'i diff ile karşılaştırmak, unit test assertion\'ında iki object snapshot\'ını karşılaştırmakla birebir aynı mantıktır. QA\'da Git olmadan "bu CI hatası hangi test script versiyonuyla çıktı?" sorusuna cevap veremezsin; Git ile Actions run\'ındaki commit SHA\'yı bakıp tam o state\'i saniyeler içinde yeniden üretebilirsin.',
          },
          {
            type: 'simulation',
            scenario: 'git-snapshot-story',
            icon: '📸',
            color: '#059669',
            title: { en: 'Step 1: Understand Git as Project Memory', tr: 'Adım 1: Git’i Proje Hafızası Olarak Anla' },
            description: { en: 'Before commands, watch the idea: files change, Git stores meaningful snapshots, and you can compare or recover later.', tr: 'Komutlardan önce fikri izle: dosyalar değişir, Git anlamlı snapshot’lar saklar, sonra karşılaştırabilir veya geri dönebilirsin.' },
          },
          {
            type: 'text',
            content: 'Başta “komut ezberlemeliyim” diye düşünme. “Projem değişiyor ve benim güvenli bir hafızaya ihtiyacım var” diye düşün. Git bu hafızayı verir. Java analojisi: debug yaparken bir andaki object state önemliyse, Git için de bir andaki proje state önemlidir.',
          },
          {
            type: 'simulation',
            scenario: 'github-collaboration-story',
            icon: '🌐',
            color: '#2563eb',
            title: { en: 'Step 2: Understand GitHub as the Team Workspace', tr: 'Adım 2: GitHub’ı Takım Çalışma Alanı Olarak Anla' },
            description: { en: 'Now watch what changes when the project memory is shared with a team: review, checks and safe merge.', tr: 'Şimdi proje hafızası takımla paylaşılınca ne değişiyor gör: review, checks ve güvenli merge.' },
          },
          {
            type: 'simulation',
            scenario: 'git-concept-order-map',
            icon: '🧭',
            color: '#0f766e',
            title: { en: 'Step 3: Learn the Order Before the Commands', tr: 'Adım 3: Komutlardan Önce Sıralamayı Anla' },
            description: { en: 'See the real learning order: first local Git memory, then snapshots, then GitHub sharing, then branches, merge and conflicts.', tr: 'Gerçek öğrenme sırasını gör: önce local Git hafızası, sonra snapshot, sonra GitHub paylaşımı, ardından branch, merge ve conflict.' },
          },
          {
            type: 'heading',
            text: 'Git/GitHub sırası: her adım neden var?',
          },
          {
            type: 'table',
            headers: ['Sıra', 'İşlem', 'Amaç', 'Yapılmazsa veya karışırsa ne olur?'],
            rows: [
              ['1', 'Proje klasöründe `git init`', 'Git’e “bu klasörü repository olarak takip etmeye başla” dersin.', 'Git komutları “not a git repository” der; local history oluşmaz.'],
              ['2', '`git status`', 'Hiçbir şeye dokunmadan önce Git’in ne gördüğünü sorarsın.', 'Generated report, `.env` veya alakasız dosyaları yanlışlıkla stage edebilirsin.'],
              ['3', '`git add`', 'Bir sonraki commit’e hangi değişen dosyaların gireceğini seçersin.', 'Commit boş kalır veya yanlış dosyaları kaydedersin.'],
              ['4', '`git commit`', 'Anlamlı mesajla local snapshot kaydedersin.', 'Push, review, karşılaştırma veya rollback için sağlam kayıt olmaz.'],
              ['5', '`git remote add origin ...`', 'Local repo’yu GitHub repo URL’sine bağlarsın.', 'Git `push` ve `pull` için hangi GitHub repo’ya gideceğini bilmez.'],
              ['6', '`git push -u origin main`', 'İlk main/master commit’ini GitHub’a gönderir ve upstream hedefini hatırlatırsın.', 'GitHub boş kalır; sonraki `git push` nereye göndereceğini sorabilir.'],
              ['7', '`git switch -c feature/...`', 'main dışında güvenli çalışma alanı açarsın; deneme ve QA değişiklikleri izole kalır.', 'Doğrudan main değişikliği review’u atlar ve ortak branch’i bozabilir.'],
              ['8', '`git push -u origin feature/...`', 'Feature branch’i GitHub’da görünür yaparsın; Pull Request açılabilir.', 'Takım arkadaşın sadece localde duran branch’i review edemez.'],
              ['9', 'Pull Request + merge', 'Review, checks, konuşma ve onaydan sonra işi main’e alırsın.', 'Kod review/test/takım görünürlüğü olmadan main’e girebilir.'],
              ['10', '`git fetch` sonra `git merge` veya `git pull`', 'GitHub’daki değişiklikleri locale alırsın. `pull`, fetch + merge demektir.', 'Local branch eski kalır; conflict sonradan daha zor hale gelir.'],
              ['11', 'Conflict’i localde çöz', 'İki history aynı yeri değiştirdiyse final doğru dosya içeriğini sen seçer ve test edersin.', 'Conflict marker’ları kalır, build/test bozulur veya yanlış davranış main’e gider.'],
            ],
          },
          {
            type: 'table',
            headers: ['Kavram', 'Basit anlamı', 'Önemli fark'],
            rows: [
              ['`clone`', 'GitHub’da var olan repository’yi bilgisayarına indirmek.', 'Repo GitHub’da zaten varsa aynı repo için `git init` ile başlama; `clone` ile indir.'],
              ['`push`', 'Local commit’leri GitHub’a göndermek.', 'Push klasördeki her kaydedilmemiş dosyayı değil, commit snapshotlarını gönderir.'],
              ['`fetch`', 'Remote history bilgisini dosyalarını değiştirmeden indirmek.', 'Öğrenirken daha güvenlidir; merge etmeden önce ne değişmiş görürsün.'],
              ['`merge`', 'Başka branch/history değişikliğini bulunduğun branch’e uygulamak.', 'Merge her zaman şu an üzerinde bulunduğun branch’in içine yapılır.'],
              ['`pull`', 'Fetch + merge işlemini tek komutta yapmak.', 'Pratiktir ama önce iki ayrı adımı anlamak gerekir.'],
              ['`branch`', 'Ayrı çalışma çizgisi.', 'Local branch bilgisayarındadır; remote branch GitHub’da push sonrası görünür.'],
              ['`conflict`', 'Git iki değişiklik arasında güvenli karar veremiyor demektir.', 'Local dosyada çözülür, test edilir, stage edilir ve işlem tamamlanır.'],
            ],
          },
          gitConceptOrderPractice,
          {
            type: 'grid',
            cols: 2,
            items: [
              { icon: '🧠', label: 'Git', desc: 'Local version control aracıdır. İnternet yokken bile snapshot, branch, diff ve history tutar.' },
              { icon: '🐙', label: 'GitHub', desc: 'Takım platformudur. Pull Request, Issue, Actions, security, Pages ve review burada yaşar.' },
              { icon: '☕', label: 'Java analojisi', desc: 'Commit, kaydedilmiş object state gibidir. Branch, güvenli deney yapabileceğin ayrı object kopyası gibidir.' },
              { icon: '🧪', label: 'QA faydası', desc: 'Her test değişikliği review edilebilir, yeniden üretilebilir ve bug/story/release ile izlenebilir hale gelir.' },
            ],
          },
          gitVersionChaosFilm,
          {
            type: 'quiz',
            question: 'En güvenli zihinsel model hangisidir?',
            options: [
              { id: 'a', text: 'GitHub ve Git aynı araçtır' },
              { id: 'b', text: 'Git local snapshot alır; GitHub paylaşılan işi host eder ve review sağlar' },
              { id: 'c', text: 'Commit otomatik production deploy yapar' },
              { id: 'd', text: 'Staging area remote repository ile aynıdır' },
            ],
            correct: 'b',
            explanation: 'Git local çalışır ve snapshot üretir. GitHub repository host eder, PR, Actions, Pages ve takım iş birliği özellikleri ekler.',
          
        retryQuestion: {
      "question": {
            "tr": "Version kontrol sistemleri ve barındırma platformları arasındaki farkı en iyi açıklayan yaklaşım hangisidir?",
            "en": "Which statement best describes the fundamental difference between version control systems and hosting platforms?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Git, bulut tabanlı bir hizmettir; GitHub ise Git'i çalıştıran programdır",
                        "en": "Git is a cloud-based service; GitHub is the program that runs Git"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Git, yerel versiyonlama ve snapshot aracıdır; GitHub ise bu depoların merkezi yönetimi ve iş birliği için kullanılır",
                        "en": "Git is a local versioning and snapshot tool; GitHub is used for centralized management and collaboration of those repositories"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Git ve GitHub her zaman eş zamanlı olarak senkronize çalışmak zorundadır",
                        "en": "Git and GitHub must always operate in perfect synchronization at all times"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Git, projenin canlı yayına çıkmasını sağlar; GitHub ise sadece kod deposudur",
                        "en": "Git enables the project's production deployment; GitHub is merely a storage for code"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Git, kodunuzun geçmişini yerel bilgisayarınızda yönetmenizi sağlayan bir araçtır. GitHub (veya GitLab/Bitbucket gibi platformlar) ise bu yerel çalışmaların paylaşıldığı, kod incelemelerinin yapıldığı ve CI/CD süreçlerinin tetiklendiği uzaktan sunuculardır.",
            "en": "Git is a tool that allows you to manage the history of your code on your local computer. GitHub (or platforms like GitLab/Bitbucket) are remote servers where those local efforts are shared, code reviews occur, and CI/CD processes are triggered."
      }
}
},
        ],
      },
      {
        title: '⚙️ Kurulum ve İlk Ayarlar',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🧰',
            content: 'Git kurmak, bir şantiyeye girmeden önce resmi yüklenici kaydı yaptırmak gibidir: kapı her rozetini, adını ve hangi kapıdan girdiğini kaydeder; çaktığın her çivi sana izlenebilir. Komutlara geçmeden önce üzerinde durmaya değer soru şu: şu an tek başınayken Git\'in adını ve email\'ini neden bilmesi gerekiyor? Çünkü altı ay sonra CI pipeline belirli bir commit\'te bozulduğunda takımın ilk sorusu "bunu kim değiştirdi?" olur ve author metadata eksikse tüm audit log anlamsızlaşır. Java analojisi: Maven veya Gradle\'da projeyi herhangi bir yere yayınlamadan önce groupId, artifactId, version koordinatlarını tanımlarsın; `git config --global user.name` da commit\'lerin yayınlanabilmesi için gereken aynı tanımlama katmanıdır. QA\'da hatalı veya eksik commit kimliği; audit loglarını kullanılamaz hale getirir, CODEOWNERS otomatik reviewer atamasını kırar ve GDPR kapsamındaki kod değişikliği izlenebilirliğini bozar.',
          },
          {
            type: 'heading',
            text: 'Git komutlarından önce: terminal araçlarını anla',
          },
          {
            type: 'simulation',
            scenario: 'git-terminal-shell-map',
            icon: '🖥️',
            color: '#38bdf8',
            title: { en: 'Terminal, Shell and Git: who does what?', tr: 'Terminal, Shell ve Git: kim ne yapar?' },
            description: { en: 'Watch one command travel from the visual terminal window to the shell engine, then to Git and back as readable output.', tr: 'Bir komutun görsel terminal penceresinden shell motoruna, oradan Git’e gidip okunabilir çıktı olarak geri dönmesini izle.' },
          },
          {
            type: 'grid',
            cols: 3,
            items: [
              { icon: '🪟', label: 'Terminal penceresi', desc: 'Gördüğün ekran: Windows Terminal, Git Bash penceresi, VS Code/IntelliJ Terminal veya macOS Terminal.' },
              { icon: '⚙️', label: 'Shell', desc: 'Komut motoru: Git Bash, PowerShell, CMD, bash veya zsh. `ls`, `dir`, `rm`, `del` farkı buradan gelir.' },
              { icon: '🔧', label: 'Git programı', desc: 'Version control aracı: `git status`, `git add`, `git commit`. Git kuruluysa ve doğru klasördeysen anlamlı çalışır.' },
            ],
          },
          {
            type: 'simulation',
            scenario: 'git-terminal-install-use',
            icon: '🧭',
            color: '#10b981',
            title: { en: 'Download, install, open, verify: the safe first run', tr: 'İndir, kur, aç, doğrula: güvenli ilk çalıştırma' },
            description: { en: 'Follow the beginner path for Windows Git Bash, macOS Terminal, Linux terminal and IDE terminals before touching a real project.', tr: 'Gerçek projeye dokunmadan önce Windows Git Bash, macOS Terminal, Linux terminal ve IDE terminal yolunu izle.' },
          },
          {
            type: 'grid',
            cols: 2,
            items: [
              { icon: '🟩', label: 'Git Bash', desc: 'Windows’ta Git for Windows ile gelir. `pwd`, `ls`, `touch`, `rm` öğrenmek için iyi; emin olmadığın yerde `rm -rf` çalıştırma.' },
              { icon: '🔵', label: 'PowerShell', desc: 'Windows automation shell. `winget`, path kontrolü ve Git kurulumu sonrası `git ...` komutları için iyi; komut adları farklı olabilir.' },
              { icon: '⚫', label: 'CMD', desc: 'Klasik Windows ekranı. `git --version` veya eski scriptler için yeterli; yeni başlayanlar Git’i Git Bash’te daha rahat öğrenir.' },
              { icon: '⌘', label: 'macOS Terminal', desc: 'macOS terminali, genelde zsh. Homebrew veya Apple Command Line Tools ile kur, sonra `git --version` doğrula.' },
              { icon: '🐧', label: 'Linux Terminal', desc: 'Ubuntu/Fedora/Arch terminali. `apt`, `dnf` veya `pacman` ile kur, sonra aynı Git workflow’u kullan.' },
              { icon: '🧑‍💻', label: 'IDE Terminal', desc: 'VS Code, IntelliJ veya WebStorm paneli. Proje içinde kullan; önce seçili shell’i ve aktif klasörü kontrol et.' },
            ],
          },
          terminalToolsPractice,
          {
            type: 'simulation',
            scenario: 'git-install-os-setup',
            icon: '🧰',
            color: '#f97316',
            title: { en: 'Installation Map: Pick Your Operating System First', tr: 'Kurulum Haritası: Önce İşletim Sistemini Seç' },
            description: { en: 'Watch the installation path for Windows, macOS and Linux before copying any command.', tr: 'Herhangi bir komutu kopyalamadan önce Windows, macOS ve Linux kurulum yolunu gör.' },
          },
          {
            type: 'heading',
            text: 'Windows kurulumu',
          },
          {
            type: 'installation',
            title: 'Windows üzerinde Git kurulumu',
            steps: [
              { cmd: 'winget install --id Git.Git -e --source winget', explanation: 'Git for Windows paketini winget ile kur. Winget yoksa resmi Git for Windows installer’ını indir ve başlangıç için varsayılan seçeneklerle ilerle.' },
              { cmd: 'git --version', explanation: 'Yeni bir PowerShell veya Git Bash açıp kurulumu doğrula. Beklenen çıktı: git version 2.x.x.' },
              { cmd: 'git config --global user.name "Ad Soyad"', explanation: 'Commit author adını ayarla. Bunu her snapshot’ın üstündeki isim etiketi gibi düşün.' },
              { cmd: 'git config --global user.email "sen@example.com"', explanation: 'Commit author emailini ayarla. GitHub hesabına bağlı email veya GitHub no-reply email kullan.' },
              { cmd: 'git config --global init.defaultBranch main', explanation: 'Yeni local repository’lerin main branch adıyla başlamasını sağla.' },
              { cmd: 'git config --global --list', explanation: 'Commit atmadan önce name, email ve default branch ayarlarını gör.' },
            ],
          },
          {
            type: 'heading',
            text: 'macOS kurulumu',
          },
          {
            type: 'installation',
            title: 'macOS üzerinde Git kurulumu',
            steps: [
              { cmd: 'brew install git', explanation: 'Homebrew ile Git kur. Homebrew yoksa önce Homebrew kurabilir veya Apple Command Line Tools yolunu kullanabilirsin.' },
              { cmd: 'git --version', explanation: 'Yeni Terminal penceresinde kurulumu doğrula. Beklenen çıktı: git version 2.x.x.' },
              { cmd: 'git config --global user.name "Ad Soyad"', explanation: 'Bu Mac üzerinde oluşturacağın commitler için author adını ayarla.' },
              { cmd: 'git config --global user.email "sen@example.com"', explanation: 'Commit emailini ayarla. GitHub hesabındaki kimlikle uyumlu tut.' },
              { cmd: 'git config --global init.defaultBranch main', explanation: 'Yeni repository’lerin modern main branch adıyla başlamasını sağla.' },
              { cmd: 'git config --global --list', explanation: 'Son ayarları doğrula.' },
            ],
          },
          {
            type: 'heading',
            text: 'Linux kurulumu',
          },
          {
            type: 'installation',
            title: 'Linux üzerinde Git kurulumu',
            steps: [
              { cmd: 'sudo apt update && sudo apt install git', explanation: 'Debian/Ubuntu yolu. Fedora için `sudo dnf install git`, Arch için `sudo pacman -S git` kullanılabilir.' },
              { cmd: 'git --version', explanation: 'Yeni terminalde kurulumu doğrula. Beklenen çıktı: git version 2.x.x.' },
              { cmd: 'git config --global user.name "Ad Soyad"', explanation: 'Bu Linux makinede oluşturulacak commitler için author adını ayarla.' },
              { cmd: 'git config --global user.email "sen@example.com"', explanation: 'Commit emailini ayarla. Takımın GitHub’da beklediği kimlikle aynı olsun.' },
              { cmd: 'git config --global init.defaultBranch main', explanation: 'Yeni repository’lerde main branch adını varsayılan yap.' },
              { cmd: 'git config --global --list', explanation: 'Gerçek projeye geçmeden önce yapılandırmayı doğrula.' },
            ],
          },
          {
            type: 'heading',
            text: 'Git kurulduktan sonra: terminali proje klasöründe aç',
          },
          {
            type: 'simulation',
            scenario: 'git-bash-open-folder',
            icon: '🗂️',
            color: '#22c55e',
            title: { en: 'Open CMD or Git Bash directly in the project folder', tr: 'CMD veya Git Bash’i doğrudan proje klasöründe aç' },
            description: { en: 'Watch the exact beginner moves: type `cmd` in the Windows Explorer address bar, or right-click the folder and choose Git Bash here.', tr: 'Yeni başlayan için net adımları izle: Windows Explorer adres çubuğuna `cmd` yaz veya klasörde sağ tıklayıp Git Bash here seç.' },
          },
          {
            type: 'grid',
            cols: 3,
            items: [
              { icon: '1️⃣', label: 'Explorer adres çubuğu', desc: 'Proje klasörünü aç, adres çubuğuna tıkla, `cmd` yaz, Enter’a bas. CMD zaten o klasörün içinde açılır.' },
              { icon: '2️⃣', label: 'Git Bash here', desc: 'Proje klasörünün içinde boş bir yere sağ tıkla ve Git Bash Here seç. Windows 11’de Show more options altında olabilir.' },
              { icon: '3️⃣', label: 'IDE terminali', desc: 'VS Code veya IntelliJ’i proje klasöründe aç, Terminal > New Terminal seç ve gerekirse shell olarak Git Bash’i seç.' },
            ],
          },
          {
            type: 'simulation',
            scenario: 'git-bash-command-runner',
            icon: '⌨️',
            color: '#0ea5e9',
            title: { en: 'Command result lab: type a command, read the output', tr: 'Komut sonucu lab: komutu yaz, çıktıyı oku' },
            description: { en: 'Run beginner terminal commands visually: folder navigation, file creation, reading a file, checking network info and confirming Git.', tr: 'Başlangıç terminal komutlarını görsel olarak çalıştır: klasör değiştirme, dosya oluşturma, dosya okuma, ağ bilgisini görme ve Git’i doğrulama.' },
          },
          {
            type: 'grid',
            cols: 2,
            items: [
              { icon: '📍', label: '`pwd`', desc: 'Şu an hangi klasörde olduğunu yazar: örnek `/c/Users/hasan/Desktop/qa-project`.' },
              { icon: '📋', label: '`ls` / `dir`', desc: 'Bulunduğun yerdeki dosya ve klasörleri listeler.' },
              { icon: '➡️', label: '`cd klasor`', desc: 'Bir klasörün içine girer. `cd ..` bir üst klasöre döner.' },
              { icon: '📁', label: '`mkdir demo`', desc: '`demo` adında yeni klasör oluşturur.' },
              { icon: '📄', label: '`touch notes.txt`', desc: 'Git Bash’te boş dosya oluşturur. CMD’de benzeri: `type nul > notes.txt`.' },
              { icon: '✍️', label: '`echo "hi" > notes.txt`', desc: 'Dosyaya metin yazar. Git Bash’te `cat notes.txt`, CMD’de `type notes.txt` ile okursun.' },
              { icon: '🌐', label: '`ipconfig`', desc: 'Windows ağ bilgisini gösterir: IPv4 address, gateway ve adapter bilgileri.' },
              { icon: '✅', label: '`git --version`', desc: 'Git’in bu terminalden erişilebilir olduğunu doğrular.' },
            ],
          },
          gitBashDailyCommandsPractice,
          {
            type: 'heading',
            text: 'SSH mi HTTPS mi?',
          },
          {
            type: 'table',
            headers: ['Seçim', 'Ne zaman iyi?', 'Dikkat'],
            rows: [
              ['HTTPS', 'Basit kurulum, credential manager, kurumsal makineler', 'Token/credential manager kullan; tokenı script içine yapıştırma'],
              ['SSH', 'Sık Git kullananlar, sabit geliştirici makineleri', 'Private key korunmalı; yeni cihazda key kurulumu gerekir'],
              ['GitHub CLI', 'Terminalden hızlı login ve PR akışı', 'Permission sınırları yine net tutulmalı'],
            ],
          },
          {
            type: 'grid',
            cols: 3,
            items: [
              { icon: '✅', label: '1. Git cevap veriyor', desc: '`git --version` gerçek bir version numarası yazdırıyor.' },
              { icon: '🪪', label: '2. Kimlik var', desc: '`user.name` ve `user.email` ayarları görünüyor.' },
              { icon: '🌿', label: '3. main varsayılan', desc: 'Yeni repository eski varsayılan yerine `main` ile başlıyor.' },
            ],
          },
          gitIdentityConfigFilm,
          {
            type: 'simulation',
            scenario: 'github-account-repo-setup',
            icon: '🐙',
            color: '#6e40c9',
            title: { en: 'GitHub Account and First Repository', tr: 'GitHub Hesabı ve İlk Repository' },
            description: { en: 'Watch the steps: create a GitHub account, verify your email, create your first repository, and copy the URL.', tr: 'Adımları izle: GitHub hesabı aç, e-postanı doğrula, ilk repository oluştur ve URL kopyala.' },
          },
          {
            type: 'heading',
            text: 'HTTPS mi SSH mi: bağlantı yöntemini seç',
          },
          {
            type: 'table',
            headers: ['Yöntem', 'Kurulum', 'Push/Pull davranışı', 'Kime uygun'],
            rows: [
              ['HTTPS + Token', 'GitHub → Settings → Developer settings → Personal access tokens → Generate new token', 'Her push için token gerekir; credential manager ilk kullanımdan sonra saklar', 'Yeni başlayanlar — daha kolay ilk kurulum'],
              ['SSH Key', '`ssh-keygen -t ed25519` → public key kopyala → GitHub Settings → SSH Keys → New SSH key', 'Token gerekmez; key çifti ile otomatik kimlik doğrulama', 'Günlük kullanım — uzun vadede daha pratik'],
            ],
          },
          {
            type: 'code',
            label: 'HTTPS: Personal Access Token oluştur ve kullan',
            language: 'bash',
            code: `# 1. GitHub.com → profil fotoğrafı → Settings\n# 2. Developer settings → Personal access tokens → Tokens (classic)\n# 3. Generate new token → \"repo\" scope seç → Generate\n# 4. Tokenı kopyala (sadece bir kez görürsün!)\n\n# Git push sırasında şifre istediğinde:\ngit push -u origin main\n# Username: github-kullanici-adin\n# Password: tokenini-yapistir\n\n# Windows Credential Manager / macOS Keychain ilk kullanımdan sonra hatırlar`,
          },
          {
            type: 'code',
            label: 'SSH: key oluştur ve GitHub\'a ekle',
            language: 'bash',
            code: `# 1. SSH key çifti oluştur\nssh-keygen -t ed25519 -C "email@example.com"\n# Varsayılan konum için Enter; istersen passphrase belirle\n\n# 2. PUBLIC key\'i kopyala\n# Windows PowerShell:\nGet-Content ~\\.ssh\\id_ed25519.pub\n# macOS / Linux:\ncat ~/.ssh/id_ed25519.pub\n\n# 3. GitHub.com → Settings → SSH and GPG keys → New SSH key → yapıştır\n\n# 4. Bağlantıyı test et\nssh -T git@github.com\n# \"Hi username! You've successfully authenticated...\"`,
          },
          {
            type: 'step-animation',
            id: 'git-ssh-keygen-step-01',
            title: { tr: "ssh-keygen Bir Anahtar Çiftini Nasıl Oluşturur ve GitHub Onu Nasıl Tanır?", en: 'How Does ssh-keygen Create a Key Pair, and How Does GitHub Recognize It?' },
            steps: [
              { id: 1, icon: '1️⃣', label: { tr: 'ssh-keygen -t ed25519 çalıştırıldığında…', en: 'Running ssh-keygen -t ed25519…' }, detail: { tr: 'ssh-keygen -t ed25519 çalıştırıldığında İKİ dosya oluşturulur: id_ed25519 (ÖZEL anahtar, asla paylaşılmaz) ve id_ed25519.pub (herkese AÇIK anahtar).', en: 'Running ssh-keygen -t ed25519 CREATES TWO files: id_ed25519 (the PRIVATE key, never shared) and id_ed25519.pub (the PUBLIC key).' } },
              { id: 2, icon: '2️⃣', label: { tr: 'cat ~/.ssh/id_ed25519.pub ile yazdırılan metin…', en: 'The text printed by cat ~/.ssh/id_ed25519.pub…' }, detail: { tr: "cat ~/.ssh/id_ed25519.pub ile ekrana yazdırılan metin, matematiksel olarak ÖZEL anahtarla EŞLEŞEN ama ondan GERİ HESAPLANAMAYAN bir açık anahtardır.", en: 'The text printed by cat ~/.ssh/id_ed25519.pub is a public key that MATHEMATICALLY MATCHES the private key but CANNOT be reverse-computed from it.' } },
              { id: 3, icon: '3️⃣', label: { tr: "GitHub'a yapıştırılan bu AÇIK anahtar…", en: 'This PUBLIC key, once pasted into GitHub…' }, detail: { tr: "GitHub'a yapıştırılan bu AÇIK anahtar, GitHub tarafında hesabınla EŞLEŞTİRİLİR — artık GitHub \"bu genel anahtarla eşleşen özel anahtara sahip biri seninle konuşuyor\" diye DOĞRULAYABİLİR.", en: 'This PUBLIC key, once pasted into GitHub, gets LINKED to your account — GitHub can now VERIFY that "whoever is talking to me holds the private key matching this public key".' } },
              { id: 4, icon: '4️⃣', label: { tr: 'ssh -T git@github.com çalıştırıldığında…', en: 'Running ssh -T git@github.com…' }, detail: { tr: "ssh -T git@github.com çalıştırıldığında GERÇEK bir SSH el sıkışması olur: GitHub sana bir MEYDAN OKUMA gönderir, sadece özel anahtarın sahibi bunu doğru CEVAPLAYABİLİR.", en: 'Running ssh -T git@github.com triggers a REAL SSH handshake: GitHub sends you a CHALLENGE that only the holder of the private key can ANSWER correctly.' } },
              { id: 5, icon: '5️⃣', label: { tr: 'Bu doğrulandıktan sonra git push/pull…', en: 'Once verified, git push/pull…' }, detail: { tr: "Bu doğrulandıktan sonra git push/pull komutları ARTIK şifre SORMAZ — SSH anahtarı, her işlemde otomatik olarak KİMLİĞİNİ kanıtlar.", en: 'Once verified, git push/pull commands NEVER ask for a password again — the SSH key automatically PROVES your identity on every operation.' } },
            ],
          },
          gitSshKeygenPractice,
          {
            type: 'challenge',
            variant: 'order-sort',
            id: 'git-ssh-setup-order-01',
            question: { tr: 'SSH anahtarıyla GitHub kimlik doğrulamasını kurma sırasını diz.', en: 'Order the steps for setting up SSH authentication with GitHub.' },
            items: [
              { id: '1', text: { tr: 'ssh-keygen -t ed25519 ile anahtar çifti oluştur', en: 'Generate a key pair with ssh-keygen -t ed25519' }, order: 1 },
              { id: '2', text: { tr: "cat ~/.ssh/id_ed25519.pub ile public key'i kopyala", en: "Copy the public key with cat ~/.ssh/id_ed25519.pub" }, order: 2 },
              { id: '3', text: { tr: 'GitHub Settings → SSH and GPG keys → New SSH key → yapıştır', en: 'GitHub Settings → SSH and GPG keys → New SSH key → paste' }, order: 3 },
              { id: '4', text: { tr: 'ssh -T git@github.com ile bağlantıyı test et', en: 'Test the connection with ssh -T git@github.com' }, order: 4 },
              { id: '5', text: { tr: "git push -u origin main ile şifresiz push yap", en: 'Push without a password with git push -u origin main' }, order: 5 },
            ],
            xpReward: 10,
          },
          {
            type: 'warning',
            content: 'Bir yöntem seç ve ona bağlı kal. HTTPS remote\'ları `https://github.com/user/repo.git`, SSH remote\'ları `git@github.com:user/repo.git` şeklindedir. Sonradan değiştirirsen `git remote set-url origin <yeni-url>` kullan.',
          },
          {
            type: 'quiz',
            question: 'Git kurulumundan hemen sonra `git config --global user.name`/`user.email` ayarlamadan ilk commit\'ini yaparsan ne olur?',
            options: [
              { id: 'a', text: 'Git, ayar yapmadan commit\'i reddeder' },
              { id: 'b', text: 'Commit başarılı olur ama eksik veya yanlış bir author bilgisiyle kaydedilir' },
              { id: 'c', text: 'GitHub otomatik olarak hesap adını doldurur' },
              { id: 'd', text: 'Commit zaman damgası olmadan oluşturulur' },
            ],
            correct: 'b',
            explanation: 'Git, kimlik ayarlanmamışsa commit\'i otomatik olarak engellemez — işletim sistemine/Git sürümüne göre tahmin edilen bir sistem kullanıcı adı/hostname\'e düşer veya bu da yoksa hata verir. Her durumda commit\'in author bilgisi güvenilmez olur — bu da `git log`/`git blame` geçmişini bozar ve code review\'i karıştırır. İlk gerçek commit\'ten önce her zaman `user.name`/`user.email` ayarla.',
            retryQuestion: {
              question: 'Yanlış `user.email` ile birkaç commit yaptıktan sonra fark ettin. Paylaşılan bir branch\'te GELECEK commit\'ler için kimliği düzeltmenin güvenli yolu nedir?',
              options: [
                { id: 'a', text: 'Başkalarının zaten çektiği bir branch\'te `git rebase` ile geçmiş commit\'lerin author\'ını yeniden yazmak' },
                { id: 'b', text: '`git config user.email "dogru@email.com"` çalıştırıp bundan sonra normal şekilde commit etmeye devam etmek' },
                { id: 'c', text: 'Repository\'i silip yeniden clone\'lamak' },
                { id: 'd', text: 'Bir commit yapıldıktan sonra hiçbir şey yapılamaz' },
              ],
              correct: 'b',
              explanation: 'Config\'i düzeltmek SADECE değişiklikten SONRA yapılan commit\'leri etkiler — eski commit\'ler zaten sahip oldukları kimliği korur. Eski author bilgisini düzeltmek için paylaşılan bir branch\'te geçmişi yeniden yazmak (rebase/amend) riskli olur, çünkü başka biri o commit\'leri zaten çekmişse onların geçmişini de bozar; bu tür bir yeniden yazma sadece private, henüz push edilmemiş bir branch\'te yapılmalıdır.',
            },
          },
        ],
      },
      {
        title: '⌨️ Git Temelleri: status, add, commit, diff, log',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🧺',
            content: 'Staging area, kargoya vereceğin kutuyu kapatmadan önce masanın üstünden hangi eşyaları içine koyacağını tek tek seçmen gibidir: masada on değişen dosya durabilir ama kutuya (commit) yalnızca staging’e koyduklarım girer, gerisi masada bekler. Peki madem dosyaları zaten kaydettim, neden Git ayrıca bir "staging" adımı dayatıyor — doğrudan commit etse olmaz mıydı? Çünkü commit bir yedekleme değil, bir ANLATIDIR: "login bug’ını düzelttim" commit’i ile "yarım kalan deneme kodu" aynı kutuya girerse, altı ay sonra o hatayı `git log` ile arayan kişi hangi satırın neyi düzelttiğini ayıramaz. Java tarafında buna en yakın alışkanlık, bir PR’ı göndermeden önce IDE’de değişiklikleri gözden geçirmendir — fark şu ki Git bunu isteğe bağlı bir alışkanlık değil, akışın zorunlu bir adımı yapar. QA açısından karşılığı çok somuttur: `git add .` alışkanlığıyla staging’i atlayan bir mühendis, er ya da geç `.env` dosyasını, kişisel API token’ını veya yarım kalan bir `test.only()` satırını repoya iter — ve bu satır CI’da değil, gece build’inde ya da production’da fark edilir.',
          },
          {
            type: 'simulation',
            scenario: 'git-three-areas',
            icon: '🔀',
            color: '#059669',
            title: { en: 'Step 4: See Working Tree, Staging Area and Commit', tr: 'Adım 4: Working Tree, Staging Area ve Commit’i Gör' },
            description: { en: 'Now that Git makes sense, watch how one change moves through the three local Git areas before it is shared.', tr: 'Git’in fikri oturduktan sonra tek değişikliğin paylaşılmadan önce üç local Git alanından nasıl geçtiğini izle.' },
          },
          {
            type: 'simulation',
            scenario: 'git-interactive-terminal',
            icon: '💻',
            color: '#10b981',
            title: { en: 'Interactive Git Terminal', tr: 'Etkileşimli Git Terminali' },
            description: { en: 'Type git status, add, commit, branch, switch commands and see Staging and Commit Graph update live.', tr: 'git status, add, commit, branch, switch komutlarını yazarak Staging ve Commit şemasını canlı izle.' },
          },
          gitBasicsPractice,
          {
            type: 'simulation',
            scenario: 'git-remote-origin-setup',
            icon: '🔗',
            color: '#2563eb',
            title: { en: 'Step 5: Connect Local Repo to GitHub with origin', tr: 'Adım 5: Local Repo’yu origin ile GitHub’a Bağla' },
            description: { en: 'After at least one commit, attach the GitHub repository URL, list existing remotes, then push once with upstream.', tr: 'En az bir committen sonra GitHub repository URL’sini bağla, mevcut remote’ları listele, sonra upstream ile ilk push’u yap.' },
          },
          {
            type: 'table',
            headers: ['Komut', 'Ne değişir?', 'Beklenen sonuç'],
            rows: [
              ['`git remote`', 'Sadece remote adlarını gösterir', 'Repo bağlıysa `origin` görünür'],
              ['`git remote -v`', 'Fetch ve push URL’lerini gösterir', 'GitHub URL’sini iki satır görürsün: fetch ve push'],
              ['`git remote --verbose`', '`-v` komutunun uzun yazımıdır', '`git remote -v` ile aynı detaylı çıktıyı verir'],
              ['`git remote add origin [REMOTE_URL]`', 'GitHub hedefini origin adıyla ekler', 'Git nereye push edeceğini bilir; kod henüz upload edilmez'],
              ['`git remote set-url origin [REMOTE_URL]`', 'Yanlış origin URL’sini düzeltir', 'Sonraki push/pull düzeltilmiş repo ile çalışır'],
              ['`git push -u origin main`', 'main branch’i upload eder ve upstream kurar', 'Aynı branch’te sonraki sefer sadece `git push` yeter'],
            ],
          },
          {
            type: 'warning',
            content: 'Modern repository için `git push -u origin main` kullan. Eski repository gerçekten `master` kullanıyorsa `git push -u origin master` yazılır. GitHub login isterse Windows oturumu Credential Manager’da, macOS ise Keychain’de saklayabilir. Token veya şifreyi remote URL içine ya da paylaşılan script içine asla yazma.',
          },
          gitRemoteOriginPractice,
          {
            type: 'file-tree',
            title: 'Temiz bir QA automation repository',
            tree: `qa-automation/
├── tests/
│   ├── login.spec.js
│   └── checkout.spec.js
├── pages/
│   └── LoginPage.js
├── reports/              # ignore edilir: generated output
├── .github/workflows/
│   └── tests.yml
├── .gitignore
├── package.json
└── README.md`,
            note: 'Source, config ve dokümantasyonu commit et. Report, video, local env dosyası ve build çıktısını ignore et.',
          },
          {
            type: 'table',
            headers: ['Komut', 'Hangi soruya cevap verir?', 'QA alışkanlığı'],
            rows: [
              ['git status', 'Ne değişti?', 'add, commit, pull ve branch switch öncesi çalıştır'],
              ['git diff', 'Tam olarak ne değişti?', 'PR açmadan önce kendi test logic’ini review et'],
              ['git add -p', 'Hangi parçalar stage edilecek?', 'Refactor ve davranış değişikliğini ayır'],
              ['git commit', 'Hangi snapshot kaydedilecek?', 'Commitleri küçük ve odaklı tut'],
              ['git log --oneline --graph', 'History nasıl ilerledi?', 'Release ve merge geçmişini debug et'],
            ],
          },
          {
            type: 'code',
            label: 'Bir test dosyasını stage et ve Conventional Commits mesajıyla commitle',
            language: 'bash',
            code: `# 1. Stage etmeden önce ne değişti kontrol et\ngit status\n# modified:   tests/checkout.spec.js\n\n# 2. SADECE commitlemek istediğin dosyayı stage et ("git add ." değil)\ngit add tests/checkout.spec.js\n\n# 3. Stage edilenin tam olarak ne olduğunu doğrula\ngit diff --staged\n\n# 4. Conventional Commits formatında bir mesajla commitle\ngit commit -m "fix(checkout): wait for payment iframe before asserting total"\n\n# 5. Snapshot'ın history'ye düştüğünü doğrula\ngit log --oneline -1\n# a1b2c3d fix(checkout): wait for payment iframe before asserting total`,
          },
          {
            type: 'code-playground',
              relatedTopicId: 'git-commit-practice-01',
            id: 'git-commit-practice-01',
            label: { tr: 'Micro Lab: git commit', en: 'Micro Lab: git commit' },
            language: 'bash',
            task: {
              tr: '`tests/checkout.spec.js` dosyasini stage et ve "fix(checkout): ..." formatinda bir Conventional Commits mesaji ile commitle. Java\'da bunu IDE\'nin "Commit" diyalogunda mesaj yazip "Stage + Commit" demeye benzet; Git\'te bu iki ayri adim (`git add` + `git commit -m`).',
              en: 'Stage `tests/checkout.spec.js` and commit it with a Conventional Commits style message starting with "fix(checkout): ...". Think of it like your IDE\'s commit dialog where you type a message and hit "Stage + Commit" in Java/IntelliJ — except in Git these are two explicit steps (`git add` then `git commit -m`).',
            },
            explanation: {
              tr: 'TODO satirini, gercek staging+commit komutuyla degistir. Bu sandbox gercek bir Git repo calistirmiyor; amac dogru komut+mesaj yapisini elinle yazmak.',
              en: 'Replace the TODO line with the real staging+commit command. This sandbox does not run a real Git repo; the goal is to type the correct command+message structure by hand.',
            },
            code: {
              tr: `git status\ngit add tests/checkout.spec.js\ngit diff --staged\n// EKSIK: tests/checkout.spec.js dosyasini "fix(checkout): ..." mesajiyla commitle\ngit log --oneline -1`,
              en: `git status\ngit add tests/checkout.spec.js\ngit diff --staged\n// MISSING: commit tests/checkout.spec.js with a "fix(checkout): ..." message\ngit log --oneline -1`,
            },
            starterCode: {
              tr: `git status\ngit add tests/checkout.spec.js\ngit diff --staged\n// TODO: tests/checkout.spec.js dosyasini "fix(checkout): ..." mesajiyla commitle\ngit log --oneline -1`,
              en: `git status\ngit add tests/checkout.spec.js\ngit diff --staged\n// TODO: commit tests/checkout.spec.js with a "fix(checkout): ..." message\ngit log --oneline -1`,
            },
            solutionCode: {
              tr: `git status\ngit add tests/checkout.spec.js\ngit diff --staged\ngit commit -m "fix(checkout): wait for payment iframe before asserting total"\ngit log --oneline -1`,
              en: `git status\ngit add tests/checkout.spec.js\ngit diff --staged\ngit commit -m "fix(checkout): wait for payment iframe before asserting total"\ngit log --oneline -1`,
            },
            expected: {
              tr: '`git log --oneline -1` ciktisi, dogru mesajli yeni commiti gosterir; staging area artik temizdir.',
              en: '`git log --oneline -1` shows the new commit with the correct message; the staging area is now clean.',
            },
            hints: [
              { tr: 'Komut sirasi: once `git add <dosya>`, sonra `git commit -m "..."`.', en: 'Order matters: `git add <file>` first, then `git commit -m "..."`.' },
              { tr: 'Conventional Commits formati: `tip(kapsam): kisa aciklama`, orn. `fix(checkout): ...`.', en: 'Conventional Commits format is `type(scope): short description`, e.g. `fix(checkout): ...`.' },
              { tr: '`git diff --staged` ile commitlemeden once neyin gittigini gor.', en: 'Use `git diff --staged` to see exactly what will be committed before you commit.' },
            ],
            xpReward: 10,
          },
          {
            type: 'step-animation',
            id: 'git-commit-step-01',
            title: { tr: 'Adim Adim: git commit', en: 'Step by Step: git commit' },
            steps: [
              { id: 1, icon: '📋', label: { tr: 'Durumu kontrol et', en: 'Check status' }, detail: { tr: '`git status` calistir: `modified: tests/checkout.spec.js` satirini gor, henuz hicbir sey staged degil.', en: 'Run `git status`: see `modified: tests/checkout.spec.js`, nothing staged yet.' } },
              { id: 2, icon: '➕', label: { tr: 'Stage et', en: 'Stage it' }, detail: { tr: '`git add tests/checkout.spec.js` ile sadece o dosyayi staging area\'ya koy, `git add .` kullanma.', en: 'Run `git add tests/checkout.spec.js` to stage only that file — avoid `git add .`.' } },
              { id: 3, icon: '🔍', label: { tr: 'Staged diff\'i incele', en: 'Inspect staged diff' }, detail: { tr: '`git diff --staged` ile tam olarak hangi satirlarin commit\'e gidecegini gor.', en: 'Run `git diff --staged` to see exactly which lines will go into the commit.' } },
              { id: 4, icon: '✍️', label: { tr: 'Snapshot al', en: 'Take the snapshot' }, detail: { tr: '`git commit -m "fix(checkout): wait for payment iframe before asserting total"` ile kalici bir snapshot olustur.', en: 'Run `git commit -m "fix(checkout): wait for payment iframe before asserting total"` to create a permanent snapshot.' } },
              { id: 5, icon: '🔗', label: { tr: 'Geçmişi doğrula', en: 'Verify history' }, detail: { tr: '`git log --oneline -1` ciktisinda `a1b2c3d fix(checkout): ...` gibi yeni bir hash ve mesaj gorursun.', en: '`git log --oneline -1` shows a new hash and message like `a1b2c3d fix(checkout): ...`.' } },
            ],
          },
          commitJourneyFilm,
          {
            type: 'challenge',
            variant: 'order-sort',
            id: 'git-commit-order-01',
            question: { tr: 'Staging\'den commit\'e giden gercek akisi sirala.', en: 'Order the real staging-to-commit flow.' },
            items: [
              { id: '1', text: { tr: '`git status` ile degisen dosyalari gor', en: 'Run `git status` to see changed files' }, order: 1 },
              { id: '2', text: { tr: '`git add tests/checkout.spec.js` ile dosyayi stage et', en: 'Run `git add tests/checkout.spec.js` to stage the file' }, order: 2 },
              { id: '3', text: { tr: '`git diff --staged` ile stage edileni dogrula', en: 'Run `git diff --staged` to verify what is staged' }, order: 3 },
              { id: '4', text: { tr: '`git commit -m "fix(checkout): ..."` ile snapshot al', en: 'Run `git commit -m "fix(checkout): ..."` to take the snapshot' }, order: 4 },
              { id: '5', text: { tr: '`git log --oneline -1` ile commit\'in olustugunu dogrula', en: 'Run `git log --oneline -1` to confirm the commit landed' }, order: 5 },
            ],
            xpReward: 10,
          },
          {
            type: 'warning',
            content: '`git add .` komutunu QA projelerinde körlemesine kullanma. Screenshot, video, `.env`, generated report veya local notları stage edebilir. Belirli dosyayı ekle veya commit öncesi `git diff --staged` ile kontrol et.',
          },
          {
            type: 'simulation',
            scenario: 'git-dot-folder',
            icon: '🔍',
            color: '#7c3aed',
            title: { en: 'X-Ray: what is inside .git/?', tr: 'X-Ray: .git/ içinde ne var?' },
            description: { en: 'When you run `git init`, a hidden `.git/` folder appears. See what each part does.', tr: '`git init` çalıştırınca gizli `.git/` klasörü oluşur. Her parçanın ne yaptığını gör.' },
          },
          {
            type: 'heading',
            text: 'İki başlangıç yolu: init vs clone',
          },
          {
            type: 'simulation',
            scenario: 'git-clone-vs-init',
            icon: '🔀',
            color: '#0891b2',
            title: { en: 'Compare: start from scratch vs join a team', tr: 'Karşılaştır: sıfırdan başla vs takıma katıl' },
            description: { en: 'See the two paths side by side.', tr: 'İki yolu yan yana gör: yeni proje için `git init`, var olan takım reposu için `git clone`.' },
          },
          gitClonePractice,
          {
            type: 'heading',
            text: 'git diff çıktısını okumak',
          },
          {
            type: 'simulation',
            scenario: 'git-diff-reader',
            icon: '📊',
            color: '#059669',
            title: { en: 'Understand diff: red removed, green added', tr: 'Diff anla: kırmızı silindi, yeşil eklendi' },
            description: { en: 'Watch a real diff appear line by line.', tr: 'Gerçek diff çıktısının satır satır oluşmasını izle.' },
          },
          {
            type: 'table',
            headers: ['Komut', 'Ne gösterir', 'Ne zaman kullan'],
            rows: [
              ['`git diff`', 'Stage edilmemiş değişiklikler (çalışma alanı vs staging)', 'Henüz stage etmediğin değişiklikleri görmek için'],
              ['`git diff --staged`', 'Stage edilmiş değişiklikler (staging vs son commit)', 'Commit\'e tam olarak ne gireceğini kontrol etmek için'],
              ['`git diff HEAD`', 'Tüm değişiklikler (çalışma alanı vs son commit)', 'Son committen beri neyin değiştiğini topluca görmek için'],
            ],
          },
          {
            type: 'heading',
            text: 'git log çıktısını okumak',
          },
          {
            type: 'simulation',
            scenario: 'git-log-timeline',
            icon: '📜',
            color: '#b45309',
            title: { en: 'Commit Timeline: HEAD, branches and hashes', tr: 'Commit Zaman Çizelgesi: HEAD, branch ve hash' },
            description: { en: 'See how log output maps to a visual commit chain.', tr: 'Log çıktısının commit zincirine nasıl karşılık geldiğini gör.' },
          },
          {
            type: 'quiz',
            question: 'Çalışma dizininde 10 değişmiş dosya var ama commit\'ten önce sadece 3\'üne `git add` çalıştırdın. Commit\'e ne girer?',
            options: [
              { id: 'a', text: 'Git her zaman tüm değişiklikleri commit eder, 10 dosya da girer' },
              { id: 'b', text: 'Sadece stage edilen 3 dosya — diğer 7 değişiklik commit dışında kalır' },
              { id: 'c', text: 'Hiçbiri, çünkü tüm dosyaları aynı anda stage etmen gerekir' },
              { id: 'd', text: '3 dosya artı commit\'i engelleyen bir uyarı' },
            ],
            correct: 'b',
            explanation: 'Staging area (index) tam olarak adının söylediği şeydir: bir sonraki commit\'e gireceklerin bilinçli bir seçimi. `git add`, belirli dosyaları bu seçime taşır; `git commit` sadece stage edilenin anlık görüntüsünü alır. Geri kalan 7 değişmiş dosya, çalışma dizininde dokunulmadan kalır — daha sonra ayrı bir commit\'te stage edilmeye hazır.',
            retryQuestion: {
              question: '`git add dosya1.js dosya2.js` çalıştırıp ardından hemen `git add dosya3.js` çalıştırıyorsun, sonra `git commit` yapıyorsun. Bu TEK commit\'e hangi dosyalar girer?',
              options: [
                { id: 'a', text: 'Sadece dosya3.js, çünkü ikinci `git add` ilkinin üzerine yazar' },
                { id: 'b', text: 'Üç dosyanın hepsi — her `git add` çağrısı mevcut staging seçimine ekler, onu değiştirmez' },
                { id: 'c', text: 'Hiçbiri — her şeyi tek komutta stage etmen gerekir' },
                { id: 'd', text: 'Sadece dosya1.js ve dosya2.js' },
              ],
              correct: 'b',
              explanation: '`git add` ekleyicidir: her çağrı mevcut staging seçimini sıfırlamak yerine ona daha fazla dosya ekler. Yani dosya1.js+dosya2.js\'i stage edip ayrıca dosya3.js\'i stage etmek, üçünün de birlikte stage edilmesiyle sonuçlanır — sıradaki `git commit`, kaç ayrı `git add` çağrısının o seçimi oluşturduğundan bağımsız olarak index\'te o anda bulunan her şeyin anlık görüntüsünü alır.',
            },
          },
        ],
      },
      {
        title: '🚫 .gitignore: Doğru Dosyaları Git Dışında Tut',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🗄️',
            content: '.gitignore, bir hukuk ekibinin müşteriye gönderilecek sözleşme paketine bastığı "yayınlanmasın" damgası gibi çalışır: taslaklar ofis dosya dolabında durmaya devam eder, sadece hiçbir zaman binadan çıkmazlar. Burada kavramayı netleştiren kritik soru: bir dosya zaten repository\'ye commit edildiyse onu .gitignore\'a eklemek Git geçmişinden siler mi? Hayır — .gitignore yalnızca izlenmeyen (untracked) dosyaların yanlışlıkla stage\'lenmesini engeller; daha önce commit edilmiş her şey açıkça temizlenene kadar tarihte kalır. Java analojisi: Maven\'ın varsayılan .gitignore\'u `target/` klasörünü aynı nedenle dışlar — build aracı bu dosyaları deterministik biçimde yeniden üretir, dolayısıyla kaynağı (pom.xml + src/) göndermek yeterlidir ve target/\'ı commit etmek her build\'de repository\'yi megabaytlarca şişirir. QA otomasyonunda bu sorun, biri Playwright `test-results/` klasörünü içinde video kayıtlarıyla birlikte yanlışlıkla commit ettiğinde kendini gösterir — clone süresi bir gecede üçe katlanır ve production URL\'leri hakkındaki hassas test verisi genel repository geçmişine sızar.',
          },
          {
            type: 'heading',
            text: 'Amaç: .gitignore neden var?',
          },
          {
            type: 'text',
            content: '.gitignore dosyası Git\'e hangi dosya ve klasörleri asla takip etmemesi gerektiğini söyler: build çıktısı, indirilen bağımlılıklar, IDE ayarları, OS çöp dosyaları, loglar ve secret\'lar. Paylaşılan ve commit edilen bir dosyadır, böylece tüm takım aynı şeyleri elle hatırlamadan otomatik olarak yok sayar. Java analojisi: bir Maven projesi derlenmiş class dosyalarını ve oluşturulan jar\'ları içeren target klasörünü asla commit etmez, sadece pom.xml ve kaynak dosyalar version control\'dedir. Aynı mantık JavaScript projesindeki node_modules klasörü için de geçerlidir — üretilen sonucu değil, tarifi yani package.json\'ı commit edersin.',
          },
          {
            type: 'heading',
            text: 'İlk karar: commit mi ignore mu?',
          },
          {
            type: 'grid',
            cols: 3,
            items: [
              { icon: '✅', label: 'Commit et', desc: 'Source code, testler, README, package.json, pom.xml, lockfile dosyaları, Dockerfile, CI workflow dosyaları ve .env.example gibi güvenli örnek config dosyaları.' },
              { icon: '🚫', label: 'Ignore et', desc: 'Generated output, indirilen dependency klasörleri, local raporlar, screenshot/video çıktıları, loglar, IDE cache dosyaları, OS çöp dosyaları ve gerçek secret içeren .env dosyaları.' },
              { icon: '🔎', label: 'Kanıtla', desc: 'Normal dosyaları görmek için git status, ignored dosyaları görmek için git status --ignored --short, eşleşen kuralı görmek için git check-ignore -v <dosya> kullan.' },
            ],
          },
          {
            type: 'simulation',
            scenario: 'gitignore-create-and-match',
            icon: '🚫',
            color: '#dc2626',
            title: { en: 'Create a .gitignore and watch it filter files', tr: '.gitignore oluştur ve dosyaları filtrelemesini izle' },
            description: { en: 'Watch how Git automatically skips matching files and folders from git status once a pattern exists.', tr: 'Bir desen eklendiğinde Git’in eşleşen dosya ve klasörleri git status’tan nasıl otomatik atladığını izle.' },
          },
          {
            type: 'heading',
            text: 'Nasıl Oluşturulur: Git Bash, IntelliJ ve Diğer IDE\'ler',
          },
          {
            type: 'table',
            headers: ['Yöntem', 'Adımlar', 'Not'],
            rows: [
              ['Git Bash / macOS / Linux terminal', '`touch .gitignore` ile oluştur, sonra `code .gitignore`, `nano .gitignore` veya Windows Git Bash içinde `notepad .gitignore` ile düzenle', 'Git Bash veya Unix-like terminal kullanıyorsan en hızlı yol'],
              ['Windows CMD', '`type nul > .gitignore` ile oluştur, sonra `notepad .gitignore` ile düzenle', 'Explorer adres çubuğuna `cmd` yazıp açtığın terminal için pratik'],
              ['PowerShell', '`New-Item .gitignore -ItemType File` ile oluştur, sonra `notepad .gitignore` ile düzenle', 'Windows Terminal, VS Code terminal ve PowerShell içinde çalışır'],
              ['IntelliJ IDEA', 'Bir dosya/klasöre sağ tık → Git → Add to .gitignore, veya proje köküne New → File ile `.gitignore` adında dosya aç', 'IntelliJ build klasörlerini algılayıp otomatik yok saymayı da önerebilir'],
              ['VS Code', 'Explorer\'da New File ile `.gitignore` adında dosya oluştur; opsiyonel "gitignore" eklentisi dile göre şablon üretebilir', 'Eklenti yoksa hazır şablon üretici dahili değildir'],
              ['Şablon sitesi', 'github.com/github/gitignore veya gitignore.io adresine git, stack\'ini seç (Java, Maven, Node...), sonucu yapıştır', 'Sıfırdan bir proje için en iyi başlangıç noktası'],
            ],
          },
          {
            type: 'text',
            content: 'Nereye konur: hemen hemen her zaman proje kök dizinine, package.json veya pom.xml\'in yanına. Git ayrıca herhangi bir alt klasör içinde de bir .gitignore dosyasını destekler — iç içe (nested) bir .gitignore içindeki kurallar sadece o klasör ve altı için geçerlidir, belirli bir dosya için en yakın .gitignore kazanır. Kişisel olan ve takımla asla paylaşılmaması gereken yok sayma kuralları için ise global bir ignore dosyası kullanılır; bu, git config --global core.excludesFile ile bir kez ayarlanır, ya da repository-local ve hiçbir zaman commit edilmeyen .git/info/exclude dosyası kullanılır.',
          },
          {
            type: 'heading',
            text: 'İçeriğinde Neler Bulunur: Pattern Söz Dizimi',
          },
          {
            type: 'table',
            headers: ['Pattern', 'Anlamı', 'Örnek'],
            rows: [
              ['`# yorum`', '# ile başlayan satırlar Git tarafından yok sayılır, not almak için kullanılır', '`# build çıktısı`'],
              ['`*.log`', 'Wildcard — bu uzantıya sahip her dosyayı, her yerde yok sayar', 'app.log, error.log dosyalarını yok sayar'],
              ['`node_modules/`', 'Sondaki slash — sadece klasörle eşleşir, aynı adlı bir dosyayla değil', 'tüm bağımlılık klasörünü yok sayar'],
              ['`/dist`', 'Baştaki slash — sadece proje kökünde eşleşir, alt klasörlerde değil', 'kök dist/\'i yok sayar, src/dist/\'i değil'],
              ['`**/temp`', 'Çift yıldız — temp\'i her klasör derinliğinde eşleştirir', 'temp/, a/temp/, a/b/temp/\'i yok sayar'],
              ['`!important.log`', 'Negation — önceki bir pattern\'in dışladığı dosyayı geri dahil eder', '*.log yok sayılsa da important.log\'u korur'],
              ['`.env*` + `!.env.example`', 'Gerçek environment dosyalarını ignore eder ama güvenli örnek dosyayı geri dahil eder', '.env ignore edilir, .env.example commit edilebilir'],
            ],
          },
          {
            type: 'code',
            label: 'QA automation projesi için gerçekçi bir .gitignore',
            language: 'bash',
            code: `# Bağımlılıklar\nnode_modules/\n\n# Build çıktısı\ndist/\nbuild/\ntarget/\n\n# Test rapor ve artifact\nplaywright-report/\ntest-results/\ncypress/screenshots/\ncypress/videos/\nallure-results/\nscreenshots/*.png\nreports/\n\n# Ortam ve secret\n.env*\n!.env.example\n\n# IDE ve local makine dosyaları\n.idea/\n.vscode/\n*.iml\n\n# OS dosyaları\n.DS_Store\nThumbs.db\n\n# Log ve geçici dosyalar\n*.log\nnpm-debug.log*\n*.tmp\n*.swp`,
          },
          {
            type: 'step-animation',
            id: 'git-gitignore-patterns-step-01',
            title: { tr: "node_modules/ ve .env* Satırları Git'e Ne Anlatır?", en: 'What Do node_modules/ and .env* Actually Tell Git?' },
            steps: [
              { id: 1, icon: '1️⃣', label: { tr: 'node_modules/ satırı SONUNDAKİ /…', en: 'The trailing / in node_modules/…' }, detail: { tr: "node_modules/ satırı SONUNDAKİ / ile bunun bir KLASÖR olduğunu belirtir — Git bu isimde bir klasörle KARŞILAŞTIĞI HER YERDE (kaç seviye derinlikte olursa olsun) onu YOK SAYAR.", en: "The trailing / in node_modules/ MARKS it as a FOLDER — Git IGNORES it EVERYWHERE it finds a folder with this name, no matter how DEEP." } },
              { id: 2, icon: '2️⃣', label: { tr: '.env* satırındaki * joker karakteri…', en: 'The * wildcard in .env*…' }, detail: { tr: '.env* satırındaki * joker karakteri .env, .env.local, .env.production gibi TÜM varyasyonları TEK bir kuralla KAPSAR.', en: 'The * wildcard in .env* COVERS every variation like .env, .env.local, .env.production with ONE single rule.' } },
              { id: 3, icon: '3️⃣', label: { tr: '!.env.example satırındaki ! işareti…', en: 'The ! mark in !.env.example…' }, detail: { tr: '!.env.example satırındaki ! işareti bir İSTİSNA tanımlar — bir önceki .env* kuralı BU dosyayı yok saysa bile, ! onu TEKRAR takip edilebilir yapar.', en: 'The ! mark in !.env.example DEFINES an EXCEPTION — even though the earlier .env* rule ignores this file, ! makes it TRACKABLE AGAIN.' } },
              { id: 4, icon: '4️⃣', label: { tr: '*.log gibi bir desen…', en: 'A pattern like *.log…' }, detail: { tr: '*.log gibi bir desen, klasör derinliğine BAKMAKSIZIN o UZANTIYA sahip HER dosyayı eşler — src/logs/app.log da, kök dizindeki debug.log da AYNI kuralla yakalanır.', en: 'A pattern like *.log matches EVERY file with that EXTENSION regardless of folder depth — src/logs/app.log and root-level debug.log are BOTH caught by the SAME rule.' } },
              { id: 5, icon: '5️⃣', label: { tr: '.gitignore SADECE henüz TAKİP EDİLMEYEN…', en: '.gitignore only affects files NOT YET…' }, detail: { tr: ".gitignore SADECE henüz TAKİP EDİLMEYEN dosyalar için çalışır — bir dosya ZATEN commit edilmişse, .gitignore'a eklemek onu OTOMATİK olarak silmez, git rm --cached ile AYRICA çıkarman gerekir.", en: '.gitignore only WORKS for files NOT YET tracked — if a file is ALREADY committed, adding it to .gitignore does NOT AUTOMATICALLY remove it, you must ALSO run git rm --cached.' } },
            ],
          },
          gitGitignorePractice,
          {
            type: 'challenge',
            variant: 'order-sort',
            id: 'git-gitignore-setup-order-01',
            question: { tr: 'Yeni bir projede .gitignore kurma sırasını diz.', en: 'Order the steps for setting up .gitignore in a new project.' },
            items: [
              { id: '1', text: { tr: 'touch .gitignore ile dosyayı proje kökünde oluştur', en: 'Create the file at the project root with touch .gitignore' }, order: 1 },
              { id: '2', text: { tr: 'node_modules/, dist/, .env* gibi kalıpları ekle', en: 'Add patterns like node_modules/, dist/, .env*' }, order: 2 },
              { id: '3', text: { tr: "git status ile artık İZLENMEYEN dosyaları doğrula", en: 'Verify the now-UNTRACKED files with git status' }, order: 3 },
              { id: '4', text: { tr: 'git add .gitignore && git commit ile kaydet', en: 'Save it with git add .gitignore && git commit' }, order: 4 },
              { id: '5', text: { tr: 'ZATEN takip edilen bir dosya varsa git rm --cached ile ayrıca çıkar', en: 'If a file was ALREADY tracked, also remove it with git rm --cached' }, order: 5 },
            ],
            xpReward: 10,
          },
          {
            type: 'warning',
            content: 'Gerçek iş tuzağı: bir dosya .gitignore\'a eklenmeden önce zaten commit edilmişse, Git onu takip etmeye devam eder — kural sadece henüz takip edilmeyen dosyaları etkiler. Takibi durdurmak için `git rm --cached <dosya>` çalıştırmalısın (dosya diskte kalır), sonra commit et. Eğer gerçek token/şifre daha önce push edildiyse .gitignore bunu history\'den silmez: secret hemen revoke/rotate edilmeli, history cleanup gerekip gerekmediğine takımla karar verilmelidir.',
          },
          {
            type: 'simulation',
            scenario: 'gitignore-already-tracked-fix',
            icon: '🆘',
            color: '#b45309',
            title: { en: 'The most common .gitignore mistake — and the real fix', tr: 'En yaygın .gitignore hatası — ve gerçek düzeltme' },
            description: { en: 'See why adding an already-committed file to .gitignore is not enough, and what git rm --cached actually does.', tr: 'Zaten commit edilmiş bir dosyayı .gitignore’a eklemenin neden yetmediğini ve git rm --cached’in gerçekte ne yaptığını gör.' },
          },
          gitignoreCreatePractice,
          gitignoreVerifyPractice,
          gitignoreRescuePractice,
          gitignoreFilterFilm,
          {
            type: 'grid',
            cols: 2,
            items: [
              { icon: '🚫', label: '.gitignore', desc: 'Git\'e hangi takip edilmeyen dosya ve klasörleri asla otomatik stage etmemesi gerektiğini söyleyen, paylaşılan bir pattern dosyası.' },
              { icon: '🗂️', label: 'Konum', desc: 'Takım çapındaki kurallar için proje kökü; sınırlı kurallar için iç içe klasörler; sadece kişisel kurallar için global dosya.' },
              { icon: '☕', label: 'Java analojisi', desc: 'Maven\'in target klasörünü asla version control\'e almaması gibi, .gitignore da üretilen ve makineye özgü dosyaları geçmişten uzak tutar.' },
              { icon: '🧪', label: 'QA değeri', desc: 'Test raporlarını, screenshot\'ları, videoları ve secret\'ları paylaşılan repodan uzak tutar; diff\'ler okunabilir, credential\'lar güvende kalır.' },
            ],
          },
          {
            type: 'quiz',
            question: 'Bir takım arkadaşın node_modules/\'u .gitignore\'a az önce ekledi, ama bu klasör haftalar önce zaten commit edilmiş ve hâlâ her diff\'te görünüyor. Doğru düzeltme nedir?',
            options: [
              { id: 'a', text: 'Hiçbir şey — .gitignore bir sonraki commit\'te onu otomatik kaldırır' },
              { id: 'b', text: 'node_modules klasörünü diskten sil, böylece Git onu unutur' },
              { id: 'c', text: 'git rm --cached -r node_modules çalıştır, sonra değişikliği commit et' },
              { id: 'd', text: '.gitignore\'ı .gitignore.txt yapıp tekrar .gitignore\'a çevir' },
            ],
            correct: 'c',
            explanation: '.gitignore sadece Git\'in henüz takip etmediği dosyaları etkiler. Daha önce commit edilmiş bir şeyin takibini durdurmak için git rm --cached (klasörler için -r ekleyerek) kullanılır ve commit edilir — bu, dosyayı diskten silmeden gelecekteki takipten çıkarır.',
          
        retryQuestion: {
      "question": {
            "tr": "Bir proje dosyasını yanlışlıkla commit ettikten sonra .gitignore dosyasına eklediniz, ancak dosya hâlâ 'git status' komutunda değişikliğe uğramış görünüyor. Git'e bu dosyanın takibini tamamen bırakmasını nasıl söylersiniz?",
            "en": "You added a file to .gitignore after accidentally committing it, but it still shows up as modified in 'git status'. How do you tell Git to stop tracking this file entirely?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Sadece dosyayı sistemden silip tekrar ekle",
                        "en": "Just delete the file from the system and re-add it"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "git reset --hard komutu ile tüm değişiklikleri temizle",
                        "en": "Use git reset --hard to clear all changes"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "git rm --cached <dosya_adı> komutunu kullan ve değişikliği commit et",
                        "en": "Use the command git rm --cached <filename> and commit the change"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "git clean -f komutu ile tüm untracked dosyaları sil",
                        "en": "Run git clean -f to remove all untracked files"
                  }
            }
      ],
      "correct": "c",
      "explanation": {
            "tr": ".gitignore dosyası sadece henüz Git tarafından takip edilmeyen (untracked) dosyalar için geçerlidir. Daha önce commit edilmiş dosyalar için Git'in önbelleğinden kaldırmak adına --cached bayrağı kullanılmalıdır.",
            "en": "The .gitignore file only applies to files that are not already tracked by Git. For files that have been previously committed, the --cached flag must be used to remove the file from Git's index without deleting it from the disk."
      }
}
},
        ],
      },
      {
        title: '🌿 Branch & Switch: Oluştur, Yeniden Adlandır ve Rafa Kaldır',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🌱',
            content: 'Branch, ana yoldan ayrılan güvenli bir servis yolu gibidir: ana yolda (main) trafik akmaya devam ederken sen kendi şeridinde kazı yapar, asfaltı söker, denersin — ve işin bittiğinde şeridini ana yola geri bağlarsın. Peki madem değişikliği doğrudan main’de de yapabiliyorsun, neden ayrı bir branch açma zahmetine giresin? Çünkü main yalnızca senin değil, ekibin ve çoğu zaman CI/deploy hattının da üstünde durduğu yoldur; orada yarım kalmış bir kazı, senin işin bitene kadar herkesin ilerlemesini durdurur. Java’da bir sınıfı doğrudan `master` kopyanda değil, kendi kopyanda refactor edip sonra birleştirmen ne kadar doğalsa Git branch’i de odur — fark şu ki Git bu ayrımı dosya kopyalayarak değil, aynı geçmişin iki farklı ucunu işaret ederek yapar (bu yüzden branch açmak neredeyse bedavadır). QA açısından bunun bedeli nettir: test suite’ini doğrudan main’de düzenleyen bir ekipte, yarım kalan bir locator değişikliği gece regresyon koşumunu kırar ve sabah kimse "bu gerçek bir bug mı, yoksa yarım iş mi" sorusuna cevap veremez. İki kişi aynı satıra dokunduğunda çıkan conflict ise bir arıza değil, Git’in "burada iki farklı niyet var, kararı insan versin" demesidir.',
          },
          {
            type: 'simulation',
            title: { en: '1) Branch creation: main stays safe', tr: '1) Branch açma: main güvende kalır' },
            icon: '🌿',
            color: '#16a34a',
            scenario: 'git-branch-lab',
            description: { en: 'See what each branch command changes: list local branches, create `hasan`, switch to it, rename it, then push with upstream.', tr: 'Her branch komutunun ne değiştirdiğini gör: local branch listele, `hasan` oluştur, ona geç, adını değiştir, sonra upstream ile push et.' },
          },
          {
            type: 'table',
            headers: ['Komut', 'Ne zaman kullanılır?', 'Sonuçta ne olur?'],
            rows: [
              ['`git branch`', 'Localde hangi branchler var görmek için', 'Local branchleri listeler; `*` aktif branch’i gösterir'],
              ['`git branch hasan`', 'Localde branch oluşturmak ama ona geçmemek için', '`hasan` oluşur, ama hâlâ eski branch üzerinde kalırsın'],
              ['`git checkout -b hasan`', 'Eski kullanım: tek komutta oluşturup geçmek için', '`hasan` oluşur ve aktif branch `hasan` olur'],
              ['`git switch -c hasan`', 'Modern kullanım: tek komutta oluşturup geçmek için', '`checkout -b` ile aynı niyet, daha okunur komut'],
              ['`git switch hasan`', 'Var olan branch’e geçmek için', 'Working tree seçilen branch’in haline gelir'],
              ['`git checkout hasan`', 'Eski branch değiştirme komutu', 'Aynı branch switch etkisi; ama checkout başka anlamlara da geldiği için switch daha nettir'],
              ['`git branch -m main`', 'Aktif local branch adını değiştirmek için', 'Bulunduğun branch’in adı `main` olur'],
              ['`git branch -m old_name new_name`', 'Aktif olmayan belirli bir branch’i rename etmek için', '`old_name` localde `new_name` olur'],
            ],
          },
          {
            type: 'code',
            label: 'Branch listele ve geçmeden oluştur',
            language: 'bash',
            code: `# 1. Tüm local branchleri listele, * aktif olanı gösterir\ngit branch\n#   main\n# * develop\n\n# 2. Geçmeden bir branch oluştur\ngit branch bugfix/login-timeout`,
          },
          {
            type: 'callout',
            icon: '🧪',
            content: { tr: 'Şimdi Git Temelleri sekmesindeki gerçek terminalde dene: yeni bir branch oluşturup üzerine geç (`git branch`, `git switch`/`git checkout`) — sandbox\'taki "Yeni bir branch oluşturup üzerine geç" görevi tam bunu istiyor.', en: 'Try it now in the real terminal on the Git Basics tab: create a new branch and switch onto it (`git branch`, `git switch`/`git checkout`) — the sandbox\'s "Create a new branch and switch onto it" mission asks for exactly this.' },
          },
          {
            type: 'code',
            label: 'Tek adımda oluştur+geç, yeniden adlandır ve doğrula',
            language: 'bash',
            code: `# 3. Tek adımda hem oluştur hem geç (modern syntax)\ngit switch -c bugfix/login-timeout\n\n# 4. Aktif branch'i yeniden adlandır\ngit branch -m bugfix/login-timeout-fix\n\n# 5. Rename'i doğrula\ngit branch\n# main\n#   develop\n# * bugfix/login-timeout-fix`,
          },
          {
            type: 'code-playground',
              relatedTopicId: 'git-branch-practice-01',
            id: 'git-branch-practice-01',
            label: { tr: 'Micro Lab: git branch', en: 'Micro Lab: git branch' },
            language: 'bash',
            task: {
              tr: '`bugfix/login-timeout` adinda bir branch olustur ve ayni anda ona gec (`git switch -c`), sonra `git branch -m` ile `bugfix/login-timeout-fix` olarak yeniden adlandir. Java\'da bunu bir feature branch acmak icin IDE\'nin "New Branch" diyaloguna benzet — burada komut iki ayri eylemi (`create` + `switch`) tek satirda birlestirir.',
              en: 'Create a branch named `bugfix/login-timeout` and switch to it at the same time (`git switch -c`), then rename it to `bugfix/login-timeout-fix` with `git branch -m`. Think of this like your IDE\'s "New Branch" dialog when starting a feature branch in Java — except here one command combines two actions (`create` + `switch`).',
            },
            explanation: {
              tr: 'TODO satirini gercek `git switch -c` komutuyla degistir. Sandbox gercek bir repo calistirmiyor; amac dogru komut yapisini elinle kurmak.',
              en: 'Replace the TODO line with the real `git switch -c` command. The sandbox does not run a real repo; the goal is to build the correct command structure by hand.',
            },
            code: {
              tr: `git branch\n// EKSIK: bugfix/login-timeout branch'ini olustur ve ona gec\ngit branch -m bugfix/login-timeout-fix\ngit branch`,
              en: `git branch\n// MISSING: create bugfix/login-timeout and switch to it\ngit branch -m bugfix/login-timeout-fix\ngit branch`,
            },
            starterCode: {
              tr: `git branch\n// TODO: bugfix/login-timeout branch'ini olustur ve ona gec\ngit branch -m bugfix/login-timeout-fix\ngit branch`,
              en: `git branch\n// TODO: create bugfix/login-timeout and switch to it\ngit branch -m bugfix/login-timeout-fix\ngit branch`,
            },
            solutionCode: {
              tr: `git branch\ngit switch -c bugfix/login-timeout\ngit branch -m bugfix/login-timeout-fix\ngit branch`,
              en: `git branch\ngit switch -c bugfix/login-timeout\ngit branch -m bugfix/login-timeout-fix\ngit branch`,
            },
            expected: {
              tr: 'Son `git branch` ciktisinda aktif (`*`) branch `bugfix/login-timeout-fix` olarak gorunur.',
              en: 'The final `git branch` output shows the active (`*`) branch as `bugfix/login-timeout-fix`.',
            },
            hints: [
              { tr: '`git switch -c <isim>` hem olusturur hem o branch\'e gecer.', en: '`git switch -c <name>` both creates and switches to that branch in one step.' },
              { tr: '`git branch -m <yeni-isim>` SADECE aktif branch\'i yeniden adlandirir.', en: '`git branch -m <new-name>` renames ONLY the currently active branch.' },
              { tr: 'Yildizli (`*`) satir, su an uzerinde oldugun branch\'i gosterir.', en: 'The starred (`*`) line shows which branch you are currently on.' },
            ],
            xpReward: 10,
          },
          {
            type: 'step-animation',
            id: 'git-branch-step-01',
            title: { tr: 'Adim Adim: git branch', en: 'Step by Step: git branch' },
            steps: [
              { id: 1, icon: '📂', label: { tr: 'Mevcut branch\'leri listele', en: 'List existing branches' }, detail: { tr: '`git branch` calistir: `* develop` satiri aktif branch\'i gosterir.', en: 'Run `git branch`: the `* develop` line shows the currently active branch.' } },
              { id: 2, icon: '🌱', label: { tr: 'Olustur ve gec', en: 'Create and switch' }, detail: { tr: '`git switch -c bugfix/login-timeout` ile yeni branch\'i olustur ve aninda uzerine gec.', en: 'Run `git switch -c bugfix/login-timeout` to create the new branch and move onto it instantly.' } },
              { id: 3, icon: '✏️', label: { tr: 'Yeniden adlandir', en: 'Rename it' }, detail: { tr: '`git branch -m bugfix/login-timeout-fix` SADECE aktif branch\'in adini degistirir.', en: 'Run `git branch -m bugfix/login-timeout-fix` to rename ONLY the active branch.' } },
              { id: 4, icon: '🔎', label: { tr: 'Sonucu dogrula', en: 'Verify the result' }, detail: { tr: '`git branch` tekrar calistir: artik `* bugfix/login-timeout-fix` gorursun.', en: 'Run `git branch` again: now you see `* bugfix/login-timeout-fix`.' } },
              { id: 5, icon: '🚀', label: { tr: 'Calismaya basla', en: 'Start working' }, detail: { tr: 'Bu branch artik izole; main\'e dokunmadan commit\'ler burada birikir.', en: 'This branch is now isolated; commits accumulate here without touching main.' } },
            ],
          },
          {
            type: 'challenge',
            variant: 'order-sort',
            id: 'git-branch-order-01',
            question: { tr: 'Branch olusturma, gecis ve yeniden adlandirma akisini sirala.', en: 'Order the branch create, switch and rename flow.' },
            items: [
              { id: '1', text: { tr: '`git branch` ile mevcut branch\'leri listele', en: 'Run `git branch` to list existing branches' }, order: 1 },
              { id: '2', text: { tr: '`git switch -c bugfix/login-timeout` ile olustur ve gec', en: 'Run `git switch -c bugfix/login-timeout` to create and switch' }, order: 2 },
              { id: '3', text: { tr: '`git branch -m bugfix/login-timeout-fix` ile yeniden adlandir', en: 'Run `git branch -m bugfix/login-timeout-fix` to rename it' }, order: 3 },
              { id: '4', text: { tr: '`git branch` ile sonucu dogrula', en: 'Run `git branch` to verify the result' }, order: 4 },
              { id: '5', text: { tr: 'Yeni isimli branch uzerinde calismaya basla', en: 'Start working on the newly named branch' }, order: 5 },
            ],
            xpReward: 10,
          },
          {
            type: 'warning',
            content: 'Commit edilmemiş değişikliğin varsa Git branch değiştirmeyi engelleyebilir; özellikle dosyan branch değişince ezilecekse durur. Önce `git status` bak; sonra işi commit et, stash’e al veya gerçekten silmek istiyorsan bilinçli sil. Körlemesine branch değiştirme.',
          },
          {
            type: 'heading',
            text: 'git stash: commit etmeden yarım işi geçici rafa koy',
          },
          {
            type: 'simulation',
            scenario: 'git-stash-flow',
            icon: '📦',
            color: '#7c3aed',
            title: { en: 'Stash: temporary shelf for unfinished work', tr: 'Stash: yarım kalan iş için geçici raf' },
            description: { en: 'Watch work move to a temporary shelf, let you switch branches safely, then restore when you return.', tr: 'Yarım kalan değişikliğin geçici rafa taşınmasını izle; branch değiştir, geri dönünce işini raftan geri al.' },
          },
          {
            type: 'table',
            headers: ['Komut', 'Ne yapar?', 'Ne zaman kullanılır?'],
            rows: [
              ['`git stash`', 'Commit edilmemiş değişiklikleri geçici rafa koyar ve working tree’yi temizler', 'Branch değiştirmen gerekiyor ama iş commit edilmeye hazır değilse'],
              ['`git stash pop`', 'En son stash’i geri getirir ve raftan kaldırır', 'Kendi branch’ine döndün ve yarım işine devam edeceksen'],
              ['`git stash list`', 'Rafta bekleyen tüm stash kayıtlarını gösterir', 'Unutulmuş stash var mı kontrol etmek için'],
              ['`git stash drop`', 'Seçilen stash kaydını siler', 'Artık gerekmeyen geçici işi temizlemek için'],
            ],
          },
          {
            type: 'code',
            label: 'Yarım işi gör, sonra rafa kaldır',
            language: 'bash',
            code: `# 1. tests/login.spec.js üzerinde yarım iş var ama acil bir hotfix çıktı
git status
# modified:   tests/login.spec.js

# 2. Yarım işi geçici rafa kaldır
git stash
# Saved working directory and index state WIP on feature/hasan: a1b2c3d test: login flow`,
          },
          {
            type: 'callout',
            icon: '🧪',
            content: { tr: 'Şimdi Git Temelleri sekmesindeki gerçek terminalde dene: işi rafa kaldır ve geri getir (`git stash`, `git stash pop`) — sandbox\'taki "İşi rafa kaldır ve geri getir" görevi bu adımların birebir aynısı.', en: 'Try it now in the real terminal on the Git Basics tab: shelve work and bring it back (`git stash`, `git stash pop`) — the sandbox\'s "Shelve work and bring it back" mission is exactly this sequence.' },
          },
          {
            type: 'code',
            label: 'Güvenle geç, sonra rafa kaldırdığın işi geri al',
            language: 'bash',
            code: `# 3. Working tree temiz olduğu için güvenle geç
git switch main
# ...hotfix'i düzelt, commitle, push et...

# 4. Kendi branch'ine dön ve rafa kaldırdığın işi geri al
git switch feature/hasan
git stash pop
# Dropped refs/stash@{0} (e4f5...)  -> tests/login.spec.js tekrar modified`,
          },
          {
            type: 'code-playground',
              relatedTopicId: 'git-stash-practice-01',
            id: 'git-stash-practice-01',
            label: { tr: 'Micro Lab: git stash', en: 'Micro Lab: git stash' },
            language: 'bash',
            task: {
              tr: '`tests/login.spec.js` uzerinde commit edilmemis bir degisikligin var. `git stash` ile rafa kaldir, `git switch main` ile gec, sonra `git switch feature/hasan` ile geri don ve `git stash pop` ile isini geri al. Java\'da bunu IDE\'nin "Shelve Changes" ozelligine benzet — IntelliJ\'de degisiklikleri gecici olarak rafa kaldirip sonra "Unshelve" ile geri getirirsin.',
              en: 'You have uncommitted changes in `tests/login.spec.js`. Shelve them with `git stash`, switch with `git switch main`, then return with `git switch feature/hasan` and bring the work back with `git stash pop`. Think of it like IntelliJ\'s "Shelve Changes" feature in Java — you temporarily shelve changes, then "Unshelve" them later.',
            },
            explanation: {
              tr: 'TODO satirini gercek `git stash` komutuyla degistir. Sandbox gercek bir repo calistirmiyor; amac dogru komut yapisini elinle kurmak.',
              en: 'Replace the TODO line with the real `git stash` command. The sandbox does not run a real repo; the goal is to build the correct command structure by hand.',
            },
            code: {
              tr: `git status\n// EKSIK: degisiklikleri gecici rafa kaldir\ngit switch main\ngit switch feature/hasan\ngit stash pop`,
              en: `git status\n// MISSING: shelve the changes temporarily\ngit switch main\ngit switch feature/hasan\ngit stash pop`,
            },
            starterCode: {
              tr: `git status\n// TODO: degisiklikleri gecici rafa kaldir\ngit switch main\ngit switch feature/hasan\ngit stash pop`,
              en: `git status\n// TODO: shelve the changes temporarily\ngit switch main\ngit switch feature/hasan\ngit stash pop`,
            },
            solutionCode: {
              tr: `git status\ngit stash\ngit switch main\ngit switch feature/hasan\ngit stash pop`,
              en: `git status\ngit stash\ngit switch main\ngit switch feature/hasan\ngit stash pop`,
            },
            expected: {
              tr: '`git stash pop` calistiktan sonra `tests/login.spec.js` tekrar "modified" olarak gorunur ve stash listesi bosalir.',
              en: 'After `git stash pop` runs, `tests/login.spec.js` shows as "modified" again and the stash list is empty.',
            },
            hints: [
              { tr: 'Once `git stash` calistirmadan branch degistirmeye calismak Git\'i engelleyebilir.', en: 'Trying to switch branches before running `git stash` can get blocked by Git.' },
              { tr: '`git stash pop` hem geri yukler hem stash listesinden siler; `apply` sadece geri yukler.', en: '`git stash pop` both restores and removes from the stash list; `apply` only restores.' },
              { tr: 'Birden fazla stash varsa `git stash list` ile hangisinin uste oldugunu kontrol et.', en: 'If you have multiple stashes, check which one is on top with `git stash list`.' },
            ],
            xpReward: 10,
          },
          {
            type: 'step-animation',
            id: 'git-stash-step-01',
            title: { tr: 'Adim Adim: git stash', en: 'Step by Step: git stash' },
            steps: [
              { id: 1, icon: '📝', label: { tr: 'Yarim isi gor', en: 'See the unfinished work' }, detail: { tr: '`git status` ile `modified: tests/login.spec.js` satirini gor; commit etmeye hazir degilsin.', en: 'Run `git status` and see `modified: tests/login.spec.js`; you are not ready to commit yet.' } },
              { id: 2, icon: '📦', label: { tr: 'Rafa kaldir', en: 'Shelve it' }, detail: { tr: '`git stash` calistir: "Saved working directory and index state WIP on feature/hasan: ..." mesajini gor.', en: 'Run `git stash`: see the message "Saved working directory and index state WIP on feature/hasan: ...".' } },
              { id: 3, icon: '🔀', label: { tr: 'Guvenle gec', en: 'Switch safely' }, detail: { tr: 'Working tree artik temiz oldugu icin `git switch main` engellenmeden calisir.', en: 'Because the working tree is now clean, `git switch main` runs without being blocked.' } },
              { id: 4, icon: '↩️', label: { tr: 'Branch\'ine don', en: 'Return to your branch' }, detail: { tr: '`git switch feature/hasan` ile geri don.', en: 'Run `git switch feature/hasan` to come back.' } },
              { id: 5, icon: '🎁', label: { tr: 'Isini geri al', en: 'Bring your work back' }, detail: { tr: '`git stash pop` calistir: "Dropped refs/stash@{0}" mesaji ile `tests/login.spec.js` tekrar modified gorunur.', en: 'Run `git stash pop`: the "Dropped refs/stash@{0}" message appears and `tests/login.spec.js` shows modified again.' } },
            ],
          },
          gitBranchParallelFilm,
          {
            type: 'challenge',
            variant: 'order-sort',
            id: 'git-stash-order-01',
            question: { tr: 'Stash ile guvenli branch degisimi akisini sirala.', en: 'Order the safe branch-switch-with-stash flow.' },
            items: [
              { id: '1', text: { tr: '`git status` ile commit edilmemis degisikligi gor', en: 'Run `git status` to see the uncommitted change' }, order: 1 },
              { id: '2', text: { tr: '`git stash` ile isini gecici rafa kaldir', en: 'Run `git stash` to shelve your work temporarily' }, order: 2 },
              { id: '3', text: { tr: '`git switch main` ile temiz working tree ile gec', en: 'Run `git switch main` with a clean working tree' }, order: 3 },
              { id: '4', text: { tr: '`git switch feature/hasan` ile geri don', en: 'Run `git switch feature/hasan` to return' }, order: 4 },
              { id: '5', text: { tr: '`git stash pop` ile isini geri al', en: 'Run `git stash pop` to bring your work back' }, order: 5 },
            ],
            xpReward: 10,
          },
          gitStashPractice,
          {
            type: 'warning',
            content: '`git stash` geçici raftır, kalıcı yedek değildir. Stash’i unutursan değişiklikler uzun listede kaybolabilir; mümkünse küçük ve anlamlı commit, uzun süreli stash’ten daha güvenlidir.',
          },
          {
            type: 'git-practice',
            icon: '🌿',
            title: { en: 'Try it yourself: branch command mini lab', tr: 'Kendin dene: branch komut mini lab' },
            intro: { en: 'Write the commands in the order: list local branches, create `hasan`, switch to it, rename it, then show the create+switch shortcut.', tr: 'Komutları şu sıraya koy: local branchleri listele, `hasan` oluştur, ona geç, adını değiştir, sonra create+switch kısayolunu göster.' },
            starterCommands: `git branch -m feature/hasan
git checkout -b demo-branch
git branch hasan
git switch hasan
git branch`,
            expectedSteps: [
              { pattern: '^git\\s+branch$', label: { en: 'List local branches first', tr: 'Önce local branchleri listele' }, example: 'git branch' },
              { pattern: '^git\\s+branch\\s+hasan$', label: { en: 'Create `hasan` without switching', tr: '`hasan` branch’ini geçiş yapmadan oluştur' }, example: 'git branch hasan' },
              { pattern: '^git\\s+(switch|checkout)\\s+hasan$', label: { en: 'Switch to the existing `hasan` branch', tr: 'Var olan `hasan` branch’ine geç' }, example: 'git switch hasan' },
              { pattern: '^git\\s+branch\\s+-m\\s+feature\\/hasan$', label: { en: 'Rename the current branch', tr: 'Aktif branch’in adını değiştir' }, example: 'git branch -m feature/hasan' },
              { pattern: '^git\\s+(checkout\\s+-b|switch\\s+-c)\\s+demo-branch$', label: { en: 'Show create+switch in one command', tr: 'Tek komutta oluştur+geç kısayolunu göster' }, example: 'git switch -c demo-branch' },
            ],
            successOutput: { en: 'You covered the local branch basics: list, create, switch, rename, and create+switch.', tr: 'Local branch temelleri tamam: listele, oluştur, geç, rename et, tek komutta oluştur+geç.' },
            retryOutput: { en: 'Follow the state change order: list → create → switch → rename → create+switch shortcut.', tr: 'State değişim sırasını takip et: listele → oluştur → geç → rename → oluştur+geç kısayolu.' },
            help: { en: '`git branch hasan` and `git switch hasan` are different. One creates; the other moves you.', tr: '`git branch hasan` ile `git switch hasan` farklıdır. Biri oluşturur, diğeri seni taşır.' },
          },
          {
            type: 'simulation',
            title: { en: '2) Remote publish: branch GitHub tarafında ilk kez açılır', tr: '2) Remote publish: branch GitHub tarafında ilk kez açılır' },
            icon: '🚀',
            color: '#0ea5e9',
            scenario: 'git-remote-branch-publish',
            description: { en: 'Local branch’in remote branch’e dönüşmesini izle. İlk remote branch açma yöntemlerinden birini sadece bir kez kullan; upstream kurulduktan sonra o branch üzerindeyken `git push` yeterlidir.', tr: 'Local branch’in remote branch’e dönüşmesini izle. İlk remote branch açma yöntemlerinden birini sadece bir kez kullan; upstream kurulduktan sonra o branch üzerindeyken `git push` yeterlidir.' },
          },
          {
            type: 'warning',
            content: 'Remote’da branch açmak için ilk publish yöntemlerinden sadece birini bir kez kullan: `git push -u origin hasan` veya `git push -u https://github.com/hasankocaman/deneme2.git hasan`. Remote branch oluştuktan ve upstream kurulduktan sonra uzun komutları her seferinde tekrarlama; kendi branch’indeyken `git push` yazman yeterli olur.',
          },
          {
            type: 'table',
            headers: ['Komut', 'Ne zaman kullanılır?', 'Sonuç'],
            rows: [
              ['`git switch hasan`', 'Publish etmeden önce paylaşmak istediğin local branch’e geçmek için', 'Aktif branch `hasan` olur'],
              ['`git push -u origin hasan`', '`origin` GitHub repo adresine zaten bağlıysa en temiz yöntem', 'GitHub’da `hasan` remote branch’i açılır ve upstream hatırlanır'],
              ['`git push -u https://github.com/hasankocaman/deneme2.git hasan`', 'Remote adı yoksa veya doğrudan repo URL’iyle push etmek istiyorsan alternatif yöntem', 'O repo URL’inde remote branch açılır ve upstream kurulur'],
              ['`git branch -vv`', 'Upstream gerçekten bağlandı mı kontrol etmek için', 'Local branch yanında `[origin/hasan]` gibi takip bilgisi görünür'],
              ['`git push`', 'Upstream kurulduktan sonra ve `hasan` üzerindeyken', 'Yeni commit’ler hatırlanan remote branch’e gider'],
            ],
          },
          {
            type: 'code',
            label: 'Geç, sonra branch\'i bir kez yayınla',
            language: 'bash',
            code: `git switch hasan                                      # Local branch'ine geç

# 1. yöntem - origin zaten doğru repo ise:
git push -u origin hasan                              # Remote branch açılır ve upstream kurulur`,
          },
          {
            type: 'challenge',
            variant: 'order-sort',
            id: 'git-remote-publish-order-01',
            question: { tr: 'Bir local branch\'i GitHub\'da ilk kez yayınlama sırasını diz.', en: 'Order the sequence for publishing a local branch to GitHub for the first time.' },
            items: [
              { id: '1', text: { tr: '`git switch hasan` ile paylaşılacak branch\'e geç', en: 'Run `git switch hasan` to move to the branch you want to share' }, order: 1 },
              { id: '2', text: { tr: '`git push -u origin hasan` ile remote branch\'i oluştur ve upstream kur', en: 'Run `git push -u origin hasan` to create the remote branch and set upstream' }, order: 2 },
              { id: '3', text: { tr: '`git branch -vv` ile upstream bağlantısını doğrula', en: 'Run `git branch -vv` to verify the upstream connection' }, order: 3 },
            ],
            xpReward: 10,
          },
          {
            type: 'code',
            label: 'Alternatif yöntem, sonra doğrula ve sonraki push\'ları kısalt',
            language: 'bash',
            code: `# 2. yöntem - direkt repo URL'iyle alternatif:
git push -u https://github.com/hasankocaman/deneme2.git hasan

git branch -vv                                        # Kontrol: hasan, origin/hasan takip ediyor mu?
git push                                              # Sonraki push artık bu kadar kısa`,
          },
          {
            type: 'git-practice',
            icon: '🚀',
            title: { en: 'Kendin dene: local branch’i remote’a aç', tr: 'Kendin dene: local branch’i remote’a aç' },
            intro: { en: '`hasan` branch’i GitHub’da bir kez açılacak, upstream kontrol edilecek, sonra sonraki push kısalacak şekilde komutları sırala.', tr: '`hasan` branch’i GitHub’da bir kez açılacak, upstream kontrol edilecek, sonra sonraki push kısalacak şekilde komutları sırala.' },
            starterCommands: `git push
git branch -vv
git switch hasan
git push -u origin hasan`,
            expectedSteps: [
              { pattern: '^git\\s+switch\\s+hasan$', label: { en: 'Önce local branch’e geç', tr: 'Önce local branch’e geç' }, example: 'git switch hasan' },
              { pattern: '^git\\s+push\\s+-u\\s+(origin|https?:\\/\\/\\S+\\.git)\\s+(hasan|hasan2|feature\\/hasan)$', label: { en: 'Remote branch’i bir kez aç ve upstream kur', tr: 'Remote branch’i bir kez aç ve upstream kur' }, example: 'git push -u origin hasan' },
              { pattern: '^git\\s+branch\\s+-vv$', label: { en: 'Upstream bağlantısını kontrol et', tr: 'Upstream bağlantısını kontrol et' }, example: 'git branch -vv' },
              { pattern: '^git\\s+push$', label: { en: 'Upstream varsa sonraki push kısa olur', tr: 'Upstream varsa sonraki push kısa olur' }, example: 'git push' },
            ],
            successOutput: { en: 'Remote branch bir kez açıldı, upstream kontrol edildi ve sonraki push’lar kısa.', tr: 'Remote branch bir kez açıldı, upstream kontrol edildi ve sonraki push’lar kısa.' },
            retryOutput: { en: 'Sıra şöyle olmalı: branch’e geç → bir kez push -u → branch -vv → kısa git push.', tr: 'Sıra şöyle olmalı: branch’e geç → bir kez push -u → branch -vv → kısa git push.' },
            help: { en: 'İlk publish için iki yöntemi birden çalıştırma. `origin` veya direkt repo URL yolundan birini seç; sonra normal `git push` kullan.', tr: 'İlk publish için iki yöntemi birden çalıştırma. `origin` veya direkt repo URL yolundan birini seç; sonra normal `git push` kullan.' },
          },
          {
            type: 'code',
            label: 'fetch ve düz pull',
            language: 'bash',
            code: `# fetch: remote history'yi indir, kendi branch'ine DOKUNMA
git fetch origin
# main: 3 yeni commit mevcut, local main'in değişmedi

# pull: tek adımda fetch + merge (historyler ayrışmışsa bir merge commit'i oluşturur)
git pull origin main
# Merge made by the 'ort' strategy. -> ekstra "Merge branch 'main'" commit'i çıkar`,
          },
          {
            type: 'step-animation',
            id: 'git-fetch-vs-pull-step-01',
            title: { tr: "git fetch Neden Branch'ine HİÇ Dokunmaz, git pull Neden Dokunur?", en: 'Why Does git fetch NEVER Touch Your Branch, But git pull Does?' },
            steps: [
              { id: 1, icon: '1️⃣', label: { tr: 'git fetch origin çalıştırıldığında…', en: 'Running git fetch origin…' }, detail: { tr: "git fetch origin çalıştırıldığında, uzak sunucudaki YENİ commit'ler senin LOKAL .git veritabanına İNDİRİLİR (örn. origin/main güncellenir) — ama senin ÇALIŞMA dizinindeki hiçbir dosya DEĞİŞMEZ.", en: "Running git fetch origin DOWNLOADS the remote's new commits into your LOCAL .git database (e.g. origin/main gets updated) — but NOT a single file in your WORKING directory CHANGES." } },
              { id: 2, icon: '2️⃣', label: { tr: 'fetch sonrası git log origin/main çalıştırırsan…', en: 'Running git log origin/main after fetch…' }, detail: { tr: "fetch sonrası git log origin/main --oneline çalıştırırsan YENİ commit'leri GÖREBİLİRSİN, ama git log (kendi main'in) HİÇBİR YENİ commit GÖSTERMEZ — indirilen veri sadece \"referans\" olarak DURUR, henüz BİRLEŞTİRİLMEMİŞTİR.", en: "Running git log origin/main --oneline after fetch lets you SEE the new commits, but git log (your own main) shows NO new commits — the downloaded data just SITS there as a \"reference\", not yet MERGED." } },
              { id: 3, icon: '3️⃣', label: { tr: 'git pull origin main ise…', en: 'git pull origin main instead…' }, detail: { tr: "git pull origin main ise İKİ işlemi TEK komutta yapar: ÖNCE fetch ile aynı indirmeyi yapar, SONRA otomatik olarak bir merge (veya rebase, ayara göre) ÇALIŞTIRIR.", en: "git pull origin main does TWO things in ONE command: it FIRST downloads exactly like fetch, THEN automatically RUNS a merge (or rebase, depending on config)." } },
              { id: 4, icon: '4️⃣', label: { tr: 'İki geçmiş BİRBİRİNDEN AYRIŞMIŞSA…', en: 'If the two histories have DIVERGED…' }, detail: { tr: "İki geçmiş (senin commit'lerin ve uzaktaki yeni commit'ler) BİRBİRİNDEN AYRIŞMIŞSA, bu otomatik merge fazladan bir \"Merge branch 'main'\" COMMIT'i OLUŞTURUR — bu, git log geçmişinde EKSTRA bir düğüm olarak GÖRÜNÜR.", en: "If the two histories (your commits and the new remote ones) have DIVERGED, this automatic merge CREATES an extra \"Merge branch 'main'\" COMMIT — it SHOWS UP as an EXTRA node in the git log history." } },
              { id: 5, icon: '5️⃣', label: { tr: 'Bu yüzden CI/CD script\'lerinde…', en: 'This is why CI/CD scripts…' }, detail: { tr: 'Bu yüzden CI/CD script\'lerinde veya sadece "durumu KONTROL etmek" istediğinde git fetch TERCİH edilir — çalışma dizinini DEĞİŞTİRMEDEN neyin değiştiğini görmeni sağlar, git pull ise SENİ hazır olmadan bir merge\'e SOKABİLİR.', en: 'This is why git fetch is PREFERRED in CI/CD scripts or when you just want to CHECK status — it lets you see what changed WITHOUT touching your working directory, while git pull can PULL you into a merge before you\'re READY.' } },
            ],
          },
          {
            type: 'challenge',
            variant: 'order-sort',
            id: 'git-fetch-vs-pull-order-01',
            question: { tr: 'fetch ile düz pull arasındaki farkı görme sırasını diz.', en: 'Order the sequence for seeing the difference between fetch and plain pull.' },
            items: [
              { id: '1', text: { tr: '`git fetch origin` ile SADECE indir, branch\'ine dokunma', en: 'Run `git fetch origin` to ONLY download, without touching your branch' }, order: 1 },
              { id: '2', text: { tr: 'Working tree\'nin değişmediğini gör', en: 'See that your working tree has not changed' }, order: 2 },
              { id: '3', text: { tr: 'Düz `git pull origin main` çalıştırsan, history\'ler ayrışmışsa ekstra bir merge commit oluşabileceğini bil', en: 'Know that plain `git pull origin main` can add an extra merge commit if histories diverged' }, order: 3 },
            ],
            xpReward: 10,
          },
          {
            type: 'code',
            label: 'pull --rebase: daha temiz alternatif',
            language: 'bash',
            code: `# pull --rebase: fetch + SENİN commit'lerini güncel main'in üstüne yeniden uygula
git pull --rebase origin main
# Successfully rebased and updated refs/heads/feature/hasan
# -> doğrusal history, ekstra merge commit'i yok`,
          },
          {
            type: 'code-playground',
              relatedTopicId: 'git-pull-practice-01',
            id: 'git-pull-practice-01',
            label: { tr: 'Micro Lab: git pull / git fetch', en: 'Micro Lab: git pull / git fetch' },
            language: 'bash',
            task: {
              tr: 'Once `git fetch origin` ile sadece indir (branch\'ine dokunma), sonra `git pull --rebase origin main` ile hem indir hem kendi commit\'lerini guncel main\'in ustune yeniden uygula. Java\'da `fetch`i bir Maven repository\'den metadata indirip henuz build\'e dahil etmemeye benzet; `pull --rebase` ise indirilenleri hemen entegre edip projeyi yeniden derlemek gibidir.',
              en: 'First download only with `git fetch origin` (does not touch your branch), then download AND replay your commits on top of updated main with `git pull --rebase origin main`. Think of `fetch` like downloading metadata from a Maven repository without building yet in Java; `pull --rebase` is like immediately integrating it and rebuilding the project.',
            },
            explanation: {
              tr: 'TODO satirini gercek `git pull --rebase origin main` komutuyla degistir. Sandbox gercek bir repo calistirmiyor; amac fetch ile pull --rebase arasindaki farki elinle yazarak pekistirmek.',
              en: 'Replace the TODO line with the real `git pull --rebase origin main` command. The sandbox does not run a real repo; the goal is to reinforce the difference between fetch and pull --rebase by typing it.',
            },
            code: {
              tr: `git fetch origin\ngit log origin/main --oneline -3\n// EKSIK: rebase ile fetch+entegre et\ngit log --oneline -3`,
              en: `git fetch origin\ngit log origin/main --oneline -3\n// MISSING: fetch and integrate via rebase\ngit log --oneline -3`,
            },
            starterCode: {
              tr: `git fetch origin\ngit log origin/main --oneline -3\n// TODO: rebase ile fetch+entegre et\ngit log --oneline -3`,
              en: `git fetch origin\ngit log origin/main --oneline -3\n// TODO: fetch and integrate via rebase\ngit log --oneline -3`,
            },
            solutionCode: {
              tr: `git fetch origin\ngit log origin/main --oneline -3\ngit pull --rebase origin main\ngit log --oneline -3`,
              en: `git fetch origin\ngit log origin/main --oneline -3\ngit pull --rebase origin main\ngit log --oneline -3`,
            },
            expected: {
              tr: '`git pull --rebase origin main` sonrasinda "Successfully rebased and updated" mesaji gorursun; history\'de ekstra bir merge commit YOKTUR.',
              en: 'After `git pull --rebase origin main` you see "Successfully rebased and updated"; there is NO extra merge commit in the history.',
            },
            hints: [
              { tr: '`git fetch` SADECE indirir; senin branch\'in ve working tree degismez.', en: '`git fetch` ONLY downloads; your branch and working tree stay unchanged.' },
              { tr: 'Duz `git pull` = `fetch` + `merge`; diverge varsa ekstra bir "Merge branch" commiti olusur.', en: 'Plain `git pull` = `fetch` + `merge`; if histories diverged, an extra "Merge branch" commit appears.' },
              { tr: '`git pull --rebase` = `fetch` + `rebase`; senin commit\'lerin guncel main\'in ustune yeniden uygulanir, ekstra commit olmaz.', en: '`git pull --rebase` = `fetch` + `rebase`; your commits are replayed on top of the updated main, no extra commit.' },
            ],
            xpReward: 10,
          },
          {
            type: 'step-animation',
            id: 'git-pull-step-01',
            title: { tr: 'Adim Adim: git pull / git fetch', en: 'Step by Step: git pull / git fetch' },
            steps: [
              { id: 1, icon: '📡', label: { tr: 'Sadece indir', en: 'Download only' }, detail: { tr: '`git fetch origin` calistir: "3 new commits available" gibi bir bilgi gorursun, working tree\'n DEGISMEZ.', en: 'Run `git fetch origin`: you see something like "3 new commits available", your working tree stays UNCHANGED.' } },
              { id: 2, icon: '🔍', label: { tr: 'Farki incele', en: 'Inspect the difference' }, detail: { tr: '`git log origin/main --oneline -3` ile remote\'taki yeni commit\'leri merge/rebase yapmadan once gor.', en: 'Run `git log origin/main --oneline -3` to see the new remote commits before merging/rebasing.' } },
              { id: 3, icon: '🔀', label: { tr: 'Duz pull riski', en: 'Plain pull risk' }, detail: { tr: 'Duz `git pull origin main` calistirsan ve historyler ayrismissa, otomatik bir "Merge branch \'main\'" commit\'i eklenir.', en: 'If you ran plain `git pull origin main` and histories diverged, an automatic "Merge branch \'main\'" commit gets added.' } },
              { id: 4, icon: '🪜', label: { tr: 'Rebase ile entegre et', en: 'Integrate via rebase' }, detail: { tr: '`git pull --rebase origin main` calistir: senin commit\'lerin guncel main\'in ustune tek tek yeniden uygulanir.', en: 'Run `git pull --rebase origin main`: your commits are replayed one by one on top of the updated main.' } },
              { id: 5, icon: '✅', label: { tr: 'Temiz history\'i dogrula', en: 'Verify the clean history' }, detail: { tr: '`git log --oneline -3` ile artik ekstra merge commit\'i olmayan duz bir cizgi gorursun.', en: 'Run `git log --oneline -3` and see a straight line with no extra merge commit.' } },
            ],
          },
          {
            type: 'challenge',
            variant: 'order-sort',
            id: 'git-pull-order-01',
            question: { tr: 'fetch ve pull --rebase ile guvenli guncelleme akisini sirala.', en: 'Order the safe update flow using fetch and pull --rebase.' },
            items: [
              { id: '1', text: { tr: '`git fetch origin` ile remote degisiklikleri indir', en: 'Run `git fetch origin` to download remote changes' }, order: 1 },
              { id: '2', text: { tr: '`git log origin/main --oneline -3` ile yeni commit\'leri incele', en: 'Run `git log origin/main --oneline -3` to inspect the new commits' }, order: 2 },
              { id: '3', text: { tr: '`git pull --rebase origin main` ile fetch+entegre et', en: 'Run `git pull --rebase origin main` to fetch and integrate' }, order: 3 },
              { id: '4', text: { tr: 'Conflict cikarsa coz ve `git add` ile isaretle', en: 'Resolve any conflict and mark it with `git add`' }, order: 4 },
              { id: '5', text: { tr: '`git log --oneline -3` ile temiz, dogrusal history\'i dogrula', en: 'Run `git log --oneline -3` to confirm a clean, linear history' }, order: 5 },
            ],
            xpReward: 10,
          },
          {
            type: 'quiz',
            question: 'Feature branch\'inde her `git pull origin main` çalıştırdığında Git istenmeyen bir "Merge branch \'main\'" commit\'i oluşturuyor. Aynı güncellemeyi bu ekstra commit olmadan almak için hangi komutu kullanmalısın?',
            options: [
              { id: 'a', text: 'git fetch origin' },
              { id: 'b', text: 'git pull --rebase origin main' },
              { id: 'c', text: 'git push --force' },
              { id: 'd', text: 'git branch -m main' },
            ],
            correct: 'b',
            explanation: '`git pull --rebase`, remote history\'yi indirir ve senin local commit\'lerini onun üstüne yeniden oynatır; sonuç doğrusal bir history\'dir, ekstra merge commit\'i oluşmaz. Düz `git pull` varsayılan olarak merge eder ve historyler ayrışmışsa ekstra bir commit oluşturur.',

        retryQuestion: {
      "question": "Bir takım arkadaşın `git fetch origin` çalıştırdı ve çalışma dosyalarında veya branch'inde hiçbir şey değişmediğini söylüyor. Bu neden beklenen bir davranıştır?",
      "options": [
            {
                  "id": "a",
                  "text": "git fetch bozuktur; sadece git pull gerçekten çalışır"
            },
            {
                  "id": "b",
                  "text": "git fetch SADECE remote history'yi origin/* referanslarına indirir — local branch'ine veya working tree'ne asla dokunmaz"
            },
            {
                  "id": "c",
                  "text": "git fetch bir şeyi uygulamak için --force gerektirir"
            },
            {
                  "id": "d",
                  "text": "git fetch commit edilmemiş işi otomatik olarak önce stash'ler"
            }
      ],
      "correct": "b",
      "explanation": "`git fetch`, salt-okunur bir indirmedir: remote branch'lerin local kopyalarını (`origin/main` gibi) günceller ama sen açıkça merge, rebase veya pull yapana kadar aktif branch'ine ve working tree'ne hiç dokunmaz."
}
},
        ],
      },
      {
        title: '🔀 Merge & Conflict: Değişiklikleri Güvenle Birleştir',
        blocks: [
          {
            type: 'simple-box',
            emoji: '⚖️',
            content: `Bir Git merge işlemi, aynı olayı anlatan iki tanığın ifadesini uzlaştıran bir mahkeme stenografına benzer: hikayeleri çakışmadığı her yerde Git otomatik birleştirir, ama iki kişi TAM OLARAK aynı satırı değiştirdiği anda tahmin etmeyi bırakır ve sana conflict marker'larını uzatır. Bir marker'a dokunmadan önce düşündürücü soru şu: Git çoğu zaman otomatik merge edebiliyorsa, neden geri kalanında seni durduruyor? Çünkü her satırda sana sorsaydı, kimse branch kullanmazdı — paralel branch'lerin bütün amacı çoğu değişikliğin aslında çakışmaması, bu yüzden araç sadece gerçekten insan kararı gerektiren o nadir noktada durmalı. Java benzetmesi: bu, iki geliştiricinin paylaşılan bir IDE'de kilit olmadan aynı class'ı düzenlemesiyle aynı gerilimdir — bir build aracı iki geliştiricinin işini SADECE farklı metodlara dokunduklarında otomatik birleştirebilir, aynı metodun gövdesini iki kişi override ettiğinde asla; tıpkı Git'in de sadece çakışmayan satırları otomatik merge edebilmesi gibi. Gerçek QA işinde bu yüzden bir conflict'i sessizce yanlış satırı tutarak çözmek, yüksek sesle patlayan bir build'den daha tehlikelidir — yanlış çözülmüş bir marker, yanlış nedenle her zaman geçen bir testi production'a gönderebilir ve kimse fark etmez.`,
          },
          {
            type: 'simulation',
            title: { en: '3) Merge: bring main into your branch', tr: '3) Merge: main değişikliklerini branch içine al' },
            icon: '🔁',
            color: '#2563eb',
            scenario: 'git-merge-lab',
            description: { en: 'Watch `origin/main` updates flow into a feature branch. The key idea: merge happens into the branch you are currently on.', tr: '`origin/main` güncellemelerinin feature branch içine akmasını izle. Ana fikir: merge, bulunduğun branch’in içine yapılır.' },
          },
          {
            type: 'simulation',
            title: { en: '4) Conflict resolution: markers are a decision point', tr: '4) Conflict çözümü: markerlar karar noktasıdır' },
            icon: '🧯',
            color: '#dc2626',
            scenario: 'git-conflict-lab',
            description: { en: 'Watch a conflict appear, read the markers, create the final file, run the test, mark it resolved, and continue the merge/rebase.', tr: 'Conflict’in çıkmasını, markerların okunmasını, final dosyanın yazılmasını, testin koşmasını, resolved işaretini ve merge/rebase devamını izle.' },
          },
          {
            type: 'grid',
            items: [
              { icon: '🧭', label: 'Branch adı', desc: '`feature/checkout-tests`, `fix/login-timeout`, `ci/add-playwright-report`: isim niyeti göstermeli.' },
              { icon: '🧪', label: 'Küçük PR', desc: 'Tek davranış değişikliği, tek test hikayesi, tek review konuşması. Conflict riskini azaltır.' },
              { icon: '🔒', label: 'Protected main', desc: 'main doğrudan push değil; PR review ve passing checks üzerinden iş almalı.' },
              { icon: '⏱️', label: 'Kısa yaşayan branch', desc: 'Uzun branch main’den uzaklaşır; QA otomasyonunda selector ve test data conflict’i büyür.' },
            ],
          },
          {
            type: 'code',
            label: 'main\'i senkronize et, sonra branch aç',
            language: 'bash',
            code: `git fetch origin                         # Remote branch bilgisini güncelle
git switch main                          # Local main'e geç
git pull --ff-only origin main            # Sürpriz merge commit olmadan main'i güncelle
git switch -c feature/checkout-tests      # Feature branch oluştur`,
          },
          {
            type: 'step-animation',
            id: 'git-ff-only-sync-step-01',
            title: { tr: "git pull --ff-only Neden \"Sürpriz\" Bir Merge Commit'i Engeller?", en: 'Why Does git pull --ff-only Prevent a "Surprise" Merge Commit?' },
            steps: [
              { id: 1, icon: '1️⃣', label: { tr: 'git fetch origin çalıştırıldığında…', en: 'Running git fetch origin…' }, detail: { tr: 'git fetch origin çalıştırıldığında SADECE uzaktaki branch referansları (origin/main gibi) GÜNCELLENİR — local main dalın HİÇBİR satırı henüz DEĞİŞMEZ.', en: 'Running git fetch origin ONLY updates the remote branch references (like origin/main) — NOT a single line of your local main branch CHANGES yet.' } },
              { id: 2, icon: '2️⃣', label: { tr: 'git switch main ile…', en: 'git switch main moves…' }, detail: { tr: "git switch main ile local main'e GEÇİLİR — artık sonraki komutlar main dalı ÜZERİNDE çalışır, feature branch'in ETKİLENMEZ.", en: "git switch main MOVES you to local main — subsequent commands now operate ON the main branch, your feature branch is UNAFFECTED." } },
              { id: 3, icon: '3️⃣', label: { tr: 'git pull --ff-only origin main, SADECE…', en: 'git pull --ff-only origin main works ONLY…' }, detail: { tr: "git pull --ff-only origin main, SADECE local main'in origin/main'in TAM OLARAK GERİSİNDE (hiçbir kendi commit'i olmadan) olduğu durumda ÇALIŞIR — pointer'ı basitçe İLERİ SÜRÜKLER, yeni bir merge commit'i OLUŞTURMAZ.", en: "git pull --ff-only origin main works ONLY when local main is EXACTLY BEHIND origin/main (with no commits of its own) — it just SLIDES the pointer FORWARD, it never CREATES a new merge commit." } },
              { id: 4, icon: '4️⃣', label: { tr: "Eğer local main'de kendi commit'lerin varsa…", en: 'If local main has its own commits…' }, detail: { tr: "Eğer local main'de origin/main'de OLMAYAN kendi commit'lerin varsa (dallar AYRIŞMIŞSA), --ff-only bu durumu ALGILAR ve KOMUTU REDDEDER — sessizce bir merge commit'i oluşturmak yerine sana AÇIKÇA hata verir.", en: "If local main has commits of its own that origin/main doesn't (the histories have DIVERGED), --ff-only DETECTS this and REJECTS the command — instead of silently creating a merge commit, it gives you an EXPLICIT error." } },
              { id: 5, icon: '5️⃣', label: { tr: "git switch -c feature/checkout-tests ise…", en: 'git switch -c feature/checkout-tests then…' }, detail: { tr: "git switch -c feature/checkout-tests ise main GÜNCEL haldeyken YENİ bir branch açar — bu sıralama sayesinde yeni feature branch'in TEMELİ her zaman en TAZE main'dir, gereksiz erken conflict RİSKİ azalır.", en: "git switch -c feature/checkout-tests then opens a NEW branch while main is UP TO DATE — this ordering guarantees the new feature branch's BASE is always the FRESHEST main, reducing the risk of an unnecessary early conflict." } },
            ],
          },
          {
            type: 'challenge',
            variant: 'order-sort',
            id: 'git-daily-sync-order-01',
            question: { tr: 'Yeni bir feature branch\'e güncel main üzerinden başlama sırasını diz.', en: 'Order the sequence for starting a new feature branch from an updated main.' },
            items: [
              { id: '1', text: { tr: '`git fetch origin` ile remote branch bilgisini yenile', en: 'Run `git fetch origin` to refresh remote branch info' }, order: 1 },
              { id: '2', text: { tr: '`git switch main` ile local main\'e geç', en: 'Run `git switch main` to move to local main' }, order: 2 },
              { id: '3', text: { tr: '`git pull --ff-only origin main` ile sürpriz merge commit\'siz güncelle', en: 'Run `git pull --ff-only origin main` to update without a surprise merge commit' }, order: 3 },
              { id: '4', text: { tr: '`git switch -c feature/checkout-tests` ile feature branch oluştur', en: 'Run `git switch -c feature/checkout-tests` to create the feature branch' }, order: 4 },
            ],
            xpReward: 10,
          },
          {
            type: 'code',
            label: 'Odaklı değişikliği yap, sonra yayınla',
            language: 'bash',
            code: `# tests/checkout.spec.js düzenlenir        # Odaklı QA değişikliğini yap
git add tests/checkout.spec.js            # Sadece hedef dosyayı stage et
git commit -m "test: cover checkout tax"  # Küçük snapshot oluştur
git push -u origin feature/checkout-tests # Branch'i gönder ve upstream ayarla`,
          },
          {
            type: 'challenge',
            variant: 'order-sort',
            id: 'git-daily-publish-order-01',
            question: { tr: 'Odaklı bir değişikliği commitleyip push etme sırasını diz.', en: 'Order the sequence for committing and pushing one focused change.' },
            items: [
              { id: '1', text: { tr: 'Sadece amaçlanan dosyayı stage et: `git add tests/checkout.spec.js`', en: 'Stage only the intended file: `git add tests/checkout.spec.js`' }, order: 1 },
              { id: '2', text: { tr: 'Küçük, açıklayıcı bir commit at: `git commit -m "test: cover checkout tax"`', en: 'Make a small, descriptive commit: `git commit -m "test: cover checkout tax"`' }, order: 2 },
              { id: '3', text: { tr: '`git push -u origin feature/checkout-tests` ile branch\'i push et ve upstream kur', en: 'Run `git push -u origin feature/checkout-tests` to push the branch and set upstream' }, order: 3 },
            ],
            xpReward: 10,
          },
          {
            type: 'code',
            label: 'Önce kendi branch state\'ini commitle',
            language: 'bash',
            code: `git status                              # Branch değiştirmeden önce kaydedilmemiş iş var mı bak
git add tests/login.spec.js               # Odaklı değişikliğini stage et
git commit -m "test: cover login errors"  # Önce kendi branch state'ini kaydet`,
          },
          {
            type: 'callout',
            icon: '🧪',
            content: { tr: 'Şimdi Git Temelleri sekmesindeki gerçek terminalde dene: bir değişikliği stage et ve commitle (`git add`, `git commit -m "..."`) — sandbox\'taki "Bir değişikliği stage et ve commitle" görevi bu adımların ta kendisi.', en: 'Try it now in the real terminal on the Git Basics tab: stage a change and commit it (`git add`, `git commit -m "..."`) — the sandbox\'s "Stage a change and commit it" mission is exactly this.' },
          },
          {
            type: 'code',
            label: 'main\'i güncelle, geri dön ve merge et',
            language: 'bash',
            code: `git switch main                           # Ortak ana branch'e geç
git pull --ff-only origin main             # Remote değişiklikleri güvenli çek

git switch feature/hasan                  # Kendi branch'ine geri dön
git merge main                            # Güncel main'i kendi branch'ine al
# Conflict çıkarsa localde çöz, test çalıştır, git add yap ve merge'i tamamla`,
          },
          {
            type: 'code-playground',
              relatedTopicId: 'git-merge-practice-01',
            id: 'git-merge-practice-01',
            label: { tr: 'Micro Lab: git merge', en: 'Micro Lab: git merge' },
            language: 'bash',
            task: {
              tr: '`feature/hasan` branch\'indeyken `main`i merge et: once `git switch main` + `git pull --ff-only origin main` ile main\'i guncelle, sonra `git switch feature/hasan` ile geri don ve `git merge main` calistir. Java\'da bunu iki ayri SVN working copy\'sini birlestirmeye benzet — ama Git\'te merge yerel ve hizlidir, network gerektirmez.',
              en: 'While on `feature/hasan`, merge `main` into it: first update main with `git switch main` + `git pull --ff-only origin main`, then return with `git switch feature/hasan` and run `git merge main`. Think of it like reconciling two SVN working copies in Java tooling — except in Git, merge is local and fast, no network round-trip needed for the merge step itself.',
            },
            explanation: {
              tr: 'TODO satirini gercek `git merge main` komutuyla degistir. Sandbox gercek bir repo calistirmiyor; amac dogru sirayi elinle kurmak.',
              en: 'Replace the TODO line with the real `git merge main` command. The sandbox does not run a real repo; the goal is to build the correct order by hand.',
            },
            code: {
              tr: `git switch main\ngit pull --ff-only origin main\ngit switch feature/hasan\n// EKSIK: main'i feature/hasan icine merge et\ngit status`,
              en: `git switch main\ngit pull --ff-only origin main\ngit switch feature/hasan\n// MISSING: merge main into feature/hasan\ngit status`,
            },
            starterCode: {
              tr: `git switch main\ngit pull --ff-only origin main\ngit switch feature/hasan\n// TODO: main'i feature/hasan icine merge et\ngit status`,
              en: `git switch main\ngit pull --ff-only origin main\ngit switch feature/hasan\n// TODO: merge main into feature/hasan\ngit status`,
            },
            solutionCode: {
              tr: `git switch main\ngit pull --ff-only origin main\ngit switch feature/hasan\ngit merge main\ngit status`,
              en: `git switch main\ngit pull --ff-only origin main\ngit switch feature/hasan\ngit merge main\ngit status`,
            },
            expected: {
              tr: '`git merge main` calisir, conflict yoksa otomatik bir merge commit olusur; `git status` "nothing to commit" veya conflict listesi gosterir.',
              en: '`git merge main` runs; if there is no conflict, an automatic merge commit is created and `git status` shows a clean tree or the conflict list.',
            },
            hints: [
              { tr: 'Merge etmeden once dogru branch uzerinde oldugundan emin ol: `git switch feature/hasan`.', en: 'Make sure you are on the right branch before merging: `git switch feature/hasan`.' },
              { tr: '`git merge main` aktif branch\'e main\'in commit\'lerini getirir.', en: '`git merge main` brings main\'s commits into the currently active branch.' },
              { tr: 'Conflict cikarsa dosyalari duzelt, `git add`, sonra `git commit` ile merge\'i bitir.', en: 'If a conflict appears, fix the files, `git add`, then `git commit` to finish the merge.' },
            ],
            xpReward: 10,
          },
          {
            type: 'step-animation',
            id: 'git-merge-step-01',
            title: { tr: 'Adim Adim: git merge', en: 'Step by Step: git merge' },
            steps: [
              { id: 1, icon: '🔄', label: { tr: 'main\'i guncelle', en: 'Update main' }, detail: { tr: '`git switch main` sonra `git pull --ff-only origin main` ile remote\'taki son commit\'leri al.', en: 'Run `git switch main` then `git pull --ff-only origin main` to get the latest remote commits.' } },
              { id: 2, icon: '↩️', label: { tr: 'Feature branch\'ine don', en: 'Return to feature branch' }, detail: { tr: '`git switch feature/hasan` ile kendi branch\'ine geri don.', en: 'Run `git switch feature/hasan` to go back to your own branch.' } },
              { id: 3, icon: '🔀', label: { tr: 'Merge et', en: 'Run the merge' }, detail: { tr: '`git merge main` calistir: Git iki branch\'in ortak atasini bulup farkli commit\'leri birlestirir.', en: 'Run `git merge main`: Git finds the common ancestor of both branches and combines the diverging commits.' } },
              { id: 4, icon: '⚠️', label: { tr: 'Conflict varsa coz', en: 'Resolve conflicts if any' }, detail: { tr: '`<<<<<<< HEAD` ile `>>>>>>> main` arasindaki kismi elle duzenle, `git add` ile isaretle.', en: 'Manually edit the section between `<<<<<<< HEAD` and `>>>>>>> main`, mark it resolved with `git add`.' } },
              { id: 5, icon: '✅', label: { tr: 'Merge commit\'i tamamla', en: 'Complete the merge commit' }, detail: { tr: 'Conflict yoksa Git otomatik bir merge commit olusturur; varsa `git commit` ile sen tamamlarsin.', en: 'If there was no conflict, Git auto-creates a merge commit; if there was, you finish it with `git commit`.' } },
            ],
          },
          gitMergeTwoFacesFilm,
          {
            type: 'challenge',
            variant: 'order-sort',
            id: 'git-merge-order-01',
            question: { tr: 'Guvenli bir merge akisini gercek sirasiyla diz.', en: 'Order a safe merge flow in its real sequence.' },
            items: [
              { id: '1', text: { tr: '`git switch main` ile main\'e gec', en: 'Run `git switch main` to move to main' }, order: 1 },
              { id: '2', text: { tr: '`git pull --ff-only origin main` ile main\'i guncelle', en: 'Run `git pull --ff-only origin main` to update main' }, order: 2 },
              { id: '3', text: { tr: '`git switch feature/hasan` ile feature branch\'ine don', en: 'Run `git switch feature/hasan` to return to the feature branch' }, order: 3 },
              { id: '4', text: { tr: '`git merge main` ile guncel main\'i icine al', en: 'Run `git merge main` to bring in the updated main' }, order: 4 },
              { id: '5', text: { tr: 'Conflict varsa coz, `git add`, gerekirse `git commit`', en: 'Resolve any conflicts, `git add`, and `git commit` if needed' }, order: 5 },
            ],
            xpReward: 10,
          },
          {
            type: 'git-practice',
            icon: '🧪',
            title: { en: 'Try it yourself: order a safe branch start', tr: 'Kendin dene: güvenli branch başlangıcını sırala' },
            intro: { en: 'Arrange the commands so the feature branch starts from an updated main.', tr: 'Komutları feature branch güncel main üzerinden başlayacak şekilde sırala.' },
            starterCommands: `git switch main
git fetch origin
git switch -c feature/checkout-tests
git pull --ff-only origin main
git push -u origin feature/checkout-tests`,
            expectedSteps: [
              { pattern: 'git\\s+fetch\\s+origin', label: { en: 'Refresh remote state first', tr: 'Önce remote bilgisini yenile' }, example: 'git fetch origin' },
              { pattern: 'git\\s+switch\\s+main', label: { en: 'Move to main before creating the feature branch', tr: 'Feature branch açmadan önce main’e geç' }, example: 'git switch main' },
              { pattern: 'git\\s+pull\\s+--ff-only\\s+origin\\s+main', label: { en: 'Update main without surprise merge commits', tr: 'main’i sürpriz merge commit olmadan güncelle' }, example: 'git pull --ff-only origin main' },
              { pattern: 'git\\s+switch\\s+-c\\s+feature\\/checkout-tests', label: { en: 'Create the feature branch from updated main', tr: 'Feature branch’i güncel main’den aç' }, example: 'git switch -c feature/checkout-tests' },
              { pattern: 'git\\s+push\\s+-u\\s+origin\\s+feature\\/checkout-tests', label: { en: 'Push with upstream after at least one commit in real work', tr: 'Gerçek işte commit sonrası upstream ile push et' }, example: 'git push -u origin feature/checkout-tests' },
            ],
            successOutput: { en: 'Branch starts from updated main. In a real repo, edit, add and commit before the final push.', tr: 'Branch güncel main üzerinden başlıyor. Gerçek repoda final push öncesi değişiklik, add ve commit yapılır.' },
            retryOutput: { en: 'Reorder the flow: fetch → switch main → pull --ff-only → switch -c → push -u.', tr: 'Akışı yeniden sırala: fetch → switch main → pull --ff-only → switch -c → push -u.' },
            help: { en: 'This checker focuses on the branch-start order, not on changing a real repository.', tr: 'Bu kontrol gerçek repo değiştirmez; sadece branch başlangıç sırasına bakar.' },
          },
          {
            type: 'quiz',
            question: 'Bir merge conflict\'ini çözerken bir test dosyasının içinde `<<<<<<< HEAD`, `=======` ve `>>>>>>> main` marker\'larını görüyorsun. Hangi satırların kalacağına karar verdikten sonra doğru bir sonraki adım nedir?',
            options: [
              { id: 'a', text: 'Tüm dosyayı silip sıfırdan yeniden oluştur' },
              { id: 'b', text: 'Conflict marker\'larını kaldır, final versiyonu kaydet, testi çalıştır, sonra dosyayı `git add` ile işaretle ve `git commit` ile bitir' },
              { id: 'c', text: 'Hemen `git merge --abort` çalıştır' },
              { id: 'd', text: 'Dosyayı marker\'lar hala içindeyken push et, böylece bir takım arkadaşı review edebilsin' },
            ],
            correct: 'b',
            explanation: 'Marker\'lar kaçılması gereken bir hata değil, bir karar noktasıdır: onları kaldır, doğru final mantığı tut, bir testle doğrula, dosyayı `git add` ile resolved işaretle ve `git commit` ile merge\'i tamamla.',

        retryQuestion: {
      "question": "Git bir merge'i sana hiçbir şey çözdürmeden ne zaman otomatik olarak tamamlar?",
      "options": [
            {
                  "id": "a",
                  "text": "Merge bir fast-forward olduğunda, ya da iki branch farklı, çakışmayan satırları değiştirdiğinde"
            },
            {
                  "id": "b",
                  "text": "Her zaman — merge'ler asla manuel çözüm gerektirmez"
            },
            {
                  "id": "c",
                  "text": "Sadece --no-conflict flag'i geçirdiğinde"
            },
            {
                  "id": "d",
                  "text": "Sadece iki branch tamamen aynı içeriğe sahip olduğunda"
            }
      ],
      "correct": "a",
      "explanation": "Git, gerçek bir çakışma olmadığını kanıtlayabildiği her yerde otomatik birleştirir — bir fast-forward, ya da farklı satır/dosyalara yapılan değişiklikler. Sadece iki branch TAM OLARAK aynı satırları uyumsuz şekilde değiştirdiğinde durur ve sana conflict marker'larını uzatır."
}
},
        ],
      },
      {
        title: '🧬 Rebase & İleri Akış: Cherry-pick ve Geçmişi Yeniden Yaz',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🪄',
            content: `Rebase ve cherry-pick, bir commit'in history'de NEREDE durduğunu yeniden yazan iki zaman makinesidir, ama iki farklı soruya cevap verirler: rebase "bütün branch'im daha sonraki bir noktadan başlasaydı ne olurdu?" diye sorar ve tüm commit'lerini yeni bir temelin üzerine yeniden oynatır; cherry-pick ise "komşularını sürüklemeden SADECE bu tek değişikliği başka yere kopyalayabilir miyim?" diye sorar ve tek bir commit'in diff'ini başka bir yerde yepyeni bir commit olarak uygular. Düşündürücü soru şu: merge zaten varken ve gerçek history'yi koruyorken, bir takım neden commit hash'lerini rebase ile yeniden yazmayı seçsin ki? Çünkü paylaşılan bir branch'te "fix typo" ve "oops" commit'leriyle dolu bir history dürüstlük değil, gürültüdür — rebase, review edilmeden önce hikayeyi anlatılması GEREKTİĞİ gibi, her seferinde tek bir temiz mantıksal commit olarak sunmanı sağlar. Java benzetmesi: rebase, bir versiyon değiştirdikten sonra Gradle/Maven dependency tree'sini yeniden hesaplamak gibidir — her downstream artifact yeni temele göre yeniden hesaplanır, tıpkı temel commit değişince her commit'in hash'inin değişmesi gibi; cherry-pick ise başkasının JAR'ından tek bir derlenmiş class'ı, o JAR'ın geri kalan history'sini çekmeden kendi projene kopyalamaya daha yakındır. Gerçek QA işinde bu yüzden bir hotfix branch'i, test edilmemiş ilgisiz değişiklikler de taşıyabilecek tüm bir devam eden feature branch'ini merge etmek yerine cherry-pick ile SADECE tek bir bug-fix commit'ini içine alır — ve bir takım arkadaşının zaten çektiği bir branch'i rebase etmek, tüm takım açıkça anlaşmadıkça onun local history'sini sessizce bozabilir.`,
          },
          {
            type: 'table',
            headers: ['Operasyon', 'Ne zaman?', 'Risk'],
            rows: [
              ['merge', 'Branch history ve takım bağlamı korunsun istediğinde', 'Branch uzun yaşarsa history gürültülü olabilir'],
              ['rebase', 'PR öncesi temiz linear hikaye istediğinde', 'Commit hash değiştirir; paylaşıldıysa riskli'],
              ['squash merge', 'PR çok WIP commit içeriyor ama tek mantıksal değişiklik olarak girmeli', 'İnce commit geçmişi birleşir'],
              ['cherry-pick', 'Başka branch’ten tek commit gerektiğinde', 'Takip edilmezse logic duplicate olabilir'],
            ],
          },
          {
            type: 'code',
            label: 'Commit hash\'ini bul, sonra hedef branch\'e geç',
            language: 'bash',
            code: `# 1. İhtiyacın olan commit hash'ini başka bir branch'te bul
git log feature/hasan --oneline -5
# d4e5f6a fix(login): handle empty password field
# c3d4e5f test: add login error cases

# 2. O tek fix'in gitmesi gereken branch'e geç
git switch hotfix/release-1.4`,
          },
          {
            type: 'step-animation',
            id: 'git-cherry-pick-find-step-01',
            title: { tr: 'git log feature/hasan --oneline -5 Aslında Neyi Listeler?', en: 'What Does git log feature/hasan --oneline -5 Actually List?' },
            steps: [
              { id: 1, icon: '1️⃣', label: { tr: 'git log feature/hasan --oneline -5, SENİN…', en: 'git log feature/hasan --oneline -5 shows…' }, detail: { tr: "git log feature/hasan --oneline -5, SENİN o an bulunduğun branch'i DEĞİL, feature/hasan branch'inin GEÇMİŞİNİ görüntüler — checkout yapmadan BAŞKA bir branch'in commit'lerine BAKABİLİRSİN.", en: "git log feature/hasan --oneline -5 shows the HISTORY of the feature/hasan branch, NOT the branch you're currently on — you can LOOK at another branch's commits WITHOUT checking it out." } },
              { id: 2, icon: '2️⃣', label: { tr: '--oneline bayrağı her commit\'i…', en: 'The --oneline flag compresses…' }, detail: { tr: "--oneline bayrağı her commit'i TEK satıra (kısa hash + mesaj) SIKIŞTIRIR, -5 ise SADECE en SON 5 commit'i GÖSTERİR — büyük bir geçmişte hızlıca TARAMA yapmanı sağlar.", en: "The --oneline flag COMPRESSES each commit into ONE line (short hash + message), and -5 shows ONLY the LAST 5 commits — this lets you SCAN a large history quickly." } },
              { id: 3, icon: '3️⃣', label: { tr: 'Listede görünen d4e5f6a gibi kısa hash…', en: 'A short hash like d4e5f6a in the list…' }, detail: { tr: "Listede görünen d4e5f6a gibi kısa hash, o commit'in TAM İÇERİĞİNİN (diff, yazar, mesaj) BENZERSİZ bir PARMAK İZİDİR — bu hash'i bir SONRAKİ adımda cherry-pick'e VERECEKSİN.", en: "A short hash like d4e5f6a in the list is a UNIQUE FINGERPRINT of that commit's FULL content (diff, author, message) — you'll PASS this hash to cherry-pick in the NEXT step." } },
              { id: 4, icon: '4️⃣', label: { tr: 'git switch hotfix/release-1.4 çalıştırıldığında…', en: 'Running git switch hotfix/release-1.4…' }, detail: { tr: "git switch hotfix/release-1.4 çalıştırıldığında AKTİF branch DEĞİŞİR — artık bir SONRAKİ komut (cherry-pick) bu branch'in ÜZERİNE yeni bir commit EKLEYECEK, feature/hasan ETKİLENMEYECEK.", en: "Running git switch hotfix/release-1.4 CHANGES the ACTIVE branch — the NEXT command (cherry-pick) will ADD a new commit ON TOP OF this branch, feature/hasan stays UNAFFECTED." } },
              { id: 5, icon: '5️⃣', label: { tr: 'Bu iki adımın SIRASI önemlidir…', en: 'The ORDER of these two steps matters…' }, detail: { tr: "Bu iki adımın SIRASI önemlidir: ÖNCE hangi commit'in taşınacağını BUL, SONRA hedef branch'e GEÇ — ters sırada gidersen yanlış branch'teyken hash arama RİSKİ oluşur.", en: "The ORDER of these two steps matters: FIRST FIND which commit to move, THEN SWITCH to the target branch — reversing the order risks searching for the hash while on the WRONG branch." } },
            ],
          },
          {
            type: 'challenge',
            variant: 'order-sort',
            id: 'git-cherry-pick-find-order-01',
            question: { tr: 'Başka bir branch\'teki tek bir commit\'i hedeflemenin ilk adımlarını diz.', en: 'Order the first steps for targeting a single commit on another branch.' },
            items: [
              { id: '1', text: { tr: '`git log feature/hasan --oneline -5` ile commit hash\'ini bul', en: 'Run `git log feature/hasan --oneline -5` to find the commit hash' }, order: 1 },
              { id: '2', text: { tr: 'O tek fix\'in gitmesi gereken branch\'i belirle', en: 'Identify the branch that needs just that one fix' }, order: 2 },
              { id: '3', text: { tr: '`git switch hotfix/release-1.4` ile o branch\'e geç', en: 'Run `git switch hotfix/release-1.4` to move to that branch' }, order: 3 },
            ],
            xpReward: 10,
          },
          {
            type: 'code',
            label: 'Cherry-pick et, sonra conflict çıkarsa çöz',
            language: 'bash',
            code: `# 3. Sadece o tek commit'i burada uygula
git cherry-pick d4e5f6a
# [hotfix/release-1.4 9f8e7d6] fix(login): handle empty password field

# Conflict çıkarsa:
git status                  # Conflict'li dosyayı gör
# ...elle çöz...
git add tests/login.spec.js
git cherry-pick --continue`,
          },
          {
            type: 'code-playground',
              relatedTopicId: 'git-cherry-pick-practice-01',
            id: 'git-cherry-pick-practice-01',
            label: { tr: 'Micro Lab: git cherry-pick', en: 'Micro Lab: git cherry-pick' },
            language: 'bash',
            task: {
              tr: '`git log feature/hasan --oneline -5` ile `d4e5f6a` commit hash\'ini bul, `git switch hotfix/release-1.4` ile o branch\'e gec ve `git cherry-pick d4e5f6a` ile SADECE o commit\'i tasi. Java\'da bunu bir JAR\'dan tek bir sinifi baska bir projeye kopyalamaya benzet — tum tarihi degil, sadece o tek "parcayi" alirsin.',
              en: 'Find the commit hash `d4e5f6a` with `git log feature/hasan --oneline -5`, switch to that branch with `git switch hotfix/release-1.4`, and apply ONLY that commit with `git cherry-pick d4e5f6a`. Think of it like copying a single class from one Java project\'s JAR into another — you take just that one "piece", not the whole history.',
            },
            explanation: {
              tr: 'TODO satirini gercek `git cherry-pick d4e5f6a` komutuyla degistir. Sandbox gercek bir repo calistirmiyor; amac dogru hash ile dogru komutu elinle yazmak.',
              en: 'Replace the TODO line with the real `git cherry-pick d4e5f6a` command. The sandbox does not run a real repo; the goal is to type the correct command with the correct hash by hand.',
            },
            code: {
              tr: `git log feature/hasan --oneline -5\ngit switch hotfix/release-1.4\n// EKSIK: sadece d4e5f6a commit'ini buraya tasi\ngit log --oneline -1`,
              en: `git log feature/hasan --oneline -5\ngit switch hotfix/release-1.4\n// MISSING: bring only commit d4e5f6a here\ngit log --oneline -1`,
            },
            starterCode: {
              tr: `git log feature/hasan --oneline -5\ngit switch hotfix/release-1.4\n// TODO: sadece d4e5f6a commit'ini buraya tasi\ngit log --oneline -1`,
              en: `git log feature/hasan --oneline -5\ngit switch hotfix/release-1.4\n// TODO: bring only commit d4e5f6a here\ngit log --oneline -1`,
            },
            solutionCode: {
              tr: `git log feature/hasan --oneline -5\ngit switch hotfix/release-1.4\ngit cherry-pick d4e5f6a\ngit log --oneline -1`,
              en: `git log feature/hasan --oneline -5\ngit switch hotfix/release-1.4\ngit cherry-pick d4e5f6a\ngit log --oneline -1`,
            },
            expected: {
              tr: '`git log --oneline -1` artik `hotfix/release-1.4` uzerinde yeni bir commit (orijinal mesajla) gosterir; `feature/hasan`in geri kalani tasinmamistir.',
              en: '`git log --oneline -1` now shows a new commit on `hotfix/release-1.4` (with the original message); the rest of `feature/hasan` was not brought along.',
            },
            hints: [
              { tr: 'Once dogru hash\'i `git log <branch> --oneline` ile bul.', en: 'First find the right hash with `git log <branch> --oneline`.' },
              { tr: '`git cherry-pick <hash>` SADECE o tek commit\'in degisikliklerini uygular, tum branch\'i degil.', en: '`git cherry-pick <hash>` applies ONLY that single commit\'s changes, not the whole branch.' },
              { tr: 'Conflict cikarsa: duzelt, `git add`, sonra `git cherry-pick --continue`.', en: 'On conflict: fix it, `git add`, then `git cherry-pick --continue`.' },
            ],
            xpReward: 10,
          },
          {
            type: 'step-animation',
            id: 'git-cherry-pick-step-01',
            title: { tr: 'Adim Adim: git cherry-pick', en: 'Step by Step: git cherry-pick' },
            steps: [
              { id: 1, icon: '🔎', label: { tr: 'Commit\'i bul', en: 'Find the commit' }, detail: { tr: '`git log feature/hasan --oneline -5` ile `d4e5f6a fix(login): handle empty password field` satirini bul.', en: 'Run `git log feature/hasan --oneline -5` and find the line `d4e5f6a fix(login): handle empty password field`.' } },
              { id: 2, icon: '🎯', label: { tr: 'Hedef branch\'e gec', en: 'Switch to the target branch' }, detail: { tr: '`git switch hotfix/release-1.4` ile o tek fix\'in gitmesi gereken branch\'e gec.', en: 'Run `git switch hotfix/release-1.4` to move to the branch that needs just that one fix.' } },
              { id: 3, icon: '🍒', label: { tr: 'Cherry-pick et', en: 'Cherry-pick it' }, detail: { tr: '`git cherry-pick d4e5f6a` calistir: Git o commit\'in diff\'ini alip burada yeni bir commit olarak uygular.', en: 'Run `git cherry-pick d4e5f6a`: Git takes that commit\'s diff and applies it here as a new commit.' } },
              { id: 4, icon: '⚠️', label: { tr: 'Conflict varsa coz', en: 'Resolve conflicts if any' }, detail: { tr: '`git status` ile conflict\'li dosyayi gor, duzelt, `git add` ile isaretle.', en: 'Run `git status` to see the conflicted file, fix it, mark it with `git add`.' } },
              { id: 5, icon: '✅', label: { tr: 'Devam et veya dogrula', en: 'Continue or verify' }, detail: { tr: 'Conflict varsa `git cherry-pick --continue`; yoksa direkt `git log --oneline -1` ile yeni commit\'i dogrula.', en: 'If there was a conflict, run `git cherry-pick --continue`; otherwise verify directly with `git log --oneline -1`.' } },
            ],
          },
          {
            type: 'challenge',
            variant: 'order-sort',
            id: 'git-cherry-pick-order-01',
            question: { tr: 'Tek bir commit\'i baska branch\'e tasima akisini sirala.', en: 'Order the flow for moving a single commit to another branch.' },
            items: [
              { id: '1', text: { tr: '`git log feature/hasan --oneline -5` ile hash\'i bul', en: 'Run `git log feature/hasan --oneline -5` to find the hash' }, order: 1 },
              { id: '2', text: { tr: '`git switch hotfix/release-1.4` ile hedef branch\'e gec', en: 'Run `git switch hotfix/release-1.4` to move to the target branch' }, order: 2 },
              { id: '3', text: { tr: '`git cherry-pick d4e5f6a` ile sadece o commit\'i uygula', en: 'Run `git cherry-pick d4e5f6a` to apply just that commit' }, order: 3 },
              { id: '4', text: { tr: 'Conflict cikarsa duzelt ve `git add` ile isaretle', en: 'If a conflict appears, fix it and mark with `git add`' }, order: 4 },
              { id: '5', text: { tr: '`git cherry-pick --continue` ile bitir', en: 'Run `git cherry-pick --continue` to finish' }, order: 5 },
            ],
            xpReward: 10,
          },
          {
            type: 'warning',
            content: 'Merge vs rebase pratik kuralı: ekip standardını kullan. Paylaşılmış branch’i gelişigüzel rebase etme; history rewrite gerçekten onaylandıysa plain `--force` yerine `git push --force-with-lease` tercih et.',
          },
          {
            type: 'code',
            label: 'Animasyondan sonra conflict çözme checklist',
            language: 'bash',
            code: `git status                          # Conflicted dosyaları gör
code tests/login.spec.js             # <<<<<<< ======= >>>>>>> markerlarını oku
# Final davranışı yaz; rastgele satır silme
npm test -- login.spec.js            # Çözülen davranışı kanıtla
git add tests/login.spec.js          # Conflict resolved olarak işaretle
git rebase --continue                # Merge yapıyorsan: git commit`,
          },
          {
            type: 'code-playground',
              relatedTopicId: 'git-rebase-practice-01',
            id: 'git-rebase-practice-01',
            label: { tr: 'Micro Lab: git rebase', en: 'Micro Lab: git rebase' },
            language: 'bash',
            task: {
              tr: '`feature/hasan` branch\'ini `git rebase main` ile main\'in ucuna tasi, conflict cikarsa `tests/login.spec.js` dosyasini duzelt, `git add` ile isaretle ve `git rebase --continue` ile devam et. Java\'da bunu bir Maven/Gradle dependency tree\'sini yeniden hesaplamaya benzet — rebase de commit\'lerin "temelini" yeniden hesaplar.',
              en: 'Move `feature/hasan` onto the tip of main with `git rebase main`; if a conflict appears, fix `tests/login.spec.js`, mark it with `git add`, then continue with `git rebase --continue`. Think of it like recalculating a Maven/Gradle dependency tree in Java — rebase recalculates the commit "base" the same way.',
            },
            explanation: {
              tr: 'TODO satirini gercek `git rebase main` komutuyla degistir. Sandbox gercek bir repo calistirmiyor; amac dogru sirayi elinle kurmak.',
              en: 'Replace the TODO line with the real `git rebase main` command. The sandbox does not run a real repo; the goal is to build the correct order by hand.',
            },
            code: {
              tr: `git switch feature/hasan\n// EKSIK: feature/hasan'i main'in ucuna rebase et\ngit add tests/login.spec.js\ngit rebase --continue`,
              en: `git switch feature/hasan\n// MISSING: rebase feature/hasan onto main\ngit add tests/login.spec.js\ngit rebase --continue`,
            },
            starterCode: {
              tr: `git switch feature/hasan\n// TODO: feature/hasan'i main'in ucuna rebase et\ngit add tests/login.spec.js\ngit rebase --continue`,
              en: `git switch feature/hasan\n// TODO: rebase feature/hasan onto main\ngit add tests/login.spec.js\ngit rebase --continue`,
            },
            solutionCode: {
              tr: `git switch feature/hasan\ngit rebase main\ngit add tests/login.spec.js\ngit rebase --continue`,
              en: `git switch feature/hasan\ngit rebase main\ngit add tests/login.spec.js\ngit rebase --continue`,
            },
            expected: {
              tr: '`git rebase --continue` sonunda "Successfully rebased" mesaji gorursun; commit hash\'leri yeniden yazilmis olur.',
              en: 'After `git rebase --continue` you see a "Successfully rebased" message; the commit hashes have been rewritten.',
            },
            hints: [
              { tr: '`git rebase main` feature branch\'in commit\'lerini main\'in en tepesine tek tek yeniden uygular.', en: '`git rebase main` reapplies your feature branch\'s commits one by one on top of main.' },
              { tr: 'Conflict cikinca once dosyayi elle duzelt, sonra `git add`, sonra `git rebase --continue`.', en: 'On conflict, fix the file by hand first, then `git add`, then `git rebase --continue`.' },
              { tr: 'Paylasilmis (push edilmis) bir branch\'i rebase etmeden once takim ile anlas.', en: 'Agree with the team before rebasing a branch that has already been pushed/shared.' },
            ],
            xpReward: 10,
          },
          {
            type: 'step-animation',
            id: 'git-rebase-step-01',
            title: { tr: 'Adim Adim: git rebase', en: 'Step by Step: git rebase' },
            steps: [
              { id: 1, icon: '🎯', label: { tr: 'Hedef branch\'e bak', en: 'Target the base branch' }, detail: { tr: '`git switch feature/hasan` ile rebase edilecek branch\'te oldugunu dogrula.', en: 'Run `git switch feature/hasan` to confirm you are on the branch to be rebased.' } },
              { id: 2, icon: '🪜', label: { tr: 'Rebase\'i baslat', en: 'Start the rebase' }, detail: { tr: '`git rebase main` calistir: Git senin commit\'lerini tek tek main\'in ucuna tasimaya baslar.', en: 'Run `git rebase main`: Git starts replaying your commits one by one on top of main.' } },
              { id: 3, icon: '🧨', label: { tr: 'Conflict markerlarini gor', en: 'See the conflict markers' }, detail: { tr: '`<<<<<<< HEAD` / `=======` / `>>>>>>> main` arasinda hangi satirin kalacagina karar ver.', en: 'Decide which lines stay between `<<<<<<< HEAD` / `=======` / `>>>>>>> main`.' } },
              { id: 4, icon: '✅', label: { tr: 'Cozumu isaretle', en: 'Mark the resolution' }, detail: { tr: '`git add tests/login.spec.js` ile bu commit adimi icin conflict\'in cozuldugunu Git\'e soyle.', en: 'Run `git add tests/login.spec.js` to tell Git this conflict is resolved for this replay step.' } },
              { id: 5, icon: '➡️', label: { tr: 'Devam et', en: 'Continue the rebase' }, detail: { tr: '`git rebase --continue` ile bir sonraki commit\'in replay\'ine gec; tum commit\'ler bitince "Successfully rebased" mesaji gelir.', en: 'Run `git rebase --continue` to move to replaying the next commit; once all commits are done you see "Successfully rebased".' } },
            ],
          },
          gitRebaseReplayFilm,
          {
            type: 'challenge',
            variant: 'order-sort',
            id: 'git-rebase-order-01',
            question: { tr: 'Conflict\'li bir rebase\'i guvenli sirayla bitir.', en: 'Finish a conflicting rebase in the safe order.' },
            items: [
              { id: '1', text: { tr: '`git rebase main` ile rebase\'i baslat', en: 'Run `git rebase main` to start the rebase' }, order: 1 },
              { id: '2', text: { tr: '`git status` ile conflict\'li dosyalari gor', en: 'Run `git status` to see the conflicted files' }, order: 2 },
              { id: '3', text: { tr: 'Conflict marker\'lari arasinda dogru satiri elle sec', en: 'Manually choose the correct lines between the conflict markers' }, order: 3 },
              { id: '4', text: { tr: '`git add tests/login.spec.js` ile cozumu isaretle', en: 'Run `git add tests/login.spec.js` to mark the resolution' }, order: 4 },
              { id: '5', text: { tr: '`git rebase --continue` ile bir sonraki commit\'e gec', en: 'Run `git rebase --continue` to move to the next commit' }, order: 5 },
            ],
            xpReward: 10,
          },
          {
            type: 'git-practice',
            icon: '🧯',
            title: { en: 'Try it yourself: safe conflict finish', tr: 'Kendin dene: conflict’i güvenli bitir' },
            intro: { en: 'Put the commands in a safe order after conflict markers have been resolved in the file.', tr: 'Dosyadaki conflict markerları çözüldükten sonra komutları güvenli sıraya koy.' },
            starterCommands: `git rebase --continue
git add tests/login.spec.js
npm test -- login.spec.js
git status`,
            expectedSteps: [
              { pattern: 'git\\s+status', label: { en: 'Inspect what Git still sees as conflicted', tr: 'Git’in hâlâ neyi conflicted gördüğünü kontrol et' }, example: 'git status' },
              { pattern: 'npm\\s+test\\s+--\\s+login\\.spec\\.js', label: { en: 'Run the relevant test before continuing', tr: 'Devam etmeden önce ilgili testi çalıştır' }, example: 'npm test -- login.spec.js' },
              { pattern: 'git\\s+add\\s+tests\\/login\\.spec\\.js', label: { en: 'Mark the resolved file as resolved', tr: 'Çözülen dosyayı resolved olarak işaretle' }, example: 'git add tests/login.spec.js' },
              { pattern: 'git\\s+rebase\\s+--continue', label: { en: 'Continue the operation you started', tr: 'Başlattığın operasyonu devam ettir' }, example: 'git rebase --continue' },
            ],
            successOutput: { en: 'Conflict finished in a safe order: inspect → test → add → continue.', tr: 'Conflict güvenli sırayla bitti: kontrol → test → add → continue.' },
            retryOutput: { en: 'Do not continue before test and add. The safe order is status, test, add, continue.', tr: 'Test ve add yapmadan continue etme. Güvenli sıra: status, test, add, continue.' },
            help: { en: 'This practice assumes you already edited the file and removed the conflict markers intentionally.', tr: 'Bu alıştırma dosyayı düzenleyip conflict markerlarını bilinçli şekilde kaldırdığını varsayar.' },
          },
          {
            type: 'quiz',
            question: 'Paylaşılmış branch’i takım onayıyla rebase ettin. En güvenli push komutu hangisidir?',
            options: [
              { id: 'a', text: 'git push --force' },
              { id: 'b', text: 'git push --force-with-lease' },
              { id: 'c', text: 'git pull --rebase --hard' },
              { id: 'd', text: 'git reset origin/main' },
            ],
            correct: 'b',
            explanation: '`--force-with-lease`, remote branch beklenmedik şekilde ilerlediyse push’u durdurur ve teammate commit’ini ezme riskini azaltır.',
          
        retryQuestion: {
      "question": "Ortak bir branch üzerinde çalışırken commit geçmişini değiştirdin ve remote repoya göndermen gerekiyor. Hangi komut başkalarının yaptığı commit'leri yanlışlıkla silmeni engellemek için daha güvenlidir?",
      "options": [
            {
                  "id": "a",
                  "text": "git push --force-if-includes"
            },
            {
                  "id": "b",
                  "text": "git push --force-with-lease"
            },
            {
                  "id": "c",
                  "text": "git push -u origin HEAD"
            },
            {
                  "id": "d",
                  "text": "git commit --amend --no-edit"
            }
      ],
      "correct": "b",
      "explanation": "`--force-with-lease`, uzak repodaki güncellemelerin senin yerel branch'indeki durumla uyumlu olup olmadığını kontrol eder. Eğer sen push yapmadan önce başka biri değişiklik gönderdiyse, bu komut işlemin üzerine yazmanı engelleyerek veri kaybını önler."
}
},
        ],
      },
      {
        title: '🐙 GitHub Akışı: Repository, Remote, Pull Request, Review',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🏢',
            content: 'GitHub, takımın kodu için bir hava trafik kontrol kulesi gibidir: her pilot\'un (developer) kendi pisti (branch) vardır ama herhangi bir uçak ana piste (main) inmeden önce kule uçuş yolunu onaylar, diğer uçaklarla çakışma kontrolü yapar ve ancak o zaman inişe izin verir. Gerçek kavrayışı açan soru şu: Git zaten doğrudan main\'e push etmeye izin veriyorken GitHub neden bu pull request katmanını üstüne ekliyor? Çünkü Git bir solo araçtır — yalnızca geçmişi izler; GitHub ise review\'u zorunlu kılan, otomatik kontroller çalıştıran ve "bu güvenlik yamasını kim onayladı, merge\'lendiğinde CI raporu nasıldı?" sorusunu cevaplayabilecek audit trail oluşturan iş birliği protokolüdür. Java analojisi: GitHub\'ın repository modeli, erişim kontrolüne sahip Maven Central gibidir — oraya yayınlamak kimlik doğrulama, versiyonlama ve standartlara uyumu gerektirir, sunucuya dosya kopyalamak yeterli değildir. QA otomasyonunda GitHub akışı, lokalde çalıştırılmadan push edilen test dosyalarını yakalar, environment kurulum script\'lerine yanlışlıkla dahil edilen secret\'ları tespit eder ve uyumluluk denetimleri için gereken yazılı iz\'i sağlar.',
          },
          {
            type: 'simulation',
            scenario: 'github-pr-flow',
            icon: '🐙',
            color: '#2563eb',
            title: { en: 'Animate a Real Pull Request Flow', tr: 'Gerçek Pull Request Akışını Canlandır' },
            description: { en: 'Follow a test branch from local work to PR, review, CI checks and merge.', tr: 'Bir test branch’inin lokal çalışmadan PR, review, CI checks ve merge adımına gidişini izle.' },
            code: `# Review edilebilir QA değişikliği oluştur
git fetch origin
git switch -c feature/login-tests
git add tests/login.spec.js
git commit -m "test: add login regression checks"
git push -u origin feature/login-tests
# GitHub'da Pull Request aç, reviewer iste, checks sonucunu bekle`,
            language: 'bash',
          },
          gitPrPractice,
          gitRemoteSyncFilm,
          {
            type: 'grid',
            cols: 2,
            items: [
              { icon: '📝', label: 'PR description', desc: 'Ne değişti, nasıl test edildi, screenshot/report ve ilgili issue net yazılır.' },
              { icon: '✅', label: 'Required checks', desc: 'Merge öncesi geçmesi gereken unit, lint, e2e, smoke veya build kontrolleridir.' },
              { icon: '👀', label: 'Reviewers', desc: 'Test altyapısı değişikliklerinde code owner veya ilgili reviewer seçilir.' },
              { icon: '🧭', label: 'Traceability', desc: 'Issue, test case, bug ve release notları PR ile bağlanır.' },
            ],
          },
          {
            type: 'warning',
            content: '`main` branch’e doğrudan push yapmaktan kaçın. Profesyonel ekiplerde `main`, PR review ve required checks ile korunmalıdır. Direct push test kanıtını bypass eder ve rollback’i zorlaştırır.',
          },
          {
            type: 'quiz',
            question: 'Profesyonel bir ekipte her zaman Pull Request üzerinden gitmek yerine doğrudan `main`\'e push yapmaktan neden kaçınılır?',
            options: [
              { id: 'a', text: 'Doğrudan push, PR açmaktan daha yavaştır' },
              { id: 'b', text: 'Code review ve required checks\'i bypass eder, hatalı değişiklikleri ve rollback\'i yönetmeyi zorlaştırır' },
              { id: 'c', text: 'GitHub doğrudan push\'a hiç izin vermez' },
              { id: 'd', text: 'Doğrudan push commit geçmişini siler' },
            ],
            correct: 'b',
            explanation: 'Korumalı bir `main`, kod gitmeden önce PR review ve geçen kontroller (test, lint, build) ister — bu, hataları production\'a ulaşmadan yakalayan kapıdır. Doğrudan push bu kapıyı tamamen atlar: ikinci bir göz yok, testlerin geçtiğine dair CI kanıtı yok, ve bir şey bozulursa temizce geri alınacak belgelenmiş bir PR yok.',
            retryQuestion: {
              question: 'Bir repo\'da `main` üzerinde 1 onay ve geçen CI gerektiren branch protection aktif. Biri lokal bir commit ile doğrudan `git push origin main` denerse ne olur?',
              options: [
                { id: 'a', text: 'GitHub onu sessizce review olmadan merge eder' },
                { id: 'b', text: 'GitHub push\'u reddeder, çünkü kural değişikliklerin review edilmiş ve geçmiş bir Pull Request üzerinden gitmesini gerektirir' },
                { id: 'c', text: 'Push başarılı olur ama bir gün sonra otomatik geri alınır' },
                { id: 'd', text: 'GitHub acil durumlar için branch protection\'ı otomatik devre dışı bırakır' },
              ],
              correct: 'b',
              explanation: 'Branch protection kuralları sadece bir takım kuralı değil, GitHub\'ın kendisi tarafından uygulanır — etkinleştirildiğinde korumalı bir branch\'e doğrudan push tamamen reddedilir, her değişikliği yapılandırılan gereksinimleri (review sayısı, gerekli status check\'ler) karşılayan bir Pull Request\'e zorlar. "Her zaman PR\'dan geç" kuralını sadece nazik bir rica olmaktan çıkarıp gerçekten uygulanabilir kılan budur.',
            },
          },
        ],
      },
      {
        title: '🧾 Pull Request: Açma, Review, Onay, Ret ve Conflict Çözümü',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🧾',
            content: 'Pull Request, bir binaya çıkılan iskele malzemesinin kapıda imzayla teslim alınması gibidir: malzeme (kod) sahaya girmeden önce ne getirdiğin (diff), neden getirdiğin (açıklama) ve testten geçip geçmediği (CI) kayda geçer, sonra yetkili bir kişi imzalar. Peki testler zaten yeşilse, insan review’u neden hâlâ gerekli — makine onayladıysa iş bitmedi mi? Çünkü CI yalnızca "kod çalışıyor mu" sorusunu yanıtlar; "bu doğru çözüm mü, altı ay sonra bakımı yapılabilir mi, yanlışlıkla bir güvenlik kapısı mı açtık" sorularını yanıtlamaz — bunlar bağlam gerektirir. Java dünyasında buna en yakın şey, bir kütüphaneyi merkezî repoya yayınlamadan önce yapılan sürüm gözden geçirmesidir; fark şu ki PR bu tartışmayı toplantıya değil, satır satır kodun yanına iliştirir ve kalıcı bir kayıt bırakır. QA açısından PR’ın asıl değeri şudur: yıllar sonra bir regresyonun kökünü aradığında, `git blame` seni yalnızca satırı değiştiren kişiye değil, o değişikliğin NEDEN yapıldığını tartışan konuşmaya götürür. Conflict çıktığında ise PR, iki niyeti aynı ekranda yan yana koyar ve kararı tahmine değil, konuşmaya bırakır.',
          },
          {
            type: 'simulation',
            scenario: 'github-pull-request-ui-tour',
            icon: '🧾',
            color: '#2563eb',
            title: { en: 'GitHub Pull Request screen tour: compare, create, review and merge', tr: 'GitHub Pull Request ekran turu: compare, create, review ve merge' },
            description: { en: 'Walk through a GitHub-like PR interface: Pull requests tab, compare branches, Create pull request form, Conversation, Files changed, review decision, checks and merge button.', tr: 'GitHub benzeri PR arayüzünü gez: Pull requests tabı, branch karşılaştırma, Create pull request formu, Conversation, Files changed, review kararı, checks ve merge butonu.' },
          },
          {
            type: 'heading',
            text: 'Pull Request aslında ne işe yarar?',
          },
          {
            type: 'table',
            headers: ['PR alanı', 'Amacı', 'Gerçek iş kuralı'],
            rows: [
              ['Pull requests tab', 'Açık/kapalı PR listesini gösterir ve yeni PR başlatır', 'Kimsenin review edemediği işi main’e alma'],
              ['base / compare', 'base hedef branch, compare senin feature branch’indir', 'Çoğu takımda base main, compare feature/... olur'],
              ['PR title', 'Değişikliğin niyetini kısa söyler', 'Belirsiz başlık yerine "test: add login regression checks" gibi net yaz'],
              ['Description', 'Ne değişti, neden değişti, nasıl test edildi ve hangi issue bağlı anlatır', 'Test kanıtı, screenshot, report veya risk notu ekle'],
              ['Conversation tab', 'Tartışma, timeline, CI özeti ve merge kutusu burada görünür', 'Reviewer chat sormadan PR hikayesini anlayabilmeli'],
              ['Files changed tab', 'Satır satır diff review alanıdır', 'Sadece syntax değil davranış, test ve yan etki oku'],
              ['Review changes', 'Comment, Approve veya Request changes kararı gönderir', 'Approve merge-ready demektir; Request changes merge’i bloklar'],
              ['Checks', 'Actions test/build/lint durumunu gösterir', 'Review yeşil olsa bile required checks kırmızıysa merge etme'],
              ['Merge pull request', 'Onaylı PR’ı main’e birleştirir', 'Approval, yeşil checks ve unresolved conversation kontrolünden sonra kullan'],
            ],
          },
          githubPrOpenUiPractice,
          {
            type: 'heading',
            text: 'Code review nasıl yapılır?',
          },
          {
            type: 'simulation',
            scenario: 'github-pr-review-conflict-ui',
            icon: '👀',
            color: '#7c3aed',
            title: { en: 'Review, approve, request changes and conflict screen', tr: 'Review, approve, request changes ve conflict ekranı' },
            description: { en: 'See the real GitHub review shape: Files changed, line comment, Start a review, Review changes, Approve/Request changes, merge blocked by conflict, local conflict fix and green merge box.', tr: 'Gerçek GitHub review şeklini gör: Files changed, satır yorumu, Start a review, Review changes, Approve/Request changes, conflict yüzünden merge blocked, lokal conflict fix ve yeşil merge kutusu.' },
          },
          {
            type: 'table',
            headers: ['Review kararı', 'Anlamı', 'Ne zaman kullanılır?'],
            rows: [
              ['Comment', 'Onaylamadan veya bloklamadan feedback bırakır', 'Soru, opsiyonel öneri, dokümantasyon notu'],
              ['Approve', 'Reviewer kendi açısından değişikliği kabul eder', 'Davranış net, test yeterli, bloklayıcı risk kalmadıysa'],
              ['Request changes', 'Author düzeltmeden merge’i bloklar', 'Bug riski, eksik test, unsafe secret, bozulan contract, belirsiz tasarım varsa'],
              ['Dismiss review', 'Admin/maintainer eski review kararını kaldırır', 'Nadiren kullanılır; gerçek riski saklamak için kullanılmaz'],
              ['Resolve conversation', 'Review thread’inin ele alındığını işaretler', 'Yorum cevaplandı veya düzeltildiyse'],
            ],
          },
          githubPrReviewPractice,
          {
            type: 'heading',
            text: 'PR conflict çözülebilir mi?',
          },
          {
            type: 'text',
            content: 'Evet. GitHub bazı basit text conflict’leri web editörüyle çözmeyi teklif edebilir; ama QA işinde güvenli yol çoğu zaman lokalde çözmektir çünkü test çalıştırabilirsin. Normal akış: güncel main bilgisini al, PR branch’ine geç, origin/main’i branch’ine merge et, conflict markerları bilinçli düzenle, ilgili testi çalıştır, fix commit’i at ve push et. PR GitHub’da otomatik güncellenir.',
          },
          githubPrConflictPractice,
          githubPrLifecycleFilm,
          {
            type: 'warning',
            content: 'Gerçek iş tehlikesi: GitHub Merge pull request butonunu gösteriyor diye hemen basma. Önce unresolved conversation, required checks, requested changes, test kanıtı, branch güncelliği ve deploy riskini kontrol et.',
          },
          {
            type: 'code',
            label: 'Review istemeden önce PR author checklist',
            language: 'bash',
            code: `git status
npm test -- login.spec.js
git push -u origin feature/login-tests
# GitHub'da:
# 1. Pull requests → New pull request
# 2. base: main, compare: feature/login-tests
# 3. Title + description + test evidence yaz
# 4. Reviewer iste
# 5. Checks ve review sonucunu bekle`,
          },
          {
            type: 'step-animation',
            id: 'git-pr-checklist-step-01',
            title: { tr: 'PR Author Checklist\'indeki Her Adım Neyi Kanıtlar?', en: 'What Does Each Step of the PR Author Checklist Actually Prove?' },
            steps: [
              { id: 1, icon: '1️⃣', label: { tr: 'git status çalıştırılması…', en: 'Running git status…' }, detail: { tr: 'git status çalıştırılması, PUSH etmeden ÖNCE hangi dosyaların DEĞİŞTİĞİNİ ve stage\'de olduğunu GÖRMENİ sağlar — sürpriz bir dosyanın YANLIŞLIKLA PR\'a girmesini ÖNLER.', en: 'Running git status LETS you SEE which files CHANGED and are staged BEFORE pushing — it PREVENTS a surprise file from ACCIDENTALLY entering the PR.' } },
              { id: 2, icon: '2️⃣', label: { tr: 'npm test -- login.spec.js…', en: 'npm test -- login.spec.js…' }, detail: { tr: "npm test -- login.spec.js İLGİLİ testin LOKALDE geçtiğini kanıtlar — CI'nin RED vermesini BEKLEMEDEN, hatayı KENDİ makinende YAKALARSIN.", en: "npm test -- login.spec.js PROVES the RELEVANT test passes LOCALLY — you CATCH the error on YOUR OWN machine WITHOUT waiting for CI to turn RED." } },
              { id: 3, icon: '3️⃣', label: { tr: 'git push -u origin feature/login-tests…', en: 'git push -u origin feature/login-tests…' }, detail: { tr: 'git push -u origin feature/login-tests, LOKAL branch\'i GitHub\'da bir REMOTE branch olarak YAYINLAR — bu olmadan GitHub\'da bir PR açacak HİÇBİR ŞEY olmaz.', en: 'git push -u origin feature/login-tests PUBLISHES the LOCAL branch as a REMOTE branch on GitHub — without this, there is NOTHING to open a PR against.' } },
              { id: 4, icon: '4️⃣', label: { tr: 'base: main / compare: feature/login-tests SEÇİMİ…', en: 'The base: main / compare: feature/login-tests choice…' }, detail: { tr: '"New pull request" ekranında base: main / compare: feature/login-tests SEÇİMİ, GitHub\'a "bu DEĞİŞİKLİĞİ NEREYE birleştirmek istiyorum" der.', en: 'On the "New pull request" screen, choosing base: main / compare: feature/login-tests TELLS GitHub "WHERE I want to merge this CHANGE INTO".' } },
              { id: 5, icon: '5️⃣', label: { tr: 'Test kanıtı İÇEREN bir açıklama YAZMAK…', en: 'Writing a description WITH test evidence…' }, detail: { tr: 'Test kanıtı (screenshot/log) İÇEREN bir açıklama YAZMAK, reviewer\'ın "çalıştığını NASIL biliyorsun?" sorusunu SORMADAN cevaplamasını sağlar — review SÜRESİNİ kısaltır.', en: 'Writing a description WITH test evidence (screenshot/log) ANSWERS the reviewer\'s "HOW do you know it works?" question BEFORE it\'s ASKED — it SHORTENS the review time.' } },
            ],
          },
          gitPrPushPractice,
          {
            type: 'challenge',
            variant: 'order-sort',
            id: 'git-pr-checklist-order-01',
            question: { tr: 'Review istemeden önceki PR author checklist sırasını diz.', en: 'Order the PR author checklist before asking for review.' },
            items: [
              { id: '1', text: { tr: 'git status ile değişiklikleri kontrol et', en: 'Check the changes with git status' }, order: 1 },
              { id: '2', text: { tr: 'İlgili testi lokalde çalıştır (npm test -- login.spec.js)', en: 'Run the relevant test locally (npm test -- login.spec.js)' }, order: 2 },
              { id: '3', text: { tr: "git push -u origin feature/login-tests ile branch'i yayınla", en: 'Publish the branch with git push -u origin feature/login-tests' }, order: 3 },
              { id: '4', text: { tr: "GitHub'da base/compare seçerek PR aç", en: 'Open a PR on GitHub by choosing base/compare' }, order: 4 },
              { id: '5', text: { tr: 'Test kanıtıyla açıklama yaz ve reviewer iste', en: 'Write a description with test evidence and request a reviewer' }, order: 5 },
            ],
            xpReward: 10,
          },
          {
            type: 'quiz',
            question: 'Reviewer, main’e bug kaçırabilecek eksik bir negatif login testi buldu. Doğru review kararı hangisidir?',
            options: [
              { id: 'a', text: 'Kod compile olduğu için Approve' },
              { id: 'b', text: 'Testler opsiyonel olduğu için sadece Comment' },
              { id: 'c', text: 'Eksik testi açıklayıp Request changes' },
              { id: 'd', text: 'Hemen Merge pull request' },
            ],
            correct: 'c',
            explanation: 'Gerçek bug riski doğurabilecek eksik test bloklayıcı feedback’tir. Request changes, risk çözülene kadar PR’ın main’e girmesini engeller.',
          
        retryQuestion: {
      "question": "Bir Pull Request review sürecinde, kodun kritik bir hata yönetimi (exception handling) mekanizmasını eksik bıraktığını fark ettin. En uygun aksiyon nedir?",
      "options": [
            {
                  "id": "a",
                  "text": "Kodu düzeltip kendin Merge et"
            },
            {
                  "id": "b",
                  "text": "Sadece bir 'Suggestion' bırakıp Approve et"
            },
            {
                  "id": "c",
                  "text": "Gerekli düzeltmeyi isteyerek 'Request changes' seçeneğini kullan"
            },
            {
                  "id": "d",
                  "text": "Kod çalıştığı için incelemeyi tamamlayıp 'Approve' et"
            }
      ],
      "correct": "c",
      "explanation": "Kritik eksiklikler veya hata yönetimi zafiyetleri, kodun üretim ortamında bozulmasına neden olabilir. 'Request changes' kullanarak geliştiricinin bu açığı kapatmasını zorunlu kılmak, kod kalitesini ve güvenliğini korumak için en profesyonel yaklaşımdır."
}
},
        ],
      },
      {
        title: '🚀 QA için GitHub Actions: CI, Report, Matrix ve Secrets',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🏭',
            content: 'GitHub Actions, kendi kendine çalışan bir fabrika montaj hattı gibidir: bant başına bir parça (commit) düştüğü anda makineler sırayla devreye girer — bağımlılıkları kurar, testleri koşar, build alır, raporu yayınlar — ve hiçbir adım "ustanın keyfine" bırakılmaz. Peki testleri kendi bilgisayarında zaten çalıştırıyorsan, aynı testleri bir de CI’da koşmak neden gereksin? Çünkü senin makinen dünyadaki tek makine değildir: sende kurulu olan bir Chrome sürümü, bir ortam değişkeni ya da yıllar önce kurduğun bir global paket testi yeşil gösterirken, temiz bir makinede aynı test kırmızı yanabilir — CI’ın asıl işi testi koşmak değil, testi SIFIRDAN ve TEKRARLANABİLİR biçimde koşmaktır. Java tarafında bunun karşılığı, projeyi kendi IDE’nde değil temiz bir `mvn clean verify` ile doğrulamandır; Actions bunu her push’ta, senin hatırlamana gerek kalmadan yapar. QA açısından bu farkın adı vardır: "bende çalışıyordu" cümlesi bir mühendislik açıklaması değildir — CI, o cümleyi tartışmadan çıkarıp yerine herkesin görebildiği bir kanıt (log, rapor, artifact) koyar.',
          },
          {
            type: 'simulation',
            scenario: 'github-actions-ui-tour',
            icon: '🚀',
            color: '#2563eb',
            title: { en: 'GitHub Actions screen tour: buttons, runs and reports', tr: 'GitHub Actions ekran turu: butonlar, run’lar ve raporlar' },
            description: { en: 'Walk through the real GitHub Actions interface shape: top Actions tab, New workflow, workflow list, run rows, filters, logs, artifacts and rerun controls.', tr: 'Gerçek GitHub Actions arayüz şeklini gez: üst Actions tabı, New workflow, workflow listesi, run satırları, filter, loglar, artifact ve rerun kontrolleri.' },
          },
          {
            type: 'heading',
            text: 'Actions ekranındaki butonlar ne işe yarar?',
          },
          {
            type: 'table',
            headers: ['UI alanı', 'Ne işe yarar?', 'QA mühendisi ne zaman kullanır?'],
            rows: [
              ['Üst menüde Actions', 'Repository CI/CD run’larını açar', 'PR veya main deploy geçti mi kontrol etmek için'],
              ['New workflow', '`.github/workflows/` altına template veya boş YAML ile yeni workflow oluşturur', 'İlk CI, Playwright, Maven veya Pages deploy workflow’u eklemek için'],
              ['All workflows', 'Tüm workflow run’larını tek listede gösterir', 'En yeni fail durumunu workflow adı tahmin etmeden görmek için'],
              ['Sol menüde workflow adı', 'Run listesini tek workflow’a filtreler', 'Sadece "Deploy site" veya sadece "QA Checks" açmak için'],
              ['Filter workflow runs', 'Run listesini metinle filtreler', 'Commit, branch, actor veya failed run hızlı bulmak için'],
              ['Run satırı', 'Tek workflow çalışmasını açar', 'Job, log, annotation ve artifact okumak için'],
              ['Yeşil/kırmızı status icon', 'Success/failure/cancelled durumunu gösterir', 'Merge/deploy öncesi kalite kapısı geçti mi görmek için'],
              ['Üç nokta / rerun kontrolleri', 'Tüm jobları veya sadece failed jobları tekrar çalıştırır', 'Flaky altyapı veya environment düzeltmesi sonrası kullanılır'],
              ['Artifacts', 'Kaydedilen report, screenshot ve trace dosyalarını indirir', 'Fail olan browser/API testini lokal reproduce etmeden anlamak için'],
              ['Caches / Runners / Usage metrics', 'Hız, runner sağlığı ve kullanım/maliyet görünürlüğü sağlar', 'Yavaş CI, stale cache veya runner kapasitesi sorunlarında'],
            ],
          },
          githubActionsUiPractice,
          {
            type: 'simulation',
            scenario: 'github-actions-pages',
            icon: '🚀',
            color: '#7c3aed',
            title: { en: 'Actions Pipeline: Push to Live Site', tr: 'Actions Pipeline: Push’tan Canlı Siteye' },
            description: { en: 'Watch a GitHub Actions workflow install dependencies, test, build and deploy to GitHub Pages.', tr: 'GitHub Actions workflow’unun bağımlılık kurup test, build ve GitHub Pages deploy yapmasını izle.' },
            code: `name: QA Checks
on:
  pull_request:                    # Merge öncesi çalışır
  push:
    branches: [main]               # Merge sonrası tekrar çalışır

jobs:
  test:
    runs-on: ubuntu-latest          # GitHub-hosted Linux runner
    steps:
      - uses: actions/checkout@v4   # Repository kodunu indir
      - uses: actions/setup-node@v4 # Node runtime kur
        with:
          node-version: 20
          cache: npm
      - run: npm ci                 # package-lock ile temiz kurulum
      - run: npm test               # QA kontrollerini çalıştır
      - run: npm run build          # App build oluyor mu kanıtla`,
            language: 'yaml',
          },
          {
            type: 'heading',
            text: 'Workflow anatomisi',
          },
          {
            type: 'table',
            headers: ['YAML parçası', 'Anlamı', 'QA örneği'],
            rows: [
              ['on', 'Workflow’u hangi event başlatır?', 'PR checks için pull_request, deploy için main push'],
              ['jobs', 'Bağımsız çalışma birimleri', 'test, build, deploy'],
              ['runs-on', 'Runner makinesi', 'ubuntu-latest, windows-latest, macos-latest'],
              ['steps', 'Job içindeki sıralı komutlar', 'checkout, setup, install, test, report upload'],
              ['permissions', 'Token yetkileri', 'Test için read, deploy için pages write'],
              ['artifacts', 'Run sonrası saklanan dosyalar', 'HTML report, screenshot, Playwright trace'],
            ],
          },
          {
            type: 'code',
            label: 'Başarısız testten sonra Playwright report sakla',
            language: 'yaml',
            code: `- name: Run Playwright tests
  run: npx playwright test              # Browser testlerini çalıştır

- name: Upload Playwright report
  if: always()                          # Test fail olsa da upload et
  uses: actions/upload-artifact@v4
  with:
    name: playwright-report
    path: playwright-report/
    retention-days: 7                   # Debug için yeterli süre sakla`,
          },
          githubActionsTriggerFilm,
          {
            type: 'warning',
            content: 'Secret değerlerini workflow loglarına asla yazdırma. Repository/environment secrets kullan, permissions değerini minimum tut ve untrusted fork pull request’lerinde secret erişiminin kısıtlı olduğunu unutma.',
          },
          {
            type: 'quiz',
            question: 'Test job\'ı başarısız olduğunda bir Pull Request\'in merge edilmesini engelleyecek bir workflow istiyorsun. Bu QA kapı bekçiliği için hangi `on:` tetikleyicisi uygundur?',
            options: [
              { id: 'a', text: 'on: push (main\'e)' },
              { id: 'b', text: 'on: pull_request' },
              { id: 'c', text: 'on: schedule' },
              { id: 'd', text: 'on: workflow_dispatch' },
            ],
            correct: 'b',
            explanation: '`on: pull_request`, her PR güncellemesinde workflow\'u çalıştırır ve geçti/geçmedi durumunu merge öncesi gerekli bir kontrol olarak gösterir — QA\'nın istediği tam olarak bu kapı bekçiliğidir. `on: push` (main\'e) sadece kod ZATEN merge edildikten SONRA çalışır; deploy için faydalıdır ama hatalı bir PR\'ı engellemek için çok geçtir. `schedule` ve `workflow_dispatch` ise periyodik veya manuel tetiklenen çalışmalar içindir, merge engellemek için değil.',
            retryQuestion: {
              question: 'Bir ekip, kod `main`e ulaştığı anda otomatik production deploy yapan ama HER PR\'da değil (review edilmemiş kodu deploy etmemek için) çalışan bir workflow istiyor. Hangi tetikleyici uygundur?',
              options: [
                { id: 'a', text: 'on: pull_request' },
                { id: 'b', text: 'on: push (main branch\'ine filtrelenmiş)' },
                { id: 'c', text: 'on: schedule' },
                { id: 'd', text: 'sadece on: workflow_dispatch' },
              ],
              correct: 'b',
              explanation: '`main`e filtrelenmiş `on: push`, workflow\'u sadece commit\'ler ORAYA ulaştığında çalıştırır — yani bir PR zaten review edilip merge edildikten sonra, ki bu deploy için tam doğru zamandır. `on: pull_request` her PR güncellemesinden review edilmemiş kodu deploy ederdi, `schedule` merge\'lerle ilgisiz bir zamanlayıcıda çalışır, `workflow_dispatch` ise sadece biri manuel tetiklediğinde çalışır.',
            },
          },
        ],
      },
      {
        title: '🌐 GitHub Pages: Static Deploy, Custom Domain ve SPA Fallback',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🏡',
            content: 'GitHub Pages, hazırladığın bir sergiyi vitrine koymak gibidir: ziyaretçi vitrindeki her şeyi görebilir, ama vitrinin arkasında yemek pişiren bir mutfak yoktur — yalnızca önceden hazırlanmış (build edilmiş) dosyalar servis edilir. Peki site tarayıcıda sorunsuz açılıyorsa, "backend yok" olması pratikte neyi değiştirir? Şunu değiştirir: kullanıcı adı/parola doğrulamak, veritabanına yazmak veya bir API anahtarını gizli tutmak için sunucu tarafında çalışan bir kod gerekir — Pages’te böyle bir yer olmadığı için JavaScript’e gömdüğün her "gizli" anahtar aslında herkese açıktır. Java tarafında bunu şöyle düşün: Pages, çalışan bir Spring Boot uygulaması değil, `target/` altındaki statik çıktının yayınlanmış hâlidir. QA açısından en sık ısıran ayrıntı ise routing’dir: `/selenium` gibi temiz bir URL’e doğrudan girildiğinde sunucu o adı taşıyan bir dosya arar, bulamaz ve 404 döner — bu yüzden SPA’larda `404.html` fallback’i kurulmazsa, siteyi kendi laptop’unda kusursuz gezerken gerçek kullanıcı ilk paylaşılan linkte boş sayfa görür.',
          },
          {
            type: 'simulation',
            scenario: 'github-pages-settings-ui',
            icon: '🌐',
            color: '#0ea5e9',
            title: { en: 'GitHub Pages settings screen: source, domain, HTTPS and live site', tr: 'GitHub Pages Settings ekranı: source, domain, HTTPS ve canlı site' },
            description: { en: 'See where Pages lives inside Settings and what Visit site, Unpublish site, Source, Custom domain, Save, Remove and Enforce HTTPS do.', tr: 'Pages’in Settings içinde nerede olduğunu ve Visit site, Unpublish site, Source, Custom domain, Save, Remove, Enforce HTTPS kontrollerinin ne yaptığını gör.' },
          },
          {
            type: 'heading',
            text: 'Pages ekranındaki kontroller ne işe yarar?',
          },
          {
            type: 'table',
            headers: ['Kontrol', 'Amacı', 'Dikkat edilmesi gereken'],
            rows: [
              ['Your site is live at', 'Güncel public Pages URL’ini gösterir', 'URL yanlışsa DNS veya source yanlış olabilir'],
              ['Visit site', 'Canlı yayınlanan siteyi açar', 'Sadece local build’e değil, deploy sonrası canlıya da bak'],
              ['Unpublish site', 'Pages yayını durdurur', 'Production doküman/portfolio sitesinde tehlikelidir'],
              ['Source dropdown', 'Branch deploy mu GitHub Actions deploy mu seçer', 'Yanlış source eski veya boş dosyaları yayınlayabilir'],
              ['Custom domain alanı', 'learnqa.dev gibi domain bağlar', 'DNS GitHub Pages gereksinimleriyle uyumlu olmalı'],
              ['Save / Remove', 'Custom domain kaydeder veya kaldırır', 'Remove production URL’i bozabilir'],
              ['DNS check status', 'GitHub DNS’i doğrulayabiliyor mu gösterir', 'Deploy bozuk sanmadan önce bekle ve kontrol et'],
              ['Enforce HTTPS', 'Siteyi HTTPS üzerinden zorlar', 'DNS/certificate hazır olunca açık tut'],
            ],
          },
          githubPagesUiPractice,
          {
            type: 'simulation',
            scenario: 'github-repo-settings-tour',
            icon: '⚙️',
            color: '#64748b',
            title: { en: 'Repository Settings tour: collaborators, visibility, branch rules and secrets', tr: 'Repository Settings turu: collaborator, visibility, branch rule ve secret' },
            description: { en: 'Learn what the Settings tab is for: add collaborators, switch public/private, protect main, manage Actions permissions, secrets, webhooks, environments and Pages.', tr: 'Settings tabının ne işe yaradığını öğren: collaborator ekle, public/private değiştir, main’i koru, Actions permission, secret, webhook, environment ve Pages ayarlarını yönet.' },
          },
          {
            type: 'table',
            headers: ['Settings alanı', 'Burada ne yapılır?', 'Gerçek iş uyarısı'],
            rows: [
              ['General', 'Repo adı, açıklama, default branch, özellikler, visibility ve Danger Zone işlemleri', 'Visibility değiştirmek veya repo silmek tüm takımı etkiler'],
              ['Collaborators', 'Kişi davet edilir ve access yönetilir', 'Kişiye çalışması için gereken en düşük rol verilmeli'],
              ['Branches / Rules', 'main korunur, PR review ve required checks zorunlu yapılır', 'Rules yoksa direct push QA kanıtını bypass eder'],
              ['Actions', 'Actions aç/kapat, workflow permission ve runner kuralları', 'Her workflow’a varsayılan write token vermemek gerekir'],
              ['Secrets and variables', 'Workflow token/config değerleri saklanır', 'Secret asla YAML veya log içine yazılmaz'],
              ['Webhooks', 'GitHub event’leri dış servislere gönderilir', 'Yanlış endpoint event payload sızdırabilir'],
              ['Environments', 'Deploy environment, approval ve environment secret tanımlanır', 'Production deploy çoğu zaman approval istemelidir'],
              ['Pages', 'Static hosting source, domain ve HTTPS ayarlanır', 'Yanlış source eski veya private build output yayınlayabilir'],
            ],
          },
          githubSettingsPractice,
          {
            type: 'code',
            label: 'Vite app için Pages deploy workflow',
            language: 'yaml',
            code: `name: Deploy site to GitHub Pages
on:
  push:
    branches: [main]                  # Sadece main'den deploy
  workflow_dispatch:                  # Manuel deploy imkanı

permissions:
  contents: read                      # Repository dosyalarını oku
  pages: write                        # Pages'e yayınla
  id-token: write                     # Deploy için OIDC token

concurrency:
  group: pages
  cancel-in-progress: false           # Çalışan Pages deploy'u kesme

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4     # Kodu runner'a indir
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci                   # Exact dependency kurulumu
      - run: npm run build            # dist/ üret
      - run: cp dist/index.html dist/404.html # SPA fallback
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4`,
          },
          {
            type: 'table',
            headers: ['Konu', 'Ne kontrol edilir?', 'Tehlike'],
            rows: [
              ['Publishing source', 'Settings → Pages stratejinle uyumlu mu: branch mi GitHub Actions mı?', 'Yanlış source eski dosyayı yayınlayabilir'],
              ['Custom domain', '`CNAME` published artifact içinde kalıyor mu?', 'Domain default github.io adresine dönebilir'],
              ['SPA routes', 'Static route shell veya 404 fallback var mı?', 'Direkt URL refresh 404 gösterebilir'],
              ['SEO', 'Her route title, description, canonical ve sitemap entry alıyor mu?', 'Crawler boş shell görebilir'],
              ['Secrets', 'Static site deploy için app secret genelde gerekmez', 'Built JS içine giren secret herkese açık olur'],
            ],
          },
          githubPagesDeployFilm,
          {
            type: 'warning',
            content: 'Static Pages build içindeki her şey public’tir. API key, token veya özel test datasını Vite/React client koduna koyma. Client JavaScript içine giren environment variable kullanıcı tarafından görülebilir.',
          },
          {
            type: 'quiz',
            question: 'GitHub Pages Source ayarın, GitHub Actions workflow\'unun gerçekten deploy ettiği branch yerine eski bir branch\'i göstermeye devam ediyor. Görünür belirti nedir?',
            options: [
              { id: 'a', text: 'Site hiç build olmaz' },
              { id: 'b', text: 'Workflow çalışması "başarılı" görünse de canlı site eski/boş dosyalar sunmaya devam eder' },
              { id: 'c', text: 'GitHub source\'u otomatik olarak workflow ile eşleşecek şekilde düzeltir' },
              { id: 'd', text: 'Custom domain çözümlenmeyi durdurur' },
            ],
            correct: 'b',
            explanation: 'GitHub Pages, ayarlanan Source\'un işaret ettiği şeyi yayınlar — hangi workflow\'u yetkili saymak istediğinden habersizdir. Source eski bir branch\'i (veya yanlış deploy yöntemini) gösterirken Actions workflow\'un başka bir yere deploy ediyorsa, workflow çalışması yeşil/başarılı görünebilir ama public site, Pages yeni artifact\'ı hiç almadığı için eski veya boş içerik sunmaya devam eder.',
            retryQuestion: {
              question: 'Repo ayarlarında Pages Source\'unu "Deploy from a branch"tan "GitHub Actions"a çeviriyorsun. Canlı sitenin gerçekten güncellenmesi için başka ne doğru olmalı?',
              options: [
                { id: 'a', text: 'Hiçbir şey — sadece bu değişiklik canlı siteyi anında güncelleştirir' },
                { id: 'b', text: 'actions/deploy-pages kullanan bir workflow değişiklikten sonra en az bir kez başarıyla çalışmış olmalı' },
                { id: 'c', text: 'Repository public yapılmalı' },
                { id: 'd', text: 'Eski branch silinmeli' },
              ],
              correct: 'b',
              explanation: 'Source ayarını değiştirmek GitHub Pages\'e sadece sıradaki deploy\'u NEREDE arayacağını söyler — geriye dönük olarak bir deploy tetiklemez. Canlı site sadece `actions/deploy-pages` (veya eşdeğeri) kullanan bir Actions workflow\'u değişiklikten sonra GERÇEKTEN bir çalışmayı tamamladığında güncellenir; o ana kadar Pages hiçbir yeni şey göstermeyebilir veya o ilk başarılı deploy gerçekleşene kadar hata bile verebilir.',
            },
          },
        ],
      },
      {
        title: '⚠️ Gerçek İş Riskleri ve Takım Güvenlik Kuralları',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🚧',
            content: '`git push --force`, `git reset --hard` ve `git clean -fd` gibi komutlar, şantiyedeki bir ekskavatör gibidir: doğru elde saatler kazandırır, ama operatör çalıştırmadan önce etrafa bakmazsa altında ne olduğunu ancak kırdıktan sonra öğrenir — ve kırdığı şey çoğu zaman kendi işi değil, başkasının işidir. Peki Git her şeyi kaydediyorsa, bu komutlar neden gerçekten tehlikeli olsun — nasılsa geri alınmaz mı? Kısmen: `reflog` yerel geçmişi bir süre tutar, ama HİÇ commit edilmemiş değişiklikler (`reset --hard` sonrası) ve başkasının makinesindeki tarih (`push --force` sonrası) bu ağın dışındadır — yani Git seni kendi hatandan korur, ekibin geçmişini ezmenden korumaz. Java tarafında en yakın his, paylaşılan bir kütüphanenin yayınlanmış bir sürümünü aynı numarayla yeniden yayınlamaktır: derleyici itiraz etmez, ama o sürümü çeken herkesin elindeki şey sessizce değişir. QA açısından gerçek senaryo şudur: force push’lanan bir branch’te, dün yeşil olan bir testin bugün var olmayan bir commit’e ait olduğu ortaya çıkar — regresyonun ne zaman girdiğini kimse kanıtlayamaz. Kuralı basit tut: paylaşılan branch’te force kullanma, kullanacaksan `--force-with-lease` seç, ekibi önceden haberdar et ve önce bir yedek branch aç.',
          },
          gitRecoveryPractice,
          {
            type: 'table',
            headers: ['Risk', 'Neden acıtır?', 'Daha güvenli alışkanlık'],
            rows: [
              ['`git reset --hard`', 'Commit edilmemiş işi siler', 'Önce `git status` ve `git diff`; gerekirse yedek branch'],
              ['`git push --force`', 'Teammate commit’ini ezebilir', 'Takım onayıyla sadece `--force-with-lease`'],
              ['Git içinde secret', 'History ve forklar credential gösterebilir', 'Secret’ı hemen rotate et; sadece silmeye güvenme'],
              ['Kör `git add .`', 'Report, video, `.env`, local not stage edebilir', 'Belirli dosya ekle ve `git diff --staged` kontrol et'],
              ['Uzun yaşayan branch', 'Geç conflict ve gizli integration bug üretir', 'Küçük PR, sık fetch, hızlı review'],
              ['Gerekli dosyayı ignore etmek', 'CI/local farklı davranır', 'Sample config commit et, local secret dokümante et'],
              ['Direct main push', 'Review ve required checks bypass olur', 'Main’i koru, PR checks zorunlu olsun'],
              ['Büyük binary history', 'Clone yavaşlar, repo sonsuza kadar ağırlaşır', 'Artifact, release veya gerekiyorsa LFS kullan'],
            ],
          },
          {
            type: 'heading',
            text: 'Geri alma stratejileri: revert vs reset',
          },
          {
            type: 'simulation',
            scenario: 'git-revert-vs-reset',
            icon: '⏪',
            color: '#dc2626',
            title: { en: 'Revert vs Reset: two undo strategies', tr: 'Revert vs Reset: iki geri alma stratejisi' },
            description: { en: 'Watch revert create a safe new commit vs reset removing history.', tr: 'Revert güvenli yeni commit oluştururken reset history siler. Farkı gör.' },
          },
          {
            type: 'table',
            headers: ['Strateji', 'Ne olur', 'Paylaşılmış branch için güvenli mi?', 'Ne zaman kullan'],
            rows: [
              ['`git revert HEAD`', 'Son commit\'i geri alan YENİ commit oluşturur. History korunur.', '✅ Evet — teammate neden geri alındığını görür', 'Zaten push edilmiş bir hatayı geri almak için'],
              ['`git reset --soft HEAD~1`', 'Son commit\'i kaldırır ama değişiklikler staged kalır. History değişir.', '⚠️ Sadece push öncesi', 'Commit mesajını düzeltmek veya commit bölmek için'],
              ['`git reset --hard HEAD~1`', 'Son commit\'i VE tüm değişiklikleri siler. Hiçbir şey kalmaz.', '❌ Push sonrası asla', 'Sadece local işi gerçekten silmek istediğinde'],
            ],
          },
          gitSafeUndoPractice,
          {
            type: 'code',
            label: 'Aynı son commit üzerinde üç reset modu',
            language: 'bash',
            code: `git log --oneline -3                      # a3f7c2d (HEAD) test: cover login errors

git reset --soft HEAD~1                    # Commit kaldırılır, değişiklikler STAGED kalır
git status                                 # Changes: to be committed: tests/login.spec.js

git reset HEAD~1                           # --mixed (varsayılan): commit kaldırılır, değişiklikler UNSTAGED kalır
git status                                 # Changes not staged for commit: tests/login.spec.js

git reset --hard HEAD~1                    # Commit VE tüm değişiklikler yok edilir, hiçbir şey kalmaz
git status                                 # Working tree clean`,
          },
          {
            type: 'code-playground',
              relatedTopicId: 'git-reset-practice-01',
            id: 'git-reset-practice-01',
            label: { tr: 'Micro Lab: git reset modları', en: 'Micro Lab: git reset modes' },
            language: 'bash',
            task: {
              tr: 'Son commit\'in mesajını düzeltmek istiyorsun ama dosya içeriğini kaybetmek istemiyorsun. TODO satırını, değişiklikleri staged halde bırakan reset moduyla tamamla. Java\'da bir nesneyi yok edip referansı null yapmak (`--hard`) ile sadece son atamayı geri almak (`--soft`) arasındaki fark gibi düşün.',
              en: 'You want to fix the last commit message without losing the file content. Complete the TODO line with the reset mode that leaves changes staged. Think of it like the difference in Java between destroying an object and nulling the reference (`--hard`) versus just undoing the last assignment (`--soft`).',
            },
            code: { tr: 'git log --oneline -1\ngit reset --soft HEAD~1\ngit status\ngit commit -m "fix: dogru mesaj"', en: 'git log --oneline -1\ngit reset --soft HEAD~1\ngit status\ngit commit -m "fix: correct message"' },
            starterCode: { tr: 'git log --oneline -1\n// TODO: son commiti kaldir ama degisiklikleri staged birak\ngit status\ngit commit -m "fix: dogru mesaj"', en: 'git log --oneline -1\n// TODO: remove the last commit but keep changes staged\ngit status\ngit commit -m "fix: correct message"' },
            solutionCode: { tr: 'git log --oneline -1\ngit reset --soft HEAD~1\ngit status\ngit commit -m "fix: dogru mesaj"', en: 'git log --oneline -1\ngit reset --soft HEAD~1\ngit status\ngit commit -m "fix: correct message"' },
            expected: {
              tr: '`git status` çalıştırıldığında dosya "Changes to be committed" altında görünür — hiçbir şey kaybolmadı, sadece commit geri alındı.',
              en: '`git status` shows the file under "Changes to be committed" — nothing was lost, only the commit was undone.',
            },
            hints: [
              { tr: '--soft sadece commit\'i geri alır; staging area ve working tree dokunulmaz kalır.', en: '--soft only undoes the commit; the staging area and working tree stay untouched.' },
              { tr: '--mixed (bayraksız varsayılan) staging\'i de geri alır; --hard hem staging hem working tree\'yi yok eder.', en: '--mixed (the flagless default) also unstages; --hard destroys both staging and the working tree.' },
            ],
            xpReward: 10,
          },
          {
            type: 'step-animation',
            id: 'git-reset-step-01',
            title: { tr: 'Adım Adım: git reset --soft vs --mixed vs --hard', en: 'Step by Step: git reset --soft vs --mixed vs --hard' },
            steps: [
              { id: 1, icon: '📍', label: { tr: 'Mevcut commit\'i gör', en: 'See the current commit' }, detail: { tr: 'git log --oneline -3 çalıştırılır: a3f7c2d (HEAD) en üstte görünür.', en: 'Run git log --oneline -3: a3f7c2d (HEAD) appears at the top.' } },
              { id: 2, icon: '🟢', label: { tr: '--soft: en güvenli', en: '--soft: the safest' }, detail: { tr: 'git reset --soft HEAD~1 sonrası git status "Changes to be committed" gösterir — dosya hâlâ staged.', en: 'After git reset --soft HEAD~1, git status shows "Changes to be committed" — the file is still staged.' } },
              { id: 3, icon: '🟡', label: { tr: '--mixed: varsayılan', en: '--mixed: the default' }, detail: { tr: 'git reset HEAD~1 (bayraksız) sonrası git status "Changes not staged for commit" gösterir — staging temizlendi ama dosya diskte duruyor.', en: 'After git reset HEAD~1 (no flag), git status shows "Changes not staged for commit" — staging is cleared but the file is still on disk.' } },
              { id: 4, icon: '🔴', label: { tr: '--hard: geri dönüşsüz', en: '--hard: irreversible' }, detail: { tr: 'git reset --hard HEAD~1 sonrası git status "working tree clean" yazar — commit ve içerik birlikte yok oldu.', en: 'After git reset --hard HEAD~1, git status prints "working tree clean" — the commit and the content are both gone.' } },
              { id: 5, icon: '🛡️', label: { tr: 'Güvenlik kuralı', en: 'Safety rule' }, detail: { tr: 'Push edilmiş bir commit üzerinde asla --hard kullanma; bunun yerine git revert kullan, çünkü revert tarihi yeni bir commit ile düzeltir, silmez.', en: 'Never run --hard on an already-pushed commit; use git revert instead, since revert fixes history with a new commit instead of deleting it.' } },
            ],
          },
          gitForcePushRescueFilm,
          {
            type: 'challenge',
            variant: 'order-sort',
            id: 'git-reset-order-01',
            question: { tr: 'Yanlış commit mesajını güvenli şekilde düzeltme sırasını kur.', en: 'Order the safe sequence for fixing a wrong commit message.' },
            items: [
              { id: '1', text: { tr: 'git log --oneline -1 ile mevcut commit\'i kontrol et', en: 'Check the current commit with git log --oneline -1' }, order: 1 },
              { id: '2', text: { tr: 'Commit\'in push edilip edilmediğini doğrula', en: 'Verify whether the commit was already pushed' }, order: 2 },
              { id: '3', text: { tr: 'git reset --soft HEAD~1 ile commit\'i geri al, değişiklikleri staged bırak', en: 'Undo the commit with git reset --soft HEAD~1, keeping changes staged' }, order: 3 },
              { id: '4', text: { tr: 'git status ile dosyanın hâlâ staged olduğunu doğrula', en: 'Confirm the file is still staged with git status' }, order: 4 },
              { id: '5', text: { tr: 'git commit -m "doğru mesaj" ile yeniden commit at', en: 'Recommit with git commit -m "correct message"' }, order: 5 },
            ],
            xpReward: 10,
          },
          {
            type: 'code',
            label: 'Güvenli pre-push checklist',
            language: 'bash',
            code: `git status                         # Sadece hedef dosyalar değişmiş mi?
git diff --staged                   # Commit'e tam olarak ne girecek?
npm test                            # İlgili local kontrolleri çalıştır
git fetch origin                    # Remote ilerlemiş mi?
git log --oneline --graph --decorate --max-count=12 # Yakın history'yi gör
git push origin feature/my-branch   # Sadece kendi branch'ini push et`,
          },
          {
            type: 'warning',
            content: 'Bir komut history rewrite ediyor, dosya siliyor, branch kaldırıyor veya credential’a dokunuyorsa yavaşla. Gerçek şirkette shared history değiştirmeden önce takım kanalında haber ver.',
          },
          {
            type: 'quiz',
            question: 'Bir takım arkadaşın paylaşılan bir branch\'te zaten push edilmiş commit\'lerinin üzerine `git push --force` ile yazıyor. Bunun yerine kullanması gereken daha güvenli alternatif nedir?',
            options: [
              { id: 'a', text: 'Takım onayıyla `git push --force-with-lease`' },
              { id: 'b', text: 'Daha güvenli bir alternatif yok — force push asla kullanılmamalı' },
              { id: 'c', text: '`git pull --force`' },
              { id: 'd', text: '`git commit --amend --force`' },
            ],
            correct: 'a',
            explanation: '`git push --force`, remote branch\'in üzerine koşulsuz yazar ve başkasının bu arada push ettiği commit\'leri sessizce yok eder. `git push --force-with-lease`, son fetch\'inden sonra remote ilerlemişse push\'u reddeder — görmediğin işin üzerine yazmak yerine güvenli şekilde başarısız olur. Bu yüzden gerçekten force push gerektiğinde (örn. kendi feature branch\'inde interactive rebase sonrası) varsayılan olması gereken budur, takıma haber vermekle birlikte.',
            retryQuestion: {
              question: '`git push --force-with-lease` çalıştırıyorsun ve push "stale info" hatasıyla REDDEDİLİYOR. Bu sana ne anlatır?',
              options: [
                { id: 'a', text: 'Ağ bağlantın bozuk' },
                { id: 'b', text: 'Son fetch\'inden sonra başka biri remote branch\'e push etti — force-with-lease onların işinin üzerine yazılmasını önlüyor' },
                { id: 'c', text: 'force-with-lease asla gerçekten çalışmaz, bunun yerine --force kullanmalısın' },
                { id: 'd', text: 'Yerel repository\'n bozulmuş' },
              ],
              correct: 'b',
              explanation: 'Bu, `--force-with-lease`\'in tam olarak görevini yapmasıdır: son fetch\'inden sonra remote ilerlediği için push\'u reddeder, yani henüz görmediğin başkasının commit\'leri orada duruyor. Doğru tepki `git fetch` çalıştırıp neyin değiştiğine bakmak ve tekrar force etmeden önce uzlaştırmaktır — burada düz `--force`\'a geçmek o commit\'leri sessizce yok ederdi, bu flag\'in var olma nedeni tam olarak bunu önlemektir.',
            },
          },
        ],
      },
      {
        title: '🚨 Git ve GitHub Hata Sözlüğü',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🧯',
            content: 'Git hata mesajları bir felaket bildirimi değil, yol kenarındaki tabelalar gibidir: "yanlış yoldasın" demezler, "şu anda BURADASIN ve gitmek istediğin yere buradan şöyle gidilir" derler — `rejected (non-fast-forward)` mesajı bir arıza değil, "senin geçmişin ile uzaktaki geçmiş ayrışmış" bilgisidir. Peki mesaj sorunu bu kadar açık söylüyorsa, mühendisler neden çoğu zaman panikle rastgele komut denemeye başlar? Çünkü Git’in hatası bir DURUM anlatır, çözüm ise o an nerede durduğuna bağlıdır: aynı `rejected` mesajının doğru cevabı bazen `pull --rebase`, bazen yeni bir branch açmaktır — ezberlenmiş tek bir komut değil. Java’da bir `NullPointerException`’ın satır numarasını okumadan çözmeye çalışmak ne kadar verimsizse, Git hatasını `git status` yazmadan çözmeye çalışmak da odur. QA açısından bunun bedeli somuttur: paniğe kapılıp `reset --hard` çeken bir mühendis, bir saatlik test düzeltmesini geri getirilemez biçimde silebilir. Sırayı bozma: önce ilk satırı oku, sonra `git status` ile nerede olduğunu doğrula, en sonda mümkün olan EN KÜÇÜK güvenli düzeltmeyi seç.',
          },
          gitErrorDiagnosisFilm,
          gitErrorDiagnosisSteps,
          {
            type: 'error-dictionary',
              relatedTopicId: 'git-github-errors',
            framework: 'Git & GitHub',
            errors: gitErrorEntries,
          },
          gitErrorPractice,
          {
            type: 'quiz',
            question: '`git push origin main` `! [rejected] main -> main (non-fast-forward)` hatasıyla başarısız oluyor. Kök neden ve doğru çözüm nedir?',
            options: [
              { id: 'a', text: 'Yerel Git kurulumun eski — Git\'i yeniden kur' },
              { id: 'b', text: 'Remote branch\'te sende olmayan commit\'ler var; tekrar push etmeden önce fetch + merge/rebase yap' },
              { id: 'c', text: 'Remote branch\'i silip sıfırdan push etmen gerekir' },
              { id: 'd', text: 'Repository\'nin disk alanı bitti' },
            ],
            correct: 'b',
            explanation: 'Bu, senin son fetch\'inden sonra başka birinin `main`e push etmesiyle olur — senin push\'un geçmişi ileri taşımak yerine üzerine yazardı, bu yüzden Git o commit\'leri korumak için reddeder. Çözüm `git fetch origin`, sonra `git merge origin/main` (veya rebase), conflict varsa çöz ve tekrar push et. Remote branch\'i silmek takım arkadaşının işini yok eder — burada asla doğru hamle değildir.',
            retryQuestion: {
              question: '`git fetch origin` ve `git merge origin/main` sonrası Git, `app.js`\'te bir merge conflict\'i bildiriyor. Doğru sıradaki adım nedir?',
              options: [
                { id: 'a', text: 'Conflict\'i atlamak için `git push --force` çalıştırmak' },
                { id: 'b', text: 'app.js\'i açıp conflict işaretlerini manuel çöz, sonra `git add app.js` ve `git commit` ile merge\'i tamamla, sonra push et' },
                { id: 'c', text: 'Conflict\'i ortadan kaldırmak için app.js\'i tamamen silmek' },
                { id: 'd', text: 'Conflict kaybolana kadar `git fetch origin`\'i tekrar tekrar çalıştırmak' },
              ],
              correct: 'b',
              explanation: 'Bir merge conflict, Git\'in aynı satırlardaki iki farklı değişikliği otomatik uzlaştıramadığı anlamına gelir — duraklar ve bir insan kararı bekler. Dosyayı düzenleyip doğru son içeriği seçmek, `<<<<<<<`/`=======`/`>>>>>>>` işaretlerini kaldırmak, sonra stage edip commit etmek Git\'e conflict\'in çözüldüğünü söyler, ardından (artık merge edilmiş) branch normal şekilde push edilebilir. Force push veya dosyayı silmek ya conflict\'i tehlikeli şekilde atlar ya da gerçek işi kaybettirir.',
            },
          },
        ],
      },
      {
        title: '💼 Git ve GitHub Mülakat Soruları',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🎤',
            content: 'Git mülakatında komut saymak, bir şoföre trafik levhalarını ezberden okutmaya benzer: levhaları bilmek gereklidir ama kimse bu yüzden onu yola çıkarmaz — asıl merak edilen, sıkışık bir kavşakta hangi kararı vereceğidir. Peki `git revert` ile `git reset`’in ne yaptığını zaten biliyorsan, mülakatta bunu söylemek neden yetmiyor? Çünkü soru aslında "hangisi doğru" değil, "paylaşılan bir branch’te geçmişi ezmenin ekibe maliyetini görüyor musun" sorusudur — teknik bilgi eşiktir, ayrıştırıcı olan muhakemedir. Java tarafında da fark buna benzer: `HashMap`’in nasıl çalıştığını anlatmak orta seviyedir, `equals`/`hashCode` sözleşmesi bozulduğunda production’da neyin sessizce kaybolacağını anlatmak kıdemli seviyedir. QA açısından ölçülen yetkinlik nettir: sen yalnızca kendi commit’lerinden değil, ekibin history’sinden, rollback yapılabilirliğinden ve bir regresyonun kökeninin altı ay sonra kanıtlanabilmesinden de sorumlusun. Bu yüzden her cevabı üç ayakla kur: ne yaptığın, neden o yolu seçtiğin ve yanlış giderse nasıl geri döneceğin.',
          },
          gitInterviewAnswerFilm,
          gitInterviewAnswerSteps,
          gitInterviewPractice,
          {
            type: 'interview-questions',
              relatedTopicId: 'git-github',
            topic: 'Git & GitHub',
            questions: gitInterviewQuestions,
          },
          {
            type: 'glossary-section',
            terms: glossaryTerms,
          },
        ],
      },
    ],
  },
}

fillMissingCodeTrios(gitGithubData, 'git')
