import { Metadata } from 'next';
import { SectionHeader, Button } from '@/components/ui';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Kontak',
  description: 'Hubungi ESI Provinsi Jawa Barat untuk informasi lebih lanjut.',
};

export default function KontakPage() {
  const socialLinks = [
    { key: 'instagram', label: 'Instagram', url: SITE_CONFIG.socialMedia.instagram },
    { key: 'youtube', label: 'YouTube', url: SITE_CONFIG.socialMedia.youtube },
    { key: 'twitter', label: 'Twitter', url: SITE_CONFIG.socialMedia.twitter },
    { key: 'facebook', label: 'Facebook', url: SITE_CONFIG.socialMedia.facebook },
    { key: 'tiktok', label: 'TikTok', url: SITE_CONFIG.socialMedia.tiktok },
  ].filter((item) => /^https?:\/\//.test(item.url) && !item.url.includes('[DATA'));

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-esi-navy">
        <div className="container-esi">
          <div className="max-w-3xl">
            <span className="inline-block text-esi-gold text-sm font-semibold uppercase tracking-widest mb-4">
              Hubungi Kami
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Kontak
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              Hubungi kami untuk pertanyaan, informasi, atau kolaborasi.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-esi-white">
        <div className="container-esi">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <SectionHeader
                eyebrow="Informasi"
                title="Hubungi Kami"
                subtitle="ESI Provinsi Jawa Barat siap menjawab pertanyaan Anda"
                variant="dark"
                align="left"
              />

              <div className="mt-8 space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-esi-red/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-esi-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-esi-navy">Alamat</h3>
                    <p className="text-esi-charcoal/70 mt-1">{SITE_CONFIG.address}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-esi-navy/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-esi-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-esi-navy">Email</h3>
                    <p className="text-esi-charcoal/70 mt-1">{SITE_CONFIG.email}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-esi-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-esi-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-esi-navy">Telepon</h3>
                    <p className="text-esi-charcoal/70 mt-1">{SITE_CONFIG.phone}</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8 pt-8 border-t border-esi-silver-light">
                <h3 className="font-bold text-esi-navy mb-4">Media Sosial</h3>
                {socialLinks.length > 0 ? (
                  <div className="flex gap-4">
                    {socialLinks.map((item) => (
                      <a
                        key={item.key}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-esi-off-white rounded-xl flex items-center justify-center hover:bg-esi-red hover:text-white transition-colors"
                        aria-label={item.label}
                      >
                        <span className="text-sm font-bold text-esi-navy">
                          {item.label.charAt(0)}
                        </span>
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-esi-charcoal/70">
                    [DATA RESMI AKAN DIISI] — Tautan media sosial resmi akan ditampilkan
                    setelah data tersedia.
                  </p>
                )}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-esi-off-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-esi-navy mb-6">Kirim Pesan</h3>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-esi-charcoal mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-esi-silver-light focus:ring-2 focus:ring-esi-red focus:border-transparent"
                    placeholder="Masukkan nama Anda"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-esi-charcoal mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-esi-silver-light focus:ring-2 focus:ring-esi-red focus:border-transparent"
                    placeholder="email@contoh.com"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-esi-charcoal mb-2">
                    Subjek
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-esi-silver-light focus:ring-2 focus:ring-esi-red focus:border-transparent"
                    placeholder="Subjek pesan"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-esi-charcoal mb-2">
                    Pesan
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-esi-silver-light focus:ring-2 focus:ring-esi-red focus:border-transparent resize-none"
                    placeholder="Tulis pesan Anda di sini..."
                  />
                </div>
                <Button type="submit" variant="primary" className="w-full">
                  Kirim Pesan
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
