---
name: "DataSolace"
description: "A clear, assured, capable marketing system for owner-led small business process automation."
colors:
  brand-blue: "#1D2D46"
  brand-teal: "#029979"
  brand-green: "#04866E"
  brand-teal-text: "#02735B"
  brand-green-dark: "#016450"
  brand-white: "#F2F5F5"
  white: "#FFFFFF"
  mint: "#9BE1D0"
  ink: "#171717"
  text-strong: "#111827"
  text-body: "#374151"
  text-muted: "#4B5563"
  border-muted: "#E5E7EB"
  field-border: "#D1D5DB"
  paper-torn: "#E9ECEC"
  paper-torn-ink: "#3D4A63"
  paper-sticky: "#E8E0B4"
  paper-sticky-ink: "#4A4630"
  sheet-meta: "#5D6B80"
  annotation-blue: "#B7C6E4"
  chip-system-bg: "#D8F5EF"
  chip-system-ink: "#00564A"
  chip-neutral-bg: "#EEF1F1"
  chip-neutral-ink: "#42506B"
typography:
  display:
    fontFamily: "Montserrat, Arial, Helvetica, sans-serif"
    fontSize: "clamp(3.75rem, 7vw, 6rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "normal"
  headline:
    fontFamily: "Montserrat, Arial, Helvetica, sans-serif"
    fontSize: "clamp(3rem, 5vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "normal"
  title:
    fontFamily: "Montserrat, Arial, Helvetica, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "normal"
  cta:
    fontFamily: "Montserrat, Arial, Helvetica, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "normal"
  body:
    fontFamily: "Montserrat, Arial, Helvetica, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  label:
    fontFamily: "Montserrat, Arial, Helvetica, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "normal"
  hand:
    fontFamily: "Kalam, cursive"
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: 1.375
    letterSpacing: "normal"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "64px"
  4xl: "80px"
components:
  button-primary:
    backgroundColor: "{colors.brand-teal}"
    textColor: "{colors.white}"
    typography: "{typography.cta}"
    rounded: "{rounded.md}"
    padding: "14px 24px"
  button-primary-hover:
    backgroundColor: "{colors.brand-green}"
    textColor: "{colors.white}"
    typography: "{typography.cta}"
    rounded: "{rounded.md}"
    padding: "14px 24px"
  button-compact:
    backgroundColor: "{colors.brand-green}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "8px 24px"
  button-compact-hover:
    backgroundColor: "{colors.brand-green-dark}"
    textColor: "{colors.white}"
    rounded: "{rounded.md}"
    padding: "8px 24px"
  panel-light:
    backgroundColor: "{colors.white}"
    textColor: "{colors.text-body}"
    rounded: "{rounded.xl}"
    padding: "48px"
  card-media:
    backgroundColor: "{colors.white}"
    textColor: "{colors.text-body}"
    rounded: "{rounded.md}"
    padding: "24px"
  input-dark:
    backgroundColor: "#FFFFFF33"
    textColor: "{colors.white}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
  chip-teal:
    backgroundColor: "#0299791A"
    textColor: "{colors.brand-teal-text}"
    rounded: "{rounded.sm}"
    padding: "4px 8px"
  process-sheet:
    backgroundColor: "{colors.white}"
    textColor: "{colors.text-body}"
    rounded: "{rounded.sm}"
    padding: "24px 28px"
---

# Design System: DataSolace

## 1. Overview

**Creative North Star: "The Owner's Control Room"**

The DataSolace system should feel like a calm control room run by people who know the equipment, the workflow, and the client by name. The current visual language is built from a saturated deep blue field, crisp white content panels, practical teal actions, large Montserrat headings, and real project imagery. It is direct and legible first, with polish coming from confident contrast, spacing, and useful hierarchy.

This is a brand marketing system, not an app shell. Visitors should feel that DataSolace is technically capable and personally reachable, with a small-team advantage that larger consultancies and tool-first automation agencies cannot easily copy. The interface should stay boutique in the sense of being specific and owner-led, not decorative or precious.

The homepage now leads with the brand's own proof: a maintained process sheet — a white paper artifact on the blue field, with scattered handwritten scraps behind it — showing the actual deliverable instead of an abstract workflow diagram. The document world it introduces (paper tones, handwritten annotations, owner chips, a single teal timeline rule) is a bounded extension of the control-room identity, not a second design system.

