# homelab.starlightdaemon.dev

Standalone GitHub Pages repository for the Starlight homelab site.

## Files

- `index.html` - main page
- `css/homelab.css` - page styling
- `js/homelab.js` - mobile nav and workflow tabs
- `assets/thinker-logo.png` - shared logo asset
- `CNAME` - GitHub Pages custom domain

## Publish Target

- Custom domain: `homelab.starlightdaemon.dev`
- Expected GitHub Pages site owner: `StarlightDaemon`

## DNS

Create a Cloudflare `CNAME` record:

- Name: `homelab`
- Target: `starlightdaemon.github.io`

Then configure the repository's GitHub Pages custom domain to:

- `homelab.starlightdaemon.dev`

## Local Preview

```bash
python3 -m http.server 8123
```

Then open `http://127.0.0.1:8123/`.
