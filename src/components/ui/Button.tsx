import React, { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonBaseProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

type ButtonProps = ButtonBaseProps &
  (
    | ({ as?: 'button' } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps>)
    | ({ as: 'a' } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps>)
  );

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (props, ref) => {
    const {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      className,
      children,
      as,
      ...rest
    } = props;

    const isAnchor = as === 'a';

    const baseStyles =
      'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

    const variants = {
      primary: 'bg-esi-red text-white hover:bg-[#c50511] focus-visible:ring-esi-red',
      secondary: 'bg-esi-navy text-white hover:bg-[#162048] focus-visible:ring-esi-navy',
      outline: 'border-2 border-esi-navy text-esi-navy bg-transparent hover:bg-esi-navy hover:text-white focus-visible:ring-esi-navy',
      ghost: 'text-esi-navy hover:bg-esi-off-white focus-visible:ring-esi-navy',
      gold: 'bg-esi-gold text-white hover:bg-[#b08a26] focus-visible:ring-esi-gold',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm rounded-md',
      md: 'px-5 py-2.5 text-sm rounded-lg',
      lg: 'px-8 py-3.5 text-base rounded-lg',
    };

    const classes = cn(baseStyles, variants[variant], sizes[size], className);

    const content = (
      <>
        {isLoading && (
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {leftIcon && !isLoading && <span>{leftIcon}</span>}
        {children}
        {rightIcon && <span>{rightIcon}</span>}
      </>
    );

    if (isAnchor) {
      const anchorProps = rest as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps>;
      return (
        <a ref={ref as React.Ref<HTMLAnchorElement>} className={classes} {...anchorProps}>
          {content}
        </a>
      );
    }

    const buttonProps = rest as Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps>;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        disabled={(buttonProps as { disabled?: boolean }).disabled || isLoading}
        {...buttonProps}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps };
