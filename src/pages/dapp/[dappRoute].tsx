import { useSetChain } from '@web3-onboard/react';
import { useRouter } from 'next/router';
import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import chains from '@/config/chains';
import { dapps } from '@/config/dapps';
import { useClearCurrentComponent } from '@/hooks/useClearCurrentComponent';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import { useLayoutStore } from '../../stores/layout';
import { useCallback } from 'react';

// set dynamic routes for dapps in config file

const dappSrcMap = {
  dex: 'dapdapbos.near/widget/DappSwapRouter',
} as { [key: string]: string };

export const DappPage: NextPageWithLayout = () => {
  const router = useRouter();

  const { dappRoute } = router.query;
  console.log('dappRoute: ', dappRoute);

  const setLayoutStore = useLayoutStore((store) => store.set);

  const bridgeCb = useCallback(
    () =>
      setLayoutStore({
        defaultTab: 'bridge',
        showAccountSider: true,
      }),
    [],
  );

  const [
    {
      connectedChain, // the current chain the user's wallet is connected to
    },
  ] = useSetChain();

  const dappConfig = dapps.find((dapp) => typeof dappRoute === 'string' && dapp.dappRoute.indexOf(dappRoute) > -1);

  if (!dappConfig || !dappRoute) return <></>;

  const DEFAULT_CHAIN_ID = dappConfig.DEFAULT_CHAIN_ID;

  const CHAIN_LIST = dappConfig.on_chain_ids.map((id) => {
    return chains[id];
  });

  const curChainId = connectedChain ? eval(connectedChain.id) : DEFAULT_CHAIN_ID;

  const dappSrc = dappConfig.dappSrc[curChainId] || dappConfig.dappSrc[DEFAULT_CHAIN_ID];

  if (!dappSrc) return <></>;

  return (
    <ComponentWrapperPage
      componentProps={{
        chainId: curChainId,
        name: dappConfig.name,
        CHAIN_LIST,
        DEFAULT_CHAIN_ID,
        dappConfig,
        curChainId,
        chains,
        curChain: chains[curChainId],
        dappSrc: dappSrc,
        bridgeCb,
        ...(dappConfig.extendProps || {}),
      }}
      src={dappSrcMap[dappConfig.type || 'undefined'] || dappSrc}
    />
  );
};

DappPage.getLayout = useDefaultLayout;

export default DappPage;
