import type { Token } from '@/components/Bridge/types';
import { avalanche } from '@/config/tokens/avalanche';

export const avalancheTokens = {
  native: avalanche.avax,
  '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB': avalanche.eth,
  '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E': avalanche.usdc,
  '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7': avalanche.usdt,
  '0x5c49b268c9841AFF1Cc3B0a418ff5c3442eE3F3b': avalanche.mai,
} as { [key: string]: Token };
