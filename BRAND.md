# ORMA — Brand & Design System

## Concept creativo

**Ogni luogo lascia un'orma.**
Un'orma è il segno che resta dopo un passaggio: un ricordo, un'atmosfera, una traccia. ORMA aiuta le strutture ricettive indipendenti a trasformare identità, spazi ed esperienze in una presenza digitale che lascia il segno, a partire dal primo sguardo di un futuro ospite su uno schermo.

- **Posizionamento**: studio creativo indipendente che aiuta l'ospitalità indipendente a trasformare identità, spazi ed esperienze in esperienze digitali riconoscibili.
- **Payoff**: *Il segno che resta.*
- **Descriptor**: Digital & Visual Studio · Hospitality
- **Tono**: diretto, umano, preciso. Prima persona singolare (uno studio guidato da un professionista, mai "noi" da agenzia). Nessuna promessa di risultati, nessun superlativo vuoto.

### Brand story (versione breve)
Una terrazza nell'ora in cui la luce cambia colore. Il profumo della colazione in un cortile di pietra. Chi fa ospitalità lo sa: non si offre soltanto una camera, si offre il ricordo di un luogo. Quel ricordo inizia molto prima del check-in, su uno schermo. ORMA nasce per dare forma a quel momento.

## Logo

Sistema tipografico: la **O-impronta** seguita da `RMA` in Instrument Serif spaziato (+14%).
La O è un anello ellittico a spessore variabile, più pieno in basso a sinistra, come la traccia lasciata da una pressione: astratto, nessun riferimento turistico (niente onde, palme, sagome dell'isola).

| Variante | Uso | File |
|---|---|---|
| Wordmark | header, documenti, proposte | `src/components/ui/Logo.tsx` → `<Logo />` |
| Wordmark + descriptor | presentazioni, firma email | `<Logo withDescriptor />` |
| Simbolo (O-impronta) | favicon, avatar social, watermark video/foto | `<OrmaMark />`, `src/app/icon.svg` |
| Monumentale | footer, copertine | wordmark tagliato al 8% di opacità |

Colori ammessi: Charcoal su Ivory, Ivory su Deep Forest, Terracotta solo per il simbolo isolato.

## Palette

| Token | Hex | Ruolo |
|---|---|---|
| `ivory` | #F5F1E9 | fondo principale |
| `paper` | #FAF9F6 | fondi secondari, testo su scuro |
| `sand` | #D8CCBA | accenti chiari, corsivi su scuro |
| `stone` | #B7AD9F | neutro di supporto |
| `olive` | #565D45 | grafiche (curve di livello) |
| `forest` | #27352D | sezioni scure |
| `forest-deep` | #1B251F | footer, menu, hero dei casi studio |
| `terracotta` | #B96F52 | accento grafico (linee, nodi, focus) |
| `clay` | #97553B | terracotta accessibile per testo su chiaro (AA) |
| `ink` | #242421 | testo |
| `ink-soft` | #57564F | testo secondario (≥ 6:1 su ivory) |

Regola: un solo accento per vista. Il terracotta non diventa mai un fondo esteso.

## Tipografia

- **Instrument Serif** (display, regular + italic): titoli, numeri, citazioni. Il corsivo segna la parola che conta.
- **Instrument Sans** (variabile): testi, UI, etichette.
- Entrambe SIL Open Font License, caricate con `next/font` (self-hosting, `display: swap`, nessun CLS).

Scala fluida (`globals.css → @theme`): `text-display`, `text-h1`, `text-h2`, `text-h3`, `text-lead`, `eyebrow`.

## Layout

- Container `shell`: max 1560px, gutter `clamp(1.25rem, 4vw, 4rem)`.
- Griglia 12 colonne, composizioni asimmetriche (7/4, 5/6, 4/6…), mai tre card uguali.
- Ritmo verticale `section-y`: `clamp(5.5rem, 12vw, 11rem)`.
- Proporzioni immagini: 4/5 (ritratto), 3/4, 4/3, 16/10, 21/10 (panoramica).
- Bordi: filetti da 1px a bassa opacità; pulsanti pill, target minimo 48px.

## Fotografia (art direction)

Luce naturale radente (alba, golden hour), materiali veri (pietra, legno, lino, intonaco), architettura e dettagli prima delle persone, persone come gesti più che come pose. Niente HDR, niente grandangoli deformanti, niente stock "resort tropicale".
Le foto del sito sono file locali in `public/images`. Restano su Unsplash, provvisorie, solo quelle dei progetti di esempio del portfolio: sostituirle con shooting reali in `src/content/images.ts`.

## Motion

Motion for React. Easing di marca `cubic-bezier(0.22, 1, 0.36, 1)` (un gesto che si posa).

- Titoli: parole che emergono da una maschera (`WordsReveal`).
- Immagini: tenda verticale (`ImageReveal`), parallasse leggera (`Parallax`).
- Metodo: un sentiero che si disegna con lo scroll.
- Hover: zoom lento (1.6s) delle immagini, freccia che scorre.
- `MotionConfig reducedMotion="user"`: con riduzione del movimento attiva restano solo le dissolvenze.

## Iconografia e grafiche

Lucide con tratto sottile (1.3–1.6). Elementi grafici propri: filetti, numerazioni editoriali (`01 —`), curve di livello astratte, coordinate solo nella sezione territorio.
