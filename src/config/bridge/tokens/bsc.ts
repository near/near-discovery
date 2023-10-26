import { Token } from '@/components/Bridge/types';
import { bsc } from '@/config/tokens/bsc';

export const bscTokens = {
  '0x55d398326f99059fF775485246999027B3197955': {
    ...bsc.usdt,
    name: 'USDT',
    symbol: 'USDT',
    poolId: 2,
  },
  '0xd17479997F34dd9156Deef8F95A52D81D265be9c': {
    ...bsc.usdd,
    poolId: 11,
  },
  '0x3F56e0c36d275367b8C502090EDF38289b3dEa0d': {
    ...bsc.mai,
    poolId: 16,
  },
} as { [key: string]: Token };
