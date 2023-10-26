import { Token } from '@/components/Bridge/types';
import { ethereum } from '@/config/tokens/ethereum';

export const ethereumTokens = {
  native: ethereum.eth,
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48': ethereum.usdc,
  '0xdAC17F958D2ee523a2206206994597C13D831ec7': ethereum.usdt,
  '0x6B175474E89094C44Da98b954EedeAC495271d0F': ethereum.dai,
  '0x8D6CeBD76f18E1558D4DB88138e2DeFB3909fAD6': ethereum.mai,
} as { [key: string]: Token };
