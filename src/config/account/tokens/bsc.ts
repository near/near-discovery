import { Token } from '@/components/Bridge/types';
import { bsc } from '@/config/tokens/bsc';

export const bscTokens = {
  native: bsc.bnb,
  '0x2170Ed0880ac9A755fd29B2688956BD959F933F8': bsc.eth,
  '0x55d398326f99059fF775485246999027B3197955': bsc.usdt,
  '0xd17479997F34dd9156Deef8F95A52D81D265be9c': bsc.usdd,
  '0x3F56e0c36d275367b8C502090EDF38289b3dEa0d': bsc.mai,
} as { [key: string]: Token };
