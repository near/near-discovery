import { VmCommitButton } from '@/components/client/VmCommitButton';

export default function PublishButton({ widgetName, path, codeVisible, metadata, disable, handleCommit, refs }) {
  return (
    <div ref={refs.step10} style={{ height: '38px' }}>
      <VmCommitButton
        className={`btn btn-primary`}
        disabled={!widgetName || disable.publishButton}
        onCommit={handleCommit}
        data={{
          [path?.type]: {
            [widgetName]: {
              '': codeVisible,
              metadata,
            },
          },
        }}
      >
        Publish
      </VmCommitButton>
    </div>
  );
}
