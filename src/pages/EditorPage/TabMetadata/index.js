import React, { useMemo } from "react";
import { Widget } from "near-social-vm";
import { Tab } from "../utils/const";

const TabMetadata = ({ tab, widgets, jpath, widgetPath, setMetadata }) => (
  <div
    className={`${
      tab === Tab.Metadata && widgets.widgetMetadataEditor
        ? ""
        : "visually-hidden"
    }`}
  >
    <div
      className="mb-3"
      style={{
        paddingTop: "20px",
        padding: "20px",
        border: "1px solid rgb(206, 212, 218)",
        appearance: "none",
        borderRadius: "0.375rem",
        height: "70vh",
      }}
    >
      <Widget
        src={widgets.widgetMetadataEditor}
        key={`metadata-editor-${jpath}`}
        props={useMemo(
          () => ({
            widgetPath,
            onChange: setMetadata,
          }),
          [widgetPath]
        )}
      />
    </div>
  </div>
);

export default TabMetadata;
