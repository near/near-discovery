import PagesContainer from "../components/PagesContainer";
import React, { useCallback, useContext, useEffect } from "react";
import { Box } from "@mui/material";
import { ThemeContext } from "../context/ThemeContext";
import { EditorContext } from "../context/EditorContext";
import { Allotment } from "allotment";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import { Widget } from "near-social-vm";

import prettier from "prettier";
import parserBabel from "prettier/parser-babel";

export default function LearnPage(props) {
  const { theme, editorFontSize } = useContext(ThemeContext);
  const { selectedActivity, setSelectedActivity } = useContext(EditorContext);

  useEffect(() => {
    if (!selectedActivity) setSelectedActivity("learn");

    format("return (<div>\n \n \n<h1>Learn</h1></div>)");
  }, []);

  const [code, setCode] = useState("");

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
    <PagesContainer {...props}>
      <Box
        sx={{
          wdith: "100%",
          display: "flex",
          justifyContent: "center",
          //   height: "calc(100vh - 25px)",
          height: "100%",
          overflowY: "auto",
          //   backgroundColor: "red" || theme.ui,
        }}
      >
        <Allotment maxSize="100%" sx={{ height: "100vh" }} vertical={true}>
          <Allotment.Pane>
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
            <Box sx={{ flex: 1, p: 1, bgcolor: theme.ui }}>
              <Widget code={code} />
            </Box>
          </Allotment.Pane>
        </Allotment>
      </Box>
    </PagesContainer>
  );
}
