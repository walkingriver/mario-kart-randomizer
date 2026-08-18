# MK8R — Mario Kart 8 Randomizer

A progressive web app that randomizes characters, karts, tires, and gliders for Mario Kart 8 family game nights.

## Development

```bash
npm install
npm start
```

Open http://localhost:4200

## Build

```bash
npm run build
```

Output: `dist/mk8r/browser`

## Deploy

### GitHub Pages

Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and publishes automatically. Enable GitHub Pages with source **GitHub Actions** in repo settings.

Live site: https://walkingriver.github.io/mario-kart-randomizer/

### Cloudflare Pages

- **Build command:** `npm ci && npm run build -- --configuration production`
- **Output directory:** `dist/mk8r/browser`
- **Node version:** 22

SPA fallback is configured via `public/_redirects`.

## Tests

```bash
npm test -- --no-watch --browsers=ChromeHeadless
```
