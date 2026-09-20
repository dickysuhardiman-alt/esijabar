import React from 'react';
import { NewsCard } from './NewsCard';

interface NewsItem {
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

interface NewsGridProps {
  news: NewsItem[];
  className?: string;
}

const NewsGrid: React.FC<NewsGridProps> = ({ news, className }) => {
  return (
    <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 ${className || ''}`}>
      {news.map((item) => (
        <NewsCard key={item.id} {...item} />
      ))}
    </div>
  );
};

export { NewsGrid };
