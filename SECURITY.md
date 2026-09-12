# Security Policy

## Public-data boundary

This repository publishes a deliberately public, read-only architecture reference from `docs/`. The published page may identify product names, hardware classes, storage capacity, service roles, and the use of proxy, tunnel, and VPN layers.

The published tree must not contain credentials, API keys, public or private IP addresses, internal hostnames, populated network topology, administrative URLs, account identifiers, or recovery material. Operational topology remains outside `docs/` until the operator explicitly approves a reviewed public version.

## Browser policy and hosting limitation

The HTML-delivered Content Security Policy restricts scripts, styles, images, fonts, forms, and base URLs. CSP directives that require an HTTP response header, including `frame-ancestors`, are intentionally not declared in the HTML because browsers ignore them when delivered through a `meta` element.

GitHub Pages does not provide repository-controlled custom response headers for this deployment. The current site contains no authentication, user input, state-changing actions, or sensitive UI, so framing risk is accepted for the present static reference. If the site moves behind a configurable edge or host, return this policy as an HTTP response header and verify it from the public URL:

```text
Content-Security-Policy: default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self'; font-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'
```

`X-Frame-Options: DENY` may also be sent as a legacy compatibility control. Do not add `_headers` or similar provider-specific files unless the active hosting platform actually consumes them.

## Reporting a vulnerability

Report suspected vulnerabilities privately through the repository owner's GitHub security contact or private security-advisory channel. Do not include credentials, exploit payloads, or private network details in a public issue.
