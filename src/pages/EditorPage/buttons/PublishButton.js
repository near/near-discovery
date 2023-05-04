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
  refs,
}) => {
  return (
    <div ref={refs.step10} style={{ height: "38px" }}>
      <CommitButton
        className={`btn btn-primary`}
        disabled={!widgetName || disable.publishButton}
        near={near}
        onCommit={handleCommit}
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
    </div>
  );
};
