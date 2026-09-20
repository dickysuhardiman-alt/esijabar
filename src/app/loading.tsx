import { LoadingState } from '@/components/ui';

export default function RootLoading() {
  return (
    <div className="min-h-screen bg-esi-white pt-32 pb-20 flex items-start justify-center">
      <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="h-10 bg-esi-silver-light rounded w-64 mb-12 animate-pulse" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item}>
              <LoadingState variant="skeleton" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}