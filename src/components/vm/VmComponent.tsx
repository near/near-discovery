import { Placeholder } from '@near-pagoda/ui';

import { useBosLoaderStore } from '@/stores/bos-loader';
import { useVmStore } from '@/stores/vm';

type Props = {
  showLoadingSpinner?: boolean;
  src: string;
  props?: Record<string, unknown>;
};

export function VmComponent({ showLoadingSpinner = true, ...props }: Props) {
  const { EthersProvider, ethersContext, Widget } = useVmStore();
  const redirectMapStore = useBosLoaderStore();

  if (!EthersProvider || !redirectMapStore.hasResolved) {
    if (!showLoadingSpinner) return null;
    return <Placeholder />;
  }

  return (
    <EthersProvider value={ethersContext}>
      <Widget
        config={{
          redirectMap: redirectMapStore.redirectMap,
        }}
        {...props}
      />
    </EthersProvider>
  );
}
