---
name: "DataSolace"
description: "A clear, assured, capable marketing system for owner-led small business process automation."
colors:
  brand-blue: "#1D2D46"
  brand-teal: "#029979"
  brand-green: "#04866E"
  brand-white: "#F2F5F5"
  white: "#FFFFFF"
  ink: "#171717"
  text-strong: "#111827"
  text-body: "#374151"
  text-muted: "#4B5563"
  border-muted: "#E5E7EB"
  field-border: "#D1D5DB"
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
    typography: "{typography.title}"
    rounded: "{rounded.md}"
    padding: "16px 32px"
  button-primary-hover:
    backgroundColor: "{colors.brand-green}"
    textColor: "{colors.white}"
    rounded: "{rounded.md}"
    padding: "16px 32px"
  button-compact:
    backgroundColor: "{colors.brand-teal}"
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
    textColor: "{colors.brand-teal}"
    rounded: "{rounded.sm}"
    padding: "4px 8px"
---

# Design System: DataSolace

## 1. Overview

**Creative North Star: "The Owner's Control Room"**

The DataSolace system should feel like a calm control room run by people who know the equipment, the workflow, and the client by name. The current visual language is built from a saturated deep blue field, crisp white content panels, practical teal actions, large Montserrat headings, and real project imagery. It is direct and legible first, with polish coming from confident contrast, spacing, and useful hierarchy.

This is a brand marketing system, not an app shell. Visitors should feel that DataSolace is technically capable and personally reachable, with a small-team advantage that larger consultancies and tool-first automation agencies cannot easily copy. The interface should stay boutique in the sense of being specific and owner-led, not decorative or precious.

The system explicitly rejects generic SaaS marketing, AI automation guru energy, no-code agency gloss, faceless corporate IT consultancy tone, and dull bookkeeping-software visuals. Any future redesign should preserve the practical blue-and-teal identity while removing legacy patterns that work against the brand, especially emoji-led calls to action, vague automation language, and low-substance spectacle.

**Key Characteristics:**
- Deep blue brand field with white panels for explanation and conversion.
- Teal actions used sparingly and consistently for the next useful step.
- Montserrat typography with heavy, direct headings and readable body copy.
- Rounded but restrained panels, cards, images, and inputs.
- Real process, infrastructure, documentation, and small-business imagery over abstract decoration.

## 2. Colors

The palette is a committed dark-blue identity with teal and green action colors, supported by white panels and neutral text for long-form readability.

### Primary

