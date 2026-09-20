'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useReducedMotion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SceneContent {
  index: string;
  label: string;
  headline: string;
  copy: string;
  meta: string;
  showImage?: boolean;
  cta?: {
    label: string;
    href: string;
    variant: 'primary' | 'outline';
  }[];
}

/**
 * Editorial storytelling content for the pinned documentary sequence.
 *
 * FACT vs EDITORIAL:
 *  - Scene 04 references ajang (Piala Gubernur, eksibisi esports PON/Porprov)
 *    which are factual events documented publicly (KONI Jawa Barat).
 *  - No fabricated statistics, names, officials, history, or vision/mission claims.
 *  - Everything else is safe, general editorial language about pembinaan,
 *    ekosistem, atlet, kompetisi, dan prestasi sebagai nilai olahraga.
 */
const SCENES: SceneContent[] = [
  {
    index: '01',
    label: 'The Federation',
    headline: 'WHERE ESPORTS\nBECOMES SPORT.',
    copy: 'ESI Jawa Barat adalah organisasi olahraga esports resmi tingkat provinsi yang menaungi pembinaan dan pengembangan esports sebagai cabang olahraga di Jawa Barat.',
    meta: 'PENGURUS PROVINSI · ESPORTS INDONESIA · JAWA BARAT',
  },
  {
    index: '02',
    label: 'The Ecosystem',
    headline: 'MEMBANGUN\nEKOSISTEM BERSAMA',
    copy: 'Atlet, pelatih, komunitas, dan penyelenggara ajang tumbuh dalam satu ekosistem yang saling memperkuat — dari akar rumput hingga tingkat nasional.',
    meta: 'KOMUNITAS · PELATIH · ATLET · PENYELENGGARA',
  },
  {
    index: '03',
    label: 'The Athletes',
    headline: 'MEMBINA ATLET,\nMEMBENTUK KARAKTER',
    copy: 'Pembinaan esports bukan sekadar kemenangan. Ia menanamkan kedisiplinan, kerja sama tim, dan ketangguhan mental — nilai-nilai yang membentuk atlet sesungguhnya.',
    meta: 'PEMBINAAN · KEDISIPLINAN · KERJA SAMA',
    showImage: true,
  },
  {
    index: '04',
    label: 'The Competition',
    headline: 'AJANG MEMPERTEMUKAN\nYANG TERBAIK',
    copy: 'Dari Piala Gubernur hingga eksibisi esports dalam hajatan olahraga daerah dan nasional, kompetisi menjadi panggung pembuktian talenta Jawa Barat.',
    meta: 'PIALA GUBERNUR · PON · PORPROV',
  },
  {
    index: '05',
    label: 'The Achievement',
    headline: 'KEBANGGAAN\nYANG DIPERSEMBAHKAN',
    copy: 'Talenta yang dibina dengan sungguh-sungguh mengharumkan nama Jawa Barat di kejuaraan nasional dan internasional. Setiap prestasi adalah kebanggaan bersama.',
    meta: 'NASIONAL · INTERNASIONAL · KEBANGGAAN BERSAMA',
  },
  {
    index: '06',
    label: 'The Future',
    headline: 'ESPORTS JAWA BARAT\nTERUS MELANGKAH',
    copy: 'Dengan fondasi, sumber daya manusia, dan ekosistem yang terus diperkuat, esports Jawa Barat berkomitmen menjadi olahraga yang membanggakan Indonesia.',
    meta: 'VISI & MISI · KOMITMEN BERKELANJUTAN',
    cta: [
      { label: 'Tentang ESI Jabar', href: '/tentang', variant: 'primary' },
      { label: 'Struktur Organisasi', href: '/struktur-organisasi', variant: 'outline' },
    ],
  },
];

/**
 * FederationIntro — documentary-style storytelling.
 *
 * Architecture:
 *   BACKGROUND  → pure black + thin white lines (pinned)
 *   ATMOSPHERE → soft red / white radial glow
 *   CONTENT     → 6 scenes that translate upward as the user scrolls
 *   FOREGROUND → scene counter + progress rail
 *
 * The section shell (marquee + pinned block) wraps the storytelling. GSAP +
 * ScrollTrigger pins the black background while content moves over it. When
 * `prefers-reduced-motion` is set, pinning is skipped and the scenes render as
 * a readable stacked document.
 */
