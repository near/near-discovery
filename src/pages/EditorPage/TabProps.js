import React, { useCallback, useEffect, useMemo, useState } from "react";
import Editor from "@monaco-editor/react";
import { Tab } from "./utils/const";

export default function TabProps({
  tab,
  widgetProps,
  setWidgetProps,
  reformatProps,
  propsError,
}) {
  return (
    <div className={`${tab === Tab.Props ? "" : "visually-hidden"}`}>
      <div className="form-control" style={{ height: "70vh" }}>
        <Editor
          value={widgetProps}
          defaultLanguage="json"
          onChange={(props) => setWidgetProps(props)}
          wrapperProps={{
            onBlur: () => reformatProps(widgetProps),
          }}
        />
      </div>
      <div className=" mb-3">^^ Props for debugging (in JSON)</div>
      {propsError && <pre className="alert alert-danger">{propsError}</pre>}
    </div>
  );
}
