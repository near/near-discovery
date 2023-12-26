import { styled } from 'styled-components';

import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import DappCard from './dapp-card';

const CardListWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;
  a{
    text-decoration: none;
  }
`;

const HotDapps: NextPageWithLayout = () => {
  return (
    <CardListWrapper>
      <DappCard
        background="linear-gradient(180deg, #7347DA 0%, #202445 100%)"
        dappName="Polygon zkEVM All-in-one"
        creator="bluebiu.near"
        widgetSrc="bluebiu.near/widget/ZKEVM-all-in-one"
        src="https://assets.ref.finance/images/zkevm-swap.png"
        ipfs_cid="bafkreiaednvljfk5splm5p3eisbkr3v5laiazldxqirtxs5koimckebsyu"
      />

      <DappCard
        background="linear-gradient(180deg, #8C36D8 0%, #24264C 100%)"
        dappName="Polygon zkEVM Dex"
        creator="guessme.near"
        widgetSrc="guessme.near/widget/ZKEVMSwap.zkevm-swap"
        src="https://assets.ref.finance/images/zkevm-swap.png"
        ipfs_cid="bafkreicahuzb3ikvxml6qrns3zijfddhwgbttqkb3t6ltq5t64k2mduiem"
      />
      <DappCard
        background="linear-gradient(180deg, #7347DA 0%, #202445 100%)"
        dappName="zkEVM-bridge"
        creator="guessme.near"
        widgetSrc="guessme.near/widget/ZKEVMSwap.zkevm-bridge"
        src="https://assets.ref.finance/images/zkevm-swap.png"
        ipfs_cid="bafkreidhz4xmk2cm2a4xtvdi35yaraqb6a5dqxd6c5bhfakvwlg3ecewbi"
      />

      <DappCard
        background="linear-gradient(180deg, #895C5C 0%, #343149 100%)"
        dappName="Gamma"
        creator="guessme.near"
        widgetSrc="guessme.near/widget/ZKEVM.GAMMA"
        src="https://assets.ref.finance/images/zkevm-swap.png"
        ipfs_cid="bafkreial4i3eb5uuxkhecn7nwos76km3qvb7jzxmups57rkxizr5i7dyaa"
      />
    </CardListWrapper>
  );
};

HotDapps.getLayout = useDefaultLayout;

export default HotDapps;
