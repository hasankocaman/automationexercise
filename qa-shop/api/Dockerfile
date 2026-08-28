FROM node:22-alpine

# Yalnızca express ve pg bağımlılıkları var; native derleme gerektiren paket
# YOK (parola özeti için bcrypt yerine Node'un yerleşik scrypt'i kullanılıyor).
# Bu sayede imaj küçük kalıyor ve Alpine'da derleme hatası riski yok.

WORKDIR /app

# Bağımlılıklar önce kopyalanır: kaynak değiştiğinde npm katmanı yeniden
# kurulmaz, imaj yeniden derlemesi saniyeler sürer.
COPY package.json ./
RUN npm install --omit=dev --no-audit --no-fund

COPY src ./src
# Sözleşme dosyası GET /api/v1/openapi.yaml adresinden servis ediliyor —
# imaja kopyalanmazsa o uç 404 döner.
COPY openapi.yaml ./openapi.yaml

ENV NODE_ENV=production
ENV PORT=4000
EXPOSE 4000

# Root olmayan kullanıcı: node imajında hazır gelir.
USER node

# Sağlık kontrolü imajın İÇİNDE: `docker run` ile tek tek başlatan (compose
# kullanmayan) kullanıcının da "hazır mı" diye bakacak bir sinyali olsun.
# `curl`/`wget` YOK — node:alpine'da curl kurulu değil ve sırf bunun için
# imaja paket eklemek gereksiz. Node 22'nin yerleşik `fetch`i yeterli.
# Portu ortam değişkeninden okur: PORT değiştirilirse kontrol de takip eder.
# /health veritabanı düşükse 503 döner, yani bu kontrol API'nin ayakta
# olmasını değil GERÇEKTEN çalışır olmasını ölçer.
HEALTHCHECK --interval=10s --timeout=5s --start-period=15s --retries=6 \
    CMD ["node", "-e", "fetch('http://127.0.0.1:' + (process.env.PORT || 4000) + '/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"]

LABEL org.opencontainers.image.title="QA Shop API"
LABEL org.opencontainers.image.description="Test otomasyonu pratiği için Express + PostgreSQL REST API (41 iş ucu, OpenAPI 3.0.3 sözleşmeli)"
LABEL org.opencontainers.image.source="https://github.com/hasankocaman/automationexercise"
LABEL org.opencontainers.image.licenses="MIT"

CMD ["node", "src/server.js"]
