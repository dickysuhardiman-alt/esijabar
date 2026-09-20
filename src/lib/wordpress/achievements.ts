/**
 * WordPress Achievements API - Prestasi Module
 *
 * Uses Custom Post Type 'achievement' for prestasi content.
 * Falls back to clearly-marked development placeholder data when
 * WordPress is not configured (`NEXT_PUBLIC_WORDPRESS_URL` empty).
 */

import {
  wpFetch,
  wpFetchWithPagination,
  extractFeaturedImage,
  isWordPressConfigured,
} from './client';
import type { WPPostApi } from './client';
import { API_ROUTES } from '@/lib/constants';
import type { AchievementCard, AchievementDetail } from '@/types';

// WordPress post type for achievements
interface WPPost extends WPPostApi {
  acf?: {
    subject_name?: string;
    competition_name?: string;
    category?: string;
    year?: number;
    result?: string;
  };
}

// ============================================================
// Development placeholder data
// Shown ONLY when WordPress is not configured. These items are
// clearly marked as development placeholders - never official data.
// ============================================================

const DEV_YEARS = [2025, 2024] as const;

const DEV_ACHIEVEMENTS: AchievementCard[] = Array.from(
  { length: 6 },
  (_, i) => {
    const n = i + 1;
    return {
      id: n,
      title: `[DEVELOPMENT] Contoh Prestasi ${n} — [DATA RESMI AKAN DIISI]`,
      slug: `contoh-prestasi-${n}`,
      subjectName: 'Atlet/Tim [NAMA]',
      competitionName: 'Kompetisi [NAMA KOMPETISI]',
      category: 'Kategori [KATEGORI]',
      year: DEV_YEARS[i % DEV_YEARS.length] as number,
      result: '[HASIL]',
      featuredImage: null,
    };
  }
);

const DEV_EXCERPT_PREFIX = '[DATA RESMI AKAN DIISI]';
const DEV_CONTENT = (title: string) =>
  `<p><strong>${DEV_EXCERPT_PREFIX}</strong></p>
<p>Konten resmi untuk &ldquo;${title}&rdquo; akan ditampilkan di sini setelah terhubung dengan WordPress (${DEV_EXCERPT_PREFIX}).</p>
<p>Data atlet/tim, nama kompetisi, kategori, hasil, dan tahun dapat diisi melalui Custom Post Type yang dikelola dari dashboard admin.</p>`;

function devFilterAchievements(
  items: AchievementCard[],
  year?: number
): AchievementCard[] {
  if (year) {
    return items.filter((item) => item.year === year);
  }
  return items;
}

function devPaginate(items: AchievementCard[], page: number, perPage: number) {
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * perPage;
  return {
    achievements: items.slice(start, start + perPage),
    meta: { totalPages, totalItems, currentPage },
    error: null,
  };
}

// Fetch all achievements with pagination
export async function getAchievements(
  page: number = 1,
  perPage: number = 9,
  year?: number
): Promise<{
  achievements: AchievementCard[];
  meta: { totalPages: number; totalItems: number; currentPage: number };
  error: string | null;
}> {
  if (!isWordPressConfigured()) {
    return devPaginate(devFilterAchievements(DEV_ACHIEVEMENTS, year), page, perPage);
  }

  const params: Record<string, string | number> = {
    page,
    per_page: perPage,
    _embed: 'wp:featuredmedia',
    status: 'publish',
    orderby: 'date',
    order: 'desc',
  };

  if (year) {
    // Filter by year meta field (if using ACF)
    params.meta_query = JSON.stringify([
      { key: 'year', value: year, compare: '=' },
    ]);
  }

  const { data, meta, error } = await wpFetchWithPagination<WPPost>(
    API_ROUTES.achievements,
    params
  );

  if (error || !data) {
    return {
      achievements: [],
      meta: { totalPages: 0, totalItems: 0, currentPage: page },
      error,
    };
  }

  const achievements: AchievementCard[] = data.map((post) => {
    const featuredImage = extractFeaturedImage(post._embedded);
    const acf = post.acf || {};

    return {
      id: post.id,
      title: post.title.rendered || '',
      slug: post.slug,
      subjectName: acf.subject_name || 'Tim ESI Jawa Barat',
      competitionName: acf.competition_name || 'Kompetisi',
      category: acf.category || 'Umum',
      year: acf.year || new Date(post.date).getFullYear(),
      result: acf.result || 'Peserta',
      featuredImage: featuredImage.url
        ? { url: featuredImage.url, alt: featuredImage.alt }
        : null,
    };
  });

  return { achievements, meta, error: null };
}

