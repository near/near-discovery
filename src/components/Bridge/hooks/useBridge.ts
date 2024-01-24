import { useCallback, useState } from 'react';
import type { Chain, Token } from '../types';
import useAccount from '@/hooks/useAccount';

export default ({
  chains,
  tokens,
  lifiTokens,
}: {
  chainId?: number;
  chains: { [key: number]: Chain };
  tokens: { [key: string]: Token };
  lifiTokens: { [key: string]: Token[]  }
}) => {
  const { chainId } = useAccount()

  const initiInputChain = chains[1]

  const initOutputChain = chains[chainId && chainId !== 5000 ? chainId : 1]

  const [inputToken, setInputToken] = useState<Token | undefined>();
  const [outputToken, setOutputToken] = useState<Token>();
  const [inputChain, setInputChain] = useState<Chain | undefined>(initiInputChain);
  const [outputChain, setOutputChain] = useState<Chain | undefined>(initOutputChain);

  let initInputToken = undefined
  if (inputChain && !inputToken) {
    const chainTokens = lifiTokens[inputChain?.chainId]
    if (chainTokens?.length) {
      chainTokens.some(token => {
        if (token.symbol === 'ETH') {
          initInputToken = token
          return true
        }
        return false
      })
    }

    if (initInputToken) {
      setInputToken(initInputToken)
    }
  }

  let initOutputToken = undefined
  if (outputChain && !outputToken) {
    const chainTokens = lifiTokens[outputChain?.chainId]
    if (chainTokens?.length) {
      chainTokens.some(token => {
        if (token.symbol === 'ETH') {
          initOutputToken = token
          return true
        }
        return false
      })
    }

    if (initOutputToken) {
      setOutputToken(initOutputToken)
    }
  }

  const selectChain = useCallback(
    (type: 'in' | 'out', chain: Chain) => {
      type === 'in' ? setInputChain(chain) : setOutputChain(chain);

      if (type === 'out' && outputToken?.chainId !== chain.chainId) {
        if (outputToken) {
          setOutputToken(undefined)
        }
      }
      if (type === 'in' && inputToken?.chainId !== chain.chainId) {
        if (inputChain) {
          setInputToken(undefined)
        }
      }
    },
    [inputChain, outputToken],
  );
  const selectToken = useCallback(
    (type: 'in' | 'out', token: Token) => {
      if (type === 'in') {
        setInputToken(token);
      } else {
        setOutputToken(token);
      }
    },
    [inputChain],
  );

  const onExchange = useCallback(() => {
    const [_outputToken, _inputToken] = [inputToken, outputToken];
    const [_outputChain, _inputChain] = [inputChain, outputChain];
    setInputChain(_inputChain);
    setOutputChain(_outputChain);
    setInputToken(_inputToken);
    setOutputToken(_outputToken);
  }, [inputToken, outputToken, inputChain, outputChain]);

  return { inputToken, outputToken, inputChain, outputChain, selectChain, selectToken, onExchange };
};
