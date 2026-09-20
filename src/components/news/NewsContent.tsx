import React from 'react';
import { RichText } from '@/components/shared';

interface NewsContentProps {
  content: string;
  className?: string;
}

const NewsContent: React.FC<NewsContentProps> = ({ content, className }) => {
  return (
    <div className={`prose prose-lg max-w-none ${className || ''}`}>
      <RichText content={content} />
    </div>
  );
};

export { NewsContent };
