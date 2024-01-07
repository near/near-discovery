import Big from 'big.js';
import { useState } from 'react';
import { chainCofig } from '@/config/bridge';

import type { Chain, Token, Trade } from '../types';
import type { Route } from '@lifi/sdk'
import { tokens as configTokens } from '@/config/bridge';
import useStargate from './useStargate';
import useLifi,  { computeDuration } from './useLifi';

export default function useBestRoute() {
  const { getQouteInfo, swap: stargateSwap, gasCost } = useStargate();
  const { getQouteInfo: getLifiQouteInfo, swap: lifiSwap, gasCost: getLifiCost } = useLifi();
  const [checking, setChecking] = useState(false);
  const [swaping, setSwaping] = useState(false);
  const [trades, setTrades] = useState<Trade[]>([]);

  const getBestRoute = async ({
    chain,
    targetChain,
    inputToken,
    targetToken,
    amount,
  }: {
    chain: Chain;
    targetChain: Chain;
    inputToken: Token;
    targetToken: Token;
    amount?: string;
  }) => {

    try {
      setChecking(true);
      setTrades([]);
      const _inputChain = chainCofig[chain.chainId];
      const _outputChain = chainCofig[targetChain.chainId];
      const tradeList: Trade[] = []

      let hasStargate = false
      const response = await getLifiQouteInfo({
        chain: chain,
        token: inputToken,
        targetChain: targetChain,
        targetToken: targetToken,
        amount: amount ? amount.toString() : '',
      })

      if (response) {
        response.forEach(item => {
          tradeList.push({
            time: computeDuration(item),
            amount: (item.toAmount ? new Big(item.toAmount || 0).div(Math.pow(10, targetToken.decimals)).toFixed(4, 0) : '-') + '  ' + targetToken.symbol,
            gasCost: '$' + item?.gasCostUSD,
            dex: 'Lifi',
            route: item,
            tags: item.tags ? (item.tags as string[]).slice(0, 2) : [],
          })

          if (item.steps && item.steps.length) {
            const toolDetails = item.steps[0].toolDetails
            if (toolDetails.name === 'Stargate') {
              hasStargate = true
            }
          }
        })
      }

      // 判断是否需要使用Stargate
      // 判断lifi中没有提供Stargate桥
      // 判断Stargate配置中是否有这些链的配置
      // 配置中必须有Stargate
      // 两个链不能相同
      // 两个token必须相同
      if (
        !hasStargate
      && _inputChain && _outputChain
      && _inputChain.dex === 'Stargate' && _outputChain.dex === 'Stargate' 
      && chain.chainId !== targetChain.chainId
      && inputToken.symbol === targetToken.symbol) {
        try {
          const response = await getQouteInfo({ targetToken, chain, targetChain });
          tradeList.unshift({
            time: '5min',
            amount: (amount ? new Big(amount || 0).mul(0.995).toFixed(4, 0) : '-') + '  ' + targetToken.symbol,
            gasCost: response,
            dex: 'Stargate',
            tags: ['Best Return', 'Fastest'],
          })
        } catch (e) {
          console.log(e)
        }
      } 

      setChecking(false)
      setTrades(tradeList)
    } catch (err) {
      console.log('error', err);
      setChecking(false);
      setTrades([]);
      return [];
    }
  };

  const swap = async function ({
    token,
    chain,
    targetToken,
    targetChain,
    destination,
    amount,
    route,
    onSuccess,
  }: {
    chain: Chain;
    token: Token;
    targetChain: Chain;
    targetToken: Token;
    amount: string;
    destination?: string;
    route?: Trade,
    onSuccess: (hash: string) => void;
  }) {
    try {
      setSwaping(true);
      const _inputChain = chainCofig[chain.chainId];
      const _outputChain = chainCofig[targetChain.chainId];

      if (route?.route && route?.dex === 'Lifi') {
        await lifiSwap({
          chain: chain,
          token: token,
          targetChain: targetChain,
          targetToken: targetToken,
          amount,
          destination,
          route: route?.route,
          onSuccess,
        })
      } else if (route?.dex === 'Stargate') {
        // 判断native
        await stargateSwap({
          chain: chain,
          token: token,
          targetChain: targetChain,
          targetToken: targetToken,
          amount: amount,
          destination,
          onSuccess,
        });
      }
      setSwaping(false);
      setTrades([])
      setChecking(false);
    } catch (err) {
      console.log(err)
      // setTrades([])
      // setChecking(false);
      setSwaping(false);
    }
  };



  return { getBestRoute, swap, trades, checking, swaping, gasCost, setTrades };
}
