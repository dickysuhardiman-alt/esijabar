import React from 'react';
import { AchievementCard } from './AchievementCard';

interface AchievementItem {
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
  } | null;
}

interface AchievementGridProps {
  achievements: AchievementItem[];
  className?: string;
}

const AchievementGrid: React.FC<AchievementGridProps> = ({ achievements, className }) => {
  return (
    <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 ${className || ''}`}>
      {achievements.map((item) => (
        <AchievementCard key={item.id} {...item} />
      ))}
    </div>
  );
};

export { AchievementGrid };
