import React from "react";
import LearnPageHeader from "../pages/learnPage/_components/LearnPageHeader";
import { Allotment } from "allotment";
import { Box } from "@mui/system";

import prettier from "prettier";
import parserBabel from "prettier/parser-babel";

import Editor from "@monaco-editor/react";
import { Widget } from "near-social-vm";
import { ThemeContext } from "../context/ThemeContext";
import { useContext, useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function VerticalCodePreview({ initialCode }) {
  const { theme, editorFontSize } = useContext(ThemeContext);

  const [code, setCode] = useState("");

  console.log(initialCode);

  useEffect(() => {
    if (initialCode?.length > 0) format(initialCode);
  }, [initialCode]);

  const format = useCallback(
    (code) => {
      try {
        const formattedCode = prettier.format(code, {
          parser: "babel",
          plugins: [parserBabel],
        });

        setCode(formattedCode);
      } catch (e) {
        console.log(e);
      }
    },
    [code]
  );

  return (
    <Allotment defaultSizes={[100, 100]} vertical={true}>
      <Allotment.Pane priority={2}>
        <LearnPageHeader title="Code" />

        <Editor
          theme={theme.name === "dark" ? "vs-dark" : "light"}
          options={{
            minimap: { enabled: false },

            wordWrap: "on",
            fontSize: editorFontSize || "16px",
          }}
          defaultLanguage="javascript"
          value={code}
          onChange={(props) => setCode(props)}
          wrapperProps={{ onBlur: () => format(code) }}
        />
      </Allotment.Pane>

      <Allotment.Pane priority={1} style={{ flex: 1, height: "100vh" }}>
        <LearnPageHeader title="Prevew" />
        <Box
          sx={{
            flex: 1,
            p: 1,
            height: "100%",
            bgcolor: theme.ui,
            color: theme.textColor,
          }}
        >
          <Widget code={code} />
        </Box>
      </Allotment.Pane>
    </Allotment>
  );
}
