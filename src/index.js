import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

const container = document.getElementById("root");

const root = createRoot(container);
root.render(<App />);

let pageFlashCheckInterval;

if (navigator.userAgent !== "ReactSnap") {
  pageFlashCheckInterval = setInterval(removePageFlashPrevent, 25);
}

function removePageFlashPrevent() {
  const pageFlashPrevent = document.getElementById("page-flash-prevent");
  if (pageFlashPrevent) {
    pageFlashPrevent.remove();
    clearInterval(pageFlashCheckInterval);
  }
}
