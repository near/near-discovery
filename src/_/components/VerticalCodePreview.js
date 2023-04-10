import React from "react";
import LearnPageHeader from "../pages/learnPage/_components/LearnPageHeader";
import { Allotment } from "allotment";
import { Box } from "@mui/system";

import Editor from "@monaco-editor/react";
import { Widget } from "near-social-vm";
import { ThemeContext } from "../context/ThemeContext";
import { useContext, useCallback } from "react";

export default function VerticalCodePreview({ setCode, code }) {
  const { theme, editorFontSize } = useContext(ThemeContext);

  const format = useCallback(
    (code) => {
      try {
        const formattedCode = prettier.format(code, {
          parser: "babel",
          plugins: [parserBabel],
        });

        console.log(formattedCode);

        setCode(formattedCode);
      } catch (e) {
        console.log(e);
      }
    },
    [code]
  );

  return (
    <Allotment sx={{ height: "100vh" }} vertical={true}>
      <Allotment.Pane>
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

      <Allotment.Pane style={{ flex: 1, height: "100vh" }}>
        <LearnPageHeader title="Prevew" />
        <Box
          sx={{
            flex: 1,
            p: 1,
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
