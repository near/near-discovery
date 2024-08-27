import { useContext, useEffect } from 'react';

import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { NearContext } from '@/components/WalletSelector';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import { networkId } from '@/utils/config';
import type { NextPageWithLayout } from '@/utils/types';

const RelayerDemoPage: NextPageWithLayout = () => {
  const components = useBosComponents();
  const { wallet } = useContext(NearContext);

  useEffect(() => {
    wallet?.selector
      .then((selector: any) => selector.wallet('fast-auth-wallet'))
      .then((fastAuthWallet: any) =>
        fastAuthWallet.setRelayerUrl({
          relayerUrl:
            networkId === 'testnet'
              ? 'https://fastauth.demo.near-relayer-testnet.api.pagoda.co/relay'
              : 'https://basic.demo.near-relayer-mainnet.api.pagoda.co/relay',
        }),
      );
  }, [wallet?.selector]);

  useEffect(() => {
    return () => {
      wallet?.selector
        .then((selector: any) => selector.wallet('fast-auth-wallet'))
        .then((fastAuthWallet: any) => fastAuthWallet.resetRelayerUrl());
    };
  }, [wallet?.selector]);

  return <ComponentWrapperPage src={components.relayerDemo} meta={{ title: 'NEAR | Relayer Demo', description: '' }} />;
};

RelayerDemoPage.getLayout = useDefaultLayout;

export default RelayerDemoPage;
