import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui';
import { OptimizedImage } from '@/components/shared';
import { formatDateShort } from '@/lib/utils';

interface ArticleCardProps {
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

const ArticleCard: React.FC<ArticleCardProps> = ({
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
      <Link href={`/artikel/${slug}`} className="group block h-full">
        <div className="bg-esi-white rounded-xl overflow-hidden border border-esi-silver-light/50 hover:border-esi-gold/50 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
          {/* Image */}
          <div className="aspect-[16/10] bg-esi-off-white relative overflow-hidden flex-shrink-0">
            {featuredImage ? (
              <OptimizedImage
                src={featuredImage.url}
                alt={featuredImage.alt || title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-esi-off-white">
                <svg className="w-12 h-12 text-esi-silver-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex items-center gap-3 text-sm text-esi-silver-dark mb-3">
              <Badge variant="gold" size="sm">{category}</Badge>
              <span>•</span>
              <time dateTime={publishedAt}>
                {formatDateShort(publishedAt)}
              </time>
            </div>
            <h3 className="text-lg font-bold text-esi-navy group-hover:text-esi-red transition-colors line-clamp-2 flex-1">
              {title}
            </h3>
            <p className="mt-3 text-esi-charcoal/70 text-sm line-clamp-3">
              {excerpt.replace(/<[^>]*>/g, '')}
            </p>
            <div className="mt-4 flex items-center text-esi-red font-semibold text-sm">
              Baca Selengkapnya
              <svg
                className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export { ArticleCard };
