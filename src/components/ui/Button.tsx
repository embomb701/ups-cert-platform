import Link from 'next/link';
import { cn } from '@/lib/utils/formatters';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  loading?: boolean;
}

const variants = {
  primary: 'bg-voltage-gradient hover:brightness-110 text-carbon-950 border-transparent shadow-voltage',
  secondary: 'bg-arc-500 hover:bg-arc-400 text-white border-transparent shadow-arc',
  outline: 'bg-white/[0.02] hover:bg-white/[0.05] text-gray-200 border-white/15 hover:border-voltage-500/50',
  ghost: 'bg-transparent hover:bg-white/5 text-gray-400 hover:text-white border-transparent',
  danger: 'bg-red-700 hover:bg-red-600 text-white border-transparent',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  loading,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold tracking-wide rounded-xl border transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-voltage-400 focus-visible:ring-offset-2 focus-visible:ring-offset-carbon-950 disabled:opacity-50 disabled:pointer-events-none';

  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading && (
        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      )}
      {children}
    </button>
  );
}
