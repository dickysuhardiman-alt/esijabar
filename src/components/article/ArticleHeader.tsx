import React from 'react';
import { Breadcrumb, Badge } from '@/components/ui';
import { OptimizedImage } from '@/components/shared';
import { formatDate, formatDateTime } from '@/lib/utils';

interface ArticleHeaderProps {
  title: string;
  category: string;
  publishedAt: string;
  updatedAt?: string;
  author?: {
    name: string;
  };
  featuredImage?: {
    url: string;
    alt: string;
  } | null;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  title,
  category,
  publishedAt,
  updatedAt,
  author,
  featuredImage,
}) => {
  return (
    <header className="mb-8">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Artikel', href: '/artikel' }]} className="mb-6" />

      {/* Featured Image */}
      {featuredImage && (
        <div className="aspect-video rounded-xl overflow-hidden mb-8 bg-esi-off-white relative">
          <OptimizedImage
            src={featuredImage.url}
            alt={featuredImage.alt || title}
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
        </div>
      )}

      {/* Category */}
      <Badge variant="gold" className="mb-4">{category}</Badge>

      {/* Title */}
      <h1
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-esi-navy leading-tight mb-6"
        dangerouslySetInnerHTML={{ __html: title }}
      />

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-esi-silver-dark pb-6 border-b border-esi-silver-light">
        {author && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-esi-navy rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {author.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <span>{author.name}</span>
          </div>
        )}
        <span>•</span>
        <time dateTime={publishedAt}>
          {formatDate(publishedAt)}
        </time>
        {updatedAt && updatedAt !== publishedAt && (
          <>
            <span>•</span>
            <span className="text-esi-silver-dark">
              Diperbarui: {formatDateTime(updatedAt)}
            </span>
          </>
        )}
      </div>
    </header>
  );
};

export { ArticleHeader };