// Fetch single achievement by slug
export async function getAchievementBySlug(
  slug: string
): Promise<{ achievement: AchievementDetail | null; error: string | null }> {
  if (!isWordPressConfigured()) {
    const card = DEV_ACHIEVEMENTS.find((item) => item.slug === slug);
    if (!card) {
      return { achievement: null, error: 'Achievement not found' };
    }
    const achievement: AchievementDetail = {
      id: card.id,
      title: card.title,
      slug: card.slug,
      content: DEV_CONTENT(card.title),
      featuredImage: null,
      subjectName: card.subjectName,
      competitionName: card.competitionName,
      category: card.category,
      year: card.year,
      result: card.result,
      publishedAt: `${card.year}-01-01T00:00:00`,
      updatedAt: `${card.year}-01-01T00:00:00`,
      relatedAchievements: DEV_ACHIEVEMENTS.filter(
        (item) => item.slug !== slug
      ).slice(0, 3),
    };
    return { achievement, error: null };
  }

  const { data, error } = await wpFetch<WPPost[]>(
    `${API_ROUTES.achievements}?slug=${slug}&_embed=wp:featuredmedia&status=publish`
  );

  if (error || !data || !Array.isArray(data) || data.length === 0) {
    return { achievement: null, error: error || 'Achievement not found' };
  }

  const post = data[0];
  const featuredImage = extractFeaturedImage(post._embedded);
  const acf = post.acf || {};

  const achievement: AchievementDetail = {
    id: post.id,
    title: post.title.rendered || '',
    slug: post.slug,
    content: post.content?.rendered || '',
    featuredImage: featuredImage.url
      ? {
          url: featuredImage.url,
          alt: featuredImage.alt,
          width: featuredImage.width,
          height: featuredImage.height,
        }
      : null,
    subjectName: acf.subject_name || 'Tim ESI Jawa Barat',
    competitionName: acf.competition_name || 'Kompetisi',
    category: acf.category || 'Umum',
    year: acf.year || new Date(post.date).getFullYear(),
    result: acf.result || 'Peserta',
    publishedAt: post.date,
    updatedAt: post.modified || post.date,
    relatedAchievements: [],
  };

  return { achievement, error: null };
}

// Fetch achievement slugs for static generation
export async function getAchievementSlugs(): Promise<string[]> {
  if (!isWordPressConfigured()) {
    return DEV_ACHIEVEMENTS.map((item) => item.slug);
  }

  const { data, error } = await wpFetch<Array<{ slug: string }>>(
    `${API_ROUTES.achievements}?per_page=100&_fields=slug`
  );

  if (error || !data) {
    return [];
  }

  return data.map((post) => post.slug);
}

// Get all achievement slugs for static paths
export async function getAllAchievementSlugs(): Promise<string[]> {
  if (!isWordPressConfigured()) {
    return DEV_ACHIEVEMENTS.map((item) => item.slug);
  }

  const slugs: string[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const { data } = await wpFetch<Array<{ slug: string }>>(
      `${API_ROUTES.achievements}?per_page=100&page=${page}&_fields=slug&status=publish`
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

// Get available years for filtering
export async function getAvailableYears(): Promise<number[]> {
  if (!isWordPressConfigured()) {
    return [...DEV_YEARS].sort((a, b) => b - a);
  }

  const { data, error } = await wpFetch<Array<{ date: string }>>(
    `${API_ROUTES.achievements}?per_page=100&_fields=date`
  );

  if (error || !data) {
    return [];
  }

  const years = new Set<number>();
  data.forEach((post) => {
    const year = new Date(post.date).getFullYear();
    years.add(year);
  });

  return Array.from(years).sort((a, b) => b - a);
}