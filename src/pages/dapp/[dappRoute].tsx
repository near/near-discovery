import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import { useLayoutStore } from '@/stores/layout';
import { useDappStore } from '@/stores/dapp';
import { useChainsStore } from '@/stores/chains';
import { useCallback } from 'react';
import useAccount from '@/hooks/useAccount';

// set dynamic routes for dapps in config file

export const DappPage: NextPageWithLayout = () => {
  const chains = useChainsStore((store: any) => store.chains);
  const { chainId } = useAccount();
  const dapp = useDappStore((store: any) => store.dapp);
  const setLayoutStore = useLayoutStore((store) => store.set);
  const bridgeCb = useCallback(
    () =>
      setLayoutStore({
        defaultTab: 'bridge',
        showAccountSider: true,
      }),
    [],
  );

  if (!dapp || (!dapp.default_chain_id && !dapp.default_network_id)) return <div />;

  const dappChains = dapp.dapp_network?.map((network: any) =>
    chains.find((_chain: any) => _chain.id === network.network_id),
  );
  let default_chain_id = dapp.default_chain_id;
  if (!default_chain_id) {
    const default_chain = chains.find((_chain: any) => _chain.id === dapp.default_network_id);
    default_chain_id = default_chain.chain_id;
  }
  const curChain = chains.find((_chain: any) => _chain.chain_id === default_chain_id);
  const network = dapp.dapp_network?.find((_network: any) => _network.network_id === curChain.id);

  if (!network?.dapp_src) return <div />;
  console.log(network.dapp_src);
  return (
    <ComponentWrapperPage
      componentProps={{
        chainId,
        name: dapp.name,
        CHAIN_LIST: dappChains,
        DEFAULT_CHAIN_ID: dapp.default_chain_id,
        curChain,
        defaultDex: dapp.name,
        ...dapp,
        bridgeCb,
      }}
      src={network.dapp_src}
    />
  );
};

DappPage.getLayout = useDefaultLayout;

export default DappPage;
