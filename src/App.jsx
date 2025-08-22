// src/App.jsx

import { Routes, Route } from 'react-router-dom';

// --- 페이지 컴포넌트들 ---
import MainHome from './pages/MainHome';
import Gallery from './pages/gallery';
import NotFound from './pages/NotFound';

// --- 포트폴리오 섹션 컴포넌트들 ---
import Navbar from "./components/Navbar";
import SectionHero from "./components/SectionHero";
import SectionAbout from "./components/SectionAbout";
import Skills from "./components/Skills";
import Awards from "./components/Awards";
import Certificates from "./components/Certificates";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import "./index.css";

// 원페이지 포트폴리오 레이아웃을 위한 별도 컴포넌트
function PortfolioLayout() {
  return (
    <>
      <Navbar />
      <main>
        <SectionHero />
        <SectionAbout />
        <Skills />
        <Awards />
        <Certificates />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <a href="#" className="scrolltop" aria-label="scroll to top">↑</a>
    </>
  );
}

// --- 최종 App 컴포넌트 ---
export default function App() {
  return (
    <Routes>
      {/* 기본 경로는 포트폴리오 페이지를 보여줍니다. */}
      <Route path="/" element={<PortfolioLayout />} />

      {/* '/home' 경로에서는 Mac/Windows 선택 페이지를 보여줍니다. */}
      <Route path="/home" element={<MainHome />} />

      {/* '/gallery' 경로에서는 갤러리 페이지를 보여줍니다. */}
      <Route path="/gallery" element={<Gallery />} />

      {/* 그 외 모든 경로는 404 페이지를 보여줍니다. */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}