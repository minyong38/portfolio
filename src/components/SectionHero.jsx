import { Link } from "react-router-dom";
import React, { useState } from "react"; // 📍 1. useState를 import 합니다.
import "./SectionHero.css";

export default function SectionHero() {
  const titleLine1 = "웹 프론트엔드 개발자";
  const titleLine2 = "Frontend Developer";

  // 📍 2. 마우스 좌표를 저장할 state를 만듭니다.
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });

  // 📍 3. 마우스가 움직일 때마다 state를 업데이트하는 함수입니다.
  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const animatedText = (text) => {
    return text.split('').map((char, index) => (
      <span key={index} style={{ '--i': index }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    // 📍 4. onMouseMove 이벤트를 section에 추가합니다.
    <section 
      className="hero h-screen flex items-center justify-center relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* 📍 5. 마우스 흔적 효과를 렌더링하는 컨테이너를 추가합니다. */}
      <div className="mouse-trail-container">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="trail-dot"
            style={{
              transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
              // 각 점의 중심을 커서 위치로 맞추기 위한 오프셋
              left: '-25px', 
              top: '-25px'
            }}
          />
        ))}
      </div>

      {/* 장식 구체 */}
      <div className="orb orb--1" aria-hidden />
      <div className="orb orb--2" aria-hidden />
      <div className="orb orb--3" aria-hidden />

      <div className="container-page text-center relative z-10">
        <h1 className="hero-title">
          <span className="text-white reveal-text">{animatedText(titleLine1)}</span>
          <br />
          <span className="glow reveal-text">{animatedText(titleLine2)}</span>
        </h1>

        <p className="hero-tagline mt-4 text-lg text-gray-300 sequential-fade-in">
          사용자 경험을 디자인하고 코드로 구현합니다
        </p>

        <div className="mt-10 hero-btn-container sequential-fade-in">
          <Link to="/home" className="btn hero-btn relative overflow-hidden group">
            <span className="relative z-10">Main Home</span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></span>
          </Link>
        </div>
      </div>

      <a href="#about" className="scrollcue z-10 absolute bottom-6 left-1/2 -translate-x-1/2" aria-label="Scroll to About">
        <span className="dot" />
        <span>Scroll</span>
      </a>
    </section>
  );
}
