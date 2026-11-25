# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

ORMA is the site of an independent creative studio (one professional, Sardinia) that makes websites, photography and video for independent hospitality: B&B, boutique hotels, agriturismi, villas. Brand, palette, typography, motion and photo art direction are in `BRAND.md`; read it before touching UI or copy.

Stack: Next.js 16 (App Router, `cacheComponents: true`, `partialPrefetching`), React 19, TypeScript strict, Tailwind CSS 4 (configured in `globals.css` via `@theme`/`@utility`, no tailwind config file), Motion (`motion/react`), Lucide icons. Not a git repository.

**Next.js 16 differs from older versions.** Per `AGENTS.md`, check the docs in `node_modules/next/dist/docs/` before writing framework code. Example: page `params` is a Promise, typed with the global `PageProps<"/route/[slug]">`.

## Commands

```bash
npm run dev      # dev server on 0.0.0.0:3000 (reachable from a phone on the LAN)
npm run build    # production build; also runs TypeScript
npm run lint     # eslint
npx tsc --noEmit # type check only
```

There are no tests. Verify changes with `npm run build` and the browser preview (`.claude/launch.json` → `orma-dev`).

## Architecture

- **Content is separate from components.** All copy and data lives in `src/content/` (`site.ts`, `services.ts`, `servicePages.ts`, `portfolio.ts`, `faq.ts`, `home.ts`, `images.ts`); components only render it. Edit copy there, not in JSX.
- **`src/content/site.ts` is the single config**: domain (`NEXT_PUBLIC_SITE_URL`), contact data, socials, `areaServed`, `nav`. Many values are still placeholders marked `TODO`; an empty string hides the related UI (WhatsApp, socials) and the related JSON-LD fields.
- **Layouts**: `src/app/layout.tsx` is the bare root (html, fonts, metadata, `MotionProvider`); every site page lives in the `src/app/(site)/` route group, whose layout adds Header and Footer. `src/app/not-found.tsx` sits outside the group, so the 404 has no navbar/footer (sand background, button back home).
- **Home** (`src/app/(site)/page.tsx`) is a stack of sections from `src/components/featured/sections/`. The Portfolio section is intentionally not mounted; see the comment in `page.tsx`.
- **Service pages** live at `/servizi/<slug>`: one folder per page in `src/app/(site)/servizi/`, all rendered by the shared template `src/components/featured/service-page/ServicePage.tsx` from `src/content/servicePages.ts`. Each page gets metadata, a canonical URL, and JSON-LD (`Service`, `BreadcrumbList`, `FAQPage`) through helpers in the same folder.
- **Portfolio** at `/portfolio/[slug]` is generated from `content/portfolio.ts`. Projects with `isConcept: true` render with `noindex` and are left out of `sitemap.ts`; setting `isConcept: false` makes them indexable automatically.
- **SEO plumbing** is in `src/app/`: `layout.tsx` (default metadata and title template `%s · ORMA`), `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, `icon.svg`. Structured data is built in `src/components/common/JsonLd.tsx`, a single `@graph` with stable `@id`s (`${site.url}/#studio`, `#founder`, `#<service-id>`) that other pages reference. `Person` is emitted only when `site.owner.isPlaceholder` is false.
- **Contact form**: `components/featured/contact/*` + `hooks/useContactForm.ts` + `models/contactFormModel.ts` → `POST /api/contact` (`src/app/api/contact/route.ts`) → Google Apps Script webhook (`scripts/google-sheets-contact.gs`) that writes to a Google Sheet. Env vars: `GOOGLE_SHEETS_WEBHOOK_URL`, `GOOGLE_SHEETS_SECRET` (see `.env.example`). Without them the form **must not fake a submission**: it falls back to a prefilled email and WhatsApp. Links like `/?servizio=<service-id>#contatti` preselect a service in the form (`ServiceFromQuery`).
- **Motion primitives** (`components/common/motion/primitives.tsx`): `Reveal`, `WordsReveal`, `Parallax`, `ImageReveal`, brand easing `ormaEase`. `MotionConfig reducedMotion="user"` is set globally. Animated headings put their text in the DOM once: no extra `sr-only` copy next to an `aria-hidden` one, because crawlers read that as duplicated text.
- **Header** (`components/common/Header.tsx`) is transparent over a dark hero only on paths listed in `pageStartsWithHeroImage`. Add new routes that open with a full-bleed dark hero there.

## Conventions

- Copy in Italian, **first person singular** (never agency "we"), with a direct and human tone. No promises of results, no empty superlatives, no invented clients, testimonials or stats.
- **Prices** (VAT excluded) are decided by the owner and defined once in `src/content/pricing.ts`: landing page up to 700 €, multipage site from 1.000 €, base SEO included in both. Photography, video and dedicated SEO/GEO work are always "Su preventivo" (`ON_QUOTE_LABEL`), never a number. `servicePrices` feeds the "Quanto costa" section of each service page (`pricing` in `servicePages.ts`), the package labels in home and the `Offer.priceSpecification` JSON-LD. `priceBands` are only the budget options the client picks in the contact form (`BUDGET_RANGES`). Never publish a new price without asking. The cost answers in the FAQs (`faq.ts`, `servicePages.ts`) are plain text: update them by hand when a band changes. Portfolio items are clearly labelled concepts until real projects exist.
- Internal links (hash anchors included) use `next/link`. Plain `<a>` only for `mailto:`/`tel:` and the skip link; external URLs go through `components/common/ExternalLink.tsx`.
- Folder roles: `src/hooks`, `src/models`, `src/lib`, `components/common` (shared UI), `components/featured` (page sections).
- Images: local files in `public/images` with descriptive kebab-case Italian names, preferably AVIF; every image has an Italian `alt`. Only portfolio concept photos still come from Unsplash (`remotePatterns` in `next.config.ts`). The hero uses a static JPEG import, because Turbopack can't build a blur placeholder from AVIF. Uncompressed originals are kept in `assets-originali/`, outside `public`.
- Layout utilities: `shell` (container), `section-y` (vertical rhythm), `eyebrow`, `serif-italic`, `grain`, `link-draw`. Asymmetric 12-column compositions, never three identical cards. One accent colour per view; terracotta is never a large background (use `clay` for text on light backgrounds).
- Before publishing, see the TODO list in `README.md` (real contact data, portrait, bio, form env vars, privacy policy text, own photography).
