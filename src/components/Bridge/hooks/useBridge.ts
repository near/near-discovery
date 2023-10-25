import { useCallback, useEffect, useState } from 'react';
import type { Token, Chain } from '../types';

export default ({
  chainId,
  chains,
  tokens,
}: {
  chainId?: number;
  chains: { [key: number]: Chain };
  tokens: { [key: string]: Token };
}) => {
  const [inputToken, setInputToken] = useState<Token>();
  const [outputToken, setOutputToken] = useState<Token>();
  const [inputChain, setInputChain] = useState<Chain>();
  const [outputChain, setOutputChain] = useState<Chain>();

  const selectChain = useCallback(
    (type: 'in' | 'out', chain: Chain) => {
      type === 'in' ? setInputChain(chain) : setOutputChain(chain);
      if (type === 'out' && outputToken?.chainId !== chain.chainId) {
        Object.values(tokens).some((token) => {
          if (token.poolId === outputToken?.poolId && token.chainId === chain.chainId) {
            setOutputToken(token);
            return true;
          }
          return false;
        });
      }
    },
    [outputToken],
  );
  const selectToken = useCallback(
    (type: 'in' | 'out', token: Token) => {
      setInputToken(token);
      if (!outputChain) {
        setOutputToken(token);
      } else {
        Object.values(tokens).some((_token) => {
          if (token.poolId === _token?.poolId && token.chainId === outputChain.chainId) {
            setOutputToken(token);
            return true;
          }
          return false;
        });
      }

      if (token.chainId !== inputChain?.chainId) {
        setInputChain(chains[token.chainId]);
      }
      if (token.chainId === outputChain?.chainId) setOutputChain(undefined);
    },
    [inputChain],
  );

  useEffect(() => {
    if (!chainId || inputChain) return;
    setInputChain(chains[chainId]);
  }, [chainId]);

  return { inputToken, outputToken, inputChain, outputChain, selectChain, selectToken };
};
