import type { Chain } from '@/types';

import chains from '../chains';

export const supportChains = {
  8453: chains[8453],
  1: chains[1],
  42161: chains[42161],
  56: chains[56],
  43114: chains[43114],
  59144: chains[59144],
  1088: chains[1088],
  10: chains[10],
  137: chains[137],
} as { [key: number]: Chain };
