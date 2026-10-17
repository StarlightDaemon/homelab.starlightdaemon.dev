#!/usr/bin/env bash

set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"

command -v rg > /dev/null 2>&1 || { echo "error: rg (ripgrep) required"; exit 1; }

required_files=(
  "docs/index.html"
  "docs/CNAME"
  "docs/.nojekyll"
  "docs/css/homelab.css"
  "docs/js/homelab.js"
  "docs/assets/thinker-logo.png"
  "SECURITY.md"
  "THIRD_PARTY_NOTICES.md"
)

echo "Checking required files..."
for path in "${required_files[@]}"; do
  if [[ ! -f "$path" ]]; then
    echo "Missing required file: $path" >&2
    exit 1
  fi
done

echo "Checking safe local-preview instructions..."
preview_command="python3 -m http.server 8123 --bind 127.0.0.1 --directory docs"
preview_docs=(
  "README.md"
  "agent-docs/STARTUP_NOTE.md"
  "agent-docs/NEXT_AGENT_PROMPT.md"
  "agent-docs/MIGRATION.md"
)

for path in "${preview_docs[@]}"; do
  if ! rg -Fq "$preview_command" "$path"; then
    echo "Missing safe preview command in $path" >&2
    exit 1
  fi
done

if rg --pcre2 -n 'python3 -m http\.server 8123(?! --bind 127\.0\.0\.1 --directory docs)' "${preview_docs[@]}"; then
  echo "Found a preview command that may expose the repository root or bind beyond loopback." >&2
  exit 1
fi

echo "Checking runtime files for parent-workspace references..."
if rg -n "/Users/|file://|href=[\"']/|src=[\"']/|url\(/" docs/index.html docs/css docs/js >/tmp/homelab-verify-rg.txt 2>/dev/null; then
  cat /tmp/homelab-verify-rg.txt >&2
  echo "Found workspace-specific references." >&2
  exit 1
fi

echo "Checking runtime files for unexpected outbound URLs..."
outbound_urls=()
while IFS= read -r line; do
  outbound_urls+=("$line")
done < <(rg -o --no-filename "https?://[^\"' )]+" docs/index.html docs/css docs/js | sort -u)

unexpected_urls=()
for url in "${outbound_urls[@]}"; do
  case "$url" in
    http://www.w3.org/2000/svg|https://homelab.starlightdaemon.dev/)
      ;;
    *)
      unexpected_urls+=("$url")
      ;;
  esac
done

if (( ${#unexpected_urls[@]} > 0 )); then
  printf '%s\n' "${unexpected_urls[@]}" >&2
  echo "Found unexpected outbound runtime URLs." >&2
  exit 1
fi

echo "Checking browser-policy and public-classification declarations..."
if rg -n "frame-ancestors" docs/index.html; then
  echo "frame-ancestors is ineffective in a meta-delivered CSP; document it in SECURITY.md instead." >&2
  exit 1
fi

rg -Fq "Public Architecture Reference" docs/index.html || {
  echo "Missing public classification label in docs/index.html" >&2
  exit 1
}

rg -Fq "frame-ancestors 'none'" SECURITY.md || {
  echo "Missing response-header guidance in SECURITY.md" >&2
  exit 1
}

echo "Checking CI least-privilege controls..."
workflow=".github/workflows/verify-standalone.yml"
rg -q '^permissions:$' "$workflow" || { echo "Missing workflow permissions block" >&2; exit 1; }
rg -q '^  contents: read$' "$workflow" || { echo "Workflow contents permission is not read-only" >&2; exit 1; }
rg -q 'uses: actions/checkout@[0-9a-f]{40} # v7\.0\.1$' "$workflow" || {
  echo "Checkout must remain pinned to the reviewed v7.0.1 commit" >&2
  exit 1
}
rg -q '^          persist-credentials: false$' "$workflow" || {
  echo "Checkout credentials must not persist after checkout" >&2
  exit 1
}

echo "Checking secret-file ignore coverage..."
secret_samples=(
  ".env"
  ".env.production"
  "private.key"
  "private.pem"
  "identity.p12"
  "identity.pfx"
  "app.keystore"
  "id_rsa"
  "id_ed25519"
  "credentials.json"
  "service-account-prod.json"
)

for path in "${secret_samples[@]}"; do
  if ! git check-ignore -q "$path"; then
    echo "Secret-bearing sample is not ignored: $path" >&2
    exit 1
  fi
done

for path in ".env.example" ".env.production.example"; do
  if git check-ignore -q "$path"; then
    echo "Shareable environment template is unexpectedly ignored: $path" >&2
    exit 1
  fi
done

echo "Checking third-party icon register..."
while IFS= read -r path; do
  name="$(basename "$path")"
  checksum="$(sha256sum "$path" | awk '{print $1}')"
  if ! rg -Fq "\`$name\`" THIRD_PARTY_NOTICES.md; then
    echo "Missing third-party notice entry for $name" >&2
    exit 1
  fi
  if ! rg -Fq "\`$checksum\`" THIRD_PARTY_NOTICES.md; then
    echo "Third-party notice checksum is stale for $name" >&2
    exit 1
  fi
done < <(find docs/assets/tool-icons -maxdepth 1 -type f | sort)

echo "Checking CNAME..."
if [[ "$(tr -d '\r\n' < docs/CNAME)" != "homelab.starlightdaemon.dev" ]]; then
  echo "Unexpected CNAME value." >&2
  exit 1
fi

echo "Standalone verification passed."
