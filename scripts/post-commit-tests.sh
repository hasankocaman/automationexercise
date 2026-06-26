#!/usr/bin/env bash
# Her `git commit` sonrası simple-git-hooks tarafından tetiklenir (bkz. package.json
# "simple-git-hooks"."post-commit"). Commit zaten tamamlanmış olduğu için bu script
# commit'i ENGELLEMEZ — sadece Playwright UI + API testlerini çalıştırıp sonucu raporlar.
#
# Acil durumda atlamak için: SKIP_E2E_HOOK=1 git commit -m "..."
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

if [ "${SKIP_E2E_HOOK:-0}" = "1" ]; then
    echo "[post-commit] SKIP_E2E_HOOK=1 — Playwright testleri atlandı."
    exit 0
fi

echo "[post-commit] Playwright UI + API testleri çalışıyor (atlamak için: SKIP_E2E_HOOK=1 git commit ...)"
npm run test:e2e
