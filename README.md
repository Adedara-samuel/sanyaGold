# Sanyagold Website

Marketing site and client-portal foundation for **Sanyagold**, a Minnesota CPA firm serving nonprofits and small
businesses.

**Stack:** Next.js 16 (App Router, Cache Components, Turbopack) · TypeScript (strict) · Tailwind CSS v4 · shadcn/ui
(Radix) · TanStack Query v5 · Motion · react-hook-form + zod · Nodemailer (SMTP) · next-themes · lucide-react · pnpm

---

## Getting started

```bash
pnpm install
cp .env.example .env.local   # then fill in the values
pnpm dev                     # http://localhost:3000
```

| Script           | What it does                    |
| ---------------- | ------------------------------- |
| `pnpm dev`       | Start the dev server            |
| `pnpm build`     | Production build                |
| `pnpm start`     | Serve the production build      |
| `pnpm lint`      | ESLint                          |
| `pnpm typecheck` | TypeScript (`tsc --noEmit`)     |
| `pnpm format`    | Prettier (with Tailwind plugin) |

## Environment variables

All keys live in `.env.local` (git-ignored). `.env.example` lists them with placeholder values.

| Variable                       | Required | Purpose                                                                   |
| ------------------------------ | -------- | ------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`         | Yes      | Canonical URL for metadata, sitemap and Open Graph                        |
| `SMTP_HOST` / `SMTP_PORT`      | Yes      | SMTP server, e.g. `smtp.gmail.com` / `465`                                |
| `SMTP_USER` / `SMTP_PASS`      | Yes      | Sending account. For Gmail, `SMTP_PASS` must be a Google **App Password** |
| `CONTACT_TO_EMAIL`             | No       | Inbox for enquiries and bookings. Defaults to the email in `siteConfig`   |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | No       | Enables cookieless Plausible analytics (no consent banner needed)         |

Without SMTP settings the forms still validate, but emails are skipped and logged on the server.

## How email works

Every contact message and consultation request triggers **two** emails, both sent from the SMTP account with the
display name "Sanyagold":

1. **Notification → the firm's inbox** (`CONTACT_TO_EMAIL`, i.e. the address shown on the site). Its Reply-To is the
   visitor, so pressing _Reply_ answers them directly.
2. **Confirmation → the visitor.** It's a branded acknowledgement, and replying to it reaches the firm's inbox.

If the confirmation fails, the request still succeeds, because the firm already has the message. Templates live in
`lib/email-templates.ts`, and every user-supplied value is HTML-escaped. Both routes use the same zod schemas as the
forms, a honeypot field and a basic rate limit.

## Online booking

`/book` uses a built-in scheduler: pick a day, pick a 30-minute slot, add your details. Days, slots and time zone are
set in `siteConfig.booking` (Central Time; Monday to Friday; 9 AM to 4 PM starts; up to 60 days ahead). Past and
closed slots are disabled in the UI **and** re-checked by `/api/booking`. The firm confirms each request by replying
to the notification email.

> Slots aren't stored yet, so two visitors can request the same time. A per-browser guard prevents duplicate sends.
> See `TODO(portal)` in `app/api/booking/route.ts` for adding a database-backed lock.

## Editing content

| What                                                                     | Where                                          |
| ------------------------------------------------------------------------ | ---------------------------------------------- |
| Name, phone, email, address, hours, license, socials, nav, booking rules | `lib/site-config.ts` (single source of truth)  |
| The two independent firms (names, focus, licensing)                      | `content/firms.ts`                             |
| Services (each gets its own `/services/[slug]` page; `firm` sets the provider) | `content/services.ts`                    |
| Industries (3 featured + chips)                                          | `content/industries.ts`                        |
| Team, bios, license numbers, photos                                      | `content/team.ts` (+ photos in `public/team/`) |
| Testimonials                                                             | `content/testimonials.ts`                      |
| FAQs                                                                     | `content/faqs.ts`                              |
| Trust-bar stats                                                          | `content/stats.ts`                             |
| Blog posts                                                               | `content/posts.ts` (typed blocks)              |
| Brand colors, radii, fonts                                               | `app/globals.css` (CSS variables)              |
| Logo                                                                     | `components/layout/logo.tsx`                   |

**Logo:** this is the existing Sanyagold mark (the mauve hexagonal "S"), rebuilt as an exact SVG so it stays crisp and
adapts to dark mode. The original PNGs are kept in `public/brand/`.

## Architecture

```
app/
  (marketing)/   public site: home, services, industries, about, resources, blog, contact, book, legal
  (portal)/      client portal (placeholder UI, noindex): login, dashboard, documents
  api/           route handlers: services, posts, faqs, testimonials, contact, booking, documents
