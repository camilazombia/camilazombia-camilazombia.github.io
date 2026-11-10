type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
};

export function SectionHeading({ eyebrow, title, subtitle, align = 'left' }: SectionHeadingProps) {
  return (
    <div className={`mb-10 md:mb-14 ${align === 'center' ? 'text-center mx-auto' : 'text-left'}`}>
      <p className="text-[11px] md:text-xs uppercase tracking-[0.28em] text-[var(--muted)] mb-4">{eyebrow}</p>
      <h2 className="font-serif text-[2.3rem] leading-none md:text-[4rem] text-[var(--dark)] max-w-[14ch]">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 max-w-[52rem] text-base leading-relaxed text-[var(--muted)] md:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
