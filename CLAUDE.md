# Collaboration guide for the Parlato Real Estate website

Read this before editing the site. This is Justin Parlato's own firm brand, aimed at property owners in Central Indiana. Joseph Surak owns the domain, hosting, and content. Work stays private until Joseph explicitly approves publication.

These rules come from the Parlato Real Estate Brand Guidelines dated Nov 9, 2026, and from standing team rules. The Nov 9 guide supersedes the October 27, 2026 guide.

## Brand separation

Parlato Real Estate is a separate brand from Justin's current brokerage. Never mix that firm's logos, colors, fonts, templates, files, or text into a Parlato deliverable, and do not name that firm in this repo, including comments, docs, and commit messages.

Layout direction only: a quiet, full-width band layout with generous white space and thin rules. Use Parlato colors, fonts, and copy only.

Do not reference, link to, or integrate the current brokerage's systems (its listing, CRM, data, phone, chat, and marketplace tools). Do not name those systems on the site, in docs, or in commit messages.

Press items about another firm were removed from an earlier draft. Do not add them back unless Joseph explicitly decides otherwise. Press on this site must be about Parlato Real Estate and approved.

## Palette

Black and white carry the brand. Use them as much as possible. Slate blue and gold are background accents, used sparingly.

| Color | Hex | Role |
| --- | --- | --- |
| Parlato Black | `#0D0D0D` | Primary: text, logo, dark bands |
| White | `#FFFFFF` | Primary: page ground, reversed text |
| Stone | `#F3F4F6` | Neutral: alternating section backgrounds |
| Rule Grey | `#DCDEE3` | Neutral: dividers and borders |
| Slate Blue | `#7A8DAB` | Accent: illustration sky, numerals, small labels on dark grounds |
| Deep Navy | `#232C3D` | Accent: window tone, feature panels |
| Gold | `#B8995E` | Accent: one highlight word, rules, hover states |

Rules:

- One gold element per view at most, not counting hover and focus states or the gold windows in the hero illustration.
- Never set body text in slate blue or gold.
- Never set gold text on white. Gold on black is acceptable for the single italic highlight word in a headline.
- Slate blue fails WCAG AA as small text on white or stone (about 3.4:1 and 3.1:1). Use it for large Bodoni numerals on light grounds, for small labels on black, and for the illustration sky. Use black or white for small labels on light grounds.
- Do not introduce off-palette greys for body or label text.
- Gold `#B8995E` is a stand-in in the guide. Confirm the exact value before printing anything.

## Typography

Two free Google Fonts, self-hosted as woff2 in `fonts/`. Do not add a runtime request to fonts.googleapis.com or fonts.gstatic.com.

| Role | Font | Weight | Use |
| --- | --- | --- | --- |
| Display | Bodoni Moda | Medium 500, SemiBold 600 | Titles, section headings, property names, large numbers |
| Display accent | Bodoni Moda | Regular 400 italic | One highlighted word in a headline |
| Body | Libre Franklin | Regular 400 | Paragraphs, descriptions, captions |
| Labels | Libre Franklin | SemiBold 600, all caps, wide letter-spacing | Eyebrows, metric labels, buttons, nav |
| Emphasis | Libre Franklin | Bold 700 | Key terms inside body text |

- Headlines in sentence case.
- Labels in all caps with letter-spacing.
- Keep body lines near 65 characters wide.
- Fallbacks: Didot or Georgia for Bodoni Moda; Helvetica Neue or Arial for Libre Franklin.
- Do not use other display or body families.

## Logo

Default to the 15a logo: the serif "Parlato" wordmark, with spaced sans "REAL ESTATE" beneath in the full lockup.

- Header: black 15a full lockup on a semi-opaque white, black, or grey plate. File: `images/logo-15a-black.png`.
- Footer and other tight spaces: white 15a name-only on a solid black banner. File: `images/logo-15a-name-only-white.png`.
- Show the logo once per view. Do not repeat it in the header and again in the hero.
- Use the black logo on light grounds and the white logo on dark grounds.
- Never recolor, stretch, outline, or add effects.
- All other logo files live in the Design project files. Do not invent a new mark.

## Voice and copy

Short, punchy, to the point, but never edgy. Write like an advisor who respects the reader's time.

Do:

- Lead with the answer or the number.
- Use short declarative sentences.
- Give specifics: units, SF, dates, dollars, and label estimates and samples as such.
- Speak to the owner's problem.

Do not:

- Open with filler ("We are pleased to...").
- Use slang, hype, or exclamation points.
- Use vague claims ("best in class", "#1") without proof.
- Talk about the firm before the client.
- Present placeholders or illustrations as real deals.
- Use em dashes or en dashes in copy, titles, meta, or alt text. Use a comma, a period, or a hyphenated compound instead.
- Use the internal idea "new money at the old money table" as a tagline or in public copy.
- Advertise or imply off-market sales, pocket listings, private or quiet sales, pre-marketing to a private buyer list, or finding a buyer before a listing is public. A signup may invite people to get notified of new offerings, with no off-market implication.

Example headline from the guide: "Advisors to owners of Indiana real estate."

Example line from the guide: "Straight numbers, institutional marketing, and a founder on every deal."

