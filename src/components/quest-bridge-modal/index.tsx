import Big from 'big.js';
import type { FC } from 'react';
import React from 'react';
import styled from 'styled-components';

import { BaseListItem, BaseModal } from '@/components';
import useTokenBalance from '@/hooks/useTokenBalance';

import BridgeBtn from './bridge-btn';
import { dexs, iconMap, SwapTokens, WETH_ADDRESS } from './const';

interface IProps {
  item: any;
  onCloseModal: any;
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
const QuestBridgeModal: FC<IProps> = ({ item, onCloseModal }) => {
  console.info('bridge-props:', item);
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

  const currencyCode = parseActionTokens(item.action_tokens);
  const token = SwapTokens.find((item) => item.symbol === currencyCode);
  // console.log(1111, token, currencyCode);
  const { tokenBalance, isError, isLoading, update } = useTokenBalance(
    token?.address || 'native',
    token?.decimals || 0,
  );

  return (
    <BaseModal title="Bridge" onClose={onCloseModal}>
      <Wrapper>
        <BaseListItem title="Dapp">
          <ItemImg src={iconMap[item.template]} style={{ marginRight: '5px' }} />
          {item.template}
        </BaseListItem>
        <BaseListItem title="Suggestion">
          {}
          {currencyCode}
        </BaseListItem>
        <BaseListItem title="Your balance">
          {tokenBalance ? Big(tokenBalance).toFixed(4, 0) : ''} {currencyCode}
        </BaseListItem>

        <BaseListItem title="From">{item?.token_in_currency}</BaseListItem>
        <BaseListItem title="To">{item?.token_out_currency}</BaseListItem>
      </Wrapper>
      <BridgeBtn maxInputBalance={Number(tokenBalance || 0)} token={token} updateBalance={update} />
    </BaseModal>
  );
};

export default QuestBridgeModal;
