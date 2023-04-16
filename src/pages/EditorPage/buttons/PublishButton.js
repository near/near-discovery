import React from "react";
import { CommitButton } from "near-social-vm";

export default ({ widgetName, near, path, code, metadata }) => (
  <CommitButton
    className={`btn btn-primary`}
    disabled={!widgetName}
    near={near}
    data={{
      [path?.type]: {
        [widgetName]: {
          "": code,
          metadata,
        },
      },
    }}
  >
    Publish
  </CommitButton>
);
