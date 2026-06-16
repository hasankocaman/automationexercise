# Prompt Kuralları — Claude Code & Codex ile Çalışırken

> Bu dosya, projeyi birden fazla AI aracıyla (Claude Code, Codex) yönetirken
> kullanıcının (Hasan) prompt yazarken uyacağı pratik kurallardır. Amaç:
> tekrarlanan çelişkileri, paralel/habersiz çalışmayı ve "kendi kendini
> geçersiz kılan not" hatalarını önlemek. Proje kurallarının kendisi için
> bu dosyaya değil `CLAUDE.md`'ye bakılır.

---

## 1. Oturum Başında

Her iki araca da şunu söyle:

> **"`.claude/NEXT_SESSION.md`'yi oku, güncel durumu özetle."**

Tek cümle, hem bağlamı yükler hem stale bilgiyle başlamayı önler. Artık
her iki araç da (`CLAUDE.md` → Claude, `AGENTS.md` → Codex) aynı yere
yönleniyor; ayrıca proje hakkında bilgi tekrarlamana gerek yok.

---

## 2. Bir Şey Bozuksa

"X açılmıyor / çalışmıyor" tek başına yeterli — araç zaten `git status`'a
bakıp kimin elinin değdiğini bulabilir. Ama biliyorsan eklemek işi
hızlandırır:

> **"X bozuk, [Codex/Claude] bunu yaptı, kontrol et."**

---

## 3. Diğer Aracın İşini Devralırken

> **"[Araç] bunu yaptı, kontrol et / doğrula / commit'e dahil et."**

Bu pattern net çalışıyor: araç kör güvenmez, diff'i inceler, build alır,
mümkünse tarayıcıda test eder, sonra devralır.

---

## 4. Commit / Push — İkisini Ayrı Söyle

| Ne istiyorsan | Ne söylemelisin |
|----------------|------------------|
| Sadece commit, push etme (varsayılan) | **"Commit et, push etme."** |
| Bekleyen tüm commit'leri gönder | **"Hepsini pushla."** |
| Hiç dokunma, sadece göster | **"Commit etme, sadece diff'i göster."** |

Bu üçü gerçekten farklı sonuç verir — hangisini istediğini net söyle.

---

## 5. Büyük / Yapısal Kararlar

Mimari değişikliği, dosya birleştirme, kural değişikliği gibi işlerde
araç zaten soru sormalı (clarifying question). Garantiye almak istersen:

> **"Önce bana sor, sonra uygula."**

---

## 6. Çelişki Şüphesi

> **"X ve Y çelişiyor mu, kontrol et."**

Bu istendiğinde dosya metnine kör güvenilmemeli — gerçek kod/git durumu
(commit'li mi, working tree'de mi, script gerçekten ne yapıyor) doğrulanır,
sadece iki markdown dosyasının metni karşılaştırılmaz.

---

## 7. Codex'e Yazarken (Claude üzerinden veya doğrudan)

Codex artık `AGENTS.md` → `CLAUDE.md` zincirini okuyor. Ek olarak şunu
eklemek riski azaltır:

> **"İş bitince `.claude/NEXT_SESSION.md`'yi güncelle. Kalıcı kural
> dosyalarına (`CLAUDE.md`, `AGENTS.md`, `codexSeo.md`) anlık durum veya
> commit hash yazma — onlar sadece `NEXT_SESSION.md`'ye yazılır."**

---

## 8. Riskli Paylaşım — Aynı Dosyada Aynı Anda Çalışmama

Aynı dosyada (örn. `TopicPage.jsx` gibi paylaşılan component) iki aracı
**aynı anda** çalıştırma. Biri bir dosyayı bitirmeden diğerine o dosyada
görev verme — çakışma riski gerçek (bir oturumda canlı gözlemlendi).

Eğer iki aracın aynı alanda çalışması gerekiyorsa, birine işi bitirttikten
ve `NEXT_SESSION.md`'ye yazdırdıktan sonra diğerine geç.

---

## 9. Kalıcı Kural — Tek Kaynak İlkesi

Bu dosyaların hangisinin ne işe yaradığını unutursan, herhangi bir araca
şunu sor:

> **"`CLAUDE.md` Bölüm 0'daki dosya haritasını özetle."**

Kısaca:
- **`CLAUDE.md`** → anayasa, kalıcı kurallar (route haritası, içerik
  kuralları, mülakat sorusu kuralı vb.)
- **`AGENTS.md`** → Codex için `CLAUDE.md`'ye pointer, kendi içeriği yok
- **`.claude/NEXT_SESSION.md`** → TEK güncel durum dosyası (ne yapıldı,
  sırada ne var, git/deploy durumu)
- **`codexSeo.md`** → SEO'nun kalıcı kural/mimari referansı, durum
  günlüğü değil
- **`promptkurallar.md`** (bu dosya) → sana (kullanıcıya) yönelik, AI
  araçlarına nasıl prompt yazacağının rehberi
