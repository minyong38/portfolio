import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";                 // 포트폴리오 메인 (Hero, About 등)
import MainHome from "./pages/MainHome.jsx"; // 새로 만든 Main Home (런치패드 스타일)
import NotFound from "./pages/NotFound.jsx"; // 404 페이지

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* 포트폴리오 랜딩 페이지 */}
        <Route path="/" element={<App />} />

        {/* Main Home 페이지 */}
        <Route path="/home" element={<MainHome />} />

        {/* 그 외 모든 경로 → NotFound */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
