import React from "react";
import { Layout, Tab } from "../utils/const";

export default ({
  setRenderCode,
  layout,
  setTab,
  codeVisible,
  refs,
  handleRender,
}) => {
  return (
    <div ref={refs.step9}>
      <button
        ref={refs.step4}
        className="btn btn-outline-success"
        onClick={handleRender}
      >
        Render Preview
      </button>
    </div>
  );
};
