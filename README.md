
## Jenny Bu site — owner notes

- Structure: `/` (Hero, Approach, Selected work ×6, Property advisory, Contact CTA), `/work/$id` (six completed-project pages), `/contact`. Legacy `/garden/*` and `/inquire` 301-redirect. `/studio` is an unlinked, `noindex` owner editor.
- All copy (EN + 中文) lives in `src/lib/content.ts`. All six projects are completed builds (owner-confirmed). Only image-led sections are used.
- **Contact form:** posts to FormSubmit (`https://formsubmit.co/ajax/askjennybu@gmail.com`, no account or secret). The first submission sends a one-time activation email to askjennybu@gmail.com — click "Activate Form" once, or messages will not be delivered. On failure the form offers a prefilled `mailto:` fallback.
  If the form shows an error, the reason is displayed (e.g. activation pending, or FormSubmit unreachable) and the visitor can send a prefilled email instead. Check Spam/Promotions for mail from formsubmit.co.
