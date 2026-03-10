# Synthora Presentation

This folder contains the source and assets for the Synthora enterprise overview deck.

## Build

```powershell
cd docs/presentation
npm install
npm run build
```

Default build output:

- `docs/presentation/synthora-enterprise-overview.pptx`
- `docs/presentation/synthora-enterprise-overview.pdf`

Additional commands:

```powershell
npm run build:launch
npm run build:all
```

Launch deck output:

- `docs/presentation/synthora-product-launch.pptx`
- `docs/presentation/synthora-product-launch.pdf`

## Assets

Expected screenshot assets:

- `assets/home-overview.png`
- `assets/explore-browser.png`
- `assets/dataset-builder.png`
- `assets/export-workflow.png`

The deck source uses these assets directly so the presentation can be regenerated without manual slide editing.

## Other Content

- `build-deck.mjs` builds the enterprise solution overview deck
- `build-launch-deck.mjs` builds the marketing/product-launch deck
- `deck-review.md` contains presentation review notes and improvement recommendations
- `launch-posts.md` contains launch copy for LinkedIn and X
