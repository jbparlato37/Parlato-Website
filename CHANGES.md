# Changes and open items

Review log for the Parlato Real Estate website. Current as of Nov 12, 2026. Older detail is in git history.

## What this version is

The multi-page site (photo heroes, Leaflet listings map, separate About, Services, Valuation and Contact pages) merged with the version 4 search copy (answer-first copy, FAQ, JSON-LD, `llms.txt`), then audited and regenerated on Nov 11, 2026.

Goal: position Justin Parlato and Parlato Real Estate in web search and in AI assistant answers for Central Indiana multifamily and commercial brokerage. Lead with multifamily investment sales and Broker Opinions of Value for private owners. Industrial, retail, land and leasing are secondary. Say "private owners", never "small deals", and set no deal-size ceiling in the copy. One side per deal.

## Pages

- Home: title "Indianapolis Multifamily and Commercial Real Estate Broker | Parlato", H1 "Multifamily and commercial brokerage for Indianapolis owners." Photo hero, routes, owner problems, how a sale is priced, property types and nine-county service area, nine-question FAQ, valuation band. JSON-LD (Organization, RealEstateAgent, Person, FAQPage) lives here.
- Services: five services, the five-step sale process, buyers band.
- About: founder bio, credentials, the firm, core values draft.
- Market Reports (replaces Insights): e-blast signup, plus the report list once reports exist. The sample offering memorandum, the empty LinkedIn list and the empty press list were removed.
- Listings, Sold and Market Sales: built, and out of the menu until their data files have real entries.
- Valuation and Contact: forms are preview only.
- Every page has its own keyword title and description, the same nav and footer, and `noindex, nofollow`.

## Decisions applied on Nov 11, 2026

- No sample offering memorandum anywhere. Justin's call. The image and every reference were removed.
- No mention of Justin's current brokerage or its systems anywhere in the repo, including comments and docs.
- Listings, Sold and Market Reports pages, per Justin. The visible placeholders were replaced on Nov 12 by sections that stay hidden until real entries exist.
- Standing rule from `CLAUDE.md`: no off-market, pocket listing, quiet-sale or private-buyer-list language. Version 4 copy had an "Off-market sales" service, an on-market versus off-market FAQ, and off-market wording in the routes, owner problems, process and buyers band. All removed. The FAQ is now nine questions, matched in the JSON-LD and `llms.txt`. Buyers are invited to "get notified of new offerings".
- Standing rule from `CLAUDE.md`: the phone number is small text on the Contact page and in the footer only. Version 4 "Call" buttons were removed. The phone sticky bar is Contact and "What's my property worth?".
- Forms post nowhere. The draft Cloudflare Pages Functions email endpoints (`functions/api/*`) and the Turnstile loader were removed from this branch because they would send mail as soon as environment variables were set. They remain on the unmerged `cursor/multipage-site-f9be` branch.
- `DESIGN-AUDIT.md` and `PHOTO-AUDIT.md` (competitor research and the photo shot list) and the stale `previews/` screenshots were removed from the repo, which is public.

## Positioning with a short track record (Nov 12, 2026)

Justin asked for a layout that looks complete now and grows as deals close.

- The site leads with method, local data, the Broker Opinion of Value and founder access. Nothing on a public page shows an empty slot for results.
- Removed: placeholder Sold rows, the placeholder listing, the placeholder report entry, the "00" metrics band, and the [CONFIRM] biography blocks on About.
- Menu is About, Services, Market Reports, Contact. Market Sales, Listings and Sold join it by themselves when `data/market-sales.json`, `data/listings.json` or `data/sold.json` has real entries.
- New `market-sales.html`: recent Central Indiana sales from public records, labeled as market transactions and not Parlato deals. Hidden until Justin supplies sourced rows.
- Home page gains "Recent closings" and "What owners say" sections that appear from `data/sold.json` and `data/testimonials.json`. About gains a metrics band from `data/metrics.json`. Sold totals appear at three deals.
- Services opens with "What a Broker Opinion of Value includes", written from the approved FAQ wording.
- `llms.txt` no longer lists the empty Listings and Sold pages.
- Menu collapses to the Menu button below 1280 px so the full seven-link menu never wraps.

## Audit fixes

- Eyebrows on photo heroes are white instead of slate, for contrast on bright aerials.
- Form result messages use a rule-grey border, so the gold preview rule is the only gold element in view.
- Off-palette greys in the photo-slot backgrounds replaced with stone, rule grey and black.
- Stale `id="valuation"` removed from the Contact band. Relative canonical tags removed until the domain is set.
- "Joseph approves" removed from public copy on Sold.
- The duplicated "problems we solve" block now appears only on the home page.
- Photo alt text no longer says "placeholder photograph". Photo credits in `images/CREDITS.md` were corrected (Monument Circle is stock, not Joseph's).
- Buy box prompt asks for return target and cash or financed.

## Claims flagged for verification

Noted in HTML comments.

- "A founder on every deal."
- "The rigor of a national firm" and "without being handed to a junior associate."
- In-house owner, buyer and sales records for Central Indiana.
- Background in multifamily investment sales, real estate development and his own investment deals.
- Education: Real Estate and Marketing, Kelley School of Business, IU Indianapolis.
- Core values wording. Reworded on Nov 11, 2026 at Justin's request so none reads as edgy: Straight numbers, Owner first, Practical, Built for the property, Thorough, Steady to closing. The earlier draft was Disruptive, Creative, Resilient, Gritty, Trustworthy, Service minded.
- Have the managing broker confirm two FAQ answers: Indiana written consent from both parties before a broker acts for both, and the property tax answer (January 1 assessment date, 2% and 3% caps).

No track record counts, testimonials, deals or dollar figures were invented.

## Placeholders and open items

- Sponsoring broker company name, Indiana license disclosure and license number. Launch blocker.
- Domain. Then remove `noindex`, add canonical and Open Graph URLs, JSON-LD `url` and `sameAs`, and a sitemap.
- Parlato email address to replace the personal Gmail on the Contact page.
- Metrics for `data/metrics.json` once real figures exist. Confirm the nine counties and cities.
- Sourced market sales for `data/market-sales.json`. This is the fastest way to add substance to the site before the first closing.
- About page: how Justin works an assignment and his community affiliations, in his words. Years in the business.
- Valuation cost and turnaround time. What happens after the valuation form is sent.
- Whether deals Justin worked before founding Parlato may appear on Sold, or need his current broker's approval.
- Real listings, closed deals, testimonials (full name, title, company, deal tag), first market report.
- LinkedIn and other profile URLs.
- Email platform and cadence for the e-blast. monday connection for the inquiry and valuation forms.
- Map tile provider for production. The map uses OpenStreetMap's public tiles, whose usage policy discourages production traffic.
- Exact gold value before anything is printed.
- Replace stock photographs with Parlato photography as it becomes available.

## Recommended next work

1. Notable-transactions rows on Sold once the question above is answered. Show price and date where the client allows.
2. Market Sales data, then the first market report.
3. First Central Indiana market report as its own dated page with source and author.
4. After the domain is live: the launch steps above, a Google Business Profile, and a check that Cloudflare does not block AI crawlers.
5. Separate pages per service, property type and city (for example Broker Opinion of Value, Fishers, Carmel).
6. Later: development and buy-side sections.
