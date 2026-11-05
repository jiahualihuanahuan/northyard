## Jenny Bu site — owner notes

- Structure: `/` (Hero, Approach, Services, Where, Selected work ×6, FAQ, Property advisory, Contact CTA), `/services` and `/services/$slug` (landscape design, pools, outdoor living, property advisory), `/work/$id` (six completed-project pages), `/contact`. Legacy `/garden/*` and `/inquire` 301-redirect. `/studio` is an unlinked, `noindex` owner editor and is disallowed in `robots.txt`.
- Crawl files: `public/robots.txt`, `public/sitemap.xml` (https://jennybu.ca/sitemap.xml). Submit the sitemap in Google Search Console.
- All copy (EN + 中文) lives in `src/lib/content.ts`. Service-page copy and FAQs live in `src/lib/services.ts`. All six projects are completed builds (owner-confirmed).
- **Contact form:** posts to FormSubmit (`https://formsubmit.co/ajax/askjennybu@gmail.com`, no account or secret). The first submission sends a one-time activation email to askjennybu@gmail.com — click "Activate Form" once, or messages will not be delivered. On failure the form offers a prefilled `mailto:` fallback.
