import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import resume from '../data/resume.json';
import { projects } from '../data/projects';
import { ProjectThumbnail } from './ProjectThumbnail';
import { useLanguage } from '../i18n/LanguageContext';
import styles from './CareerTimeline.module.css';

const chapters = [
  { year: '2017', label: { es: 'Los primeros trazos', en: 'The first strokes' }, companies: ['Peoplepass'], motif: 'Aa', image: '/images/gallery/peoplepass-cover.svg', project: 'peoplepass-graphic-design' },
  { year: '2019', label: { es: 'Construir identidades', en: 'Shaping identities' }, companies: ['Buentipo Anchor'], motif: '✳', image: '/images/gallery/previsora-cover.svg', project: 'previsora-social-media' },
  { year: '2022', label: { es: 'Del gráfico a lo digital', en: 'From graphic to digital' }, companies: ['BlackSip'], motif: '</>', image: '/images/gallery/the-bar-cover.svg', project: 'the-bar-colombia' },
  { year: '2023', label: { es: 'Explorar nuevos formatos', en: 'Exploring new formats' }, companies: ['Flexi'], motif: '✦', image: '/images/gallery/flexi-cover.svg', project: 'flexi-digital-campaigns' },
  { year: '2024', label: { es: 'Diseñar y liderar', en: 'Designing & leading' }, companies: ['Pontificia Universidad Javeriana', 'Tres Astronautas', 'Inlaze'], motif: '↗', image: '/images/gallery/javeriana-landings.png', project: 'javeriana-landings' },
  { year: '2025', label: { es: 'Conectar experiencias', en: 'Connecting experiences' }, companies: ['Niibu', 'RemoteLatinos', 'Ágata'], motif: '∞', image: '/images/gallery/remote-website.png', project: 'remote-latinos-website' },
  { year: '2026', label: { es: 'Diseño al servicio de las personas', en: 'Design in service of people' }, companies: ['Secretaría de Hacienda de Bogotá'], motif: '✦', image: '/images/gallery/hacienda-appointments.png', project: 'appointment-scheduling' },
].sort((a, b) => Number(b.year) - Number(a.year));

type Chapter = (typeof chapters)[number];

function TimelineChapter({ chapter, index, progress, animated }: { chapter: Chapter; index: number; progress: MotionValue<number>; animated: boolean }) {
  const { language, copy } = useLanguage();
  const center = index / (chapters.length - 1);
  const scale = useTransform(progress, [center - .2, center, center + .2], [.72, 1, .72]);
  const imageY = useTransform(progress, [center - .2, center, center + .2], [65, 0, -65]);
  const rotate = useTransform(progress, [center - .2, center, center + .2], [-6, 0, 6]);
  return (
    <li className={styles.chapter}>
      <motion.div className={styles.visual} style={animated ? { scale, y: imageY, rotate } : undefined}>
        <span className={styles.largeYear} aria-hidden="true">{chapter.year}</span>
        <Link className={styles.imageLink} to={`/projects/${chapter.project}`} aria-label={`${copy.viewProject}: ${chapter.label[language]}`}>
          <div className={styles.thumbnail}><ProjectThumbnail project={projects.find(project => project.id === chapter.project)!} eager={index < 2} /></div>
          <span>{copy.viewProject}<ArrowUpRight size={16} aria-hidden="true" /></span>
        </Link>
      </motion.div>
      <div className={styles.copy}>
        <p className={styles.year}>{chapter.year}<span>{String(index + 1).padStart(2, '0')} / {String(chapters.length).padStart(2, '0')}</span></p>
        <h3>{chapter.label[language]}</h3>
        {chapter.companies.map(company => {
          const job = resume.find(item => item.company === company);
          if (!job) return null;
          return <article key={company} className={styles.job}><h4>{job.company}</h4><p className={styles.role}>{job.role}</p><p className={styles.date}>{job.date[language]}</p>{job.summary && <p className={styles.summary}>{job.summary[language]}</p>}{job.clients && <p className={styles.clients}>{job.clients.join(' · ')}</p>}</article>;
        })}
      </div>
    </li>
  );
}

export function CareerTimeline() {
  const { language } = useLanguage();
  const es = language === 'es';
  const reduced = useReducedMotion();
  const [desktop, setDesktop] = useState(false);
  const [travel, setTravel] = useState(0);
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const animated = desktop && !reduced;
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1000px) and (min-height: 700px)');
    const update = () => setDesktop(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!animated || !trackRef.current) return;
    const track = trackRef.current;
    const measure = () => setTravel(Math.max(0, track.scrollWidth - track.clientWidth));
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    measure();
    return () => observer.disconnect();
  }, [animated]);

  useMotionValueEvent(scrollYProgress, 'change', value => {
    if (animated) setActive(Math.round(value * (chapters.length - 1)));
  });

  function goToChapter(index: number, immediate = false) {
    if (animated && sectionRef.current) {
      const section = sectionRef.current;
      const top = window.scrollY + section.getBoundingClientRect().top;
      window.scrollTo({ top: top + (section.offsetHeight - window.innerHeight) * index / (chapters.length - 1), behavior: immediate ? 'instant' : 'smooth' });
    } else {
      trackRef.current?.children[index]?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'start' });
    }
    setActive(index);
  }

  return (
    <div ref={sectionRef} className={`${styles.career} ${animated ? styles.animated : ''}`} style={animated ? { height: `calc(100svh + ${travel}px)` } : undefined}>
      <div className={styles.stage}>
        <nav className={styles.yearNav} aria-label={es ? 'Explorar trayectoria por año' : 'Explore career by year'}>
          <span className={styles.navLabel}>{es ? 'Mi recorrido' : 'My journey'}<ArrowRight size={14} aria-hidden="true" /></span>
          <div className={styles.yearLinks}>{chapters.map((chapter, index) => <button type="button" key={chapter.year} onClick={() => goToChapter(index)} aria-current={active === index ? 'step' : undefined}>{chapter.year}</button>)}</div>
        </nav>
        <div className={styles.viewport}>
          <motion.ol ref={trackRef} className={styles.track} style={animated ? { x } : undefined} onFocusCapture={event => {
            if (!animated) return;
            const chapter = (event.target as HTMLElement).closest('li');
            const index = Array.from(trackRef.current?.children ?? []).indexOf(chapter as HTMLLIElement);
            if (index >= 0 && index !== active) goToChapter(index, true);
          }}>
            {chapters.map((chapter, index) => <TimelineChapter key={chapter.year} chapter={chapter} index={index} progress={scrollYProgress} animated={animated} />)}
          </motion.ol>
        </div>
        <div className={styles.caption}>
          <p>{es ? 'Cada paso, una nueva forma de mirar.' : 'Every step, a new perspective.'}</p>
          <span>{es ? 'Desliza para explorar' : 'Scroll to explore'}<ArrowRight size={14} aria-hidden="true" /></span>
        </div>
        <div className={styles.progress} aria-hidden="true"><motion.div style={{ scaleX: animated ? scrollYProgress : 1 }} /></div>
      </div>
    </div>
  );
}
