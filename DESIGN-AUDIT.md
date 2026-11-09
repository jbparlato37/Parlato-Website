# Design audit

Reviewed November 9, 2026, after the multi-page preview, the Leaflet listings map, the valuation page, and the licensed stand-in photographs. Each site below was opened in a browser at desktop width. Scores compare Parlato with the pattern those sites share, from 1 (missing) to 5 (the useful pattern, without copying them).

No text, logos, or image files were copied. Track-record counts, testimonials, and client logos appear on many of these sites. Parlato does not use them. Rules for that are in `CLAUDE.md`.

## What was opened

| Site | Address opened | What the first screen does |
| --- | --- | --- |
| Verti CRE | verticre.com | Logo and links sit on a full-bleed building photograph. Headline is centered. One contact button. |
| INV Development | invdevelopmentllc.com | Thin type nav on a full-bleed aerial. Headline and two buttons sit low and left. A fact strip closes the hero. |
| Forge | forgerea.com | Dark nav, full-bleed aerial, oversized headline, one gold line, one button. Testimonials and volume counts sit on the photo. Forge Commercial in Dallas (forgecommercial.com) was also opened. It uses the same full-bleed pattern. The Midwest firm is the one scored here. |
| Avison Young | avisonyoung.com | Two nav rows on white, then a black type band over a dark field. A cookie panel covered the lower half. |
| Allies Commercial Realty | alliescommercialrealty.com | Nav and three buttons on a full-bleed night aerial. Headline and three more buttons sit low. |
| Xmark Midwest | xmarkmidwest.com | White header, then five full-height photo doors: Listings, Sold, About, Team, Contact. Team and Sold were also opened from search. Team is a heading, then a portrait beside the name and role. Sold is a year list, not a map of unsold buildings. |
| Semler | semlercres.com | Navy nav, aerial with the headline low, then a client-logo strip and service blocks. About is a named biography with transaction figures. |
| Ellsbury | ellsburygroup.com | White nav over a skyline. Centered name, one button. Listings are photo cards: picture, name, city, facts, status. |
| Merrill | merrillpropertygroup.com | White header, skyline, then four path cards (sell, lease, buy, tenants) and a values row. |
| Kirkland | thekirklandco.com | Nav on an aerial of apartments. Seller and buyer buttons, then three overlapping cards. Properties are photo cards. |
| Bradley | bradleyco.com | Dark header, split panel (type on the left, photograph on the right), then three service tiles. |
| SVN Northern Commercial | svnnc.com | White nav, orange contact button, type on the left of a skyline, one button. |
| NAI Global | naiglobal.com | White nav on a color street photograph, type in a dark panel at the left. A privacy panel covered the lower left. |
| Hudson Investing | hudsoninvesting.com | The live page stopped on a bot check, so the photograph could not be seen. The public home, about, portfolio, and FAQ text were read. Home leads with a headline, acquisition counts, and a portfolio of named properties. Those counts are not a pattern Parlato can follow. |
| Focused Capital | focusedcapital.com | Centered logo, then a wide building photograph, then a two-column story with more property photos. Contact is a short form. |
| Gray Capital | graycapitalllc.com | Logo centered on a darkened aerial, outlined headline, two buttons. Properties are a photo grid with unit counts. |
| Huber Equity | huberequitygroup.com | Thin nav, then a split: large name on the left, a building photograph on the right, one button. Portfolio is a list of named assets. |

Shared pattern worth keeping: a photograph carries the first screen, the header sits on that photograph, the headline is large, one primary action is obvious, listing cards are photo first, and the footer is quiet. Shared pattern to leave alone: volume statistics, testimonials, and client logos.

## Scores by page type

Scores are after the changes in this pass.

