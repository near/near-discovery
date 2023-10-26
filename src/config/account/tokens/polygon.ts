import { Token } from '@/components/Bridge/types';
import { polygon } from '@/config/tokens/polygon';

export const polygonTokens = {
  native: polygon.matic,
  '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619': polygon.eth,
  '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174': polygon.usdc,
  '0xc2132D05D31c914a87C6611C10748AEb04B58e8F': polygon.usdt,
  '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063': polygon.dai,
  '0xa3Fa99A148fA48D14Ed51d610c367C61876997F1': polygon.mai,
} as { [key: string]: Token };
