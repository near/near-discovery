import { Placeholder } from '@near-pagoda/ui';

import { useVmStore } from '@/stores/vm';

type Props = {
  className?: string;
  data: Record<string, unknown>;
  handleCommit?: () => void;
  onCommit?: () => void;
};

export function VmCommitButton(props: Props) {
  const { near, CommitButton } = useVmStore();

  if (!near || !CommitButton) {
    return <Placeholder />;
  }

  return <CommitButton near={near} {...props} />;
}
