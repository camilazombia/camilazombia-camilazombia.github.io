import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import styles from './ProjectPreviewGallery.module.css';

const sections = [
  { title: ['Universo visual', 'Visual universe'], text: ['Una exploración de color, textura y composición. Estas imágenes de muestra permiten ver cómo respira el proyecto entre piezas de distintos tamaños y cómo se construye una narrativa visual al recorrer la página.', 'An exploration of color, texture and composition. These sample images show how pieces of different sizes can build a visual narrative throughout the page.'], images: [`${import.meta.env.BASE_URL}images/gallery/hacienda-appointments.png`, `${import.meta.env.BASE_URL}images/gallery/remote-website.png`], layout: 'pair' },
  { title: ['Detalles que conectan', 'Connected details'], text: ['Un espacio para mostrar los detalles de la propuesta: decisiones visuales, elementos de identidad y acercamientos que complementan la imagen principal. El formato amplio introduce una pausa y da protagonismo a una sola pieza.', 'A space for visual decisions, identity elements and close-up details that complement the main image. The larger format creates a pause and lets one piece take the spotlight.'], images: [`${import.meta.env.BASE_URL}images/gallery/remote-video-interview.png`], layout: 'wide' },
  { title: ['Una mirada al conjunto', 'The complete picture'], text: ['La secuencia cierra con dos composiciones complementarias. La descripción permanece a la vista mientras las imágenes cambian, para mantener el contexto del proyecto durante todo el recorrido.', 'The sequence closes with two complementary compositions. The description remains visible as the images change, keeping the project in context throughout the experience.'], images: [`${import.meta.env.BASE_URL}images/gallery/niwu-english-platform.png`, `${import.meta.env.BASE_URL}images/gallery/devar-colombia-website.png`], layout: 'pair' },
];

export function ProjectPreviewGallery() {
  const { language } = useLanguage();
  const reduced = useReducedMotion();
  const locale = language === 'es' ? 0 : 1;
  return <div className={styles.preview}>
    <p className={styles.note}>{locale === 0 ? 'Exploración visual · Contenido de muestra' : 'Visual exploration · Sample content'}</p>
    {sections.map((section, index) => <section className={styles.section} key={index}>
      <header><span>0{index + 2}</span><h2>{section.title[locale]}</h2></header>
      <p>{section.text[locale]}</p>
      <div className={styles[section.layout]}>
        {section.images.map((src, imageIndex) => <motion.figure key={src} initial={reduced ? false : { opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .7, delay: imageIndex * .08 }}>
          <img src={src} alt={`${section.title[locale]} — ${imageIndex + 1}`} loading="lazy" />
        </motion.figure>)}
      </div>
    </section>)}
  </div>;
}
