# thaiholidaybudget.com — SEO Health Report & AdSense Action Plan
*Audit date: July 3, 2026*

## Overall verdict

The site was already in strong shape. Every page had the AdSense script, unique titles/descriptions, canonicals, Open Graph tags, and JSON-LD. ads.txt, robots.txt, and sitemap.xml were present and correct. This audit closed the remaining gaps listed below.

## Per-page status

| Page | Target keyword | Title | Meta desc | Canonical | Schema | AdSense code |
|---|---|---|---|---|---|---|
| index.html | thailand trip cost calculator | ✅ | ✅ | ✅ | Organization + WebSite + WebApplication + FAQPage | ✅ |
| phrases.html | thai phrases for travelers | ✅ | ✅ | ✅ | Article + BreadcrumbList *(added)* | ✅ |
| about.html | — (trust page) | ✅ | ✅ | ✅ | AboutPage | ✅ |
| contact.html | — (trust page) | ✅ | ✅ | ✅ | ContactPage | ✅ |
| privacy.html | — | ✅ | ✅ | ✅ | WebPage | ✅ |
| terms.html | — | ✅ | ✅ | ✅ | WebPage | ✅ |
| cookies.html | — | ✅ | ✅ | ✅ | WebPage | ✅ |
| cookie-settings.html | — | ✅ | ✅ | ✅ | WebPage | ✅ |
| accessibility.html | — | ✅ | ✅ | ✅ | WebPage | ✅ |

## Changes made in this audit

1. **CLS fix (Core Web Vitals):** added intrinsic `width`/`height` to 18 local images (15 on index, 2 on phrases, 1 on about). The 3 remaining Unsplash images sit in fixed-height containers, so they don't shift layout.
2. **phrases.html:** added Twitter Card tags and JSON-LD (Article + BreadcrumbList with dates and publisher) — it had no schema or Twitter tags.
3. **ads.txt:** added missing trailing newline (some parsers reject the last line without it). Content verified: `google.com, pub-2738929737632064, DIRECT, f08c47fec0942fa0`
4. **index-v1-backup.html:** set to `noindex, nofollow` and **excluded from the upload package** — a near-duplicate of the homepage is a duplicate-content risk for both Google and AdSense review. Don't upload it.
5. **sitemap.xml:** refreshed `<lastmod>` for the homepage to 2026-07-03.
6. **AdSense verification:** confirmed the `ca-pub-2738929737632064` script appears exactly once in the `<head>` of all 9 production pages.

## AdSense approval readiness

**Already in place (no action needed):** Privacy Policy that names AdSense, Cookie Policy + cookie settings page, Terms & Disclaimer, About page with site purpose and publisher identity, Contact page with working email, Accessibility statement, footer links to all trust pages on every page, mobile-responsive layout, correct ads.txt.

**Watch-outs before applying:**

- **Content depth is the biggest risk.** Tool/calculator sites get rejected for "low value content" more than anything else. You have two content pages (calculator + phrases). Before applying, add 3–5 genuine articles, e.g. "Thailand 2-week budget breakdown: real numbers," "TDAC step-by-step guide," "Pattaya vs Phuket costs compared," "How to show proof of onward travel." Each 800+ words, dated, with images. This is the highest-impact thing you can do.
- **Cookie consent:** since you serve EEA/UK visitors, Google requires a certified CMP (consent management platform) for personalized ads. Easiest path: enable Google's own consent message in the AdSense dashboard (Privacy & messaging → create GDPR message).
- **Traffic:** AdSense has no official minimum, but a site with zero organic traffic often gets "site not ready." Get indexed first, apply second.

**Ad unit code (for after approval):** the head script you have is the site-verification/auto-ads loader. After approval you can either enable **Auto ads** (no extra code) or place manual units where you want them:

```html
<ins class="adsbygoogle" style="display:block"
     data-ad-client="ca-pub-2738929737632064"
     data-ad-slot="YOUR_SLOT_ID"
     data-ad-format="auto" data-full-width-responsive="true"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
```

Good placements: below the "verdict" step result, between calculator steps, and between phrase categories. Never place ads that push the calculator inputs below the fold on mobile.

## Google Search Console action plan

1. Upload the contents of `thaiholidaybudget-site.zip` to your web root (it contains all 9 pages, images, ads.txt, robots.txt, sitemap.xml — backup file excluded).
2. Verify the property in GSC as a **Domain property** (`thaiholidaybudget.com`) via DNS TXT record — covers www/non-www and http/https in one.
3. Submit `https://thaiholidaybudget.com/sitemap.xml` under Indexing → Sitemaps.
4. URL Inspection → Request indexing for `/`, `/phrases.html`, `/about.html`.
5. Link GA4 to Search Console (Admin → Product links).
6. Over the next 2–4 weeks monitor: Page indexing report (no "Duplicate/Crawled - not indexed" surprises), Core Web Vitals report, and Enhancements → FAQ/Breadcrumb rich results.
7. Test the homepage in the Rich Results Test (search.google.com/test/rich-results) — the FAQPage and WebApplication markup should validate.
8. Re-run PageSpeed Insights after upload. Two known head-based costs: the Tailwind Play CDN and Google Fonts are render-blocking. Fine for now; if CWV scores lag, the fix is compiling Tailwind to a static CSS file.

## Ongoing

- Update `<lastmod>` in sitemap.xml whenever you materially edit a page.
- Keep the "2026" freshness signals in titles/content current each year.
- When you add articles, add them to sitemap.xml, interlink them with the calculator and phrases pages, and give each an Article schema block with real dates (copy the pattern now in phrases.html).
