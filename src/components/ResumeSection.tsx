import { Download, ArrowUpRight } from 'lucide-react';
import { CareerTimeline } from './CareerTimeline';
import { useLanguage } from '../i18n/LanguageContext';
import styles from './ResumeSection.module.css';

export function ResumeSection() {
  const { language } = useLanguage();
  const es = language === 'es';
  return (
    <section className={styles.resume} id="experience" aria-labelledby="resume-heading">
      <header className={styles.header}>
        <div><p className={styles.eyebrow}>{es ? 'Mi trayectoria' : 'My background'}</p><h2 id="resume-heading">{es ? 'Experiencia y formación' : 'Experience & education'}</h2></div>
        <a className={styles.download} href={`${import.meta.env.BASE_URL}cv/Laura-Camila-Gomez-CV-${language}.pdf`} download><Download size={17} aria-hidden="true" />{es ? 'Descargar CV' : 'Download CV'} <span>PDF</span></a>
      </header>
      <CareerTimeline />
      <div className={styles.columns}>
        <aside className={styles.sidebar}>
          <div><h3>{es ? 'Formación académica' : 'Education'}</h3><h4>{es ? 'Máster Universitario en Gráfico Digital' : 'Master’s Degree in Digital Graphic Design'}</h4><p>UNIR · Universidad Internacional de La Rioja</p><p className={styles.date}>2018 - 2019</p><h4>{es ? 'Diseño Gráfico' : 'Graphic Design'}</h4><p>IUDC · Universitaria de Colombia</p><p className={styles.date}>2013 - 2016</p></div>
          <div><h3>{es ? 'Habilidades técnicas' : 'Technical skills'}</h3><ul className={styles.skills}>{['UX Research', 'UI Design', 'Wireframing', 'Design Systems', es ? 'Arquitectura de información' : 'Information architecture', es ? 'Prototipado interactivo' : 'Interactive prototyping', es ? 'Pruebas de usabilidad' : 'Usability testing', 'HTML / CSS', 'CMS'].map(skill => <li key={skill}>{skill}</li>)}</ul></div>
          <div id="contact" className={styles.contact}><h3>{es ? 'Conversemos' : 'Let’s talk'}</h3><p>Bogotá, Colombia</p><a href="mailto:camilagomez2307@gmail.com">camilagomez2307@gmail.com<ArrowUpRight size={15} aria-hidden="true" /></a><a href="https://www.linkedin.com/in/lauracamilag/" target="_blank" rel="noreferrer">LinkedIn<ArrowUpRight size={15} aria-hidden="true" /></a></div>
        </aside>
      </div>
    </section>
  );
}
