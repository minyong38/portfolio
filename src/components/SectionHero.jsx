import { Link } from "react-router-dom";
import React from "react";
import "./SectionHero.css";

export default function SectionHero() {
  const titleLine1 = "프론트엔드 개발자";
  const titleLine2 = "Frontend Developer";

  // reveal animation: split text by char
  const animatedText = (text, reveal = true) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        style={reveal ? { "--i": index } : {}}
        className={reveal ? undefined : "no-anim"}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section className="hero h-screen flex items-center justify-center relative overflow-hidden">
      {/* Calm animated background mesh (no cursor follow) */}
      <div className="mesh" aria-hidden />

      <div className="orb orb--1" aria-hidden />
      <div className="orb orb--2" aria-hidden />
      <div className="orb orb--3" aria-hidden />

      <div className="container-page text-center relative z-10">
        <h1 className="hero-title">
          <span className="text-white reveal-text">
            {animatedText(titleLine1, true)}
          </span>
          <br />
          <span className="glow pretty-text">
            {animatedText(titleLine2, false)}
          </span>
        </h1>

        <p className="hero-tagline mt-4 text-lg text-gray-300 sequential-fade-in">
          사용자 경험을 생각하며 코드를 구현합니다.
        </p>

        <div className="mt-10 hero-btn-container sequential-fade-in">
          <Link to="/home" className="btn hero-btn relative overflow-hidden group">
            <span className="relative z-10">Main Home</span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></span>
          </Link>
        </div>
      </div>

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
