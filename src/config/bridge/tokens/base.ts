import { Token } from '@/components/Bridge/types';

const CHAIN_ID = 8453;
export const baseTokens = {
  '0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA': {
    chainId: CHAIN_ID,
    address: '0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA',
    name: 'USDC',
    symbol: 'USDC',
    icon: 'https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694',
    decimals: 6,
    poolId: 1,
  },
  '0x224D8Fd7aB6AD4c6eb4611Ce56EF35Dec2277F03': {
    chainId: CHAIN_ID,
    address: '0x224D8Fd7aB6AD4c6eb4611Ce56EF35Dec2277F03',
    name: 'ETH',
    symbol: 'ETH',
    icon: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628',
    decimals: 18,
    poolId: 13,
    isNative: true,
  },
} as { [key: string]: Token };
