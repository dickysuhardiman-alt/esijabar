import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HeroAnimation } from './HeroAnimation';
import { Button } from '@/components/ui';

/**
 * Hero — cinematic entrance.
 *
 * Server Component that only defines the visual structure. All animation
 * (entrance + pinned black-cloud transition) is delegated to the client-side
 * `HeroAnimation` wrapper (spec Section 40 pattern).
 *
 * Data-attribute hooks consumed by `HeroAnimation`:
 *  - `data-hero-canvas`  : recedes subtly when the scroll transition begins
 *  - `data-hero-bg`      : background image (enters via scale + fade)
 *  - `data-hero-overlay` : dark vignette overlay
 *  - `data-hero-eyebrow` / `data-hero-title` / `data-hero-desc` /
 *    `data-hero-slogan` / `data-hero-cta`     : hierarchical entrance order
 *  - `data-hero-detail` / `data-hero-scroll`  : decorative elements
 *
 * On scroll the hero pins briefly and recedes (transform + opacity only).
 * FederationIntro then rises from below (`fed-cover`) and covers it.
 */
const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col overflow-hidden bg-black text-white font-sans select-none">
      <HeroAnimation className="relative w-full h-[100svh] min-h-screen">
        {/* ================= CANVAS (background + overlays + content) ================= */}
        <div data-hero-canvas className="absolute inset-0">
        {/* 1. Background image */}
        <div data-hero-bg className="absolute inset-0">
          <Image
            src="/bgweb.webp"
            alt="ESI Jawa Barat Hero Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-90 contrast-105"
          />
        </div>

        {/* 2. Overlay + cinematic gradients */}
        <div data-hero-overlay className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-black/75" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent" />

        {/* 3. Content */}
        <div className="relative z-10 flex min-h-screen flex-col justify-end pt-24 pb-24 md:pb-28">
          <div className="w-full max-w-[1400px] mx-auto px-6 md:px-16 text-center">
            {/* Eyebrow / label */}
            <div
              data-hero-eyebrow
              className="mb-5 md:mb-7 flex items-center justify-center gap-4"
            >
              <span className="h-px w-8 md:w-12 bg-white/30" aria-hidden="true" />
              <p className="font-['Anton'] text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/90">
                Esports Indonesia
              </p>
              <span className="h-px w-8 md:w-12 bg-esi-red" aria-hidden="true" />
            </div>

            {/* Main headline */}
            <h1
              data-hero-title
              className="text-[12vw] md:text-[11vw] lg:text-[9.5vw] leading-none uppercase whitespace-nowrap select-none"
              style={{
                fontFamily: "'Anton', 'Bebas Neue', 'Impact', sans-serif",
                fontWeight: 900,
                letterSpacing: '0.01em',
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.45) 62%, rgba(255,255,255,0.08) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ESI JAWA BARAT
            </h1>

            {/* Supporting text */}
            <p
              data-hero-desc
              className="mx-auto mt-4 md:mt-5 max-w-md md:max-w-lg text-sm md:text-base text-white/70 leading-relaxed"
            >
              Membangun esports sebagai olahraga prestasi di Jawa Barat —
              terorganisasi, berjenjang, dan berkelanjutan.
            </p>

            {/* Slogan + CTA */}
            <div className="mt-8 md:mt-10 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
              <p
                data-hero-slogan
                className="font-serif italic text-base md:text-lg text-white/85 leading-relaxed tracking-wide"
              >
                The Future of Gaming &amp; Esports in West Java
              </p>
              <div data-hero-cta className="flex flex-wrap items-center justify-center gap-3">
                <Link href="/tentang" className="block">
                  <Button variant="primary" size="lg">
                    Tentang ESI Jabar
                  </Button>
                </Link>
                <Button
                  as="a"
                  href="/prestasi"
                  size="lg"
                  className="border border-white/50 text-white bg-transparent hover:bg-white hover:text-black focus-visible:ring-white"
                >
                  Prestasi
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= Decorative elements ================= */}
      {/* Left vertical label */}
      <div
        data-hero-detail
        className="absolute left-5 md:left-8 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center gap-3"
        style={{ writingMode: 'vertical-rl' }}
      >
        <span className="h-10 w-px bg-white/30" aria-hidden="true" />
        <span className="text-[10px] tracking-[0.35em] uppercase text-white/50">
          Federasi Esports · Jawa Barat · Indonesia
        </span>
      </div>

      {/* Scroll cue */}
      <div
        data-hero-scroll
        className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] tracking-[0.35em] uppercase text-white/60">
          Scroll
        </span>
        <span className="block h-8 md:h-10 w-px bg-white/20 overflow-hidden relative">
          <span className="hero-scroll-cue-line absolute inset-x-0 top-0 h-1/2 bg-white/80" />
        </span>
      </div>
      </HeroAnimation>
    </section>
  );
};

export { Hero };