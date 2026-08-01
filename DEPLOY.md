# Deploy Adımları - learnqa.dev

## Hosting: GitHub Pages + Porkbun Custom Domain

`learnqa.dev` production yayını GitHub Pages üzerinden yapılır. Netlify hesabında kredi bittiğinde production deploy durduğu için gerçek build yayını GitHub Actions + GitHub Pages akışına taşındı.

---

## 1. Ön Koşullar

- GitHub repo: `hasankocaman/automationexercise`
- Domain: `learnqa.dev` - Porkbun'dan satın alındı
- Build komutu: `npm run build`
- Publish klasörü: `dist`
- Custom domain dosyası: `public/CNAME`

---

## 2. Proje Hazırlığı

### `vite.config.js`

Custom domain root'tan yayın yaptığı için base path `/` olmalıdır.

```js
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: { port: 5173, open: true }
})
```

### GitHub Pages workflow

`.github/workflows/deploy.yml` gerçek siteyi build eder:

1. Repo checkout
2. Node.js 20 setup
3. `npm ci`
4. `npm run build`
5. `dist/index.html` dosyasını `dist/404.html` olarak kopyalar
6. `dist` artifact'ini GitHub Pages'e deploy eder

`workflow_dispatch` açık olduğu için GitHub Actions ekranından manuel deploy da tetiklenebilir.

### Custom domain

`public/CNAME` dosyası şu içeriği taşır:

```txt
learnqa.dev
```

Vite build sırasında bu dosya `dist/CNAME` olarak kopyalanır ve GitHub Pages custom domain ayarını korur.

---

## 3. GitHub Repo Ayarları

GitHub'da:

1. Repo -> **Settings** -> **Pages**
2. **Source**: GitHub Actions
3. **Custom domain**: `learnqa.dev`
4. DNS doğrulandıktan sonra **Enforce HTTPS** aktif edilmeli

---

## 4. DNS Ayarları

Domain'in authoritative DNS'i nerede yönetiliyorsa kayıtlar orada girilmelidir.

> NOT: Şu anda `learnqa.dev` için authoritative nameserver'lar Netlify/NS1 (`dns1.p01.nsone.net`, `dns2.p01.nsone.net`, `dns3.p01.nsone.net`, `dns4.p01.nsone.net`) şeklinde gözüküyor. Bu durumda GitHub Actions ve Pages deploy doğru olsa bile domain hâlâ Netlify üzerinden servis ediliyor.
>
> Bu durumda iki seçenek vardır:
> 1. Netlify DNS paneline girin ve `learnqa.dev` için GitHub Pages A kayıtlarını ekleyin.
> 2. Nameserver'ları Porkbun'a geri verin ve Porkbun DNS üzerinde GitHub Pages A kayıtlarını tanımlayın.

### Apex domain için A kayıtları

`learnqa.dev` için şu dört A kaydı olmalı:

