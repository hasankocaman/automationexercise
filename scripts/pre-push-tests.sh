#!/usr/bin/env bash
# git push öncesi simple-git-hooks tarafından tetiklenir (bkz. package.json
# "simple-git-hooks"."pre-push"). post-commit-tests.sh'ın aksine bu hook
# GERÇEKTEN ENGELLEYİCİDİR — herhangi bir adım başarısız olursa push İPTAL edilir.
#
# Bu doğrulama SADECE refs/heads/main'e GERÇEK bir push (yeni commit) varsa
# çalışır. Branch silme (git push origin --delete ...) ve main DIŞINDAKİ
# branch'lere yapılan push'lar git'in pre-push stdin protokolü üzerinden
# tespit edilip ATLANIR — aksi halde basit bir remote branch silme işlemi
# bile 10-15 dk'lık build+test paketini gereksiz yere tetikler.
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

echo "[pre-push] main branch'e push tespit edildi — zorunlu doğrulama: build (SEO + içerik bütünlüğü + mülakat denetimi dahil) + Playwright testleri (tests/, ~10-15 dk)..."
npm run build
npm run test:e2e

echo "[pre-push] Tüm doğrulamalar PASS — push devam ediyor."
