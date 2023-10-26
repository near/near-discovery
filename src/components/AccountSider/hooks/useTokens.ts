import { useMemo } from 'react';

import tokens from '@/config/account/tokens';
import useAccount from '@/hooks/useAccount';
import type { Token } from '@/types';

export default function () {
  const { chainId } = useAccount();

  return useMemo<Token[] | undefined>(() => (chainId ? Object.values(tokens[chainId] || {}) : undefined), [chainId]);
}
