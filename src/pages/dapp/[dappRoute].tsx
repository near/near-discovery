import { useSetChain } from '@web3-onboard/react';
import { useRouter } from 'next/router';

import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import chains from '@/config/chains';
import { dapps } from '@/config/dapps';
import { useClearCurrentComponent } from '@/hooks/useClearCurrentComponent';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

// set dynamic routes for dapps in config file

const dappSrcMap = {
  dex: 'dapdapbos.near/widget/DappSwapRouter',
} as { [key: string]: string };

export const DappPage: NextPageWithLayout = () => {
  const router = useRouter();

  const { dappRoute } = router.query;

  const [
    {
      connectedChain, // the current chain the user's wallet is connected to
    },
  ] = useSetChain();

  const dappConfig = dapps.find((dapp) => dapp.dappRoute === dappRoute);

  if (!dappConfig) return <></>;

  const DEFAULT_CHAIN_ID = dappConfig.DEFAULT_CHAIN_ID;

  const CHAIN_LIST = dappConfig.on_chain_ids.map((id) => {
    return chains[id];
  });

  const curChainId = connectedChain ? eval(connectedChain.id) : DEFAULT_CHAIN_ID;
  console.log('curChainId: ', curChainId);

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
        dappSrc: dappConfig.dappSrc[curChainId] || dappConfig.dappSrc[DEFAULT_CHAIN_ID],
      }}
      src={dappSrcMap[dappConfig.type]}
    />
  );
};

DappPage.getLayout = useDefaultLayout;

export default DappPage;