const FederationIntro: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const scenesRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const railRef = useRef<HTMLSpanElement>(null);
  const railWrapRef = useRef<HTMLDivElement>(null);

  const isReducedMotion = useReducedMotion();

  useEffect(() => {
    const el = sectionRef.current;
    const pinEl = pinRef.current;
    const scenes = scenesRef.current;
    if (!el || !pinEl || !scenes) return;

    if (isReducedMotion) {
      if (railWrapRef.current) {
        railWrapRef.current.hidden = true;
      }
      return;
    }

    // Cover the (pinned) Hero: pull this section up by one viewport so it rises
    // from below during the last viewport of the Hero pin and covers it exactly
    // at unpin. Same `fed-cover` mechanism LatestNews uses against this section.
    el.classList.add('fed-cover');

    const total = SCENES.length;
    const inners = Array.from(scenes.querySelectorAll<HTMLElement>('[data-scene-inner]'));

    // Focus points: each scene is at its sharpest the moment its center passes
    // the 50% viewport line. Because the stack translates `total - 1` viewports,
    // scene `i` reaches the focus point exactly at progress `i / (total - 1)`.
    // Scene transitions use transform + opacity only (no blur — keeps the scrub
    // GPU-cheap on the long timeline).
    const focusStep = 1 / (total - 1);
    const enterDur = 0.14; // fade UP window, ends exactly at the focus point
    const leaveDur = 0.12; // fade OUT window, starts right after the focus point

    // Storytelling completes at `storyEnd` of the pinned scroll. The remainder
    // holds scene 06 (the final focus / anchor) still — 06 stays fully visible
    // while LatestNews begins to rise over it, then the intro scrolls out.
    const storyEnd = 0.78;

    // Keep the rail visible during animation; hide it otherwise (no re-render,
    // no hydration mismatch — set via the DOM after mount).
    if (railWrapRef.current) {
      railWrapRef.current.hidden = false;
    }

    const ctx = gsap.context(() => {
      // Condense the stacked scenes into a single pinned viewport.
      pinEl.classList.add('fed-pin');

      const applySceneSequence = (
        tl: gsap.core.Timeline,
        opts: { yIn: number; yOut: number; blur: boolean }
      ) => {
        inners.forEach((inner, i) => {
          const focus = i * focusStep * storyEnd;

          if (i === 0) {
            // Scene 01 is already centered when the pin engages → sharp from the start.
            gsap.set(inner, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              filter: opts.blur ? 'blur(0px)' : 'none',
            });
          } else {
            const enterStart = Math.max(0, focus - enterDur);
            tl.fromTo(
              inner,
              opts.blur
                ? { autoAlpha: 0, y: opts.yIn, scale: 0.97, filter: 'blur(6px)' }
                : { autoAlpha: 0, y: opts.yIn, scale: 0.98 },
              opts.blur
                ? { autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: enterDur }
                : { autoAlpha: 1, y: 0, scale: 1, duration: enterDur },
              enterStart
            );
          }

          // Once the scene passes the focus point it starts leaving. The last
          // scene stays sharp until the pin releases.
          if (i < total - 1) {
            tl.to(
              inner,
              opts.blur
                ? { autoAlpha: 0, y: -opts.yOut, scale: 0.97, filter: 'blur(6px)', duration: leaveDur }
                : { autoAlpha: 0, y: -opts.yOut, scale: 0.98, duration: leaveDur },
              focus + 0.02
            );
          }
        });
      };

      const updateHud = (progress: number) => {
        const idx = Math.min(
          total,
          Math.max(1, Math.floor(progress * ((total - 1) / storyEnd)) + 1)
        );
        if (counterRef.current) {
          counterRef.current.textContent = String(idx).padStart(2, '0');
        }
        if (railRef.current) {
          railRef.current.style.height = `${(progress * 100).toFixed(1)}%`;
        }
      };

      const mm = gsap.matchMedia();

      // Desktop — anchored storytelling: scenes complete at `storyEnd`, scene 06
      // holds (anchor), then the intro recedes as LatestNews approaches.
      mm.add('(min-width: 768px)', () => {
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: pinEl,
            start: 'top top',
            end: () => `+=${total * 130}%`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => updateHud(self.progress),
          },
        });

        const viewportHeight = () => window.innerHeight;
        tl.to(scenes, { y: () => -(total - 1) * viewportHeight(), duration: storyEnd }, 0);

        applySceneSequence(tl, { yIn: 80, yOut: 80, blur: false });

        // Slow, subtle drift on scene 06 across the anchor hold. It ends at
        // timeline position 1.0 so the storytelling (0 → storyEnd) maps cleanly
        // onto the first ~78% of the pin, and the hold fills the rest.
        tl.to(
          inners[total - 1],
          { scale: 1.06, duration: 1 - storyEnd, ease: 'sine.inOut' },
          storyEnd
        );
      });

      // Mobile — lighter storytelling (shorter distance, no blur, no snap).
      mm.add('(max-width: 767px)', () => {
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: pinEl,
            start: 'top top',
            end: () => `+=${total * 110}%`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => updateHud(self.progress),
          },
        });

        const viewportHeight = () => window.innerHeight;
        tl.to(scenes, { y: () => -(total - 1) * viewportHeight(), duration: storyEnd }, 0);

        applySceneSequence(tl, { yIn: 48, yOut: 48, blur: false });

        // Slow, subtle drift on scene 06 across the anchor hold. It ends at
        // timeline position 1.0 so the storytelling (0 → storyEnd) maps cleanly
        // onto the first ~78% of the pin, and the hold fills the rest.
        tl.to(
          inners[total - 1],
          { scale: 1.06, duration: 1 - storyEnd, ease: 'sine.inOut' },
          storyEnd
        );
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, el);

    return () => {
      ctx.revert();
      pinEl.classList.remove('fed-pin');
    };
  }, [isReducedMotion]);

  const renderScene = (scene: SceneContent) => (
    <div
      key={scene.index}
      className="relative h-screen min-h-screen bg-black overflow-hidden flex items-center justify-center px-6"
    >
      {/* Ghost index number for depth */}
      <span className="fed-ghost" aria-hidden="true">
        {scene.index}
      </span>

      {/* Atmospheric photo texture (reused existing asset, heavily muted) */}
      {scene.showImage && (
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/about-team.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center opacity-[0.14]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black" />
        </div>
      )}

      {/* Scene content */}
      <div data-scene-inner className="relative z-10 w-full max-w-3xl text-center">
        <p className="fed-label mb-6 md:mb-8">
          <span className="hidden sm:block h-px w-8 bg-esi-gold/40" aria-hidden="true" />
          {scene.index} / {scene.label}
        </p>

        <h2
          className="fed-headline mb-6 md:mb-8 whitespace-pre-line"
          style={{
            background:
              'linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.55) 70%, rgba(255,255,255,0.2) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {scene.headline}
        </h2>

        <p className="fed-copy">{scene.copy}</p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <span className="h-px w-10 bg-white/20" aria-hidden="true" />
          <p className="fed-meta">{scene.meta}</p>
          <span className="h-px w-10 bg-white/20" aria-hidden="true" />
        </div>

        {scene.cta && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {scene.cta.map((cta) =>
              cta.variant === 'primary' ? (
                <Link key={cta.href} href={cta.href} className="block">
                  <Button variant="primary" size="lg">
                    {cta.label}
                  </Button>
                </Link>
              ) : (
                <Button
                  key={cta.href}
                  as="a"
                  href={cta.href}
                  size="lg"
                  className="border border-white/40 text-white bg-transparent hover:bg-white hover:text-black focus-visible:ring-white"
                >
                  {cta.label}
                </Button>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className="relative bg-black text-white overflow-hidden">
      {/* 1. Running text strip (existing brand marquee) */}
      <div className="relative w-full bg-[#111622] py-5 lg:py-7 overflow-hidden whitespace-nowrap shadow-xl select-none">
        <div className="inline-flex animate-marquee items-center">
          <div className="flex items-center gap-12 shrink-0 pr-12">
            {[...Array(3)].map((_, i) => (
              <span
                key={`text-a-${i}`}
                className="font-['Anton'] italic uppercase text-4xl lg:text-6xl tracking-wider inline-block"
                style={{
                  background: 'linear-gradient(90deg, #FFFFFF 0%, rgba(227, 6, 19, 0.85) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                PENGURUS BESAR ESPORTS INDONESIA PROVINSI JAWA BARAT
              </span>
            ))}
          </div>
          <div
            className="flex items-center gap-12 shrink-0 pr-12"
            aria-hidden="true"
          >
            {[...Array(3)].map((_, i) => (
              <span
                key={`text-b-${i}`}
                className="font-['Anton'] italic uppercase text-4xl lg:text-6xl tracking-wider inline-block"
                style={{
                  background: 'linear-gradient(90deg, #FFFFFF 0%, rgba(227, 6, 19, 0.85) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                PENGURUS BESAR ESPORTS INDONESIA PROVINSI JAWA BARAT
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Pinned storytelling (black background stays, content moves up) */}
      <div ref={pinRef} className="relative">
        {/* Pinned background: black + thin white lines + atmosphere */}
        <div className="absolute inset-0 bg-black" aria-hidden="true" />
        <div className="absolute inset-0 lines-bg" aria-hidden="true" />
        <div className="absolute inset-0 atmosphere" aria-hidden="true" />

        {/* Scroll-ready scenes stack (translated upward by GSAP when pinned) */}
        <div ref={scenesRef} className="relative z-10 flex flex-col w-full">
          {SCENES.map(renderScene)}
        </div>

        {/* Foreground: scene counter + progress rail */}
        <div
          ref={railWrapRef}
          hidden
          className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-3 pointer-events-none"
          aria-hidden="true"
        >
          <span
            ref={counterRef}
            className="font-['Anton'] text-4xl md:text-6xl text-white/90 leading-none"
          >
            01
          </span>
          <div className="relative h-32 md:h-48 w-px bg-white/10 overflow-hidden">
            <span
              ref={railRef}
              className="absolute inset-x-0 top-0 w-full bg-esi-red/80"
              style={{ height: '0%' }}
            />
          </div>
          <span
            className="text-[9px] tracking-[0.4em] text-white/40 uppercase"
            style={{ writingMode: 'vertical-rl' }}
          >
            Scene
          </span>
        </div>
      </div>
    </section>
  );
};

export { FederationIntro };