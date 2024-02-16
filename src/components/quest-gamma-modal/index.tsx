import Big from 'big.js';
import type { FC } from 'react';
import React from 'react';
import styled from 'styled-components';

import { BaseListItem, BaseModal } from '@/components';
import useTokenBalance from '@/hooks/useTokenBalance';

import { iconMap, SwapTokens } from './const';
import LiquidityBtn from './liquidity-btn';

interface IProps {
  item?: any;
  onCloseModal?: any;
}

const Wrapper = styled.div`
  margin-bottom: 20px;
  background: rgba(27, 30, 39, 1);
  border-radius: 12px;
  padding: 22px 12px 1px 12px;
`;
const ItemImg = styled.img`
  width: 20px;
  height: 20px;
`;
const QuestLiquidityModal: FC<IProps> = ({ item, onCloseModal }) => {
  //   const [tokenBalance, setTokenBalance] = useState(0);

  //   const { account, provider } = useAccount();
  const parseActionTokens = (actionTokensString: string) => {
    try {
      const actionTokensArray = JSON.parse(actionTokensString);
      if (Array.isArray(actionTokensArray)) {
        return actionTokensArray.join(' - ');
      } else {
        console.error('Parsed action_tokens is not an array');
        return 'Invalid action_tokens';
      }
    } catch (error) {
      console.error('Error parsing action_tokens:', error);
      return 'Invalid action_tokens';
    }
  };

  const tokenArray = JSON.parse(item.action_tokens);
  const token0 = tokenArray[0];
  const token1 = tokenArray[1];

  const tokenObj0 = SwapTokens.find((item) => item.symbol === token0);
  const tokenObj1 = SwapTokens.find((item) => item.symbol === token1);
  console.info('gamma props:', item);

  const { tokenBalance: tokenBalance0, update: update0 } = useTokenBalance(
    tokenObj0?.address || '',
    tokenObj0?.decimals || 0,
  );
  const { tokenBalance: tokenBalance1, update: update1 } = useTokenBalance(
    tokenObj1?.address || '',
    tokenObj1?.decimals || 0,
  );
  let amount0, amount1, pairId;
  const { extra_data } = item;
  if (extra_data) {
    const obj = JSON.parse(extra_data);
    amount0 = obj.amount0;
    amount1 = obj.amount1;
    pairId = obj.pairId;
  }
  // console.log(111, amount0, amount1, pairId);

  return (
    <BaseModal title="Add Liquidity" onClose={onCloseModal}>
      <Wrapper>
        <BaseListItem title="Dapp">
          <ItemImg src={iconMap[item.template]} style={{ marginRight: '5px' }} />
          {item.template}
        </BaseListItem>
        <BaseListItem title="Suggestion">
          {amount0 ? Big(amount0).toFixed(4, 0) : ''} {token0} + &nbsp;
          {amount1 ? Big(amount1).toFixed(4, 0) : ''} {token1}
        </BaseListItem>
        <BaseListItem title="Your balance">
          {tokenBalance0 ? Big(tokenBalance0).toFixed(4, 0) : ''} {token0} + &nbsp;
          {tokenBalance1 ? Big(tokenBalance1).toFixed(4, 0) : ''} {token1}
        </BaseListItem>
        <BaseListItem title="Pool">
          {item.action_tokens && typeof item.action_tokens === 'string' && parseActionTokens(item.action_tokens)}
        </BaseListItem>
        <BaseListItem title="To">Polygon zkEVM</BaseListItem>
      </Wrapper>
      <LiquidityBtn
        pairId={pairId}
        token0Bal={tokenBalance0}
        token1Bal={tokenBalance1}
        token0={token0}
        token1={token1}
        decimals0={tokenObj0?.decimals || 0}
        decimals1={tokenObj1?.decimals || 0}
      />
    </BaseModal>
  );
};

export default QuestLiquidityModal;
