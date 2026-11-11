# Parlato Real Estate website, version 4

Search and AI-search positioning pass dated Nov 11, 2026, requested by Justin. Built on version 3. Nothing has been published. The `noindex` tag is still in place.

## Goal

Position Parlato Real Estate and Justin Parlato in web search and in AI assistant answers for Central Indiana multifamily and commercial brokerage. Lead with multifamily investment sales and valuations for private owners. Industrial, retail, land and leasing stay as secondary services.

## What changed versus version 3

- All copy was rewritten to be answer-first and specific: who the firm is, what it does, for whom, and where. The old wording is in git history.
- Title tag is now "Indianapolis Multifamily and Commercial Real Estate Broker | Parlato". The H1 is "Multifamily and commercial brokerage for Indianapolis owners." The brand-guide example headline "Advisors to owners of Indiana real estate" carried no service or city term. The guide line "Straight numbers, institutional marketing, and a founder on every deal" stays in the hero.
- New FAQ section with ten questions owners ask, mirrored in FAQPage JSON-LD and in `llms.txt`. Edit all three together.
- New "Property types and markets" section naming four property types and nine counties with their cities.
- JSON-LD expanded: description, service catalog, county-level areaServed, founder description, FAQPage.
- New `llms.txt` (plain-text summary for AI assistants) and `robots.txt` (allows all crawlers).
- Section order now puts the owner's problems ahead of the firm.
- Hero has two buttons instead of three and a shorter headline so both buttons sit above the fold.
- Fixed the phone sticky bar, where the Call button was black on black.
- Hidden until real content exists, with templates left in HTML comments: the Riverbend Commons sample listing, the empty Sold table, the LinkedIn list, and the press list. The Listings and Sold nav links were replaced by Markets, Buyers and FAQ.
- New metrics band under "The firm" with visible placeholders. "00" is not a figure.
- Testimonials template added as an HTML comment only.
- Property type on the form no longer defaults to Multifamily. The buy box prompt now asks for return target and cash or financed.

## Positioning against the institutional multifamily teams (added Nov 11, 2026)

Justin named CBRE (George Tikijian), Walker & Dunlop (Steve LaMotte) and Marcus & Millichap (The Kuroiwa Group) as the long-term competition. Their pages lead with career volume and large communities, and none explains method, process or pricing to a private owner. The site therefore competes on method and founder access now, sets no deal-size ceiling in the copy, and keeps hidden templates for the proof those teams show: a metrics band, a closed-deal list, clients represented and a market report. A tenth FAQ, "What size properties do you work on?", was added.

## Copy decisions to confirm

- "Representation on every side of the transaction" became "One side per deal". The FAQ says Indiana law requires written consent from both parties before a broker acts for both. Have the managing broker confirm that wording.
- "Every assignment gets full underwriting..." became "Every sale assignment...".
- Broker Opinion of Value is now tagged "Owners", not "Owners and lenders". The FAQ says a lender will usually require an appraisal.
- "First look" for buyers was removed. It conflicted with the promise of full buyer exposure for sellers.
- Valuation copy now says value starts from the rent roll and trailing 12 months, with taxes, insurance and management set to what the likely buyer will carry, and pro forma upside shown separately.
- The property tax FAQ states the January 1 assessment date and the 2% and 3% caps as general information, not tax advice. Confirm before launch.

## New placeholders

- [CONFIRM: service area counties and cities]. Marion, Hamilton, Hendricks, Johnson, Boone, Hancock, Morgan, Shelby and Madison are listed.
- [CONFIRM: number] for years in commercial real estate and for Central Indiana sales tracked in-house.
- Valuation cost and turnaround time are not stated anywhere. Adding both to the FAQ would help.
- Real testimonials, closed deals and a live listing, when they exist.

## Still open from version 3

Domain, Parlato email address, license number, sponsoring broker disclosure, social profile URLs, email platform and cadence, monday connection, gold value. See the version 3 notes below.

---

# Parlato Real Estate website, version 3

Review preview dated Nov 9, 2026 (America/Indianapolis). Built from the new site draft and the Nov 9, 2026 brand guidelines Joseph sent. Nothing in this folder has been published or shared publicly.

The new draft is the base for content and structure. Useful pieces from the earlier v2 preview were reused: self-hosted fonts, JSON-LD, accessibility patterns, the preview-only form treatment, Call and Request a Valuation CTAs, and the placeholder convention.

## Biggest changes versus the Nov 9 draft

