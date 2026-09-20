'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useReducedMotion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { OptimizedImage } from '@/components/shared';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AchievementItem {
  id: number;
  title: string;
  slug: string;
  subjectName: string;
  competitionName: string;
  category: string;
  year: number;
  result: string;
  featuredImage?: {
    url: string;
    alt: string;
  } | null;
}

interface FeaturedAchievementsProps {
  achievements: AchievementItem[];
}

const FeaturedAchievements: React.FC<FeaturedAchievementsProps> = ({ achievements }) => {
  const displayAchievements = achievements.length > 0 ? achievements.slice(0, 5) : [
    { id: 1, title: 'Juara 1 Esports Governor Cup Jabar', slug: 'juara-1-governor-cup', subjectName: 'Tim Mobile Legends ESI Jabar', competitionName: 'Governor Cup Jawa Barat', category: 'MOBILE LEGENDS', year: 2026, result: 'Medali Emas', featuredImage: null },
    { id: 2, title: 'Medali Emas PON XXI Cabang Esports', slug: 'medali-emas-pon', subjectName: 'Atlet Nasional ESI Jabar', competitionName: 'Pekan Olahraga Nasional', category: 'PUBG MOBILE', year: 2025, result: 'Juara Umum', featuredImage: null },
    { id: 3, title: 'Winner Piala Presiden Esports Region Jabar', slug: 'piala-presiden-jabar', subjectName: 'Divisi Free Fire ESI Jabar', competitionName: 'Piala Presiden Esports', category: 'FREE FIRE', year: 2025, result: 'Juara 1', featuredImage: null },
    { id: 4, title: 'Gold Medal Kejuaraan Nasional Esports', slug: 'kejurnas-esports', subjectName: 'Tim Tekken 8 Jabar', competitionName: 'Kejurnas ESI Indonesia', category: 'TEKKEN 8', year: 2026, result: 'Juara 1', featuredImage: null },
    { id: 5, title: 'Grand Finalist Internasional Championship', slug: 'international-championship', subjectName: 'Valorant Squad Jabar', competitionName: 'Southeast Asia Series', category: 'VALORANT', year: 2026, result: 'Runner Up', featuredImage: null },
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const isReducedMotion = useReducedMotion();
  
  // State untuk melacak kartu mana yang sedang aktif (di-hover atau di-klik di mobile)
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || isReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.set('[data-prestasi-header], [data-prestasi-accordion]', {
        autoAlpha: 0,
        y: 40,
      });

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: section, start: 'top 75%', once: true },
      });

      tl.to('[data-prestasi-header]', { autoAlpha: 1, y: 0, duration: 0.9 })
        .to('[data-prestasi-accordion]', { autoAlpha: 1, y: 0, duration: 1 }, '-=0.4');
    }, section);

    return () => ctx.revert();
  }, [isReducedMotion]);

  return (
    <section
      ref={sectionRef}
      // Latar belakang grid tipis
      className="relative overflow-hidden py-24 lg:py-32 bg-[#FAFAFA] bg-[linear-gradient(to_right,rgba(0,0,0,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.07)_1px,transparent_1px)] bg-[size:4rem_4rem]"
    >
      <div className="max-w-[1536px] mx-auto px-4 md:px-8">

        {/* Header - Disusun menyamping sesuai referensi gambar */}
        <div data-prestasi-header className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="md:w-1/2 relative pb-6">
            <h2 className="font-['Anton'] uppercase tracking-tight text-black text-6xl md:text-7xl lg:text-[5.5rem] leading-none">
              PRESTASI
            </h2>
            <p className="mt-3 text-sm md:text-base text-black font-medium tracking-wide">
              Kebanggaan atlet ESI Jawa Barat di berbagai kompetisi bergengsi.
            </p>
            {/* Garis batas di bawah judul kiri */}
            <div className="absolute bottom-0 left-0 w-3/4 h-1 bg-black" />
          </div>
          
          <div className="md:w-1/2 flex md:justify-end pb-6">
            <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-[#E30613] tracking-widest uppercase text-right">
              PRESTASI ESI JAWA BARAT
            </h3>
          </div>
        </div>

        {/* Gallery / Cards Accordion */}
        <div 
          data-prestasi-accordion 
          className="flex flex-col lg:flex-row w-full h-[800px] lg:h-[600px] xl:h-[700px] gap-2 lg:gap-4"
        >
          {displayAchievements.map((item, index) => {
            const isActive = activeIdx === index;
            
            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveIdx(index)}
                onClick={() => setActiveIdx(index)}
                className={`relative overflow-hidden cursor-pointer bg-[#222222] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex-1 ${
                  isActive ? 'flex-[3] lg:flex-[3.5]' : 'flex-1 lg:flex-1'
                }`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                  {item.featuredImage ? (
                    <OptimizedImage
                      src={item.featuredImage.url}
                      alt={item.featuredImage.alt || item.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className={`object-cover object-center transition-transform duration-1000 ${
                        isActive ? 'scale-100' : 'scale-110 grayscale brightness-75'
                      }`}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
                      <span className="text-white/20 text-xs text-center px-2 uppercase tracking-widest rotate-90 lg:rotate-0">
                        GAMBAR PRESTASI
                      </span>
                    </div>
                  )}
                </div>

                {/* Overlay gradient untuk teks */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 ${
                    isActive ? 'opacity-100' : 'opacity-0 lg:opacity-30'
                  }`}
                />

                {/* Konten (Judul & Deskripsi) yang muncul saat di-hover */}
                <div 
                  className={`absolute inset-x-0 bottom-0 p-6 md:p-8 lg:p-12 flex flex-col justify-end transition-all duration-700 delay-100 ${
                    isActive 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-10 lg:translate-y-8'
                  }`}
                >
                  <span className="text-[#C5922C] font-['Anton'] tracking-[0.2em] uppercase text-sm md:text-base mb-2 inline-block">
                    {item.year} — {item.result}
                  </span>
                  
                  <h3 className="text-white font-['Anton'] text-3xl md:text-4xl lg:text-5xl uppercase leading-[1.1] mb-4 drop-shadow-md whitespace-normal">
                    {item.title}
                  </h3>
                  
                  <div className={`transition-all duration-500 delay-200 overflow-hidden ${
                    isActive ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <p className="text-gray-200 text-sm md:text-base line-clamp-2 md:line-clamp-3 mb-6 max-w-2xl font-medium">
                      Perolehan gemilang diraih oleh {item.subjectName} di kategori {item.category} pada ajang {item.competitionName}.
                    </p>
                    
                    <Link
                      href={`/prestasi/${item.slug}`}
                      className="inline-flex items-center gap-2 text-white text-xs md:text-sm font-bold uppercase tracking-widest border-b border-white pb-1 w-fit hover:text-[#C5922C] hover:border-[#C5922C] transition-colors"
                    >
                      <span>Learn More</span>
                      <span className="text-[#C5922C] ml-1">+</span>
                    </Link>
                  </div>
                </div>

                {/* Label vertikal bergaya editorial (terlihat saat kartu tertutup di desktop) */}
                <div className={`hidden lg:flex absolute top-0 left-0 w-full h-full items-center justify-center pointer-events-none transition-opacity duration-500 ${
                  isActive ? 'opacity-0' : 'opacity-100'
                }`}>
                  <span className="text-white/80 font-['Anton'] text-2xl uppercase tracking-[0.3em] -rotate-90 whitespace-nowrap drop-shadow-lg">
                    {item.year}
                  </span>
                </div>

              </div>
            );
          })}
        </div>

        {/* Tombol Lihat Semua */}
        <div className="mt-12 text-center md:text-right">
          <Link
            href="/prestasi"
            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-black text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#E30613] hover:text-white hover:border-[#E30613] transition-all duration-300"
          >
            <span>Lihat Semua Prestasi</span>
            <span className="text-lg leading-none">+</span>
          </Link>
        </div>

      </div>
    </section>
  );
};

export { FeaturedAchievements };