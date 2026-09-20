'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroAnimationProps {
  children: ReactNode;
  className?: string;
}

/**
 * Client animation component for the Hero (Server Component → Client
 * Animation Component pattern per spec Section 40).
 *
 * Orchestrates the complete cinematic sequence:
 *
 *   PHASE A  Hero entrance (auto-playing timeline, hierachical reveal)
 *   PHASE B  Hero pinned at the top of the viewport (short pin)
 *   PHASE C  Hero recedes (canvas translates up slightly + dims; transform +
 *            opacity only) — stable, subtle, one tween on one element
 *   PHASE D  FederationIntro rises from below and covers the hero (handled by
 *            the `.fed-cover` negative margin on FederationIntro)
 *
 * No cloud / fade / filter layers, no stacked tweens on the same element:
 * ScrollTrigger is the single source of truth and stays responsive via a small
 * scrub value.
 *
 * Respects `prefers-reduced-motion` (sequence skipped, content readable).
 * Desktop and mobile use different scroll distances / recede strength.
 */
const HeroAnimation = ({ children, className }: HeroAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    let mm: gsap.MatchMedia | undefined;
    let loadRefreshed = false;
    let rafId = 0;

    const refresh = () => ScrollTrigger.refresh();
    const onWindowLoad = () => {
      if (loadRefreshed) return;
      loadRefreshed = true;
      refresh();
    };

    const ctx = gsap.context(() => {
      // ---------- Initial states ----------
      // The canvas holds the bg + overlay + content, so it starts visible and
      // neutral; the entrance reveals the layers inside it (bg zoom/fade, text
      // stagger). Nothing here is re-assigned by the scroll timeline.
      gsap.set('[data-hero-canvas]', { opacity: 1, yPercent: 0, scale: 1 });
      gsap.set('[data-hero-bg]', { opacity: 0, scale: 1.18, yPercent: -8 });
      gsap.set('[data-hero-overlay]', { opacity: 0 });
      gsap.set('[data-hero-eyebrow]', { opacity: 0, y: 26 });
      gsap.set('[data-hero-title]', { opacity: 0, y: 72 });
      gsap.set('[data-hero-desc]', { opacity: 0, y: 32 });
      gsap.set('[data-hero-slogan]', { opacity: 0, y: 24 });
      gsap.set('[data-hero-cta]', { opacity: 0, y: 28 });
      gsap.set('[data-hero-scroll]', { opacity: 0 });
      gsap.set('[data-hero-detail]', { opacity: 0 });

      // ---------- PHASE A: cinematic entrance ----------
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.to('[data-hero-bg]', { opacity: 1, scale: 1, yPercent: 0, duration: 2.2 }, 0)
        .to('[data-hero-overlay]', { opacity: 1, duration: 1.6 }, 0.35)
        .to('[data-hero-eyebrow]', { opacity: 1, y: 0, duration: 1 }, 0.9)
        .to('[data-hero-title]', { opacity: 1, y: 0, duration: 1.2 }, 1)
        .to('[data-hero-desc]', { opacity: 1, y: 0, duration: 1 }, 1.3)
        .to('[data-hero-slogan]', { opacity: 1, y: 0, duration: 1 }, 1.45)
        .to('[data-hero-cta]', { opacity: 1, y: 0, duration: 1 }, 1.5)
        .to('[data-hero-detail]', { opacity: 1, duration: 1.2 }, 1.35)
        .to('[data-hero-scroll]', { opacity: 1, duration: 1 }, 1.9);

      // ---------- PHASES B–D: pinned scroll transition ----------
      // One scrubbed timeline per breakpoint, ONE tween on ONE element
      // ([data-hero-canvas]): the hero recedes slightly (translateY + opacity
      // only). FederationIntro then climbs from below and covers it via the
      // `fed-cover` negative margin, so no fade/cloud layer is needed. Scroll
      //Trigger owns the timing; scrub stays small so input feels immediate.
      mm = gsap.matchMedia();

      // Desktop
      mm.add('(min-width: 768px)', () => {
        const sttl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: '+=200%',
            scrub: 1,
            pin: true,
            // The Hero section is `display:flex`, which makes GSAP default
            // pinSpacing to `false` (no pin distance). Force it so the pinned
            // hero actually reserves its scroll room and `.fed-cover` can close
            // over it.
            pinSpacing: true,
            anticipatePin: 1,
          },
        });

        // Beat 1 (first half of the pin): hero recedes.
        // Beat 2 (last half): FederationIntro rises and covers it.
        sttl.to('[data-hero-canvas]', { yPercent: -8, opacity: 0.6, duration: 0.5 }, 0);
      });

      // Mobile: shorter pin, calmer recede, cover still lands clean.
      mm.add('(max-width: 767px)', () => {
        const sttl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: '+=140%',
            scrub: 1,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
          },
        });

        sttl.to('[data-hero-canvas]', { yPercent: -5, opacity: 0.7, duration: 0.3 }, 0);
      });

      // Recalculate pin Spacer/positions once layout + fonts are settled
      rafId = requestAnimationFrame(refresh);
      window.addEventListener('load', onWindowLoad);
    }, el);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('load', onWindowLoad);
      mm?.revert();
      ctx.revert();
    };
  }, []);

  return <div ref={containerRef} className={className}>{children}</div>;
};

export { HeroAnimation };