import Big from 'big.js';
import { useState } from 'react';

import { chainCofig } from '@/config/bridge';

import type { Chain, Token, Trade } from '../types';
import useStargate from './useStargate';

export default function useBestRoute() {
  const { getQouteInfo, swap: stargateSwap, gasCost } = useStargate();
  const [checking, setChecking] = useState(false);
  const [swaping, setSwaping] = useState(false);
  const [trade, setTrade] = useState<Trade>();

  const getBestRoute = async ({
    chain,
    targetToken,
    targetChain,
    amount,
  }: {
    chain: Chain;
    targetChain: Chain;
    targetToken: Token;
    amount?: string;
  }) => {
    try {
      setChecking(true);
      setTrade(undefined);
      const _inputChain = chainCofig[chain.chainId];
      if (_inputChain.dex === 'Stargate') {
        const response = await getQouteInfo({ targetToken, chain, targetChain });
        setChecking(false);
        console.log('response', response);
        setTrade({
          time: '1min',
          amount: (amount ? new Big(amount || 0).mul(0.995).toFixed(2, 0) : '-') + '  ' + targetToken.symbol,
          gasCost: response,
          dex: 'Stargate',
        });
      }
    } catch (err) {
      console.log('error', err);
      setChecking(false);
      setTrade(undefined);
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
    onSuccess,
  }: {
    chain: Chain;
    token: Token;
    targetChain: Chain;
    targetToken: Token;
    amount: string;
    destination?: string;
    onSuccess: (hash: string) => void;
  }) {
    try {
      setSwaping(true);
      const _inputChain = chainCofig[chain.chainId];
      if (_inputChain.dex === 'Stargate') {
        await stargateSwap({
          chain: chain,
          token: token,
          targetChain: targetChain,
          targetToken: targetToken,
          amount,
          destination,
          onSuccess,
        });
      }
      setSwaping(false);
    } catch (err) {
      setSwaping(false);
    }
  };

  return { getBestRoute, swap, trade, checking, swaping, gasCost };
}
