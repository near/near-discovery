import { useCallback, useMemo, useState, useEffect } from 'react';
import { useSetChain } from '@web3-onboard/react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import useAccount from '@/hooks/useAccount';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useChainsStore } from '@/stores/chains';
import { useDappStore } from '@/stores/dapp';
import { useLayoutStore } from '@/stores/layout';
import { usePriceStore } from '@/stores/price';
import useAddAction from '@/hooks/useAddAction';
import Breadcrumb from '@/components/Breadcrumb';
import dappConfig from '@/config/dapp';
import wethConfig from '@/config/contract/weth';
import multicallConfig from '@/config/contract/multicall';
import { multicall } from '@/utils/multicall';
import chainsConfig from '@/config/chains';
import { bridge as dappBridgeTheme } from '@/config/theme/dapp';
import { useDebounceFn } from 'ahooks';
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
  const router = useRouter();
  const chains = useChainsStore((store: any) => store.chains);
  const { chainId } = useAccount();
  const dapp = useDappStore((store: any) => store.dapp);
  const setLayoutStore = useLayoutStore((store) => store.set);
  const { addAction } = useAddAction('dapp');
  const [{ settingChain }, setChain] = useSetChain();
  const [currentChain, setCurrentChain] = useState<any>();
  const [ready, setReady] = useState(false);
  const [localConfig, setLocalConfig] = useState<any>();
  const prices = usePriceStore((store) => store.price);
  const dappPathname = router.query.dappRoute as string;

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

  const getLocalConfig = useCallback(async () => {
    if (!dappPathname) {
      setLocalConfig(null);
      return;
    }
    const config = dappConfig[dappPathname];
    if (!config) {
      setLocalConfig(null);
      return;
    }
    let result: any = null;
    if (config.type === 'swap') {
      result = await import(`@/config/swap/dapps/${dappPathname}`);
    }
    if (config.type === 'lending') {
      result = (await import(`@/config/lending/dapps/${dappPathname}`))?.default;
    }
    setLocalConfig({ ...result, theme: config.theme });
  }, [dappPathname]);

  const { run } = useDebounceFn(
    (chain_id) => {
      if (!chains?.length) return;
      setCurrentChain(chains.find((_chain: any) => _chain.chain_id === chain_id));
    },
    {
      wait: 500,
    },
  );

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    getLocalConfig();
  }, [dappPathname]);

  useEffect(() => {
    if (!chains?.length) return;
    run(default_chain_id);
  }, [chains, default_chain_id]);

  useEffect(() => {
    if (!currentChain || !chainId || !chains?.length) return;
    run(chainId);
  }, [chainId]);

  const network = useMemo(
    () => dapp.dapp_network?.find((_network: any) => _network.network_id === currentChain?.id),
    [currentChain],
  );

  if (!dapp || !default_chain_id || !currentChain || (!dapp.default_chain_id && !dapp.default_network_id))
    return <div />;

  if (!network?.dapp_src || !localConfig) return <div />;

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
            wethAddress: wethConfig[currentChain.chain_id],
            multicallAddress: multicallConfig[currentChain.chain_id],
            dexConfig: {
              ...localConfig.basic,
              ...localConfig.networks[currentChain.chain_id],
              theme: localConfig.theme,
            },
            prices,
            addAction,
            bridgeCb,
            onSwitchChain: setChain,
            switchingChain: settingChain,
            nativeCurrency: chainsConfig[currentChain.chain_id].nativeCurrency,
            theme: { bridge: dappBridgeTheme[currentChain.chain_id] },
            multicall,
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
