import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { whatsappUrl } from '../data/contact';
import { NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import styles from './Navbar.module.css';

export function Navbar() {
  const { copy, language, setLanguage } = useLanguage();
  const { pathname } = useLocation();
  const header = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const es = language === 'es';

  useLayoutEffect(() => {
    if (!header.current) return;
    const observer = new ResizeObserver(([entry]) => {
      document.documentElement.style.setProperty('--site-header-height', `${entry.borderBoxSize[0]?.blockSize ?? entry.contentRect.height}px`);
    });
    observer.observe(header.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panel.current?.querySelector<HTMLButtonElement>('button')?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); return; }
      if (event.key !== 'Tab') return;
      const items = panel.current?.querySelectorAll<HTMLElement>('a[href], button');
      if (!items?.length) return;
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', onKey); trigger.current?.focus(); };
  }, [open]);
  return <>
    <header ref={header} className={styles.header}>
      <NavLink to="/" className={styles.brand} aria-label={copy.homeLabel}>CamilaGómez <strong>Digital Product Designer</strong></NavLink>
      <div className={styles.controls}>
        <div className={styles.languages} role="group" aria-label={copy.languageLabel}>
          <button type="button" lang="en" aria-label="English" aria-pressed={!es} onClick={() => setLanguage('en')}>EN</button>
          <button type="button" lang="es" aria-label="Español" aria-pressed={es} onClick={() => setLanguage('es')}>ES</button>
        </div>

        <button ref={trigger} className={styles.menuToggle} aria-expanded={open} aria-controls={open ? 'site-menu' : undefined} aria-label={es ? 'Abrir menú' : 'Open menu'} onClick={event => { const rect = event.currentTarget.getBoundingClientRect(); setOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }); setOpen(true); }}><span>{es ? 'Menú' : 'Menu'}</span><Menu size={21} aria-hidden="true" /></button>
      </div>
    </header>
    {open && createPortal(<div ref={panel} id="site-menu" className={styles.menuPanel} style={{ '--menu-x': `${origin.x}px`, '--menu-y': `${origin.y}px` } as CSSProperties} role="dialog" aria-modal="true" aria-label={copy.navigationLabel}>
      <div className={styles.panelHeader}>
        <NavLink to="/" className={styles.panelBrand} onClick={() => setOpen(false)}>CamilaGómez <small>Digital Product Designer</small></NavLink>
        <div className={`${styles.languages} ${styles.panelLanguages}`} role="group" aria-label={copy.languageLabel}>
          <button type="button" lang="en" aria-label="English" aria-pressed={!es} onClick={() => setLanguage('en')}>EN</button>
          <button type="button" lang="es" aria-label="Español" aria-pressed={es} onClick={() => setLanguage('es')}>ES</button>
        </div>
        <button className={styles.closeMenu} onClick={() => setOpen(false)} aria-label={es ? 'Cerrar menú' : 'Close menu'}><span>{es ? 'Cerrar' : 'Close'}</span><X size={24} aria-hidden="true" /></button></div>
      <div className={styles.menuContent}>
        <nav className={styles.largeLinks} aria-label={copy.navigationLabel}>
          <NavLink to="/" end onClick={() => setOpen(false)}><span className={styles.linkNumber}>01</span><span>{es ? 'Inicio' : 'Home'}</span><ArrowUpRight aria-hidden="true" /></NavLink>
          <NavLink to="/projects" onClick={() => setOpen(false)}><span className={styles.linkNumber}>02</span><span>{copy.projects}</span><ArrowUpRight aria-hidden="true" /></NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)}><span className={styles.linkNumber}>03</span><span>{es ? 'Sobre mí' : 'About me'}</span><ArrowUpRight aria-hidden="true" /></NavLink>
        </nav>
        <div className={styles.menuPortrait}><span className={styles.portraitHalo} /><img src="/images/menu-cupid.png" alt="Cupido con alas, arco y flecha" /><p>UX/UI &amp; Product Designer</p></div>
      </div>
      <div className={styles.panelFooter}>
        <nav className={styles.socialLinks} aria-label={es ? 'Contacto y redes sociales' : 'Contact and social links'}>
          <a href="https://www.linkedin.com/in/lauracamilag/" target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={14} aria-hidden="true" /></a>
          <a href={whatsappUrl(language)} target="_blank" rel="noopener noreferrer">WhatsApp <ArrowUpRight size={14} aria-hidden="true" /></a>
          <a href="mailto:camilagomez2307@gmail.com">Mail <ArrowUpRight size={14} aria-hidden="true" /></a>
        </nav>
        <span>© 2026 Laura Camila Gómez</span>
      </div>
    </div>, document.body)}
  </>;
}





