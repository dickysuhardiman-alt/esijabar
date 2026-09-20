import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/layout';
import { NewsHeader, NewsContent, RelatedNews } from '@/components/news';
import { getNewsBySlug, getNewsSlugs } from '@/lib/wordpress';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { news } = await getNewsBySlug(slug);

  if (!news) {
    return { title: 'Berita Tidak Ditemukan' };
  }

  return {
    title: news.title,
    description: news.excerpt,
  };
}

export default async function BeritaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const { news } = await getNewsBySlug(slug);

  if (!news) {
    notFound();
  }

  return (
    <article className="pt-32 pb-20">
      <Container size="lg">
        <NewsHeader
          title={news.title}
          category={news.category}
          publishedAt={news.publishedAt}
          updatedAt={news.updatedAt}
          author={news.author}
          featuredImage={news.featuredImage}
        />
        <NewsContent content={news.content} />
        <RelatedNews news={news.relatedNews} />
      </Container>
    </article>
  );
}

export async function generateStaticParams() {
  const slugs = await getNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}