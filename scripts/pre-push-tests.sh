#!/usr/bin/env bash
# git push öncesi simple-git-hooks tarafından tetiklenir (bkz. package.json
# "simple-git-hooks"."pre-push"). post-commit-tests.sh'ın aksine bu hook
# GERÇEKTEN ENGELLEYİCİDİR — herhangi bir adım başarısız olursa push İPTAL edilir.
#
# Acil durumda atlamak için: SKIP_PRE_PUSH_HOOK=1 git push ...
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

if [ "${SKIP_PRE_PUSH_HOOK:-0}" = "1" ]; then
    echo "[pre-push] SKIP_PRE_PUSH_HOOK=1 — doğrulama atlandı, push devam ediyor."
    exit 0
fi

echo "[pre-push] Push öncesi zorunlu doğrulama: build (SEO + içerik bütünlüğü + mülakat denetimi dahil) + Playwright testleri (tests/, ~10-15 dk)..."
npm run build
npm run test:e2e

echo "[pre-push] Tüm doğrulamalar PASS — push devam ediyor."
