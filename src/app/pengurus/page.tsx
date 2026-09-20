import { Metadata } from 'next';
import { SectionHeader } from '@/components/ui';
import { OptimizedImage } from '@/components/shared';

export const metadata: Metadata = {
  title: 'Pengurus',
  description: 'Pengurus ESI Provinsi Jawa Barat.',
};

export default function PengurusPage() {
  // Placeholder data - to be replaced with official data
  const boardMembers = [
    {
      position: 'Ketua',
      name: '[DATA RESMI AKAN DIISI]',
      photo: null,
    },
    {
      position: 'Wakil Ketua',
      name: '[DATA RESMI AKAN DIISI]',
      photo: null,
    },
    {
      position: 'Sekretaris',
      name: '[DATA RESMI AKAN DIISI]',
      photo: null,
    },
    {
      position: 'Bendahara',
      name: '[DATA RESMI AKAN DIISI]',
      photo: null,
    },
  ];

  const divisions = [
    { name: '[DIVISI]', head: '[DATA RESMI AKAN DIISI]' },
    { name: '[DIVISI]', head: '[DATA RESMI AKAN DIISI]' },
    { name: '[DIVISI]', head: '[DATA RESMI AKAN DIISI]' },
    { name: '[DIVISI]', head: '[DATA RESMI AKAN DIISI]' },
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
              Pengurus
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              Kepengurusan ESI Provinsi Jawa Barat yang berkomitmen mengembangkan
              esports di Jawa Barat.
            </p>
          </div>
        </div>
      </section>

      {/* Board Members */}
      <section className="py-20 bg-esi-white">
        <div className="container-esi">
          <SectionHeader
            eyebrow="Kepengurusan"
            title="Pengurus Inti"
            subtitle="Jajaran pengurus utama ESI Provinsi Jawa Barat"
            variant="dark"
          />

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {boardMembers.map((member) => (
              <div
                key={member.position}
                className="bg-esi-white rounded-xl overflow-hidden shadow-md border border-esi-silver-light/50 text-center"
              >
                <div className="aspect-square bg-esi-navy/10 flex items-center justify-center">
                  {member.photo ? (
                    <OptimizedImage
                      src={member.photo}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  ) : (
                    <div className="text-center">
                      <div className="w-24 h-24 bg-esi-navy/10 rounded-full mx-auto flex items-center justify-center mb-2">
                        <span className="text-4xl font-bold text-esi-navy">
                          {member.position.charAt(0)}
                        </span>
                      </div>
                      <p className="text-esi-silver-dark text-sm">[FOTO]</p>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-esi-gold/10 text-esi-gold text-xs font-semibold uppercase tracking-wide rounded-full mb-2">
                    {member.position}
                  </span>
                  <h3 className="font-bold text-esi-navy">{member.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Division Members */}
      <section className="py-16 bg-esi-off-white">
        <div className="container-esi">
          <SectionHeader
            eyebrow="Divisi"
            title="Divisi & Tim"
            subtitle="Pengurus divisi dan tim kerja ESI Provinsi Jawa Barat"
            variant="dark"
          />

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {divisions.map((division, index) => (
              <div
                key={division.name}
                className="bg-esi-white rounded-xl p-6 shadow-sm border border-esi-silver-light/50"
              >
                <span className="inline-block w-8 h-8 bg-esi-navy text-white rounded-full text-center leading-8 font-bold text-sm mb-4">
                  {index + 1}
                </span>
                <h4 className="font-bold text-esi-navy mb-2">{division.name}</h4>
                <p className="text-esi-charcoal/70 text-sm">
                  Kepala Divisi: <span className="font-medium">{division.head}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
