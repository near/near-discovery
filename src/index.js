import React from "react";
import { createRoot } from "react-dom/client";
import { hydrate, render } from "react-dom";
import "./index.css";
import App from "./App";

const container = document.getElementById("root");
if (container.hasChildNodes()) {
  hydrate(<App />, container);
} else {
  render(<App />, container);
}

document.body.classList.add("hydrated");

// const root = createRoot(container);
// root.render(<App />);
