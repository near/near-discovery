import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

const container = document.getElementById("root");

const root = createRoot(container);
root.render(<App />);

if (navigator.userAgent !== "ReactSnap") {
  document.body.classList.add("hide-page-flash-prevent");
}
