import React from 'react'

import { useBosLoaderStore } from '@/stores/bos-loader';
import { useVmStore } from '@/stores/vm';

import { Spinner } from '../lib/Spinner';

type Props = {
  src?: string;
  props?: Record<string, unknown>;
  mainnetWidget?: boolean;
  code?: string;
};

export function VmComponent(props: Props) {
  const { EthersProvider, ethersContext, Widget } = useVmStore();
  const redirectMapStore = useBosLoaderStore();

  if (!EthersProvider || !redirectMapStore.hasResolved) {
    return <Spinner />;
  }
  return (
    <EthersProvider value={ethersContext}>
        <Widget
          config={{
            redirectMap: redirectMapStore.redirectMap,
            chainId: props.mainnetWidget ? 'mainnet' : null
          }}
          {...props}
        />
    </EthersProvider>
  );
}