```txt
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

### www için CNAME

`www.learnqa.dev` kullanılacaksa:

```txt
www CNAME hasankocaman.github.io
```

GitHub Pages tarafında sadece apex domain (`learnqa.dev`) kullanılıyorsa www zorunlu değildir.

### Eski Netlify kayıtları

Netlify'a ait apex, ALIAS, ANAME veya CNAME kayıtları GitHub Pages kayıtlarıyla çakışmamalıdır. DNS'te aynı host için çakışan kayıtlar varsa temizlenmelidir.

> Eğer nameserver'lar Netlify DNS üzerinde kalacaksa, `learnqa.dev` için mevcut Netlify DNS kaydını GitHub Pages A kayıtları ile değiştirin. `learnqa.dev` için Netlify IP'leri (`35.157.26.135`, `63.176.8.218`) yerine GitHub Pages IP'lerini kullanın.

---

## 5. Sonraki Deploy'lar

```bash
git add .
git commit -m "feat: ..."
git push origin main
```

`main` branch'e push yapılınca GitHub Actions otomatik olarak production deploy başlatır.

Manuel deploy için:

1. GitHub -> Actions
2. **Deploy LearnQA.dev to GitHub Pages**
3. **Run workflow**

---

## 6. Sorun Giderme

| Hata | Sebep | Çözüm |
|------|-------|-------|
| Canlı site eski kalıyor | GitHub Actions deploy tamamlanmamış veya DNS hâlâ Netlify'a bakıyor | Actions deploy sonucunu ve DNS A kayıtlarını kontrol et |
| `/java` açılıyor ama bazı direkt URL'ler 404 | Route shell veya fallback eksik | `npm run build` çıktısında static route shell üretimini kontrol et; workflow `dist/404.html` üretir |
| `Get Pages site failed` | Repo Pages ayarı GitHub Actions değil veya Pages kapalı | Settings -> Pages -> Source: GitHub Actions |
| `CNAME already taken` | Domain başka Pages sitesine bağlı | Eski Pages custom domain ayarını kaldır veya GitHub domain verification yap |
| HTTPS aktifleşmiyor | DNS yayılmamış veya çakışan kayıt var | DNS kayıtlarını düzelt, 30-60 dakika bekle, sonra Enforce HTTPS dene |
| Eski `/comparison.html` görünür | Legacy HTML React route'u gölgeliyor | `public/comparison.html` hafif redirect dosyası olmalı |

---

## 7. SEO Yayın Kontrol Listesi

Her production deploy'dan sonra:

1. `https://learnqa.dev/robots.txt` açılıyor mu?
2. `https://learnqa.dev/sitemap.xml` içinde tüm ana sayfalar var mı?
3. Temiz URL'ler doğrudan açılıyor mu?
   - `https://learnqa.dev/selenium`
   - `https://learnqa.dev/playwright`
   - `https://learnqa.dev/python`
   - `https://learnqa.dev/sql`
   - `https://learnqa.dev/java`
4. Eski hash URL kullanan biri `https://learnqa.dev/#/selenium` açarsa otomatik `https://learnqa.dev/selenium` adresine taşınıyor mu?
5. Legacy `https://learnqa.dev/comparison.html` yeni `/test-frameworks` route'una gidiyor mu?
6. Sayfa kaynağında route'a özel `title`, `description`, `canonical`, `WebPage` ve `BreadcrumbList` var mı?

Google Search Console'da bir kez yapılacaklar:

1. Domain property olarak `learnqa.dev` ekle.
2. DNS doğrulamasını tamamla.
3. `Sitemaps` ekranında `https://learnqa.dev/sitemap.xml` gönder.
4. `URL Inspection` ile ana sayfa ve en önemli sayfaları tek tek kontrol et.
5. Her kritik URL için `Request indexing` kullan.

SEO build koruması:

```bash
npm run build
```

Bu komut şunları otomatik kontrol eder:

- React route'ları ile SEO metadata listesi eşleşiyor mu?
- `robots.txt` ve `sitemap.xml` üretiliyor mu?
- Her route için statik HTML shell üretiliyor mu?
- Her üretilen HTML'de `title`, `description`, `canonical`, fallback metin ve structured data var mı?

## 8. Çerezsiz Analytics (Plausible) Kurulumu

`index.html`'e `data-domain="learnqa.dev"` ile bir Plausible script etiketi
eklendi (`Documents/seo-phase-2-plan.md` §7.3) — sitede daha önce HİÇ web
analytics yoktu. Google Analytics bilinçli olarak KULLANILMADI (çerez rızası
banner'ı gerektirir, KVKK/GDPR yükü getirir); Plausible çerezsizdir.

Script hesap kurulmadan da sayfayı BOZMAZ — sadece hiçbir yere veri göndermez
(`src/lib/analytics.js`'teki `trackEvent` de `window.plausible` yoksa
sessizce no-op olur). Aktifleştirmek için:

1. https://plausible.io/ üzerinden hesap aç (veya self-hosted Plausible/Umami
   kur — bu durumda `index.html`'deki `src`/`data-domain` değerlerini
   kendi kurulumuna göre güncelle).
2. Site olarak `learnqa.dev` ekle (domain `index.html`'deki `data-domain`
   ile BİREBİR eşleşmeli, aksi halde veriler eşleşmez).
3. Deploy sonrası Plausible dashboard'unda trafiğin gelmeye başladığını
   doğrula (birkaç dakika gecikebilir).

