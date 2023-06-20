import { VmCommitButton } from '@/components/vm/VmCommitButton';

export default function PublishButton({ widgetName, path, code, metadata, disable, handleCommit, refs }) {
  return (
    <div ref={refs.step10} style={{ height: '38px' }}>
      <VmCommitButton
        className={`btn btn-primary`}
        disabled={!widgetName || disable.publishButton}
        onCommit={handleCommit}
        data={{
          [path?.type]: {
            [widgetName]: {
              '': code,
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
