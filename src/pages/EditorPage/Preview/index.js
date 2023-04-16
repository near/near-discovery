import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Widget } from "near-social-vm";
import { Tab, Layout } from "../utils/const";
import RenderPreviewButton from "../Buttons/RenderPreviewButton";

const Preview = ({
  tab,
  layout,
  renderCode,
  jpath,
  parsedWidgetProps,
  isModule,
  setRenderCode,
  setTab,
}) => (
  <div
    className={`${
      tab === Tab.Widget || (layout === Layout.Split && tab !== Tab.Metadata)
        ? ""
        : "visually-hidden"
    }`}
  >
    <div style={{}}>
      <div
        className="container"
        style={
          tab === Tab.Widget
            ? {
                border: "1px solid #ced4da",
                appearance: "none",
                borderRadius: "0.375rem",
                height: "70vh",
                maxWidth: "100%",
                padding: "20px",
              }
            : {
                padding: "20px",
                border: "1px solid #ced4da",
                appearance: "none",
                borderRadius: "0.375rem",
                height: "70vh",
              }
        }
      >
        <div className="h-100 row">
          <div className="d-inline-block position-relative overflow-auto h-100">
            {renderCode ? (
              <div
                style={{
                  padding: 0,
                  margin: 0,
                }}
              >
                <Widget
                  key={`preview-${jpath}`}
                  code={renderCode}
                  props={parsedWidgetProps}
                />
              </div>
            ) : (
              !isModule && (
                <div
                  style={{
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <RenderPreviewButton
                    setRenderCode={setRenderCode}
                    layout={layout}
                    setTab={setTab}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Preview;
