# Synthora — Typography System

## Font Stack

### Display (Headlines, Hero)
- **Font:** Instrument Serif
- **Source:** Google Fonts (free)
- **Weights:** Regular 400, Italic
- **Usage:** H1 headlines, marketing pages, large display text
- **CSS:** `font-family: 'Instrument Serif', Georgia, 'Times New Roman', serif;`

### Primary (UI, Body, Headings)
- **Font:** DM Sans
- **Source:** Google Fonts (free)
- **Weights:** 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
- **Usage:** Body copy, UI elements, navigation, H2-H6
- **CSS:** `font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;`

### Monospace (Code, Data, Labels)
- **Font:** JetBrains Mono
- **Source:** Google Fonts (free)
- **Weights:** 400 (Regular), 500 (Medium), 600 (SemiBold)
- **Usage:** Code snippets, data previews, technical labels, section numbers
- **CSS:** `font-family: 'JetBrains Mono', 'SF Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace;`

## Type Scale

| Element          | Font              | Size   | Weight | Line Height | Letter Spacing |
|-----------------|-------------------|--------|--------|-------------|----------------|
| Display / H1    | Instrument Serif  | 48-64px| 400    | 1.1-1.15    | -1px           |
| H2              | DM Sans           | 28-32px| 600    | 1.3         | -0.5px         |
| H3              | DM Sans           | 20-24px| 600    | 1.35        | 0              |
| Body            | DM Sans           | 16px   | 400    | 1.7         | 0              |
| Body Small      | DM Sans           | 14px   | 400    | 1.6         | 0              |
| UI Label        | DM Sans           | 14px   | 500    | 1.4         | 0              |
| Code            | JetBrains Mono    | 14px   | 400    | 1.6         | 0              |
| Caption         | DM Sans           | 12px   | 400    | 1.5         | 0              |
| Section Label   | JetBrains Mono    | 11-12px| 600    | 1.0         | 2-3px          |

## Google Fonts Import

```html
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=JetBrains+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
```

## Brand Name Styling

The product name "Synthora" uses **DM Sans Bold 700** in the logo.
- "Synth" = Primary color (#0A6E5C)
- "ora" = Ink color (#1E2028) on light, Neutral (#C4C6D0) on dark
