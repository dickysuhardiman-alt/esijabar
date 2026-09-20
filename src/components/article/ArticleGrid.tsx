import React from 'react';
import { ArticleCard } from './ArticleCard';

interface ArticleItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: {
    url: string;
    alt: string;
  } | null;
  category: string;
  publishedAt: string;
}

interface ArticleGridProps {
  articles: ArticleItem[];
  className?: string;
}

const ArticleGrid: React.FC<ArticleGridProps> = ({ articles, className }) => {
  return (
    <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 ${className || ''}`}>
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          {...article}
        />
      ))}
    </div>
  );
};

export { ArticleGrid };
