export type ProjectFrame = 'rect' | 'arch' | 'oval' | 'organic';

export type Project = {
  id: string;
  name: string;
  category: string;
  description: string;
  year: string;
  role: string;
  image: string;
  thumbnail?: string;
  animatedCover?: string;
  playbackRate?: number;
  video?: string;
  gallery?: string[];
  frame: ProjectFrame;
  accent: string;
  context: string;
  problem: string;
  roleDetail: string;
  process: string;
  research: string;
  strategy: string;
  wireframes: string;
  designSystem: string;
  outcome: string;
  learnings: string;
};

const selection = [
  {
    id: 'adidas',
    name: 'Adidas',
    category: 'BlackSip',
    description: 'Proyecto para Adidas realizado como parte del trabajo en BlackSip.'
  },
  {
    "id": "appointment-scheduling",
    "name": "Agendamiento de citas",
    "category": "Hacienda",
    "description": "Plataforma de agendamiento de citas de Hacienda."
  },
  {
    "id": "pqrs-ai",
    "name": "PQRS con IA",
    "category": "Hacienda",
    "description": "Experiencia de PQRS con inteligencia artificial para Hacienda."
  },
  {
    "id": "video-interview",
    "name": "Video Interview",
    "category": "Remote Latinos",
    "description": "Funcionalidad de entrevistas en video de Remote Latinos."
  },
  {
    "id": "remote-latinos-website",
    "name": "Rediseño web",
    "category": "Remote Latinos",
    "description": "Rediseño de la página web de Remote Latinos."
  },
  {
    "id": "nibu-english-platform",
    "name": "Aplicaciones de inglés",
    "category": "Niibu",
    "description": "Conjunto de aplicaciones de la plataforma de inglés de Niibu."
  },
  {
    "id": "publiandes-kids-platform",
    "name": "Inglés para niños",
    "category": "PubliAndes",
    "description": "Plataforma de inglés para niños de PubliAndes."
  },
  {
    "id": "javeriana-landings",
    "name": "Landings de pregrado y posgrado",
    "category": "Javeriana",
    "description": "Páginas de aterrizaje para programas de pregrado y posgrado de la Javeriana."
  },
  {
    "id": "devar-colombia-website",
    "name": "Rediseño web completo",
    "category": "Remote Latinos",
    "description": "Rediseño de la página web completa de Remote Latinos."
  },
  {
    id: 'flexi-digital-campaigns',
    name: 'Campañas digitales de producto',
    category: 'Flexi',
    description: 'Diseño de campañas digitales orientadas a la venta de productos.'
  },
  {
    id: 'the-bar-colombia',
    name: 'The Bar Colombia',
    category: 'BlackSip',
    description: 'Diseño para eCommerce y experiencia de compra de The Bar Colombia, como parte del trabajo en BlackSip.'
  },
  {
    id: 'previsora-social-media',
    name: 'Previsora Seguros · Redes sociales',
    category: 'Buentipo Anchor',
    description: 'Diseño gráfico de piezas para redes sociales de Previsora Seguros.'
  },
  {
    id: 'peoplepass-graphic-design',
    name: 'PeoplePass · Selección gráfica',
    category: 'PeoplePass',
    description: 'Una selección de diseño gráfico para PeoplePass: contenido de redes sociales y material POP.'
  }
];

const projectDetails: Record<string, Partial<Project>> = {
  'peoplepass-graphic-design': {
    role: 'Graphic Designer Analyst',
    image: `${import.meta.env.BASE_URL}images/gallery/peoplepass-cover.svg`,
    context: 'Diseño gráfico para la comunicación de PeoplePass en medios digitales y puntos de contacto físicos. Este proyecto reúne contenido para redes sociales y material POP, manteniendo la coherencia con la identidad de marca.',
    roleDetail: 'Creación de piezas gráficas, coordinación con proveedores y gestión de aprobaciones para mantener los estándares de la marca.'
  },
  'previsora-social-media': {
    role: 'Graphic Designer',
    image: `${import.meta.env.BASE_URL}images/gallery/previsora-cover.svg`,
    context: 'Proyecto de comunicación visual para redes sociales de Previsora Seguros, desarrollado en Buentipo Anchor. La selección se enfoca en piezas gráficas de campaña y su adaptación a formatos digitales.',
    roleDetail: 'Diseño de piezas para redes sociales y adaptación visual de campañas, manteniendo la coherencia de la identidad de Previsora Seguros.'
  },
  'the-bar-colombia': {
    role: 'Web Designer Analyst',
    image: `${import.meta.env.BASE_URL}images/gallery/the-bar-cover.svg`,
    context: 'The Bar Colombia fue uno de los clientes de eCommerce atendidos durante mi experiencia en BlackSip. El proyecto se centra en el diseño para la tienda online y la experiencia de compra.',
    roleDetail: 'Diseño para eCommerce dentro del trabajo con clientes de BlackSip, con foco en la experiencia de compra y los objetivos comerciales.'
  },
  'flexi-digital-campaigns': {
    role: 'Graphic Designer · Freelance',
    image: `${import.meta.env.BASE_URL}images/gallery/flexi-campaign.jpg`,
    context: 'Campañas digitales para promocionar productos de Flexi e impulsar su venta. El proyecto reúne piezas estáticas y animadas para redes sociales y publicidad digital.',
    roleDetail: 'Conceptualización visual y diseño de piezas promocionales para campañas como Cyber Days, Black Days y Sale Days, con adaptación a distintos formatos.'
  }
};

