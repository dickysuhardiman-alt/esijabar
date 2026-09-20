import { Metadata } from 'next';
import { SectionHeader } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Struktur Organisasi',
  description: 'Struktur organisasi ESI Provinsi Jawa Barat.',
};

export default function StrukturOrganisasiPage() {
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
              Struktur Organisasi
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              Susunan kepengurusan ESI Provinsi Jawa Barat dalam menjalankan
              organisasi dan program kerja.
            </p>
          </div>
        </div>
      </section>

      {/* Structure Section */}
      <section className="py-20 bg-esi-white">
        <div className="container-esi">
          <SectionHeader
            eyebrow="Organisasi"
            title="Struktur Kepengurusan"
            subtitle="Susunan organisasi ESI Provinsi Jawa Barat"
            variant="dark"
          />

          {/* Placeholder Notice */}
          <div className="mt-12 p-8 bg-esi-off-white rounded-xl text-center max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-esi-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-esi-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-esi-navy mb-2">
              [DATA RESMI AKAN DIISI]
            </h3>
            <p className="text-esi-charcoal/70">
              Struktur organisasi lengkap akan ditampilkan setelah data resmi tersedia.
              Mohon tunggu informasi lebih lanjut.
            </p>
          </div>

          {/* Organizational Chart Placeholder */}
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {/* Ketua */}
            <div className="text-center">
              <div className="bg-esi-red text-white rounded-xl p-6 mb-4">
                <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl font-bold">K</span>
                </div>
                <h3 className="font-bold text-lg">Ketua</h3>
                <p className="text-white/70 text-sm mt-1">[NAMA]</p>
              </div>
              <div className="w-0.5 h-8 bg-esi-silver-light mx-auto" />
            </div>

            {/* Wakil Ketua */}
            <div className="text-center">
              <div className="bg-esi-navy text-white rounded-xl p-6 mb-4">
                <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl font-bold">WK</span>
                </div>
                <h3 className="font-bold text-lg">Wakil Ketua</h3>
                <p className="text-white/70 text-sm mt-1">[NAMA]</p>
              </div>
              <div className="w-0.5 h-8 bg-esi-silver-light mx-auto" />
            </div>

            {/* Sekretaris */}
            <div className="text-center">
              <div className="bg-esi-gold text-white rounded-xl p-6 mb-4">
                <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl font-bold">S</span>
                </div>
                <h3 className="font-bold text-lg">Sekretaris</h3>
                <p className="text-white/70 text-sm mt-1">[NAMA]</p>
              </div>
              <div className="w-0.5 h-8 bg-esi-silver-light mx-auto" />
            </div>
          </div>

          {/* Division Heads */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className="bg-esi-off-white rounded-xl p-4 text-center border border-esi-silver-light/50"
                >
                  <span className="text-esi-gold font-bold">{index}</span>
                  <h4 className="font-semibold text-esi-navy text-sm mt-2">
                    [DIVISI]
                  </h4>
                  <p className="text-esi-charcoal/50 text-xs mt-1">[NAMA]</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </>
  );
}
