import type { Token } from '@/components/Bridge/types';
import { ethereum } from '@/config/tokens/ethereum';

export const ethereumTokens = {
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48': {
    ...ethereum.usdc,
    poolId: 1,
  },
  '0x72E2F4830b9E45d52F80aC08CB2bEC0FeF72eD9c': {
    ...ethereum.eth,
    address: '0x72E2F4830b9E45d52F80aC08CB2bEC0FeF72eD9c',
    poolId: 13,
  },
  '0xdAC17F958D2ee523a2206206994597C13D831ec7': {
    ...ethereum.usdt,
    poolId: 2,
  },
  '0x0C10bF8FcB7Bf5412187A595ab97a3609160b5c6': {
    ...ethereum.usdd,
    poolId: 11,
  },
  '0x6B175474E89094C44Da98b954EedeAC495271d0F': {
    ...ethereum.dai,
    poolId: 3,
  },
  '0x853d955aCEf822Db058eb8505911ED77F175b99e': {
    ...ethereum.frax,
    poolId: 7,
  },
  '0x57Ab1ec28D129707052df4dF418D58a2D46d5f51': {
    ...ethereum.susd,
    poolId: 14,
  },
  '0x5f98805A4E8be255a32880FDeC7F6728C6568bA0': {
    ...ethereum.lusd,
    poolId: 15,
  },
  '0x8D6CeBD76f18E1558D4DB88138e2DeFB3909fAD6': {
    ...ethereum.mai,
    poolId: 16,
  },
} as { [key: string]: Token };
