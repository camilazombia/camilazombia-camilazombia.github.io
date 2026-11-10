import { useRef, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Project } from '../data/projects';
import { useLanguage } from '../i18n/LanguageContext';
import { ProjectThumbnail } from './ProjectThumbnail';
import styles from './ProjectStory.module.css';

export function ProjectStory({ project, children }: { project: Project; children: ReactNode }) {
  const { language, copy } = useLanguage();
  const es = language === 'es';
  const section = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: section, offset: ['start end', 'end start'] });
  const rotation = useTransform(scrollYProgress, [0, .18, .5, .82, 1], [-28, 0, 180, 355, 375]);
  const tilt = useTransform(scrollYProgress, [0, .5, 1], [7, -9, 7]);
  const lift = useTransform(scrollYProgress, [0, .5, 1], [25, -20, 25]);

  return <>
    <a href="#project-story" className={styles.bridge}><span>{es ? 'Dentro del proyecto' : 'Inside the project'}</span><ArrowDown size={18} aria-hidden="true" /></a>
    <section className={styles.story} ref={section} id="project-story" aria-label={es ? 'Recorrido del proyecto' : 'Project walkthrough'}>
      <aside className={styles.deviceColumn} aria-label={es ? 'Presentación del proyecto' : 'Project presentation'}>
        <div className={styles.deviceHeader}><span>{project.category}</span><span>{es ? 'Diseño en detalle' : 'Design in detail'}</span></div>
        <div className={styles.perspective} aria-hidden="true">
          <motion.div className={styles.laptop} style={{ rotateY: reduced ? -12 : rotation, rotateX: reduced ? 0 : tilt, y: reduced ? 0 : lift }}>
            <div className={styles.display}>
              <div className={styles.front}>
                <span className={styles.camera} />
                <div className={styles.screen}><ProjectThumbnail project={project} eager /></div>
                <span className={styles.wordmark}>Camila Gómez</span>
              </div>
              <div className={styles.lid}><span>CG</span><small>Camila Gómez</small></div>
            </div>
            <div className={styles.base}><div className={styles.keyboard} /><div className={styles.trackpad} /></div>
          </motion.div>
          <div className={styles.shadow} />
        </div>
        <div className={styles.deviceFooter}><span>{es ? 'Desplázate para explorar' : 'Scroll to explore'}</span><ArrowDown size={15} aria-hidden="true" /></div>
      </aside>
      <div className={styles.editorial}>
        <motion.header className={styles.chapter} initial={reduced ? false : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} transition={{ duration: .65 }}>
          <p>{es ? 'El proyecto' : 'The project'} / {project.category}</p>
          <h2>{project.name}</h2>
          <span>{project.role || 'UX/UI & Digital Design'}</span>
        </motion.header>
        <div className={styles.details}>{children}</div>
        {project.image && <motion.figure className={styles.visual} initial={reduced ? false : { clipPath: 'inset(12% 0 12% 0)' }} whileInView={{ clipPath: 'inset(0% 0 0% 0)' }} viewport={{ once: true }} transition={{ duration: .8 }}><img src={project.image} alt={project.name} loading="lazy" /><figcaption>{project.category} — {project.name}</figcaption></motion.figure>}
        <Link to="/projects" className={styles.allWork}>{copy.viewMoreWork}<ArrowUpRight size={28} aria-hidden="true" /></Link>
      </div>
    </section>
  </>;
}
