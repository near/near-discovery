import Big from 'big.js';
import type { FC } from 'react';
import React, { useState } from 'react';
import styled from 'styled-components';
import { ethers, BigNumber, utils, Contract } from 'ethers';
import useToast from '@/hooks/useToast';

import { BaseListItem, BaseModal } from '@/components';
import useTokenBalance from '@/hooks/useTokenBalance';
import useAccount from '@/hooks/useAccount';

// import BridgeBtn from './bridge-btn';
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
  const toast = useToast();
  const { account, provider, chainId } = useAccount();

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

  const displayTitles = item.action_title;

  const currencyCodeMatch = displayTitles.match(/\b\s*([A-Za-z]+)\s*on\b/);

  // const currencyCode = currencyCodeMatch ? currencyCodeMatch[1] : '';
  // TODO DEBUG
  const currencyCode = 'ETH';
  const token = SwapTokens.find((item) => item.symbol === currencyCode);
  console.log(token, currencyCode);
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
        <BaseListItem title="Suggestion">{displayTitles}</BaseListItem>
        <BaseListItem title="Your balance">
          {tokenBalance ? Big(tokenBalance).toFixed(4, 0) : ''} {currencyCode}
        </BaseListItem>
        {/* TODO */}
        <BaseListItem title="From">
          {item.action_tokens && typeof item.action_tokens === 'string' && parseActionTokens(item.action_tokens)}
        </BaseListItem>
        <BaseListItem title="To">
          {item.action_tokens && typeof item.action_tokens === 'string' && parseActionTokens(item.action_tokens)}
        </BaseListItem>
      </Wrapper>
      {/* <BridgeBtn
        title={item.template}
        // uniType={dexs[item?.template].uniType}
        currencyCode={currencyCode}
        inputCurrency={{
          address: '0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4', //TODO
          symbol: 'DAI', //TODO,
          decimals: 18, //TODO
        }}
        inputCurrencyAmount={item.action_amount}
        maxInputBalance={Number(tokenBalance || 0)}
        outputCurrency={{
          address: 'native', //TODO
          symbol: 'ETH', //TODO
          decimals: 18, //TODO
        }}
        // routerAddress={dexs[item?.template].routerAddress}
        wethAddress={WETH_ADDRESS}
        //   amountOutFn= {"guessme.near/widget/ZKEVMSwap.swap-quoter"}
        //   handlerV2="guessme.near/widget/ZKEVMSwap.swap-handler"
        outputCurrencyAmount={1} //TODO
        noPair={false}
        token={token}
        updateBalance={update}
      /> */}
    </BaseModal>
  );
};

export default QuestBridgeModal;
