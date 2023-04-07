import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Widget,
  useCache,
  useNear,
  CommitButton,
  useAccountId,
} from "near-social-vm";

export default function TabMetadata({
  tab,
  Tab,
  widgets,
  jpath,
  widgetPath,
  setMetadata,
}) {
  return (
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
}
