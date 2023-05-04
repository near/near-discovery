import { VmCommitButton } from '@/components/client/VmCommitButton';

export default function PublishDraftAsMainButton({ widgetName, path, codeVisible, metadata, disable, handleCommit }) {
  return (
    <VmCommitButton
      className={`btn btn-primary`}
      disabled={!widgetName || disable.publishDraftAsMainButton}
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
    </VmCommitButton>
  );
}
