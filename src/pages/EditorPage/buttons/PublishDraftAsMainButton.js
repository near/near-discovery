import React from "react";
import { CommitButton } from "near-social-vm";

export default ({
  widgetName,
  near,
  path,
  code,
  metadata,
  disable,
  handleCommit,
}) => (
  <CommitButton
    className={`btn btn-primary`}
    disabled={!widgetName || disable.publishDraftAsMainButton}
    near={near}
    onCommit={handleCommit}
    data={{
      [path?.type]: {
        [widgetName]: {
          "": code,
          metadata,
          branch: {
            draft: null,
          },
        },
      },
    }}
  >
    Publish
  </CommitButton>
);
