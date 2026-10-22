# Putting londry.uz online

`npm run build` creates the finished website in the **`dist/`** folder. It is plain files. Upload that folder to any
web host, point the domain at it, done. There is nothing to install or run on the server.

## 1. Before the first upload

```bash
npm run check        # types, lint, tests, build, browser tests: all must pass
```

Open `.env.production`:

```
VITE_SITE_URL=https://londry.uz     # the final address, no trailing slash
VITE_INDEXABLE=false                # BETA: hidden from Google/Yandex. Change to true on launch day.
```

## 2. Choose a host

| Host | Good for | How |
| --- | --- | --- |
| **Cloudflare Pages** (free) | Fast worldwide, automatic HTTPS, compression | Connect the project, build command `npm run build`, output folder `dist`. Reads `public/_headers`. |
| **Netlify** (free) | Same, with drag-and-drop | Drag the `dist` folder onto netlify.com, or connect the project. Reads `public/_headers`. |
| **Vercel** (free) | Same | Build `npm run build`, output `dist`. |
| **Ordinary hosting (cPanel / Apache)** | If you already pay for it | Upload everything inside `dist/` (including the hidden `.htaccess`) to the site's `public_html`. |
| **Your own server (nginx)** | Full control | See the nginx example below. |

Whatever you choose: **HTTPS must be on**. The offline feature (service worker) only works over HTTPS.

## 2b. Vercel (what `vercel.json` does)

`vercel.json` gives Vercel what `public/_headers` gives Cloudflare/Netlify: the security headers, one-year caching for `/assets/*`,
no caching for `sw.js`, addresses that end with `/`, and **permanent redirects from the old WordPress addresses** (home pages and the
Terms and Privacy pages, which the App Store and Google Play may link to) to the new ones. Settings in the Vercel project:
Framework "Other", build command `npm run build`, output directory `dist`. Under Settings → Environment Variables set
`VITE_SITE_URL=https://londry.uz` and, on launch day, `VITE_INDEXABLE=true`, then redeploy (these override `.env.production`).

## 3. Point the domain

At the domain registrar add the DNS records your host tells you to (Cloudflare Pages and Netlify show them).
Decide whether `www.londry.uz` should redirect to `londry.uz` (recommended) and set that at the host.

## 4. Launch day

1. In `.env.production` set `VITE_INDEXABLE=true`.
2. `npm run build`, upload `dist/` again.
3. Check: `https://londry.uz/robots.txt` now says `Allow: /` and lists the sitemap, and `https://londry.uz/sitemap.xml` opens.
4. Add the site to **Google Search Console** and **Yandex Webmaster**, submit `sitemap.xml`.
5. Test the share preview by posting the link to yourself in Telegram.

## Updating later

Change files, run `npm run build`, upload `dist/` again. Visitors get the new version on their next visit automatically
(HTML is always re-checked; the service worker updates itself; file names change when content changes, so nothing stale is served).

## What a good host must do (the config files in `public/` already ask for it)

- Serve `/ru/` as `/ru/index.html` (all hosts above do).
- Show `/404.html` with a real 404 status for unknown addresses.
- Compress text with Brotli or gzip.
- Cache `/assets/*` for a year (`immutable`) and never cache HTML or `sw.js`.

## nginx example

```nginx
server {
  listen 443 ssl http2;
  server_name londry.uz;
  root /var/www/londry.uz/dist;
  index index.html;

  # pre-compressed files are already in dist/ (.br and .gz)
  gzip_static on;
  brotli_static on;          # needs the ngx_brotli module; remove the line if you do not have it

  error_page 404 /404.html;
  location / { try_files $uri $uri/index.html =404; }

  location /assets/ { add_header Cache-Control "public, max-age=31536000, immutable"; }
  location = /sw.js { add_header Cache-Control "no-cache"; }
  location ~* \.html$ { add_header Cache-Control "no-cache"; }

  add_header X-Content-Type-Options "nosniff" always;
  add_header Referrer-Policy "strict-origin-when-cross-origin" always;
  add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()" always;
}
```

## If something looks wrong after upload

- **Old version still showing**: hard-refresh once (Ctrl+F5). The service worker replaces itself on the next visit.
- **`/ru/` gives 404**: the host is not serving folder index files; use one of the hosts above or the nginx example.
- **Page unstyled / fonts missing**: the `assets/` folder did not upload; upload the whole `dist/` folder.

## Measuring the old website (before the old hosting is cancelled)

`node scripts/lighthouse-old-site.mjs` (or `... desktop`) runs Lighthouse from the terminal on the old WordPress site, which still
lives on the old server, and writes a report next to where you run it. Only the test browser is told the old server's address; DNS is
not touched. Result on 2026-10-22: phone speed about 56-61, desktop 71, main content after about 17 s, 6.7 MB; the new site: 99 / 100,
1.4 s, 0.14 MB. It stops working when the old hosting is cancelled.