- Rebuilt the single HTML file as a static site (`index.html`, `css/styles.css`, `js/main.js`, self-hosted fonts, and image files). Google Fonts requests were removed so type does not render-block on fonts.googleapis.com.
- Applied the Nov 9 palette and type rules throughout. Off-palette greys used for body and labels in the draft were replaced with black or white. Slate blue is limited to roles that pass contrast (large numerals, labels on dark grounds, illustration sky). Gold is limited to the italic word "Indiana" in the hero, one hairline under The Parlato advantage, hover and focus states, and the gold windows in the hero illustration.
- Kept the 15a logos that were embedded in the draft (black full lockup in the header on a semi-opaque white plate, white name-only in the footer). The logo is not repeated in the hero.
- Converted the founder headshot to grayscale, as the Nov 9 guide requires, and cropped it to 4:5.
- Added title, meta description, Open Graph tags, a `noindex` robots tag until publication is approved, and JSON-LD for Organization, RealEstateAgent, and Person. Canonical and social URLs are omitted until [CONFIRM DOMAIN] is set, because an invalid placeholder URL fails SEO checks.
- Accessibility work includes a skip link, landmarks, labels on every input, visible focus, reduced-motion support, and WCAG AA contrast on the live palette. Right-arrow characters in buttons and links were replaced with a CSS chevron so copy does not use dash-like glyphs.
- Added a Call CTA (`tel:317-981-9115`) next to Request a Valuation in the header, hero, process, founder section, and a sticky mobile bar.
- The lead form and the e-blast signup show a visible "Preview only, not connected" notice. Submit still does not send data. HTML comments describe the monday WorkForms or webhook swap-in. Consent checkboxes were added. Phone and email in the contact block are now links.
- The market-report "Download PDF" button was removed because the linked file is not in the repo and the draft already said the first edition is coming soon. The e-blast signup remains the way to request the report. Generic LinkedIn, Instagram, Facebook, and X homepage links were removed and marked [CONFIRM] until real profile URLs are supplied.
- Three press items from the draft, all about another firm, were removed from the visible page and replaced with an empty template. See "Decisions for Joseph" below.
- Riverbend Commons stays in the listings grid as a clearly labeled illustrative sample. The Sold table, LinkedIn posts, and press list stay as empty templates. No deals, testimonials, or statistics were invented.

## Brand-guide changes from October 27 to November 9 that mattered

These are the differences from the October 27 guide that changed the build, relative to the earlier v2 preview.

- Black moved from `#0C0C0C` to `#0D0D0D`. Stone and rule are now `#F3F4F6` and `#DCDEE3`, replacing `#F2F2F0` and `#DEDEDA`. The older neutrals `#3D3D3D` and `#6B6B6B` are no longer in the palette.
- Navy moved from `#0F2440` to Deep Navy `#232C3D`. Gold moved from `#B08D46` to `#B8995E`, and the guide now flags gold as a stand-in to confirm before printing.
- Slate Blue `#7A8DAB` is a new accent, for illustration sky, numerals, and small labels.
- Headshots must be grayscale (the October guide and the v2 preview used a color portrait).
- The logo may appear once per view, and must not be repeated in the header and the hero. Default treatment is the black 15a lockup on a semi-opaque plate; white 15a on a solid black banner when a plate is not appropriate.
- One gold element per view at most. Never set body text in slate blue or gold.
- Body lines should stay near 65 characters. Display italic for a highlighted headline word is Regular 400, not Medium 500.
- Captions are small white tags with black caps text on the bottom edge of an image. Illustration style is specified: flat geometric buildings, slate blue sky, navy and greys, a few gold windows.
- Contact is standardized, and a Parlato email address to replace the personal Gmail is an open question.
- File names for official deliverable copies use Title Case with spaces and the date, and no underscores. Web paths in the repo stay machine-safe.

## Copy notes

The draft body did not use em dashes, en dashes, slang, or exclamation points, and it did not use banned hype phrases. Voice was kept. Small edits:

- The hero keeps both draft sentences in the lede, including the brand-guide example line "Straight numbers, institutional marketing, and a founder on every deal."
- Ampersands in "Indianapolis & Central Indiana", "Owners & lenders", and "Broker & Managing Broker" were written out as "and".
- The insights eyebrow is "Insights", not "Insights & results", because that section is no longer a results gallery.
- Market-report copy was reconciled so it does not offer a download of a file that does not exist, while keeping the policy that the report will be free to read with no email required once it is published.
- "Quarterly" on the e-blast was marked [CONFIRM: cadence], because the first edition is still coming soon.

## Claims flagged for verification

These claims were kept from the draft. They are noted in HTML comments and in this file. Visible [CONFIRM] markers are reserved for missing facts, not for every sentence that still needs a check.

- "A founder on every deal."
- "The rigor of a national firm" and "without being handed to a junior associate."
- Relationships with owners, investors, tenants, and lenders across Central Indiana.
- Proprietary, in-house owner, buyer, and sales records for Central Indiana.
- Offering memoranda, flyers, and comp packages "produced to the standard of a national firm."
- "Institutional-quality representation."
- Background in multifamily investment sales, real estate development, and his own investment deals.
- Education: Real Estate and Marketing, Kelley School of Business, IU Indianapolis.
- License: Indiana Real Estate Broker and Managing Broker (no license number was in the draft or the guide).
- Planned publication of the market report, including a possible LinkedIn edition.

