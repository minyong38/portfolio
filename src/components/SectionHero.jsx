import { Link } from "react-router-dom";

export default function SectionHero() {
  return (
    <section className="hero h-screen flex items-center justify-center relative overflow-hidden">
      {/* 장식 구체 */}
      <div className="orb orb--1" aria-hidden />
      <div className="orb orb--2" aria-hidden />
      <div className="orb orb--3" aria-hidden />

      <div className="container-page text-center relative z-10">
        {/* 타이틀 */}
        <h1 className="hero-title">
          <span className="text-white">웹 프론트엔드 개발자</span>
          <br />
          <span className="glow">Frontend Developer</span>
        </h1>

        {/* 태그라인 */}
        <p className="hero-tagline mt-4">
          사용자 경험을 디자인하고 코드로 구현합니다
        </p>

        {/* 메인 홈 버튼 */}
        <div className="mt-10">
          <Link
            to="/home"
            className="btn hero-btn relative overflow-hidden group"
          >
            <span className="relative z-10">Main Home</span>
            {/* 반짝이는 이펙트 */}
            <span className="absolute inset-0 bg-gradient-to-r from-brand/0 via-white/20 to-brand/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></span>
          </Link>
        </div>
      </div>

      {/* 스크롤 안내 */}
      <a
        href="#about"
        className="scrollcue z-10 absolute bottom-6 left-1/2 -translate-x-1/2"
        aria-label="Scroll to About"
      >
        <span className="dot" />
        <span>Scroll</span>
      </a>
    </section>
  );
}
