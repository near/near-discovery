import { useDebounceFn } from 'ahooks';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import dappConfig from '@/config/dapp';
import useAccount from '@/hooks/useAccount';

import { useDefaultLayout } from '@/hooks/useLayout';

import useDappInfo from '@/hooks/useDappInfo';
import { useChainsStore } from '@/stores/chains';
import DappView from '@/views/Dapp';
import type { NextPageWithLayout } from '@/utils/types';

// set dynamic routes for dapps in config file

export const DappPage: NextPageWithLayout = () => {
  const router = useRouter();
  const dappPathname = router.query.dappRoute as string;
  const chains = useChainsStore((store: any) => store.chains);

  const { chainId, account } = useAccount();
  const { dapp, loading } = useDappInfo(dappPathname ? `dapp/${dappPathname}` : '');

  const [currentChain, setCurrentChain] = useState<any>();
  const [ready, setReady] = useState(false);
  const [localConfig, setLocalConfig] = useState<any>();
  const [isChainSupported, setIsChainSupported] = useState<boolean>();

  const dappChains = useMemo(() => {
    if (!chains?.length) return [];
    return dapp.dapp_network?.map((network: any) => chains.find((_chain: any) => _chain.id === network.network_id));
  }, [chains, dapp]);

  const default_chain_id = useMemo(() => {
    if (dapp.default_chain_id) return dapp.default_chain_id;
    const default_chain = chains.find((_chain: any) => _chain.id === dapp.default_network_id);
    return default_chain?.chain_id;
  }, [chains, dapp]);

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
    if (config.type === 'staking') {
      result = (await import(`@/config/staking/dapps/${dappPathname}`))?.default;
    }
    if (config.type === 'liquidity') {
      result = (await import(`@/config/liquidity/dapps/${dappPathname}`))?.default;
    }
    setLocalConfig({ ...result, theme: config.theme });
  }, [dappPathname]);

  const { run } = useDebounceFn(
    (chain_id) => {
      if (!chains?.length) return;
      const isSupported = !!dapp.dapp_network?.find((_chain: any) => _chain.chain_id === chain_id);
      setIsChainSupported(isSupported && chain_id === chainId);

      setCurrentChain(
        chains.find((_chain: any) => _chain.chain_id === (isSupported ? chain_id : dapp.default_chain_id)),
      );
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
  const network = useMemo(() => {
    if (!dapp.dapp_network) return null;
    const _network = dapp.dapp_network?.find((_network: any) => _network.network_id === currentChain?.id);
    return _network || dapp.dapp_network[0];
  }, [currentChain, dapp]);

  if (!dapp || !default_chain_id || !currentChain || (!dapp.default_chain_id && !dapp.default_network_id))
    return <div />;

  if (!network?.dapp_src || !localConfig) return <div />;

  return ready && !loading ? (
    <DappView
      dapp={dapp}
      chainId={chainId}
      account={account}
      dappChains={dappChains}
      currentChain={currentChain}
      localConfig={localConfig}
      network={network}
      isChainSupported={isChainSupported}
      setIsChainSupported={setIsChainSupported}
      setCurrentChain={setCurrentChain}
      chains={chains}
    />
  ) : (
    <div />
  );
};

DappPage.getLayout = useDefaultLayout;

export default DappPage;