No track record counts, testimonials, or dollar figures were invented. The Riverbend Commons figures remain labeled illustrative.

## Placeholders Joseph needs to fill

- [CONFIRM DOMAIN] for the canonical URL, Open Graph and Twitter URL tags, and JSON-LD `url` / `@id` fields, before the `noindex` tag is removed.
- [CONFIRM: Parlato email address, to replace the personal Gmail]. The personal address `jbparlato@gmail.com` is shown only until that is decided.
- [CONFIRM: license number] and [CONFIRM: sponsoring broker company name and Indiana license disclosure].
- [CONFIRM: LinkedIn, Instagram, Facebook and X profile URLs] before any public social links are added.
- [CONFIRM: also planned publication on LinkedIn], including the company or profile URL.
- [CONFIRM: cadence] and [CONFIRM: email platform] for the e-blast.
- monday WorkForms embed or webhook, once Joseph approves a connection.
- Live listings to replace the Riverbend Commons sample, and approved closed transactions if the Sold table should be populated.
- Confirm gold `#B8995E` before anything is printed.

## Decisions for Joseph

These are points where the new draft conflicts with the Nov 9 brand guide, or with standing team rules, and a call is needed.

1. Press about another firm. The draft listed three articles about another firm, including one that names Justin. The brand guide says Parlato must not share a deliverable with another brand, and standing rules say other firms' systems and branding must not be referenced on this project. The items were removed and replaced with an empty press template. If Joseph wants press on the site, it should be Parlato-specific coverage he has approved.
2. Market report download. The draft offered "Download PDF" and "Free to download, no email required," and also said "First edition coming soon," with a file name that is not in the repo. The download button is out until a real report exists. Confirm whether the ungated-PDF policy should stay in the copy the way it is now.
3. Generic social URLs. The draft linked LinkedIn, Instagram, Facebook, and X to each network's homepage, not to a Parlato or Justin profile. Those links were removed rather than pointed at the wrong destination.
4. Personal Gmail on the site. The guide leaves a Parlato email as an open question. The Gmail address is still shown, with a visible confirm flag.
5. "Current offerings from Parlato Real Estate" sits above a sample listing. The sample is clearly labeled, but the lede can be tightened once a live listing exists, or sooner if Joseph prefers the section to stay empty until then.
6. Gold is still a stand-in. The on-screen preview uses `#B8995E`. Confirm before print.

## Brand compliance

- Palette matches the Nov 9 table. Formal documents would be black and white only; this digital page uses slate, navy, and gold only as accents.
- Fonts: Bodoni Moda 500 and 600, plus 400 italic for the hero highlight; Libre Franklin 400, 600, and 700. Caps labels are 600 with wide tracking. Files are self-hosted latin woff2 cuts with `font-display: swap` and the guide fallback stacks.
- Logo treatment follows 15a default rules, including "once per view."
- Voice: short and formal, no hype, no exclamation points, no banned phrases, and no em dashes or en dashes in copy, titles, meta, alt text, or this file.
- Imagery: grayscale 4:5 headshot, square corners, caption tag in black caps on a white chip. The hero illustration uses a slate blue sky, navy and greys, and gold `#B8995E` windows.
- Accessibility deviation worth recording: slate blue is not used as small text on white or stone, because it fails WCAG AA in those pairings. That is a tighter reading of the "small labels" role, not a new color.

## Design direction

Graphic design and layout follow the Nov 9 reference-sites note: full-width bands and institutional restraint for structure, Semler CRE and Xmark Midwest for content and logic, with a brokerage focus for now. Parlato fonts and colors only. Patterns kept from the new draft include the four-path "How can we help" routing, listings and an empty Sold table on the homepage, founder bio, and a market-insights section that now signs people up for the e-blast.

## Lighthouse scores

Ran Nov 9, 2026 with Lighthouse against a local server (http://127.0.0.1), not a public host.

- Desktop: Performance 100, Accessibility 100, Best Practices 100, SEO 63.
- Mobile: Performance 100, Accessibility 100, Best Practices 100, SEO 63.

The SEO deduction is the intentional `noindex, nofollow` robots tag, which Lighthouse correctly treats as not crawlable. Every other SEO audit passed (title, meta description, crawlable links, valid viewport). Remove that tag only when Joseph approves publication and a real domain is set. Cache and document-latency hints are artifacts of the local server and are not a production measurement.

## Local preview files

- `/workspace/parlato-repo/previews/preview-desktop.png` (1280px wide, full page)
- `/workspace/parlato-repo/previews/preview-mobile.png` (390px wide, full page)

## Sample offering memorandum removed, 11.11.2026

Justin decided no sample offering memorandum is needed. The image and its "Sample work" panel were removed from the Insights section, and `images/sample-om.jpg` was deleted. The market report panel now spans the section. If marketing quality needs proof later, use a page from a real Parlato offering memorandum the client has approved.
