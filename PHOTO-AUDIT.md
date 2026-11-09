# Photo audit

Compared with the reference sites Joseph named (Verti CRE, INV Development, Forge, Avison Young, Xmark Midwest, Semler, Ellsbury, Merrill, Kirkland, Bradley, SVN, NAI, Allies Commercial Realty, Hudson Investing, Focused Capital, Gray Capital, and Huber Equity). No text or image files were copied from them.

What those sites tend to do:

- Home pages lead with one full-bleed photograph, close to the viewport, and then drop in one or two more full-bleed bands between type sections. Text sits on a dark scrim or in the band below, not in the middle of the picture.
- Service and project pages use a shorter full-bleed hero, then image tiles (about 4:3) for each service or property. The tile is the first thing in the card.
- Team pages, including Xmark Midwest's team page, put a square or 4:5 portrait beside the name and role. Some also run a wide environmental band under that block.
- Listing cards (Ellsbury and the brokerage sites) are photo first: picture, then name, city, type, size, price, and status. The map sits beside or above the cards, not instead of a picture.
- Insights and market pages use one wide image per card (a report spread, a street, an aerial), not a wall of stock skies.
- Contact pages often inset one building or office photo next to the address. It is smaller than the home hero.
- Image-to-text ratio: home is roughly half picture. An inner service or about page is closer to one third. A listings page is picture-plus-map. Sold and legal-style pages stay quieter until real deals exist.

Parlato before this pass was the opposite on most pages: one home hero and two banners, then type-only inner pages, except the founder headshot, the sample memorandum, and the sample listing illustration.

This pass does not add stock. Every new frame is a Stone (`#F3F4F6`) or charcoal gradient at the size the finished photo should be, with a white caption chip in the brand caption style. The founder headshot, both logos, the sample offering memorandum, and the Riverbend Commons sample illustration stay.

## Page by page

| Page | Photos before | What changed | Count now |
| --- | --- | --- | --- |
| Home | 3 stock frames (skyline hero, canal band, Monument Circle band) | Same three positions, now placeholders | 3 placeholders |
| Services | 1 stock hero | Placeholder hero, 5 service tiles, 1 divider band | 7 placeholders |
| About | 1 real headshot | Headshot kept. Added one full-bleed band under the bio | 1 photo, 1 placeholder |
| Insights | 1 stock hero, 1 sample memorandum | Placeholder hero, a frame on the report card, 3 insight cards. Memorandum kept | 1 photo, 5 placeholders |
| Listings | 1 sample listing illustration | Illustration kept. A listing with no `photo` file renders a placeholder card | 1 illustration |
| Sold | None | One full-bleed band above the empty table. No invented deals | 1 placeholder |
| Contact | None | One 3:2 inset by the address | 1 placeholder |
| 404 | None | None. A missing page should not pretend to be a property | 0 |

## Shot list to commission

Shoot real Parlato and Central Indiana subjects. Do not present a picture as a listing or a closed deal unless it is one. Deliver the long edge at least as wide as the size below, as JPG or WebP. Headshots stay grayscale. Property pictures can be color, cropped full-bleed, with a small white caption chip if a caption is needed.

### Home

- Downtown Indianapolis skyline, dusk or clear day, 16:9, full-bleed hero. At least 2400 px wide.
- Indianapolis canal or a similar civic edge, horizontal, 16:9, full-bleed divider. At least 2000 px wide.
- Monument Circle or another recognizable downtown place at night, 3:2, full-bleed divider. At least 2000 px wide.

### Services

- Multifamily courtyard or street elevation, 16:9, full-bleed inner hero. At least 2000 px wide.
- Multifamily exterior, 4:3, seller-representation tile. At least 1200 px wide.
- Warehouse or industrial exterior, 4:3, buyer-representation tile. At least 1200 px wide.
- Desk-level still life of a rent roll or underwriting set, 4:3, valuation tile. At least 1200 px wide. No readable client names.
- Retail street in a Central Indiana submarket, 4:3, tenant-representation tile. At least 1200 px wide.
- Vacant suite, empty and clean, 4:3, landlord-leasing tile. At least 1200 px wide.
- Justin with an owner outside a property, 16:9, full-bleed divider. At least 2000 px wide. Only if both people agree to be shown.

### About

- The current grayscale headshot can stay until a new 4:5 portrait is shot, at least 1200 px on the long edge.
- Justin walking a property, 16:9, full-bleed band under the bio. At least 2000 px wide.

### Insights

- Industrial park at dusk, 16:9, full-bleed hero. At least 2000 px wide.
- Printed or on-screen market report spread, no client data, 16:9, card. At least 1600 px wide.
- A submarket street, 4:3, card. At least 1200 px wide.
- Industrial park aerial, 4:3, card. At least 1200 px wide.
- Open land at the edge of a suburb, 4:3, card. At least 1200 px wide.

### Listings

- For each live listing: exterior, 4:3, card, at least 1400 px wide, plus a square crop if the map popup needs one. Put the file path in `photo` in `data/listings.json`.
- Do not shoot the Riverbend Commons sample as if it were a live assignment. Replace that illustration only when a real listing takes the slot.

### Sold

- One exterior per approved closed transaction, 16:9 for the page band and 4:3 for a future card. At least 2000 px and 1400 px. Do not commission a generic "sold" photo to stand in for a deal.

### Contact

- Fishers office exterior, 3:2, inset beside the address. At least 1400 px wide. No tenant signage that is not Parlato's.
