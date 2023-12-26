import { useCallback, useMemo } from 'react';
import { useSetChain } from '@web3-onboard/react';
import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import useAccount from '@/hooks/useAccount';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useChainsStore } from '@/stores/chains';
import { useDappStore } from '@/stores/dapp';
import { useLayoutStore } from '@/stores/layout';
import useAddAction from '@/hooks/useAddAction';
import type { NextPageWithLayout } from '@/utils/types';

// set dynamic routes for dapps in config file

export const DappPage: NextPageWithLayout = () => {
  const chains = useChainsStore((store: any) => store.chains);
  const { chainId } = useAccount();
  const dapp = useDappStore((store: any) => store.dapp);
  const setLayoutStore = useLayoutStore((store) => store.set);
  const { addAction } = useAddAction('dapp');
  const [{ settingChain }, setChain] = useSetChain();
  const bridgeCb = useCallback(
    () =>
      setLayoutStore({
        defaultTab: 'bridge',
        showAccountSider: true,
      }),
    [],
  );
  const dappChains = useMemo(() => {
    if (!chains?.length) return [];
    return dapp.dapp_network?.map((network: any) => chains.find((_chain: any) => _chain.id === network.network_id));
  }, [chains]);

  const default_chain_id = useMemo(() => {
    if (dapp.default_chain_id) return dapp.default_chain_id;
    const default_chain = chains.find((_chain: any) => _chain.id === dapp.default_network_id);
    return default_chain?.chain_id;
  }, [chains]);

  const curChain = useMemo(() => {
    if (!chains?.length) return {};
    return chains.find((_chain: any) => _chain.chain_id === default_chain_id);
  }, [chains, default_chain_id]);

  const network = useMemo(
    () => dapp.dapp_network?.find((_network: any) => _network.network_id === curChain?.id),
    [curChain],
  );

  if (!dapp || !default_chain_id || !curChain || (!dapp.default_chain_id && !dapp.default_network_id)) return <div />;

  if (!network?.dapp_src) return <div />;
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
        addAction,
        bridgeCb,
        onSwitchChain: setChain,
        switchingChain: settingChain,
      }}
      src={network.dapp_src}
    />
  );
};

DappPage.getLayout = useDefaultLayout;

export default DappPage;
