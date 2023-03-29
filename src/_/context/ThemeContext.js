import { createTheme } from "@mui/material";
import React, { useState, createContext, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = (props) => {
  const [enableDarkMode, SetEnableDarkMode] = useState(true);
  const [editorFontSize, SetEditorFontSize] = useState("14px");

  const light = {
    textColor: "#1e293b",
    textColor2: "#334155",
    textColor3: "#475569",
    textColor4: "#000",

    buttonColor: "#0078d7",
    buttonColor2: "#ff004e",

    buttonTextColor: "#fff",

    ui: "#fff",
    ui2: "rgba(0,0,0,.05)",
    backgroundColor: "#f6f8fa",

    borderRadius: 5,
    borderColor: "#e1e4e8",

    name: "light",
  };

  const dark = {
    textColor: "#e2e8f0",
    textColor2: "#94a3b8",
    textColor3: "#7e8185",
    textColor4: "#ffffff",

    buttonColor: "#0078d7",
    buttonColor2: "#ff004e",

    buttonTextColor: "#ffffff",

    ui: "#1e1e1e",
    ui2: "#262626",
    backgroundColor: "#1a1a1a",

    borderRadius: 5,
    // borderColor: "#101010",
    borderColor: "#414141",

    name: "dark",
  };

  // const theme = enableDarkMode ? dark : light;

  useEffect(() => {
    setEditorFontSize(localStorage.getItem("editorFontSize") || "14px");
    const enableDarkMode = localStorage.getItem("enableDarkMode");
    console.log("enableDarkMode : ", typeof enableDarkMode, enableDarkMode);
    setEnableDarkMode(enableDarkMode === "true" ? true : false);
  }, []);

  const setEditorFontSize = (value) => {
    SetEditorFontSize(value);

    localStorage.setItem("editorFontSize", value);
  };
  const setEnableDarkMode = (value) => {
    SetEnableDarkMode(value);

    localStorage.setItem("enableDarkMode", value);
  };

  return (
    <ThemeContext.Provider
      value={{
        light,
        dark,
        enableDarkMode,
        setEnableDarkMode,
        theme: enableDarkMode ? dark : light,
        editorFontSize,
        setEditorFontSize,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;

// A custom theme for this app
export const theme = createTheme({
  palette: {
    primary: {
      main: "#0078d7",
    },
    secondary: {
      main: "#ff004e",
    },
    tertiary: {
      main: "#56CDAD",
    },
    error: {
      main: "#D63649",
    },
    background: {
      default: "#FFF",
    },
    success: {
      main: "#26A4FF",
    },
    info: {
      main: "#4640DE",
    },
    text: {
      main: "red",
    },
  },

  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),

    h1: {
      fontSize: 48,
      fontWeight: 700,
    },
    h2: {
      fontSize: 32,
      fontWeight: 700,
    },
    h3: {
      fontSize: 24,
      fontWeight: 700,
    },
    h4: {
      fontSize: 20,
      fontWeight: 700,
    },
    h5: {
      fontSize: 18,
      fontWeight: 700,
    },
    h6: {
      fontSize: 16,
      lineHeight: "16px",
      fontWeight: 600,
    },
    p1: {
      fontSize: 14,
      fontWeight: 500,
    },
    p2: {
      fontSize: 13,
      lineHeight: "16px",
      fontWeight: 500,
    },

    // Buttons
    button_large: {
      fontSize: 18,
      fontWeight: 700,
    },
    button_normal: {
      fontSize: 16,
      fontWeight: 600,
    },
    button_small: {
      fontSize: 14,
      fontWeight: 600,
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
});
