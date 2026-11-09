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

- `index.html` is the single-page site.
- `css/styles.css` and `js/main.js` are the styles and behavior.
- `fonts/` holds self-hosted Bodoni Moda and Libre Franklin woff2 files (no Google Fonts request at runtime).
- `images/` holds the 15a logos from the Nov 9 draft, a grayscale founder headshot, the sample offering memorandum, and the labeled sample listing illustration.
- `CLAUDE.md` is the collaboration guide for anyone editing this repo, including Claude.
- `CHANGES.md` lists what changed versus the Nov 9 draft, brand compliance notes, flagged claims, and placeholders.
- `previews/` holds desktop and mobile full-page screenshots from this review.

## Deploy plan

After Joseph approves the final design, fills the placeholders, and gives explicit approval to publish:

1. Host the static files on Cloudflare Pages Free (or Netlify Free) under Joseph's account.
2. Point the domain, also registered in Joseph's name, at that project.
3. Remove the `noindex` robots tag and add the canonical and social URL tags using the confirmed domain.
4. Connect the lead form to monday (WorkForms embed on any plan, or a webhook on Standard or higher) and connect the e-blast form to the confirmed email platform.
5. Do not publish, buy a domain, or connect live forms until Joseph approves those steps.

Nothing in this folder is public.
