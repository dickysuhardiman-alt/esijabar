import React from 'react';
import { Badge } from '@/components/ui';

interface AchievementMetaProps {
  subjectName: string;
  competitionName: string;
  category: string;
  year: number;
  result: string;
  className?: string;
}

const AchievementMeta: React.FC<AchievementMetaProps> = ({
  subjectName,
  competitionName,
  category,
  year,
  result,
  className,
}) => {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-esi-off-white rounded-xl ${className || ''}`}>
      <div>
        <span className="text-xs text-esi-silver-dark uppercase tracking-wide">Tahun</span>
        <div className="text-2xl font-bold text-esi-gold">{year}</div>
      </div>
      <div>
        <span className="text-xs text-esi-silver-dark uppercase tracking-wide">Hasil</span>
        <div className="text-lg font-bold text-esi-navy">{result}</div>
      </div>
      <div className="col-span-2">
        <span className="text-xs text-esi-silver-dark uppercase tracking-wide">Kategori</span>
        <Badge variant="navy" size="sm" className="mt-1">{category}</Badge>
      </div>
      <div className="col-span-2">
        <span className="text-xs text-esi-silver-dark uppercase tracking-wide">Atlet/Tim</span>
        <div className="text-base font-semibold text-esi-charcoal">{subjectName}</div>
      </div>
      <div className="col-span-2">
        <span className="text-xs text-esi-silver-dark uppercase tracking-wide">Kompetisi</span>
        <div className="text-base font-semibold text-esi-charcoal">{competitionName}</div>
      </div>
    </div>
  );
};

export { AchievementMeta };
