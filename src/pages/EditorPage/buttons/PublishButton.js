import React, { useEffect, useRef } from "react";
import { CommitButton } from "near-social-vm";

export default ({
  widgetName,
  near,
  path,
  codeVisible,
  metadata,
  refs,
  disable,
}) => {
  return (
    <div>
      <CommitButton
        className={`btn btn-primary`}
        disabled={!widgetName || disable.publishButton}
        near={near}
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
