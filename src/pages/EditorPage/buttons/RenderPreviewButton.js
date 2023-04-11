import React from "react";
import { Layout, Tab } from "../utils/const";

export default function RenderPreviewButton({ setRenderCode, layout, setTab }) {
  return (
    <button
      className="btn btn-outline-primary"
      onClick={() => {
        setRenderCode(code);
        if (layout === Layout.Tabs) {
          setTab(Tab.Widget);
        }
      }}
    >
      Render Preview
    </button>
  );
}
