/**
 * WordPress Pages API - Static Pages Module
 *
 * Uses native WordPress Pages for static content
 */

import { wpFetch, extractFeaturedImage } from './client';
import type { WPPostApi } from './client';
import { API_ROUTES } from '@/lib/constants';
import type { PageDetail } from '@/types';

// Fetch single page by slug
export async function getPageBySlug(
  slug: string
): Promise<{ page: PageDetail | null; error: string | null }> {
  const { data, error } = await wpFetch(
    `${API_ROUTES.pages}?slug=${slug}&_embed=wp:featuredmedia&status=publish`
  );

  if (error || !data || !Array.isArray(data) || data.length === 0) {
    return { page: null, error: error || 'Page not found' };
  }

  const post = data[0];
  const featuredImage = extractFeaturedImage(post._embedded);

  const page: PageDetail = {
    id: post.id,
    title: post.title.rendered,
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
    publishedAt: post.date,
    updatedAt: post.modified,
  };

  return { page, error: null };
}

// Fetch multiple pages by slugs
export async function getPagesBySlugs(
  slugs: string[]
): Promise<{ pages: PageDetail[]; error: string | null }> {
  const { data, error } = await wpFetch<WPPostApi[]>(
    `${API_ROUTES.pages}?slug=${slugs.join(',')}&_embed=wp:featuredmedia&status=publish&per_page=${slugs.length}`
  );

  if (error || !data || !Array.isArray(data)) {
    return { pages: [], error };
  }

  const pages: PageDetail[] = data.map((post) => {
    const featuredImage = extractFeaturedImage(post._embedded);

    return {
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
      publishedAt: post.date,
      updatedAt: post.modified || post.date,
    };
  });

  return { pages, error: null };
}

// Static page slugs
export const STATIC_PAGE_SLUGS = [
  'tentang',
  'sejarah',
  'visi-misi',
  'struktur-organisasi',
  'pengurus',
  'kontak',
] as const;

// Fetch all static pages
export async function getAllStaticPages(): Promise<{
  pages: PageDetail[];
  error: string | null;
}> {
  return getPagesBySlugs([...STATIC_PAGE_SLUGS]);
}
