import Link from 'next/link';
import { Button } from '@/components/ui';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-esi-white flex items-center justify-center px-4 pt-20">
      <div className="max-w-md w-full text-center">
        <div className="text-esi-red text-8xl font-bold mb-2">404</div>
        <h1 className="text-2xl font-bold text-esi-navy mb-3">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-esi-charcoal/70 mb-8">
          Halaman yang Anda cari tidak tersedia atau telah dipindahkan.
        </p>
        <Link href="/">
          <Button variant="primary" size="lg">
            Kembali ke Beranda
          </Button>
        </Link>
      </div>
    </div>
  );
}