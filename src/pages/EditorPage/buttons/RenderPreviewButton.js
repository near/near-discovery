import React from "react";
import { Layout, Tab } from "../utils/const";

export default ({
  setRenderCode,
  layout,
  setTab,
  codeVisible,
  refs,
  handleRender,
  disable,
}) => {
  return (
    <div ref={refs.step9}>
      <button
        disabled={disable.renderPreviewButton}
        ref={refs.step4}
        className="btn btn-outline-success"
        onClick={handleRender}
      >
        Render Preview
      </button>
    </div>
  );
};
