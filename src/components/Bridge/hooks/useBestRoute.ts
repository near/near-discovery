import { useState } from 'react';
import { chainCofig } from '@/config/bridge';
import Big from 'big.js';
import useStargate from './useStargate';
import { Chain, Token, Trade } from '../types';

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
      const _inputChain = chainCofig[chain.chainId];
      if (_inputChain.dex === 'Stargate') {
        const response = await getQouteInfo({ targetToken, chain, targetChain });
        setChecking(false);
        setTrade({
          time: '1min',
          amount: (amount ? new Big(amount || 0).mul(0.995).toFixed(2, 1) : '-') + '  ' + targetToken.symbol,
          gasCost: response,
          dex: 'Stargate',
        });
      }
    } catch (err) {
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
