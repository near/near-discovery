import type { Token } from '@/components/Bridge/types';
import { zkSync } from '@/config/tokens/zkSync';

export const zkSyncTokens = {
  '0x0000000000000000000000000000000000000000': {
    ...zkSync.eth,
    poolId: 13,
  },
  '0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91': {
    ...zkSync.weth,
    poolId: 133,
  }
} as { [key: string]: Token };