| Page | Layout | Hero | Nav | Type | Space | Photo | CTA / form | Map / listings | Footer | Motion | Mobile | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Home | 4 | 4 | 4 | 4 | 4 | 4 | 4 | n/a | 4 | 4 | 4 | Full-bleed photo, header on the photo, fact strip, values, valuation close |
| About | 4 | 4 | 4 | 4 | 4 | 4 | 4 | n/a | 4 | 4 | 4 | Short photo, then portrait beside the name. Bio blocks stay placeholders |
| Services | 4 | 4 | 4 | 4 | 4 | 4 | 4 | n/a | 4 | 4 | 4 | Photo hero, four paths, service tiles. Same-page photo repeats removed |
| Insights | 4 | 4 | 4 | 4 | 4 | 4 | 3 | n/a | 4 | 4 | 4 | Report, list, and press stay empty on purpose |
| Listings | 4 | 3 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | Short type hero so the map stays high. Photo-first card beside the map |
| Sold | 4 | 3 | 4 | 4 | 4 | 4 | 3 | 4 | 4 | 3 | 4 | Empty on purpose. No map and no building photo until a real record exists |
| Contact | 4 | 4 | 4 | 4 | 4 | 4 | 4 | n/a | 4 | 3 | 4 | Short photo, then the general form. Preview notice stays |
| Valuation | 4 | 4 | 4 | 4 | 4 | 4 | 4 | n/a | 4 | 3 | 4 | Short city photo, then the owner form. Intro and next steps are [CONFIRM] |

A 3 on the listings and sold heroes is the short type band. A tall photograph there would push the map or the empty table down. A 3 on Insights, Sold, and Contact motion is the absence of a count-up or testimonial slider, which this brand does not add.

## Gap list, by impact

### High

1. A full-bleed building photograph sat above the empty Sold table and read as a closed deal. Removed.
2. With no closed records, Sold still drew a blank map. An empty map reads as a broken listings page. The map now waits until `data/sold.json` has a record. The empty table stays.
3. On a phone, the home hero buttons sat under the sticky bar. The scrim clears that bar.
4. About, Contact, and Valuation opened as type on a flat field. The references open those page types on a photograph. Each of those three now has a short, left-aligned photo hero using a placeholder already in the repo. The valuation photograph is a city view, and the alt text says it is not a subject property.

### Medium

1. Listing cards were short strips. They are now photo first: picture, status, name, city and type, size, price, and the deal-room action. The sample price still reads "Price: sample".
2. The filter bar needed one rule so the two selects read as one control. Done. The confirm note stays under that bar.
3. Hero and inner-banner type needed to share the logo's left edge and sit low. Kept.
4. Scroll reveals could hide copy if JavaScript was slow. Copy stays visible until JavaScript adds the animation class, and only below the fold.
5. The Services page showed the same photograph twice in one view (the hero and the first tile, and the charts tile and the lower band). Those repeats now use other placeholders already in the library.
6. The About portrait column was narrow next to the credential stack. The portrait column is wider.
7. The header over a hero was translucent enough that scrolled labels showed through it. The solid state is now opaque white. Over the photograph, the bar stays clear and the logo keeps its white plate.

### Low, not changed

- No invented volume, testimonials, press, or client lists. The references use those. Parlato does not.
- Relative canonical and `noindex` stay until Joseph sets a domain and approves publication.
- Primary nav stays About, Services, Insights, Listings, Sold, Contact. Valuation is a button and a footer link.
- The listings title stays a short black band so the map remains the first working thing on the page.
- The photo library is still licensed stand-in photography. `PHOTO-AUDIT.md` is the shot list for real Parlato pictures. Adding more stock would not close that gap.

## What changed in this audit pass

- Sold no longer shows a property photograph, and it no longer draws a map when there are no records.
- About, Contact, and Valuation open on a short placeholder photograph, with the title at the left.
- Listing cards are photo first and sit beside the sticky map.
- The filter bar has one bottom rule, and the header turns opaque white once the page scrolls.
- Services no longer repeats one photograph inside a single page.
- The About portrait column is wider.
- Mobile hero text clears the sticky Contact / valuation bar.
