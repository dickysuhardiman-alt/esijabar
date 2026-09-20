import type { Metadata } from 'next';
import './globals.css';
import { Layout } from '../components/layout';


export const metadata: Metadata = {
  title: {
    default: 'ESI Provinsi Jawa Barat - Esports Indonesia',
    template: '%s | ESI Provinsi Jawa Barat',
  },
  description:
    'Website resmi Esports Indonesia Provinsi Jawa Barat - Organisasi Olahraga Esports Resmi. Membangun prestasi, mencetak champions.',
  keywords: [
    'ESI',
    'Esports Indonesia',
    'Jawa Barat',
    'esports',
    'gaming',
    'tournament',
    'olahraga esports',
  ],
  authors: [{ name: 'ESI Jawa Barat' }],
  creator: 'ESI Jawa Barat',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: 'ESI Provinsi Jawa Barat',
    title: 'ESI Provinsi Jawa Barat - Esports Indonesia',
    description:
      'Website resmi Esports Indonesia Provinsi Jawa Barat - Organisasi Olahraga Esports Resmi',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ESI Provinsi Jawa Barat',
    description:
      'Website resmi Esports Indonesia Provinsi Jawa Barat - Organisasi Olahraga Esports Resmi',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col antialiased">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
