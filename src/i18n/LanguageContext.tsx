import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Language = 'en' | 'es';

const copy = {
  en: {
    languageLabel: 'Choose language',
    navigationLabel: 'Main navigation',
    homeLabel: 'Camila Gómez home',
    projects: 'Projects',
    projectsPrefix: 'My',
    about: 'About me',
    aboutParagraphOne: 'I’m a UX/UI Designer with a background in graphic design and a Master’s degree in Digital Graphic Design. My experience spans eCommerce, education, recruitment platforms, and public services, where I help turn complex requirements into clear, intuitive digital experiences.',
    aboutParagraphTwo: 'I work across research, user flows, interface design, prototyping, and usability testing. I also create design systems that bring consistency to products and support collaboration with development teams.',
    aboutParagraphThree: 'I enjoy understanding how people use a product, identifying opportunities for improvement, and designing solutions that balance user needs, business goals, and technical constraints. I collaborate closely with stakeholders, developers, and QA teams to take ideas from early definition through implementation.',
    experience: 'Experience',
    contact: 'Let’s talk',
    availability: 'Available for selected projects',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    product: 'Product',
    designer: 'Designer',
    heroTitle: 'Product Designer',
    portraitAlt: 'Camila Gómez, UX/UI designer',
    intro: (
      <>I’m <strong>Camila</strong>, a UX/UI designer turning complex ideas into clear, intuitive digital experiences. I combine research, strategy, and visual design to create products people enjoy using.</>
    ),
    title: 'Camila Gómez — UX/UI Designer',
    description: 'Portfolio of Camila Gómez, UX/UI designer creating clear, intuitive digital experiences.',
    year: 'Year',
    role: 'Role',
    context: 'Context',
    problem: 'Problem',
    process: 'Process',
    research: 'Research',
    strategy: 'UX strategy',
    wireframes: 'Wireframes',
    uiDesign: 'UI design',
    designSystem: 'Design system',
    outcome: 'Outcome',
    learnings: 'Key learnings',
    projectNotFound: 'Project not found',
    backToPortfolio: 'Back to portfolio',
    viewMoreWork: 'View more work',
    viewProject: 'View project',
    caseStudy: 'Case study',
    projectOverview: 'Project overview',
    designingTheExperience: 'Designing the experience',
    projectNavigation: 'Project navigation',
    previousProject: 'Previous project',
    nextProject: 'Next project',
  },
  es: {
    languageLabel: 'Elegir idioma',
    navigationLabel: 'Navegación principal',
    homeLabel: 'Inicio de Camila Gómez',
    projects: 'Proyectos',
    projectsPrefix: 'Mis',
    about: 'Sobre mí',
    aboutParagraphOne: 'Soy diseñadora UX/UI, con formación en diseño gráfico y una maestría en Diseño Gráfico Digital. Mi experiencia abarca comercio electrónico, educación, plataformas de selección y servicios públicos, donde transformo requisitos complejos en experiencias digitales claras e intuitivas.',
    aboutParagraphTwo: 'Trabajo en investigación, flujos de usuario, diseño de interfaces, prototipado y pruebas de usabilidad. También creo sistemas de diseño que aportan coherencia a los productos y facilitan la colaboración con los equipos de desarrollo.',
    aboutParagraphThree: 'Me gusta entender cómo las personas usan un producto, encontrar oportunidades de mejora y diseñar soluciones que equilibren sus necesidades, los objetivos del negocio y las limitaciones técnicas. Colaboro con equipos y partes interesadas para llevar las ideas desde su definición hasta la implementación.',
    experience: 'Experiencia',
    contact: 'Conversemos',
    availability: 'Disponible para proyectos seleccionados',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    product: 'Diseñadora',
    designer: 'de producto',
    heroTitle: 'Diseñadora de producto',
    portraitAlt: 'Camila Gómez, diseñadora UX/UI',
    intro: (
      <>Soy <strong>Camila</strong>, diseñadora UX/UI. Transformo ideas complejas en experiencias digitales claras e intuitivas, combinando investigación, estrategia y diseño visual.</>
    ),
    title: 'Camila Gómez — Diseñadora UX/UI',
    description: 'Portafolio de Camila Gómez, diseñadora UX/UI que crea experiencias digitales claras e intuitivas.',
    year: 'Año',
    role: 'Rol',
    context: 'Contexto',
    problem: 'Problema',
    process: 'Proceso',
    research: 'Investigación',
    strategy: 'Estrategia UX',
    wireframes: 'Wireframes',
    uiDesign: 'Diseño de interfaz',
    designSystem: 'Sistema de diseño',
    outcome: 'Resultado',
    learnings: 'Aprendizajes clave',
    projectNotFound: 'No se encontró el proyecto',
    backToPortfolio: 'Volver al portafolio',
    viewMoreWork: 'Ver más proyectos',
    viewProject: 'Ver proyecto',
    caseStudy: 'Caso de estudio',
    projectOverview: 'Resumen del proyecto',
    designingTheExperience: 'Diseño de la experiencia',
    projectNavigation: 'Navegación entre proyectos',
    previousProject: 'Proyecto anterior',
    nextProject: 'Siguiente proyecto',
  },
} as const;

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  copy: (typeof copy)[Language];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'en';
    return window.localStorage.getItem('portfolio-language') === 'es' ? 'es' : 'en';
  });

  useEffect(() => {
    const localizedCopy = copy[language];
    document.documentElement.lang = language;
    document.title = localizedCopy.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', localizedCopy.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', localizedCopy.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', localizedCopy.description);
    window.localStorage.setItem('portfolio-language', language);
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, copy: copy[language] }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
}
