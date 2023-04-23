import React from "react";
import { CommitButton } from "near-social-vm";

export default ({
  widgetName,
  near,
  path,
  codeVisible,
  metadata,
  disable,
  handleCommit,
}) => {
  return (
    <div>
      <CommitButton
        className={`btn btn-primary`}
        disabled={!widgetName || disable.publishButton}
        near={near}
        onCommit={handleCommit}
        data={{
          [path?.type]: {
            [widgetName]: {
              "": codeVisible,
              metadata,
            },
          },
        }}
      >
        Publish
      </CommitButton>
    </div>
  );
};
