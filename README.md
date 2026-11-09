# Parlato Real Estate website

Static marketing site for Parlato Real Estate, a Central Indiana commercial real estate brokerage founded by Justin Parlato. The site is aimed at property owners, and also routes buyers, occupiers, and landlords.

This folder is repo-ready for `jbparlato37/Parlato-Website` (private, default branch `main`). It has not been published, pushed, or connected to a remote.

The official deliverable naming style in the Nov 9, 2026 brand guide uses Title Case with spaces and the date, for example "Parlato Real Estate Website 11.09.2026.html", with no underscores. Web paths in this repo stay at `index.html`, `css/`, `js/`, `fonts/`, and `images/` so the site can deploy to Cloudflare Pages as-is.

## Preview locally

From this folder:

```
python3 -m http.server 8080
```

Then open http://127.0.0.1:8080/

There is no build step. Forms show a "preview only, not connected" notice and do not send data.

## What is in the folder

Pages, in nav order after the home page: `about.html`, `services.html`, `insights.html`, `listings.html`, `sold.html`, `contact.html`. `valuation.html` is a separate owner form, linked from every "What's my property worth?" button and from the footer. `index.html` is a short photo-led home page. `404.html` is the missing-page layout.

<!-- Sitemap: index.html, about.html, services.html, insights.html, listings.html, sold.html, valuation.html, contact.html, 404.html -->

- `css/styles.css` and `js/main.js` are the styles and behavior.
- `fonts/` holds self-hosted Bodoni Moda and Libre Franklin woff2 files (no Google Fonts request at runtime).
- `images/` holds logos, the founder headshot, the sample artwork, and stand-in photographs. Three Indianapolis aerials are Joseph's own. The rest of the stand-ins are licensed stock. Credits are in `images/CREDITS.md`. The shot list to replace them is in `PHOTO-AUDIT.md`.
- `data/listings.json` and `data/sold.json` feed the map and the cards.
- `functions/api/contact.js` is the contact form endpoint. It does nothing until the env vars below are set.
- `CLAUDE.md` is the collaboration guide. `CHANGES.md` is the review log.
- `previews/` holds full-page screenshots.

## How to add a listing

Edit `data/listings.json`. One object per listing:

- `id`, `name`, `city`
- `lat`, `lng` (use a real pin only when the listing is real; otherwise mark it illustrative)
- `assetType` (for example Multifamily, Industrial, Retail, Land)
- `size` (units or square feet)
- `price` (a dollar figure, or the words `Call for offers`, shown as plain text, never as a phone button)
- `status` (for example Available, or Illustrative sample)
- `photo` (a path under `images/`)
- `dealRoomUrl` (leave `""` or `"#"` until the deal room exists; the button then reads "Deal room coming soon")
- `illustrative` true when the card is a sample

Do not add a closed deal to `data/sold.json` unless Joseph has approved that exact transaction. Do not describe a listing as off-market, private, or quiet.

The map is Leaflet with OpenStreetMap raster tiles, so it draws without WebGL. Attribution stays on the map.

## Activating the contact form

The contact form posts to `/api/contact`. The valuation form posts to `/api/valuation`. Until the items below are set in the Cloudflare Pages project, each function returns `not configured` and the page keeps the notice "Preview only, not connected." No recipient address is stored in the repo. Both emails go to `CONTACT_TO_EMAIL`. A valuation email subject starts with "Valuation request".

Set these environment variables:

- `CONTACT_TO_EMAIL`: where inquiries are delivered. Must be allowed by the email binding (a verified destination).
- `CONTACT_FROM_EMAIL`: the sender on your Email Sending domain. Not a personal address hardcoded in the site.
- `TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`: Cloudflare Turnstile. The site key is public. The secret stays in the env.

Add a `send_email` binding named `EMAIL`. In Wrangler that is:

```
[[send_email]]
name = "EMAIL"
```

The function calls `env.EMAIL.send({ to, from, replyTo, subject, text })`, the structured send API in the current Cloudflare email docs. A monday connection remains a later option, after Joseph approves it. Do not publish the form, or the site, until he says so.

## Deploy plan

After Joseph approves the final design, fills the placeholders, and gives explicit approval to publish:

1. Host the static files on Cloudflare Pages Free (or Netlify Free) under Joseph's account.
2. Point the domain, also registered in Joseph's name, at that project.
3. Remove the `noindex` robots tag and add the canonical and social URL tags using the confirmed domain.
4. Connect the lead form to monday (WorkForms embed on any plan, or a webhook on Standard or higher) and connect the e-blast form to the confirmed email platform.
5. Do not publish, buy a domain, or connect live forms until Joseph approves those steps.

Nothing in this folder is public.