Keep Joseph and Justin's wording from the draft unless a brand rule, an accessibility issue, or an unverified claim requires a change. Flag those changes in `CHANGES.md`.

## Never invent data

Never invent or publish testimonials, closed deals, statistics, license numbers, track-record figures, or press items that are not real and approved by Joseph.

If a fact is unverified, either:

- Keep the draft wording and add an HTML comment plus an entry in `CHANGES.md`, or
- Show a visible `[CONFIRM: ...]` placeholder, or
- Leave a clearly labeled template or empty state (for example the Sold table and the press list).

There are no placeholder listings, deals, or reports on the site. Sections for them stay hidden until real entries exist.

A current list of flagged claims and placeholders is in `CHANGES.md`. Update that list when you add or resolve one.

## Forms, leads, and client communication

The inquiry form is intended for monday CRM. Until Joseph approves a live connection, keep the visible "Preview only, not connected" notice and do not point the form at a live endpoint.

When it is time to connect, use a monday WorkForms embed (any monday plan) or a webhook / Zapier / Make integration (monday Standard or higher). Map the "I want to" intent values to a monday status column.

The insights subscribe form is an e-blast signup. It also stays in preview-only mode until the email platform is confirmed and connected.

Client communication belongs to the brokers. Do not write personalized client messages. The only outbound messages agents may send, and only with Joseph's explicit approval, are:

- e-blasts to large lists
- standardized lead replies using messages the broker wrote

Never send emails or messages to outside parties without Joseph's approval.

## Publication and ownership

Nothing gets published or made public without Joseph's explicit approval. The site currently includes a `noindex, nofollow` robots tag for that reason.

Joseph owns the domain, hosting, and content. Copies of created work go in his Google Drive. Do not purchase a domain, connect Cloudflare Pages as a public site, or change DNS until he approves that exact step.

The standardized contact block is:

Justin Parlato, Founder, Parlato Real Estate, 12175 Visionary Way, Fishers, IN 46038, 317-981-9115

A Parlato email address, to replace the personal Gmail, is an open question in the brand guide. Add the sponsoring broker company name and license disclosure wherever Indiana advertising rules require it, once Joseph supplies them.

## Layout and imagery

- Full-width bands alternating white, stone, and black. Thin rules divide content instead of boxes and shadows.
- One focal point per page or section. Large Bodoni numbers with small-caps labels for key metrics.
- Use 01 / 02 / 03 numbering only for real sequences, such as the process steps.
- Illustration: flat, geometric buildings in slate blue sky, navy and greys, with a few gold windows.
- Photography: real property photos, cropped full-bleed. Headshots in grayscale.
- Captions: small white tags with black caps text, set on the bottom edge of an image.
- Every page must work on phone and desktop with no sideways scrolling.

## How to work in this repo

The site is multiple pages, not one scrolling page. Top navigation, in order: About, Services, Market Reports, Market Sales, Listings, Sold, Contact, then the "What's my property worth?" button. Market Sales, Listings and Sold stay out of the menu until their data file has real entries (see below). Files: `index.html`, `about.html`, `services.html`, `market-reports.html`, `market-sales.html`, `listings.html`, `sold.html`, `valuation.html`, `contact.html`, `404.html`. `valuation.html` is the owner valuation form, linked from every "What's my property worth?" button. It is also in the footer.

The home page carries the search positioning: title tag "Indianapolis Multifamily and Commercial Real Estate Broker | Parlato", H1 "Multifamily and commercial brokerage for Indianapolis owners.", the FAQ, and the JSON-LD. The FAQ text is mirrored in the FAQPage JSON-LD and in `llms.txt`. Edit all three together. The service-area county list drives the FAQ answer, JSON-LD `areaServed`, and `llms.txt`.

`about.html` is a founder layout: portrait beside the name, a role line, the bio and credential rows. Do not add invented biography.

Positioning while the track record is short: lead with method, local data, the Broker Opinion of Value and founder access. Never show an empty slot for results. No placeholder deals, "00" metrics, empty tables or "coming soon" lists on a public page.

The site grows from the files in `data/`: `sold.json`, `listings.json`, `market-sales.json`, `reports.json`, `metrics.json`, `testimonials.json`. Anything marked `data-show-when="KEY"` stays hidden until `data/KEY.json` has real entries, then appears by itself. See README, "How the site grows". Do not invent entries. A market sale is never presented as a Parlato transaction and needs a public source. The phone number is small text on the contact page and in the footer only. There is no large phone button.

No sample offering memorandum anywhere on the site. Justin decided none is needed.

- Keep the site static: HTML, CSS, and JS only, deployable to Cloudflare Pages without a build step. Forms are preview only and post nowhere. An email endpoint draft (Cloudflare Pages Functions) exists only on the unmerged `cursor/multipage-site-f9be` branch. Do not add a live endpoint until Joseph approves the connection.
- Preview with `python3 -m http.server` from the repo root.
- Do not commit secrets, live form endpoints, or files from other firms or their systems.
- Put design and copy decisions that need Joseph's review in `CHANGES.md`.
- The GitHub repo is `jbparlato37/Parlato-Website` (private, default branch `main`). Open a pull request for review against this guide rather than editing the main branch in the dark.
