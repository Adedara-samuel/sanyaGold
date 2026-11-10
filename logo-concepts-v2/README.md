# Logo Concepts v2: Emblem Directions

Second-round logo proposals for client review, November 2026. These are **richer emblem designs that tell each firm's story**, following feedback that the first round (`../logo-concepts/`, kept unchanged for comparison) was too simple.

**Nothing here is applied to the website.** The live site keeps its current logo until a concept is approved.

| Firm | Concept A | Concept B |
| --- | --- | --- |
| **Sanyagold Accounting, Advisory and Consulting Services** | **The Six-Facet Gold**: a hexagonal cut-gold emblem whose six facets stand for the six services, meeting at an evergreen centre (the client) | **The Ledger S**: a circular emblem of fine ledger lines with a bold gold S running through them |
| **W O Oyebamiji CPA LLC** | **The Assurance Crest**: a double-keyline shield holding a navy W and brass O monogram, with CPA beneath | **The Practice Seal**: the firm name on the top arc, *Tax · Audit · Attestation* upright on the bottom, WO / CPA at the centre |

Every lockup also states what the firm does:

- **Sanyagold:** "Accounting, Advisory and Consulting Services" plus the service line "Bookkeeping · Payroll · HR · Business Advisory".
- **W O Oyebamiji CPA LLC:** "CPA LLC" plus "Tax · Audit · Attestation".

Start with each concept's **presentation board** in `presentation/` (PNG or PDF).

## Folder structure

```
logo-concepts-v2/
  Sanyagold/
    Concept-A-Faceted-Emblem/
    Concept-B-Ledger-Emblem/
  W-O-Oyebamiji-CPA/
    Concept-A-Assurance-Crest/
    Concept-B-Practice-Seal/
  _source/            generator script + font files used to build every asset
```

Each concept folder contains:

| Folder | Contents |
| --- | --- |
| `vector/svg/`, `vector/pdf/` | Editable vector files: 4 arrangements (`horizontal`, `stacked`, `symbol`, `wordmark`) × 5 colourways (`full-color`, `reversed`, `black`, `white`, `grayscale`) |
| `psd/` | Layered Photoshop file(s) with one named layer per logo component |
| `png/transparent/`, `png/white-background/`, `png/black/`, `png/white/` | 3000 px PNG exports |
| `jpg/` | High-resolution JPEG previews, including the presentation board |
| `presentation/` | Presentation board as SVG, PNG and vector PDF |
| `README.md` | Palette, typography, concept and usage guidelines |

## File formats

- **Genuine vector artwork.** All lettering is converted to outlines. All 84 PDFs were checked and contain no embedded raster images; no SVG contains live text.
- **No native Adobe Illustrator (`.ai`) files.** They can't be generated here, and renaming another format would be misleading. The SVG and PDF files open in Illustrator fully editable; use *Save As → Adobe Illustrator (.ai)* to create them.
- **PSD files are genuine layered Photoshop documents** (high-resolution raster layers, verified by reading the layers back).
- **Fonts** are open-source (SIL OFL) and free for commercial use: EB Garamond, Cormorant Garamond, Playfair Display, Montserrat, Manrope and Jost. They're included in `_source/fonts/`.