Şu an 4 özel olay gönderiliyor (`src/lib/analytics.js` → `trackEvent`):
`lesson_completed` (route ile), `mission_completed` (missionId ile),
`sprint_closed` (sprintId ile), `language_changed` (hedef dil ile — SEO
Faz 2'nin `/en` prefix'inin gerçekten kullanılıp kullanılmadığını ölçmek
için kritik). Hiçbir olayda e-posta, kullanıcı id veya serbest metin cevap
GÖNDERİLMEZ.

---

## 9. Geri Dönüşü Pahalı Değişiklikler — YAYIN ÖNCESİ Zorunlu Manuel Doğrulama

> **Bu bölüm neden var:** Bir yazılım hatasını geri almak bir `git revert`
> kadar ucuzdur. Ama arama motoruna verilen bir sinyali geri almak öyle
> DEĞİLDİR: Google 90 URL'i indeksledikten, hreflang çiftlerini öğrendikten
> ve yapılandırılmış veriyi önbelleğe aldıktan sonra yapıdan dönmek haftalar
> sürer, biriken otoriteyi dağıtır ve bazı durumlarda manuel işlem
> (manual action) riski taşır. Aşağıdaki kontroller **deploy'dan ÖNCE**,
> `npm run preview` üzerinde yapılır — yayına çıktıktan sonra yapılan aynı
> kontrol "tespit" olur, "önleme" değil.
>
> **Otomatik testler bu bölümün yerini TUTMAZ.** E2E paketi "sayfa render
> oldu, şema geçerli JSON, sitemap sayısı doğru" der. Buradaki sorular ise
> "Google bu sayfayı indekslemeli mi, bu metin kullanıcıya GERÇEKTEN görünüyor
> mu, bu başlık arama sonucunda ne gibi görünüyor" — bunlar makineyle değil
> gözle ve politika bilgisiyle cevaplanır.

### 9.0. Kurulum

```bash
npm run build && npm run preview      # http://localhost:4173 — gerçek dist çıktısı
```

Tüm adımlar bu sunucuya karşı yapılır. `npm run dev` KULLANMA: dev sunucusu
statik shell'leri servis etmez, yani crawler'ın gördüğü şeyi göremezsin.

---

### 9.1. A — Dil-ayrık URL yapısı (`/en`) · **en pahalı değişiklik** · ~10 dk

**Neden geri dönüşü pahalı:** Sitenin tüm adres şeması değişti (44 → 90 URL).
Google bunları indeksledikten sonra yapıdan dönersen 45 URL toplu 404'e düşer,
hreflang çiftleri kırılır ve iki dilin biriktirdiği otorite dağılır. Toparlanma
aylar sürer.

**A1 — Her iki dil de gerçekten açılıyor mu (tek sayfa değil, temsili küme):**

Şu 8 URL'i tek tek aç ve sayfanın DİLİNE bak (menü, başlık, gövde metni):

| URL | Beklenen dil |
|---|---|
| `localhost:4173/` | Türkçe |
| `localhost:4173/en` | İngilizce |
| `localhost:4173/selenium` | Türkçe |
| `localhost:4173/en/selenium` | İngilizce |
| `localhost:4173/git-github` | Türkçe |
| `localhost:4173/en/git-github` | İngilizce |
| `localhost:4173/portfolio` | Türkçe |
| `localhost:4173/en/portfolio` | İngilizce |

❌ **Yayını durdur:** herhangi biri 404 veriyorsa ya da yanlış dilde açılıyorsa.

**A2 — Prefix gezinti sırasında DÜŞMÜYOR mu (en sık kırılan yer):**

`/en/selenium`'dan başla ve şunların HEPSİNİ tıkla; her adımdan sonra adres
çubuğunda `/en` önekinin durduğunu doğrula:

1. Sağ alttaki 🏠 ana sayfa butonu → `/en` (`/` DEĞİL)
2. Ana sayfadan herhangi bir ders kartı → `/en/<ders>`
3. Ana sayfadaki "QA Sprint Simülatörü" kartı → `/en/sprint`
4. Ana sayfadaki "QA Portfolyom" kartı → `/en/portfolio`
5. `/en/qa-mentor` → mentor panelindeki bir öneri linki → `/en/<ders>`
6. Ders sayfasındaki "haritanda neredesin" breadcrumb'ı → `/en/qa-mentor`
7. Portfolyodaki bir görev kartının "Derse git →" linki → `/en/<ders>`

