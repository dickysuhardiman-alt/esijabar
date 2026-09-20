import { Metadata } from 'next';
import { SectionHeader } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Sejarah',
  description: 'Sejarah dan perjalanan ESI Provinsi Jawa Barat dalam mengembangkan esports di Jawa Barat.',
};

export default function SejarahPage() {
  // Placeholder timeline data - to be replaced with official data (no invented history)
  const timeline = [
    {
      year: '[TAHUN]',
      title: '[DATA RESMI AKAN DIISI]',
      description: '[DATA RESMI AKAN DIISI] - Konten resmi akan diperbarui setelah data tersedia.',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-esi-navy">
        <div className="container-esi">
          <div className="max-w-3xl">
            <span className="inline-block text-esi-gold text-sm font-semibold uppercase tracking-widest mb-4">
              Tentang Kami
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Sejarah
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              Perjalanan dan milestones ESI Provinsi Jawa Barat dalam mengembangkan
              ekosistem esports di Jawa Barat.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-esi-white">
        <div className="container-esi">
          <SectionHeader
            eyebrow="Timeline"
            title="Perjalanan Kami"
            subtitle="Milestone penting dalam sejarah ESI Provinsi Jawa Barat"
            variant="dark"
          />

          <div className="mt-16 relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-esi-silver-light hidden lg:block" />

            {/* Timeline Items */}
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className={`relative lg:flex items-center gap-8 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                    <div className="bg-esi-white rounded-xl p-6 shadow-md border border-esi-silver-light/50">
                      <span className="inline-block text-esi-gold text-4xl font-bold mb-2">
                        {item.year}
                      </span>
                      <h3 className="text-xl font-bold text-esi-navy mb-2">
                        {item.title}
                      </h3>
                      <p className="text-esi-charcoal/70">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Dot */}
                  <div className="hidden lg:flex w-8 h-8 bg-esi-red rounded-full items-center justify-center absolute left-1/2 transform -translate-x-1/2 z-10">
                    <span className="w-3 h-3 bg-white rounded-full" />
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="lg:w-1/2 hidden lg:block" />
                </div>
              ))}
            </div>
          </div>

          {/* Coming Soon Notice */}
          <div className="mt-16 p-8 bg-esi-off-white rounded-xl text-center">
            <div className="w-16 h-16 bg-esi-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-esi-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-esi-navy mb-2">Data Sejarah</h3>
            <p className="text-esi-charcoal/70">
              [DATA RESMI AKAN DIISI] - Sejarah lengkap akan diperbarui setelah data resmi tersedia.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
