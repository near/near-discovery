import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Widget,
  useCache,
  useNear,
  CommitButton,
  useAccountId,
} from "near-social-vm";

export default function PreviewMetadata({
  tab,
  Tab,
  layoutClass,
  jpath,
  widgets,
  metadata,
  accountId,
  widgetName,
}) {
  return (
    <div
      className={`${tab === Tab.Metadata ? layoutClass : "visually-hidden"}`}
    >
      <div className="container" style={{ marginTop: "50px" }}>
        <div className="row">
          <div className="d-inline-block position-relative overflow-hidden">
            <Widget
              key={`metadata-${jpath}`}
              src={widgets.widgetMetadata}
              props={useMemo(
                () => ({ metadata, accountId, widgetName }),
                [metadata, accountId, widgetName]
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
