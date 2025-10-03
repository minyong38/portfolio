// src/App.jsx

import { Routes, Route } from 'react-router-dom';

// Pages
import MainHome from './pages/MainHome';
import Gallery from './pages/gallery';
import Maps from './pages/Maps';
import Music from './pages/Music';
import NotFound from './pages/NotFound';
import Guestbook from './pages/Guestbook';
import ProjectFireOverview from './pages/ProjectFireOverview';

// Portfolio sections
import Navbar from './components/Navbar';
import SectionHero from './components/SectionHero';
import SectionAbout from './components/SectionAbout';
import Skills from './components/Skills';
import Certificates from './components/Certificates';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';

import './index.css';

function PortfolioLayout() {
  return (
    <>
      <Navbar />
      <main>
        <SectionHero />
        <SectionAbout />
        <Skills />
        <Certificates />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Landing page */}
      <Route path="/" element={<PortfolioLayout />} />

      {/* Other pages */}
      <Route path="/home" element={<MainHome />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/maps" element={<Maps />} />
      <Route path="/music" element={<Music />} />
      <Route path="/guestbook" element={<Guestbook />} />

      {/* Project overview pages */}
      <Route path="/fire-monitor" element={<ProjectFireOverview />} />
    </Routes>
  );
}
