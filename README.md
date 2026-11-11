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

Top navigation: About, Services, Market Reports, Listings, Sold, Contact, and the "What's my property worth?" button.

- `index.html`: home. Photo hero, owner problems, how a sale is priced, property types and service area, FAQ, JSON-LD.
- `services.html`: services and the five-step sale process.
- `about.html`: founder and the firm, with placeholder metrics.
- `market-reports.html`: report list (placeholder until the first edition) and the e-blast signup.
- `listings.html`: Leaflet map and listing cards from `data/listings.json`.
- `sold.html`: closed-transaction table (placeholder rows until real deals are approved).
- `valuation.html`: Broker Opinion of Value request form.
- `contact.html`: office details and inquiry form.
- `404.html`: missing page.
- `llms.txt` and `robots.txt`: guidance for AI assistants and crawlers.

## Folders

- `css/styles.css` and `js/main.js`: styles and behavior. `js/vendor/leaflet/` is the self-hosted map library.
- `fonts/`: self-hosted Bodoni Moda and Libre Franklin woff2 files. No Google Fonts request at runtime.
- `images/`: logos, the grayscale founder headshot, and stand-in photographs. Three Indianapolis aerials are Joseph's own; the rest are licensed stock. Credits are in `images/CREDITS.md`.
- `data/`: `listings.json` and `sold.json` for the map.

## Forms

All three forms (inquiry, valuation, e-blast signup) are preview only. They post nowhere and show "Preview only, not connected." Connect them only after Joseph approves: monday WorkForms or a webhook for the inquiry and valuation forms, and the chosen email platform for the signup.

## How to add a listing

Edit `data/listings.json` and replace the placeholder entry. One object per real, signed listing:

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

Add a row to the table in `sold.html` and remove the placeholder rows. Only real, closed transactions that Joseph has approved for publication. Price only where the client allows.
