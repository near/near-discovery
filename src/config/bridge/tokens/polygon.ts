import { Token } from '@/components/Bridge/types';
import { polygon } from '@/config/tokens/polygon';

export const polygonTokens = {
  '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174': {
    ...polygon.usdc,
    poolId: 1,
  },
  '0xc2132D05D31c914a87C6611C10748AEb04B58e8F': {
    ...polygon.usdt,
    poolId: 2,
  },
  '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063': {
    ...polygon.dai,
    poolId: 3,
  },
  '0xa3Fa99A148fA48D14Ed51d610c367C61876997F1': {
    ...polygon.mai,
    poolId: 16,
  },
} as { [key: string]: Token };
