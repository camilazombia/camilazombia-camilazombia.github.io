import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { projects } from '../data/projects';
import { useLanguage } from '../i18n/LanguageContext';
import styles from './ProjectDetailPage.module.css';
import { ProjectPreviewGallery } from '../components/ProjectPreviewGallery';
import { ProjectThumbnail } from '../components/ProjectThumbnail';
import { ProjectsGallery } from '../components/ProjectsGallery';

export function ProjectDetailPage() {
  const { copy, language } = useLanguage();
  const { projectId } = useParams();
  const projectIndex = projects.findIndex((item) => item.id === projectId);
  const project = projects[projectIndex];
  const reduceMotion = useReducedMotion();
  const copyRef = useRef<HTMLDivElement>(null);
  const [stickyTop, setStickyTop] = useState(24);
  useEffect(() => {
    const element = copyRef.current;
    if (!element) return;
    const measure = () => setStickyTop(Math.min(24, window.innerHeight - element.offsetHeight - 24));
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    window.addEventListener('resize', measure);
    measure();
    return () => { observer.disconnect(); window.removeEventListener('resize', measure); };
  }, [projectId, language]);

  if (!project) {
    return (
      <main className={styles.page} key={projectId}>
        <div className={styles.missing}>
          <Link to="/" className={styles.brand}>Camila <em>Gómez</em></Link>
          <h1>{copy.projectNotFound}</h1>
          <a href={`${import.meta.env.BASE_URL}projects`} className={styles.backLink}>
            <ArrowLeft size={16} aria-hidden="true" /> {copy.backToPortfolio}
          </a>
        </div>
      </main>
    );
  }


  return (
    <main className={styles.page} key={projectId}>
      <div className={styles.shell}>

        <motion.section
          className={styles.hero}
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          aria-labelledby="project-title"
        >
          <motion.div className={styles.heroCopy} ref={copyRef} style={{ top: stickyTop }}
            initial={reduceMotion ? false : { opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .65, delay: 1.05, ease: [.22, 1, .36, 1] }}>
            <nav className={styles.breadcrumbs} aria-label={language === 'es' ? 'Ruta de navegaci?n' : 'Breadcrumb'}>
              <ol>
                <li><Link to="/">{language === 'es' ? 'Inicio' : 'Home'}</Link></li>
                <li><Link to="/projects">{copy.projects}</Link></li>
                <li aria-current="page">{project.name}</li>
              </ol>
            </nav>
            <h1 id="project-title">{project.name}</h1>
            <p className={styles.summary}>{project.description}</p>
            <div className={styles.sampleDescription}>
              {language === 'es' ? <>
                <p>La propuesta explora c?mo transformar una idea en una experiencia clara, coherente y cercana. El recorrido pone atenci?n en la relaci?n entre contenido, jerarqu?a visual y ritmo: cada elemento tiene un lugar y acompa?a a la persona de una secci?n a la siguiente.</p>
                <p>La selecci?n visual re?ne composiciones generales y detalles para mostrar distintas escalas del proyecto. El contraste entre im?genes amplias y piezas en pareja permite detenerse en cada decisi?n, reconocer conexiones y entender el conjunto sin perder el contexto de esta descripci?n.</p>
              </> : <>
                <p>This sample proposal explores how an idea can become a clear, coherent experience. The narrative focuses on content, visual hierarchy and rhythm, guiding the viewer naturally from one section to the next.</p>
                <p>The visual selection combines full compositions and details at different scales. Large images and paired pieces create moments to pause, discover connections and understand the complete project while this description remains in view.</p>
              </>}
            </div>
        <section className={styles.overview} aria-label={copy.projectOverview}>
          {project.context !== project.description && <article className={styles.contextBlock}>
            <p className={styles.sectionIndex}>01 / {copy.context}</p>
            <h2>{copy.projectOverview}</h2>
            <p>{project.context}</p>
          </article>}
          {project.roleDetail && <article className={styles.problemBlock}>
            <p className={styles.sectionIndex}>02 / {copy.role}</p>
            <h2>{language === 'es' ? 'Mi contribución' : 'My contribution'}</h2>
            <p>{project.roleDetail}</p>
          </article>}
          {project.problem && <article className={styles.problemBlock}>
            <p className={styles.sectionIndex}>02 / {copy.problem}</p>
            <h2>{copy.problem}</h2>
            <p>{project.problem}</p>
          </article>}
        </section>

        {project.process && <section className={styles.processSection} aria-labelledby="process-title">
          <div className={styles.processIntro}>
            <p className={styles.sectionIndex}>03 / {copy.process}</p>
            <h2 id="process-title">{copy.designingTheExperience}</h2>
            <p>{project.process}</p>
          </div>
          <div className={styles.processSteps}>
            <article><span>01</span><h3>{copy.research}</h3><p>{project.research}</p></article>
            <article><span>02</span><h3>{copy.strategy}</h3><p>{project.strategy}</p></article>
            <article><span>03</span><h3>{copy.wireframes}</h3><p>{project.wireframes}</p></article>
            <article><span>04</span><h3>{copy.designSystem}</h3><p>{project.designSystem}</p></article>
          </div>
        </section>}

        {project.outcome && <section className={styles.outcomeSection} aria-label={copy.outcome}>
          <div>
            <p className={styles.sectionIndex}>04 / {copy.outcome}</p>
            <h2>{copy.outcome}</h2>
          </div>
          <p className={styles.outcomeText}>{project.outcome}</p>
        </section>}

        {project.learnings && <section className={styles.learningSection} aria-label={copy.learnings}>
          <span className={styles.quoteMark} aria-hidden="true">“</span>
          <div>
            <p className={styles.sectionIndex}>{copy.learnings}</p>
            <p>{project.learnings}</p>
          </div>
        </section>}

          {(project.year || project.role) && <dl className={styles.metadata}>
            {project.year && <div><dt>{copy.year}</dt><dd>{project.year}</dd></div>}
            {project.role && <div><dt>{copy.role}</dt><dd>{project.role}</dd></div>}
          </dl>}
          </motion.div>
          <div className={styles.visualColumn}>
            <div className={`${styles.heroImage} ${project.video ? styles.videoHero : ''}`} data-project-hero>
              {project.video ? <video className={styles.projectVideo} controls playsInline preload="metadata" aria-label={`${project.name} — video`}><source src={project.video} type="video/mp4" /></video> : <ProjectThumbnail project={project} eager />}
            </div>
            {!!project.gallery?.length && <div className={styles.imageGallery} aria-label={language === 'es' ? 'Galer?a del proyecto' : 'Project gallery'}>
              {project.gallery.map((src, index) => <motion.figure key={src}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .1 }} transition={{ duration: .6 }}>
                <img src={src} alt={`${project.name} ? ${index + 1}`} loading="lazy" />
                <figcaption><span>{project.category}</span><span>{String(index + 1).padStart(2, '0')}</span></figcaption>
              </motion.figure>)}
            </div>}
            <ProjectPreviewGallery />
          </div>
        </motion.section>

        <ProjectsGallery excludeProjectId={project.id} />
      </div>
    </main>
  );
}

