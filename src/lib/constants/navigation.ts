// Navigation Configuration

export interface NavItem {
  label: string;
  href: string;
  hasSubmenu?: boolean;
}

export interface NavSubmenu {
  label: string;
  items: NavItem[];
}

export const mainNavigation: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Tentang', href: '/tentang', hasSubmenu: true },
  { label: 'Berita', href: '/berita' },
  { label: 'Artikel', href: '/artikel' },
  { label: 'Prestasi', href: '/prestasi' },
  { label: 'Kontak', href: '/kontak' },
];

export const tentangSubmenu: NavItem[] = [
  { label: 'Profil', href: '/tentang' },
  { label: 'Sejarah', href: '/sejarah' },
  { label: 'Visi & Misi', href: '/visi-misi' },
  { label: 'Struktur Organisasi', href: '/struktur-organisasi' },
  { label: 'Pengurus', href: '/pengurus' },
];

export const footerNavigation = {
  tentang: [
    { label: 'Profil', href: '/tentang' },
    { label: 'Sejarah', href: '/sejarah' },
    { label: 'Visi & Misi', href: '/visi-misi' },
    { label: 'Struktur Organisasi', href: '/struktur-organisasi' },
    { label: 'Pengurus', href: '/pengurus' },
  ],
  konten: [
    { label: 'Berita', href: '/berita' },
    { label: 'Artikel', href: '/artikel' },
    { label: 'Prestasi', href: '/prestasi' },
  ],
  lainnya: [
    { label: 'Kontak', href: '/kontak' },
  ],
};

export const mobileNavigation = mainNavigation;
