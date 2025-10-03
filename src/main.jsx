// src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";

// GitHub Pages SPA fallback: handle 404 redirect pattern `?/path`
if (typeof window !== "undefined" && window.location.search.startsWith("?/")) {
  const query = window.location.search.slice(2); // remove '?/'
  const path = query.split("&")[0];
  const hash = window.location.hash || "";
  const base = import.meta.env.BASE_URL || "/";
  const newUrl = base.replace(/\/$/, "/") + path.replace(/^\//, "") + hash;
  window.history.replaceState(null, "", newUrl);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
