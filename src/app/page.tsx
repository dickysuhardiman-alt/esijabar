import { Hero, FederationIntro, LatestNews, FeaturedAchievements,} from '@/components/home';
import { getNews, getArticles, getAchievements } from '@/lib/wordpress';

export default async function HomePage() {
  const [{ news }, { articles }, { achievements }] = await Promise.all([
    getNews(1, 3),
    getArticles(1, 3),
    getAchievements(1, 3),
  ]);

  return (
    <>
      <Hero />
      <FederationIntro />
      <LatestNews news={news} />
      <FeaturedAchievements achievements={achievements} />
    </>
  );
}