import { Metadata } from 'next';
import { Pagination, SearchInput, EmptyState } from '@/components/ui';
import { NewsGrid } from '@/components/news';
import { getNews } from '@/lib/wordpress';

export const metadata: Metadata = {
  title: 'Berita Terkini',
  description: 'Berita dan informasi terkini dari ESI Provinsi Jawa Barat.',
};

interface PageProps {
  searchParams: Promise<{ page?: string; q?: string }>;
}

export default async function BeritaPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page || '1', 10));
  const q = (params.q || '').trim();
  const perPage = 9;

  const { news, meta, error } = await getNews(currentPage, perPage, undefined, q || undefined);

  const emptyTitle = error ? 'Gagal Memuat Berita' : 'Tidak Ada Berita';
  const emptyDescription = error
    ? 'Terjadi kesalahan saat memuat data. Silakan coba lagi beberapa saat lagi.'
    : q
      ? `Tidak ada berita yang cocok dengan "${q}".`
      : 'Belum ada berita yang tersedia saat ini.';

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-esi-navy">
        <div className="container-esi">
          <div className="max-w-3xl">
            <span className="inline-block text-esi-gold text-sm font-semibold uppercase tracking-widest mb-4">
              Berita
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Berita Terkini
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              Informasi dan berita terkini dari ESI Provinsi Jawa Barat tentang
              perkembangan esports di Jawa Barat.
            </p>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 bg-esi-white">
        <div className="container-esi">
          {/* Search */}
          <div className="mb-12">
            <SearchInput
              value={q}
              navigateTo="/berita"
              placeholder="Cari berita..."
              className="max-w-md"
            />
          </div>

          {news.length > 0 ? (
            <>
              <NewsGrid news={news} />
              {meta.totalPages > 1 && (
                <div className="mt-12">
                  <Pagination
                    currentPage={meta.currentPage}
                    totalPages={meta.totalPages}
                    basePath="/berita"
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              }
            />
          )}
        </div>
      </section>
    </>
  );
}