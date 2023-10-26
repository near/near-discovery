import { useMemo } from 'react';
import useAccount from '@/hooks/useAccount';
import tokens from '@/config/account/tokens';
import { Token } from '@/types';

export default function () {
  const { chainId } = useAccount();

  return useMemo<Token[] | undefined>(() => (chainId ? Object.values(tokens[chainId] || {}) : undefined), [chainId]);
}
