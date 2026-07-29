---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/components/ScrubHero.tsx"]
---

# Homepage — surface brief

Scope: `/` (src/app/page.tsx), hero section. Visitor mode: **Persuade**.

Audience & job: UK small business owner/operator, evaluating alongside running the business, older users included. Must grasp in seconds: this firm turns how my business actually runs into something calm and maintained, and I'd talk directly to the owners.

Action: primary CTA "Start a conversation" (`/#contact`); secondary "See what we automate" (`/services`).

Live hero copy: kicker "Small business process automation"; H1 "Automation shaped around your business."; support "Owner-led help with the admin slowing your team down."

Proof & evidence constraints: anonymised-only client work — no named clients, testimonials, metrics, client photography, or identifiable artefacts (PRODUCT.md Evidence on Hand). Proof is carried by the hero visual itself.

Chosen direction — **the scroll-driven transformation** (shipped June 2026, commit 13a6073): a video hero in which a wall of sticky notes and string is drawn into a screen and becomes a running automation workflow. The transformation *is* the proof, and the visitor's scroll drives the playhead. Deep blue ground, chiaroscuro desk scene, teal concentrated in the string, the screen glow, and the workflow wires. The full direction contract — thesis, mechanic, layouts, reduced-motion behaviour, asset encoding — lives at the top of `src/components/ScrubHero.tsx` and is the authority for any change.

Superseded direction: an earlier CSS/SVG "maintained process sheet" composition (paper scraps, handwritten annotations, owner chips). Retired along with its whole paper-artifact palette; do not revive. Historical handoff notes remain in `docs/design/homepage-hero-visual-handoff.md` for context only.

Anti-goals: no connector lines/diagrams, no floating word-chips, no app logos, no workflow cards, no implied real client, no invented numbers, no emoji, no second scroll-scrubbed animation elsewhere on the site.

States: overlay layout (`lg+` and aspect ≥ 7/5) pins the stage and scrubs the playhead across 260vh with copy over the dark left zone; stacked layout (phones, tall/narrow windows) puts the video panel above the copy with a wheel/touch scroll-lock that releases when the video completes. Reduced motion rests on the final frame with no scrub and no lock. Scrollbar and keyboard bypass the lock by design — those visitors simply skip the animation, and all meaning stays in the real copy beside it.

Below the hero: white capabilities section (2-column type-only grid, no cards or icons) → blue contact section with a glassy dark form panel. Alternating fields carry the page.

Out of scope: services, portfolio, blog, and appointments surfaces.
