# Synthora Brand Kit
## Synthetic Data for Everyone

Version 1.0 — March 2026

---

## Quick Start

| Need | Grab this file |
|------|---------------|
| Website logo | `logo/svg/synthora-logo-horizontal.svg` |
| App icon | `logo/svg/synthora-icon.svg` |
| Favicon | `favicon/favicon.ico` |
| Social preview | `social/og-image.png` |
| Presentation | `ppt/Synthora-Presentation.pptx` |
| Brand colors | `colors/synthora-colors.css` |
| Brand guide | `guidelines/Synthora-BrandIdentity.html` |

---

## Directory Structure

```
synthora-brand-kit/
│
├── logo/
│   ├── svg/                          # Master vector files (scalable)
│   │   ├── synthora-icon.svg         # Icon — primary bg
│   │   ├── synthora-icon-dark.svg    # Icon — dark/mint variant
│   │   ├── synthora-icon-outline.svg # Icon — outline on white
│   │   ├── synthora-logo-horizontal.svg       # Full logo (light bg)
│   │   ├── synthora-logo-horizontal-dark.svg  # Full logo (dark bg)
│   │   ├── synthora-logo-horizontal-white.svg # Full logo (white/overlay)
│   │   ├── synthora-logo-stacked.svg          # Stacked (light)
│   │   ├── synthora-logo-stacked-dark.svg     # Stacked (dark)
│   │   ├── synthora-wordmark.svg              # Text only (light)
│   │   ├── synthora-wordmark-dark.svg         # Text only (dark)
│   │   └── synthora-wordmark-white.svg        # Text only (white)
│   │
│   ├── png/                          # Raster exports at multiple sizes
│   │   ├── synthora-icon-512.png
│   │   ├── synthora-icon-256.png
│   │   ├── synthora-icon-128.png
│   │   ├── synthora-icon-64.png
│   │   ├── synthora-icon-48.png
│   │   ├── synthora-icon-32.png
│   │   ├── synthora-logo-horizontal-680w.png
│   │   ├── synthora-logo-horizontal-340w.png
│   │   └── ... (all variants at multiple sizes)
│   │
│   └── pdf/                          # Vector PDFs for print
│       ├── synthora-icon.pdf
│       ├── synthora-logo-horizontal.pdf
│       └── ... (all SVGs as PDF)
│
├── favicon/
│   ├── favicon.ico                   # 16+32+48 multi-size ICO
│   ├── favicon-16.png
│   ├── favicon-32.png
│   ├── favicon-48.png
│   ├── apple-touch-icon.png          # 180x180 iOS
│   ├── android-chrome-192.png        # Android/PWA
│   ├── android-chrome-512.png        # Android/PWA
│   ├── mstile-150.png               # Windows tile
│   ├── site.webmanifest              # PWA manifest
│   └── browserconfig.xml             # IE/Edge config
│
├── ppt/
│   └── Synthora-Presentation.pptx    # 9-slide brand template
│
├── colors/
│   ├── color-palette.png             # Visual palette reference
│   ├── synthora-colors.css           # CSS custom properties
│   ├── synthora-colors.scss          # SCSS variables
│   ├── tailwind-colors.js            # Tailwind config
│   └── design-tokens.json            # Design token standard
│
├── fonts/
│   └── typography-reference.md       # Font spec + import links
│
├── social/
│   ├── linkedin-banner.png           # 1584x396
│   ├── twitter-banner.png            # 1500x500
│   ├── youtube-banner.png            # 2560x1440
│   ├── og-image.png                  # 1200x630 Open Graph
│   └── github-social.png             # 1280x640
│
├── icons/
│   ├── icon-generate.svg + .png
│   ├── icon-template.svg + .png
│   ├── icon-export.svg + .png
│   ├── icon-settings.svg + .png
│   ├── icon-database.svg + .png
│   ├── icon-csv.svg + .png
│   ├── icon-json.svg + .png
│   └── icon-users.svg + .png
│
├── guidelines/
│   └── Synthora-BrandIdentity.html   # Full interactive brand guide
│
└── README.md
```

---

## Brand Colors

| Name           | HEX       | RGB             | Role              |
|---------------|-----------|-----------------|-------------------|
| Emerald Depth | `#0A6E5C` | 10, 110, 92     | Primary           |
| Midnight      | `#1A1A2E` | 26, 26, 46      | Secondary         |
| Signal Gold   | `#F0A500` | 240, 165, 0     | Accent            |
| Mint          | `#2DD4A8` | 45, 212, 168    | Success           |
| Cloud         | `#F9FAFB` | 249, 250, 251   | Background        |
| Ink           | `#1E2028` | 30, 32, 40      | Text Primary      |
| Slate         | `#6B6E7F` | 107, 110, 127   | Text Secondary    |

---

## Typography

| Role     | Font             | Source        |
|----------|-----------------|---------------|
| Display  | Instrument Serif | Google Fonts  |
| Primary  | DM Sans          | Google Fonts  |
| Code     | JetBrains Mono   | Google Fonts  |

---

## Usage Rules

1. **Logo spacing**: Maintain clear space = icon height on all sides
2. **Minimum size**: Icon ≥ 24px, horizontal logo ≥ 120px wide
3. **Never**: Stretch, rotate, recolor beyond brand colors, or add effects
4. **On photos**: Use white logo variant with sufficient contrast
5. **Favicon**: Use Option A (data grid) as primary; "S" lettermark as fallback

---

© 2026 Synthora. All rights reserved.
