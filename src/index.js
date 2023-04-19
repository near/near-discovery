import React from "react";
import { createRoot } from "react-dom/client";
import { hydrate, render } from "react-dom";
import "./index.css";
import App from "./App";

const container = document.getElementById("root");

const root = createRoot(container);
root.render(<App />);

if (navigator.userAgent !== "ReactSnap") {
  const pageFlashPrevent = document.getElementById("page-flash-prevent");
  if (pageFlashPrevent) {
    pageFlashPrevent.remove();
  }
}
