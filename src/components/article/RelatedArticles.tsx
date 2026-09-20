import React from 'react';
import { ArticleCard } from './ArticleCard';

interface RelatedArticlesProps {
  articles: Array<{
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
  }>;
  className?: string;
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ articles, className }) => {
  if (articles.length === 0) return null;

  return (
    <section className={`mt-16 pt-12 border-t border-esi-silver-light ${className || ''}`}>
      <h2 className="text-2xl font-bold text-esi-navy mb-8">Artikel Terkait</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.slice(0, 3).map((article) => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </div>
    </section>
  );
};

export { RelatedArticles };
