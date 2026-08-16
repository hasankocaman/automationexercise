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

CMD ["node", "src/server.js"]
