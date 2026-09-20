// Page Types

import type { WordPressPage } from './wordpress';

export interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
  featuredImage: {
    url: string;
    alt: string;
    width: number;
    height: number;
  } | null;
  publishedAt: string;
  updatedAt: string;
}

export type PageDetail = Page;

// WordPress page structure
export type PageAPIResponse = WordPressPage;

// Static page slugs
export type StaticPageSlug =
  | 'tentang'
  | 'sejarah'
  | 'visi-misi'
  | 'struktur-organisasi'
  | 'pengurus'
  | 'kontak';

// Page metadata
export interface PageMeta {
  title: string;
  description: string;
  slug: string;
}

// Contact information
export interface ContactInfo {
  address?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  instagram?: string;
  twitter?: string;
  facebook?: string;
  youtube?: string;
  tiktok?: string;
  website?: string;
}

// Organization structure
export interface OrganizationPosition {
  id: string;
  name: string;
  title: string;
  photo?: string;
  bio?: string;
}

export interface OrganizationBoard {
  name: string;
  positions: OrganizationPosition[];
}

// Vision and Mission
export interface Vision {
  text: string;
}

export interface Mission {
  id: number;
  text: string;
}

// History event
export interface HistoryEvent {
  year: number;
  title: string;
  description: string;
  image?: string;
}