- **DataSolace Blue** (#1D2D46): The dominant brand field. Use for page backgrounds, header/footer chrome, dark hero sections, and high-trust surfaces.
- **Signal Teal** (#029979): The primary action and emphasis color. Use for buttons, active navigation, links, small highlights, and focused form states.

### Secondary

- **Assured Green** (#04866E): The hover and support accent for primary actions. Use as a state color or secondary emphasis, not as a competing primary.

### Neutral

- **Quiet White** (#F2F5F5): Brand off-white for footer text and soft support copy on dark surfaces.
- **Panel White** (#FFFFFF): The primary reading surface for service, blog, portfolio, and scheduling content.
- **Ink** (#171717): Root foreground and high-contrast text anchor.
- **Strong Text** (#111827): Headings and strong body text on white panels.
- **Body Text** (#374151): Default long-form text on white panels.
- **Muted Text** (#4B5563): Metadata, excerpts, and lower-emphasis content.
- **Soft Border** (#E5E7EB): Dividers and light separation in prose or legal pages.
- **Field Border** (#D1D5DB): Light-form field stroke on white panels.

### Named Rules

**The Blue Field Rule.** DataSolace Blue is the brand atmosphere. When a page needs immediate brand recognition, start from the blue field and place white or image-led content inside it.

**The Teal Means Action Rule.** Signal Teal should usually mean "this is clickable, active, focused, or important." Do not scatter it as decoration.

**The White Panel Rule.** Long explanations belong on Panel White. Large bodies of text should not sit directly on the blue field unless they are short, high-contrast, and part of a hero or CTA.

## 3. Typography

**Display Font:** Montserrat, with Arial and Helvetica fallbacks  
**Body Font:** Montserrat, with Arial and Helvetica fallbacks  
**Label/Mono Font:** Geist Mono exists in the project, but the public brand UI does not currently use it as a signature voice.

**Character:** The type system is single-family, geometric, and plain-spoken. It gets its authority from weight, scale, and spacing rather than decorative contrast.

### Hierarchy

- **Display** (700, `clamp(3.75rem, 7vw, 6rem)`, 1): Homepage-scale headlines and major marketing statements. Keep max size at or below 6rem.
- **Headline** (700, `clamp(3rem, 5vw, 3.75rem)`, 1.1): Page titles, section leads, and primary conversion blocks.
- **Title** (700, `1.5rem`, 1.25): Service names, card titles, form section headings, and key subheads.
- **Body** (400, `1rem`, 1.7): Long-form copy on white panels. Keep readable line lengths near 65 to 75 characters.
- **Large Body** (400 or 500, `1.125rem` to `1.25rem`, 1.6): Introductory page copy, hero support text, and short explanatory sections.
- **Label** (500, `0.875rem`, 1.4): Form labels, metadata, badges, categories, and compact navigation text. Use sentence case by default.

### Named Rules

**The Plain Speech Rule.** Use type to clarify, not to perform. Avoid all-caps body text, over-tight tracking, and ornamental font swaps.

**The One Family Rule.** Montserrat is currently the brand voice. Do not introduce new display faces unless a future redesign intentionally revisits the whole identity.

## 4. Elevation

The system uses a hybrid of tonal layering and shadows. The blue field creates the base depth, white panels sit above it, and shadows are reserved for cards, image previews, scheduling panels, and hoverable content. Glassy blur appears in the existing header and some dark form panels, but it should be used sparingly and only where it improves contrast or readability.

### Shadow Vocabulary

- **Panel High** (`box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25)`): Large white panels on the blue field, currently expressed with `shadow-2xl`.
- **Media Lift** (`box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)`): Image previews and product screenshots, currently expressed with `shadow-xl`.
- **Card Rest** (`box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`): Blog and portfolio cards, currently expressed with `shadow-lg`.
- **Card Hover** (`box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)`): Interactive cards on hover.

### Named Rules

**The Shadow Has a Job Rule.** Use shadow to separate content from the blue field or confirm interaction. Do not pair a decorative 1px border with a large soft shadow on the same card.

**The Glass Is Rare Rule.** Backdrop blur can support fixed navigation and dark-form readability. It should not become a general card style.

## 5. Components

### Buttons

- **Shape:** Rounded rectangle with restrained corners (`8px`).
- **Primary:** Signal Teal background (`#029979`), white text, medium-to-bold weight, usually `16px 32px` padding for major CTAs.
- **Hover / Focus:** Hover shifts to Assured Green (`#04866E`). Focus should use a clear visible ring or border treatment, not only color change.
- **Compact:** Header and inline buttons use smaller padding, but keep the same teal/green state model.
- **Legacy note:** Several current CTAs use emoji. Treat this as legacy decoration, not a pattern to extend.

### Chips

- **Style:** Teal text on a low-opacity teal background, usually `#0299791A`, with `4px` radius.
- **Use:** Categories, blog labels, and compact metadata. Keep them quiet and informational.

### Cards / Containers

- **Corner Style:** Large content panels use `16px`; media cards and smaller cards use `8px`.
- **Background:** White for primary reading surfaces. Dark translucent panels appear only on blue sections.
- **Shadow Strategy:** Large panels may use Panel High; interactive cards use Card Rest and Card Hover.
- **Border:** Light borders are appropriate for fields and legal/prose dividers. Avoid colored side stripes.
- **Internal Padding:** Use `48px` for major panels, `24px` to `32px` for cards, and reduce carefully on mobile.

### Inputs / Fields

- **Dark Form Style:** White text on translucent white fill (`rgba(255,255,255,0.2)`), white translucent border, `8px` radius, `12px 16px` padding.
- **Light Form Style:** White background, gray border, dark text, `8px` radius, `12px 16px` padding.
- **Focus:** Border shifts to Signal Teal. Add a visible focus ring in future polishing for keyboard users.
- **Placeholder:** Must stay readable, especially for older users. Avoid low-contrast placeholder text.
- **Error / Disabled:** Use clear text plus color. Disabled controls reduce opacity and show a disabled cursor.

### Navigation

- **Header:** Fixed top navigation on DataSolace Blue with 85 to 95 percent opacity, subtle backdrop blur, white links, and teal active/hover states.
- **Logo Lockup:** Logo image plus DataSolace wordmark, scaling from compact mobile to larger desktop sizes.
- **Desktop Nav:** Horizontal links with active page indicated by teal and semibold weight.
- **Mobile Nav:** Hamburger toggles a full-width dropdown under the fixed header. Preserve generous tap targets and clear active states.
- **Footer:** DataSolace Blue with a green top border, white/off-white text, and teal hover states.

### Image Cards

- **Style:** Real project and service images in `8px` rounded frames with object-cover cropping.
- **Behavior:** Interactive media cards may scale images slightly on hover. Keep the movement modest and respect reduced-motion preferences.
- **Use:** Prefer real project, service, infrastructure, documentation, and small-business operations imagery over abstract icons and decorative blocks.

### Prose

- **Style:** Long-form blog and policy content uses the global `.prose` rules: blue headings, teal links, readable line height, and light dividers.
- **Rule:** Prose should remain plain and useful. Avoid marketing cadence inside technical or legal content.

## 6. Do's and Don'ts

### Do:

- **Do** use DataSolace Blue (`#1D2D46`) as the main brand field for marketing pages.
- **Do** reserve Signal Teal (`#029979`) for links, CTAs, active states, and focused controls.
- **Do** keep body copy on white panels when explanations are long.
- **Do** use real imagery from services, projects, processes, documentation, customer feedback, and infrastructure when a section needs visual weight.
- **Do** write direct, owner-led copy that makes the personal service advantage visible.
- **Do** keep focus states, form labels, and placeholder text readable for older users.
- **Do** respect reduced-motion preferences for hover movement, card lifts, and menu transitions.

### Don't:

- **Don't** make the site feel like generic SaaS marketing: no vague automation claims, abstract diagrams, template hero sections, or inflated productivity language.
- **Don't** make it feel like an AI automation guru pitch: no magic-workflow claims, no hustle language, no replacing-staff spectacle.
- **Don't** make it feel like a no-code agency template: no walls of app logos, generic connector diagrams, or one-size-fits-all tool-stack claims.
- **Don't** make it feel like a corporate IT consultancy: no faceless enterprise language, stock business imagery, or claims that feel larger than the team.
- **Don't** make it feel like bookkeeping software: no flat administrative visuals or copy that makes process improvement feel like paperwork.
- **Don't** use emoji as the primary visual system for CTAs, headings, or service categories.
- **Don't** use gradient text, colored side-stripe borders, decorative glass cards, or repeated tiny uppercase section labels.
- **Don't** over-round cards or panels. Keep content panels at `16px` and standard cards/inputs at `8px` unless a specific component needs otherwise.
- **Don't** rely on color alone for active, focus, error, or disabled states.
