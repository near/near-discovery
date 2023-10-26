import { useMemo } from 'react';
import chains from '@/config/chains';
import useAccount from './useAccount';
import { Chain } from '@/types';

export default function useChain(id?: number) {
  const { chainId } = useAccount();
  return useMemo<Chain | undefined>(() => {
    const _chainId = id ? id : chainId;
    return _chainId ? chains[_chainId] : undefined;
  }, [chainId]);
}
