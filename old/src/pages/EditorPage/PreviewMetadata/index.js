import React, { useMemo } from "react";
import { Widget } from "near-social-vm";
import { Tab } from "../utils/const";

const PreviewMetadata = ({
  tab,
  jpath,
  widgets,
  metadata,
  accountId,
  widgetName,
}) => (
  <div className={`${tab === Tab.Metadata ? "" : "visually-hidden"}`}>
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

export default PreviewMetadata;
