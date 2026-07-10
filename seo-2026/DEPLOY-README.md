# seo-2026 — deployment map

Save each file to the right place on thaiholidaybudget.com (canonical host:
https://thaiholidaybudget.com, non-www).

| File | Where it goes | Notes |
|---|---|---|
| `robots.txt` | web root `/robots.txt` | Replaces the current one (non-www Sitemap line). |
| `sitemap.xml` | web root `/sitemap.xml` | 8 indexable URLs; update `<lastmod>` on edits. |
| `_headers` | web root (Netlify / Cloudflare Pages) | Security headers + caching + CSP (Report-Only first). |
| `.htaccess` | web root (Apache / cPanel hosts) | 301 canonical host + headers + gzip + caching. Use INSTEAD of `_headers`. |
| `nginx-thaiholidaybudget.conf` | nginx `http{}` include | Same rules for nginx hosts. Use INSTEAD of `_headers`/`.htaccess`. |
| `thaiholidaybudget-technical-seo-2026.md` | keep as reference | Full guide: per-page `<head>` meta + JSON-LD to paste. |

Use ONLY ONE of `_headers` / `.htaccess` / `nginx-*.conf` — whichever matches your host.
The per-page `<head>` meta blocks and JSON-LD live in the .md guide (Section 3).
