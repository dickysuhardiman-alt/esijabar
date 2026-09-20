import { Metadata } from 'next';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Pagination, EmptyState } from '@/components/ui';
import { AchievementGrid } from '@/components/achievement';
import { getAchievements, getAvailableYears } from '@/lib/wordpress';

export const metadata: Metadata = {
  title: 'Prestasi',
  description: 'Prestasi dan pencapaian atlet ESI Provinsi Jawa Barat.',
};

interface PageProps {
  searchParams: Promise<{ page?: string; year?: string }>;
}

export default async function PrestasiPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page || '1', 10));
  const selectedYear = params.year ? parseInt(params.year, 10) : undefined;
  const perPage = 9;

  const { achievements, meta, error } = await getAchievements(currentPage, perPage, selectedYear);
  const years = await getAvailableYears();

  const filterClass = (active: boolean) =>
    cn(
      'px-4 py-2 rounded-lg font-medium text-sm transition-colors',
      active
        ? 'bg-esi-red text-white'
        : 'bg-esi-off-white text-esi-charcoal hover:bg-esi-silver-light'
    );

  const emptyTitle = error ? 'Gagal Memuat Prestasi' : 'Tidak Ada Prestasi';
  const emptyDescription = error
    ? 'Terjadi kesalahan saat memuat data. Silakan coba lagi beberapa saat lagi.'
    : selectedYear
      ? `Belum ada data prestasi untuk tahun ${selectedYear}.`
      : 'Belum ada data prestasi yang tersedia.';

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-esi-navy">
        <div className="container-esi">
          <div className="max-w-3xl">
            <span className="inline-block text-esi-gold text-sm font-semibold uppercase tracking-widest mb-4">
              Prestasi
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Prestasi & Pencapaian
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              Kebanggaan atlet ESI Provinsi Jawa Barat di berbagai kompetisi esports
              tingkat lokal, regional, dan nasional.
            </p>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-esi-white">
        <div className="container-esi">
          {/* Year Filter */}
          {years.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              <Link href="/prestasi" className={filterClass(!selectedYear)}>
                Semua
              </Link>
              {years.map((year) => (
                <Link
                  key={year}
                  href={`/prestasi?year=${year}`}
                  className={filterClass(selectedYear === year)}
                >
                  {year}
                </Link>
              ))}
            </div>
          )}

          {achievements.length > 0 ? (
            <>
              <AchievementGrid achievements={achievements} />
              {meta.totalPages > 1 && (
                <div className="mt-12">
                  <Pagination
                    currentPage={meta.currentPage}
                    totalPages={meta.totalPages}
                    basePath="/prestasi"
                    query={selectedYear ? { year: String(selectedYear) } : undefined}
                  />
                </div>
              )}
            </>
          ) : (
            <EmptyState
              title={emptyTitle}
              description={emptyDescription}
              icon={
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              }
            />
          )}
        </div>
      </section>
    </>
  );
}