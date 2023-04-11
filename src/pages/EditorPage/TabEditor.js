import React, { useCallback, useEffect, useMemo, useState } from "react";
import Editor from "@monaco-editor/react";
import { Tab } from "./utils/const";
import prettier from "prettier";
import parserBabel from "prettier/parser-babel";

export default function TabEditor({ tab, code, widgetPath, updateCode }) {
  const reformat = useCallback(
    (path, code) => {
      try {
        const formattedCode = prettier.format(code, {
          parser: "babel",
          plugins: [parserBabel],
        });
        updateCode(path, formattedCode);
      } catch (e) {
        console.log(e);
      }
    },
    [updateCode]
  );

  return (
    <div className={`${tab === Tab.Editor ? "" : "visually-hidden"}`}>
      <div
        className="form-control mb-3"
        style={{ height: "70vh", borderTopLeftRadius: "0px" }}
      >
        <Editor
          value={code}
          path={widgetPath}
          defaultLanguage="javascript"
          onChange={(code) => updateCode(path, code)}
          wrapperProps={{
            onBlur: () => reformat(path, code),
          }}
        />
      </div>
      <div className="mb-3 d-flex gap-2 flex-wrap"></div>
    </div>
  );
}
