#!/usr/bin/env bash
# git push öncesi simple-git-hooks tarafından tetiklenir (bkz. package.json
# "simple-git-hooks"."pre-push"). GERÇEKTEN ENGELLEYİCİDİR — build adımı
# başarısız olursa push İPTAL edilir.
#
# NOT: Playwright E2E testleri (test:e2e) artık burada ÇALIŞMAZ — tarayıcı
# açan testler CPU/RAM yükü ve yetim (orphan) chrome süreçlerine yol açtığı
# için GitHub Actions'a taşındı: push main'e ulaştığında
# .github/workflows/deploy.yml içindeki `test` job'ı (build başarısız/testler
# kırmızıysa deploy hiç çalışmaz), PR'larda ise .github/workflows/ci-tests.yml
# çalışır. Bu script sadece hızlı, tarayıcısız build doğrulamasını (SEO +
# içerik bütünlüğü + mülakat denetimi) lokalde tutar.
#
# Bu doğrulama SADECE refs/heads/main'e GERÇEK bir push (yeni commit) varsa
# çalışır. Branch silme (git push origin --delete ...) ve main DIŞINDAKİ
# branch'lere yapılan push'lar git'in pre-push stdin protokolü üzerinden
# tespit edilip ATLANIR — aksi halde basit bir remote branch silme işlemi
# bile build paketini gereksiz yere tetikler.
#
# Acil durumda atlamak için: SKIP_PRE_PUSH_HOOK=1 git push ...
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

if [ "${SKIP_PRE_PUSH_HOOK:-0}" = "1" ]; then
    echo "[pre-push] SKIP_PRE_PUSH_HOOK=1 — doğrulama atlandı, push devam ediyor."
    exit 0
fi

# git pre-push hook stdin formatı: <local ref> SP <local sha1> SP <remote ref> SP <remote sha1> LF
zero_sha="0000000000000000000000000000000000000000"
should_run_tests=0

while read -r local_ref local_sha remote_ref remote_sha; do
    if [ "$remote_ref" = "refs/heads/main" ] && [ "$local_sha" != "$zero_sha" ]; then
        should_run_tests=1
    fi
done

if [ "$should_run_tests" = "0" ]; then
    echo "[pre-push] main branch'e gerçek bir push değil (branch silme veya main dışı branch) — doğrulama atlandı."
    exit 0
fi

echo "[pre-push] main branch'e push tespit edildi — zorunlu doğrulama: build (SEO + içerik bütünlüğü + mülakat denetimi dahil). Playwright E2E testleri GitHub Actions'ta koşacak."
npm run build

echo "[pre-push] Build doğrulaması PASS — push devam ediyor (E2E testleri GitHub Actions'ta koşacak)."
