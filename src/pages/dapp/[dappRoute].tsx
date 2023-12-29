import { useCallback, useMemo, useState, useEffect } from 'react';
import { useSetChain } from '@web3-onboard/react';
import styled from 'styled-components';
import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import useAccount from '@/hooks/useAccount';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useChainsStore } from '@/stores/chains';
import { useDappStore } from '@/stores/dapp';
import { useLayoutStore } from '@/stores/layout';
import useAddAction from '@/hooks/useAddAction';
import Breadcrumb from '@/components/Breadcrumb';
import type { NextPageWithLayout } from '@/utils/types';

// set dynamic routes for dapps in config file

const DappName = styled.div`
  color: #fff;
  font-family: Gantari;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const DappPage: NextPageWithLayout = () => {
  const chains = useChainsStore((store: any) => store.chains);
  const { chainId } = useAccount();
  const dapp = useDappStore((store: any) => store.dapp);
  const setLayoutStore = useLayoutStore((store) => store.set);
  const { addAction } = useAddAction('dapp');
  const [{ settingChain }, setChain] = useSetChain();
  const [currentChain, setCurrentChain] = useState<any>();
  const [ready, setReady] = useState(false);
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

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!chainId) return;
    if (!chains?.length) return;
    setCurrentChain(chains.find((_chain: any) => _chain.chain_id === chainId));
  }, [chainId]);

  useEffect(() => {
    if (!chains?.length) return;
    setCurrentChain(chains.find((_chain: any) => _chain.chain_id === default_chain_id));
  }, [chains, default_chain_id]);

  const network = useMemo(
    () => dapp.dapp_network?.find((_network: any) => _network.network_id === currentChain?.id),
    [currentChain],
  );

  if (!dapp || !default_chain_id || !currentChain || (!dapp.default_chain_id && !dapp.default_network_id))
    return <div />;

  if (!network?.dapp_src) return <div />;

  return ready ? (
    <>
      <Breadcrumb
        navs={[
          { name: 'Home', path: '/' },
          { name: 'Dapps', path: '/alldapps' },
          { name: dapp.name, path: '' },
        ]}
      />
      <div style={{ margin: '0 auto', padding: '40px 0px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '11px', justifyContent: 'center' }}>
          <img src={dapp.logo} style={{ width: '32px', height: '31px' }} />
          <DappName>{dapp.name}</DappName>
        </div>
        <ComponentWrapperPage
          componentProps={{
            chainId,
            name: dapp.name,
            CHAIN_LIST: dappChains,
            curChain: currentChain,
            defaultDex: dapp.name,
            ...dapp,
            addAction,
            bridgeCb,
            onSwitchChain: setChain,
            switchingChain: settingChain,
          }}
          src={network.dapp_src}
        />
      </div>
    </>
  ) : (
    <div />
  );
};

DappPage.getLayout = useDefaultLayout;

export default DappPage;
