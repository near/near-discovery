import { useMemo } from 'react';

import chains from '@/config/chains';
import type { Chain } from '@/types';

import useAccount from './useAccount';

export default function useChain(id?: number) {
  const { chainId } = useAccount();
  return useMemo<Chain | undefined>(() => {
    const _chainId = id ? id : chainId;
    return _chainId ? chains[_chainId] : undefined;
  }, [chainId]);
}