❌ **Yayını durdur:** bir tıklamada bile `/en` düşüyorsa. Bu, İngilizce
oturumdaki kullanıcının sessizce Türkçe sayfaya atılması demektir ve Google
için de karışık sinyaldir.

**A3 — Dil düğmesi URL'i çift yönlü değiştiriyor mu:**

- `/selenium`'da `ENG`'e bas → adres `/en/selenium` olmalı (sadece içerik
  değil **adres çubuğu** da değişmeli).
- Oradan `TR`'ye bas → `/selenium`'a dönmeli.
- **Derin yolda dene:** `/en/git-github` → `TR` → `/git-github` (kök sayfaya
  düşmemeli, aynı konuda kalmalı).

**A4 — URL dilin TEK otoritesi mi (localStorage ezmemeli):**

1. `/selenium` aç (Türkçe), DevTools → Application → Local Storage →
   `language` değerinin `tr` olduğunu gör.
2. Adres çubuğuna elle `/en/selenium` yaz, Enter.
3. Sayfa **İngilizce** açılmalı. Türkçe açılıyorsa localStorage URL'i eziyordur.

**A5 — Eski URL'ler hâlâ çalışıyor mu (kırık bağlantı bırakma):**

- `localhost:4173/#/selenium` → `/selenium`'a taşınmalı.
- `localhost:4173/comparison.html` → `/test-frameworks`'e gitmeli.

**A6 — Crawler'ın gördüğü gövde doğru dilde mi:**

```bash
curl -s localhost:4173/selenium    | grep -o '<title>[^<]*' | head -1   # Türkçe olmalı
curl -s localhost:4173/en/selenium | grep -o '<title>[^<]*' | head -1   # İngilizce olmalı
curl -s localhost:4173/selenium    | grep -o '<html lang="[^"]*"'       # lang="tr"
curl -s localhost:4173/en/selenium | grep -o '<html lang="[^"]*"'       # lang="en"
```

**A7 — hreflang üçlüsü tutarlı mı:**

```bash
curl -s localhost:4173/selenium | grep -o 'hreflang="[^"]*" href="[^"]*"'
```

`tr`, `en` ve `x-default` üçü de olmalı; `href` değerleri **mutlak** ve
`https://learnqa.dev/...` biçiminde olmalı (localhost DEĞİL). EN kopyada da
aynı üçlü çıkmalı ve **birbirini işaret etmeli** (TR sayfa EN'i, EN sayfa TR'yi).

**A8 — Bilinmeyen `/en` yolu düzgün düşüyor mu:**

`localhost:4173/en/olmayan-sayfa` aç → uygulamanın 404/fallback davranışı
çalışmalı, boş beyaz ekran veya ham sunucu hatası OLMAMALI.

---

### 9.2. B — Sitemap: Google'a hangi URL'leri öğrettiğin · ~5 dk

**Neden geri dönüşü pahalı:** Sitemap, "bunları indeksle" demektir. Yanlış bir
URL'i indeksten çıkarmak, eklemekten kat kat yavaştır.

**B1 — Sayı ve bütünlük:**

```bash
curl -s localhost:4173/sitemap.xml | grep -c "<url>"        # 90 olmalı
curl -s localhost:4173/sitemap.xml | grep -c "hreflang"     # her girdide 2 → 180
curl -s localhost:4173/robots.txt                            # sitemap satırı olmalı
```

**B2 — 🔴 İNDEKSLENMEMESİ GEREKEN URL'LER (yayın öncesi karar gerektirir):**

```bash
curl -s localhost:4173/sitemap.xml | grep -E "backend|security|qa-assistant|login|auth/callback"
```

Bu komut **şu an çıktı veriyor** — yani sitemap şunları Google'a "indeksle"
diye sunuyor:

| URL | Sorun |
|---|---|
| `/backend`, `/security` | `RequireAdmin` ile korunuyor — normal ziyaretçi içerik göremez. Google bunları "thin content" / soft 404 olarak değerlendirebilir. |
| `/qa-assistant` | `ProtectedRoute` — sadece üye. Aynı sorun. |
| `/login` | İşlevsel sayfa, arama sonucunda değeri yok. |
| `/auth/callback` | OAuth dönüş adresi. **Bir sitemap'te bulunmaması gerekir**; indekslenirse kullanıcı arama sonucundan tıklayıp bozuk bir OAuth akışına düşer. |

