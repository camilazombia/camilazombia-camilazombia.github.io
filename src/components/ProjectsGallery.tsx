import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProjectTransition } from './ProjectTransition';
import { projects } from '../data/projects';
import { useLanguage } from '../i18n/LanguageContext';
import { ProjectThumbnail } from './ProjectThumbnail';
import styles from './ProjectsGallery.module.css';
import { FeaturedProjectsGallery } from './FeaturedProjectsGallery';

export function ProjectsGallery({ featured = false, excludeProjectId }: { featured?: boolean; excludeProjectId?: string }) {
  return featured ? <FeaturedProjectsGallery /> : <HorizontalProjectsGallery key={excludeProjectId} excludeProjectId={excludeProjectId} />;
}

function HorizontalProjectsGallery({ excludeProjectId }: { excludeProjectId?: string }) {
  const related = Boolean(excludeProjectId);
  const galleryProjects = projects.filter(project => project.id !== excludeProjectId);
  const featured = false;
  const openProject = useProjectTransition();
  const { copy, language } = useLanguage();
  const es = language === 'es';
  const railRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const interacting = useRef(false);
  const resumeAt = useRef(0);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const rail = railRef.current;
    const group = groupRef.current;
    if (!rail || !group) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const visible = { current: true };
    const observer = new IntersectionObserver(([entry]) => { visible.current = entry.isIntersecting; });
    observer.observe(rail);
    let frame = 0;
    let last = 0;
    let position = rail.scrollLeft;
    let previous = rail.scrollLeft;
    const animate = (now: number) => {
      const delta = last ? Math.min(now - last, 40) : 0;
      last = now;
      if (visible.current && !document.hidden && !paused && !reduced.matches && !interacting.current && now > resumeAt.current) {
        if (Math.abs(rail.scrollLeft - previous) > 1) position = rail.scrollLeft;
        position += delta * .045;
        if (position >= group.offsetWidth) position -= group.offsetWidth;
        rail.scrollLeft = position;
        previous = rail.scrollLeft;
      } else { position = rail.scrollLeft; previous = position; }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, [paused]);

  const hold = () => { resumeAt.current = performance.now() + 3500; };
  const move = (direction: number) => {
    const rail = railRef.current;
    if (!rail) return;
    hold();
    if (direction < 0 && rail.scrollLeft < 1 && groupRef.current) rail.scrollLeft = groupRef.current.offsetWidth;
    rail.scrollBy({ left: direction * rail.clientWidth * .65, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };

  return (
    <section className={`${styles.gallery} ${related ? styles.related : featured ? styles.featured : styles.fullPage}`} id="projects" aria-label={related ? (es ? 'Otros proyectos' : 'More projects') : copy.projects}>
      {related && <header className={styles.heading}><h2>{es ? 'Otros proyectos' : 'More projects'}</h2></header>}
      <div className={styles.rail} ref={railRef} tabIndex={0} role="region" aria-label={es ? 'Galería de proyectos' : 'Project gallery'}
        onMouseEnter={() => { interacting.current = true; }} onMouseLeave={() => { if (!drag.current) interacting.current = false; }}
        onFocusCapture={() => { interacting.current = true; }} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) interacting.current = false; }}
        onWheel={hold}
        onKeyDown={event => { if (event.target === event.currentTarget && ['ArrowLeft', 'ArrowRight'].includes(event.key)) { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); } }}
        onPointerDown={event => { if (event.pointerType !== 'mouse' || event.button !== 0) return; drag.current = { x: event.clientX, left: event.currentTarget.scrollLeft, moved: false }; }}
        onPointerMove={event => { const start = drag.current; if (!start) return; const distance = event.clientX - start.x; if (Math.abs(distance) > 5) { start.moved = true; event.currentTarget.setPointerCapture(event.pointerId); event.currentTarget.scrollLeft = start.left - distance; hold(); } }}
        onPointerUp={event => { if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); const moved = drag.current?.moved; if (moved) { event.preventDefault(); } hold(); setTimeout(() => { drag.current = null; }, 0); }}
        onPointerCancel={() => { drag.current = null; hold(); }}
        onClickCapture={event => { if (drag.current?.moved) { event.preventDefault(); event.stopPropagation(); } }}>
        {[0, 1].map(copyIndex => (
          <div className={styles.group} key={copyIndex} ref={copyIndex === 0 ? groupRef : undefined} aria-hidden={copyIndex === 1 ? true : undefined}>
            {galleryProjects.map((project, index) => (
              <article className={styles.card} key={project.id}>
                <Link to={`/projects/${project.id}`} className={styles.projectLink} tabIndex={copyIndex === 1 ? -1 : undefined} aria-label={`${copy.viewProject}: ${project.name}`} draggable={false} onClick={event => {
                    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                    event.preventDefault();
                    openProject(event.currentTarget, project.id);
                  }}>
                  <div className={styles.label}><h3>{project.name}</h3><span>{project.category}</span></div>
                  <div className={styles.imageStage} data-project-cover={project.id}><ProjectThumbnail project={project} eager={copyIndex === 0 && index < 4} /><span className={styles.open}><ArrowUpRight size={20} aria-hidden="true" /></span></div>
                </Link>
              </article>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.bottom}>
        <p>{es ? 'Arrastra para explorar' : 'Drag to explore'}</p>
        <div className={styles.controls}>
          <button type="button" onClick={() => move(-1)} aria-label={es ? 'Anterior' : 'Previous'}><ArrowLeft size={17} /></button>
          <button type="button" onClick={() => setPaused(!paused)} aria-label={paused ? (es ? 'Reanudar movimiento' : 'Resume motion') : (es ? 'Pausar movimiento' : 'Pause motion')} aria-pressed={paused}>{paused ? <Play size={14} /> : <Pause size={14} />}</button>
          <button type="button" onClick={() => move(1)} aria-label={es ? 'Siguiente' : 'Next'}><ArrowRight size={17} /></button>
        </div>
        {featured ? <Link to="/projects">{es ? 'Todos los proyectos' : 'All projects'} <ArrowUpRight size={14} /></Link> : <span>UX/UI & Digital Design</span>}
      </div>
    </section>
  );
}
