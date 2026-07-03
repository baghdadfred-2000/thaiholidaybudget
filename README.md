# Uncle Pong's Thailand Holiday Estimator — V2 redesign

A privacy-first Thailand trip cost calculator. Everything runs in the browser: no backend, no accounts, no data leaves the device.

## Architecture

**Landing page → full-screen storyboard wizard.** The landing page (hero, trust bar, how it works, presets, travel-smarter tips) is what visitors see first. Clicking **"Build my Budget"** (in the navbar or the hero) opens a full-screen wizard that walks through the trip **one page at a time**, exactly like the original flow:

1. Trip basics → 2. Getting there → 3. Entry checklist → 4. Insurance → 5. Where you'll crash → 6. Eating well → 7. Getting around → 8. Shopping → 9. Going out → 10. Buffer & the verdict

A sticky bottom bar shows the live running total (your currency + THB) on every step, and Back/Next live in the sticky header so they're always reachable without scrolling. The final step has the grand total, doughnut chart, full breakdown, party level, Uncle Pong's tips, the "what if extra nights" slider, and PDF / Save / Share. "Done" celebrates and returns to the landing page; Esc or the ✕ exits anytime. Preset cards fill sensible defaults and jump straight to the verdict so you can step back and tweak.

## Files

| File | Purpose |
|---|---|
| `index.html` | Landing page + the full-screen budget wizard (single file) |
| `phrases.html` | Standalone 50 Thai Phrases page — categorized, tap-to-copy |
| `index-v1-backup.html` | The previous dark-neon version, untouched, for rollback |
| `about.html`, `privacy.html`, etc. | Support pages, unchanged and still linked from the footer |
| `*.jpg / *.jpeg` | Your custom Uncle Pong images — all in use, marked with `<!-- USER IMAGE: ... -->` comments |

## Calculation engine — unchanged and verified

The pricing engine is byte-for-byte the V1 logic. Verified programmatically: **503 input combinations** (all 15 currencies, all 7 destinations, 1–20 travelers, 0–60 days, what-if extras, edge cases) produce **identical results** in V1 and V2. The localStorage key is also unchanged, so returning visitors keep their saved estimates.

## How to deploy

Static site — upload the folder contents to any host (Netlify, Cloudflare Pages, GitHub Pages, shared hosting). No build step. Images must sit next to the HTML files, exactly as in this folder.

## Theme

Dark theme (very dark deep blue) is the **default**; a ☀️/🌙 toggle sits in the sticky navbar on both pages and the wizard header, persisted in localStorage (`pong_theme`). All theme tokens are CSS variables in the `<style id="themeStyles">` block — edit `--page`, `--surface`, `--ink-rgb`, etc. to retune either theme.

## How to customize

**Colors** — edit the `tailwind.config` block near the top of `index.html` and `phrases.html` (`tealdeep`, `aqua`, `coral`, `ambery`, `sand`, `cream`, `ink`). Component styles (buttons, cards, sliders, wizard steps) live in the `<style>` block below it.

**Images** — every image spot is marked with a `<!-- USER IMAGE: filename - purpose -->` comment. The hero and preset-card photos are Unsplash direct links; swap in your own files for full control.

**Prices & multipliers** — all pricing data is at the top of the `<script>` block in `index.html` under `DATA`: `RATES` (currency→THB), `DEST` (destination multipliers), `TIERS`, `FOODSTYLE`, `AIRPORT`, `DAILYTRANS`, `SHOP`, `SCENE`. Change a number there and every step, note and preset follows.

**Wizard steps** — each step is a `<section data-step>` block in `index.html`; step names are in the `STEPS` array. To reorder, move both together (the verdict must stay last).

**Presets** — edit the `PRESETS` object in the script.

**Phrases** — the `PHRASES` array in `phrases.html`; `PHRASE_CAT_CODE` assigns each a category (G/A/F/N/E, index-aligned).

## Notes

- Tailwind is loaded via the Play CDN for simplicity. For maximum performance, compile the CSS with the Tailwind CLI and inline it (V1 did this) — the markup won't need to change.
- Currency rates in `RATES` are fixed planning approximations, same as V1. Update them periodically.
- The AdSense snippet, cookie banner and consent modal from V1 are preserved as-is; `phrases.html` was added to `sitemap.xml`.
