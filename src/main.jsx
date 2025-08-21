import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import MainHome from "./pages/MainHome.jsx";
import NotFound from "./pages/NotFound.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 👇 GitHub Pages(서브경로)용 basename */}
    <BrowserRouter basename="/portfolio">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<MainHome />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
