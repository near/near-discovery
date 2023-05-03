import { useComponentRedirectMapStore } from '@/stores/component-redirect-map';
import { useVmStore } from '@/stores/vm';

import { Spinner } from '../lib/Spinner';

type Props = {
  src: string;
  props?: Record<string, unknown>;
};

export function VmWidgetWrapper(props: Props) {
  const { EthersProvider, ethersContext, Widget } = useVmStore();
  const redirectMapStore = useComponentRedirectMapStore();

  if (!EthersProvider || !redirectMapStore.hasResolved) {
    return <Spinner />;
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
