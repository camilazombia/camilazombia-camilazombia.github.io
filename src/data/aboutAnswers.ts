import resume from './resume.json';
import { projects } from './projects';
import { whatsappUrl } from './contact';
import type { Language } from '../i18n/LanguageContext';

export type AboutAnswer = { text: string; links?: { label: string; href: string }[] };
export const aboutQuestions = {
  es: ['¿Quién es Camila?', '¿Qué experiencia tienes en UX/UI?', '¿Cómo trabajas?', '¿Qué proyectos puedo ver?', '¿Qué estudiaste?'],
  en: ['Who is Camila?', 'What is your UX/UI experience?', 'How do you work?', 'Which projects can I see?', 'What did you study?'],
};
export const normalizeQuestion = (value: string) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();

export function answerAbout(question: string, language: Language): AboutAnswer {
  const es = language === 'es';
  const q = normalizeQuestion(question);
  const projectLink = { label: es ? 'Explorar proyectos' : 'Explore projects', href: '/projects' };
  const cvLink = { label: es ? 'Descargar CV' : 'Download CV', href: `/cv/Laura-Camila-Gomez-CV-${language}.pdf` };
  if (/whatsapp|contact|correo|email|hablar|mensaje|talk|contrat|hire|disponib|available|precio|price|tarifa|rate/.test(q)) return {
    text: es ? 'Puedes escribirme por WhatsApp para contarme sobre tu idea, consultar disponibilidad y conversar sobre el alcance del proyecto. Estoy en Bogotá, Colombia.' : 'You can reach me on WhatsApp to share your idea, ask about availability and discuss the scope of your project. I’m based in Bogotá, Colombia.',
    links: [{ label: es ? 'Hablemos por WhatsApp' : 'Let’s talk on WhatsApp', href: whatsappUrl(language) }],
  };
  if (/estudi|formacion|educa|master|maestr|univers|degree/.test(q)) return {
    text: es ? 'Mi formación combina Diseño Gráfico en la Universitaria de Colombia (2013–2016) y un Máster Universitario en Gráfico Digital en UNIR, Universidad Internacional de La Rioja (2018–2019). Esa base conecta mi sensibilidad visual con el diseño de experiencias digitales.' : 'I studied Graphic Design at Universitaria de Colombia (2013–2016) and completed a Master’s Degree in Digital Graphic Design at UNIR, Universidad Internacional de La Rioja (2018–2019). This foundation connects visual design with digital experiences.', links: [cvLink],
  };
  const company = resume.find(item => {
    const name = normalizeQuestion(item.company);
    return q.includes(name) || (name.includes('hacienda') && q.includes('hacienda')) || (name.includes('remote') && /remote|latinos/.test(q)) || (name.includes('javeriana') && q.includes('javeriana'));
  });
  if (company) return { text: `${company.company} · ${company.role}\n\n${company.summary?.[language] ?? ''}\n\n${company.date[language]}`, links: [cvLink, projectLink] };
  if (/experien|trayector|career|background|trabajado|worked|anos|years/.test(q)) return {
    text: es ? 'Mi trayectoria incluye diseño gráfico, UX/UI y diseño de producto. He trabajado en educación, comercio electrónico, plataformas de selección y servicios públicos, con experiencias en PeoplePass, Buentipo Anchor, BlackSip, Javeriana, Ágata, RemoteLatinos, Niibu y la Secretaría de Hacienda de Bogotá. Mi trabajo abarca flujos, interfaces y sistemas de diseño, en colaboración con desarrollo y QA.' : 'My background spans graphic design, UX/UI and product design across education, eCommerce, recruitment platforms and public services. My experience includes PeoplePass, Buentipo Anchor, BlackSip, Javeriana, Ágata, RemoteLatinos, Niibu and Secretaría de Hacienda de Bogotá. I work on flows, interfaces and design systems alongside development and QA.', links: [cvLink, projectLink],
  };
  if (/proces|trabajas|metod|approach|work|research|investig|valid|estrateg/.test(q)) return {
    text: es ? 'Empiezo por entender las necesidades de las personas, el contexto del negocio y las restricciones técnicas. Exploro soluciones con flujos, wireframes y prototipos; después valido e itero. Colaboro con stakeholders, desarrollo y QA para acompañar el diseño desde la idea hasta la implementación.' : 'I start by understanding people’s needs, business context and technical constraints. I explore solutions through flows, wireframes and prototypes, then validate and iterate. I collaborate with stakeholders, development and QA from the initial idea through implementation.', links: [projectLink],
  };
  if (/habilid|skill|herramient|tool|sistema|system|protot|interfaz|interface|especial|ux|ui/.test(q)) return {
    text: es ? 'Mis especialidades son investigación UX, diseño de interfaces, prototipado y sistemas de diseño. También trabajo con arquitectura de información, flujos, wireframes y pruebas de usabilidad. Tengo conocimientos de HTML, CSS y CMS que me ayudan a colaborar con desarrollo.' : 'My specialties are UX research, interface design, prototyping and design systems. I also work with information architecture, user flows, wireframes and usability testing. Knowledge of HTML, CSS and CMS helps me collaborate with developers.', links: [cvLink],
  };
  const specificProject = projects.find(item => q.includes(normalizeQuestion(item.name)));
  if (specificProject) return { text: `${specificProject.name} · ${specificProject.category}\n\n${specificProject.context || specificProject.description}${specificProject.roleDetail ? `\n\n${specificProject.roleDetail}` : ''}`, links: [{ label: es ? 'Ver el proyecto' : 'View project', href: `/projects/${specificProject.id}` }] };
  if (/proyect|project|portfolio|portafolio|caso|case/.test(q)) return {
    text: es ? 'Puedes explorar proyectos de servicios digitales para Hacienda, entrevistas en video y rediseño web de Remote Latinos, plataformas educativas, landings de Javeriana, eCommerce y comunicación gráfica. El portafolio reúne distintas facetas de mi trabajo en UX/UI y diseño visual.' : 'Explore digital services for Hacienda, Remote Latinos video interviews and website redesign, education platforms, Javeriana landing pages, eCommerce and graphic communication. The portfolio brings together different aspects of my UX/UI and visual design work.', links: projects.slice(0, 3).map(item => ({ label: item.name, href: `/projects/${item.id}` })).concat([projectLink]),
  };
  if (/quien|camila|sobre ti|sobre mi|about|who|present|hola|hello|ubic|ciudad|city|based|bogota/.test(q)) return {
    text: es ? 'Soy Camila Gómez, diseñadora UX/UI y de producto en Bogotá, Colombia. Tengo formación en diseño gráfico y una maestría en Gráfico Digital. Combino investigación, estrategia y sensibilidad visual para convertir ideas complejas en experiencias claras e intuitivas.' : 'I’m Camila Gómez, a UX/UI and product designer based in Bogotá, Colombia. I have a background in graphic design and a Master’s degree in Digital Graphic Design. I combine research, strategy and visual sensitivity to turn complex ideas into clear, intuitive experiences.', links: [projectLink, cvLink],
  };
  return { text: es ? 'No tengo información suficiente en el portafolio para responder esa pregunta. Puedes preguntarme por mi experiencia, formación, proceso de diseño o proyectos. Si quieres saber algo más específico, conversemos por WhatsApp.' : 'There isn’t enough information in the portfolio to answer that question. You can ask about my experience, education, design process or projects. For anything more specific, let’s talk on WhatsApp.', links: [{ label: es ? 'Escribir a Camila' : 'Message Camila', href: whatsappUrl(language) }] };
}

