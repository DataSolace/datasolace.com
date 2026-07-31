'use client';

/*
 * HERO DIRECTION CONTRACT
 * THESIS: The transformation IS the proof. The hero shows DataSolace's promise
 * literally: a wall of sticky notes and string — the customer's real, fragile
 * process — is drawn into a screen and becomes a running automation workflow.
 * OWN-WORLD: Deep blue ground (#1D2D46), chiaroscuro desk scene, teal (#029979)
 * concentrated in the string, the screen glow, and the workflow wires.
 * STORY: An owner recognises their own note-covered wall, then watches it become
 * a calm system that runs itself — and understands what "we build and keep it
 * running" means without reading a word.
 * MECHANIC:
 *  - Landscape desktop (lg+, aspect >= 7/5): the video never autoplays; the
 *    visitor's scroll drives it. CSS-pinned stage, scroll scrubs the playhead
 *    across 260vh of travel. Copy overlays the dark left zone.
 *  - Phones and tall/narrow windows: a normal unpinned page (real next section
 *    visible below the hero, native scrolling and momentum untouched). The
 *    video plays once by itself as soon as it can play through, then rests on
 *    its final frame. The poster here is the FINAL frame, not the first: if
 *    autoplay is blocked (Brave Shields etc., detected via play() rejection)
 *    the visitor must see the finished system, never the messy wall. When
 *    playback is allowed it simply starts from the top and replaces the
 *    poster. Arriving mid-page (reload, anchor link) skips playback and lands
 *    on the finished system.
 * Reduced motion: no scrub, no lock — the video rests on its final frame.
 * ASSETS: /hero/hero-desktop.mp4 (1080p) and /hero/hero-mobile.mp4 (720p),
 * all-but-keyframe encoded (g=2) for frame-accurate scrubbing; poster jpgs for
 * instant first paint — hero-poster.jpg (first frame, desktop scrub) and
 * hero-poster-end.jpg (final frame, stacked autoplay/blocked-autoplay).
 * Masters live in assets-src/hero/.
 */

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';

const VIDEO_DESKTOP = '/hero/hero-desktop.mp4';
const VIDEO_MOBILE = '/hero/hero-mobile.mp4';
const POSTER = '/hero/hero-poster.jpg';
const POSTER_END = '/hero/hero-poster-end.jpg';
const VIDEO_ALT =
  'A wall of sticky notes is drawn into a monitor and becomes a running automation workflow as you scroll';

function Ctas() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Link
        href="/#contact"
        className="bg-[var(--brand-teal)] hover:bg-[var(--brand-green)] text-white px-6 py-3.5 rounded-lg text-xl font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        Start a conversation
      </Link>
      <Link
        href="/services"
        className="text-white border border-white/35 hover:border-white/70 hover:bg-white/5 px-6 py-3.5 rounded-lg text-xl font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        See what we automate
      </Link>
    </div>
  );
}

function HeroCopyBlock({ compact }: { compact?: boolean }): ReactNode {
  return (
    <>
      <p className={`text-sm font-medium tracking-wide text-[#9BE1D0] ${compact ? 'mb-3' : 'mb-5'}`}>
        Small business process automation
      </p>
      <h1
        className={
          compact
            ? 'text-[2.5rem] lg:text-6xl leading-[1.05] font-bold text-white mb-3 text-balance'
            : 'text-5xl md:text-[3.5rem] leading-[1.05] font-bold text-white mb-6 text-balance'
        }
      >
        Automation shaped around your business.
      </h1>
      <p
        className={
          compact
            ? 'text-base lg:text-xl leading-relaxed text-[var(--brand-white)]/85 max-w-[46ch]'
            : 'text-lg md:text-xl leading-relaxed text-[var(--brand-white)]/85 mb-9 max-w-[40ch]'
        }
      >
        Owner-led help with the admin slowing your team down.
      </p>
    </>
  );
}

