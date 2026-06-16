# AGENTS.md — QA Learning Platform

> Bu projenin **tüm kuralları `CLAUDE.md`** dosyasındadır (proje anayasası).
> Lütfen önce `CLAUDE.md`'yi oku. Bu dosya yalnızca doğru yere yönlendirmek
> için tutulan kısa bir pointer'dır — içerik burada güncellenmez, çift
> bakım yapılmaz. `CLAUDE.md` değiştiğinde bu dosyaya hiçbir şey
> kopyalanmaz; tek kaynak `CLAUDE.md`'dir.

## Hızlı Bakış

- **Proje:** LearnQA.dev — QA mühendisleri için React + Vite öğrenme platformu.
- **Build:** `npm run build` (SEO kontrol zinciri dahil: check-seo → generate-seo-files → vite build → generate-static-routes → check-dist-seo).
- **Kurallar (route haritası, içerik kuralları, mülakat sorusu kuralı — min 50 soru / 15+20+15, SEO kuralları, kodlama kuralları, mobile kuralları, dosya haritası):** hepsi `CLAUDE.md`'de.
- **Güncel proje durumu** (son yapılanlar, sıradaki görevler, git/deploy durumu): `.claude/NEXT_SESSION.md`.
- **SEO kuralları ve mimarisi** (route metadata, static shell üretimi, GSC checklist, uzun vadeli SEO stratejisi): `codexSeo.md`.
- **Yayın / Google Search Console adımları:** `DEPLOY.md`.

Bu dosyayı okuduktan sonra başka bir yere bakmana gerek yok — yukarıdaki
dört dosya projenin tüm bilgisini kapsar.
