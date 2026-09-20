import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui';
import { OptimizedImage } from '@/components/shared';

interface AchievementCardProps {
  id: number;
  title: string;
  slug: string;
  subjectName: string;
  competitionName: string;
  category: string;
  year: number;
  result: string;
  featuredImage?: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  } | null;
  className?: string;
}

const AchievementCard: React.FC<AchievementCardProps> = ({
  title,
  slug,
  subjectName,
  competitionName,
  category,
  year,
  result,
  featuredImage,
  className,
}) => {
  return (
    <article className={className}>
      <Link href={`/prestasi/${slug}`} className="group block">
        <div className="relative bg-esi-charcoal rounded-xl overflow-hidden border border-white/10 hover:border-esi-gold/50 transition-all duration-300">
          {/* Year Badge */}
          <div className="absolute top-4 right-4 z-10">
            <Badge variant="gold">{year}</Badge>
          </div>

          {/* Result Badge */}
          <div className="absolute top-4 left-4 z-10 bg-esi-gold text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
            {result}
          </div>

          {/* Image */}
          <div className="aspect-[4/3] bg-esi-charcoal/50 relative overflow-hidden">
            {featuredImage ? (
              <OptimizedImage
                src={featuredImage.url}
                alt={featuredImage.alt || title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-esi-gold/20 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-3xl">🏆</span>
                  </div>
                </div>
              </div>
            )}
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-esi-charcoal via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="p-6 relative">
            <Badge variant="outline" className="text-xs mb-3 border-esi-silver-light/50">
              {category}
            </Badge>
            <h3 className="text-lg font-bold text-white group-hover:text-esi-gold transition-colors line-clamp-2">
              {title}
            </h3>
            <p className="mt-2 text-white/60 text-sm">
              {competitionName}
            </p>
            <p className="text-esi-gold text-sm font-medium mt-1">
              {subjectName}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
};

export { AchievementCard };
