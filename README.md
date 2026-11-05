## Jenny Bu site — owner notes

- Structure: `/` (Hero, Approach, Services, Where, Selected work ×6, Staging & a listing, FAQ, Property advisory, Contact CTA), `/services` and `/services/$slug`, `/staging`, `/listings/$mls`, `/work/$id`, `/contact`. Legacy `/garden/*` and `/inquire` 301-redirect. `/studio` is an unlinked, `noindex` owner editor and is disallowed in `robots.txt`.
- Staging photos in `public/images/staging/` are stand-ins. Replace them when real rooms are photographed. The Buttonville aerial is `public/images/listings/n14119300-aerial.webp`.
- Contact mail uses subject `Northyard inquiry — {type}` so the inbox can be searched. Types include interior staging and a house for sale.
- Crawl files: `public/robots.txt` (AI crawlers allowed; `/studio` disallowed), `public/llms.txt` (https://jennybu.ca/llms.txt), `public/sitemap.xml` (https://jennybu.ca/sitemap.xml). Submit the sitemap in Google Search Console. If Cloudflare “Block AI bots” is on, turn it off — it blocks crawlers before robots.txt is read.
- All copy (EN + 中文) lives in `src/lib/content.ts`. Service-page copy and FAQs live in `src/lib/services.ts`. All six projects are completed builds (owner-confirmed).
- **Contact form:** posts to FormSubmit (`https://formsubmit.co/ajax/askjennybu@gmail.com`, no account or secret). The first submission sends a one-time activation email to askjennybu@gmail.com — click "Activate Form" once, or messages will not be delivered. On failure the form offers a prefilled `mailto:` fallback.
