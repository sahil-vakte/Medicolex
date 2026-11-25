# Medicolex website

Next.js 15 (App Router) + TypeScript + Tailwind CSS website for **Medicolex**, the medico-legal reporting service of Aranath Medicolegal Limited (Company No. 17036313).

Phase 1: consultant shoulder & elbow medico-legal reports, with clinics in Leicester, Derby and Rugby, plus "coming soon" specialties.

## Quick start

```bash
npm install
cp .env.example .env.local   # then edit values
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

Requires Node.js 20 or later.

## Where to add the missing details

Everything that is still to be confirmed sits in **`lib/site.ts`**. Any value left as `null` is hidden automatically, so the site never shows a placeholder publicly.

| What | Where in `lib/site.ts` |
| --- | --- |
| Phone, email, instructions email, LinkedIn | `site.contact` |
| ICO registration no., indemnity insurer, VAT no. | `site.company` |
| Turnaround targets (appointment days, report days, fee quote hours) | `site.standards` |
| MedCo accreditation | `site.medcoAccredited` |
| Expert name, GMC no., photo, CV, qualifications, posts, memberships, medico-legal stats, bio | `experts[0]` |

Clinic venues (address, parking, access, map link) go in **`lib/content.ts`** under each location's `venue`. Put photos and the CV PDF in `/public` (for example `/public/experts/consultant.jpg`) and reference them by path.

All other page text (services, conditions, FAQs, insights articles, specialties) is also in `lib/content.ts`.

## Forms

- **Instruct form** (`/instruct`): 5-step, validated on client and server (`lib/forms.ts`), with optional document upload (PDF/Word/JPG/PNG, 15 MB per file, 40 MB in total).
- **Enquiry forms** (contact, register interest, join panel) post to `/api/enquiry`.
- Spam protection: honeypot field + simple per-IP rate limit.

**Delivery:** set `FORM_WEBHOOK_URL` (HTTPS) and `FORM_WEBHOOK_SECRET`. Submissions are POSTed as `multipart/form-data` with an `x-medicolex-secret` header, ready to plug into your CRM, Zapier/Make or your own API. Without a webhook, only the reference number and field count are logged. Personal data is never written to logs.

> **Medical records are special category data.** Whatever receives the webhook must store files encrypted, in the UK, with restricted access and a deletion schedule.

> **Hosting note:** serverless platforms cap request bodies (Vercel: about 4.5 MB), which would block larger uploads. For full upload sizes, either host on a Node server (for example AWS Lightsail/EC2 in eu-west-2 London, or Docker), or switch uploads to direct-to-storage (S3 pre-signed URLs).

## SEO built in

- Unique titles, descriptions, canonical URLs and Open Graph tags on every page (`lib/seo.ts`)
- `sitemap.xml` and `robots.txt` generated automatically
- Structured data: Organization/MedicalBusiness, Service, MedicalClinic (per location), Physician (once the expert's name is added), FAQPage, BreadcrumbList, Article
- Location pages for Leicester, Derby and Rugby; 10 condition pages; 3 starter Insights articles
- Set `NEXT_PUBLIC_SITE_URL` to the live domain

## Analytics & cookies

Google Analytics loads **only** after the visitor accepts. Set `NEXT_PUBLIC_GA_ID` to enable it; if it is blank, no banner is shown and no tracking happens.

## Brand

Colours, fonts and logo files follow the Medicolex brand guidelines. Tailwind tokens: `navy`, `teal`, `teal-deep`, `coral`, `coral-deep`, `mist`, `line`. Manrope is self-hosted via `@fontsource-variable/manrope`. Teal and coral are not used for text on white; links use Teal Deep.

## Pre-launch checklist

- [ ] Fill in contact details, expert profile, venues and service standards (see above)
- [ ] Confirm ICO registration, professional indemnity and GMC details are current before launch; the compliance pages state these commitments
- [ ] Have a solicitor review `/privacy`, `/terms` and `/complaints`, and prepare full terms of business for instructions
- [ ] Set up the form webhook and test an instruction end to end
- [ ] Confirm the domain, then set `NEXT_PUBLIC_SITE_URL`
- [ ] Verify Google Search Console and submit the sitemap; set up Google Business Profile only where rules allow
- [ ] Check "Medicolex" against the UK trade mark register (classes 44 and 45)

## Project structure

```
app/                 pages (App Router), API routes, sitemap, robots
components/          Header, Footer, UI blocks, forms, Mark (inline logo SVG)
lib/site.ts          company, contact, expert data   <- edit me
lib/content.ts       services, conditions, locations, FAQs, articles
lib/forms.ts         validation schemas (shared client/server)
lib/forward.ts       form delivery (webhook), references, rate limit
public/              logos, favicons, manifest, share image
```