**Karar:** Bunları sitemap'ten çıkarmak (ör. `seo.js` girdilerine `noindex`
benzeri bir bayrak ekleyip `generate-seo-files.mjs`'te filtrelemek) **deploy
ÖNCESİNDE** yapılmalıdır. Yayına çıkıp indekslendikten sonra çıkarmak
`noindex` + yeniden tarama beklemek demektir.

**B3 — Dinamik route sızmamış mı:**

```bash
curl -s localhost:4173/sitemap.xml | grep "verify-certificate"   # ÇIKTI OLMAMALI
```

`/verify-certificate/:id` parametrik bir route'tur; sitemap'e girmemelidir.

---

### 9.3. C — Zengin sonuç şeması (JSON-LD) · ~8 dk

**Neden geri dönüşü pahalı:** Yapılandırılmış veri politikasını ihlal eden bir
site, zengin sonuç ayrıcalığını kaybeder; ağır durumlarda "Structured data
manual action" alır ve düzeltme + yeniden değerlendirme talebi haftalar sürer.

**C1 — 🔴 EN KRİTİK KONTROL: FAQ içeriği kullanıcıya GÖRÜNÜYOR mu?**

Google'ın FAQPage politikası nettir: *soru ve cevabın tam metni, sayfanın
kendisinde kullanıcıya görünür olmalıdır.* Yalnızca şemada bulunup ekranda
görünmeyen içerik politika ihlalidir.

Kontrol:

```bash
# 1) Şemadaki ilk sorunun metnini al
curl -s localhost:4173/selenium | python3 -c "
import sys,re,json
h=sys.stdin.read()
for b in re.findall(r'application/ld\+json[^>]*>(.*?)</script>',h,re.S):
    d=json.loads(b); items=d if isinstance(d,list) else [d]
    for x in items:
        if x.get('@type')=='FAQPage':
            q=x['mainEntity'][0]['name']; print('SORU:',q[:70])
            body=re.sub(r'<script.*?</script>','',h,flags=re.S)
            print('GOVDEDE GORUNUYOR MU:', q[:40] in body)
"
```

**Şu an bu kontrol `GOVDEDE GORUNUYOR MU: False` veriyor.** İki ayrı katmanda
sorun var:

1. **Statik shell'de** soru metni yalnızca JSON-LD içinde; görünür gövdede yok.
2. **Uygulamada** mülakat soruları %60 quiz barajının ARKASINDA — kullanıcı
   quizleri geçmeden o metni zaten göremiyor.

Yani crawler'ın gördüğü içerikle kullanıcının gördüğü içerik ayrışıyor; bu,
politika açısından en riskli kalıptır.

**Karar seçenekleri (deploy öncesi):**
- **(a) En güvenlisi:** FAQPage şemasını geçici olarak KALDIR, gating/görünürlük
  çözülünce geri ekle. Course şeması etkilenmez.
- **(b)** Şemaya giren soruları, statik shell'in görünür gövdesine de bas VE
  uygulamada o soruları gate'in ÖNÜNE al (ilk N soru herkese açık).
- **(c)** Riski bilerek kabul et — ama bu, zengin sonuç kaybını ve manuel işlem
  ihtimalini göze almak demektir. Tavsiye edilmez.

**C2 — Resmî doğrulayıcıdan geçir:**

`curl -s localhost:4173/selenium` çıktısını kopyala →
https://search.google.com/test/rich-results → "Code" sekmesine yapıştır.
Aynısını `/en/selenium` için tekrarla. **Hem TR hem EN** kopyada hata/uyarı
olmamalı.

**C3 — Course şeması doğru mu:**

```bash
curl -s localhost:4173/selenium | grep -o '"@type": "Course"' | head -1
```

Rich Results Test çıktısında `name` ve `provider` alanlarının sayfanın gerçek
konusunu yansıttığını gözle doğrula (uydurma/şişirilmiş açıklama olmamalı).

