import React from "react";
import { CommitButton } from "near-social-vm";

export default ({ widgetName, near, path, codeVisible, metadata, disable }) => (
  <CommitButton
    className={`btn btn-primary`}
    disabled={!widgetName || disable.publishDraftAsMainButton}
    near={near}
    data={{
      [path?.type]: {
        [widgetName]: {
          "": codeVisible,
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
