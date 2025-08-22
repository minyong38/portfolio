import React from "react";

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container-page">
        <div className="card p-4 sm:p-6">
          <h2 className="section-title text-white">Contact</h2>
          <div className="flex flex-col xs:flex-row flex-wrap gap-3 mt-3 items-start">
            <a
              className="btn text-xs sm:text-base px-6 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-500 shadow hover:from-indigo-400 hover:to-violet-400 transition text-left w-auto min-w-[180px] max-w-xs"
              href="mailto:minyong38@naver.com"
            >
              minyong38@naver.com
            </a>
            <a
              className="btn text-xs sm:text-base px-6 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-500 shadow hover:from-indigo-400 hover:to-violet-400 transition text-left w-auto min-w-[120px] max-w-xs"
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
