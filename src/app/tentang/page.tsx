import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description: 'Pelajari tentang ESI Provinsi Jawa Barat - Organisasi olahraga esports resmi Jawa Barat.',
};

export default function TentangPage() {
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
              ESI Provinsi Jawa Barat
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              Organisasi olahraga esports resmi yang berdedikasi untuk mengembangkan
              bakat dan prestasi atlet esports di Jawa Barat.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-esi-white">
        <div className="container-esi">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left - Text Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-esi-navy mb-4">
                  Identitas Organisasi
                </h2>
                <div className="w-16 h-1 bg-esi-gold mb-6" />
                <div className="space-y-4 text-esi-charcoal/80 leading-relaxed">
                  <p>
                    Esports Indonesia (ESI) Provinsi Jawa Barat merupakan organisasi
                    olahraga esports resmi yang fokus mengembangkan ekosistem esports
                    di Jawa Barat.
                  </p>
                  <p>
                    Detail identitas organisasi, susunan kepengurusan, dan program
                    kerja akan diperbarui di laman ini setelah data resmi tersedia.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-esi-navy mb-4">
                  Misi Kami
                </h2>
                <ul className="space-y-3">
                  {[
                    '[DATA RESMI AKAN DIISI]',
                    '[DATA RESMI AKAN DIISI]',
                    '[DATA RESMI AKAN DIISI]',
                    '[DATA RESMI AKAN DIISI]',
                    '[DATA RESMI AKAN DIISI]',
                  ].map((mission, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-esi-gold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-sm">{index + 1}</span>
                      </span>
                      <span className="text-esi-charcoal/80">{mission}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right - Visual */}
            <div className="lg:sticky lg:top-32">
              <div className="bg-esi-off-white rounded-2xl p-8">
                <div className="aspect-square bg-esi-navy/10 rounded-xl flex items-center justify-center mb-6">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-esi-red rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-5xl font-bold">ESI</span>
                    </div>
                    <p className="text-esi-silver-dark text-sm">[GAMBAR RESMI]</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-esi-silver-light/50">
                    <span className="text-esi-silver-dark">Nama Lengkap</span>
                    <span className="text-esi-charcoal font-medium">ESI Jawa Barat</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-esi-silver-light/50">
                    <span className="text-esi-silver-dark">Nama Resmi</span>
                    <span className="text-esi-charcoal font-medium">Esports Indonesia</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-esi-silver-light/50">
                    <span className="text-esi-silver-dark">Provinsi</span>
                    <span className="text-esi-charcoal font-medium">Jawa Barat</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-esi-silver-dark">Status</span>
                    <span className="px-3 py-1 bg-esi-off-white text-esi-charcoal text-sm rounded-full font-medium border border-esi-silver-light/50">
                      [DATA RESMI AKAN DIISI]
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
