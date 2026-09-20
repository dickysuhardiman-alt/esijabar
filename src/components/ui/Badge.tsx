import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  variant?: 'default' | 'red' | 'navy' | 'gold' | 'outline';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'sm',
  children,
  className,
}) => {
  const baseStyles =
    'inline-flex items-center font-semibold uppercase tracking-wide rounded';

  const variants = {
    default: 'bg-esi-off-white text-esi-charcoal',
    red: 'bg-esi-red text-white',
    navy: 'bg-esi-navy text-white',
    gold: 'bg-esi-gold text-white',
    outline: 'border border-esi-silver-light text-esi-charcoal bg-transparent',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)}>
      {children}
    </span>
  );
};

export { Badge };
export type { BadgeProps };