The system explicitly rejects generic SaaS marketing, AI automation guru energy, no-code agency gloss, faceless corporate IT consultancy tone, and dull bookkeeping-software visuals. Any future redesign should preserve the practical blue-and-teal identity while removing legacy patterns that work against the brand, especially vague automation language and low-substance spectacle.

**Key Characteristics:**
- Deep blue brand field with white panels for explanation and conversion.
- Teal actions used sparingly and consistently for the next useful step.
- Montserrat typography with heavy, direct headings and readable body copy.
- Rounded but restrained panels, cards, images, and inputs.
- Real process, infrastructure, documentation, and small-business imagery over abstract decoration — with the process sheet itself as the signature artifact.

## 2. Colors

The palette is a committed dark-blue identity with teal and green action colors, supported by white panels and neutral text for long-form readability. Action colors now split into surface duty (buttons, fills, rules) and text duty (darkened variants that clear 4.5:1 on white).

### Primary

- **DataSolace Blue** (#1D2D46): The dominant brand field. Use for page backgrounds, header/footer chrome, dark hero sections, and high-trust surfaces.
- **Signal Teal** (#029979): The primary action and emphasis color. Use for button fills, active navigation on the blue field, timeline rules, focus outlines, and small highlights. Never as text on white or light surfaces.

### Secondary

- **Assured Green** (#04866E): The hover state for primary teal actions, and the fill for the compact header button (white on #04866E holds 4.53:1, safe for small text).
- **Action Text Teal** (#02735B): Text-safe teal, ≥4.5:1 on white. Use for teal-coloured text and links on white or light surfaces.
- **Deep Action Green** (#016450): The darkest action step. Hover for prose links and for the compact green header button.

### Neutral

- **Quiet White** (#F2F5F5): Brand off-white for footer text and soft support copy on dark surfaces; also the tinted callout fill inside the process sheet.
- **Panel White** (#FFFFFF): The primary reading surface for service, blog, portfolio, and scheduling content.
- **Mint** (#9BE1D0): Light teal for small text on the blue field — the hero kicker and form success message on dark panels.
- **Ink** (#171717): Root foreground and high-contrast text anchor.
- **Strong Text** (#111827): Headings and strong body text on white panels.
- **Body Text** (#374151): Default long-form text on white panels.
- **Muted Text** (#4B5563): Metadata, excerpts, and lower-emphasis content.
- **Soft Border** (#E5E7EB): Dividers and light separation in prose or legal pages.
- **Field Border** (#D1D5DB): Light-form field stroke on white panels.

### Paper Artifact Palette

Intentional document-world colors, used only inside the hero's paper composition. They are quiet, desaturated, and slightly warm or cool so the paper reads as physical material against the blue field.

- **Torn Note** (#E9ECEC) with ink #3D4A63: the grey scrap of the old way.
- **Sticky Note** (#E8E0B4) with ink #4A4630: the yellowed reminder of the old way.
- **Sheet Meta** (#5D6B80): uppercase meta labels on the process sheet.
- **Margin Annotation** (#B7C6E4): the handwritten aside sitting on the blue field.
- **Owner Chips**: System = #D8F5EF fill / #00564A ink; Team and Office = #EEF1F1 fill / #42506B ink.

### Named Rules

**The Blue Field Rule.** DataSolace Blue is the brand atmosphere. When a page needs immediate brand recognition, start from the blue field and place white or image-led content inside it.

**The Teal Means Action Rule.** Signal Teal should usually mean "this is clickable, active, focused, or important." Do not scatter it as decoration.

**The Text-Safe Teal Rule.** Signal Teal (#029979) is a surface and fill color, never a text color on white or light surfaces. Teal-coloured text on light surfaces uses Action Text Teal (#02735B); prose links use Action Text Teal with Deep Action Green (#016450) on hover. On the blue field, plain teal text remains fine.

**The White Panel Rule.** Long explanations belong on Panel White. Large bodies of text should not sit directly on the blue field unless they are short, high-contrast, and part of a hero or CTA.

**The Paper Stays on the Sheet Rule.** The paper artifact palette belongs to the hero's document world. Do not promote scrap, sticky, or annotation colors into general UI chrome.

## 3. Typography

**Display Font:** Montserrat, with Arial and Helvetica fallbacks  
**Body Font:** Montserrat, with Arial and Helvetica fallbacks  
**Mono Font:** Geist Mono (`--font-geist-mono`), used for code in prose content.  
**Handwritten Font:** Kalam (`--font-hand`), 400 only — decorative annotations inside the hero's paper composition, never for UI or body copy.

**Character:** The type system is single-family, geometric, and plain-spoken. It gets its authority from weight, scale, and spacing rather than decorative contrast. Kalam is the one sanctioned outside voice: it plays "a human wrote on this" inside the document world and nowhere else.

### Hierarchy

- **Display** (700, `clamp(3.75rem, 7vw, 6rem)`, 1): Homepage-scale headlines and major marketing statements. Keep max size at or below 6rem.
- **Headline** (700, `clamp(3rem, 5vw, 3.75rem)`, 1.1): Page titles, section leads, and primary conversion blocks.
- **Hero H1** (700, stepped `2.5rem → 3rem → 3.5rem`, 1.05): The homepage hero headline steps below Display so the paper artifact keeps focal weight. This is a deliberate local step, not a new ramp tier.
- **Title** (700, `1.5rem`, 1.25): Service names, card titles, form section headings, and key subheads.
- **CTA** (700, `1.25rem`, 1.4): Primary call-to-action button text — hero CTAs, "Book an intro call", "Send message".
- **Body** (400, `1rem`, 1.7): Long-form copy on white panels. Keep readable line lengths near 65 to 75 characters.
- **Large Body** (400 or 500, `1.125rem` to `1.25rem`, 1.6): Introductory page copy, hero support text, and short explanatory sections.
- **Label** (500, `0.875rem`, 1.4): Form labels, metadata, badges, categories, and compact navigation text. Use sentence case by default.
- **Hand** (Kalam 400, `1.05rem` scraps / `1rem` margin note, snug): Handwritten annotations in the hero paper composition. Decorative only; always paired with real copy or an aria label.

### Document Micro-Type

Inside the process sheet only, a compressed ramp keeps the artifact reading as a real document:

- `0.8125rem` — sheet body: step descriptions, subtitle, revision line.
- `0.75rem` — exceptions callout.
- `0.6875rem` (600, uppercase, tracked) — meta labels ("Process sheet", "Maintained") and step numerals.
- `0.625rem` (600) — owner chips.

These sizes are for the document artifact, not for marketing or UI copy.

### Prose Ramp

Long-form `.prose` content uses its own smaller ramp: h1 `2rem`/700, h2 `1.5rem`/600, h3 `1.25rem`/600, body `1rem`/1.7. Headings and strong text take DataSolace Blue; muted text is #4B5563. Code uses Geist Mono on a light grey fill.

### Named Rules

**The Plain Speech Rule.** Use type to clarify, not to perform. Avoid all-caps body text, over-tight tracking, and ornamental font swaps.

**The One Family Rule.** Montserrat is the brand voice; Geist Mono is the code voice; Kalam exists solely as the handwritten annotation face inside the paper artifact. Do not introduce further faces, and do not let Kalam escape the document world.

## 4. Elevation

The system uses a hybrid of tonal layering and shadows. The blue field creates the base depth, white panels sit above it, and shadows are reserved for cards, image previews, scheduling panels, and hoverable content. Glassy blur appears in the existing header and some dark form panels, but it should be used sparingly and only where it improves contrast or readability.

### Shadow Vocabulary

- **Panel High** (`box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25)`): Large white panels on the blue field, currently expressed with `shadow-2xl`.
- **Media Lift** (`box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)`): Image previews and product screenshots, currently expressed with `shadow-xl`.
- **Card Rest** (`box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`): Blog and portfolio cards, and prose images, currently expressed with `shadow-lg`.
- **Card Hover** (`box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)`): Interactive cards on hover.
- **Sheet Lift** (`box-shadow: 0 18px 44px -12px rgba(7,17,31,0.55), 0 2px 6px rgba(7,17,31,0.25)`): The maintained process sheet on the blue field — an offset paper shadow, deeper and blue-tinted, never glossy.
- **Scrap Shadows** (`0 8px 20px -6px rgba(7,17,31,0.5)` torn note; `0 6px 16px -5px rgba(7,17,31,0.45)`): The muted paper scraps behind the sheet; shallower than Sheet Lift so the sheet clearly sits on top.

### Named Rules

**The Shadow Has a Job Rule.** Use shadow to separate content from the blue field or confirm interaction. Do not pair a decorative 1px border with a large soft shadow on the same card.

**The Glass Is Rare Rule.** Backdrop blur can support fixed navigation and dark-form readability. It should not become a general card style.

## 5. Components

### Focus

- **Global rule:** every focusable element gets `:focus-visible { outline: 2px solid var(--brand-teal); outline-offset: 2px; }` from the base layer — visible at ≥3:1 against both the blue field and white panels.
- **Dark translucent panels:** contact form fields, the checkbox, and the submit button override the outline to white (`focus-visible:outline-white`), as do the hero CTAs on the blue field.
- **Teal buttons on white:** the capabilities CTA uses a DataSolace Blue outline so the ring stays visible against the white section.
- **Rule:** the focus ring color adapts to the surface; the 2px width and 2px offset do not.

### Buttons

- **Shape:** Rounded rectangle with restrained corners (`8px`).
- **Primary:** Signal Teal background (`#029979`), white text at CTA type (`1.25rem`/700), `14px 24px` to `16px 32px` padding for major CTAs.
- **Hover / Focus:** Hover shifts to Assured Green (`#04866E`). Focus uses the global 2px outline, surface-adapted per the Focus rules above.
- **Secondary (hero):** Transparent with a `white/35` border and white text at CTA type; hover strengthens the border to `white/70` with a faint `white/5` fill. Dark-field use only.
- **Compact (header):** Assured Green background (`#04866E`) with Deep Action Green (`#016450`) hover, white semibold text at `0.875rem`–`1rem`, `8px 24px` padding at desktop. Green (not teal) because small button text needs 4.5:1 — white on #04866E holds 4.53:1.
- **Legacy note:** Emoji CTAs have been removed from the homepage. The ban stands: do not reintroduce emoji as CTA decoration anywhere.

### Chips

- **Style:** Low-opacity teal background, usually `#0299791A`, with `4px` radius and Action Text Teal (`#02735B`) text per the Text-Safe Teal Rule.
- **Use:** Categories, blog labels, and compact metadata. Keep them quiet and informational.
- **Hero trust chips:** On the blue field, small `1.5px` teal dot + `0.875rem` medium text in `brand-white/80` — a list, not pills.
- **Owner chips:** Document-world only — see the Process Sheet below.

### Cards / Containers

- **Corner Style:** Large content panels use `16px`; media cards and smaller cards use `8px`; the paper artifact uses `4px` (paper, not UI).
- **Background:** White for primary reading surfaces. Dark translucent panels appear only on blue sections.
- **Shadow Strategy:** Large panels may use Panel High; interactive cards use Card Rest and Card Hover; the process sheet uses Sheet Lift.
- **Border:** Light borders are appropriate for fields and legal/prose dividers. Avoid colored side stripes.
- **Internal Padding:** Use `48px` for major panels, `24px` to `32px` for cards, and reduce carefully on mobile.

### The Process Sheet (Signature Artifact)

The hero's maintained process sheet is the brand's proof object: a white document at `4px` corners under Sheet Lift, sitting above two rotated paper scraps, on the blue field.

- **Anatomy:** uppercase meta labels (Sheet Meta #5D6B80) → bold blue document title → muted subtitle → numbered step list → tinted exceptions callout (Quiet White fill, `3px` radius) → revision line above a Soft Border rule → handwritten margin annotation (#B7C6E4, Kalam) off the bottom edge.
- **The one teal thread:** a single `2px` vertical timeline rule at `brand-teal/70` connecting white step numerals ringed in 2px teal. Teal is concentrated here and in the revision-line check; nowhere else on the sheet.
- **Owner chips:** `0.625rem`/600 at `3px` radius — System in #D8F5EF/#00564A, Team and Office in #EEF1F1/#42506B.
- **Scraps:** torn note (#E9ECEC, clip-path torn edge, -6° rotation) and sticky note (#E8E0B4, +3° rotation), both carrying Kalam handwriting in their own ink colors.
- **Accessibility:** the whole composition is `role="img"` with a descriptive label; internals are `aria-hidden`.
- **Rule:** this is a composed artifact, not a card pattern. Reuse it deliberately (e.g., a services variant), never as a generic container.

### Inputs / Fields

- **Dark Form Style:** White text on translucent white fill (`rgba(255,255,255,0.2)`), `white/30` border, `8px` radius, `12px 16px` padding, `white/75` placeholder.
- **Light Form Style:** White background, gray border, dark text, `8px` radius, `12px 16px` padding.
- **Focus:** Border shifts to Signal Teal, and the focus-visible outline goes white on dark panels.
- **Placeholder:** Must stay readable, especially for older users. Avoid low-contrast placeholder text.
- **Error / Disabled:** Use clear text plus color. Disabled controls reduce opacity and show a disabled cursor. Form status messages sit in tinted bordered panels; success text on dark panels uses Mint (#9BE1D0).

### Navigation

- **Header:** Fixed top navigation on DataSolace Blue with 85 to 95 percent opacity, subtle backdrop blur, white links, and teal active/hover states. The compact "Contact Us" button uses the green compact style above.
- **Logo Lockup:** Logo image plus DataSolace wordmark, scaling from compact mobile to larger desktop sizes.
- **Desktop Nav:** Horizontal links with active page indicated by teal and semibold weight.
- **Mobile Nav:** Hamburger toggles a full-width dropdown under the fixed header. Preserve generous tap targets and clear active states.
- **Footer:** DataSolace Blue with a green top border, white/off-white text, and teal hover states.

### Sections (Homepage Rhythm)

- **Order:** blue hero → white capabilities section → blue contact section. Alternating fields carry the page; sections, not cards, do the structural work.
- **Capabilities:** headline + intro on white, then a 2-column grid of title/paragraph capability entries — no cards, icons, or borders. Type and spacing alone create the hierarchy, closing with one primary CTA.
- **Contact:** blue field, teal display headline, white large-body copy beside a glassy dark form panel (`white/10` fill, backdrop blur, `8px` radius, `32px` padding).

### Image Cards

- **Style:** Real project and service images in `8px` rounded frames with object-cover cropping.
- **Behavior:** Interactive media cards may scale images slightly on hover. Keep the movement modest and respect reduced-motion preferences.
- **Use:** Prefer real project, service, infrastructure, documentation, and small-business operations imagery over abstract icons and decorative blocks.

### Prose

- **Style:** Long-form blog and policy content uses the global `.prose` rules: blue headings, Action Text Teal links with Deep Action Green hover, readable line height, light dividers, and #4B5563 muted text.
- **Blockquote:** A quiet `1px` Signal Teal left rule with italic muted text — a hairline, not a colored side tab.
- **Code:** Geist Mono at `0.875rem` on a light grey fill.
- **Images:** `8px` radius with the Card Rest shadow.
- **Rule:** Prose should remain plain and useful. Avoid marketing cadence inside technical or legal content.

## 6. Do's and Don'ts

### Do:

- **Do** use DataSolace Blue (`#1D2D46`) as the main brand field for marketing pages.
- **Do** reserve Signal Teal (`#029979`) for CTA fills, active states, focused controls, and structural accents like the timeline rule.
- **Do** use Action Text Teal (`#02735B`) whenever teal appears as text on white or light surfaces, with Deep Action Green (`#016450`) on hover.
- **Do** keep body copy on white panels when explanations are long.
- **Do** use real imagery and real artifacts — the process sheet, documentation, projects, infrastructure — when a section needs visual weight.
- **Do** write direct, owner-led copy that makes the personal service advantage visible.
- **Do** keep focus states, form labels, and placeholder text readable for older users; every interactive element gets the 2px visible focus outline, adapted to its surface.
- **Do** respect reduced-motion preferences for hover movement, card lifts, and menu transitions.

### Don't:

- **Don't** set Signal Teal (`#029979`) as text on white or light surfaces — it fails 4.5:1; use Action Text Teal instead.
- **Don't** make the site feel like generic SaaS marketing: no vague automation claims, abstract diagrams, template hero sections, or inflated productivity language.
- **Don't** make it feel like an AI automation guru pitch: no magic-workflow claims, no hustle language, no replacing-staff spectacle.
- **Don't** make it feel like a no-code agency template: no walls of app logos, generic connector diagrams, or one-size-fits-all tool-stack claims.
- **Don't** make it feel like a corporate IT consultancy: no faceless enterprise language, stock business imagery, or claims that feel larger than the team.
- **Don't** make it feel like bookkeeping software: no flat administrative visuals or copy that makes process improvement feel like paperwork.
- **Don't** use emoji as the primary visual system for CTAs, headings, or service categories. (The last emoji CTAs were removed; keep it that way.)
- **Don't** let Kalam or the paper artifact palette leak out of the hero's document world into general UI.
- **Don't** use gradient text, colored side-stripe borders, decorative glass cards, or repeated tiny uppercase section labels — the sheet's own meta labels are document furniture, not a UI pattern.
- **Don't** over-round cards or panels. Keep content panels at `16px`, standard cards/inputs at `8px`, and paper artifacts at `4px` unless a specific component needs otherwise.
- **Don't** rely on color alone for active, focus, error, or disabled states.
