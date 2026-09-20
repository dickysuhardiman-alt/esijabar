import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/layout';
import { AchievementHeader, AchievementContent } from '@/components/achievement';
import { getAchievementBySlug, getAchievementSlugs } from '@/lib/wordpress';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { achievement } = await getAchievementBySlug(slug);

  if (!achievement) {
    return { title: 'Prestasi Tidak Ditemukan' };
  }

  return {
    title: achievement.title,
    description: `${achievement.result} ${achievement.category} - ${achievement.competitionName}`,
  };
}

export default async function PrestasiDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const { achievement } = await getAchievementBySlug(slug);

  if (!achievement) {
    notFound();
  }

  return (
    <article className="pt-32 pb-20">
      <Container size="lg">
        <AchievementHeader
          title={achievement.title}
          subjectName={achievement.subjectName}
          competitionName={achievement.competitionName}
          category={achievement.category}
          year={achievement.year}
          result={achievement.result}
          featuredImage={achievement.featuredImage}
        />
        <AchievementContent content={achievement.content} />
      </Container>
    </article>
  );
}

export async function generateStaticParams() {
  const slugs = await getAchievementSlugs();
  return slugs.map((slug) => ({ slug }));
}