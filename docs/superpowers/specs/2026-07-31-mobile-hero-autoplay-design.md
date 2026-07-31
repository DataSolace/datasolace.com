# Mobile hero: autoplay instead of scroll-scrub

**Date:** 2026-07-31
**Status:** Approved

## Problem

The stacked (phone / tall-narrow window) hero drives the video playhead by
intercepting `wheel`/`touchmove` events and calling `preventDefault()`. Because
native scrolling never happens, the browser's momentum ("fling") physics never
engage: the instant a finger lifts, scrolling stops dead. This breaks the
standard mobile scroll feel. There is no browser API that supplies synthetic
post-touch momentum deltas, so the current paradigm cannot be fixed in place.

## Decision

Drop the scrub mechanic in the stacked layout. The video autoplays once and the
page scrolls natively.

Options considered:

1. **Native pinned scrub** — pin the mobile hero and scrub from real scroll
   position (as desktop does). Rejected by owner in favour of simpler feel.
2. **Synthetic inertia** — hand-rolled velocity/friction decay on `touchend`.
   Rejected: never matches platform feel; fling dies at the video/page boundary.
3. **Autoplay once (chosen)** — conventional mobile behaviour, page scroll is
   fully native.

## Design

- **Stacked layout** (phones and tall/narrow windows): remove the
  `wheel`/`touchstart`/`touchmove`/`touchend` scroll-lock entirely. When the
  video can play through (`readyState >= HAVE_ENOUGH_DATA` or the
  `canplaythrough` event), play it once at normal speed. It is already
  `muted playsInline`, so mobile autoplay policies permit it. No loop: it rests
  on its final frame (the "calm running system").
- **Mid-page arrival** (reload, anchor link): keep current behaviour — seek
  straight to the final frame, do not play.
- **Overlay layout** (desktop landscape, lg+ and aspect ≥ 7/5): unchanged —
  native pinned scroll-scrub stays.
- **Reduced motion**: unchanged — no playback, rest on final frame.
- Update the hero direction contract comment in `ScrubHero.tsx` to match.

## Verification

- `npm run check` (build + tsc) passes.
- Playwright-in-Docker at a phone viewport: video plays after load and ends on
  the final frame; page scrolls normally with no intercepted touch input.
