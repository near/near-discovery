import { styled } from 'styled-components';

import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const CardListWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;
`;

const HotDapps: NextPageWithLayout = () => {
  return (
    <CardListWrapper>
      <ComponentWrapperPage
        src="guessme.near/widget/ZKEVMWarmUp.hot-dapp-card"
        componentProps={{
          background: 'linear-gradient(180deg, #7347DA 0%, #202445 100%)',
          dappName: 'Polygon zkEVM All-in-one',
          creator: 'bluebiu.near',
          widgetSrc: 'bluebiu.near/widget/ZKEVM-all-in-one',
          src: 'https://assets.ref.finance/images/zkevm-swap.png',
        }}
      />
      <ComponentWrapperPage
        src="guessme.near/widget/ZKEVMWarmUp.hot-dapp-card"
        componentProps={{
          background: 'linear-gradient(180deg, #8C36D8 0%, #24264C 100%)',
          dappName: 'Polygon zkEVM Dex',
          creator: 'guessme.near',
          widgetSrc: 'guessme.near/widget/ZKEVMSwap.zkevm-swap',
          src: 'https://assets.ref.finance/images/zkevm-swap.png',
        }}
      />
      <ComponentWrapperPage
        src="guessme.near/widget/ZKEVMWarmUp.hot-dapp-card"
        componentProps={{
          background: 'linear-gradient(180deg, #7347DA 0%, #202445 100%)',
          dappName: 'zkEVM-bridge',
          creator: 'guessme.near',
          widgetSrc: 'guessme.near/widget/ZKEVMSwap.zkevm-bridge',
          src: 'https://assets.ref.finance/images/zkevm-swap.png',
        }}
      />

      <ComponentWrapperPage
        src="guessme.near/widget/ZKEVMWarmUp.hot-dapp-card"
        componentProps={{
          background: 'linear-gradient(180deg, #895C5C 0%, #343149 100%)',
          dappName: 'Gamma',
          creator: 'guessme.near',
          widgetSrc: 'guessme.near/widget/ZKEVM.GAMMA',

          src: 'https://assets.ref.finance/images/zkevm-swap.png',
        }}
      />
    </CardListWrapper>
  );
};

HotDapps.getLayout = useDefaultLayout;

export default HotDapps;
