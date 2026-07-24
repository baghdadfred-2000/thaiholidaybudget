#!/usr/bin/env python3
"""
Preview — serve this site locally the way Netlify does.

  * Clean / extensionless URLs:   /about          ->  about.html
  * Forced canonical redirects:   /about.html     ->  /about        (301)
                                  /index.html     ->  /             (301)
  * Directory index:              /               ->  index.html
  * Custom 404 page:              unknown path     ->  404.html (HTTP 404)

Runs at http://localhost:8000 and opens your default browser.
Stop it with Ctrl+C (or just close the window).

Usage:  python Preview.py       (or double-click Preview.cmd on Windows)
"""

import http.server
import mimetypes
import os
import sys
import threading
import urllib.parse
import webbrowser

PORT = 8000
ROOT = os.path.dirname(os.path.abspath(__file__))

# Make sure common static types resolve correctly.
for ext, ctype in {
    ".js": "text/javascript",
    ".mjs": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".webmanifest": "application/manifest+json",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".webp": "image/webp",
    ".woff2": "font/woff2",
}.items():
    mimetypes.add_type(ctype, ext)


class NetlifyHandler(http.server.SimpleHTTPRequestHandler):
    """Mimics Netlify's pretty-URL + custom-404 behaviour for a static site."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    # --- entry points -----------------------------------------------------
    def do_GET(self):
        self._handle(head=False)

    def do_HEAD(self):
        self._handle(head=True)

    # --- routing ----------------------------------------------------------
    def _handle(self, head):
        parsed = urllib.parse.urlsplit(self.path)
        path = urllib.parse.unquote(parsed.path)
        query = ("?" + parsed.query) if parsed.query else ""

        # 1) Force canonical, extensionless URLs (matches _redirects "!").
        if path.endswith(".html"):
            if path.endswith("/index.html"):
                target = path[: -len("index.html")] or "/"
            else:
                target = path[: -len(".html")]
            return self._redirect(target + query)

        # 2) Root -> index.html
        if path == "/":
            return self._serve("index.html", head)

        rel = path.lstrip("/")
        if rel.endswith("/"):
            rel = rel[:-1]
        fs = os.path.join(ROOT, rel)

        # 3) An actual file on disk (assets, images, css, js, ...)
        if os.path.isfile(fs):
            return self._serve(rel, head)

        # 4) A directory that has its own index.html
        if os.path.isdir(fs) and os.path.isfile(os.path.join(fs, "index.html")):
            return self._serve(os.path.join(rel, "index.html"), head)

        # 5) Clean URL -> <name>.html
        if os.path.isfile(fs + ".html"):
            return self._serve(rel + ".html", head)

        # 6) Nothing matched -> custom 404
        return self._serve_404(head)

    # --- responses --------------------------------------------------------
    def _redirect(self, location):
        self.send_response(301)
        self.send_header("Location", location)
        self.send_header("Content-Length", "0")
        self.end_headers()

    def _content_type(self, path):
        ctype, _ = mimetypes.guess_type(path)
        ctype = ctype or "application/octet-stream"
        if ctype.startswith("text/") or ctype.endswith("json") or ctype.endswith("javascript"):
            ctype += "; charset=utf-8"
        return ctype

    def _serve(self, rel, head, status=200):
        fs = os.path.join(ROOT, rel)
        try:
            f = open(fs, "rb")
        except OSError:
            return self._serve_404(head)
        try:
            size = os.fstat(f.fileno()).st_size
            self.send_response(status)
            self.send_header("Content-Type", self._content_type(fs))
            self.send_header("Content-Length", str(size))
            self.end_headers()
            if not head:
                self.copyfile(f, self.wfile)
        finally:
            f.close()

    def _serve_404(self, head):
        fs = os.path.join(ROOT, "404.html")
        if os.path.isfile(fs):
            with open(fs, "rb") as f:
                data = f.read()
            self.send_response(404)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            if not head:
                self.wfile.write(data)
        else:
            self.send_error(404, "Not Found")


def main():
    os.chdir(ROOT)
    url = f"http://localhost:{PORT}"
    try:
        httpd = http.server.ThreadingHTTPServer(("127.0.0.1", PORT), NetlifyHandler)
    except OSError as exc:
        print(f"Could not start on port {PORT}: {exc}")
        print("A Preview may already be running, or the port is in use.")
        sys.exit(1)

    print("Preview is serving your site (Netlify-style clean URLs).")
    print(f"  Folder: {ROOT}")
    print(f"  URL:    {url}")
    print("Press Ctrl+C to stop.\n")

    def open_browser():
        try:
            webbrowser.open(url)
        except Exception:
            pass

    threading.Timer(0.8, open_browser).start()

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping Preview.")
    finally:
        httpd.shutdown()


if __name__ == "__main__":
    main()
