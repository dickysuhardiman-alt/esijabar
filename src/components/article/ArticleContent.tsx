import React from 'react';
import { RichText } from '@/components/shared';

interface ArticleContentProps {
  content: string;
  className?: string;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ content, className }) => {
  return (
    <div className={`prose prose-lg max-w-none ${className || ''}`}>
      <RichText content={content} />
    </div>
  );
};

export { ArticleContent };
