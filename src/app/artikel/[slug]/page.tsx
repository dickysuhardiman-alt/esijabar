import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/layout';
import { ArticleHeader, ArticleContent, RelatedArticles } from '@/components/article';
import { getArticleBySlug, getArticleSlugs } from '@/lib/wordpress';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { article } = await getArticleBySlug(slug);

  if (!article) {
    return { title: 'Artikel Tidak Ditemukan' };
  }

  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArtikelDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const { article } = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="pt-32 pb-20">
      <Container size="lg">
        <ArticleHeader
          title={article.title}
          category={article.categories[0] || 'Artikel'}
          publishedAt={article.publishedAt}
          updatedAt={article.updatedAt}
          author={article.author}
          featuredImage={article.featuredImage}
        />
        <ArticleContent content={article.content} />
        <RelatedArticles articles={article.relatedArticles} />
      </Container>
    </article>
  );
}

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}