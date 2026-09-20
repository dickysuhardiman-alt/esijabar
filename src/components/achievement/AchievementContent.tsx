import React from 'react';
import { RichText } from '@/components/shared';

interface AchievementContentProps {
  content: string;
  className?: string;
}

const AchievementContent: React.FC<AchievementContentProps> = ({ content, className }) => {
  return (
    <div className={`prose prose-lg max-w-none ${className || ''}`}>
      <RichText content={content} />
    </div>
  );
};

export { AchievementContent };
