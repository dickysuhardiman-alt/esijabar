/**
 * WordPress REST API Client
 *
 * Centralized API communication layer for WordPress Headless CMS
 */

import { API_ROUTES, PAGINATION } from '@/lib/constants';

export interface WPClientConfig {
  baseUrl?: string;
  perPage?: number;
}

// Types for WordPress embedded data
interface WPMediaDetails {
  width: number;
  height: number;
  file: string;
  sizes: {
    thumbnail?: { source_url: string; width: number; height: number };
    medium?: { source_url: string; width: number; height: number };
    medium_large?: { source_url: string; width: number; height: number };
    large?: { source_url: string; width: number; height: number };
  };
}

interface WPMedia {
  id: number;
  source_url: string;
  alt_text: string;
  title: { rendered: string };
  media_details: WPMediaDetails;
}

interface WPAuthor {
  id: number;
  name: string;
  slug: string;
}

interface WPTerm {
  id: number;
  name: string;
  slug: string;
}

interface WPEmbedded {
  author?: WPAuthor[];
  'wp:featuredmedia'?: WPMedia[];
  'wp:term'?: WPTerm[][];
}

/**
 * Minimal raw WordPress post shape returned by the REST API.
 * Used across the berita, artikel, and prestasi modules.
 */
export interface WPPostApi {
  id: number;
  title: { rendered?: string };
  slug: string;
  excerpt?: { rendered?: string };
  content?: { rendered?: string };
  date: string;
  modified?: string;
  featured_media?: number;
  status?: string;
  _embedded?: Record<string, unknown>;
}

/**
 * Get WordPress API base URL
 */
export function getWordPressUrl(): string {
  return process.env.NEXT_PUBLIC_WORDPRESS_URL || '';
}

/**
 * Check if WordPress is configured
 */
export function isWordPressConfigured(): boolean {
  const url = getWordPressUrl();
  return Boolean(url && url.length > 0);
}

/**
 * Build full API URL
 */
export function buildApiUrl(
  endpoint: string,
  params: Record<string, string | number | undefined> = {}
): string {
  const baseUrl = getWordPressUrl();

  if (!baseUrl) {
    console.warn('WordPress URL not configured. Using placeholder data.');
    return '';
  }

  const url = new URL(endpoint, baseUrl);

  // Add default parameters
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
}

/**
 * Fetch with error handling
 */
export async function wpFetch<T>(
  endpoint: string,
  params: Record<string, string | number | undefined> = {}
): Promise<{ data: T | null; error: string | null }> {
  const url = buildApiUrl(endpoint, params);

  if (!url) {
    return { data: null, error: 'WordPress URL not configured' };
  }

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 60, // ISR: Revalidate every 60 seconds
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`WP API Error (${response.status}):`, errorText);
      return {
        data: null,
        error: `API returned ${response.status}: ${response.statusText}`,
      };
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('WP API Fetch Error:', message);
    return { data: null, error: message };
  }
}

/**
 * Fetch with pagination headers
 */
export async function wpFetchWithPagination<T>(
  endpoint: string,
  params: Record<string, string | number | undefined> = {}
): Promise<{
  data: T[];
  meta: { totalPages: number; totalItems: number; currentPage: number };
  error: string | null;
}> {
  const baseUrl = getWordPressUrl();

  if (!baseUrl) {
    return {
      data: [],
      meta: { totalPages: 0, totalItems: 0, currentPage: 1 },
      error: 'WordPress URL not configured',
    };
  }

  const page = params.page || 1;
  const perPage = params.per_page || PAGINATION.defaultPerPage;

  const url = buildApiUrl(endpoint, { ...params, page, per_page: perPage });

  if (!url) {
    return {
      data: [],
      meta: { totalPages: 0, totalItems: 0, currentPage: 1 },
      error: 'WordPress URL not configured',
    };
  }

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 60,
      },
    });

    if (!response.ok) {
      return {
        data: [],
        meta: { totalPages: 0, totalItems: 0, currentPage: 1 },
        error: `API returned ${response.status}`,
      };
    }

    const data = await response.json();
    const totalItems = parseInt(response.headers.get('X-WP-Total') || '0', 10);
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1', 10);

    return {
      data,
      meta: { totalPages, totalItems, currentPage: Number(page) },
      error: null,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return {
      data: [],
      meta: { totalPages: 0, totalItems: 0, currentPage: 1 },
      error: message,
    };
  }
}

/**
 * Extract featured image from _embedded
 */
export function extractFeaturedImage(embedded?: Record<string, unknown>): {
  url: string | null;
  alt: string;
  width: number;
  height: number;
} {
  if (!embedded) {
    return { url: null, alt: '', width: 0, height: 0 };
  }

  const featuredMedia = embedded['wp:featuredmedia'];
  if (!Array.isArray(featuredMedia) || !featuredMedia[0]) {
    return { url: null, alt: '', width: 0, height: 0 };
  }

  const media = featuredMedia[0] as Record<string, unknown>;
  const mediaDetails = media?.media_details as Record<string, unknown> | undefined;

  return {
    url: (media?.source_url as string) || null,
    alt: (media?.alt_text as string) || '',
    width: (mediaDetails?.width as number) || 0,
    height: (mediaDetails?.height as number) || 0,
  };
}

/**
 * Extract author from _embedded
 */
export function extractAuthor(embedded?: WPEmbedded): { id: number; name: string } {
  if (!embedded?.author?.[0]) {
    return { id: 0, name: 'Anonymous' };
  }

  const author = embedded.author[0];
  return {
    id: author.id,
    name: author.name,
  };
}

/**
 * Extract categories from _embedded
 */
export function extractCategories(embedded?: WPEmbedded): string[] {
  if (!embedded?.['wp:term']) {
    return [];
  }

  const terms = embedded['wp:term'];
  const categories = terms[0] || [];

  return categories.map((cat) => cat.name);
}

/**
 * Extract tags from _embedded
 */
export function extractTags(embedded?: WPEmbedded): string[] {
  if (!embedded?.['wp:term']) {
    return [];
  }

  const terms = embedded['wp:term'];
  const tags = terms[1] || [];

  return tags.map((tag) => tag.name);
}

export { API_ROUTES, PAGINATION };
