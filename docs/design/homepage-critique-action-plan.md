# Homepage Critique Action Plan

Date: 2026-06-08

Source critique: `.impeccable/critique/2026-06-08T07-15-55Z__src-app-page-tsx.md`

Target file: `src/app/page.tsx`

## Current Direction

The homepage should pivot from mixed business/home automation to a clearer small-business process automation pitch. The goal is to make DataSolace feel like an owner-led partner for practical workflow improvement, systems integration, documentation, and operational automation.

Initial scope:

1. Tackle hero trust and positioning first.
2. Keep the first implementation pass to the top three issues.
3. Handle the remaining issues after incremental improvements start landing.

Tone direction:

- Use a blend of **owner-led and practical** plus **boutique and personal**.
- Avoid making the page feel corporate, flashy, generic SaaS, no-code agency, or AI automation guru.
- Keep the existing DataSolace blue/teal identity and build credibility through clearer copy, proof, and more intentional hierarchy.

## Top Three Issues

### 1. Hero Trust And Positioning

Severity: P1

Problem:

The current hero, "Automate Your..." with "Business" and "Life," explains a broad category but not the DataSolace advantage. With the new direction, it should make small-business process automation clear immediately.

Why it matters:

Small business owners and operators need to understand that DataSolace can untangle messy processes, connect fragmented tools, reduce repeated admin, and do it through a direct owner-led relationship.

Fix direction:

- Replace the vague category headline with a specific small-business process automation promise.
- Make owner access and practical workflow understanding visible in the first viewport.
- Make the primary CTA consultation-led.
- Show that DataSolace starts with the process before prescribing tools.

Likely command:

`$impeccable bolder src/app/page.tsx`

### 2. Emoji-Led Marketing Undermines Trust

Severity: P1

Problem:

Emoji are currently used in headings, CTAs, and feature bullets. That makes the page feel template-generated and less serious than the operational problems DataSolace should solve.

Why it matters:

The revised pitch should speak to real small-business friction: manual handoffs, repeated admin, scattered information, unreliable processes, and tool sprawl. The visual language needs to feel clear, assured, and capable.

Fix direction:

- Remove emoji from the hero, headings, buttons, and lists.
- Replace them with copy, layout, restrained emphasis, and real process/infrastructure imagery.
- Use icons only where they clarify an action or navigation pattern.

Likely command:

`$impeccable clarify src/app/page.tsx`

### 3. Contact Form Needs Reassurance And Accessibility

Severity: P1

Problem:

The form works technically, but it does not yet reassure visitors at the point where they are about to describe business operations, internal processes, tool problems, or sensitive workflow details. It also needs stronger accessible labeling and status handling.

Why it matters:

This is the highest-trust interaction on the homepage. A cautious business owner should know what happens next, how their details are handled, and how to recover if submission fails.

Fix direction:

- Add `htmlFor`/`id` label associations.
- Add visible focus rings, not only border-color changes.
- Add `aria-live` status messaging.
- Add response-time and privacy reassurance near the form.
- Add a fallback contact route in the error state.

Likely command:

`$impeccable harden src/app/page.tsx`

## Remaining Issues To Keep In Mind

### Page Hierarchy Repeats Instead Of Progressing

Severity: P2

The current page repeats broad category claims instead of building proof. With the new direction, the scroll journey should move from process pain, to what DataSolace improves, to how the owner-led working relationship reduces risk.

Future fix:

- Replace generic feature blocks with proof-oriented sections.
- Show examples of processes DataSolace can improve.
- Explain how DataSolace maps a workflow before automating it.
- Include one or two concrete small-business scenarios.

Likely command:

`$impeccable layout src/app/page.tsx`

### CTA Architecture Is Split

Severity: P2

The homepage currently has several competing conversion paths: Contact, Appointments, Learn More, Automate My Business, Automate My Home, and Send.

Future fix:

- Choose one primary homepage conversion path, likely a process automation consultation.
- Use contact as a supporting path.
- Align CTA labels around the same intent.

Likely command:

`$impeccable distill src/app/page.tsx`

### Minor Observations

- Teal on brand blue is acceptable for large headings but not for normal body text.
- "Luxury home automation" should be removed from homepage-facing copy and metadata if the pivot is confirmed.
- "Life" should be removed from the homepage framing.
- Footer social links may weaken trust if the channels are thin or inactive.
- Structured data still uses language like "Transform," "cutting-edge," "luxury," and "bespoke."
- The contact section currently starts with a home-only prompt and should be rewritten around process automation enquiries.

## Hero Tone Directions

These are not final copy. They show the difference between the two tone directions and a recommended blend for the small-business process automation pivot.

### Option A: Owner-Led And Practical

Headline:

> Practical process automation for small businesses that have outgrown manual work.

Supporting copy:

> DataSolace maps the way your business actually runs, then builds automation, documentation, and connected systems around the real process. You work directly with the owners, not a sales layer.

Primary CTA:

> Book a process consultation

Secondary CTA:

> See what we automate

Why it works:

- Most direct.
- Strongest operational trust signal.
- Clear fit for cautious business owners and operators.
- Less boutique, more process-focused.

### Option B: Boutique And Personal

Headline:

> Automation shaped around the way your business really works.

Supporting copy:

> We work closely with small teams that want calmer operations without a distant provider relationship. Every project starts with a direct conversation about the admin, handoffs, and routines that need to feel easier to run.

Primary CTA:

> Start a conversation

Secondary CTA:

> Explore services

Why it works:

- Warmer and more personal.
- Better at explaining the small-team advantage.
- Slightly softer on technical capability unless the next section supplies proof.

### Option C: Recommended Blend

Headline:

> Practical automation for the processes your small business runs on.

Supporting copy:

> DataSolace helps owner-led teams turn repeated admin, scattered tools, and fragile handoffs into clear, reliable systems. You work directly with the people designing the automation, from first conversation to ongoing support.

Primary CTA:

> Book a process automation consultation

Secondary CTA:

> See how we work

Why it works:

- Keeps the practical value clear.
- Makes the personal owner-led service explicit.
- Avoids corporate consultancy language.
- Avoids AI automation guru and no-code agency language.
- Gives us a better base for a small-business process automation homepage.

## First Implementation Pass

Recommended order:

1. Rewrite and restructure the hero using the blended small-business process automation direction.
2. Remove emoji from hero-level copy and CTAs.
3. Make the primary CTA consultation-led and secondary CTA proof/process-led.

The contact form accessibility and reassurance issue is still P1, but it can be the second implementation pass if we want the first pass to stay tightly focused on first impression and positioning.

## Success Criteria

After the first pass, the homepage hero should:

- Explain small-business process automation without vague automation hype.
- Make the owner-led service model visible.
- Speak to manual admin, scattered tools, repeated handoffs, and fragile routines.
- Use one clear primary next step.
- Avoid emoji, generic SaaS phrasing, AI automation guru language, no-code agency gloss, and corporate consultancy tone.
- Feel clear, assured, capable, boutique, practical, and personal.
