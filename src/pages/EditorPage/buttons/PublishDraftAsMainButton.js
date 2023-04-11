import React from "react";
import { CommitButton } from "near-social-vm";

export default function PublishDraftAsMainButton({
  widgetName,
  near,
  path,
  code,
  metadata,
}) {
  return (
    <CommitButton
      className={`btn btn-primary`}
      disabled={!widgetName}
      near={near}
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
}
