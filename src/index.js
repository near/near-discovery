import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "@mui/material";
import ThemeContextProvider, { theme } from "./_/context/ThemeContext";
import EditorContextProvider from "./_/context/EditorContext";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <ThemeProvider theme={theme}>
    <ThemeContextProvider>
      <EditorContextProvider>
        <App />
      </EditorContextProvider>
    </ThemeContextProvider>
  </ThemeProvider>);
