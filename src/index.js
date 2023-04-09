import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "@mui/material";
import ThemeContextProvider, { theme } from "./_/context/ThemeContext";
import EditorContextProvider from "./_/context/EditorContext";
import { SnackbarProvider } from "notistack";
import AuthContextProvider from "./_/context/AuthContext";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <SnackbarProvider>
    <ThemeContextProvider>
      <AuthContextProvider>
        <ThemeProvider theme={theme}>
          <EditorContextProvider>
            <App />
          </EditorContextProvider>
        </ThemeProvider>
      </AuthContextProvider>
    </ThemeContextProvider>
  </SnackbarProvider>
);
