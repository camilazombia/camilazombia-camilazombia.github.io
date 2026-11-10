import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects, type Project } from '../data/projects';
import { ProjectThumbnail } from './ProjectThumbnail';
import styles from './ProjectTransition.module.css';

type Rect = { left: number; top: number; width: number; height: number };
type Cover = { rect: Rect; project: Project; selected: boolean };
type Transition = { covers: Cover[]; target: Rect; top: number };
const TransitionContext = createContext<(element: HTMLAnchorElement, id: string) => void>(() => {});
export const useProjectTransition = () => useContext(TransitionContext);
const rectOf = (element: Element): Rect => {
  const { left, top, width, height } = element.getBoundingClientRect();
  return { left, top, width, height };
};

export function ProjectTransition({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const pending = useRef<Cover[] | null>(null);
  const restoreOverflow = useRef<string | null>(null);
  const [transition, setTransition] = useState<Transition | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const busy = useRef(false);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
    if (restoreOverflow.current !== null) document.body.style.overflow = restoreOverflow.current;
  }, []);

  // Measure only after React Router has committed the destination DOM.
  // A flushSync around navigate does not commit Router's deferred update.
  useLayoutEffect(() => {
    const covers = pending.current;
    if (!covers || !pathname.startsWith('/projects/')) return;
    const target = document.querySelector('[data-project-hero]');
    if (!target) { pending.current = null; busy.current = false; return; }
    pending.current = null;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    restoreOverflow.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const targetRect = rectOf(target);
    setTransition({ covers, target: targetRect, top: targetRect.top });
    timer.current = setTimeout(() => {
      setTransition(null);
      document.body.style.overflow = restoreOverflow.current ?? '';
      restoreOverflow.current = null;
      busy.current = false;
    }, 1550);
  }, [pathname]);

  function open(element: HTMLAnchorElement, id: string) {
    if (busy.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { navigate(`/projects/${id}`); return; }
    const selected = element.querySelector('[data-project-cover]');
    if (!selected) { navigate(`/projects/${id}`); return; }
    const covers: Cover[] = [];
    document.querySelectorAll<HTMLElement>('[data-project-cover]').forEach(cover => {
      const rect = rectOf(cover);
      const project = projects.find(item => item.id === cover.dataset.projectCover);
      if (project && rect.left < innerWidth && rect.left + rect.width > 0 && rect.top < innerHeight && rect.top + rect.height > 0) covers.push({ rect, project, selected: cover === selected });
    });
    busy.current = true;
    pending.current = covers;
    navigate(`/projects/${id}`);
  }

  return <TransitionContext.Provider value={open}>{children}{transition && createPortal(
    <div className={styles.overlay} aria-hidden="true">
      <motion.div className={styles.backdrop} style={{ top: transition.top }} initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ delay: 1.05, duration: .45 }} />
      {transition.covers.map((cover, index) => <motion.div key={index}
        className={`${styles.cover} ${cover.selected ? styles.selected : ''}`}
        initial={{ ...cover.rect, clipPath: 'inset(0% 0% 0% 0%)' }}
        animate={cover.selected ? { ...transition.target, clipPath: 'inset(0% 0% 0% 0%)' } : { ...cover.rect, clipPath: 'inset(50% 0% 50% 0%)' }}
        transition={cover.selected ? { duration: 1.35, delay: .08, ease: [.76, 0, .24, 1] } : { duration: .65, delay: Math.min(index * .035, .14), ease: [.65, 0, .35, 1] }}>
        {!cover.selected && <span className={styles.label}>{cover.project.name}</span>}
        <ProjectThumbnail project={cover.project} eager />
      </motion.div>)}
    </div>, document.body)}</TransitionContext.Provider>;
}
