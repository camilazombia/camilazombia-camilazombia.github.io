import { useEffect } from 'react';
import { Hero } from './components/Hero/Hero';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProjectsGallery } from './components/ProjectsGallery';
import { AboutSection } from './components/AboutSection';
import { LanguageProvider } from './i18n/LanguageContext';
import { BrowserRouter, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { ProjectTransition } from './components/ProjectTransition';
import { ProjectDetailPage } from './pages/ProjectDetailPage';

function ScrollToPage() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function PageLayout() {
  const { pathname } = useLocation();
  return <div className={pathname === '/projects' ? 'siteLayout projectsViewport' : 'siteLayout'}><Navbar /><Outlet /><Footer /></div>;
}

export default function App() {
  return <LanguageProvider>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ProjectTransition>
        <ScrollToPage />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route element={<PageLayout />}>
            <Route path="/projects" element={<main><ProjectsGallery /></main>} />
            <Route path="/about" element={<main><AboutSection /></main>} />
            <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
            <Route path="*" element={<ProjectDetailPage />} />
          </Route>
        </Routes>
      </ProjectTransition>
    </BrowserRouter>
  </LanguageProvider>;
}
