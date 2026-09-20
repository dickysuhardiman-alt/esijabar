'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { mainNavigation, tentangSubmenu } from '@/lib/constants/navigation';

const Navbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Cek apakah halaman sudah di-scroll ke bawah dari posisi paling atas
      setIsScrolled(currentScrollY > 20);

      // Logika Hide/Show Navbar berdasarkan arah scroll
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Scroll ke bawah -> Sembunyikan navbar
        setIsVisible(false);
      } else {
        // Scroll ke atas -> Munculkan navbar
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Membagi menu existing menjadi bagian Kiri dan Kanan
  const leftNavItems = mainNavigation.slice(0, Math.ceil(mainNavigation.length / 2));
  const rightNavItems = mainNavigation.slice(Math.ceil(mainNavigation.length / 2));

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : '-100%' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3',
        isScrolled
          ? 'bg-[#1e1e24]/40 backdrop-blur-md border-b border-white/10 shadow-lg' // Transparan silver gelap tipis saat scroll ke bawah
          : 'bg-transparent' // Polos transparan di posisi paling atas
      )}
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Menggunakan grid 3 kolom agar logo konsisten di tengah mutlak */}
        <div className="grid grid-cols-2 lg:grid-cols-3 items-center justify-between">
          
          {/* Desktop Left Navigation */}
          <div className="hidden lg:flex items-center gap-6 justify-start">
            {leftNavItems.map((item) => (
              <div key={item.href} className="relative">
                {item.hasSubmenu ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button className="text-xs tracking-widest text-white/80 hover:text-white transition-colors uppercase font-medium flex items-center gap-1">
                      {item.label}
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {activeDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 pt-2 min-w-[200px]"
                        >
                          <div className="bg-[#1e1e24]/90 backdrop-blur-md rounded-lg shadow-xl border border-white/10 overflow-hidden">
                            {tentangSubmenu.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                className="block px-4 py-2.5 text-white/80 hover:text-white hover:bg-white/10 text-xs transition-colors uppercase"
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="text-xs tracking-widest text-white/80 hover:text-white transition-colors uppercase font-medium block"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Center Logo & Typographic Branding (Polos di Tengah) */}
          <div className="flex flex-col items-center justify-center col-span-1 lg:col-span-1 mx-auto">
            <Link 
              href="/" 
              className="group flex flex-col items-center transition-transform hover:scale-105"
            >
              <div className="relative w-8 h-8 md:w-9 md:h-9 mb-1">
                <Image
                  src="/logoesi.webp"
                  alt="Logo ESI Jawa Barat"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
              <div 
                className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-center uppercase text-white/95 leading-tight"
                style={{ fontFamily: "'Anton', 'Impact', sans-serif" }}
              >
                ESPORTS INDONESIA
                <span className="block text-esi-gold font-normal tracking-[0.25em] text-[9px]">
                  JAWA BARAT
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Right Navigation */}
          <div className="hidden lg:flex items-center gap-6 justify-end">
            {rightNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs tracking-widest text-white/80 hover:text-white transition-colors uppercase font-medium block"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center justify-end lg:hidden col-span-1">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white bg-transparent"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#1e1e24]/95 backdrop-blur-lg border-t border-white/10 mt-3"
          >
            <div className="container-esi py-6 space-y-2">
              {mainNavigation.map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded uppercase text-sm tracking-widest"
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export { Navbar };