**C4 — Dil karışması yok mu:**

`/en/selenium`'un şemasında Türkçe cümle, `/selenium`'unkinde İngilizce
anlatım OLMAMALI. (Otomatik test bunu tarıyor ama şemaya yeni alan eklenirse
kapsam dışı kalabilir — gözle bir kez doğrula.)

---

### 9.4. D — Arama sonucunda görünen metinler (TR metadata) · ~6 dk

**Neden geri dönüşü pahalı:** Başlık/açıklama değiştikçe o URL'in birikmiş
tıklama geçmişi (CTR sinyali) sıfırlanır. Sık değiştirmek zararlıdır; bir
kerede doğru yapmak gerekir.

**D1 — 🔴 Mükerrer BAŞLIK kontrolü (otomatik denetimde YOK):**

`check-seo.mjs` mükerrer **description** kontrolü yapar ama **title** kontrolü
YAPMAZ. Elle bak:

```bash
node -e "
const {ROUTE_SEO}=await import('./src/utils/seo.js');
for (const lang of ['en','tr']) {
  const seen=new Map();
  for (const r of ROUTE_SEO) {
    const t=(lang==='tr'? r.tr?.title : r.title)||'';
    if (seen.has(t)) console.log(lang.toUpperCase(),'MUKERRER:',t,'→',seen.get(t),'ve',r.path);
    else seen.set(t,r.path);
  }
}
" --input-type=module
```

Çıktı boş olmalı (yalnızca `kontrol bitti` satırı). Mükerrer başlık, iki
sayfanın arama sonucunda birbirini yemesi demektir.

> **Şu anki durum:** bu kontrol GEÇİYOR — mükerrer başlık yok. Bulgu
> "duplicate var" değil, **"otomatik bir bekçi yok"**: yeni bir route
> eklendiğinde mükerrer başlık build'i kırmaz, sessizce yayına çıkar. Bu
> yüzden her yeni route sonrası bu komut elle koşulmalı.

**D2 — SERP'te nasıl görünecek (gözle):**

En yüksek trafikli 6 sayfanın TR başlık/açıklamasını
https://www.highervisibility.com/seo/tools/serp-snippet-optimizer/ gibi bir
önizleyiciye yapıştır: `/selenium`, `/playwright`, `/python`, `/sql`,
`/docker`, `/what-is-testing`.

Bakılacaklar:
- Başlık ~60 karakterde kesiliyor mu? Kesiliyorsa **marka son ekinden önceki**
  kısım tek başına anlamlı olmalı.
- Açıklama gerçekten sayfayı anlatıyor mu, yoksa anahtar kelime dolgusu mu?
- Türkçe metin **makine çevirisi gibi** duruyor mu? (SEO Faz 2'nin S4 adımı
  tam olarak bunu düzeltmek içindi — gözle teyit et.)

**D3 — Canonical kendini gösteriyor mu:**

```bash
curl -s localhost:4173/selenium    | grep -o 'rel="canonical" href="[^"]*"'   # .../selenium
curl -s localhost:4173/en/selenium | grep -o 'rel="canonical" href="[^"]*"'   # .../en/selenium
```

Her sayfa KENDİ dilindeki URL'i işaret etmeli. EN sayfanın canonical'ı TR'yi
gösteriyorsa İngilizce sürüm hiç indekslenmez.

---

### 9.5. E — Ölçüm penceresi (analytics) · ~3 dk · **kaçırılırsa geri alınamaz**

**Neden geri dönüşü pahalı:** Analytics verisi geriye dönük doldurulamaz.
Hesap deploy'dan sonra açılırsa, `/en` geçişinin ilk günlerine ait veri
**sonsuza kadar kayıptır** — ve o günler, geçişin işe yarayıp yaramadığını
gösteren en kritik dönemdir.

**E1 — Deploy'dan ÖNCE:** Plausible hesabı açılmış ve site olarak
`learnqa.dev` eklenmiş olmalı (bkz. §8). Domain, `index.html`'deki
`data-domain` ile **birebir** aynı olmalı; `www.` farkı bile veriyi eşleşmez
kılar.

