import React from 'react';
import { cn } from '@/lib/utils';
import { OptimizedImage } from '@/components/shared';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = false,
  padding = 'md',
}) => {
  const paddingSizes = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={cn(
        'bg-esi-white rounded-xl overflow-hidden',
        'border border-esi-silver-light/50',
        hover && [
          'transition-all duration-300',
          'hover:shadow-xl hover:-translate-y-1',
          'hover:border-esi-silver-light',
        ],
        className
      )}
    >
      <div className={paddingSizes[padding]}>{children}</div>
    </div>
  );
};

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

const CardImage: React.FC<CardImageProps> = ({
  src,
  alt,
  className,
  priority = false,
}) => {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="transition-transform duration-500"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
};

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

const CardContent: React.FC<CardContentProps> = ({ children, className }) => {
  return <div className={cn('', className)}>{children}</div>;
};

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

const CardFooter: React.FC<CardFooterProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'px-6 py-4 border-t border-esi-silver-light/50',
        'bg-esi-off-white/50',
        className
      )}
    >
      {children}
    </div>
  );
};

export { Card, CardImage, CardContent, CardFooter };
