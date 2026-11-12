# Parlato Real Estate website

Static marketing site for Parlato Real Estate, a Central Indiana commercial real estate brokerage founded by Justin Parlato. It leads with multifamily investment sales and Broker Opinions of Value for private owners in Indianapolis and Central Indiana, and also serves buyers, occupiers, and landlords.

The site is a review preview. Every page carries `noindex, nofollow`, and nothing is published until Joseph approves. Read `CLAUDE.md` before editing. `CHANGES.md` is the review log and the list of open items.

## Preview locally

From the repo root:

```
python3 -m http.server 8080
```

Then open http://127.0.0.1:8080/

There is no build step. The site deploys to Cloudflare Pages as-is once publication is approved.

## Pages

Top navigation: About, Services, Market Reports, Contact, and the "What's my property worth?" button. Market Sales, Listings and Sold join the menu by themselves when they have content.

- `index.html`: home. Photo hero, owner problems, how a sale is priced, property types and service area, FAQ, JSON-LD.
- `services.html`: services and the five-step sale process.
- `about.html`: founder and the firm. Metrics appear from `data/metrics.json`.
- `market-reports.html`: the e-blast signup, plus the report list once `data/reports.json` has entries.
- `listings.html`: Leaflet map and listing cards from `data/listings.json`. Out of the menu until the first listing.
- `sold.html`: closed-transaction table from `data/sold.json`. Out of the menu until the first deal.
- `market-sales.html`: recent market sales from public records, from `data/market-sales.json`. Out of the menu until it has rows.
- `valuation.html`: Broker Opinion of Value request form.
- `contact.html`: office details and inquiry form.
- `404.html`: missing page.
- `llms.txt` and `robots.txt`: guidance for AI assistants and crawlers.

## Folders

- `css/styles.css` and `js/main.js`: styles and behavior. `js/vendor/leaflet/` is the self-hosted map library.
- `fonts/`: self-hosted Bodoni Moda and Libre Franklin woff2 files. No Google Fonts request at runtime.
- `images/`: logos, the grayscale founder headshot, and stand-in photographs. Three Indianapolis aerials are Joseph's own; the rest are licensed stock. Credits are in `images/CREDITS.md`.
- `data/`: the files the site grows from. See "How the site grows".

## Forms

All three forms (inquiry, valuation, e-blast signup) are preview only. They post nowhere and show "Preview only, not connected." Connect them only after Joseph approves: monday WorkForms or a webhook for the inquiry and valuation forms, and the chosen email platform for the signup.

## How the site grows

The site is built to look complete with no track record and to grow without a redesign. Each kind of proof has one file in `data/`. While a file is empty, its page stays out of the menu and its sections stay hidden. Add a real entry and the page, the menu link, and the related home page section appear by themselves. Entries marked `"illustrative": true` or `"placeholder": true` never count.

| File | What appears when it has entries |
| --- | --- |
| `data/sold.json` | Sold in the menu and footer, the Sold table, "Recent closings" on the home page (latest three). Totals (deals, units, volume) appear at three or more deals. |
| `data/listings.json` | Listings in the menu and footer, the map and cards. |
| `data/market-sales.json` | Market Sales in the menu and footer, the market sales table. |
| `data/reports.json` | The report list on Market Reports. Until then the page is the signup only. |
| `data/metrics.json` | The metrics band on About. |
| `data/testimonials.json` | "What owners say" on the home page. |

Formats:

```
sold.json          [{"name": "", "type": "Multifamily", "units": 24, "market": "Indianapolis, Marion County",
                     "price": 2100000, "closed": "2027-03", "represented": "Seller"}]
                   Use "sf" instead of "units" for commercial. Use "price": "Confidential" when the client does not allow it.
market-sales.json  {"updated": "March 2027", "source": "County recorder and assessor records",
                    "items": [{"name": "", "type": "", "units": 100, "market": "", "price": 12500000, "closed": "2026-10"}]}
reports.json       [{"date": "Q1 2027", "title": "", "summary": "", "url": "reports/2027-q1-central-indiana-multifamily.html"}]
metrics.json       [{"value": "12", "label": "Closed transactions"}]
testimonials.json  [{"quote": "", "name": "", "title": "", "company": "", "deal": "Seller, 24 units, Indianapolis"}]
```

Rules: only real, approved entries. A market sale is never presented as a Parlato transaction, and every market sale needs a public source. Testimonials need the client's approval and full attribution. When Sold or Listings have content, add their lines back to `llms.txt`.

Later growth, no redesign needed: a page per service, property type and city; a case-study page per closing linked from the Sold table; development and buy-side sections on Services.

## How to add a listing

Add an object to `data/listings.json`, one per real, signed listing:

- `id`, `name`, `city`
- `lat`, `lng`
- `assetType` (Multifamily, Industrial, Retail, Land)
- `size` (units or square feet)
- `price` (a dollar figure, or `Call for offers`)
- `status` (for example Available)
- `photo` (a real property photo under `images/`)
- `dealRoomUrl` (leave `""` until the deal room exists)
- `illustrative`: `false` for a real listing

State the cap rate basis every time, for example "6.9% cap on trailing 12". Do not describe a listing as off-market, private, or quiet.

The map uses OpenStreetMap's public tile servers, with attribution on the map. Choose a production tile provider before launch.

## How to add a closed deal

Add a record to `data/sold.json` in the format above. Only real, closed transactions that Joseph has approved for publication. Price only where the client allows.
