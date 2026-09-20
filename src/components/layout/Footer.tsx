'use client';

import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

const Footer: React.FC = () => {
  // Animasi container utama (Stagger children)
  const containerVars: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  // Animasi per-elemen (Fade up)
  const itemVars: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } 
    },
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVars}
      // Latar belakang merah polos tanpa motif grid
      className="relative w-full bg-[#FF3E3E] text-white overflow-hidden py-12 lg:py-20"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col min-h-[75vh] justify-between relative z-10">
        
        {/* Konten Atas (Logo, Deskripsi, Navigasi, Kontak) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 flex-1 w-full">
          
          {/* --- KOLOM KIRI --- */}
          <motion.div variants={itemVars} className="flex flex-col justify-between items-start gap-12 lg:gap-16">
            
            {/* Logo & Deskripsi */}
            <div className="flex flex-col sm:flex-row items-start gap-6 max-w-xl">
              <div className="w-20 h-20 bg-white rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden border-2 border-white/50 p-1 relative">
                <img 
                  src="/logoesi.webp" 
                  alt="Logo ESI Jawa Barat" 
                  className="w-full h-full object-contain relative z-10 bg-white rounded-full"
                />
              </div>
              <p className="text-sm font-medium leading-relaxed tracking-wider uppercase text-white/95 mt-2 sm:mt-0">
                ESPORTS INDONESIA PROVINSI JAWA BARAT —<br />
                ORGANISASI OLAHRAGA ESPORTS RESMI YANG BERDEDIKASI UNTUK MENGEMBANGKAN BAKAT DAN PRESTASI ATLET ESPORTS DI JAWA BARAT.
              </p>
            </div>

            {/* Menu Kiri */}
            <div className="flex flex-col gap-4">
              <Link href="/struktur-organisasi" className="group block">
                <span className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase leading-tight tracking-tight group-hover:text-white/70 transition-colors">
                  STRUKTUR ORGANISASI
                </span>
              </Link>
              <Link href="/profile" className="group block">
                <span className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase leading-tight tracking-tight group-hover:text-white/70 transition-colors">
                  PROFILE
                </span>
              </Link>
            </div>
          </motion.div>

          {/* --- KOLOM KANAN --- */}
          <motion.div variants={itemVars} className="flex flex-col justify-between items-start lg:items-end gap-12 lg:gap-16 lg:text-right">
            
            {/* Menu Kanan */}
            <div className="flex flex-col gap-4 w-full lg:items-end">
              <Link href="/berita" className="group block">
                <span className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase leading-tight tracking-tight group-hover:text-white/70 transition-colors">
                  NEWS
                </span>
              </Link>
              <Link href="/prestasi" className="group block">
                <span className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase leading-tight tracking-tight group-hover:text-white/70 transition-colors">
                  ACHIEVEMENT
                </span>
              </Link>
            </div>

            {/* Kontak Kanan */}
            <div className="flex flex-col gap-5 text-sm md:text-base tracking-[0.15em] uppercase font-medium w-full lg:items-end text-white/90">
              <div className="flex items-center gap-4 lg:justify-end group cursor-pointer hover:text-white transition-colors">
                <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <span>[DATA RESMI AKAN DIISI]</span>
              </div>
              <div className="flex items-center gap-4 lg:justify-end group cursor-pointer hover:text-white transition-colors">
                <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>[DATA RESMI AKAN DIISI]</span>
              </div>
              <div className="flex items-center gap-4 lg:justify-end group cursor-pointer hover:text-white transition-colors">
                <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>[DATA RESMI AKAN DIISI]</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Teks Besar Center (ESI JAWA BARAT) */}
        <motion.div variants={itemVars} className="mt-20 md:mt-24 lg:mt-32 w-full flex justify-center items-end pointer-events-none select-none">
          <h1 className="text-[12vw] lg:text-[11.5vw] font-black tracking-tighter leading-[0.85] text-transparent bg-clip-text bg-gradient-to-b from-white/100 via-white/90 to-white/50 uppercase text-center whitespace-nowrap">
            ESI JAWA BARAT
          </h1>
        </motion.div>

        {/* --- BOTTOM BAR --- */}
        <motion.div variants={itemVars} className="mt-8 md:mt-12 w-full pt-6 flex flex-col md:flex-row justify-between items-center md:items-end text-[10px] md:text-xs font-medium tracking-[0.1em] uppercase text-white/90 z-20 gap-4 text-center md:text-left relative">
          <p>
            © {new Date().getFullYear()} ESPORTS INDONESIA PROVINSI JAWA BARAT. HAK CIPTA DILINDUNGI.
          </p>
          <a 
            href="https://xorav3.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-white hover:underline transition-all duration-300"
          >
            CREATED BY XORA STUDIO
          </a>
        </motion.div>

      </div>
    </motion.footer>
  );
};

export { Footer };