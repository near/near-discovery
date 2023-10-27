import type { Token } from '@/components/Bridge/types';
import { optimism } from '@/config/tokens/optimism';

export const optimismTokens = {
  '0xb69c8CBCD90A39D8D3d3ccf0a3E968511C3856A0': {
    ...optimism.eth,
    address: '0xb69c8CBCD90A39D8D3d3ccf0a3E968511C3856A0',
    poolId: 13,
  },
  '0x7F5c764cBc14f9669B88837ca1490cCa17c31607': {
    ...optimism['usdc.e'],
    name: 'USDC',
    symbol: 'USDC',
    poolId: 1,
  },
  '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1': {
    ...optimism.dai,
    poolId: 3,
  },
  '0x2E3D870790dC77A83DD1d18184Acc7439A53f475': {
    ...optimism.frax,
    poolId: 7,
  },
  '0xdFA46478F9e5EA86d57387849598dbFB2e964b02': {
    ...optimism.mai,
    poolId: 16,
  },
  '0xc40F949F8a4e094D1b49a23ea9241D289B7b2819': {
    ...optimism.lusd,
    poolId: 15,
  },
  '0x8c6f28f2F1A3C87F0f938b96d27520d9751ec8d9': {
    ...optimism.sUSD,
    poolId: 14,
  },
} as { [key: string]: Token };