components/
  ui/            shadcn/ui primitives
  layout/        header, footer, mobile nav, logo, theme toggle
  sections/      page sections (hero, services, testimonials, FAQ, CTA…)
  forms/         contact form, booking scheduler
  motion/        Reveal, Stagger, CountUp, PageTransition
  portal/        portal shell, login form, document upload
hooks/           React Query hooks (queries + mutations)
lib/             site-config, data layer, query keys/client, api client, validators, email, SEO, booking rules
content/         typed seed content
```

- **Data flow.** `lib/data.ts` is the only place that reads content. Route handlers and server prefetching both go
  through it, so a CMS or database can replace it without touching hooks or pages.
- **React Query.** Key factories live in `lib/query-keys.ts`. Pages prefetch on the server (`lib/prefetch.ts`) and
  hydrate with `HydrationBoundary`, so services, blog and FAQ content is in the server HTML for SEO.
- **Cache Components.** This Next.js version prerenders by default and forbids reading the clock outside a cached
  scope. That's why `prefetchQueries` and `CurrentYear` use `"use cache"`, and query-driven client sections sit inside
  `<QueryBoundary>` (a Suspense wrapper).
- **SEO.** Per-page metadata and canonical URLs, generated OG/Twitter images, `sitemap.xml`, `robots.txt`, and JSON-LD
  (`AccountingService`/`LocalBusiness`, `FAQPage`, `Article`, `Service`, `BreadcrumbList`).
- **Accessibility.** Skip link, one `h1` per page, keyboard-friendly nav and carousel, visible focus, AA contrast
  tokens, and `prefers-reduced-motion` respected everywhere.

## Deploying to Vercel

1. Push the repository to GitHub and import it in Vercel (framework: Next.js, package manager: pnpm).
2. Add every variable from `.env.example` under **Settings → Environment Variables**, using your real SMTP values.
3. Deploy, then point `sanyagold.com` at the project under **Settings → Domains**.
4. Submit `https://www.sanyagold.com/sitemap.xml` in Google Search Console.

---

## Placeholders to replace

Search the code for `[` to find them all.

- [ ] **Firm permit / CPA license numbers** for W O Oyebamiji CPA LLC (`content/firms.ts` → `licensing.firmPermit`, `content/team.ts`)
- [ ] **Official logo for W O Oyebamiji CPA LLC** (currently a "WO" monogram in `components/firms/firm-mark.tsx`)
- [ ] **Each firm's own contact details** if they differ from the shared website contact (`content/firms.ts`)
- [ ] **Confirm legal entity name** (`siteConfig.legalName`)
- [ ] **Verify office address**, taken from the current site profile (`siteConfig.address`)
- [ ] **Office hours** (`siteConfig.hours`, `openingHoursSpec`) and booking slots to match
- [ ] **Team** names, titles, bios, credentials and headshots (`content/team.ts`, `public/team/`)
- [ ] **Founding story** and office/team photo (`app/(marketing)/about/page.tsx`)
- [ ] **Real testimonials** or Google reviews, with permission (`content/testimonials.ts`)
- [ ] **Trust-bar stats**: verified numbers only (`content/stats.ts`)
- [ ] **Social URLs**: LinkedIn, Facebook, Google Reviews (`siteConfig.socials`)
- [ ] **SMTP credentials** in Vercel env vars (rotate the Gmail App Password before launch)
- [ ] **Privacy Policy / Accessibility** "last updated" dates, plus a legal review of the privacy policy
- [ ] Bracketed FAQ / service answers (supported software, pricing approach, response time)

## Next steps for the client portal

Search for `TODO(portal)` to find each integration point.

1. **Authentication** with MFA (Auth.js, Clerk or Supabase Auth). Protect the `(portal)` group in `proxy.ts`.
2. **Secure file storage** with private buckets, signed URLs, malware scanning and audit logs (`app/api/documents`).
3. **Database** for clients, documents, booking requests and slot locking (`lib/data.ts`, `app/api/booking`).
4. **Client dashboard**: deadlines, filing status, messages, invoices and e-signature.
5. **Shared rate limiting** (Upstash Redis or Vercel KV) to replace the in-memory limiter.
