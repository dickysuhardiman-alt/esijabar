import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Visi & Misi',
  description: 'Visi dan misi ESI Provinsi Jawa Barat dalam mengembangkan esports di Jawa Barat.',
};

export default function VisiMisiPage() {
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
              Visi & Misi
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              Landasan dan arah pembangunan ekosistem esports di Provinsi Jawa Barat.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-esi-white">
        <div className="container-esi">
          <div className="max-w-4xl mx-auto">
            {/* Vision */}
            <div className="text-center mb-20">
              <span className="inline-flex items-center gap-2 text-esi-red text-sm font-semibold uppercase tracking-widest mb-4">
                <span className="w-8 h-px bg-esi-red" />
                Visi
                <span className="w-8 h-px bg-esi-red" />
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-esi-navy mb-8 leading-tight">
                [DATA RESMI AKAN DIISI]
              </h2>
              <div className="w-24 h-1 bg-esi-gold mx-auto" />
            </div>

            {/* Mission */}
            <div>
              <span className="inline-flex items-center gap-2 text-esi-red text-sm font-semibold uppercase tracking-widest mb-8">
                <span className="w-8 h-px bg-esi-red" />
                Misi
                <span className="w-8 h-px bg-esi-red" />
              </span>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { icon: '01', title: '[DATA RESMI AKAN DIISI]', description: '[DATA RESMI AKAN DIISI]' },
                  { icon: '02', title: '[DATA RESMI AKAN DIISI]', description: '[DATA RESMI AKAN DIISI]' },
                  { icon: '03', title: '[DATA RESMI AKAN DIISI]', description: '[DATA RESMI AKAN DIISI]' },
                  { icon: '04', title: '[DATA RESMI AKAN DIISI]', description: '[DATA RESMI AKAN DIISI]' },
                  { icon: '05', title: '[DATA RESMI AKAN DIISI]', description: '[DATA RESMI AKAN DIISI]' },
                  { icon: '06', title: '[DATA RESMI AKAN DIISI]', description: '[DATA RESMI AKAN DIISI]' },
                ].map((mission) => (
                  <div
                    key={mission.icon}
                    className="bg-esi-off-white rounded-xl p-6 border border-esi-silver-light/50"
                  >
                    <span className="inline-block text-esi-gold text-2xl font-bold mb-4">
                      {mission.icon}
                    </span>
                    <h3 className="text-lg font-bold text-esi-navy mb-2">
                      {mission.title}
                    </h3>
                    <p className="text-esi-charcoal/70 text-sm">
                      {mission.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Values */}
            <div className="mt-20">
              <span className="inline-flex items-center gap-2 text-esi-red text-sm font-semibold uppercase tracking-widest mb-8">
                <span className="w-8 h-px bg-esi-red" />
                Nilai-Nilai
                <span className="w-8 h-px bg-esi-red" />
              </span>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: '[DATA RESMI AKAN DIISI]', color: 'bg-esi-navy' },
                  { label: '[DATA RESMI AKAN DIISI]', color: 'bg-esi-red' },
                  { label: '[DATA RESMI AKAN DIISI]', color: 'bg-esi-gold' },
                  { label: '[DATA RESMI AKAN DIISI]', color: 'bg-esi-charcoal' },
                ].map((value) => (
                  <div
                    key={value.label}
                    className={`${value.color} text-white rounded-xl p-6 text-center`}
                  >
                    <span className="font-bold">{value.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
