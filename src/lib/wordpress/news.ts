/**
 * WordPress News API - Berita Terkini Module
 *
 * Uses Custom Post Type 'news' for berita/berita terkini content.
 * Falls back to clearly-marked development placeholder data when
 * WordPress is not configured (`NEXT_PUBLIC_WORDPRESS_URL` empty).
 */

import {
  wpFetch,
  wpFetchWithPagination,
  extractFeaturedImage,
  extractAuthor,
  extractCategories,
  isWordPressConfigured,
} from './client';
import type { WPPostApi } from './client';
import { API_ROUTES } from '@/lib/constants';
import type { NewsCard, NewsDetail } from '@/types';

// ============================================================
// Development placeholder data
// Shown ONLY when WordPress is not configured. These items are
// clearly marked as development placeholders - never official data.
// ============================================================

const DEV_NEWS: NewsCard[] = Array.from({ length: 6 }, (_, i) => {
  const n = i + 1;
  return {
    id: n,
    title: `[DEVELOPMENT] Contoh Berita ${n} — [DATA RESMI AKAN DIISI]`,
    slug: `contoh-berita-${n}`,
    excerpt:
      '[DATA RESMI AKAN DIISI] Lorem ipsum dolor sit amet, consectetur adipiscing elit. Berita resmi akan ditampilkan setelah terhubung dengan WordPress.',
    featuredImage: null,
    category: 'Berita',
    publishedAt: `2025-01-0${n}T00:00:00`,
  };
});

const DEV_EXCERPT_PREFIX = '[DATA RESMI AKAN DIISI]';
const DEV_CONTENT = (
  title: string
) => `<p><strong>${DEV_EXCERPT_PREFIX}</strong></p>
<p>Konten resmi untuk &ldquo;${title}&rdquo; akan ditampilkan di sini setelah terhubung dengan WordPress (${DEV_EXCERPT_PREFIX}).</p>
<p>Halaman ini dapat diisi melalui Custom Post Type, kategori, tag, dan media yang dikelola dari dashboard admin.</p>`;

function devFilterNews(
  items: NewsCard[],
  category?: string,
  search?: string
): NewsCard[] {
  let result = items;
  if (category) {
    result = result.filter((item) => item.category.toLowerCase() === category.toLowerCase());
  }
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.excerpt.toLowerCase().includes(q)
    );
  }
  return result;
}

function devPaginate(items: NewsCard[], page: number, perPage: number) {
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * perPage;
  return {
    news: items.slice(start, start + perPage),
    meta: { totalPages, totalItems, currentPage },
    error: null,
  };
}

// Fetch all news with pagination
export async function getNews(
  page: number = 1,
  perPage: number = 9,
  category?: string,
  search?: string
): Promise<{
  news: NewsCard[];
  meta: { totalPages: number; totalItems: number; currentPage: number };
  error: string | null;
}> {
  if (!isWordPressConfigured()) {
    return devPaginate(devFilterNews(DEV_NEWS, category, search), page, perPage);
  }

  const params: Record<string, string | number> = {
    page,
    per_page: perPage,
    _embed: 'wp:featuredmedia,author,wp:term',
    status: 'publish',
    orderby: 'date',
    order: 'desc',
  };

  if (category) {
    params.categories = category;
  }

  if (search) {
    params.search = search;
  }

  const { data, meta, error } = await wpFetchWithPagination<WPPostApi>(
    API_ROUTES.news,
    params
  );

  if (error || !data) {
    return {
      news: [],
      meta: { totalPages: 0, totalItems: 0, currentPage: page },
      error,
    };
  }

  const news: NewsCard[] = data.map((post) => {
    const featuredImage = extractFeaturedImage(post._embedded);

    return {
      id: post.id,
      title: post.title.rendered || '',
      slug: post.slug,
      excerpt: post.excerpt?.rendered || '',
      featuredImage: featuredImage.url
        ? { url: featuredImage.url, alt: featuredImage.alt }
        : null,
      category: extractCategories(post._embedded)[0] || 'Berita',
      publishedAt: post.date,
    };
  });

  return { news, meta, error: null };
}

// Fetch single news by slug
export async function getNewsBySlug(
  slug: string
): Promise<{ news: NewsDetail | null; error: string | null }> {
  if (!isWordPressConfigured()) {
    const card = DEV_NEWS.find((item) => item.slug === slug);
    if (!card) {
      return { news: null, error: 'News not found' };
    }
    const related = DEV_NEWS.filter((item) => item.slug !== slug).slice(0, 3);
    const news: NewsDetail = {
      id: card.id,
      title: card.title,
      slug: card.slug,
      content: DEV_CONTENT(card.title),
      excerpt: card.excerpt,
      featuredImage: null,
      author: { id: 0, name: 'ESI Jawa Barat' },
      category: card.category,
      publishedAt: card.publishedAt,
      updatedAt: card.publishedAt,
      relatedNews: related,
    };
    return { news, error: null };
  }

  const { data, error } = await wpFetch(
    `${API_ROUTES.news}?slug=${slug}&_embed=wp:featuredmedia,author,wp:term&status=publish`
  );

  if (error || !data || !Array.isArray(data) || data.length === 0) {
    return { news: null, error: error || 'News not found' };
  }

  const post = data[0];
  const featuredImage = extractFeaturedImage(post._embedded);
  const author = extractAuthor(post._embedded);
  const categories = extractCategories(post._embedded);

  const news: NewsDetail = {
    id: post.id,
    title: post.title.rendered,
    slug: post.slug,
    content: post.content?.rendered || '',
    excerpt: post.excerpt?.rendered || '',
    featuredImage: featuredImage.url
      ? {
          url: featuredImage.url,
          alt: featuredImage.alt,
          width: featuredImage.width,
          height: featuredImage.height,
        }
      : null,
    author: {
      id: author.id,
      name: author.name,
    },
    category: categories[0] || 'Berita',
    publishedAt: post.date,
    updatedAt: post.modified,
    relatedNews: [],
  };

  return { news, error: null };
}

// Fetch news slugs for static generation
export async function getNewsSlugs(): Promise<string[]> {
  if (!isWordPressConfigured()) {
    return DEV_NEWS.map((item) => item.slug);
  }

  const { data, error } = await wpFetch<Array<{ slug: string }>>(
    `${API_ROUTES.news}?per_page=100&_fields=slug`
  );

  if (error || !data) {
    return [];
  }

  return data.map((post) => post.slug);
}

// Get all news slugs for static paths
export async function getAllNewsSlugs(): Promise<string[]> {
  if (!isWordPressConfigured()) {
    return DEV_NEWS.map((item) => item.slug);
  }

  const slugs: string[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const { data } = await wpFetch<Array<{ slug: string }>>(
      `${API_ROUTES.news}?per_page=100&page=${page}&_fields=slug&status=publish`
    );

    if (!data || data.length === 0) {
      hasMore = false;
    } else {
      slugs.push(...data.map((p) => p.slug));
      hasMore = data.length === 100;
      page++;
    }
  }

  return slugs;
}