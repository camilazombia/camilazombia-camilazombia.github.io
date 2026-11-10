import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Download, ImagePlus } from 'lucide-react';
import resume from '../data/resume.json';
import { useLanguage } from '../i18n/LanguageContext';
import styles from './AboutSection.module.css';

export function AboutSection() {
  const { language } = useLanguage();
  const es = language === 'es';
  const reduced = useReducedMotion();
  return <article className={styles.about} id="about">
    <section className={styles.introduction} aria-labelledby="about-title">
      <motion.div className={styles.portrait} initial={reduced ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className={styles.profilePhoto}><img src={`${import.meta.env.BASE_URL}images/projects/WhatsApp%20Image%202026-11-04%20at%208.48.46%20PM.jpeg`} alt={es ? 'Camila de niña con un gorro de cumpleaños' : 'Camila as a child wearing a birthday hat'} /></div>
      </motion.div>
      <motion.div className={styles.bio} initial={reduced ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1, duration: .6 }}>
        <p className={styles.eyebrow}>{es ? 'Un poco sobre mí' : 'A little about me'}</p>
        <h1 id="about-title">{es ? 'Hola, soy Camila.' : 'Hi, I’m Camila.'}</h1>
        <p className={styles.lead}>{es ? 'Diseñadora UX/UI y de producto, con raíces en el diseño gráfico y una mirada curiosa sobre cómo las personas viven lo digital.' : 'A UX/UI and product designer with roots in graphic design and a curious eye for how people experience the digital world.'}</p>
        <p>{es ? 'He trabajado en eCommerce, educación, plataformas de selección y servicios públicos. Mi recorrido pasa por marcas y equipos como PeoplePass, BlackSip, Javeriana, Remote Latinos, Niibu y la Secretaría de Hacienda de Bogotá.' : 'I’ve worked across eCommerce, education, recruitment platforms and public services, with brands and teams including PeoplePass, BlackSip, Javeriana, Remote Latinos, Niibu and Bogotá’s Secretaría de Hacienda.'}</p>
        <p>{es ? 'Me gusta entender el problema antes de dibujar la solución. Conecto investigación, flujos e interfaces para crear experiencias claras, útiles y visualmente cuidadas, trabajando de cerca con producto y desarrollo.' : 'I like to understand the problem before drawing the solution. I connect research, user flows and interfaces to create clear, useful and thoughtfully crafted experiences, working closely with product and development teams.'}</p>
        <div className={styles.bioActions}><a className={styles.cv} href={`${import.meta.env.BASE_URL}cv/Laura-Camila-Gomez-CV-${language}.pdf`} download><Download size={16} aria-hidden="true" />{es ? 'Descargar mi CV' : 'Download my CV'}</a><a className={styles.experienceLink} href="#experience">{es ? 'Mi experiencia' : 'My experience'}<ArrowDown size={16} aria-hidden="true" /></a></div>
        <p className={styles.education}>{es ? 'Diseño Gráfico · Universitaria de Colombia' : 'Graphic Design · Universitaria de Colombia'}<br />{es ? 'Máster en Gráfico Digital · UNIR' : 'Master’s in Digital Graphic Design · UNIR'}</p>
      </motion.div>
    </section>
    <section className={styles.experience} id="experience" aria-labelledby="experience-title">
      <header className={styles.sectionHeader}><div><p className={styles.eyebrow}>{es ? 'El camino hasta aquí' : 'The journey so far'}</p><h2 id="experience-title">{es ? 'Mi experiencia' : 'My experience'}</h2></div><span>{es ? 'Diseño gráfico → UX/UI → Producto' : 'Graphic design → UX/UI → Product'}</span></header>
      <div className={styles.jobs}>{[...resume].sort((a,b) => b.startDate.localeCompare(a.startDate)).map(job => <details className={styles.job} key={job.company}>
        <summary><span className={styles.jobDate}>{job.date[language].split(' · ')[0]}</span><span className={styles.jobTitle}><strong>{job.company}</strong><span>{job.role}</span></span><ArrowUpRight size={20} aria-hidden="true" /></summary>
        <div className={styles.jobDescription}><p>{job.date[language]}</p>{job.summary && <p>{job.summary[language]}</p>}{job.clients && <p>{es ? 'Clientes: ' : 'Clients: '}{job.clients.join(' · ')}</p>}</div>
      </details>)}</div>
    </section>
    <section className={styles.memories} aria-label={es ? 'Galería de fotos' : 'Photo gallery'}>
      <div className={styles.memoryGallery}>
        <div className={styles.memoryTrack}>
          {[0, 1].map(copy => <div className={styles.memoryGroup} key={copy} aria-hidden={copy === 1 ? true : undefined}>
            {[0, 1, 2, 3, 4].map(index => <div className={styles.memoryCard} key={index}>
              <div className={styles.memoryPlaceholder}><ImagePlus size={32} strokeWidth={1} aria-hidden="true" /><span>{es ? 'Una foto, una historia' : 'A photo, a story'}</span></div>
            </div>)}
          </div>)}
        </div>
      </div>
    </section>
  </article>;
}

