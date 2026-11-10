import { useEffect, useState } from 'react';

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMove = (event: MouseEvent) => {
      setVisible(true);
      setPosition({ x: event.clientX, y: event.clientY });
    };

    const handleLeave = () => {
      setVisible(false);
    };

    const handleHover = (event: Event) => {
      const element = event.target as HTMLElement | null;
      const nextLabel = element?.closest('[data-cursor-label]')?.getAttribute('data-cursor-label') ?? '';
      setLabel(nextLabel);
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseover', handleHover);
    document.addEventListener('mouseleave', handleLeave);

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleHover);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <div
      className={`custom-cursor ${visible ? 'is-visible' : ''}`}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      aria-hidden="true"
    >
      {label || 'VIEW'}
    </div>
  );
}
