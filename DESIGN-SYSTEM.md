# DESIGN-SYSTEM.md — Warm Minimal Commerce

Neutral, reusable system derived from analysis of a premium apparel reference. No brand assets, names, copy, or images from the source. Use freely for your own store.

## Tokens

### Colors
- `--bg`: `#FFFFFF`
- `--ink`: `#2D2E2B`
- `--espresso`: `#301E1B` — announcement/footer
- `--rose`: `#B2595C` — links/accents
- `--signal`: `#E32C2B` — badges/errors only
- `--line`: `#E8E6E1` — 1px hairlines
- `--surface`: `#F9F6F1` — card/photo ground
- `--input`: `#F6F6F6`
- `--muted`: `#6B6B6B`

### Typography
- Family: `Inter, Archivo, Helvetica Neue, Arial, sans-serif` (substitute for Proxima Nova)
- Eyebrow: 11-12px, 700, uppercase, tracking 0.12em
- H1 hero: 20-28px uppercase centered
- H2 section: 32-44px uppercase tight
- Body: 15px / 1.6, small 13px, price 14px medium

### Spacing / Shape
- Base 4px scale: `4,8,12,16,24,32,48,64,96`
- Container 1280-1440px, padding 20 mobile / 32-48 desktop
- Sections: 56 mobile / 88-112 desktop
- Radius: buttons 0px, inputs/cards 2-3px, shadow none
- Borders 1px `var(--line)`

## Layout Patterns
1. Black announcement bar (rotating promos)
2. Utility row + centered wordmark nav
3. Full-bleed hero 2-image split + centered overlay + 2 CTAs
4. Centered manifesto paragraph
5. 4-up category tiles
6. 3-up value props with 72px line icons
7. 50/50 editorial splits alternating
8. Product carousel 5-up desktop / snap mobile
9. Story split + materials links
10. Footer: email 15%-off + 3 link cols + social + black legal bar

## Components (Dawn-ready)
- Header: `announcement-bar + header` — sticky white, centered logo, drawer cart with free-shipping progress
- Hero: `slideshow` with overlay text, outline-white buttons
- Categories: `multicolumn` or `collection-list` 4-col
- Values: `multicolumn` 3-col centered icons
- Product card: `card-product.liquid` — 3:4 media, title 14px, price 14px, hover second image
- Email: `newsletter` — bg input, sharp submit
- Footer: `footer` — light top, black bottom bar

## Voice (original, not source copy)
Confident, plain, short. Uppercase headlines, 2-sentence bodies, action CTAs: Shop Collection / Our Story / Shop Women / Shop Men.

## Use in Dawn + GitHub Sync
- Branch `feat/design-tokens` → edit `assets/base.css`, `config/settings_schema.json`
- Branch per section → `sections/`, `templates/index.json`
- PR preview on unlisted theme, merge to live branch to publish.
