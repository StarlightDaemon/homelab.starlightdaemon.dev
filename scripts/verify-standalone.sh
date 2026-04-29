#!/usr/bin/env bash

set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"

required_files=(
  "index.html"
  "CNAME"
  ".nojekyll"
  "css/homelab.css"
  "js/homelab.js"
  "assets/thinker-logo.png"
)

echo "Checking required files..."
for path in "${required_files[@]}"; do
  if [[ ! -f "$path" ]]; then
    echo "Missing required file: $path" >&2
    exit 1
  fi
done

echo "Checking runtime files for parent-workspace references..."
if rg -n "/mnt/e/StarlightDaemonDev|file://|href=[\"']/|src=[\"']/|url\(/" index.html css js >/tmp/homelab-verify-rg.txt 2>/dev/null; then
  cat /tmp/homelab-verify-rg.txt >&2
  echo "Found workspace-specific references." >&2
  exit 1
fi

echo "Checking runtime files for unexpected outbound URLs..."
mapfile -t outbound_urls < <(rg -o --no-filename "https?://[^\"' )]+" index.html css js | sort -u)

unexpected_urls=()
for url in "${outbound_urls[@]}"; do
  case "$url" in
    http://www.w3.org/2000/svg|https://homelab.starlightdaemon.dev/|https://www.starlightdaemon.dev/)
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

echo "Checking CNAME..."
if [[ "$(tr -d '\r\n' < CNAME)" != "homelab.starlightdaemon.dev" ]]; then
  echo "Unexpected CNAME value." >&2
  exit 1
fi

echo "Standalone verification passed."
