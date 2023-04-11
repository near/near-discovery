import React from "react";
import { Filetype } from "../utils/const";

export default function ForkButton({ widgetName, code, openFile, toPath }) {
  return (
    <button
      className="btn btn-outline-primary me-2"
      onClick={() => {
        const forkName = widgetName + "-fork";
        openFile(toPath(Filetype.Widget, forkName), code);
      }}
    >
      Fork
    </button>
  );
}
