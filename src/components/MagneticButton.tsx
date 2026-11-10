import type { ReactNode } from 'react';
import { useState } from 'react';

type MagneticButtonProps = {
  href?: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  label?: string;
};

export function MagneticButton({
  href,
  children,
  variant = 'primary',
  className = '',
  label,
}: MagneticButtonProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (event.clientX - centerX) / 12;
    const deltaY = (event.clientY - centerY) / 12;
    setOffset({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const styles = {
    transform: `translate(${offset.x}px, ${offset.y}px)`,
  };

  const classes = [
    'inline-flex items-center justify-center gap-2 rounded-full border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]',
    variant === 'primary' && 'border-[var(--deep-burgundy)] bg-[var(--deep-burgundy)] text-[var(--cream)] shadow-[0_15px_40px_rgba(69,16,29,0.16)]',
    variant === 'secondary' && 'border-[rgba(50,21,29,0.2)] bg-transparent text-[var(--dark)]',
    variant === 'ghost' && 'border-transparent bg-[rgba(255,255,255,0.1)] text-[var(--cream)]',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const Component = href ? 'a' : 'button';

  return (
    <Component
      href={href}
      className={classes}
      style={styles}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor-label={label}
      type={href ? undefined : 'button'}
    >
      {children}
    </Component>
  );
}
