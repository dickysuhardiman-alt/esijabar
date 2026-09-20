import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingStateProps {
  variant?: 'spinner' | 'skeleton' | 'dots';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

const LoadingSpinner: React.FC<{ size: string }> = ({ size }) => (
  <svg
    className={cn('animate-spin', size)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const LoadingDots: React.FC = () => (
  <div className="flex gap-1">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="w-2 h-2 bg-esi-red rounded-full animate-bounce"
        style={{ animationDelay: `${i * 0.15}s` }}
      />
    ))}
  </div>
);

const LoadingSkeleton: React.FC = () => (
  <div className="space-y-4 animate-pulse">
    <div className="h-48 bg-esi-silver-light rounded-lg" />
    <div className="space-y-2">
      <div className="h-4 bg-esi-silver-light rounded w-3/4" />
      <div className="h-4 bg-esi-silver-light rounded w-1/2" />
    </div>
    <div className="h-4 bg-esi-silver-light rounded w-5/6" />
  </div>
);

const LoadingState: React.FC<LoadingStateProps> = ({
  variant = 'spinner',
  size = 'md',
  className,
  text,
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
      {variant === 'spinner' && (
        <LoadingSpinner size={sizes[size]} />
      )}
      {variant === 'dots' && <LoadingDots />}
      {variant === 'skeleton' && <LoadingSkeleton />}
      {text && (
        <p className="text-esi-silver-dark text-sm">{text}</p>
      )}
    </div>
  );
};

export { LoadingState };
