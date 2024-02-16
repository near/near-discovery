import type { Token } from '@/components/Bridge/types';
import { mantle } from '@/config/tokens/mantle';

export const mantleTokens = {
  native: mantle.mnt,
  '0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9': mantle.usdc,
  '0x201EBa5CC46D216Ce6DC03F6a759e8E766e956aE': mantle.usdt,
} as { [key: string]: Token };
