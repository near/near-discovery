import { memo, useCallback } from 'react';
import styled from 'styled-components';
import Breadcrumb from '@/components/Breadcrumb';
import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { bridge as dappBridgeTheme } from '@/config/theme/dapp';
import chainsConfig from '@/config/chains';
import GAS_LIMIT_RECOMMENDATIONS from '@/config/contract/gas-limit';
import multicallConfig from '@/config/contract/multicall';
import wethConfig from '@/config/contract/weth';
import { multicall } from '@/utils/multicall';
import { usePriceStore } from '@/stores/price';
import useAddAction from '@/hooks/useAddAction';
import useSwitchChain from '@/hooks/useSwitchChain';
import { useLayoutStore } from '@/stores/layout';

const StyledPage = styled.div`
  padding: 50px 80px 0px;
`;

const DappName = styled.div`
  color: #fff;
  font-family: Gantari;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Dapp = ({
  dapp,
  chainId,
  account,
  dappChains,
  currentChain,
  localConfig,
  network,
  isChainSupported,
  setCurrentChain,
  setIsChainSupported,
  chains,
}: any) => {
  const prices = usePriceStore((store) => store.price);
  const { addAction } = useAddAction('dapp');
  const setLayoutStore = useLayoutStore((store) => store.set);
  const { switching, switchChain } = useSwitchChain();

  const bridgeCb = useCallback(
    () =>
      setLayoutStore({
        defaultTab: 'bridge',
        showAccountSider: true,
      }),
    [],
  );

  return (
    <StyledPage>
      <Breadcrumb
        navs={[
          { name: 'Home', path: '/' },
          { name: 'dApps', path: '/alldapps' },
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
            account,
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
            onSwitchChain: (params: any) => {
              if (Number(params.chainId) === chainId) {
                setCurrentChain(chains.find((_chain: any) => _chain.chain_id === chainId));
                setIsChainSupported(true);
              } else {
                switchChain(params);
              }
            },
            switchingChain: switching,
            nativeCurrency: chainsConfig[currentChain.chain_id].nativeCurrency,
            theme: { bridge: dappBridgeTheme[currentChain.chain_id] },
            multicall,
            isChainSupported,
            GAS_LIMIT_RECOMMENDATIONS,
          }}
          src={network.dapp_src}
        />
      </div>
    </StyledPage>
  );
};

export default memo(Dapp);
