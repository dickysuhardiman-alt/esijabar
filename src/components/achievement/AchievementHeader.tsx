import React from 'react';
import { Breadcrumb, Badge } from '@/components/ui';
import { OptimizedImage } from '@/components/shared';
import { AchievementMeta } from './AchievementMeta';

interface AchievementHeaderProps {
  title: string;
  subjectName: string;
  competitionName: string;
  category: string;
  year: number;
  result: string;
  featuredImage?: {
    url: string;
    alt: string;
  } | null;
}

const AchievementHeader: React.FC<AchievementHeaderProps> = ({
  title,
  subjectName,
  competitionName,
  category,
  year,
  result,
  featuredImage,
}) => {
  return (
    <header className="mb-8">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Prestasi', href: '/prestasi' }]} className="mb-6" />

      {/* Featured Image */}
      {featuredImage && (
        <div className="aspect-video rounded-xl overflow-hidden mb-8 bg-esi-off-white relative">
          <OptimizedImage
            src={featuredImage.url}
            alt={featuredImage.alt || title}
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-esi-charcoal/80 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <Badge variant="gold" className="text-lg px-4 py-2">{result}</Badge>
          </div>
        </div>
      )}

      {/* Achievement Badge (if no image) */}
      {!featuredImage && (
        <div className="mb-6">
          <div className="inline-block bg-esi-gold text-white text-xl font-bold px-6 py-3 rounded-full shadow-lg">
            {result}
          </div>
        </div>
      )}

      {/* Title */}
      <h1
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-esi-navy leading-tight mb-6"
        dangerouslySetInnerHTML={{ __html: title }}
      />

      {/* Achievement Meta */}
      <AchievementMeta
        subjectName={subjectName}
        competitionName={competitionName}
        category={category}
        year={year}
        result={result}
      />
    </header>
  );
};

export { AchievementHeader };
