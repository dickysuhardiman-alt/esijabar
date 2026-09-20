import { Metadata } from 'next';
import { Pagination, SearchInput, EmptyState } from '@/components/ui';
import { ArticleGrid } from '@/components/article';
import { getArticles } from '@/lib/wordpress';

export const metadata: Metadata = {
  title: 'Artikel',
  description: 'Artikel dan edukasi seputar esports dari ESI Provinsi Jawa Barat.',
};

interface PageProps {
  searchParams: Promise<{ page?: string; q?: string }>;
}

export default async function ArtikelPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page || '1', 10));
  const q = (params.q || '').trim();
  const perPage = 9;

  const { articles, meta, error } = await getArticles(currentPage, perPage, undefined, q || undefined);

  const emptyTitle = error ? 'Gagal Memuat Artikel' : 'Tidak Ada Artikel';
  const emptyDescription = error
    ? 'Terjadi kesalahan saat memuat data. Silakan coba lagi beberapa saat lagi.'
    : q
      ? `Tidak ada artikel yang cocok dengan "${q}".`
      : 'Belum ada artikel yang tersedia saat ini.';

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-esi-navy">
        <div className="container-esi">
          <div className="max-w-3xl">
            <span className="inline-block text-esi-gold text-sm font-semibold uppercase tracking-widest mb-4">
              Artikel
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Artikel
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              Artikel, edukasi, dan tips seputar esports untuk menambah pengetahuan
              dan mengembangkan kemampuan Anda.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-20 bg-esi-white">
        <div className="container-esi">
          {/* Search */}
          <div className="mb-12">
            <SearchInput
              value={q}
              navigateTo="/artikel"
              placeholder="Cari artikel..."
              className="max-w-md"
            />
          </div>

          {articles.length > 0 ? (
            <>
              <ArticleGrid articles={articles} />
              {meta.totalPages > 1 && (
                <div className="mt-12">
                  <Pagination
                    currentPage={meta.currentPage}
                    totalPages={meta.totalPages}
                    basePath="/artikel"
                    query={q ? { q } : undefined}
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              }
            />
          )}
        </div>
      </section>
    </>
  );
}