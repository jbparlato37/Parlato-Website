# Collaboration guide for the Parlato Real Estate website

Read this before editing the site. This is Justin Parlato's own firm brand, aimed at property owners in Central Indiana. Joseph Surak owns the domain, hosting, and content. Work stays private until Joseph explicitly approves publication.

These rules come from the Parlato Real Estate Brand Guidelines dated Nov 9, 2026, and from standing team rules. The Nov 9 guide supersedes the October 27, 2026 guide.

## Brand separation

Parlato and Verti are separate brands. Never mix their logos, colors, fonts, templates, or files on one deliverable.

Verti CRE (verticre.com) is a layout inspiration only, along with INV Development. You may follow a quiet, full-width band layout with generous white space and thin rules. You must never copy Verti's logo, colors, fonts, or text.

Do not reference, link to, or integrate systems of Justin's current brokerage, including Verti, Buildout, ZoomInfo, Rethink, RingCentral, Microsoft Teams, and the firm's Crexi Pro. Do not mention those systems on the site or in commit messages that would publish them.

The Nov 9 draft included three Verti CRE press items. They were removed from this preview for the reasons above. Do not add them back unless Joseph explicitly decides otherwise.

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

The Riverbend Commons card is an illustrative sample. The sample offering memorandum is illustrative. Do not present either as a live listing or a real deal.

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

The site is multiple pages, not one scrolling page. Top navigation, in order: About, Services, Insights, Listings, Sold, Contact. Files: `index.html`, `about.html`, `services.html`, `insights.html`, `listings.html`, `sold.html`, `valuation.html`, `contact.html`, `404.html`. `valuation.html` is the owner valuation form, linked from every "What's my property worth?" button. It is also in the footer.

`about.html` is a founder layout: centered heading, portrait beside the name, a role line, credential rows, then placeholder blocks. Do not fill those blocks with invented biography.

Listings and sold records live in `data/listings.json` and `data/sold.json`. See README for how to add a listing. Do not invent deals. The phone number is small text on the contact page and in the footer only. There is no large phone button.

- Keep the site static: HTML, CSS, and JS, plus `functions/api/contact.js` and `functions/api/valuation.js`. Both stay unconfigured until the env vars in the README are set. Do not hardcode a recipient address. Valuation mail uses the same `CONTACT_TO_EMAIL`, with a subject that starts "Valuation request".
- Preview with `python3 -m http.server` from the repo root.
- Do not commit secrets, live form endpoints, or files from Verti or other firm systems.
- Put design and copy decisions that need Joseph's review in `CHANGES.md`.
- The GitHub repo is `jbparlato37/Parlato-Website` (private, default branch `main`). Open a pull request for review against this guide rather than editing the main branch in the dark.
