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

export const gitGithubData = {
  en: {
    hero: {
      title: '🔀 Git & GitHub',
      subtitle: 'Version Control, Collaboration, CI/CD and Pages for QA Engineers',
      intro: 'Learn Git and GitHub visually: snapshots, branches, pull requests, Actions, Pages deployment, production safety rules and hands-on command practice.',
    },
    tabs: ['🎯 Introduction', '⚙️ Installation', '⌨️ Git Basics', '🌿 Branching', '🐙 GitHub Workflow', '🚀 Actions', '🌐 Pages', '⚠️ Real Work Risks', '🚨 Error Dictionary', '💼 Interview Q&A'],
    sections: [
      {
        title: '🎯 What are Git and GitHub?',
        blocks: [
          {
            type: 'simple-box',
            emoji: '📸',
            content: 'Git is like taking labeled photos of your project while you work. If something breaks, you can look at earlier photos, compare what changed, and return to a safe point. GitHub is the shared album where your team reviews, comments, runs checks, and publishes the result.',
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
          },
        ],
      },
      {
        title: '⚙️ Installation and First Configuration',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🧰',
            content: 'Installing Git is like putting a toolbox on your desk. Before building anything, you label the toolbox with your name and email so every saved change is traceable.',
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
            type: 'warning',
            content: 'Pick one method and stick with it. HTTPS remotes look like `https://github.com/user/repo.git`, SSH remotes look like `git@github.com:user/repo.git`. If you switch later, update with `git remote set-url origin <new-url>`.',
          },
        ],
      },
      {
        title: '⌨️ Git Basics: status, add, commit, diff, log',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🧺',
            content: 'Staging is like choosing which items go into a delivery box. You may have ten changed files on the table, but only the staged files go into the next commit.',
          },
          {
            type: 'simulation',
            scenario: 'git-three-areas',
            icon: '🔀',
            color: '#059669',
            title: { en: 'Step 4: See Working Tree, Staging Area and Commit', tr: 'Adım 4: Working Tree, Staging Area ve Commit’i Gör' },
            description: { en: 'Now that Git makes sense, watch how one change moves through the three local Git areas before it is shared.', tr: 'Git’in fikri oturduktan sonra tek değişikliğin paylaşılmadan önce üç local Git alanından nasıl geçtiğini izle.' },
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
            type: 'heading',
            text: '.gitignore: keep generated files out of Git',
          },
          {
            type: 'code',
            label: 'Example .gitignore for a QA automation project',
            language: 'bash',
            code: `# Dependencies\nnode_modules/\n\n# Build output\ndist/\ntarget/\n\n# Test reports and artifacts\nplaywright-report/\ntest-results/\ncypress/screenshots/\ncypress/videos/\nallure-results/\n\n# Environment and secrets\n.env\n.env.local\n\n# IDE settings\n.idea/\n.vscode/\n*.iml\n\n# OS files\n.DS_Store\nThumbs.db\n\n# Logs\n*.log\nnpm-debug.log*`,
          },
          {
            type: 'warning',
            content: 'Once a file is committed, adding it to `.gitignore` does not remove it from history. Use `git rm --cached filename` to stop tracking it, then commit. The file stays on disk but Git stops watching it.',
          },
        ],
      },
      {
        title: '🌿 Branching, Merge, Rebase and Conflicts',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🌱',
            content: 'A branch is a safe side road. First watch the road split visually, then watch the roads merge again, then practice what happens when two people edit the same place.',
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
            label: 'First remote publish: choose one method once',
            language: 'bash',
            code: `git switch hasan                                      # Move to your local branch

# Method 1 - preferred when origin exists:
git push -u origin hasan                              # Create remote branch and set upstream

# Method 2 - alternative with direct repo URL:
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
            label: 'Daily branch workflow after seeing the animation',
            language: 'bash',
            code: `git fetch origin                         # Refresh remote branches
git switch main                          # Move to local main
git pull --ff-only origin main            # Update main without surprise merge commits
git switch -c feature/checkout-tests      # Create a feature branch

# edit tests/checkout.spec.js             # Make focused QA changes
git add tests/checkout.spec.js            # Stage only the intended file
git commit -m "test: cover checkout tax"  # Commit a small snapshot
git push -u origin feature/checkout-tests # Push branch and set upstream`,
          },
          {
            type: 'code',
            label: 'Safe switch + pull + local merge flow',
            language: 'bash',
            code: `git status                              # Check uncommitted work before switching
git add tests/login.spec.js               # Stage your focused change
git commit -m "test: cover login errors"  # Save your branch state first

git switch main                           # Move to the shared base branch
git pull --ff-only origin main             # Get remote changes safely

git switch feature/hasan                  # Return to your own branch
git merge main                            # Merge fresh main into your branch
# If a conflict appears, resolve it locally, run tests, git add, then finish the merge`,
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
          },
        ],
      },
      {
        title: '🐙 GitHub Workflow: Repository, Remote, Pull Request, Review',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🏢',
            content: 'GitHub is like the team office for your code. Your branch is your desk, the Pull Request is the meeting table, and main is the approved cabinet.',
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
        ],
      },
      {
        title: '🚀 GitHub Actions for QA: CI, Reports, Matrix and Secrets',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🏭',
            content: 'GitHub Actions is like a factory line. Every time code arrives, machines install dependencies, run tests, build the app and publish reports without asking your laptop.',
          },
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
          {
            type: 'warning',
            content: 'Never print secrets in workflow logs. Use repository or environment secrets, keep permissions minimal, and remember that secrets are restricted for untrusted fork pull requests.',
          },
        ],
      },
      {
        title: '🌐 GitHub Pages: Static Deploy, Custom Domain and SPA Fallback',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🏡',
            content: 'GitHub Pages is like giving your built website a public address. It can serve ready-made files, but it will not run a backend kitchen behind the door.',
          },
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
          {
            type: 'warning',
            content: 'Anything inside a static Pages build is public. Do not put API keys, tokens or private test data into Vite/React client code. Environment variables bundled into client JavaScript are visible to users.',
          },
        ],
      },
      {
        title: '⚠️ Real Work Risks and Team Safety Rules',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🚧',
            content: 'Some Git commands are like heavy machinery. They are useful in the right hands, but you check the area, warn the team and keep a backup before touching them.',
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
        ],
      },
      {
        title: '🚨 Git and GitHub Error Dictionary',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🧯',
            content: 'Git errors are usually signposts, not disasters. Read the first line, check where you are, then choose the smallest safe fix.',
          },
          {
            type: 'error-dictionary',
            framework: 'Git & GitHub',
            errors: gitErrorEntries,
          },
        ],
      },
      {
        title: '💼 Git and GitHub Interview Questions',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🎤',
            content: 'A good Git interview answer is not just a command. It explains team safety, history, rollback, review and how you avoid breaking other people’s work.',
          },
          {
            type: 'interview-questions',
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
    tabs: ['🎯 Giriş', '⚙️ Kurulum', '⌨️ Git Temelleri', '🌿 Branching', '🐙 GitHub Akışı', '🚀 Actions', '🌐 Pages', '⚠️ İş Riskleri', '🚨 Hata Sözlüğü', '💼 Mülakat S&C'],
    sections: [
      {
        title: '🎯 Git ve GitHub nedir?',
        blocks: [
          {
            type: 'simple-box',
            emoji: '📸',
            content: 'Git, çalışırken projenin etiketli fotoğraflarını çekmek gibidir. Bir şey bozulursa eski fotoğrafa bakar, ne değişmiş görür ve güvenli noktaya dönebilirsin. GitHub ise takımın bu fotoğrafları incelediği, yorumladığı, test koşturduğu ve yayınladığı ortak albümdür.',
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
          },
        ],
      },
      {
        title: '⚙️ Kurulum ve İlk Ayarlar',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🧰',
            content: 'Git kurmak masaya bir araç çantası koymak gibidir. Bir şey inşa etmeden önce çantaya adını ve emailini yazarsın; böylece her kaydedilen değişikliğin kimden geldiği izlenir.',
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
            type: 'warning',
            content: 'Bir yöntem seç ve ona bağlı kal. HTTPS remote\'ları `https://github.com/user/repo.git`, SSH remote\'ları `git@github.com:user/repo.git` şeklindedir. Sonradan değiştirirsen `git remote set-url origin <yeni-url>` kullan.',
          },
        ],
      },
      {
        title: '⌨️ Git Temelleri: status, add, commit, diff, log',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🧺',
            content: 'Staging, teslimat kutusuna hangi eşyaların gireceğini seçmek gibidir. Masada on değişen dosya olabilir ama bir sonraki commit kutusuna sadece staging’e koydukların girer.',
          },
          {
            type: 'simulation',
            scenario: 'git-three-areas',
            icon: '🔀',
            color: '#059669',
            title: { en: 'Step 4: See Working Tree, Staging Area and Commit', tr: 'Adım 4: Working Tree, Staging Area ve Commit’i Gör' },
            description: { en: 'Now that Git makes sense, watch how one change moves through the three local Git areas before it is shared.', tr: 'Git’in fikri oturduktan sonra tek değişikliğin paylaşılmadan önce üç local Git alanından nasıl geçtiğini izle.' },
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
            type: 'heading',
            text: '.gitignore: üretilen dosyaları Git dışında tut',
          },
          {
            type: 'code',
            label: 'QA automation projesi için örnek .gitignore',
            language: 'bash',
            code: `# Bağımlılıklar\nnode_modules/\n\n# Build çıktısı\ndist/\ntarget/\n\n# Test rapor ve artifact\nplaywright-report/\ntest-results/\ncypress/screenshots/\ncypress/videos/\nallure-results/\n\n# Ortam ve secret\n.env\n.env.local\n\n# IDE ayarları\n.idea/\n.vscode/\n*.iml\n\n# OS dosyaları\n.DS_Store\nThumbs.db\n\n# Loglar\n*.log\nnpm-debug.log*`,
          },
          {
            type: 'warning',
            content: 'Bir dosya commit edildikten sonra `.gitignore`\'a eklemek onu history\'den silmez. `git rm --cached dosyaadi` ile takibi durdur, sonra commit et. Dosya diskte kalır ama Git artık izlemez.',
          },
        ],
      },
      {
        title: '🌿 Branch, Merge, Rebase ve Conflict',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🌱',
            content: 'Branch güvenli yan yol gibidir. Önce yolun main’den nasıl ayrıldığını gör, sonra tekrar nasıl birleştiğini izle, en sonda iki kişi aynı yeri değiştirince conflict’i adım adım çöz.',
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
            label: 'Remote branch’i ilk kez açma: bir yöntemi seç',
            language: 'bash',
            code: `git switch hasan                                      # Local branch'ine geç

# 1. yöntem - origin zaten doğru repo ise:
git push -u origin hasan                              # Remote branch açılır ve upstream kurulur

# 2. yöntem - direkt repo URL'iyle alternatif:
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
            label: 'Animasyondan sonra günlük branch workflow',
            language: 'bash',
            code: `git fetch origin                         # Remote branch bilgisini güncelle
git switch main                          # Local main'e geç
git pull --ff-only origin main            # Sürpriz merge commit olmadan main'i güncelle
git switch -c feature/checkout-tests      # Feature branch oluştur

# tests/checkout.spec.js düzenlenir        # Odaklı QA değişikliğini yap
git add tests/checkout.spec.js            # Sadece hedef dosyayı stage et
git commit -m "test: cover checkout tax"  # Küçük snapshot oluştur
git push -u origin feature/checkout-tests # Branch'i gönder ve upstream ayarla`,
          },
          {
            type: 'code',
            label: 'Güvenli switch + pull + local merge akışı',
            language: 'bash',
            code: `git status                              # Branch değiştirmeden önce kaydedilmemiş iş var mı bak
git add tests/login.spec.js               # Odaklı değişikliğini stage et
git commit -m "test: cover login errors"  # Önce kendi branch state'ini kaydet

git switch main                           # Ortak ana branch'e geç
git pull --ff-only origin main             # Remote değişiklikleri güvenli çek

git switch feature/hasan                  # Kendi branch'ine geri dön
git merge main                            # Güncel main'i kendi branch'ine al
# Conflict çıkarsa localde çöz, test çalıştır, git add yap ve merge'i tamamla`,
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
          },
        ],
      },
      {
        title: '🐙 GitHub Akışı: Repository, Remote, Pull Request, Review',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🏢',
            content: 'GitHub kodun takım ofisi gibidir. Branch senin masan, Pull Request toplantı masası, main ise onaylanmış işlerin dolabıdır.',
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
        ],
      },
      {
        title: '🚀 QA için GitHub Actions: CI, Report, Matrix ve Secrets',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🏭',
            content: 'GitHub Actions fabrika hattı gibidir. Kod geldiği anda makineler dependency kurar, testleri çalıştırır, build alır ve raporları yayınlar; senin laptopına güvenmez.',
          },
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
          {
            type: 'warning',
            content: 'Secret değerlerini workflow loglarına asla yazdırma. Repository/environment secrets kullan, permissions değerini minimum tut ve untrusted fork pull request’lerinde secret erişiminin kısıtlı olduğunu unutma.',
          },
        ],
      },
      {
        title: '🌐 GitHub Pages: Static Deploy, Custom Domain ve SPA Fallback',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🏡',
            content: 'GitHub Pages, build edilmiş web sitene halka açık bir adres vermek gibidir. Hazır dosyaları servis eder ama kapının arkasında backend mutfağı çalıştırmaz.',
          },
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
          {
            type: 'warning',
            content: 'Static Pages build içindeki her şey public’tir. API key, token veya özel test datasını Vite/React client koduna koyma. Client JavaScript içine giren environment variable kullanıcı tarafından görülebilir.',
          },
        ],
      },
      {
        title: '⚠️ Gerçek İş Riskleri ve Takım Güvenlik Kuralları',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🚧',
            content: 'Bazı Git komutları ağır iş makinesi gibidir. Doğru elde çok işe yarar ama çalıştırmadan önce etrafı kontrol eder, takımı uyarır ve yedek alırsın.',
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
        ],
      },
      {
        title: '🚨 Git ve GitHub Hata Sözlüğü',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🧯',
            content: 'Git hataları çoğu zaman felaket değil, yol tabelasıdır. İlk satırı oku, nerede olduğunu kontrol et, sonra en küçük güvenli düzeltmeyi seç.',
          },
          {
            type: 'error-dictionary',
            framework: 'Git & GitHub',
            errors: gitErrorEntries,
          },
        ],
      },
      {
        title: '💼 Git ve GitHub Mülakat Soruları',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🎤',
            content: 'İyi bir Git mülakat cevabı sadece komut söylemez. Takım güvenliğini, history’yi, rollback’i, review’u ve başkasının işini bozmamayı da açıklar.',
          },
          {
            type: 'interview-questions',
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
