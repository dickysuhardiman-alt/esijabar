/**
 * WordPress Media API - Media Helper Module
 *
 * Utilities for working with WordPress media
 */

import { wpFetch } from './client';
import { API_ROUTES } from '@/lib/constants';

export interface MediaSize {
  file: string;
  width: number;
  height: number;
  source_url: string;
}

export interface MediaDetails {
  width: number;
  height: number;
  file: string;
  sizes: {
    thumbnail?: MediaSize;
    medium?: MediaSize;
    medium_large?: MediaSize;
    large?: MediaSize;
    full?: MediaSize;
  };
}

export interface MediaItem {
  id: number;
  source_url: string;
  alt_text: string;
  title: string;
  caption: string;
  description: string;
  media_details: MediaDetails;
}

/**
 * Get media by ID
 */
export async function getMediaById(id: number): Promise<MediaItem | null> {
  const { data, error } = await wpFetch<MediaItem>(`${API_ROUTES.media}/${id}`);

  if (error || !data) {
    return null;
  }

  return data;
}

/**
 * Get optimized image URL based on desired size
 */
export function getOptimizedImageUrl(
  media: MediaItem,
  desiredSize: 'thumbnail' | 'medium' | 'medium_large' | 'large' | 'full' = 'medium'
): string {
  const sizes = media.media_details?.sizes || {};
  const size = sizes[desiredSize];

  if (size?.source_url) {
    return size.source_url;
  }

  return media.source_url;
}

/**
 * Get responsive image srcset
 */
export function getResponsiveSrcSet(media: MediaItem): string {
  const sizes = media.media_details?.sizes || {};
  const srcset: string[] = [];

  const sizeMap: Array<keyof typeof sizes> = [
    'thumbnail',
    'medium',
    'medium_large',
    'large',
  ];

  sizeMap.forEach((sizeName) => {
    const size = sizes[sizeName];
    if (size?.source_url) {
      srcset.push(`${size.source_url} ${size.width}w`);
    }
  });

  return srcset.join(', ');
}

/**
 * Generate placeholder blur data URL (URL-encoded SVG solid color)
 *
 * Uses a URL-encoded SVG data URL so it works in both Node.js and the
 * browser without relying on `Buffer` (unavailable on the client).
 */
export function generateBlurDataUrl(color: string = '#1E2B60'): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="${color}"/></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
