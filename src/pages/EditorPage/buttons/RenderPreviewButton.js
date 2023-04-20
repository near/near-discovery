import React from "react";
import { Layout, Tab } from "../utils/const";

export default ({ setRenderCode, layout, setTab, codeVisible }) => (
  <button
    className="btn btn-outline-success"
    onClick={() => {
      setRenderCode(codeVisible);
      if (layout === Layout.Tabs) {
        setTab(Tab.Widget);
      }
    }}
  >
    Render Preview
  </button>
);
