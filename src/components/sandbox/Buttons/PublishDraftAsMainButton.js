import { VmCommitButton } from '@/components/vm/VmCommitButton';

export default function PublishDraftAsMainButton({ widgetName, path, code, metadata, disable, handleCommit }) {
  return (
    <VmCommitButton
      className={`btn btn-primary`}
      disabled={!widgetName || disable.publishDraftAsMainButton}
      onCommit={handleCommit}
      data={{
        [path?.type]: {
          [widgetName]: {
            '': code,
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
