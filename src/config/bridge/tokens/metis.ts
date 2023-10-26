import { Token } from '@/components/Bridge/types';
import { metis } from '@/config/tokens/metis';

export const metisTokens = {
  '0xbb06dca3ae6887fabf931640f67cab3e3a16f4dc': {
    ...metis.usdt,
    poolId: 19,
  },
} as { [key: string]: Token };
