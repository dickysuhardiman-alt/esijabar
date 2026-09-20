'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SectionHeader, Button } from '@/components/ui';
import { OptimizedImage } from '@/components/shared';
import { formatDateShort } from '@/lib/utils';

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

interface LatestArticlesProps {
  articles: ArticleItem[];
}

const LatestArticles: React.FC<LatestArticlesProps> = ({ articles }) => {
  return (
    <section className="py-20 bg-esi-white">
      <div className="container-esi">
        <SectionHeader
          eyebrow="Artikel"
          title="Baca & Pelajari"
          subtitle="Artikel seputar esports, tips, dan informasi menarik"
          variant="dark"
        />

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.slice(0, 3).map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/artikel/${item.slug}`} className="group block h-full">
                <div className="bg-esi-white rounded-xl overflow-hidden border border-esi-silver-light/50 hover:border-esi-gold/50 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  {/* Image */}
                  <div className="aspect-[16/10] bg-esi-off-white relative overflow-hidden">
                    {item.featuredImage ? (
                      <OptimizedImage
                        src={item.featuredImage.url}
                        alt={item.featuredImage.alt || item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-esi-silver-dark text-sm">[GAMBAR TERSEDIA SETELAH TERHUBUNG WORDPRESS]</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 text-sm text-esi-silver-dark mb-3">
                      <span className="text-esi-gold font-medium">{item.category}</span>
                      <span>•</span>
                      <time dateTime={item.publishedAt}>
                        {formatDateShort(item.publishedAt)}
                      </time>
                    </div>
                    <h3 className="text-lg font-bold text-esi-navy group-hover:text-esi-red transition-colors line-clamp-2 flex-1">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-esi-charcoal/70 text-sm line-clamp-3">
                      {item.excerpt.replace(/<[^>]*>/g, '')}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/artikel">
            <Button variant="outline" size="lg">
              Lihat Semua Artikel
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export { LatestArticles };
