import { Token } from '@/components/Bridge/types';

const CHAIN_ID = 1088;
export const metisTokens = {
  '0xbb06dca3ae6887fabf931640f67cab3e3a16f4dc': {
    chainId: CHAIN_ID,
    address: '0xbb06dca3ae6887fabf931640f67cab3e3a16f4dc',
    name: 'USDT Token',
    symbol: 'USDT',
    icon: 'https://assets.coingecko.com/coins/images/325/standard/Tether.png?1696501661',
    decimals: 6,
    poolId: 19,
  },
} as { [key: string]: Token };
