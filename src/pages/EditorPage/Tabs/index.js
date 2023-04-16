import React from "react";

import { Tab, Layout } from "../utils/const";

export default function Tabs({
  isModule,
  tab,
  setTab,
  widgets,
  layout,
  setRenderCode,
  code,
}) {
  return (
    <div style={{ display: "flex" }}>
      <ul
        className={`nav nav-tabs`}
        style={{
          borderBottom: "0px",
          marginTop: "9px",
        }}
      >
        {isModule && (
          <li className="nav-item">
            <button
              className={`nav-link ${
                tab === Tab.Editor ? "active" : "text-secondary"
              }`}
              aria-current="page"
              onClick={() => setTab(Tab.Editor)}
            >
              Module
            </button>
          </li>
        )}
        {isModule || (
          <>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  tab === Tab.Editor ? "active" : "text-secondary"
                }`}
                aria-current="page"
                onClick={() => setTab(Tab.Editor)}
              >
                Component
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  tab === Tab.Props ? "active" : "text-secondary"
                }`}
                aria-current="page"
                onClick={() => setTab(Tab.Props)}
              >
                Props
              </button>
            </li>
            {widgets.widgetMetadataEditor && (
              <li className="nav-item">
                <button
                  className={`nav-link ${
                    tab === Tab.Metadata ? "active" : "text-secondary"
                  }`}
                  aria-current="page"
                  onClick={() => setTab(Tab.Metadata)}
                >
                  Metadata
                </button>
              </li>
            )}
            {/* remove, and add show preview button on the right column */}
            {layout === Layout.Tabs && (
              <li className="nav-item">
                <button
                  className={`nav-link ${
                    tab === Tab.Widget ? "active" : "text-secondary"
                  }`}
                  aria-current="page"
                  onClick={() => {
                    setRenderCode(code);
                    setTab(Tab.Widget);
                  }}
                >
                  Component Preview
                </button>
              </li>
            )}
          </>
        )}
      </ul>
    </div>
  );
}
