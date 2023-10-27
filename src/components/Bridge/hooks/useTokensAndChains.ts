import { useEffect, useState } from 'react';

import { chains as configChains,tokens as configTokens } from '@/config/bridge';

import type { Chain, Token } from '../types';

export default function useTokensAndChains() {
  const [tokens, setTokens] = useState<{ [key: string]: Token }>(configTokens);
  const [chains, setChains] = useState<{ [key: number]: Chain }>(configChains);

  useEffect(() => {
    const _chains: { [key: number]: Chain } = {};
    Object.values(configChains).forEach((chain) => {
      _chains[chain.chainId] = chain;
    });
    setChains(_chains);
  }, []);

  useEffect(() => {
    setTokens(configTokens);
  }, []);

  return { tokens, chains };
}
