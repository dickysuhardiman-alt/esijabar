// Site Configuration Constants

export const SITE_CONFIG = {
  name: 'ESI Provinsi Jawa Barat',
  fullName: 'Esports Indonesia Provinsi Jawa Barat',
  shortName: 'ESI Jawa Barat',
  description: 'Website resmi Esports Indonesia Provinsi Jawa Barat - Organisasi Olahraga Esports Resmi',
  keywords: 'ESI, Esports Indonesia, Jawa Barat, esports, gaming, tournament',
  author: 'ESI Jawa Barat',
  email: '[DATA RESMI AKAN DIISI]',
  phone: '[DATA RESMI AKAN DIISI]',
  address: '[DATA RESMI AKAN DIISI]',
  socialMedia: {
    instagram: '[DATA RESMI AKAN DIISI]',
    twitter: '[DATA RESMI AKAN DIISI]',
    facebook: '[DATA RESMI AKAN DIISI]',
    youtube: '[DATA RESMI AKAN DIISI]',
    tiktok: '[DATA RESMI AKAN DIISI]',
  },
  website: 'https://esi-jabar.org',
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
} as const;

export const NAVIGATION = {
  main: [
    { label: 'Home', href: '/' },
    { label: 'Tentang', href: '/tentang', hasSubmenu: true },
    { label: 'Berita', href: '/berita' },
    { label: 'Artikel', href: '/artikel' },
    { label: 'Prestasi', href: '/prestasi' },
    { label: 'Kontak', href: '/kontak' },
  ],
  tentang: [
    { label: 'Profil', href: '/tentang' },
    { label: 'Sejarah', href: '/sejarah' },
    { label: 'Visi & Misi', href: '/visi-misi' },
    { label: 'Struktur Organisasi', href: '/struktur-organisasi' },
    { label: 'Pengurus', href: '/pengurus' },
  ],
} as const;

export const ROUTES = {
  home: '/',
  tentang: '/tentang',
  sejarah: '/sejarah',
  visiMisi: '/visi-misi',
  strukturOrganisasi: '/struktur-organisasi',
  pengurus: '/pengurus',
  berita: '/berita',
  beritaDetail: '/berita/[slug]',
  artikel: '/artikel',
  artikelDetail: '/artikel/[slug]',
  prestasi: '/prestasi',
  prestasiDetail: '/prestasi/[slug]',
  kontak: '/kontak',
} as const;

export const API_ROUTES = {
  posts: '/wp-json/wp/v2/posts',
  pages: '/wp-json/wp/v2/pages',
  categories: '/wp-json/wp/v2/categories',
  tags: '/wp-json/wp/v2/tags',
  media: '/wp-json/wp/v2/media',
  // Custom post types - will need to be configured in WordPress
  news: '/wp-json/wp/v2/news',
  achievements: '/wp-json/wp/v2/achievement',
} as const;

export const PAGINATION = {
  defaultPerPage: 9,
  maxPerPage: 50,
} as const;

export const SEO_DEFAULTS = {
  ogImage: '/og-image.jpg',
  twitterCard: 'summary_large_image',
  locale: 'id_ID',
  type: 'website',
} as const;
