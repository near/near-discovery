import chains from '../chains';
import type { Chain } from '@/types';

export const supportChains = {
  8453: chains[8453],
  1: chains[1],
} as { [key: number]: Chain };
