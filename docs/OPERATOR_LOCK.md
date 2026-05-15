# Operator Lock

This repository contains the live standalone site for `homelab.starlightdaemon.dev`.

## Rule

Do not change the main site runtime unless the operator explicitly says to.

Locked runtime scope:

- `index.html`
- `css/homelab.css`
- `js/homelab.js`
- `assets/`

## Default Work Location

If the task is exploratory, draft-only, or intended to build a more accurate network map without changing the live site, work in:

- `network-map/`

That directory is the default safe workspace for:

- topology notes
- inventory capture
- diagram drafts
- exports
- data files for future map generation

## Integration Rule

Do not merge separate network-map work into the live site until the operator explicitly requests integration.
