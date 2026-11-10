# Logo Concepts: Sanyagold & W O Oyebamiji CPA LLC

Logo proposals for client review, November 2026. **Nothing here is applied to the website.** The live site keeps its current logo until a concept is approved.

There are two independent firms with two concepts each, so the client can choose one per firm:

| Firm | Concept A | Concept B |
| --- | --- | --- |
| **Sanyagold Accounting, Advisory and Consulting Services** | **The Golden Line**: monoline S on a square grid with a champagne-gold centre stroke, plus spaced Garamond capitals in deep evergreen | **The Hallmark**: SG lettermark in an octagonal assay-style cartouche; the octagon also forms the O in the wordmark |
| **W O Oyebamiji CPA LLC** | **The Interlock**: two monoline squares (records + independent review) woven together, navy and brass | **The Seal**: WO monogram inside a double ring with the firm name set around it, oxblood and antique brass |

Start with each concept's **presentation board** (`presentation/…-presentation-board.png` or `.pdf`). It shows the primary logo, horizontal and stacked versions, symbol only, black, white-on-dark, grayscale, reversed, palette, typography, the concept, and mockups (business card, letterhead, company profile cover, website header).

## Folder structure

```
logo-concepts/
  Sanyagold/
    Concept-A-Abstract-Wordmark/
    Concept-B-Premium-Lettermark/
  W-O-Oyebamiji-CPA/
    Concept-A-Abstract-Wordmark/
    Concept-B-Premium-Lettermark/
  _source/            generator script + font files used to build every asset
```

Each concept folder contains:

| Folder | Contents |
| --- | --- |
| `vector/svg/` | Editable vector SVG for 4 arrangements (`horizontal`, `stacked`, `symbol`, `wordmark`) × 5 colourways (`full-color`, `reversed`, `black`, `white`, `grayscale`) |
| `vector/pdf/` | Editable vector PDF for the same 20 versions |
| `psd/` | Layered Photoshop file(s), one named layer per logo component plus a background |
| `png/transparent/` | Full-colour PNG, transparent background, 3000 px on the long edge |
| `png/white-background/` | Full-colour PNG on white |
| `png/black/`, `png/white/` | One-colour black / white PNGs, transparent |
| `jpg/` | High-resolution JPEG previews, including the presentation board |
| `presentation/` | Presentation board as SVG, PNG and vector PDF |
| `README.md` | Palette, typography, concept and usage guidelines |

## About the file formats

- **Vector artwork is genuine.** Every shape is built from exact geometry, and **all lettering is converted to outlines** from the actual font files, so the logos look identical on any computer without the fonts installed. All PDFs were checked and contain no embedded raster images; no SVG contains live text.
- **Adobe Illustrator (`.ai`) files were not created.** Native `.ai` files can't be produced in this environment, and renaming another format to `.ai` would be misleading. The **SVG and PDF files open directly in Illustrator as fully editable vector artwork**. To create `.ai` files, open the PDF or SVG in Illustrator and use *File → Save As → Adobe Illustrator (.ai)*.
- **The PSD files are genuine layered Photoshop documents**, verified by reading the layers back. Their layers are high-resolution raster (3000 px), as is normal for Photoshop. Use the SVG/PDF files whenever a vector logo is needed.

## Fonts

All fonts are open-source under the SIL Open Font License and free for commercial use: EB Garamond, Cormorant Garamond, Montserrat, Manrope, Playfair Display and Jost. The font files are included in `_source/fonts/`.

## Regenerating

The assets are produced by `_source/build-logos.mjs` (Node.js with `opentype.js`, `sharp`, `pdfkit`, `svg-to-pdfkit` and `ag-psd`). Changing a colour, spacing or proportion there and re-running it rebuilds every file consistently.