export default function ScrubHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  /* overlay: copy over a full-bleed pinned video — wide, landscape-ish windows.
     stacked: video panel above the copy — phones AND tall/narrow windows,
     where object-cover on a full-height stage would crop the scene away.
     null (server render + first client frame): both blocks render, CSS-gated
     by width, without video elements. */
  const [layout, setLayout] = useState<'overlay' | 'stacked' | null>(null);
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const mqWide = window.matchMedia('(min-width: 1024px)');
    const mqLandscape = window.matchMedia('(min-aspect-ratio: 7/5)');
    const update = () => {
      setWide(mqWide.matches);
      setLayout(mqWide.matches && mqLandscape.matches ? 'overlay' : 'stacked');
    };
    update();
    mqWide.addEventListener('change', update);
    mqLandscape.addEventListener('change', update);
    return () => {
      mqWide.removeEventListener('change', update);
      mqLandscape.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!wrap || !video) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      wrap.style.setProperty('--scrub', '1');
      const toEnd = () => {
        if (video.duration) video.currentTime = video.duration;
      };
      if (video.readyState >= 1) toEnd();
      else video.addEventListener('loadedmetadata', toEnd, { once: true });
      return;
    }

    /* Stacked modes: plain page, video plays itself once (see contract above). */
    if (layout === 'stacked') {
      const toEnd = () => {
        if (video.duration) video.currentTime = video.duration - 0.05;
      };

      /* Arriving mid-page (reload, anchor link): land on the finished system. */
      if (window.scrollY > 4) {
        if (video.readyState >= 1) toEnd();
        else video.addEventListener('loadedmetadata', toEnd, { once: true });
        return () => video.removeEventListener('loadedmetadata', toEnd);
      }

      /* Wait until a full uninterrupted play is likely, so slow connections see
         the poster and then one clean run rather than a stuttering start. */
      const play = () => {
        video.play().catch(() => {
          /* Autoplay blocked (Brave Shields etc.): rest on the final frame,
             matching the end-state poster already on screen. */
          toEnd();
        });
      };
      if (video.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) play();
      else video.addEventListener('canplaythrough', play, { once: true });
      return () => video.removeEventListener('canplaythrough', play);
    }

    /* Overlay mode: classic pinned scrub across the wrapper's extra height. */
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = wrap.getBoundingClientRect();
        const scrollable = rect.height - window.innerHeight;
        if (scrollable <= 0) return;
        const p = Math.min(1, Math.max(0, -rect.top / scrollable));
        wrap.style.setProperty('--scrub', String(p));
        if (video.duration) video.currentTime = p * (video.duration - 0.05);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [layout, wide]);

  const videoSrc = wide ? VIDEO_DESKTOP : VIDEO_MOBILE;
  const pinned = layout !== 'stacked';
  const showOverlay = layout === 'overlay' || layout === null;
  const showStacked = layout === 'stacked' || layout === null;

  return (
    <div
      ref={wrapRef}
      className={pinned ? 'relative h-[260vh] bg-[var(--brand-blue)]' : 'relative bg-[var(--brand-blue)]'}
    >
      <div className={pinned ? 'sticky top-0 h-screen overflow-hidden' : 'relative overflow-hidden'}>
        {/* Overlay: full-bleed video, copy left in the dark clarity zone */}
        {showOverlay && (
          <div className={layout === null ? 'hidden lg:block absolute inset-0' : 'absolute inset-0'}>
            {layout === 'overlay' && (
              <video
                ref={videoRef}
                src={videoSrc}
                poster={POSTER}
                muted
                playsInline
                preload="auto"
                aria-label={VIDEO_ALT}
                className="absolute inset-0 w-full h-full object-cover object-left"
              />
            )}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-[var(--brand-blue)] via-[var(--brand-blue)]/40 to-transparent"
            />
            <div className="relative h-full max-w-6xl mx-auto px-6 flex items-center">
              <div className="max-w-xl">
                <HeroCopyBlock />
                <Ctas />
              </div>
            </div>
          </div>
        )}

        {/* Stacked: video panel on top, copy below, real page continues under */}
        {showStacked && (
          <div className={layout === null ? 'lg:hidden flex flex-col' : 'flex flex-col'}>
            <div
              className="relative w-full overflow-hidden flex-shrink-0"
              style={{ height: wide ? '52vh' : '48vh' }}
            >
              {layout === 'stacked' && (
                <video
                  ref={videoRef}
                  src={videoSrc}
                  poster={POSTER_END}
                  muted
                  playsInline
                  preload="auto"
                  aria-label={VIDEO_ALT}
                  className="w-full h-full object-cover"
                />
              )}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-[var(--brand-blue)]"
              />
            </div>
            <div
              className={
                wide
                  ? 'flex flex-col w-full max-w-2xl mx-auto px-6 pt-8 pb-10'
                  : 'flex flex-col w-full max-w-2xl mx-auto px-6 pt-4 pb-8'
              }
            >
              <HeroCopyBlock compact />
              <div className={wide ? 'mt-8' : 'mt-6'}>
                <Ctas />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
