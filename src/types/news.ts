// News Types

import type { WordPressPost } from './wordpress';

export interface News {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: {
    url: string;
    alt: string;
    width: number;
    height: number;
  } | null;
  author: {
    id: number;
    name: string;
    avatar?: string;
  };
  category: string;
  publishedAt: string;
  updatedAt: string;
}

export interface NewsCard {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: {
    url: string;
    alt: string;
  } | null;
  category: string;
  publishedAt: string;
}

export interface NewsDetail extends News {
  relatedNews: NewsCard[];
}

// WordPress Custom Post Type 'news' fields
export interface NewsCPTFields {
  // Standard WordPress fields (inherited)
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: string;
  modified: string;
  featured_media: number;
  author: number;
  status: string;
  // ACF or custom fields would go here when available
}

export type NewsAPIResponse = WordPressPost;

export type NewsListAPIResponse = WordPressPost[];

// Placeholder data for development
export interface NewsPlaceholder {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string | null;
  category: string;
  publishedAt: string;
}
