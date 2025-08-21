import Navbar from "./components/Navbar";
import SectionHero from "./components/SectionHero";  // ⬅️ 추가
import SectionAbout from "./components/SectionAbout";
import Skills from "./components/Skills";
import Awards from "./components/Awards";
import Certificates from "./components/Certificates";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "./index.css";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <SectionHero />       {/* ⬅️ 여기 추가 */}
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