**E2 — Deploy'dan HEMEN sonra:** Canlı sitede dil düğmesine bas, ardından
Plausible panelinde birkaç dakika içinde `language_changed` olayının düştüğünü
gör. Düşmüyorsa: domain eşleşmesini ve script'in adblock tarafından
engellenmediğini kontrol et.

> Not: Ölçümün lokalde doğrulanamayacağını bilerek tasarlandı — Plausible
> script'i `localhost`'ta bilinçli olarak hiçbir şey göndermez. Bu yüzden E2E
> testleri script'i engelleyip taklit kullanır; gerçek uçtan uca doğrulama
> ancak canlı domainde yapılabilir.

---

### 9.6. F — GitHub Pages'e özgü kırılma noktaları · ~4 dk

**Neden geri dönüşü pahalı:** Yanlış yayınlanmış bir statik yapı, kullanıcıya
ve crawler'a aynı anda bozuk sayfa gösterir; Pages önbelleği nedeniyle
düzeltme her zaman anında yansımaz.

**F1 — Derin bağlantıda sert yenileme (SPA'ların klasik Pages hatası):**

`localhost:4173/en/git-github` aç → **F5 / sert yenileme** yap. Sayfa
gelmeli. GitHub Pages'te sunucu tarafı yönlendirme yoktur; bu senaryo yalnızca
o yola ait statik shell ÜRETİLDİYSE çalışır.

```bash
ls dist/en/git-github/index.html      # var olmalı
ls dist/404.html                       # fallback var olmalı
cat dist/CNAME                         # learnqa.dev yazmalı
```

**F2 — Shell gövdesi gerçek içerik gösteriyor mu (boş kabuk değil):**

```bash
curl -s localhost:4173/selenium | sed 's/<[^>]*>//g' | tr -s ' \n' ' \n' | head -30
```

JavaScript kapalı bir crawler'ın gördüğü metin bu. Anlamlı Türkçe konu
anlatımı görmelisin; yalnızca "Loading…" görüyorsan shell üretimi bozuktur.

**F3 — Yayın sonrası ilk 10 dakika:**

1. `https://learnqa.dev/` ve `https://learnqa.dev/en` aç.
2. `https://learnqa.dev/sitemap.xml` → 90 URL.
3. Search Console → Sitemaps → `https://learnqa.dev/sitemap.xml` **yeniden
   gönder** (URL kümesi değişti, eski gönderim yetmez).
4. URL Inspection ile `https://learnqa.dev/en/selenium` → "URL is on Google"
   değilse `Request indexing`.
5. 1-2 hafta sonra Search Console → International Targeting / Sayfa Deneyimi
   raporlarında hreflang hatası var mı bak.

---

### 9.7. Yayın öncesi karar tablosu

| Kontrol | Durum | Yayını engeller mi? |
|---|---|---|
| A1-A8 dil-ayrık URL | otomatik testler yeşil, gözle teyit gerekir | ✅ Evet — bir tıklamada bile `/en` düşüyorsa durdur |
| B1, B3 sitemap sayısı/dinamik route | otomatik test kapsıyor | — |
| **B2 admin/işlevsel route'lar sitemap'te** | **açık bulgu** | 🔴 **Evet** — indekslendikten sonra çıkarmak haftalar sürer |
| **C1 FAQ içeriği kullanıcıya görünmüyor** | **açık bulgu** | 🔴 **Evet** — politika riski, manuel işlem ihtimali |
| C2 Rich Results Test | elle yapılır | ✅ Evet — hata varsa düzelt |
| **D1 mükerrer başlık denetimi yok** | **açık bulgu** | 🟡 Hayır ama yayın öncesi bir kez elle koş |
| D2 SERP görünümü | elle yapılır | 🟡 Hayır — ama sonradan değiştirmek CTR geçmişini sıfırlar |
| E1 Plausible hesabı | kullanıcı tarafı | 🟡 Hayır ama **deploy'dan önce** açılmalı, sonra veri kayıptır |
| F1-F2 Pages statik yapı | otomatik test kapsıyor | — |

**Özet:** A ve F otomatik testlerle büyük ölçüde güvence altında; **B2 ve C1
yayın öncesi karar gerektiren açık bulgulardır**; D ve E bir kerelik elle
işlerdir ve kaçırılırsa telafisi pahalıdır.
