# homelab.starlightdaemon.dev

Standalone GitHub Pages repository for the Starlight homelab site.

This repo is intended to remain portable and independently deployable. The site should be able to move out of the parent workspace without code changes.

## Repository Layout

- `docs/` - published GitHub Pages site (source: `/docs` on `main`); nothing outside this directory is served
  - `docs/index.html` - main page
  - `docs/css/homelab.css` - page styling
  - `docs/js/homelab.js` - mobile nav and workflow tabs
  - `docs/assets/` - logo and tool icons used by the site
  - `docs/CNAME` - GitHub Pages custom domain
  - `docs/.nojekyll` - ensures GitHub Pages serves files as-is
  - `docs/robots.txt` - crawler policy for the published site
- `network-map/` - separate workspace for network topology drafts and source data (not published; see `agent-docs/OPERATOR_LOCK.md`)
- `scripts/verify-standalone.sh` - portability check for local assets and repo metadata
- `agent-docs/MIGRATION.md` - quick move / rebuild checklist

## Separation Rules

- Keep all site assets inside this repository.
- Use relative paths for local CSS, JS, and image assets.
- Do not introduce references to the parent workspace path.
- Treat this repository as the source of truth for `homelab.starlightdaemon.dev`.

## Operator Lock

- The live site runtime is operator-locked.
- Do not modify `docs/index.html`, `docs/css/homelab.css`, `docs/js/homelab.js`, or anything under `docs/assets/` unless the operator explicitly approves it.
- Draft or exploratory work, including a more accurate network map, should stay outside the live site runtime until integration is explicitly requested.
- Use `network-map/` as the default workspace for that separate work.

## Runtime Boundary

- Local runtime assets should load from this repository only.
- Intentional outbound runtime URLs are currently limited to the canonical site URL `https://homelab.starlightdaemon.dev/`.
- New third-party runtime scripts or styles should be treated as portability regressions.

## Local Preview

```bash
python3 -m http.server 8123
```

Open `http://127.0.0.1:8123/`.

## Standalone Verification

**Prerequisites:** `bash`, `rg` (ripgrep).

```bash
bash scripts/verify-standalone.sh
```

This confirms required files exist, the `CNAME` value is correct, no workspace-specific references were introduced, and no unexpected outbound runtime URLs were added.

## CI

GitHub Actions runs the standalone verification script on pushes and pull requests:

- `.github/workflows/verify-standalone.yml`

## Publish Target

- GitHub repository: `https://github.com/StarlightDaemon/homelab.starlightdaemon.dev.git`
- GitHub Pages source: `main` branch, `/docs` directory
- Custom domain: `homelab.starlightdaemon.dev`
- Expected GitHub Pages site owner: `StarlightDaemon`

## DNS

Create a Cloudflare `CNAME` record:

- Name: `homelab`
- Target: `starlightdaemon.github.io`

Then configure the repository's GitHub Pages custom domain to:

- `homelab.starlightdaemon.dev`

## Migration

See `agent-docs/MIGRATION.md` for the fast move / recovery checklist.

For a quick human handoff and current-state summary, see `agent-docs/STARTUP_NOTE.md`.

For a ready-to-paste kickoff brief for the next agent, see `agent-docs/NEXT_AGENT_PROMPT.md`.
