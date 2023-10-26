import { Token } from '@/components/Bridge/types';
import { optimism } from '@/config/tokens/optimism';

export const optimismTokens = {
  native: optimism.eth,
  '0x912CE59144191C1204E64559FE8253a0e49E6548': optimism.arb,
  '0x7F5c764cBc14f9669B88837ca1490cCa17c31607': optimism['usdc.e'],
  '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1': optimism.dai,
  '0xdFA46478F9e5EA86d57387849598dbFB2e964b02': optimism.mai,
  '0xc40F949F8a4e094D1b49a23ea9241D289B7b2819': optimism.lusd,
  '0x8c6f28f2F1A3C87F0f938b96d27520d9751ec8d9': optimism.sUSD,
} as { [key: string]: Token };
