import type { Token } from '@/components/Bridge/types';
import { arbitrum } from '@/config/tokens/arbitrum';

export const arbitrumTokens = {
  '0x82CbeCF39bEe528B5476FE6d1550af59a9dB6Fc0': {
    ...arbitrum.eth,
    address: '0x82CbeCF39bEe528B5476FE6d1550af59a9dB6Fc0',
    poolId: 13,
  },
  '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8': {
    ...arbitrum.usdc,
    poolId: 1,
  },
  '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9': {
    ...arbitrum.usdt,
    poolId: 2,
  },
  '0x17FC002b466eEc40DaE837Fc4bE5c67993ddBd6F': {
    ...arbitrum.frax,
    poolId: 7,
  },
  '0x3F56e0c36d275367b8C502090EDF38289b3dEa0d': {
    ...arbitrum.mai,
    poolId: 16,
  },
  '0x93b346b6BC2548dA6A1E7d98E9a421B42541425b': {
    ...arbitrum.lusd,
    poolId: 15,
  },
} as { [key: string]: Token };
