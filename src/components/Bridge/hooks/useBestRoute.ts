import Big from 'big.js';
import { useState } from 'react';
import { chainCofig } from '@/config/bridge';

import type { Chain, Token, Trade } from '../types';
import type { Route } from '@lifi/sdk'
import { tokens as configTokens } from '@/config/bridge';
import useToast from '@/hooks/useToast';
import useStargate from './useStargate';
import useLifi, { computeDuration } from './useLifi';
import { formatException } from '../util/'

export default function useBestRoute() {
  const { getQouteInfo, swap: stargateSwap, gasCost } = useStargate();
  const { getQouteInfo: getLifiQouteInfo, swap: lifiSwap, gasCost: getLifiCost } = useLifi();
  const { fail } = useToast()
  const [checking, setChecking] = useState(false);
  const [swaping, setSwaping] = useState(false);
  const [trades, setTrades] = useState<Trade[]>([]);

  const getBestRoute = async ({
    chain,
    targetChain,
    inputToken,
    targetToken,
    amount,
    destination,
  }: {
    chain: Chain;
    targetChain: Chain;
    inputToken: Token;
    targetToken: Token;
    amount?: string;
    destination?: string;
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
        destination,
      })

      if (response) {
        response.forEach(item => {
          tradeList.push({
            time: computeDuration(item),
            amount: (item.toAmount ? new Big(item.toAmount || 0).div(Math.pow(10, targetToken.decimals)).toFixed(4, 0) : '-') + '  ' + targetToken.symbol,
            gasCost: '$' + item?.gasCostUSD,
            dex: 'Lifi',
            route: item,
            tags: [],
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
      // token必须配置poolId
      if (
        !hasStargate
      && _inputChain && _outputChain
      && _inputChain.dex === 'Stargate' && _outputChain.dex === 'Stargate' 
      && chain.chainId !== targetChain.chainId
      && inputToken.symbol === targetToken.symbol
      && (configTokens[inputToken.address] && configTokens[inputToken.address].poolId)
      && (configTokens[targetToken.address] && configTokens[targetToken.address].poolId)
      && amount) {
        try {
          const response = await getQouteInfo({ targetToken, chain, targetChain });
          tradeList.unshift({
            time: '5min',
            amount: (amount ? new Big(amount || 0).mul(0.995).toFixed(4, 0) : '-') + '  ' + targetToken.symbol,
            gasCost: response,
            dex: 'Stargate',
            tags: [],
          })
        } catch (e) {
          console.log(e)
        }
      } 

      if (tradeList.length) {
        let fastestIndex = 0
        let fastestTime = parseInt(tradeList[0].time)
        let bestReturnindex = 0
        let bestReturnAmount = parseFloat(tradeList[0].amount)
        tradeList.forEach((item, index) => {
          const currentTime = parseInt(item.time)
          const currentAmount = parseFloat(item.amount)
          if (currentTime < fastestTime) {
            fastestTime = currentTime
            fastestIndex = index
          }

          if (currentAmount > bestReturnAmount) {
            bestReturnAmount = currentAmount
            bestReturnindex = index
          }
        })

        tradeList[bestReturnindex].tags.push('Best Return')
        tradeList[fastestIndex].tags.push('Fastest')
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
    onFail,
  }: {
    chain: Chain;
    token: Token;
    targetChain: Chain;
    targetToken: Token;
    amount: string;
    destination?: string;
    route?: Trade,
    onSuccess: (hash: string) => void;
    onFail: () => void;
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
    } catch (err: any) {
      console.log(err)
      // setTrades([])
      // setChecking(false);
      setSwaping(false);
      fail({
        title: err.name ? err.name : 'Transaction failed',
        text: formatException(err.message),
      })
      onFail()
    }
  };



  return { getBestRoute, swap, trades, checking, swaping, gasCost, setTrades };
}
