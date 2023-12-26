import Big from 'big.js';
import type { FC } from 'react';
import React from 'react';
import styled from 'styled-components';

import { BaseListItem, BaseModal } from '@/components';
import useTokenBalance from '@/hooks/useTokenBalance';

import { dexs, iconMap, SwapTokens, WETH_ADDRESS } from './const';
import SwapBtn from './swap-btn';

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
const QuestSwapModal: FC<IProps> = ({ item, onCloseModal }) => {
  //   const [tokenBalance, setTokenBalance] = useState(0);

  //   const { account, provider } = useAccount();
  console.info('swapmodal item: ', item);
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

  const currencyCode = currencyCodeMatch ? currencyCodeMatch[1] : '';
  const token = SwapTokens.find((item) => item.symbol === currencyCode);
  console.info('currencyCode:', currencyCode, 'token:', token);

  let addr = token?.address;
  if (currencyCode === 'ETH') {
    addr = 'native';
  }
  const { tokenBalance, isError, isLoading, update } = useTokenBalance(addr || '', token?.decimals || 0);

  return (
    <BaseModal title="Swap" onClose={onCloseModal}>
      <Wrapper>
        <BaseListItem title="Dapp">
          <ItemImg src={iconMap[item.template]} style={{ marginRight: '5px' }} />
          {item.template}
        </BaseListItem>
        <BaseListItem title="Suggestion">{displayTitles}</BaseListItem>
        <BaseListItem title="Your balance">
          {tokenBalance ? Big(tokenBalance).toFixed(4, 0) : ''} {currencyCode}
        </BaseListItem>
        <BaseListItem title="Swap pair">
          {item.action_tokens && typeof item.action_tokens === 'string' && parseActionTokens(item.action_tokens)}
        </BaseListItem>
      </Wrapper>
      <SwapBtn
        title={item.template}
        uniType={dexs[item?.template].uniType}
        currencyCode={currencyCode}
        inputCurrency={JSON.parse(item?.token_in_currency)}
        inputCurrencyAmount={item.action_amount}
        maxInputBalance={Number(tokenBalance || 0)}
        outputCurrency={JSON.parse(item?.token_out_currency)}
        routerAddress={dexs[item?.template].routerAddress}
        wethAddress={WETH_ADDRESS}
        //   amountOutFn= {"guessme.near/widget/ZKEVMSwap.swap-quoter"}
        //   handlerV2="guessme.near/widget/ZKEVMSwap.swap-handler"
        // outputCurrencyAmount={1}
        noPair={false}
        token={token}
        updateBalance={update}
      />
    </BaseModal>
  );
};

export default QuestSwapModal;
