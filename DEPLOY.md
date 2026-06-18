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

Domain'in authoritative DNS'i nerede yönetiliyorsa kayıtlar orada girilmelidir. Şu anda nameserver'lar hâlâ Netlify DNS'te olabilir; bu durumda kayıtları Netlify DNS panelinden düzenle veya nameserver'ları Porkbun'a geri alıp kayıtları Porkbun'da gir.

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
