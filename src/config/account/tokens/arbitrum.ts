import type { Token } from '@/components/Bridge/types';
import { arbitrum } from '@/config/tokens/arbitrum';

export const arbitrumTokens = {
  '0x912CE59144191C1204E64559FE8253a0e49E6548': arbitrum.arb,
  native: arbitrum.eth,
  '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8': arbitrum.usdc,
  '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9': arbitrum.usdt,
  '0x3F56e0c36d275367b8C502090EDF38289b3dEa0d': arbitrum.mai,
  '0x93b346b6BC2548dA6A1E7d98E9a421B42541425b': arbitrum.lusd,
} as { [key: string]: Token };
