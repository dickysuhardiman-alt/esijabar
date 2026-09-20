'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useReducedMotion, motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { OptimizedImage } from '@/components/shared';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: {
    url: string;
    alt: string;
  } | null;
  category: string;
  publishedAt: string;
}

interface LatestNewsProps {
  news: NewsItem[];
}

const LatestNews: React.FC<LatestNewsProps> = ({ news }) => {
  // Batasi berita yang ditampilkan atau ambil 4 untuk tampilan utama
  const displayNews = news.length > 0 ? news.slice(0, 4) : [
    { id: 1, title: 'TOPIK 1: Turnamen ESI Jabar Segera Dimulai', slug: 'topik-1', excerpt: 'Deskripsi singkat mengenai turnamen esports terbesar di Jawa Barat yang akan segera diselenggarakan...', category: 'TURNAMEN', publishedAt: '2026-06-01', featuredImage: null },
    { id: 2, title: 'TOPIK 2: Seleksi Atlet PON Esports Jabar', slug: 'topik-2', excerpt: 'Informasi seleksi resmi atlet cabang olahraga esports untuk mewakili kontingen Jawa Barat...', category: 'ATLET', publishedAt: '2026-06-02', featuredImage: null },
    { id: 3, title: 'TOPIK 3: Workshop Pengembangan Industri Game', slug: 'topik-3', excerpt: 'Kolaborasi strategis bersama developer game lokal untuk meningkatkan kualitas talenta digital...', category: 'EDUKASI', publishedAt: '2026-06-03', featuredImage: null },
    { id: 4, title: 'TOPIK 4: Pelantikan Pengurus Baru ESI Kabupaten', slug: 'topik-4', excerpt: 'Sinergi pengurus daerah dalam memajukan ekosistem kompetitif di seluruh kota dan kabupaten...', category: 'ORGANISASI', publishedAt: '2026-06-04', featuredImage: null },
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeNews = displayNews[selectedIndex] || displayNews[0];

  const sectionRef = useRef<HTMLElement>(null);
  const isReducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || isReducedMotion) return;

    section.classList.add('fed-cover');

    // Scroll-reveal sequence: heading → numbered items → preview card.
    // Transforms are applied to the section structure only (GSAP); the preview
    // card's swap/hover is Framer Motion on inner elements — no shared target.
    const ctx = gsap.context(() => {
      gsap.set('[data-news-header], [data-news-item]', { autoAlpha: 0, y: 36 });
      gsap.set('[data-news-preview]', { autoAlpha: 0, y: 40, scale: 0.98 });

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: section, start: 'top 70%', once: true },
      });

      tl.to('[data-news-header]', { autoAlpha: 1, y: 0, duration: 0.9 })
        .to('[data-news-item]', { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.09 }, '-=0.35')
        .to('[data-news-preview]', { autoAlpha: 1, y: 0, scale: 1, duration: 0.8 }, '-=0.5');
    }, section);

    return () => ctx.revert();
  }, [isReducedMotion]);

  return (
    <section
      ref={sectionRef}
      // Latar belakang grid dengan garis hitam tipis (opacity rendah agar tidak mengganggu keterbacaan)
      className="relative z-10 overflow-hidden bg-[#FAFAFA] py-24 lg:py-36 bg-[linear-gradient(to_right,rgba(0,0,0,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.07)_1px,transparent_1px)] bg-[size:4rem_4rem]"
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Kolom Kiri: Header & Daftar Topik Bernomor */}
          <div className="lg:col-span-6 flex flex-col">
            {/* Header */}
            <div data-news-header className="mb-12 md:mb-16 border-b-2 border-black pb-8">
              <h2 className="font-['Anton'] uppercase tracking-tight text-black text-6xl md:text-7xl lg:text-[5rem] leading-none">
                LATEST NEWS
              </h2>
              <p className="mt-3 text-lg md:text-xl text-gray-800 font-serif tracking-wide">
                Berita Terbaru Dari ESI Jawa Barat
              </p>
            </div>

            {/* List Berita */}
            <div className="flex flex-col">
              {displayNews.map((item, index) => {
                const isActive = selectedIndex === index;
                return (
                  <div
                    key={item.id}
                    data-news-item
                    onClick={() => setSelectedIndex(index)}
                    className={`group cursor-pointer border-b-2 border-black py-7 md:py-8 transition-colors ${
                      isActive ? 'text-[#E30613]' : 'text-black'
                    }`}
                  >
                    <div className="flex items-center gap-6 md:gap-8">
                      <span className={`text-4xl md:text-5xl font-['Anton'] leading-none w-14 md:w-16 text-center transition-colors ${
                        isActive ? 'text-[#E30613]' : 'text-black group-hover:text-[#E30613]'
                      }`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      {/* Garis Vertikal Pemisah */}
                      <div className={`w-0.5 h-12 md:h-14 self-center transition-colors ${
                        isActive ? 'bg-[#E30613]' : 'bg-black group-hover:bg-[#E30613]'
                      }`} />

                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-gray-500 transition-colors group-hover:text-[#E30613]">
                          {item.category}
                        </span>
                        <h3
                          className={`mt-1.5 text-2xl md:text-3xl font-['Anton'] uppercase leading-snug line-clamp-2 transition-colors ${
                            isActive ? 'text-[#E30613]' : 'text-black group-hover:text-[#E30613]'
                          }`}
                        >
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tautan ke halaman berita dengan ikon segitiga (Play) */}
            <div className="mt-12 flex items-center">
              <Link
                href="/berita"
                className="group inline-flex items-center gap-4"
                aria-label="Lihat Selengkapnya"
              >
                <svg
                  className="w-8 h-8 text-gray-600 transition-all duration-300 group-hover:text-[#E30613] group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M5 3l14 9-14 9V3z" />
                </svg>
                <span className="text-sm md:text-base font-mono font-bold uppercase tracking-widest text-black group-hover:text-[#E30613] transition-colors">
                  LIHAT SELENGKAPNYA
                </span>
              </Link>
            </div>
          </div>

          {/* Kolom Kanan: Kartu Preview & Teks Vertikal */}
          <div className="lg:col-span-6 flex relative">
            <div className="flex-1 w-full relative z-10" data-news-preview>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNews.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="h-full"
                >
                  <Link href={`/berita/${activeNews.slug}`} className="group block h-full">
                    <div className="bg-white border-2 border-black shadow-[8px_8px_0_0_#000] overflow-hidden transition-shadow duration-300 hover:shadow-[14px_14px_0_0_#000] h-full flex flex-col">

                      {/* Area Gambar */}
                      <div className="aspect-square md:aspect-[4/3] bg-[#222222] relative overflow-hidden">
                        {activeNews.featuredImage ? (
                          <OptimizedImage
                            src={activeNews.featuredImage.url}
                            alt={activeNews.featuredImage.alt || activeNews.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-gray-400 text-sm uppercase tracking-widest font-semibold font-mono">
                              [GAMBAR BERITA ESI JABAR]
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Area Konten */}
                      <div className="p-8 md:p-10 lg:p-12 flex-1 bg-[#DABFAA]">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-black bg-white px-3 py-1 border border-black font-['Anton'] inline-block mb-5">
                          {activeNews.category}
                        </span>
                        <h4 className="text-2xl md:text-[2rem] font-['Anton'] uppercase leading-[1.12] tracking-wide text-black">
                          {activeNews.title}
                        </h4>
                        <p className="mt-5 text-base text-gray-800 font-medium leading-relaxed line-clamp-3">
                          {activeNews.excerpt.replace(/<[^>]*>/g, '')}
                        </p>
                        <div className="mt-8 inline-flex items-center gap-2.5 text-black text-sm font-bold uppercase tracking-widest border-b-2 border-black pb-1 hover:text-[#E30613] hover:border-[#E30613] transition-colors">
                          <span>BACA ARTIKEL</span>
                          <svg
                            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Teks Vertikal di sisi paling kanan */}
            <div className="hidden lg:flex w-16 items-center justify-center -mr-8 pl-8">
              <span className="[writing-mode:vertical-rl] rotate-180 text-gray-400 font-serif tracking-[0.3em] text-lg uppercase whitespace-nowrap">
                -ESI PROVINSI JAWA BARAT
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export { LatestNews };