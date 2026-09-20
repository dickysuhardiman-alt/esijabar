/**
 * WordPress Posts API - Artikel Module
 *
 * Uses native WordPress Posts for Artikel content type.
 * Falls back to clearly-marked development placeholder data when
 * WordPress is not configured (`NEXT_PUBLIC_WORDPRESS_URL` empty).
 */

import {
  wpFetch,
  wpFetchWithPagination,
  extractFeaturedImage,
  extractAuthor,
  extractCategories,
  extractTags,
  isWordPressConfigured,
} from './client';
import type { WPPostApi } from './client';
import { API_ROUTES } from '@/lib/constants';
import type { ArticleCard, ArticleDetail } from '@/types';

// ============================================================
// Development placeholder data
// Shown ONLY when WordPress is not configured. These items are
// clearly marked as development placeholders - never official data.
// ============================================================

const DEV_ARTICLES: ArticleCard[] = Array.from({ length: 6 }, (_, i) => {
  const n = i + 1;
  return {
    id: n,
    title: `[DEVELOPMENT] Contoh Artikel ${n} — [DATA RESMI AKAN DIISI]`,
    slug: `contoh-artikel-${n}`,
    excerpt:
      '[DATA RESMI AKAN DIISI] Lorem ipsum dolor sit amet, consectetur adipiscing elit. Konten resmi akan ditampilkan setelah terhubung dengan WordPress.',
    featuredImage: null,
    category: 'Artikel',
    publishedAt: `2025-01-0${n}T00:00:00`,
  };
});

const DEV_EXCERPT_PREFIX = '[DATA RESMI AKAN DIISI]';
const DEV_CONTENT = (
  title: string
) => `<p><strong>${DEV_EXCERPT_PREFIX}</strong></p>
<p>Konten resmi untuk &ldquo;${title}&rdquo; akan ditampilkan di sini setelah terhubung dengan WordPress (${DEV_EXCERPT_PREFIX}).</p>
<p>Halaman ini dapat diisi melalui Custom Post Type, kategori, tag, dan media yang dikelola dari dashboard admin.</p>`;

function devFilterArticles(
  items: ArticleCard[],
  category?: string,
  search?: string
): ArticleCard[] {
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

function devPaginate(items: ArticleCard[], page: number, perPage: number) {
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * perPage;
  return {
    articles: items.slice(start, start + perPage),
    meta: { totalPages, totalItems, currentPage },
    error: null,
  };
}

// Fetch all articles with pagination
export async function getArticles(
  page: number = 1,
  perPage: number = 9,
  category?: string,
  search?: string
): Promise<{
  articles: ArticleCard[];
  meta: { totalPages: number; totalItems: number; currentPage: number };
  error: string | null;
}> {
  if (!isWordPressConfigured()) {
    return devPaginate(devFilterArticles(DEV_ARTICLES, category, search), page, perPage);
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
    API_ROUTES.posts,
    params
  );

  if (error || !data) {
    return {
      articles: [],
      meta: { totalPages: 0, totalItems: 0, currentPage: page },
      error,
    };
  }

  const articles: ArticleCard[] = data.map((post) => {
    const featuredImage = extractFeaturedImage(post._embedded);

    return {
      id: post.id,
      title: post.title.rendered || '',
      slug: post.slug,
      excerpt: post.excerpt?.rendered || '',
      featuredImage: featuredImage.url
        ? { url: featuredImage.url, alt: featuredImage.alt }
        : null,
      category: extractCategories(post._embedded)[0] || 'Uncategorized',
      publishedAt: post.date,
    };
  });

  return { articles, meta, error: null };
}

// Fetch single article by slug
export async function getArticleBySlug(
  slug: string
): Promise<{ article: ArticleDetail | null; error: string | null }> {
  if (!isWordPressConfigured()) {
    const card = DEV_ARTICLES.find((item) => item.slug === slug);
    if (!card) {
      return { article: null, error: 'Article not found' };
    }
    const related = DEV_ARTICLES.filter((item) => item.slug !== slug).slice(0, 3);
    const article: ArticleDetail = {
      id: card.id,
      title: card.title,
      slug: card.slug,
      content: DEV_CONTENT(card.title),
      excerpt: card.excerpt,
      featuredImage: null,
      author: { id: 0, name: 'ESI Jawa Barat' },
      categories: [card.category],
      tags: [],
      publishedAt: card.publishedAt,
      updatedAt: card.publishedAt,
      relatedArticles: related,
    };
    return { article, error: null };
  }

  const { data, error } = await wpFetch(
    `${API_ROUTES.posts}?slug=${slug}&_embed=wp:featuredmedia,author,wp:term&status=publish`
  );

  if (error || !data || !Array.isArray(data) || data.length === 0) {
    return { article: null, error: error || 'Article not found' };
  }

  const post = data[0];
  const featuredImage = extractFeaturedImage(post._embedded);
  const author = extractAuthor(post._embedded);
  const categories = extractCategories(post._embedded);
  const tags = extractTags(post._embedded);

  const article: ArticleDetail = {
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
    categories,
    tags,
    publishedAt: post.date,
    updatedAt: post.modified,
    relatedArticles: [],
  };

  return { article, error: null };
}

// Fetch article slugs for static generation
export async function getArticleSlugs(): Promise<string[]> {
  if (!isWordPressConfigured()) {
    return DEV_ARTICLES.map((item) => item.slug);
  }

  const { data, error } = await wpFetch<Array<{ slug: string }>>(
    `${API_ROUTES.posts}?per_page=100&_fields=slug`
  );

  if (error || !data) {
    return [];
  }

  return data.map((post) => post.slug);
}

// Get all article slugs for static paths
export async function getAllArticleSlugs(): Promise<string[]> {
  if (!isWordPressConfigured()) {
    return DEV_ARTICLES.map((item) => item.slug);
  }

  const slugs: string[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const { data } = await wpFetch<Array<{ slug: string }>>(
      `${API_ROUTES.posts}?per_page=100&page=${page}&_fields=slug&status=publish`
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