# ORMA — Digital & Visual Studio

Sito di ORMA, studio creativo indipendente per l'hospitality (Sardegna).
Next.js 16 (App Router, Cache Components) · React 19 · TypeScript strict · Tailwind CSS 4 · Motion · Lucide.

Identità, palette, tipografia e linee guida: vedi [BRAND.md](BRAND.md).

## Avvio

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build di produzione
```

## Prima della pubblicazione (TODO)

1. **`src/content/site.ts`**: dominio ed email ufficiale (usata anche nella privacy policy). WhatsApp e social sono vuoti di proposito: compaiono solo se si compila il campo. La P.IVA (`owner.vatNumber`) compare nella privacy policy quando viene inserita.
2. **Ritratto**: metti la foto in `public/images/` e imposta `site.owner.portrait`.
3. **Bio**: completa il paragrafo in `src/components/featured/About.tsx`.
4. **Modulo contatti**: le richieste finiscono su un Google Sheet tramite `src/app/api/contact/route.ts` e lo script `scripts/google-sheets-contact.gs` (istruzioni nel commento in cima allo script). Imposta `GOOGLE_SHEETS_WEBHOOK_URL` e `GOOGLE_SHEETS_SECRET` in `.env.local` e sull'hosting. Senza queste variabili il modulo **non simula l'invio**: propone l'email già compilata e WhatsApp.
5. **Privacy policy**: `src/app/privacy/page.tsx` è completa (hosting Netlify, Google Sheets, conservazione 12 mesi, nessun cookie). Va rivista se si aggiungono analytics, cookie di terze parti o nuovi fornitori; aggiornare `LAST_UPDATED` a ogni modifica.
6. **Fotografie**: le foto del sito sono già locali in `public/images`; restano su Unsplash solo quelle dei progetti di esempio del portfolio (`src/content/images.ts`), da sostituire con fotografie proprie.

## Struttura

```
src/
  app/                 route, metadata, sitemap, robots, icona, immagine OG
    portfolio/[slug]/  casi studio (generati da content/portfolio.ts)
    privacy/
  components/
    common/            Header (menu accessibile), Footer, Logo, ArrowLink, SectionLabel, Year,
                       JSON-LD (WebSite, ProfessionalService, Service, FAQPage, Person, BreadcrumbList)
      motion/          primitive di animazione (Reveal, WordsReveal, Parallax, ImageReveal)
    featured/          le sezioni della homepage
  content/             tutti i testi e i dati (site, services, portfolio, faq, home, images)
  lib/                 joinClassNames (unione di classi condizionali)
```

I contenuti sono separati dai componenti: per aggiungere un progetto reale basta un nuovo elemento in `content/portfolio.ts` con `isConcept: false`.

## Evoluzioni previste

Pagine `/servizi/*` e landing SEO per servizio, blog e guide, versione inglese, testimonial reali, prenotazione di una call, analytics.
