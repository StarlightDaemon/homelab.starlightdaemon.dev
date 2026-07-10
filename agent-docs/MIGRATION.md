# Migration Checklist

Use this checklist when moving `homelab.starlightdaemon.dev` into a fresh workspace or a new machine.

## Separation Contract

The repo is expected to stay self-contained:

- All site files live inside this repository.
- Local assets are referenced relative to the repo.
- No runtime dependency should exist on `<StarlightDaemonDev-repo-root>` or the parent site repo.
- GitHub Pages deployment is driven by `docs/CNAME` and the contents of `docs/` only (Pages source: `main` / `/docs`).

## Fast Reboot Steps

1. Clone the repository.
2. Confirm the custom domain file exists:

   ```bash
   cat docs/CNAME
   ```

3. Run the standalone verification script:

   ```bash
   bash scripts/verify-standalone.sh
   ```

4. Start a local preview server:

   ```bash
   python3 -m http.server 8123
   ```

5. Open `http://127.0.0.1:8123/`.

## What To Check After The Move

- `docs/index.html` loads without missing CSS, JS, or image assets.
- The brand logo loads from `docs/assets/thinker-logo.png`.
- Tool icons load from `docs/assets/tool-icons/`.
- Mobile navigation still opens and closes.
- Workflow tabs still switch content correctly.
- `docs/CNAME` still contains `homelab.starlightdaemon.dev`.

## GitHub Pages Notes

- Expected remote: `https://github.com/StarlightDaemon/homelab.starlightdaemon.dev.git`
- Custom domain: `homelab.starlightdaemon.dev`
- DNS record: `homelab -> starlightdaemon.github.io`
