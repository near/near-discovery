import { CommitButton } from 'near-social-vm';
import React from 'react';

export default function PublishDraftAsMainButton({
  widgetName,
  near,
  path,
  codeVisible,
  metadata,
  disable,
  handleCommit,
}) {
  return (
    <CommitButton
      className={`btn btn-primary`}
      disabled={!widgetName || disable.publishDraftAsMainButton}
      near={near}
      onCommit={handleCommit}
      data={{
        [path?.type]: {
          [widgetName]: {
            '': codeVisible,
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
