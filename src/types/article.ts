// Article Types

import type { WordPressPost } from './wordpress';

export interface Article {
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
  categories: string[];
  tags: string[];
  publishedAt: string;
  updatedAt: string;
}

export interface ArticleCard {
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

export interface ArticleListItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string | null;
  featuredImageAlt: string | null;
  authorName: string;
  categoryName: string;
  publishedAt: string;
}

export interface ArticleDetail extends Article {
  relatedArticles: ArticleCard[];
}

// API Response types
export type ArticleAPIResponse = WordPressPost;

export type ArticleListAPIResponse = WordPressPost[];
