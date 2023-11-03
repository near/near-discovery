import { useEffect } from 'react';
import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useAuthStore } from '@/stores/auth';
import type { NextPageWithLayout } from '@/utils/types';
import { networkId } from '@/utils/config';

const RelayerDemoPage: NextPageWithLayout = () => {
  const components = useBosComponents();
  const vmNear = useAuthStore((store) => store.vmNear);

  useEffect(() => {
    vmNear?.selector
      .then((selector: any) => selector.wallet('fast-auth-wallet'))
      .then((fastAuthWallet: any) =>
        fastAuthWallet.setRelayerUrl({
          relayerUrl:
            networkId === 'testnet'
              ? 'http://fastauth.demo.near-relayer-testnet.api.pagoda.co/relay'
              : 'http://basic.demo.near-relayer-mainnet.api.pagoda.co/relay',
        }),
      );
  }, [vmNear?.selector]);

  useEffect(() => {
    return () => {
      vmNear?.selector
        .then((selector: any) => selector.wallet('fast-auth-wallet'))
        .then((fastAuthWallet: any) => fastAuthWallet.resetRelayerUrl());
    };
  }, []);

  return <ComponentWrapperPage src={components.relayerDemo} meta={{ title: 'NEAR | Relayer Demo', description: '' }} />;
};

RelayerDemoPage.getLayout = useDefaultLayout;

export default RelayerDemoPage;