const galleryImages: Record<string, string> = {
  'appointment-scheduling': `${import.meta.env.BASE_URL}images/gallery/hacienda-appointments.png`,
  'pqrs-ai': `${import.meta.env.BASE_URL}images/gallery/pqrs-ai.png`,
  'video-interview': `${import.meta.env.BASE_URL}images/gallery/remote-video-interview.png`,
  'remote-latinos-website': `${import.meta.env.BASE_URL}images/gallery/remote-website.png`,
  'nibu-english-platform': `${import.meta.env.BASE_URL}images/gallery/niwu-english-platform.png`,
  'publiandes-kids-platform': `${import.meta.env.BASE_URL}images/gallery/publiandes-kids-platform.png`,
  'javeriana-landings': `${import.meta.env.BASE_URL}images/gallery/javeriana-landings.png`,
  'devar-colombia-website': `${import.meta.env.BASE_URL}images/gallery/remote-website.png`,
};

const projectPresentation: Record<string, { name: string; category: string }> = {
  'adidas': { name: 'Diseño de página web', category: 'Adidas · BlackSip' },
  'appointment-scheduling': { name: 'Agendamiento de citas', category: 'Secretaría de Hacienda' },
  'pqrs-ai': { name: 'PQRS con IA', category: 'Secretaría de Hacienda' },
  'video-interview': { name: 'Video Interview', category: 'Remote Latinos' },
  'remote-latinos-website': { name: 'Rediseño de página web', category: 'Remote Latinos' },
  'nibu-english-platform': { name: 'Diseño de aplicaciones', category: 'Niibu' },
  'publiandes-kids-platform': { name: 'Plataforma de inglés para niños', category: 'PubliAndes' },
  'javeriana-landings': { name: 'Diseño de landing pages', category: 'Javeriana' },
  'devar-colombia-website': { name: 'Rediseño web completo', category: 'Remote Latinos' },
  'flexi-digital-campaigns': { name: 'Campañas digitales', category: 'Flexi · Freelance' },
  'the-bar-colombia': { name: 'Rediseño de página web', category: 'The Bar Colombia · BlackSip' },
  'previsora-social-media': { name: 'Redes sociales', category: 'Previsora Seguros · Buentipo Colombia' },
  'peoplepass-graphic-design': { name: 'Redes sociales y material POP', category: 'PeoplePass' },
};
// Add case study details only when their scope has been supplied.
export const projects: Project[] = selection.map((project) => ({
  ...project,
  year: '', role: '', image: '', frame: 'rect', accent: 'rose',
  context: project.description,
  problem: '', roleDetail: '', process: '', research: '', strategy: '',
  wireframes: '', designSystem: '', outcome: '', learnings: '',
  ...projectDetails[project.id],
  ...projectPresentation[project.id],
  playbackRate: project.id === 'previsora-social-media' ? 0.5 : 1,
  animatedCover: project.id === 'previsora-social-media' ? `${import.meta.env.BASE_URL}videos/previsora-seguros.mp4` : project.id === 'javeriana-landings' ? `${import.meta.env.BASE_URL}videos/javeriana-inscripciones.mp4` : project.id === 'nibu-english-platform' ? `${import.meta.env.BASE_URL}videos/niibu.webm` : undefined,
  thumbnail: project.id === 'flexi-digital-campaigns' ? `${import.meta.env.BASE_URL}images/gallery/flexi-campaign.jpg` : project.id === 'adidas' ? `${import.meta.env.BASE_URL}images/gallery/adidas.gif` : project.id === 'the-bar-colombia' ? `${import.meta.env.BASE_URL}images/gallery/the-bar-colombia.gif` : project.id === 'devar-colombia-website' ? `${import.meta.env.BASE_URL}images/gallery/remote-website.png` : undefined,
  gallery: project.id === 'the-bar-colombia' || project.id === 'adidas' || project.id === 'nibu-english-platform' || project.id === 'javeriana-landings' || project.id === 'previsora-social-media' ? [] : [galleryImages[project.id] || projectDetails[project.id]?.image].filter((src): src is string => !!src),
}));















