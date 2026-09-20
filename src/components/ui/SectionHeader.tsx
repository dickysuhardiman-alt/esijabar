import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  variant?: 'light' | 'dark';
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  variant = 'dark',
  className,
}) => {
  const alignment = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  const textColors = {
    light: 'text-white',
    dark: 'text-esi-charcoal',
  };

  const eyebrowColors = {
    light: 'text-esi-gold',
    dark: 'text-esi-red',
  };

  return (
    <div
      className={cn(
        'max-w-3xl',
        alignment[align],
        textColors[variant],
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            'inline-block text-sm font-semibold uppercase tracking-widest mb-4',
            eyebrowColors[variant]
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          'font-bold leading-tight',
          align === 'center' ? '' : ''
        )}
        style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-4 text-lg leading-relaxed',
            variant === 'light' ? 'text-white/80' : 'text-esi-silver-dark'
          )}
        >
          {subtitle}
        </p>
      )}
      {align === 'center' && (
        <div className="gold-line mx-auto mt-6" />
      )}
      {align === 'left' && <div className="gold-line mt-6" />}
    </div>
  );
};

export { SectionHeader };
export type { SectionHeaderProps };
