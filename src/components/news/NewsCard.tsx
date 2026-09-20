import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui';
import { OptimizedImage } from '@/components/shared';
import { formatDateShort } from '@/lib/utils';

interface NewsCardProps {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  } | null;
  category: string;
  publishedAt: string;
  className?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  slug,
  excerpt,
  featuredImage,
  category,
  publishedAt,
  className,
}) => {
  return (
    <article className={className}>
      <Link href={`/berita/${slug}`} className="group block">
        <div className="bg-esi-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
          {/* Image */}
          <div className="aspect-video bg-esi-navy/10 relative overflow-hidden">
            {featuredImage ? (
              <OptimizedImage
                src={featuredImage.url}
                alt={featuredImage.alt || title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-esi-silver-dark text-sm">[GAMBAR TERSEDIA SETELAH TERHUBUNG WORDPRESS]</span>
              </div>
            )}
            <Badge variant="red" className="absolute top-4 left-4">
              {category}
            </Badge>
          </div>

          {/* Content */}
          <div className="p-6">
            <time
              dateTime={publishedAt}
              className="text-sm text-esi-silver-dark"
            >
              {formatDateShort(publishedAt)}
            </time>
            <h3 className="mt-2 text-lg font-bold text-esi-navy group-hover:text-esi-red transition-colors line-clamp-2">
              {title}
            </h3>
            <p className="mt-3 text-esi-charcoal/70 line-clamp-3 text-sm">
              {excerpt.replace(/<[^>]*>/g, '')}
            </p>

            <div className="mt-4 flex items-center text-esi-red font-semibold text-sm group-hover:gap-2 transition-all">
              Baca Selengkapnya
              <svg
                className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export { NewsCard };
