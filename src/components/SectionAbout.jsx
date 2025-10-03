import Reveal from './Reveal';
import FocusSection from './FocusSection';

export default function SectionAbout() {
  return (
    <section id="about" className="section">
      <div className="container-page">
        <FocusSection>
          <Reveal>
            <div className="card p-4 sm:p-6 bg-[#1a1f26]">
              <h2 className="section-title text-white font-bold">About Me</h2>
              <p className="leading-7 text-sm sm:text-base" style={{ color: '#fff' }}>
                사용자 입장을 고려한 UI와 직관적인 UX를 만드는 프론트엔드 개발자입니다.
                아이디어를 빠르고 아름답게 구현하는 것을 좋아합니다.
              </p>
              <p className="leading-7 mt-3 text-xs sm:text-sm text-gray-300">
                I’m a frontend developer who crafts engaging UIs and intuitive UX that connect with users.
                Bringing ideas to life on the web with speed and elegance is what I love most.
              </p>
            </div>
          </Reveal>
        </FocusSection>
      </div>
    </section>
  );
}
