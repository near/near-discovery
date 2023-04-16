import React from "react";
import { Filetype } from "../utils/const";

export default function ForkButton({ widgetName, code, forkFile, toPath }) {
  return (
    <button className="btn btn-outline-primary me-2" onClick={() => forkFile()}>
      Fork
    </button>
  );
}
