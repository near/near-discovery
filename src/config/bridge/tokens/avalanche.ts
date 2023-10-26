import type { Token } from '@/components/Bridge/types';
import { avalanche } from '@/config/tokens/avalanche';

export const avalancheTokens = {
  '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E': {
    ...avalanche.usdc,
    poolId: 1,
  },
  '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7': {
    ...avalanche.usdt,
    poolId: 2,
  },
  '0xD24C2Ad096400B6FBcd2ad8B24E7acBc21A1da64': {
    ...avalanche.frax,
    poolId: 7,
  },
  '0x5c49b268c9841AFF1Cc3B0a418ff5c3442eE3F3b': {
    ...avalanche.mai,
    poolId: 16,
  },
} as { [key: string]: Token };
