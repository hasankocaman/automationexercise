# Deploy Adımları — learnqa.dev

## Hosting: Netlify + Porkbun (Custom Domain)

---

## 1. Ön Koşullar

- GitHub repo: `hasankocaman/automationexercise` (private)
- Domain: `learnqa.dev` — Porkbun'dan satın alındı
- Hosting: Netlify (ücretsiz tier)

---

## 2. Proje Hazırlığı (Bir Kez Yapıldı)

### `vite.config.js` — Base path `/` olmalı
```js
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: { port: 5173, open: true }
})
```
> Dikkat: GitHub Pages için `/automationexercise/` kullanılıyordu. Netlify root'tan serve ettiği için `/` olmalı.

### `netlify.toml` — Proje kökünde bulunmalı
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```
> `[[redirects]]` kuralı olmadan React Router sayfa yenilemelerinde 404 verir.

---

## 3. Netlify'da Site Kurulumu (Bir Kez Yapıldı)

1. [netlify.com](https://netlify.com) → **Sign up / Login** → GitHub ile giriş
2. **Add new site → Import an existing project → GitHub**
3. `automationexercise` reposunu seç
4. Build ayarları `netlify.toml` sayesinde otomatik gelir → **Deploy site**
5. İlk deploy ~18 saniyede tamamlandı

---

## 4. Domain Bağlama (Bir Kez Yapıldı)

### Netlify tarafı
1. **Domain management → Add custom domain** → `learnqa.dev`
2. `learnqa.dev` → **Options → Set up Netlify DNS**
3. Netlify'ın nameserver adreslerini not al:
   ```
   dns1.p01.nsone.net
   dns2.p01.nsone.net
   dns3.p01.nsone.net
   dns4.p01.nsone.net
   ```
4. **Done** butonuna bas

### Porkbun tarafı
1. [porkbun.com](https://porkbun.com) → giriş → **Domain Management → learnqa.dev → Details**
2. **NAMESERVERS** bölümündeki düzenleme ikonuna tıkla
3. Porkbun'un varsayılan nameserver'larını sil:
   ```
   curitiba.ns.porkbun.com
   fortaleza.ns.porkbun.com
   maceio.ns.porkbun.com
   salvador.ns.porkbun.com
   ```
4. Netlify nameserver'larını gir (yukarıdaki 4 adres)
5. Kaydet

### DNS yayılması
- Süre: 5 dakika – 2 saat (genellikle ~30 dakika)
- Tamamlandığında Netlify otomatik SSL sertifikası alır (Let's Encrypt)
- Test: `https://learnqa.dev` tarayıcıda aç

---

## 5. Sonraki Deploy'lar (Her Güncellemede)

```bash
git add .
git commit -m "feat: ..."
git push origin main
```

`main` branch'e push yapıldığında Netlify **otomatik olarak** yeni deploy başlatır. Manuel işlem gerekmez.

---

## 6. Sorun Giderme

| Hata | Sebep | Çözüm |
|------|-------|-------|
| `ModuleLoader.handleInvalidResolvedId` | CI'da import edilen dosya git'e eklenmemiş | `git add <dosya> && git push` |
| `Get Pages site failed` | GitHub Pages, private repo'da ücretsiz çalışmaz | Netlify kullan |
| `Pending DNS verification` | Nameserver'lar henüz yayılmadı | 30-60 dakika bekle |
| `Could not provision SSL` | DNS yayılmadan önce SSL denendi | DNS doğrulandıktan sonra Netlify otomatik alır |
| Sayfa yenilemede 404 | `netlify.toml` redirect kuralı eksik | `[[redirects]]` kuralını kontrol et |

---

## 7. Önemli Bilgiler

| Alan | Değer |
|------|-------|
| Canlı URL | https://learnqa.dev |
| Netlify subdomain | https://sprightly-cactus-c9482b.netlify.app |
| GitHub repo | https://github.com/hasankocaman/automationexercise |
| Domain registrar | Porkbun — yenileme $12.87/yıl (2027-06-16) |
| SSL | Let's Encrypt — otomatik yenilenir |
---

## 8. SEO Yayin Kontrol Listesi

Her production deploy'dan sonra su kontrolleri yap:

1. `https://learnqa.dev/robots.txt` aciliyor mu?
2. `https://learnqa.dev/sitemap.xml` icinde tum ana sayfalar var mi?
3. Temiz URL'ler dogrudan aciliyor mu?
   - `https://learnqa.dev/selenium`
   - `https://learnqa.dev/playwright`
   - `https://learnqa.dev/python`
   - `https://learnqa.dev/sql`
4. Eski hash URL kullanan biri `https://learnqa.dev/#/selenium` acarsa otomatik `https://learnqa.dev/selenium` adresine tasiniyor mu?
5. Sayfa kaynaginda route'a ozel `title`, `description`, `canonical`, `WebPage` ve `BreadcrumbList` var mi?

Google Search Console'da bir kez yapilacaklar:

1. Domain property olarak `learnqa.dev` ekle.
2. DNS dogrulamasini tamamla.
3. `Sitemaps` ekraninda `https://learnqa.dev/sitemap.xml` gonder.
4. `URL Inspection` ile ana sayfa ve en onemli sayfalari tek tek kontrol et:
   - `https://learnqa.dev/`
   - `https://learnqa.dev/selenium`
   - `https://learnqa.dev/playwright`
   - `https://learnqa.dev/python`
   - `https://learnqa.dev/sql`
5. Her kritik URL icin `Request indexing` kullan.

SEO build korumasi:

```bash
npm run build
```

Bu komut artik sunlari otomatik kontrol eder:

- React route'lari ile SEO metadata listesi eslesiyor mu?
- `robots.txt` ve `sitemap.xml` uretiliyor mu?
- Her route icin statik HTML shell uretiliyor mu?
- Her uretilen HTML'de `title`, `description`, `canonical`, fallback metin ve structured data var mi?
