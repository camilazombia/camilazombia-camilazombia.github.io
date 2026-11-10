import { ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { useLanguage } from '../i18n/LanguageContext';
import styles from './FeaturedProjectsGallery.module.css';

const frames = ['heart', 'arch', 'oval'] as const;

export function FeaturedProjectsGallery() {
  const { copy, language } = useLanguage();
  const section = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: section, offset: ['start end', 'start 35%'] });
  const reveal = useTransform(scrollYProgress, [.25, .7], [0, 1]);
  const entrance = useTransform(scrollYProgress, [0, .5], [45, 0]);
  const floatY = useTransform(scrollYProgress, [0, 1], [25, -15]);
  return (
    <section ref={section} className={styles.gallery} id="projects" aria-labelledby="projects-heading">
      <div className={styles.pinkPanel} aria-hidden="true" />
      <motion.div className={styles.reveal} style={{ opacity: reduced ? 1 : reveal, y: reduced ? 0 : entrance }}>

      <motion.img style={{ y: reduced ? 0 : floatY }} className={styles.bow} src="/images/hero/bow-pearl.png" alt="" />
      <header className={styles.heading}>
        <p>{copy.projectsPrefix}</p>
        <h2 id="projects-heading">{copy.projects}</h2>
      </header>
      <div className={styles.wall}>
        {projects.slice(0, 3).map((project, index) => (
          <motion.article initial={reduced ? false : { opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ duration: .8, delay: index * .12 }} className={`${styles.card} ${styles[frames[index]]}`} key={project.id}>
            <Link to={`/projects/${project.id}`} className={styles.projectLink} aria-label={`${copy.viewProject}: ${project.name}`}>
              <img className={styles.frame} src={`/images/projects/${frames[index]}-frame.png`} alt="" loading="lazy" />
              <div className={styles.plaque}>
                <img src="/images/projects/project-plaque.png" alt="" loading="lazy" />
                <span className={styles.projectName}>{project.name}</span>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
      <Link className={styles.allProjects} to="/projects">{language === 'es' ? 'Ver todos los proyectos' : 'View all projects'}<ArrowUpRight size={17} aria-hidden="true" /></Link>
      <motion.img className={styles.rose} src="/images/hero/flower-right.png" alt="" style={{ y: reduced ? 0 : floatY }} />
      </motion.div>
    </section>
  );
}
